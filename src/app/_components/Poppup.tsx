"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface CheckIsLoggedIn {
  onClose: () => void;
  obj: {
    title: string;
    prev: string;
    url: string;
    urlTwo: string;
    button: string;
  };
}

function Poppup({ onClose, obj }: CheckIsLoggedIn) {
  const t = useTranslations("Poppup");
  const pathname = usePathname(); 

  
  const loginUrl = `/${pathname.slice(1, 3)}/login?returnUrl=${encodeURIComponent(
    pathname
  )}`;
  const registerUrl = `/${pathname.slice(1, 3)}/register?returnUrl=${encodeURIComponent(
    pathname
  )}`;

  return (
    <div className="flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-50 size-full z-30">
      <div className="flex flex-col p-6 my-36 max-w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl w-[700px] lg:w-[786px] max-md:px-5 max-md:mt-10 ">
        <div className="flex z-10 justify-center items-center px-5 w-14  max-md:px-5 cursor-pointer self-end"
          onClick={onClose}>
          <p className="font-medium text-[#A5A5A5]">{"X"}</p>
        </div>
        <hr className="w-full text-gray my-6" />
        <div className="flex justify-center items-center self-center  p-2.5 -mt-2 max-w-full  rounded-[50px] w-[130px] h-[130px] max-md:px-5">
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M55 0C44.1221 0 33.4884 3.22569 24.4437 9.26917C15.399 15.3126 8.34947 23.9025 4.18665 33.9524C0.0238306 44.0023 -1.06535 55.061 1.05683 65.73C3.17902 76.3989 8.41726 86.199 16.1092 93.8909C23.801 101.583 33.6011 106.821 44.2701 108.943C54.939 111.065 65.9977 109.976 76.0476 105.813C86.0975 101.651 94.6874 94.6011 100.731 85.5564C106.774 76.5117 110 65.878 110 55C110 47.7773 108.577 40.6253 105.813 33.9524C103.049 27.2795 98.9981 21.2163 93.8909 16.1091C88.7837 11.0019 82.7205 6.95063 76.0476 4.18663C69.3747 1.42262 62.2227 0 55 0ZM60.5 77C60.5 78.4587 59.9206 79.8576 58.8891 80.8891C57.8577 81.9205 56.4587 82.5 55 82.5C53.5413 82.5 52.1424 81.9205 51.1109 80.8891C50.0795 79.8576 49.5 78.4587 49.5 77V49.5C49.5 48.0413 50.0795 46.6424 51.1109 45.6109C52.1424 44.5795 53.5413 44 55 44C56.4587 44 57.8577 44.5795 58.8891 45.6109C59.9206 46.6424 60.5 48.0413 60.5 49.5V77ZM55 38.5C53.9122 38.5 52.8489 38.1774 51.9444 37.5731C51.0399 36.9687 50.335 36.1098 49.9187 35.1048C49.5024 34.0998 49.3935 32.9939 49.6057 31.927C49.8179 30.8601 50.3418 29.8801 51.1109 29.1109C51.8801 28.3417 52.8601 27.8179 53.927 27.6057C54.9939 27.3935 56.0998 27.5024 57.1048 27.9187C58.1098 28.3349 58.9688 29.0399 59.5731 29.9444C60.1775 30.8488 60.5 31.9122 60.5 33C60.5 34.4587 59.9206 35.8576 58.8891 36.8891C57.8577 37.9205 56.4587 38.5 55 38.5Z" fill="#F89A21" />
          </svg>

        </div>
        <div className="mt-4 text-xl md:text-3xl font-medium text-center text-gray-900 max-md:max-w-full">
          {obj?.title}
        </div>
        <div className=" text-lg text-center text-neutral-500">
          {obj?.prev}

        </div>
        <div className="flex gap-5">
          
          <Link
            href={obj?.url === "login" ? loginUrl : `/${pathname.slice(1, 3)}/${obj?.url}`}
            className="justify-center text-center py-3 mt-10 whitespace-nowrap rounded-3xl px-9 md:px-28 lg:px-36 border border-primary text-primary bg-white transition-all duration-300"
          >
            {obj?.button}
          </Link>

          {obj?.urlTwo === "register" && (
            <Link
              href={registerUrl}
              className="justify-center text-center py-3 mt-10 whitespace-nowrap text-white bg-primary rounded-3xl px-9 md:px-28 lg:px-32 border transition-all duration-300 capitalize"
            >
              {t("button3")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Poppup;
 