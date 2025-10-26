
"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Spinner from "../../../_components/Spinner";

import SideSectionRegister from "@/app/_components/SideSectionRegister";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { toast } from 'react-toastify';
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
  ssr: false,
  loading: () => <div className="h-12 w-full flex items-center justify-center">Loading...</div>,
});

import Loader from "@/app/_components/Loader";

import { parseCookies } from "nookies";
import "react-phone-input-2/lib/style.css";

function Register() {

  const t = useTranslations("createAccount");
  const i = useTranslations("imageWords");
  const f = useTranslations("footer");
  const m = useTranslations("emptyField");
  const r = useTranslations("register");
  const l = useTranslations("Login");
  const language = useCurrentLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; repeatPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const locale = useCurrentLang();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const { tokenMainSite } = parseCookies();
  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = `${l("massage3")}`;
    }

    if (!password.trim()) {
      newErrors.password = `${l("massage4")}`;
    }
    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = `${l("massage4")}`;
    } else if (repeatPassword !== password) {
      newErrors.repeatPassword = `${l("massage5")}`;
    }
    // if (!phoneNumber.trim()) {

    //   newErrors.phoneNumber = `${l("massage6")}`;
    // }
    // if (phoneNumber.length <= 10) {
    //   newErrors.phoneNumber = `${l("massage7")}`;
    // }
    // console.log(phoneNumber);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(
          {
            // "first_name": "first",
            // "last_name": "name",
            // "phone_number": "+201201148276",
            "email": email,
            "password": password,
            // "phone_number": phoneNumber
          }
        ),
      });
      if (!response.ok) {
        const result = await response.json();
        setIsLoading(false);
        console.log(result.message);
        throw new Error(result.message);
      }

      const result = await response.json();
      setIsLoading(false);
      setIsVerify(true);
      toast.info('🦄 Verify Mail Address!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      toast.error(error.message)
      console.log(error);
    }
  };

  const initiateGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/google`;
  };
  const initiateFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/facebook`;
  };
  const initiateLinkedInLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/linkedin`;
  };

  useEffect(() => {
    if (tokenMainSite) {
      setLoading(true);
      router.push(`/`);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? <Loader /> :
        <div className="overflow-hidden py-5 bg-zinc-100 ">
          <div className="flex items-center gap-5 flex-col lg:flex-row">
            {!isVerify ? (
              <div className="flex flex-col lg:w-6/12 px-16 max-md:px-3">
                <div className="flex flex-col  w-full max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col self-center max-w-full">
                    <div className="flex flex-col justify-center w-full max-md:max-w-full">
                      <Link
                        href={`/${language}`}
                        className="md:flex md:items-center md:gap-12 cursor-pointer"
                      >
                        <Image
                          src="/logo.svg"
                          alt="logo"
                          width={120}
                          height={100}
                        />
                      </Link>
                      <div className="flex flex-col justify-center mt-2.5 w-full max-md:max-w-full">
                        <div className="gap-1.5 self-stretch w-full text-3xl font-bold text-slate-900 max-md:max-w-full">
                          {r("H1")}
                        </div>
                        <div className="mt-1.5 text-sm tracking-wide text-zinc-800 max-md:max-w-full">
                          {r("massage1")}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                      <div className="flex flex-col justify-center w-full  max-md:max-w-full">
                        <div className="flex gap-4 items-center self-center">
                          <div
                            className="cursor-pointer"
                            onClick={initiateGoogleLogin}
                          >
                            <img
                              alt=""
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5d204e59b080ce4f616673e052db4bc2b0a0fce?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                              className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
                            />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={initiateLinkedInLogin}
                          >
                            <img
                              alt=""
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ee8700da68439403de087786ef180d4c8da7bb6?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                              className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
                            />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={initiateFacebookLogin}
                          >
                            <img
                              alt=""
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a0cdd911f6878a750105fa39f4852877caada56?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                              className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-6 items-center mt-3 w-full text-base font-medium tracking-wide whitespace-nowrap text-stone-500 max-md:max-w-full">
                          <div className="flex flex-1 shrink self-stretch my-auto h-0.5 basis-0 bg-stone-500 bg-opacity-30 w-[216px]" />
                          <div className="self-stretch my-auto"> {r("OR")}</div>
                          <div className="flex flex-1 shrink self-stretch my-auto h-0.5 basis-0 bg-stone-500 bg-opacity-30 w-[216px]" />
                        </div>
                      </div>
                      <form onSubmit={handleSubmit} className="w-full max-w-full">
                        {/* Email */}
                        <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                          <div className="flex flex-wrap gap-1 items-center p-0 w-full text-right max-md:max-w-full">
                            <div className="text-base font-medium tracking-wide text-zinc-900">
                              {r("Input1")}
                            </div>
                            <div className="text-sm leading-6 text-rose-500">*</div>
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email)
                                setErrors((prev) => ({
                                  ...prev,
                                  email: undefined,
                                }));
                            }}
                            placeholder="Example@Example.com"
                            className={`px-4 py-3 mt-2 w-full text-sm bg-white border rounded text-zinc-600 focus:outline-none ${errors.email ? "border-red-500" : "border-[#D1D1DB]"
                              }`}
                          />
                          {errors.email && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </span>
                          )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                          <div className="flex flex-wrap gap-1 items-center p-0 w-full whitespace-nowrap max-md:max-w-full">
                            <div className="text-base font-medium tracking-wide text-zinc-900">
                              {r("Input2")}
                            </div>
                            <div className="text-sm leading-6 text-rose-500">*</div>
                          </div>
                          <div className="relative">

                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password)
                                  setErrors((prev) => ({
                                    ...prev,
                                    password: undefined,
                                  }));
                              }}
                              placeholder="******"
                              className={`px-4 py-3 mt-2 w-full text-sm bg-white border rounded text-zinc-600 focus:outline-none ${errors.password ? "border-red-500" : "border-[#D1D1DB]"
                                }`}
                            />
                            {errors.password && (
                              <span className="text-red-500 text-sm mt-1">
                                {errors.password}
                              </span>
                            )}
                            <button
                              type="button"
                              className="absolute top-[60%] end-3 transform -translate-y-1/2 text-zinc-500"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  data--h-bstatus="0OBSERVED"
                                >
                                  <path
                                    className="hs-password-active:hidden"
                                    d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <path
                                    className="hs-password-active:hidden"
                                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <path
                                    className="hs-password-active:hidden"
                                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <line
                                    className="hs-password-active:hidden"
                                    x1="2"
                                    x2="22"
                                    y1="2"
                                    y2="22"
                                    data--h-bstatus="0OBSERVED"
                                  ></line>
                                  <path
                                    className="hidden hs-password-active:block"
                                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <circle
                                    className="hidden hs-password-active:block"
                                    cx="12"
                                    cy="12"
                                    r="3"
                                    data--h-bstatus="0OBSERVED"
                                  ></circle>
                                </svg>
                              ) : (
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.25 7.11914C15.25 8.11914 13.5 13.3691 8 13.3691C2.5 13.3691 0.75 8.11914 0.75 7.11914C0.75 6.11914 2.5 0.869141 8 0.869141C13.5 0.869141 15.25 6.11914 15.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M10.25 7.11914C10.25 8.36178 9.24264 9.36914 8 9.36914C6.75736 9.36914 5.75 8.36178 5.75 7.11914C5.75 5.8765 6.75736 4.86914 8 4.86914C9.24264 4.86914 10.25 5.8765 10.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                              )}
                            </button>
                          </div>
                        </div>
                        <div className="col-span-12 mt-4 md:col-span-6 ">
                          <div className="flex flex-wrap gap-1 items-center p-0 w-full whitespace-nowrap max-md:max-w-full">
                            <div className="text-base font-medium tracking-wide text-zinc-900">
                              {r("Input3")}
                            </div>
                            <div className="text-sm leading-6 text-rose-500">*</div>
                          </div>
                          <div className="relative mt-2">
                            <input
                              id="repeatPassword"
                              name="repeatPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              className={`px-4 py-3 mt-2 w-full text-sm bg-white border rounded text-zinc-600 focus:outline-none ${errors.repeatPassword
                                ? "border-red-500"
                                : "border-[#D1D1DB]"
                                }`}
                              placeholder="******"
                              onChange={(e) => {
                                setRepeatPassword(e.target.value);
                                if (errors.repeatPassword)
                                  setErrors((prev) => ({
                                    ...prev,
                                    repeatPassword: undefined,
                                  }));
                              }}
                            />

                            {errors.repeatPassword && (
                              <p className="text-red-500 text-sm flex gap-2 items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="12"
                                  width="13.5"
                                  viewBox="0 0 576 512"
                                >
                                  <path
                                    fill="#ff0000"
                                    d="M569.5 440C588 472 564.8 512 527.9 512H48.1c-36.9 0-60-40.1-41.6-72L246.4 24c18.5-32 64.7-32 83.2 0l239.9 416zM288 354c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
                                  />
                                </svg>
                                <div className="justify-center">
                                  {""}
                                  {errors.repeatPassword}{" "}
                                </div>
                              </p>
                            )}
                            <button
                              type="button"
                              className="absolute top-[60%] end-3 transform -translate-y-1/2 text-zinc-500"
                              onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                              }
                            >
                              {showConfirmPassword ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  data--h-bstatus="0OBSERVED"
                                >
                                  <path
                                    className="hs-password-active:hidden"
                                    d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <path
                                    className="hs-password-active:hidden"
                                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <path
                                    className="hs-password-active:hidden"
                                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <line
                                    className="hs-password-active:hidden"
                                    x1="2"
                                    x2="22"
                                    y1="2"
                                    y2="22"
                                    data--h-bstatus="0OBSERVED"
                                  ></line>
                                  <path
                                    className="hidden hs-password-active:block"
                                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                                    data--h-bstatus="0OBSERVED"
                                  ></path>
                                  <circle
                                    className="hidden hs-password-active:block"
                                    cx="12"
                                    cy="12"
                                    r="3"
                                    data--h-bstatus="0OBSERVED"
                                  ></circle>
                                </svg>
                              ) : (
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.25 7.11914C15.25 8.11914 13.5 13.3691 8 13.3691C2.5 13.3691 0.75 8.11914 0.75 7.11914C0.75 6.11914 2.5 0.869141 8 0.869141C13.5 0.869141 15.25 6.11914 15.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M10.25 7.11914C10.25 8.36178 9.24264 9.36914 8 9.36914C6.75736 9.36914 5.75 8.36178 5.75 7.11914C5.75 5.8765 6.75736 4.86914 8 4.86914C9.24264 4.86914 10.25 5.8765 10.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                              )}
                            </button>
                          </div>
                        </div>

                        {/* phone Number */}
                        {/* <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                          <label className="mb-1 font-medium text-zinc-900">{r("Input4")}</label>
                          <div className="relative mt-2 w-full" style={{ direction: "ltr" }}>
                            <PhoneInput
                              country={"sa"}
                              value={phoneNumber}
                              inputProps={{
                                name: "phone",
                                required: true,
                                autoFocus: true,
                                className:
                                  `${`w-full pl-4 md:pl-24 pr-4 py-2 text-md border rounded focus:outline-none 
                                ${errors.phoneNumber ? `border-red-500` : `border-[#D1D1DB]`}`}`,
                              }}
                              onChange={(e: any) => {
                                setPhoneNumber(e);
                                if (errors.phoneNumber)
                                  setErrors((prev) => ({
                                    ...prev,
                                    phoneNumber: undefined,
                                  }));
                              }}
                              containerClass="w-full"
                              inputClass="w-full pl-14"
                              buttonClass=" flex items-center justify-center h-full px-2 w-20"
                              dropdownClass="z-50 bg-white shadow-lg border border-neutral-400 rounded mt-2 absolute start-0 top-8 "
                            />
                            {errors.phoneNumber && (
                              <span className="text-red-500 text-sm mt-1">
                                {errors.phoneNumber}
                              </span>
                            )}
                          </div>
                        </div> */}

                        {/* you agree to our Terms and Conditions */}
                        <div className="flex justify-between gap-10 items-center mt-4 w-full max-md:max-w-full">
                          <label className="flex gap-1.5 items-center cursor-pointer">
                            <input type="checkbox" className="w-4 h-4" required />
                            <span className="text-sm font-medium tracking-wide text-neutral-900">
                              {r("massage2")}{" "}
                              <Link
                                href={`/${language}/terms-and-conditions`}
                                className="text-primary underline"
                              >
                                {r("massage3")}
                              </Link>
                            </span>
                          </label>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4 sm:col-span-6 text-center">
                          {isLoading ? (
                            <Spinner />
                          ) : (
                            <button
                              type="submit"
                              className="flex items-center justify-center gap-2 px-4 py-3 mt-4 w-full text-lg font-bold text-white bg-primary rounded-[64px] max-md:max-w-full min-h-[58px]"
                            >
                              {r("button")}
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
                    <div className="self-center mt-6 text-sm font-medium tracking-wide text-zinc-900">
                      {r("massage4")}{" "}
                      <Link
                        href={`/${language}/login`}
                        className="text-primary underline"
                      >
                        {r("Signin")}
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-10 justify-between items-center mt-28 w-full max-md:mt-10 max-md:max-w-full"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:w-6/12 px-16 max-md:px-3">
                <div className=" rounded-xl py-5 md:pt-16 px-5 flex justify-center items-center flex-col">
                  <div
                    className="rounded-full flex justify-center items-center"
                    style={{ width: "100px", height: "100px", padding: "10px" }}
                  >
                    <svg
                      width="64"
                      height="65"
                      viewBox="0 0 64 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M63.6673 32.5006C63.6673 49.9897 49.4897 64.1673 32.0006 64.1673C14.5116 64.1673 0.333984 49.9897 0.333984 32.5006C0.333984 15.0116 14.5116 0.833984 32.0006 0.833984C49.4897 0.833984 63.6673 15.0116 63.6673 32.5006ZM44.7634 22.9046C45.6909 23.8321 45.6909 25.3359 44.7634 26.2634L28.93 42.0967C28.0025 43.0242 26.4988 43.0242 25.5713 42.0967L19.2379 35.7634C18.3104 34.8359 18.3104 33.3321 19.2379 32.4046C20.1654 31.4771 21.6692 31.4771 22.5967 32.4046L27.2506 37.0586L34.3276 29.9816L41.4046 22.9046C42.3321 21.9771 43.8359 21.9771 44.7634 22.9046Z"
                        fill="#28C76F"
                      />
                    </svg>
                  </div>
                  <p className="text-2xl font-medium text-center mt-4 capitalize">
                    {" "}
                    {t("verify")}
                  </p>
                  <p className=" my-4 text-[#6C7278] text-xs capitalize">
                    {t("verify1")}
                  </p>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4  sm:col-span-6 text-center mt-0">
                  <Link
                    href={`/${language}/verify-mail`}
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-3 mt-4 w-full text-lg font-bold text-white bg-primary rounded-[64px] max-md:max-w-full"
                  >
                    {t("verify2")}
                  </Link>
                </div>
              </div>
            )}
            <SideSectionRegister />
          </div>
        </div>
      }
    </>
  );
}

export default Register;
