"use client"
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
// import useCurrentLang from "../_hooks/useCurrentLang";
import Link from "next/link";
import useCurrentLang from "../_hooks/useCurrentLang";


function About({ showButton }: any) {
  const t = useTranslations("aboutUs");
  const h = useTranslations("home");
  const language = useCurrentLang();
  return (

    <div className="flex justify-center items-center px-8 md:pt-10 pb-2 lg:px-16 lg:py-20 max-md:px-5 text-justify">
      <div className="mt-5 mb-14 w-full max-w-[1548px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full ">
            <div className="flex flex-col  justify-center max-md:mt-10 max-md:max-w-full items-start">
              <Image
                src="/images/banner1.png"
                width={600}
                height={600}
                alt="team work"
                className="w-full aspect-[1.3] max-md:max-w-full"
              />
            </div> 
          </div>

          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="justify-center self-start px-8 py-1.5 text-xl font-medium tracking-normal leading-7 text-primary border border-primary border-solid rounded-[80px] max-md:px-5">
                {t("aboutUsLabel")}
              </div>
              <div className="mt-2 lg:mt-8 text-lg lg:text-2xl font-semibold leading-7 lg:leading-10 text-gray-900 capitalize text-ellipsis max-md:max-w-full">
                {t("head")}
              </div>
              <div className="mt-1 lg:mt-8 text-sm md:text-lg leading-6 lg:text-xl lg:leading-8  capitalize text-zinc-500 max-md:max-w-full">
                {t("paragraph")}
              </div>
              <div className="mt-2 max-md:max-w-full">
                <div className="flex gap-5  max-md:gap-0">
                  <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow leading-[150%] max-md:mt-10">
                      <div className="text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 max-md:text-4xl">
                        10 {h("counter5")}<span className="text-primary">+</span>
                      </div>
                      <div className="mt-1.5 sm:text-sm lg:text-lg font-medium tracking-tight text-start text-zinc-500">
                        {h("counter1")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow leading-[150%] max-md:mt-10">
                      <div className="text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 max-md:text-4xl">
                        900<span className="text-primary">+</span>
                      </div>
                      <div className="mt-1.5 sm:text-sm lg:text-lg font-medium tracking-tight text-start text-zinc-500">
                        {h("counter2")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow leading-[150%] max-md:mt-10">
                      <div className="text-4xl text-nowrap lg:text-5xl font-bold tracking-tighter text-gray-900 max-md:text-4xl">
                        100 {h("counter5")}<span className="text-primary">+</span>
                      </div>
                      <div className="mt-1.5 sm:text-sm lg:text-lg font-medium tracking-tight text-start text-zinc-500">
                        {h("counter4")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showButton && <Link href={`/${language}/about`} className="group flex gap-2.5 justify-center self-start py-2 pr-5 pl-3 lg:pr-9 lg:pl-6 lg:py-5 mt-2 text-sm lg:text-base  font-medium tracking-tight leading-6 text-center text-white bg-primary rounded-xl max-md:px-5 lg:mt-10 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 items-center">
                <div>{h("knowUs")}</div>
                {language == "en" ? <svg
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-300 group-hover:fill-blue-500"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.511907 15.5694C0.197412 15.2999 0.160991 14.8264 0.430558 14.5119L6.01219 7.99999L0.430558 1.48808C0.160991 1.17359 0.197412 0.70011 0.511907 0.430544C0.826401 0.160977 1.29988 0.197399 1.56944 0.511893L7.56944 7.51189C7.81019 7.79276 7.81019 8.20721 7.56944 8.48808L1.56944 15.4881C1.29988 15.8026 0.826401 15.839 0.511907 15.5694Z"
                    fill="white"
                  />
                </svg> : <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.48809 0.430571C7.80259 0.700138 7.83901 1.17361 7.56944 1.48811L1.98781 8.00001L7.56944 14.5119C7.83901 14.8264 7.80259 15.2999 7.48809 15.5695C7.1736 15.839 6.70012 15.8026 6.43056 15.4881L0.430558 8.48811C0.189814 8.20724 0.189814 7.79279 0.430558 7.51192L6.43056 0.51192C6.70012 0.197426 7.1736 0.161005 7.48809 0.430571Z" fill="white" />
                </svg>}

              </Link>}


            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default About;
