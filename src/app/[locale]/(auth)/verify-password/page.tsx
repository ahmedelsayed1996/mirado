"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "../../../_components/Spinner";
import { toast } from "react-toastify";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import ResendEmailOtp from "@/app/_components/ResendEmailOtp";
import CopyRights from "@/app/_components/CopyRights";
import SideSectionRegister from "@/app/_components/SideSectionRegister";

function VerifyPassword() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const language = useCurrentLang();
  const t = useTranslations("changePassword");
  const i = useTranslations("imageWords");
  const v = useTranslations("VerifyMail");
  const [resendCode, setResendCode] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);

  // العد التنازلي
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

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

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    console.log("OTP Code:", otpCode);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/validate-passowrd-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify({ code: otpCode }),
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }
      const result = await response.json();
      localStorage.setItem("uniqueNumber", result.unique);
      router.push(`/${language}/new-password`);
      console.log(result);
      toast.success(result.message);
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    // setResendCode(!resendCode);
    router.push(`/${language}/forget-password`);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="overflow-hidden py-5 bg-zinc-100">
      <div className="flex items-center gap-5 flex-col lg:flex-row">
        <div className="flex flex-col lg:w-6/12 px-0 max-md:px-3">
          <div className="flex flex-col  w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col self-center items-center w-full">
              <div className="flex flex-col w-full max-w-[500px] justify-center items-center">
                <div className="flex gap-2 justify-center items-center self-start text-sm tracking-wide text-zinc-900">
                  <Link
                    href={`/${language}/login`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-600 bg-opacity-10"
                  >
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.38057 13.1044C6.50724 13.1044 6.63391 13.0577 6.73391 12.9577C6.92724 12.7644 6.92724 12.4444 6.73391 12.251L3.04057 8.55769L6.73391 4.86436C6.92724 4.67103 6.92724 4.35103 6.73391 4.1577C6.54057 3.96436 6.22057 3.96436 6.02724 4.1577L1.98057 8.20436C1.78724 8.3977 1.78724 8.71769 1.98057 8.91103L6.02724 12.9577C6.12724 13.0577 6.25391 13.1044 6.38057 13.1044Z"
                        fill="#365D8D"
                      />
                      <path
                        d="M2.44667 9.05957H13.6667C13.94 9.05957 14.1667 8.8329 14.1667 8.55957C14.1667 8.28624 13.94 8.05957 13.6667 8.05957H2.44667C2.17334 8.05957 1.94667 8.28624 1.94667 8.55957C1.94667 8.8329 2.17334 9.05957 2.44667 9.05957Z"
                        fill="#365D8D"
                      />
                    </svg>
                  </Link>
                  <div className="self-stretch my-auto">{v("button")}</div>
                </div>
                <div className="flex flex-col mt-8 w-full">
                  <div className="flex flex-col w-full max-md:max-w-full">
                    <div className="text-3xl font-bold text-zinc-900 max-md:max-w-full">
                      {v("massage1")}
                    </div>
                    <div className="mt-1.5 text-base tracking-wide leading-6 text-zinc-600 max-md:max-w-full">
                      {v("label")}
                      <br />
                      {v("massage2")}
                      {/* <span className="text-sky-500">Edit</span> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mt-5 w-full max-md:max-w-full">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <div className="flex flex-wrap gap-5 items-center w-full text-2xl font-semibold tracking-tight leading-none text-center text-black whitespace-nowrap max-md:max-w-full" dir="ltr">
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {(inputRefs.current[idx] = el)}}
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

                      <div className="flex flex-col mt-5 text-sm tracking-wide rounded-none">
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
                            className="text-zinc-600 underline mt-2.5 font-medium self-start"
                          >
                            {v("lable1")}
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col mt-5 w-full text-lg font-bold text-white whitespace-nowrap max-md:max-w-full">
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <button
                            type="submit"
                            className="flex overflow-hidden flex-wrap gap-1 justify-center items-center px-4 py-0 w-full bg-primary min-h-[58px] rounded-[64px] max-md:max-w-full"
                          >
                            <div className="self-stretch my-auto">
                              {v("Confirm")}
                            </div>
                            {language === "en" ?
                          <svg
                            width="22"
                            height="21"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          ><path
                              d="M14.9301 5.92993L21.0001 11.9999L14.9301 18.0699"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            /><path
                              d="M4 12H20.83"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg> :
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.56995 18.0701L3.49995 12.0001L9.56995 5.93007" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.5 12L3.67 12" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideSectionRegister />
      </div>
      {/*  } */}
    </div>
  );
}
export default VerifyPassword;
