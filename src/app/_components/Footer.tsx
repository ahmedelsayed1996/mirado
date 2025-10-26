"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from "next-intl";
import useCurrentLang from "../_hooks/useCurrentLang";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { headers } from "next/headers";

function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("footer");
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
      toast.success("You have successfully subscribed to the newsletter.");
      // setData(postsData);
      // setError(null);
    } catch (err: any) {
      setIsLoading(false);
      toast.error("Something Wrong please try again later");
      console.log(err);
      // setError(err.message);
      // setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <footer className="bg-[#144279]">
        <div className="mx-auto max-w-screen-xl p-4 md:py-16 sm:px-6 lg:px-8 ">
          <div className="lg:flex lg:items-start lg:gap-8 ">
            <div className="md:mt-8 lg:mt-0 flex flex-col md:flex-row md:gap-x-6">
              <div className="my-2 md:basis-3/6">
                <Image
                  src="/logo-secoundry.svg"
                  alt="logo"
                  width={90}
                  height={90}
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
                <div>
                  <p className="mt-4 text-gray-500 text-gray text-sm font-medium">
                    {t("paragraph")}
                  </p>
                </div>
              </div>
              <div className="my-2 md:basis-1/6">
                <p className="font-semibold text-[#F8F8FD] capitalize">
                  {" "}{t("importantSources")}

                </p>
                <ul className="mt-6 space-y-4 text-sm capitalize">
                  <li>
                    <Link
                      href={`/${language}`}
                      className="text-gray transition hover:opacity-75"
                    >
                      {t("home")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${language}/university`}
                      className="text-gray transition hover:opacity-75"
                    >
                      {t("Universities")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${language}/language-schools`}
                      className="text-gray transition hover:opacity-75"
                    >
                      {t("institutes")}
                    </Link>
                  </li>

                </ul>
              </div>
              <div className="my-2 md:basis-1/6 capitalize">
                <p className="font-semibold text-[#F8F8FD]">
                  {t("aboutSite")}
                </p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      href={`/${pathname.slice(1, 3)}/about`}
                      className="text-gray transition hover:opacity-75"
                    >
                      {t("whoWeAre")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${language}/contact`}
                      // href={`/${window.location.pathname.slice(1, 3)}/contact`}
                      className="text-gray transition hover:opacity-75"
                    >
                      {t("contact")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="my-2 md:basis-1/6 capitalize">
                <p className="font-semibold text-[#F8F8FD]">{t("Subscribe")}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <p
                      className="text-gray transition "
                    >
                      {t("getPaidEmail")}
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="flex gap-3 max-w-[325px] mt-4"
                    >

                      <label htmlFor="emailInput" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="emailInput"
                        type="email"
                        name="email"
                        required
                        placeholder={t("searchLabel")}
                        className="flex-1 shrink gap-2.5 self-start px-3 py-3 text-base text-start rounded-lg border border-blue-900 border-solid  text-black"
                        aria-label="email address"
                      />
                      {isLoading ? <Spinner /> : <button
                        type="submit"
                        className="gap-2.5 self-stretch px-4 py-3 h-full text-sm text-center bg-primary rounded-md text-slate-50"
                      >
                        {t("searchButton")}
                      </button>}

                    </form>

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="  bg-[#245086] ">
        <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8 ">
          <div className="sm:flex sm:justify-between items-center">
            <div className="text-xs text-gray">
              <ul className="mt-6 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                <li>
                  <span className=" cursor-pointer transition hover:opacity-75">
                    {t("rightsSave")} {currentYear}
                  </span>
                </li>

                <li className="flex gap-2">
                  <Link
                    href={`/${language}/privacy-policy`}
                    className=" transition hover:opacity-75"
                  >
                    {t("privacyPolicy")} &nbsp; |
                  </Link>

                  <Link
                    href={`/${language}/terms-and-conditions`}
                    className=" transition hover:opacity-75 "
                  >
                    {t("termsConditions")} &nbsp; |
                  </Link>
                  <Link
                    href={`/${language}/refund-policy`}
                    className=" transition hover:opacity-75"
                  >
                    {t("refundPolicy")}
                  </Link>
                </li>
              </ul>
            </div>

            <ul className=" flex flex-wrap justify-start gap-4 text-xs mt-3 lg:justify-end">
              <li>
                <Link
                  href="https://x.com/eduxaedu"
                  className=" transition hover:opacity-75 cursor-pointer"
                >
                  <Image
                    src="/images/XLogo.png"
                    alt="Instagram"
                    width={45}
                    height={45}
                  />
                </Link>
              </li>

              <li>
                <a href="https://www.facebook.com/eduxa.study/" className=" transition hover:opacity-75">
                  <Image
                    src="/images/Facebook.svg"
                    alt="Facebook"
                    width={45}
                    height={45}
                  />
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/company/eduxa/" className=" transition hover:opacity-75">
                  <Image
                    src="/images/LinkedIn.svg"
                    alt="LinkedIn"
                    width={45}
                    height={45}
                  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/eduxa.study/" className=" transition hover:opacity-75">
                  <Image
                    src="/images/Instagram.svg"
                    alt="Instagram"
                    width={45}
                    height={45}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
