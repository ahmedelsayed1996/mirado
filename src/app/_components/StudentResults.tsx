"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import { parseCookies } from "nookies";
import useCurrentLang from "../_hooks/useCurrentLang";
import Spinner from "./Spinner";
import { AppDispatch } from "../store";
import { useTranslations } from "next-intl";

function Certification({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { tokenMainSite } = parseCookies();
  const locale = useCurrentLang();
  const t = useTranslations("Profile");

  const [formData, setFormData] = useState({
    testTitle: '',
    date: '',
    testGrade: '',
    universityInstitute: ''
  });
  // console.log("currentUser", currentUser);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target; // الحصول على name و value من الحقل
    setFormData({
      ...formData,
      [name]: value // تحديث القيمة بناءً على name
    });
  };

  const handleSubmit = async (eve: any) => {
    eve.preventDefault();
    setIsLoading(true);
    const raw = JSON.stringify({
      "user_id": currentUser.id,
      "quizzeTitle": formData.testTitle,
      "quizzeData": new Date(formData.date),
      "quizzeScore": formData.testGrade,
      "Institute_or_university": formData.universityInstitute
    });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenMainSite}`
        },
        body: raw
      })
      const result = await res.json();
      toast.success("Add Test Results Successfully");
      dispatch(getUser({ tokenMainSite, locale }))
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error)
    }

  }

  useEffect(() => {
    dispatch(getUser({ tokenMainSite, locale }));
  }, [dispatch, tokenMainSite, locale])

  return (
    <div className="flex overflow-hidden flex-col self-start p-2 md:p-4 lg:p-8 bg-white rounded-3xl border border-gray border-solid w-full md:w-4/6 md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">
          <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="35" height="35" rx="17.5" fill="#1E4C83" />
            <path d="M14.9481 20.332H10.6673C9.65898 20.332 8.83398 21.157 8.83398 22.1654V27.6654H14.9481V20.332Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.2183 16.668H16.7708C15.7625 16.668 14.9375 17.493 14.9375 18.5013V27.668H21.0517V18.5013C21.0517 17.493 20.2358 16.668 19.2183 16.668Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.3336 23.082H21.0527V27.6654H27.1669V24.9154C27.1669 23.907 26.3419 23.082 25.3336 23.082Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.4764 9.39856L18.9622 10.3702C19.0264 10.5077 19.2006 10.6361 19.3472 10.6544L20.2272 10.8011C20.7864 10.8927 20.9239 11.3052 20.5206 11.6994L19.8331 12.3869C19.7139 12.506 19.6497 12.726 19.6864 12.8819L19.8789 13.7252C20.0347 14.3944 19.6772 14.6511 19.0906 14.3027L18.2656 13.8169C18.1189 13.7252 17.8714 13.7252 17.7247 13.8169L16.8997 14.3027C16.3131 14.6511 15.9556 14.3944 16.1114 13.7252L16.3039 12.8819C16.3406 12.726 16.2764 12.4969 16.1572 12.3869L15.4789 11.7085C15.0756 11.3052 15.2039 10.9019 15.7722 10.8102L16.6522 10.6636C16.7989 10.6361 16.9731 10.5077 17.0372 10.3794L17.5231 9.40771C17.7889 8.87604 18.2106 8.87606 18.4764 9.39856Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex-1 shrink self-stretch  my-auto text-lg font-bold text-blue-900 basis-7 max-md:max-w-full">
            {t("nav3")}
          </div>
          {/* <div className="flex  shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
            <button
              
              className="flex items-center justify-center text-center p-4 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-80 mx-auto"
            >
              <span className="font-bold text-2xl mx-1  items-center justify-center text-center w-6 h-8 ">
                +
              </span>{" "}
              New test results
            </button>
          </div> */}

        </div>
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/24eb0d2eb07f7bbdcf196c6c052c8b34d8930b610da27a97d3fe815b1d92c12f?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
          className="object-contain mt-4 w-full aspect-[1000] max-md:max-w-full"
        /> */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-2 md:p-6 mt-8 w-full font-medium bg-white rounded-3xl border border-solid border-zinc-100 md:px-5 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("test")}</span>
              </div>
              <div className="flex flex-wrap  gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="date"
                  name="date"
                  className="flex-1 shrink self-stretch  my-auto basis-0 max-md:max-w-full focus:outline-none cursor-pointer"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="25/9/2024"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("test1")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="text"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  required
                  name="testTitle"
                  value={formData.testTitle}
                  onChange={handleInputChange}
                  placeholder={t("certificate2")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 items-center mt-7 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("test2")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="text"
                  required
                  name="testGrade"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  value={formData.testGrade}
                  onChange={handleInputChange}
                  placeholder="53%"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("certificate5")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="text"
                  required
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  value={formData.universityInstitute}
                  onChange={handleInputChange}
                  name="universityInstitute"
                  placeholder={t("certificate6")}
                />
              </div>
            </div>
          </div>
          {/* <div className="flex gap-10 items-center mt-7 w-full whitespace-nowrap max-md:max-w-full"></div>
         <div className="flex flex-wrap gap-2.5 items-start mt-7 w-full text-sm max-md:max-w-full">
          <button
            onClick={onclick}
            className="flex gap-2.5 justify-center items-center px-4 py-3.5 text-sm font-medium text-start bg-blue-900 rounded-md bg-zinc-100 min-h-[50px] w-[179px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/34db0987c31af22b7736e15be291560000124ab4a68db91b198dd6b44326cb6e?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
            <div className="self-stretch my-auto">Delete result</div>
          </button>

          <button
            onClick={onclick}
            className="flex gap-2.5 justify-center items-center px-4 py-3.5 text-sm font-medium text-start text-white bg-blue-900 rounded-md min-h-[50px] w-[179px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5b86749f00f7dd9ceed986442abee5f18863e4b77d9276be7fc5405251c8f8c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
            <div className="self-stretch my-auto">Edit result</div>
          </button>
        </div> */}
          <div className="flex gap-6 items-center mt-10  text-base text-start  text-white max-md:max-w-full">
            <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
              {isLoading ? <Spinner /> : <button
                // href={`/${window.location.pathname.slice(1, 3)}/#`}
                className="flex items-center justify-center text-center p-4 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-80 mx-auto"
              >
                <svg
                  className="mx-2"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="#1E4C83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16602 2.13281H7.49935C3.33268 2.13281 1.66602 3.79948 1.66602 7.96615V12.9661C1.66602 17.1328 3.33268 18.7995 7.49935 18.7995H12.4993C16.666 18.7995 18.3327 17.1328 18.3327 12.9661V11.2995"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3675 2.98123L6.80088 9.5479C6.55088 9.7979 6.30088 10.2896 6.25088 10.6479L5.89254 13.1562C5.75921 14.0646 6.40088 14.6979 7.30921 14.5729L9.81754 14.2146C10.1675 14.1646 10.6592 13.9146 10.9175 13.6646L17.4842 7.0979C18.6175 5.96457 19.1509 4.6479 17.4842 2.98123C15.8175 1.31457 14.5009 1.8479 13.3675 2.98123Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.4258 3.92188C12.9841 5.91354 14.5424 7.47188 16.5424 8.03854"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("test3")}
              </button>}
            </div>
            {/* <div className="flex shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
               <Link
              href={`/${window.location.pathname.slice(1, 3)}/#`}
              className="flex items-center justify-center text-center p-4 whitespace-nowrap  border  border-solid  text-primary bg-white rounded-xl max-md:px-5 border-primary hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-52 mx-auto"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/34db0987c31af22b7736e15be291560000124ab4a68db91b198dd6b44326cb6e?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                className="flex items-center justify-center mx-2 my-auto w-5 aspect-square"
              />
              Delete certificate
            </Link> 
            </div>*/}
          </div>
        </div>
      </form>

      <div className="mt-5">
        {currentUser.Quizzes && currentUser.Quizzes.map((quizz: any, index: number) => {
          return (
            <div key={index} className="flex flex-col flex-1 shrink justify-center px-5 py-4 rounded-lg  hover:bg-[#bad0eb]  border-dashed border my-2 border-gray basis-0 bg-zinc-50 min-w-[240px] max-md:max-w-full cursor-pointer">
              <label htmlFor="s" className="flex flex-wrap gap-5 items-center w-full max-md:max-w-full cursor-pointer">
                {/* <input
                        required
                        id={office.id}
                        value={office.id}
                        type="radio"
                        name="office"
                        className="shrink-0 self-stretch my-auto w-6 h-6 border-gray-300 rounded-full cursor-pointer"
                      /> */}
                <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full cursor-pointer">
                  <div className="self-start text-lg leading-none">
                    {t("certificate10")}:  {quizz.quizzeTitle} <br /><br />
                    {t("certificate11")}:  {quizz.quizzeScore}
                  </div>
                  <div className="flex flex-wrap gap-1 items-center mt-2.5 w-full text-base tracking-wide leading-none max-md:max-w-full">
                    <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.75 9.14329C0.75 4.24427 4.65501 0.25 9.5 0.25C14.345 0.25 18.25 4.24427 18.25 9.14329C18.25 11.5084 17.576 14.0479 16.3844 16.2419C15.1944 18.4331 13.4556 20.3372 11.2805 21.3539C10.1506 21.882 8.84943 21.882 7.71949 21.3539C5.54437 20.3372 3.80562 18.4331 2.61556 16.2419C1.42403 14.0479 0.75 11.5084 0.75 9.14329ZM9.5 1.75C5.50843 1.75 2.25 5.04748 2.25 9.14329C2.25 11.2404 2.85263 13.5354 3.9337 15.526C5.01624 17.5192 6.54602 19.1496 8.35465 19.995C9.08205 20.335 9.91795 20.335 10.6454 19.995C12.454 19.1496 13.9838 17.5192 15.0663 15.526C16.1474 13.5354 16.75 11.2404 16.75 9.14329C16.75 5.04748 13.4916 1.75 9.5 1.75ZM9.5 6.75C8.25736 6.75 7.25 7.75736 7.25 9C7.25 10.2426 8.25736 11.25 9.5 11.25C10.7426 11.25 11.75 10.2426 11.75 9C11.75 7.75736 10.7426 6.75 9.5 6.75ZM5.75 9C5.75 6.92893 7.42893 5.25 9.5 5.25C11.5711 5.25 13.25 6.92893 13.25 9C13.25 11.0711 11.5711 12.75 9.5 12.75C7.42893 12.75 5.75 11.0711 5.75 9Z" fill="#141522" />
                    </svg>
                    <div className=" self-start shrink my-auto  ">
                      {quizz.Institute_or_university}
                    </div>

                  </div>
                </div>

              </label>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Certification;
