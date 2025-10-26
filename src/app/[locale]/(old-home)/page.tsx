
"use client"
import { useTranslations } from "next-intl";
import Image from "next/image";

import Link from "next/link";
import '../globals.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { AppDispatch } from "@/app/store";
import Hero from "@/app/_components/Hero";
import SwiperSliderLogo from "@/app/_components/SwiperSliderLogo";
import BioHead from "@/app/_components/BioHead";
import ProductUNI from "@/app/_components/ProductUNI";
import Button from "@/app/_components/Button";
import ProductINS from "@/app/_components/ProductINS";
import About from "@/app/_components/About";
import FQA from "@/app/_components/FQA";

export default function Home() {
  const t = useTranslations("Universities");
  const i = useTranslations("institutes");
  const c = useTranslations("avalCountries");
  const m = useTranslations("CustomerReviews");
  const b = useTranslations("Blogs");
  const U = useTranslations("contactUs");
  const [propsValue, setPropsValue] = useState(3);
  const language = useCurrentLang();
  const dispatch = useDispatch<AppDispatch>();
  const locale = useCurrentLang();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPropsValue(window.innerWidth <= 1024 ? 4 : 3);
    }
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setPropsValue(4);
      } else {
        setPropsValue(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);






  return (
    <main>
      <Hero />
      {/* <Slider /> */}
      <div className="flex gap-5 px-12 py-3 bg-[#f8f9fa]  max-md:px-5  cursor-pointer">
        <SwiperSliderLogo />
      </div>
      <BioHead button={t("uniButton")} headLine={t("RecommendUNI")} summary={t("uniRecomm")} bg="bg-white" />
      <ProductUNI props={propsValue} recommended="true" />
      <div className="my-5 md:my-20 flex justify-center items-center">
        <Button url="university" />
      </div>

      <BioHead button={i("insButton")} headLine={i("RecommendIns")} summary={i("insRecomm")} bg="bg-secondColor" />
      <ProductINS props={propsValue} recommended="true" bg="secondColor" />
      <div className="py-5 md:py-20 flex justify-center items-center bg-secondColor">

        <Button url="language-schools" />
      </div>
      {/* maps section*/}
      {/* <div className="flex flex-col items-center  tracking-tight leading-7 mt-20 mb-16">
        <div className="justify-center px-8 py-1.5 font-medium text-primary whitespace-nowrap border border-primary border-solid rounded-[80px] max-md:px-5 text-base md:text-xl">
          {c("title")}
        </div>
        <div className="self-stretch mt-3 w-full text-2xl md:text-4xl font-semibold tracking-normal text-center text-gray-900 max-md:max-w-full">
          {c("head")}
        </div>
        <div className="mt-6 leading-7 text-center text-zinc-500 text-base md:text-xl px-2">
          {c("paragraph")}
        </div>
      </div> */}
      <BioHead button={c("title")} headLine={c("head")} summary={c("paragraph")} bg="bg-white" />
      {/* offers section*/}
      <div className="flex justify-center items-center text-center">
        <Image
          src="/images/location map.png"
          width={1280}
          height={800}
          alt="location"
        />
      </div>
      {/* <Offer /> */}
      {/* testimonial section*/}
      {/* <div className="flex flex-col justify-center bg-primary">
        <div className="flex overflow-hidden relative flex-col items-center p-20 w-full min-h-[743px] max-md:px-5 max-md:max-w-full">
          <Image
            src="/images/linemog.svg"
            width={1280}
            height={800}
            alt="location"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="relative justify-center px-6 py-1.5 mt-5 text-base md:text-xl font-medium tracking-tight leading-7 text-white bg-[#326097] rounded-[80px] max-md:px-5">
            {m("title")}
          </div>
          <div className="relative mt-3 text-2xl md:text-4xl font-semibold tracking-normal text-center text-white leading-[56px] max-md:max-w-full">
            {m("head")}
          </div>
          <div className="relative mt-6 text-base md:text-xl tracking-tight leading-7 text-center text-[#ACB5BB] w-[723px] max-md:max-w-full">
            {m("paragraph")}
          </div>
          <Testimonial />
        </div>
      </div> */}
      <About showButton={true} />

      {/* posts section*/}
      {/* <div className="flex flex-col items-center pt-8 px-8 pb-16  bg-gray-50 max-md:px-5 bg-secondColor">
        <BioHead button={b("BlogsLabel")} headLine={b("head")} summary={b("paragraph")} bg="bg-secondColor" />
        <div className="self-stretch max-md:mt-10 max-md:max-w-full">
          <Posts props="3" />
        </div>
        <Link href={`${language}/blogs`} className="justify-center px-10 py-3 mt-14 text-base font-medium tracking-tight leading-6 text-center rounded-xl border border-solid border-primary text-primary max-md:px-5 max-md:mt-10 hover:bg-primary hover:text-white transition-all duration-300">
          {b("viewallButton")}
        </Link> 
      </div> */}
      {/* FQA section */}
      <FQA />
      {/* Contact Us section */}
      <div className="flex justify-center items-center px-16 pb-20 pt-14 font-medium text-center bg-secondColor max-md:px-5">
        <div className="w-full">
          <div className="flex flex-col justify-center font-medium text-center bg-primary rounded-[30px]">
            <div className="flex overflow-hidden relative flex-col items-center px-20 py-9 w-full min-h-[355px] max-md:px-5 max-md:max-w-full justify-center">
              <Image
                src="/images/linemog2.svg"
                width={1280}
                height={800}
                alt="location"
                className="object-cover absolute inset-0 size-full"
              />
              <div className="relative text-2xl md:text-4xl font-semibold tracking-normal text-white leading-[56px] max-md:max-w-full">
                {U("head")}
              </div>
              <div className="relative mt-6 text-base md:text-2xl tracking-tighter md:leading-10 text-white w-full max-md:max-w-full">
                {U("paragraph")}
              </div>
              <div className="relative mt-6 text-base md:text-2xl tracking-tighter md:leading-10 text-white w-full max-md:max-w-full">
                {U("paragraph2")}
              </div>
              <Link href={`/${language}/contact`} className="relative justify-center items-center px-6 py-4 mt-6 max-w-full text-base tracking-tight leading-6 text-gray-900 bg-white rounded-xl w-[227px] max-md:px-5">
                {U("connectButton")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
