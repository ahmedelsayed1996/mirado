import Image from 'next/image'
import React from 'react'
import { useTranslations } from "next-intl";


function Offer() {
      const t = useTranslations("cantMiss");

    return (
      <div className="flex flex-col items-center p-5 md:p-20 bg-gray-50  bg-secondColor capitalize">
        <div className="mt-5 text-2xl md:text-4xl font-semibold tracking-normal text-center text-gray-900 leading-[56px] max-md:max-w-full">
          {t("offerCantMiss")}
        </div>
        <div className="mt-6 text-base md:text-xl tracking-tight leading-7 text-center text-zinc-500 w-[723px] max-md:max-w-full">
          {t("paragraph1")}
        </div>
        <div className="flex justify-center items-center px-5 lg:px-16 mt-14 w-full bg-primary rounded-[30px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="w-full max-w-[1318px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-9 font-medium  max-md:max-w-full capitalize">
                  <div className="text-2xl md:text-4xl font-semibold  text-white leading-[56px] max-md:max-w-full">
                    {t("head")}
                  </div>
                  <div className="mt-2 lg:mt-6 text-base md:text-xl lg:text-2xl tracking-normal leading-7 text-white max-md:max-w-full">
                    {t("paragraph2")}
                  </div>
                  <button className="justify-center items-center capitalize px-2 py-2 my-2 lg:mt-8  text-base tracking-tight leading-6 text-center text-gray-900 bg-white rounded-xl  max-md:px-5 md:w-[200px]">
                    {t("connectButton")}
                  </button>
                </div>
              </div>
              <div className="hidden md:flex flex-col w-[34%] lg:w-[26%] max-md:ml-0 max-md:w-full">
                <Image
                  src="/images/hero-section.svg"
                  width={200}
                  height={100}
                  alt="student"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Offer
