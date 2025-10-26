"use client";
import { useTranslations } from "next-intl";
import React from "react";

function NotFoundReq() {
const t = useTranslations("Profile");
  return (
    <div className="flex overflow-hidden flex-col self-stretch lg:p-8 bg-white rounded-3xl border border-gray border-solid my-5">
      <div className="flex flex-col w-full text-lg font-bold text-start text-blue-900 whitespace-nowrap max-md:max-w-full">
      </div>
      <div className="flex overflow-hidden flex-col justify-center px-1 md:px-5 py-3 mt-8 w-full rounded-xl min-h-[477px] max-md:max-w-full">
        <div className="flex gap-2.5 justify-center items-center self-center px-2.5 bg-gray-50 aspect-square min-h-[240px] rounded-[100px] w-[240px] bg-[#F8F9FA]">
          <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-[120px]">
            <svg width="150" height="151" viewBox="0 0 150 151" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.987 80.8318C17.1733 86.7157 18.7472 94.8967 21.8952 111.259C24.1613 123.037 25.2943 128.927 29.2202 132.835C30.2388 133.849 31.3784 134.747 32.6162 135.513C37.3872 138.464 43.7212 138.464 56.3892 138.464H99.8608C112.529 138.464 118.863 138.464 123.634 135.513C124.872 134.747 126.011 133.849 127.03 132.835C130.956 128.927 132.089 123.037 134.355 111.259C137.503 94.8967 139.077 86.7157 135.263 80.8318C134.29 79.3303 133.09 77.9712 131.701 76.7977C126.257 72.1992 117.458 72.1992 99.8608 72.1992H56.3892C38.7917 72.1992 29.993 72.1992 24.5495 76.7977C23.1604 77.9712 21.9602 79.3303 20.987 80.8318ZM60.5948 108.344C60.5948 105.849 62.7353 103.826 65.3757 103.826H90.8735C93.5139 103.826 95.6544 105.849 95.6544 108.344C95.6544 110.839 93.5139 112.862 90.8735 112.862H65.3757C62.7353 112.862 60.5948 110.839 60.5948 108.344Z" fill="#1E4C83" />
              <path opacity="0.5" d="M22.3518 78.9936C23.0175 78.2058 23.7526 77.4711 24.55 76.7975C29.9935 72.199 38.7922 72.199 56.3897 72.199H99.8613C117.459 72.199 126.258 72.199 131.701 76.7975C132.501 77.473 133.238 78.21 133.905 79.0002V61.9385C133.905 56.2578 133.905 51.5448 133.372 47.7871C132.809 43.8213 131.582 40.306 128.65 37.4177C128.172 36.9465 127.667 36.4994 127.138 36.0778C123.939 33.5288 120.105 32.4864 115.764 32.0029C111.582 31.537 106.314 31.5371 99.8564 31.5372L97.6516 31.5372C91.5135 31.5372 89.313 31.5015 87.3197 30.9981C86.1489 30.7025 85.0253 30.2895 83.9707 29.7697C82.1943 28.894 80.6462 27.5749 76.2985 23.7231L73.3355 21.0978C72.0914 19.9954 71.2423 19.2429 70.3322 18.5746C66.4282 15.7073 61.6742 13.9731 56.6971 13.5607C55.5381 13.4647 54.3555 13.4648 52.5852 13.4649L51.8576 13.4649C47.8534 13.4642 45.2108 13.4638 42.9162 13.8473C32.8859 15.524 24.775 22.5363 22.7994 31.8133C22.3499 33.9239 22.3506 36.342 22.3517 39.8306L22.3518 78.9936Z" fill="#1E4C83" />
            </svg>

          </div>
        </div>
        <div className="flex flex-col justify-center mt-11 w-full text-center max-md:mt-10 max-md:max-w-full">
          <div className="text-xl lg:text-3xl font-bold text-neutral-800 max-md:max-w-full capitalize">
          {t("notFound")}
          </div>
          <div className="self-center mt-7 text-base text-zinc-500 max-md:max-w-full capitalize">
          {t("notFound2")}
          </div>
        </div>
      </div>
    </div>
  );
}


export default NotFoundReq;
