
"use client";
import SwiperSliderLogo from "@/app/_components/SwiperSliderLogo";
import SwiperSliderUNI from "@/app/_components/SwiperSliderUNI";
import SwiperSliderINS from "@/app/_components/SwiperSliderINS";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { getAllLanguageSchools } from "@/app/reduxTool-kit/slices/languageSchoolsSlice";
import { getAllUniversities } from "@/app/reduxTool-kit/slices/universitiesSlice";
import { AppDispatch } from "@/app/store";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewHero from "../_components/NewHero";
import NewSearch from "../_components/NewSearch";
import NewAbout from "../_components/NewAbout";
import DistinguishesEduxa from "../_components/DistinguishesEduxa";
import StudentsFeedback from "../_components/StudentsFeedback";
import NewFQA from "../_components/NewFQA";
import NewContact from "../_components/NewContact";

function NewHome() {
  const n = useTranslations("newHome");
  const language = useCurrentLang();
  const dispatch = useDispatch<AppDispatch>();


  const universities = useSelector((state: any) => state.universities);
  const languageSchools = useSelector((state: any) => state.languageSchools);
  const userData = useSelector((state: any) => state.displayUser);

  const [displayModel, setDisplayModel] = useState<boolean>(false);


  const handleClose = () => {
    setDisplayModel(false);
  };

  useEffect(() => {
    dispatch(
      getAllUniversities({
        language,
        recommended: "true",
        limt: 9,
      })
    );
    dispatch(
      getAllLanguageSchools({
        language,
        recommended: "true",
        limt: 9,
      })
    );

  }, [dispatch]);


  return (
    <>

      <div className="bg-[#FAFAFA]">
        {/* Hero section  */}
        <NewHero />

        {/* Search Section */}
        <NewSearch />

        {/* LOGO Slider Section  */}
        <div className=" py-10 -mt-44 md:-mt-14 bg-white">
          <div className="flex flex-col items-center px-0 pb-0.5 mx-auto my-0 w-full  ">
            <div className="relative mb-5 h-[23px] w-[624px] max-md:mx-auto max-md:mt-0 max-md:mb-5 max-md:w-[90%] max-sm:w-[95%]">
              <div className="absolute top-3.5 h-px bg-zinc-300 w-[624px] max-md:w-full" />
              <div className="absolute top-0 px-2.5 py-0 text-lg tracking-wide text-center bg-white h-[23px] left-[100px] text-primary w-[424px] max-md:w-4/5 max-md:left-[10%] max-sm:text-base max-sm:left-[5%] max-sm:w-[90%]">
                {n("CenterLine")}
              </div>
            </div>
          </div>
          <SwiperSliderLogo />
        </div>

        {/* About-Us Section */}
        <NewAbout />

        {/* Recommended UNI */}
        <div className="w-full py-10">
          <div className="flex flex-col md:flex-row justify-between items-center max-sm:gap-5 px-5 md:px-12 lg:px-20 xl:py-10 xl:px-28">
            <div className="flex flex-col gap-2">
              <div className="ps-3.5 text-xl border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
                {n("uniButton")}
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-3xl font-bold text-zinc-900">
                  {n("RecommendUNI")}
                </div>
                <div className="text-base tracking-normal leading-7 max-w-[388px] text-zinc-500">
                  {n("uniRecomm")}
                </div>
              </div>
            </div>
            <Link
              href={`/${language}/university`}
              className="flex gap-1 items-center px-4 py-0 h-12 text-base text-white cursor-pointer bg-primary rounded-[64px] max-sm:justify-center max-sm:w-full mb-3"
            >
              <span>{n("viewallButton")}</span>

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

            </Link>
          </div>
          <div className="px-5 md:px-20 xl:px-28 ">
            <SwiperSliderUNI data={universities} />
          </div>
        </div>

        {/* Recommended INS */}
        <div className="w-full py-10">
          <div className="flex flex-col md:flex-row justify-between items-center  max-sm:gap-5 px-5 md:px-12 lg:px-20 xl:py-10 xl:px-28">
            <div className="flex flex-col gap-2">
              <div className="ps-3.5 text-xl border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
                {n("Ins")}
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-3xl font-bold text-zinc-900">
                  {n("RecommendIns")}
                </div>
                <div className="text-base tracking-normal leading-7 max-w-[388px] text-zinc-500">
                  {n("insRecomm")}
                </div>
              </div>
            </div>
            <Link
              href={`/${language}/language-schools`}
              className="flex gap-1 items-center px-4 py-0 h-12 text-base text-white cursor-pointer bg-primary rounded-[64px] max-sm:justify-center max-sm:w-full mb-3"
            >
              <span> {n("DiscoverButton")} </span>
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
            </Link>
          </div>
          <div className="px-5 md:px-20 xl:px-28">
            <SwiperSliderINS data={languageSchools} />
          </div>
        </div>

        {/* Know what distinguishes Eduxa */}
        <DistinguishesEduxa />

        {/* Students Feedback */}
        <StudentsFeedback />

        {/* Common Question */}
        <NewFQA />

        {/* Contact us */}
        <NewContact />
      </div >
    </>
  );
}

export default NewHome;

