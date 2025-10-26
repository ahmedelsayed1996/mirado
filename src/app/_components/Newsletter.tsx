"use client";
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from "next-intl";
import useCurrentLang from "../_hooks/useCurrentLang";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
const Newsletter = () => {

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("newsLetter");
  const language = useCurrentLang();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const currentYear = new Date().getFullYear();





  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const mail = e.target.email.value;
    // console.log("mail", mail);
    setIsLoading(true);
    const raw = JSON.stringify({
      "email": mail
    });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"


        },
        body: raw,
      }
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let postsData = await response.json();
      console.log(postsData);
      setIsLoading(false);
      toast.success(t("SubscribedSuccessfully"));
      // setData(postsData);
      // setError(null);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(t("SubscribedFFailed"));
      console.log(err);
      // setError(err.message);
      // setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-neutral-50 mt-0">
      <div className="px-5 lg:px-16 xl:px-28">
        <div className="bg-white rounded-3xl py-4 lg:py-0 pl-2">
          {/* Force layout LTR so first child stays left, second right */}
          <div dir="ltr" className="flex flex-col lg:flex-row items-center gap-10 ps-2 md:ps-4 md:pe-0 pe-2">

            {/* Content/Text/Form (let content choose direction) */}
            <div className="w-full" dir="auto">
              <div className="text-sm font-medium [color:#A5A5A5]">{t("Subscribe")}</div>
              <h2 className="mt-2 font-bold text-xl md:text-2xl leading-[145%] text-zinc-900">
                {t("getPaidEmail")}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex w-full gap-2 md:flex-row flex-col"
              >
                <input
                  id="emailInput"
                  type="email"
                  name="email"
                  required
                  placeholder={t("searchLabel")}
                  aria-label="email address"
                  className="flex-1 h-14 md:h-[66px] rounded-[999px] bg-[#F3F4F6] border border-zinc-200 px-5 text-base text-neutral-700 placeholder-[#A5A5A5] outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition"
                />

                {isLoading ? (
                  <Spinner />
                ) : (
                  <button
                    type="submit"
                    className="bg-amber-500 text-white text-[clamp(.9rem,1vw,2rem)] py-2 px-1 md:px-4 w-full md:w-[20%] rounded-full hover:bg-amber-600 transition-colors duration-300 text-xs md:text-base font-semibold flex items-center justify-center"
                  >
                    {t("searchButton")}
                  </button>
                )}
              </form>
            </div>

            {/* Image (always ends up on the right on lg+) */}
            <div className="hidden lg:block relative w-[400px] h-[332px] shrink-0">
              <div className="absolute inset-0 rounded-3xl" />
              <div className="relative w-full h-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/newsletter_img-1 1.png"
                    alt="Newsletter visual"
                    fill
                    sizes="400px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  )
}

export default Newsletter
