"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import Spinner from "../../../_components/Spinner";

import Loader from "@/app/_components/Loader";
import SideSectionRegister from "@/app/_components/SideSectionRegister";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const l = useTranslations("Login");
  const { tokenMainSite } = parseCookies();

  const locale = useCurrentLang();
  const language = useCurrentLang();
  const router = useRouter();

  // ✅ helper to decide redirect target
  const getReturnUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get("returnUrl");
    return returnUrl || `/${language}/`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = `${l("massage3")}`;
    if (!password.trim()) newErrors.password = `${l("massage4")}`;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        setIsLoading(false);
        throw new Error(result.message);
      }

      const result = await response.json();

      setIsLoading(false);
      toast.success(result.message);

      setCookie(null, "tokenMainSite", result.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

       
      router.push(getReturnUrl());
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      setErrors(error.message);
      setError(error.message);
    }
  };

 
  const initiateGoogleLogin = () => {
    const returnUrl = getReturnUrl();
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/google?returnUrl=${encodeURIComponent(returnUrl)}`;
  };
  const initiateFacebookLogin = () => {
    const returnUrl = getReturnUrl();
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/facebook?returnUrl=${encodeURIComponent(returnUrl)}`;
  };
  const initiateLinkedInLogin = () => {
    const returnUrl = getReturnUrl();
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/linkedin?returnUrl=${encodeURIComponent(returnUrl)}`;
  };

   
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token: any = urlParams.get("token");
    if (token) {
      setCookie(null, "tokenMainSite", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      router.push(getReturnUrl());
    }
  }, [router]);

   
  useEffect(() => {
    if (tokenMainSite) {
      router.push(getReturnUrl());
    } else {
      setLoading(false);
    }
  }, [router, tokenMainSite]);


  return (
    <>
      {loading ? <Loader /> :
        <div className="overflow-hidden py-5 bg-zinc-100 ">
          <div className="flex items-center gap-5 flex-col lg:flex-row">
            <div className="flex flex-col lg:w-6/12 px-16 max-md:px-3">
              <div className="flex flex-col  w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col self-center max-w-full">
                  <div className="flex flex-col justify-center w-full max-md:max-w-full">
                    <Link
                      href={`/${language}`}
                      className="md:flex md:items-center md:gap-12 cursor-pointer"
                    >
                      <Image src="/logo.svg" alt="logo" width={120} height={100} />
                    </Link>
                    <div className="flex flex-col justify-center mt-2.5 w-full max-md:max-w-full">
                      <div className="gap-1.5 self-stretch w-full text-3xl font-bold text-slate-900 max-md:max-w-full">
                        {l("H1")}
                      </div>
                      <div className="mt-1.5 text-sm tracking-wide text-zinc-800 max-md:max-w-full">
                        {l("massage1")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                    <div className="flex flex-col justify-center w-full max-md:max-w-full">
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
                        <div className="self-stretch my-auto"> {l("OR")}</div>
                        <div className="flex flex-1 shrink self-stretch my-auto h-0.5 basis-0 bg-stone-500 bg-opacity-30 w-[216px]" />
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full max-w-full">
                      {/* Email */}
                      <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                         
                        {!error && (
                          <p className="col-span-6 text-red-500 text-start">
                            {error === "Email is not verified" ? (
                              <Link
                                href={`/${language}/verify-mail-by-code`}
                                className="text-primary underline-offset-1 underline text-red-500"
                              >
                                {error} Take to Verify Code
                              </Link>
                            ) : (
                              error
                            )}{" "}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1 items-center p-0 w-full text-right max-md:max-w-full">
                          <div className="text-base font-medium tracking-wide text-zinc-900">
                            {l("Input1")}
                          </div>
                          <div className="text-sm leading-6 text-rose-500">*</div>
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email)
                              setErrors((prev) => ({ ...prev, email: undefined }));
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
                            {l("Input2")}
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
                            ) : (<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.25 7.11914C15.25 8.11914 13.5 13.3691 8 13.3691C2.5 13.3691 0.75 8.11914 0.75 7.11914C0.75 6.11914 2.5 0.869141 8 0.869141C13.5 0.869141 15.25 6.11914 15.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10.25 7.11914C10.25 8.36178 9.24264 9.36914 8 9.36914C6.75736 9.36914 5.75 8.36178 5.75 7.11914C5.75 5.8765 6.75736 4.86914 8 4.86914C9.24264 4.86914 10.25 5.8765 10.25 7.11914Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            )}
                          </button>
                          {errors.password && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.password}
                            </span>
                          )}
                        </div>
                      </div>


                      {/* Forget password and Remember me */}
                      <div className="flex justify-between gap-10 items-center mt-4 w-full max-md:max-w-full">
                        <Link
                          href={`/${language}/forget-password`}
                          className="text-base font-medium tracking-wide text-primary underline cursor-pointer"
                        >
                          {l("label1")}
                        </Link>
                        <label className="flex gap-1.5 items-center cursor-pointer">
                          <input type="checkbox" className="w-4 h-4" />
                          <span className="text-sm font-medium tracking-wide text-neutral-900">
                            {l("label2")}
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
                            {l("signIn")}
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
                    {l("massage2")}{" "}
                    <Link
                      href={`/${language}/register`}
                      className="text-primary underline"
                    >
                      {l("Signup")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <SideSectionRegister />
          </div>
        </div>
      }
    </>

  );
}

export default Login

