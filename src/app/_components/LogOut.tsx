"use client";
import { destroyCookie } from "nookies";
import React, { useState } from "react";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
var onclick: ((this: Window, ev: MouseEvent) => any) | null;
interface cancelPopUp {
  onClose: () => void;
}
function LogOut({ onClose }: cancelPopUp) {
  const router = useRouter();
  const language = useCurrentLang();
  const t = useTranslations("Profile");
  const s = useTranslations("Setting");


  const handleLogOut = () => {
    destroyCookie(null, 'tokenMainSite', {
      path: '/',
    });
    router.push(`/`)
  }

  return (
    <div className="flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-50 size-full z-30">
      <div className="bg-white rounded-3xl w-[665px]">
        <div className="flex justify-between items-center px-6 py-3 border-b border-solid border-b-zinc-100">
          <div className="text-2xl font-bold text-zinc-900">{s("head5")}</div>
          <div className="cursor-pointer" onClick={onClose}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0002 10.8287L5.79975 15.0291C5.68447 15.1444 5.54725 15.2017 5.38808 15.201C5.22878 15.2001 5.0901 15.1407 4.97204 15.0226C4.85829 14.9046 4.80253 14.7683 4.80475 14.6139C4.80683 14.4596 4.86475 14.3256 4.9785 14.2118L9.17246 10.001L4.9785 5.79015C4.87003 5.68182 4.81447 5.54911 4.81183 5.39202C4.8092 5.23494 4.86475 5.09737 4.9785 4.97932C5.09225 4.86126 5.22739 4.8005 5.38392 4.79702C5.54045 4.79355 5.67906 4.85084 5.79975 4.9689L10.0002 9.17327L14.2045 4.9689C14.3172 4.85626 14.4531 4.80029 14.6123 4.80098C14.7716 4.80182 14.9116 4.86126 15.0323 4.97932C15.1434 5.09737 15.1978 5.23362 15.1956 5.38807C15.1935 5.54237 15.1356 5.6764 15.0218 5.79015L10.8279 10.001L15.0218 14.2118C15.1303 14.3201 15.1859 14.4529 15.1885 14.6099C15.1911 14.767 15.1356 14.9046 15.0218 15.0226C14.9081 15.1407 14.7729 15.2015 14.6164 15.2049C14.4599 15.2084 14.3226 15.1498 14.2045 15.0291L10.0002 10.8287Z" fill="#A5A5A5" />
          </svg>
          </div>
        </div>
        <div className="px-6 py-5 text-xl font-semibold text-zinc-900">
          {t("logout")}
        </div>
        <div className="flex gap-1.5 justify-end p-6">
          <button onClick={onClose} className="h-12 text-base font-medium border border-solid cursor-pointer border-zinc-300 rounded-[64px] text-stone-500 w-40 max-sm:w-full">
            {t("lable18")}
          </button>
          <button onClick={handleLogOut} className="w-40 h-12 text-base text-white bg-rose-700 cursor-pointer border-[none] rounded-[64px]">
            {s("head5")}

          </button>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
