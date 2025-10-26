
"use client"

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

import useCurrentLang from '../_hooks/useCurrentLang';
import { parseCookies } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslations } from 'use-intl';
import Spinner from './Spinner';
import { AppDispatch } from '../store';

import dynamic from 'next/dynamic';

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
    ssr: false,
    loading: () => <div className="h-12 w-full flex items-center justify-center">Loading...</div>,
});

import "react-phone-input-2/lib/style.css";
import { displayUser } from '../reduxTool-kit/slices/displayUserSlice';


interface CheckIsLoggedIn {
    onClose: () => void;
}
function IncompleteProfilePopup({ onClose }: CheckIsLoggedIn) {

    const locale = useCurrentLang();
    const { tokenMainSite } = parseCookies();

    const t = useTranslations("Popup");
    const v = useTranslations("VerifyMail");
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: any) => state.displayUser);

    const [step, setStep] = useState<string>("one");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
        if (pasted.length === 6) {
            const newOtp = pasted.split("").slice(0, 6);
            setOtp(newOtp);

            newOtp.forEach((digit, i) => {
                const input = inputRefs.current[i];
                if (input instanceof HTMLInputElement) {
                    input.value = digit;
                }
            });

            inputRefs.current[5]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const formatTime = (t: number) => {
        const m = Math.floor(t / 60)
            .toString()
            .padStart(2, "0");
        const s = (t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleResend = () => {
        setStep("one");
    };


    const handleUpdatePhoneNumber = async () => {
        // console.log(phoneNumber?.length > 9 || user?.phone_number?.length > 9);

        // if (phoneNumber?.length < 9 || user?.phone_number?.length < 9) {
        //     setError(true);
        //     return;
        // }
        setIsLoading(true);
        const formDataBuildIn = new FormData();
        formDataBuildIn.append("phone_number", phoneNumber || user?.phone_number);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.id}`, {
                method: "PATCH",
                body: formDataBuildIn,
                headers: {
                    "Accept-Language": locale,
                    Authorization: `Bearer ${tokenMainSite}`
                },
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }
            setError(false);
            sendOTP();
        } catch (error: any) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const sendOTP = async () => {
        setIsLoading(false);
        // console.log("second step");
        // setStep("two");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/send-phone-otp`, {
                method: "POST",
                headers: {
                    "Accept-Language": locale,
                    Authorization: `Bearer ${tokenMainSite}`
                },
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }


            const result = await res.json();

            toast.success(result?.message);
            setStep("two");
            setIsLoading(false);

        } catch (error: any) {
            setStep("one");
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("third step");


        if (!otp) {
            setError(true);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);

        // const formDataBuildIn = new FormData();
        // formDataBuildIn.append("phone_number", phoneNumber || "");
        var raw = JSON.stringify({
            "code": otp.join("")
        });
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/validate-phone-otp`, {
                method: "POST",
                body: raw,
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": locale,
                    Authorization: `Bearer ${tokenMainSite}`
                },
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }

            const result = await res.json();
            toast.success(t("updatePhoneNumber"));
            setIsLoading(false);
            dispatch(displayUser({ tokenMainSite, locale }));
            onClose();

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);


    return (
        <div className="flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-75 size-full z-30">
            <div className="flex flex-col p-6 my-36 max-w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl w-[700px] lg:w-[786px] max-md:px-5 max-md:mt-10 mx-4 md:mx-10">
                <div className="flex z-10 justify-center items-center px-5 w-14  max-md:px-5 cursor-pointer self-end"
                    onClick={onClose}>
                    <p className="font-medium text-[#A5A5A5]">{"X"}</p>
                </div>
                <hr className="w-full text-gray my-6" />
                <div className="flex justify-center items-center self-center  p-2.5 -mt-2 max-w-full  rounded-[50px] w-[110px] h-[130px] max-md:px-5">
                    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M55 0C44.1221 0 33.4884 3.22569 24.4437 9.26917C15.399 15.3126 8.34947 23.9025 4.18665 33.9524C0.0238306 44.0023 -1.06535 55.061 1.05683 65.73C3.17902 76.3989 8.41726 86.199 16.1092 93.8909C23.801 101.583 33.6011 106.821 44.2701 108.943C54.939 111.065 65.9977 109.976 76.0476 105.813C86.0975 101.651 94.6874 94.6011 100.731 85.5564C106.774 76.5117 110 65.878 110 55C110 47.7773 108.577 40.6253 105.813 33.9524C103.049 27.2795 98.9981 21.2163 93.8909 16.1091C88.7837 11.0019 82.7205 6.95063 76.0476 4.18663C69.3747 1.42262 62.2227 0 55 0ZM60.5 77C60.5 78.4587 59.9206 79.8576 58.8891 80.8891C57.8577 81.9205 56.4587 82.5 55 82.5C53.5413 82.5 52.1424 81.9205 51.1109 80.8891C50.0795 79.8576 49.5 78.4587 49.5 77V49.5C49.5 48.0413 50.0795 46.6424 51.1109 45.6109C52.1424 44.5795 53.5413 44 55 44C56.4587 44 57.8577 44.5795 58.8891 45.6109C59.9206 46.6424 60.5 48.0413 60.5 49.5V77ZM55 38.5C53.9122 38.5 52.8489 38.1774 51.9444 37.5731C51.0399 36.9687 50.335 36.1098 49.9187 35.1048C49.5024 34.0998 49.3935 32.9939 49.6057 31.927C49.8179 30.8601 50.3418 29.8801 51.1109 29.1109C51.8801 28.3417 52.8601 27.8179 53.927 27.6057C54.9939 27.3935 56.0998 27.5024 57.1048 27.9187C58.1098 28.3349 58.9688 29.0399 59.5731 29.9444C60.1775 30.8488 60.5 31.9122 60.5 33C60.5 34.4587 59.9206 35.8576 58.8891 36.8891C57.8577 37.9205 56.4587 38.5 55 38.5Z" fill="#F89A21" />
                    </svg>
                </div>
                <p className="flex justify-center items-center text-xl font-medium">
                    {step === "one" ? t("messageError") : <span className='flex text-center'>{v("label")} {" "} <br /> {v("massage2")}</span>}
                </p>
                <form onSubmit={handleSubmit}>
                    {step === "one" ? <>

                        {/* phone input */}
                        <div className="flex flex-col w-full mt-2">
                            <label className="mb-1 font-medium text-zinc-900">{t("addPhoneNumber")}
                            </label>
                            <div className="relative mt-2 w-full" style={{ direction: "ltr" }}>
                                <PhoneInput
                                    country={"sa"}
                                    value={phoneNumber || user?.phone_number}
                                    inputProps={{
                                        name: "phone",
                                        required: true,
                                        // autoFocus: true,
                                        className:
                                            "w-full ps-24 py-2 text-md border border-[#D1D1DB] rounded focus:outline-none",
                                    }}
                                    onChange={(phone) => {
                                        setPhoneNumber(phone);
                                    }}
                                    containerClass="w-full"
                                    inputClass="w-full pl-14"
                                    buttonClass=" flex items-center justify-center h-full px-2 w-20"
                                    dropdownClass="absolute z-50 bg-white shadow-lg border border-[#D1D1DB] rounded mt-2 left-0 top-7 "
                                />
                                {error && <p className='text-red-500 text-base'>{t("errorPhoneNumber")}</p>}
                            </div>
                        </div>
                        {isLoading ? <div className='w-1/3 pt-10'><Spinner /></div> : <div
                            onClick={() => {
                                // if (user?.phone_number) {
                                //     if (phoneNumber?.length < 10) {
                                //         console.log(phoneNumber?.length >= 10)
                                //         setError(true);
                                //     } else {
                                //         setError(false);
                                //         handleUpdatePhoneNumber();
                                //     }
                                // } else {
                                //     setError(true);
                                // }
                                // console.log("user phoneNumber from backend", user?.phone_number?.length > 9);
                                if (user?.phone_number?.length > 9) {
                                    setError(false);
                                    handleUpdatePhoneNumber();
                                } else {
                                    if (phoneNumber?.length >= 10) {
                                        setError(false);
                                        handleUpdatePhoneNumber();
                                    } else {
                                        setError(true);
                                    }
                                    setError(true);
                                }
                            }} className="justify-center text-center py-3 mt-10 whitespace-nowrap text-white bg-primary rounded-3xl px-9 md:px-28 lg:px-32 border capitalize cursor-pointer w-1/2"
                        >{t("next")}</div>}
                    </> :
                        step === "two" ?
                            <>
                                {/* otp Input */}
                                <div className="flex flex-wrap justify-center gap-5 items-center w-full text-2xl font-semibold tracking-tight leading-none text-center text-black whitespace-nowrap max-md:max-w-full" dir='ltr'>
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            ref={(el) => { (inputRefs.current[idx] = el) }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            className="text-center border-b-[3px] border-b-zinc-300 w-[40px] h-[60px] text-2xl focus:outline-none focus:border-b-primary bg-transparent"
                                            value={digit}
                                            onChange={(e) => handleChange(idx, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(idx, e)}
                                            required
                                            onPaste={idx === 0 ? handlePaste : undefined}
                                        />
                                    ))}
                                </div>

                                <div className="flex flex-col mt-5 text-sm tracking-wide text-center">
                                    {!canResend ? (
                                        <div className="text-zinc-900">
                                            {v("label2")}{" "}
                                            <span className="text-red-500">
                                                {formatTime(timeLeft)}
                                            </span>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            className="text-zinc-600 underline mt-2.5 font-medium self-start "
                                        >
                                            {v("lable1")}
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col mt-5 w-full text-lg text-white whitespace-nowrap max-md:max-w-full">
                                    {isLoading ? (
                                        <Spinner />
                                    ) : (
                                        <div className='flex gap-3'>
                                            <button
                                                onClick={() => {
                                                    setStep("one");

                                                }}
                                                className="flex overflow-hidden flex-wrap gap-1 justify-center items-center px-4 py-0 w-full bg-white text-primary border border-primary min-h-[58px] rounded-[64px] mt-5"
                                            >
                                                <div className="self-stretch my-auto">
                                                    {v("back")}
                                                </div>
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex overflow-hidden flex-wrap gap-1 justify-center items-center px-4 py-0 w-full bg-primary min-h-[58px] rounded-[64px] mt-5"
                                            >
                                                <div className="self-stretch my-auto">
                                                    {v("Confirm")}
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </> : ""
                    }


                </form>
            </div>
        </div>
    )
}

export default IncompleteProfilePopup
