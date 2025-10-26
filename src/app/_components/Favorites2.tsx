"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Loader from "./Loader";
import Favorites from "./Favorites";
import useCurrentLang from "../_hooks/useCurrentLang";
import { parseCookies } from "nookies";


interface Favorites {
  Favorite_Courses?: any[]; // استبدل `any` بالنوع المناسب إذا كنت تعرفه
  Favorite_Programs?: any[]; // استبدل `any` بالنوع المناسب إذا كنت تعرفه
}


function Favorites2({ currentUser }: any) {
  const c = useTranslations("courses");
  const pathname = usePathname();
  const { tokenMainSite } = parseCookies();
  const t = useTranslations("Profile");
  const [favorites, setFavorites] = useState<Favorites | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const language = useCurrentLang();

  const getFavorites = async (id: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites?userId=${id}`, {
        method: 'GET',
        headers: {
          "Accept-Language": language,
        Authorization: `Bearer ${tokenMainSite}`
        },
      })
      const result = await res.json();
      setFavorites(result);
      console.log("all Favorite", result);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  const getDaysRemaining = (endDate: any) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffInTime = end.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays > 0 ? diffInDays : 0;
  };

  useEffect(() => {
    getFavorites(currentUser.id);
    // console.log("currentUser", currentUser);

  }, [currentUser.id])

  return (
    <div className="flex overflow-hidden flex-col self-start p-2 md:p-4 lg:p-8 bg-white rounded-3xl border border-gray border-solid  w-full md:w-4/6 md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full text-lg font-bold text-start text-blue-900 whitespace-nowrap max-md:max-w-full">
        <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="35" height="35" rx="17.5" fill="#1E4C83" />
            <path d="M18.569 26.074C18.2573 26.184 17.744 26.184 17.4323 26.074C14.774 25.1665 8.83398 21.3807 8.83398 14.964C8.83398 12.1315 11.1165 9.83984 13.9307 9.83984C15.599 9.83984 17.0748 10.6465 18.0007 11.8932C18.9265 10.6465 20.4115 9.83984 22.0707 9.83984C24.8848 9.83984 27.1673 12.1315 27.1673 14.964C27.1673 21.3807 21.2273 25.1665 18.569 26.074Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full">
            {t("nav5")}
          </div>
        </div>
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/24eb0d2eb07f7bbdcf196c6c052c8b34d8930b610da27a97d3fe815b1d92c12f?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
          className="object-contain mt-4 w-full aspect-[1000] max-md:max-w-full"
        /> */}
      </div>
      {isLoading ? <Loader /> :
        <>
          {/* {favorites && favorites.Favorite_Programs?.length !== 0 && favorites.Favorite_Courses?.length ? <> */}
          {favorites && favorites.Favorite_Courses?.length != 0 ? <>
            <div className="my-2 text-3xl md:px-10 mt-3 font-bold text-start text-neutral-800 max-md:max-w-full">
              {t("requests11")}
            </div>
            {/* <div className="flex  md:gap-6  md:mx-4 "> */}
            <div className="flex flex-wrap gap-2 md:mx-4">
              {favorites.Favorite_Courses?.map((course, index) => {
                const daysRemaining = getDaysRemaining(course.offer_end_date);
                const discountedPrice = course.course?.min_cost - (course.course?.min_cost * (course.course.offer / 100));

                return (
                  // <div key={index} className="flex flex-col max-md:ml-0 max-md:w-full" style={{ width: 'calc(100% - 16px)' }}>
                  <div key={index} className="flex-1 max-md:ml-0 flex">
                    <div className="flex flex-col justify-evenly p-2 md:p-5 w-full bg-white rounded-xl border border-gray border-solid shadow-2xl md:mt-5 max-md:max-w-full grow">
                      <div className="flex gap-3 self-start text-xl font-semibold text-start text-primary">
                        <Image
                          src="/icons/Square Academic Cap.svg"
                          width={25}
                          height={25}
                          alt="Square Academic Cap"
                        />
                        <div className="line-clamp-1">{course.course?.courses_translations[0].name}</div>
                      </div>
                      <div className="mt-3.5 text-base tracking-wide text-start text-ellipsis text-zinc-500 max-md:max-w-full line-clamp-2">
                        {course.course?.courses_translations[0].description}
                      </div>
                      <div className="mt-3.5 text-2xl font-semibold leading-6 text-start text-primary max-md:max-w-full">
                        {discountedPrice.toFixed(2)} {course.course?.institutes_branch?.currency}
                      </div>
                      <div className="flex gap-1.5  mt-3 text-sm leading-6 max-md:flex-wrap max-md:px-5">
                        <div className="text-start text-zinc-500 line-through">
                          {/* 53.573 ريال سعودي (أسبوع) */}
                          {course.course?.min_cost}
                          {course.course?.institutes_branch?.currency}
                        </div>
                        <div className="text-gray-900"> {c("offer")} {course.course.offer?.toString()}%</div>
                      </div>
                      <div className="flex gap-1.5 mt-3 text-sm leading-6 text-rose-500 max-md:flex-wrap max-md:pl-5">
                        {daysRemaining === 0 ? "" : <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99935 2.79297C5.74215 2.79297 2.29102 6.24411 2.29102 10.5013C2.29102 14.7585 5.74215 18.2096 9.99935 18.2096C14.2565 18.2096 17.7077 14.7585 17.7077 10.5013C17.7077 6.24411 14.2565 2.79297 9.99935 2.79297ZM1.04102 10.5013C1.04102 5.55375 5.0518 1.54297 9.99935 1.54297C14.9469 1.54297 18.9577 5.55375 18.9577 10.5013C18.9577 15.4489 14.9469 19.4596 9.99935 19.4596C5.0518 19.4596 1.04102 15.4489 1.04102 10.5013ZM9.99935 6.54297C10.3445 6.54297 10.6243 6.82279 10.6243 7.16797V10.2424L12.5246 12.1427C12.7687 12.3868 12.7687 12.7825 12.5246 13.0266C12.2805 13.2707 11.8848 13.2707 11.6407 13.0266L9.55741 10.9432C9.4402 10.826 9.37435 10.6671 9.37435 10.5013V7.16797C9.37435 6.82279 9.65417 6.54297 9.99935 6.54297Z"
                              fill="#FF4C51"
                            />
                          </svg>
                          <div>{daysRemaining} {t("favorite")}</div>
                        </>}

                      </div>
                      <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                        <div className="flex flex-1 gap-2.5 justify-start  py-1.5 rounded-2xl">
                          <div className="flex gap-2 justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M3.59998 7.87891H2C1.45 7.87891 1 8.32891 1 8.87891V17.4989C1 18.0489 1.45 18.4989 2 18.4989H3.59998C4.14998 18.4989 4.59998 18.0489 4.59998 17.4989V8.87891C4.59998 8.32891 4.14998 7.87891 3.59998 7.87891Z"
                                stroke="black"
                                strokeOpacity="0.88"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.7992 4.69141H9.19922C8.64922 4.69141 8.19922 5.14141 8.19922 5.69141V17.5014C8.19922 18.0514 8.64922 18.5014 9.19922 18.5014H10.7992C11.3492 18.5014 11.7992 18.0514 11.7992 17.5014V5.69141C11.7992 5.14141 11.3492 4.69141 10.7992 4.69141Z"
                                stroke="black"
                                strokeOpacity="0.88"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.0004 1.5H16.4004C15.8504 1.5 15.4004 1.95 15.4004 2.5V17.5C15.4004 18.05 15.8504 18.5 16.4004 18.5H18.0004C18.5504 18.5 19.0004 18.05 19.0004 17.5V2.5C19.0004 1.95 18.5504 1.5 18.0004 1.5Z"
                                stroke="black"
                                strokeOpacity="0.88"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="text-gray-900 text-nowrap">
                              {t("favorite1")}
                              <div className="self-start font-medium text-gray">
                                {course.course?.courses_translations[0].required_level}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-1 gap-2.5 justify-center  py-1.5 rounded-2xl max-md:px-5">
                          <div className="flex gap-2 justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99935 2.79297C5.74215 2.79297 2.29102 6.24411 2.29102 10.5013C2.29102 14.7585 5.74215 18.2096 9.99935 18.2096C14.2565 18.2096 17.7077 14.7585 17.7077 10.5013C17.7077 6.24411 14.2565 2.79297 9.99935 2.79297ZM1.04102 10.5013C1.04102 5.55375 5.0518 1.54297 9.99935 1.54297C14.9469 1.54297 18.9577 5.55375 18.9577 10.5013C18.9577 15.4489 14.9469 19.4596 9.99935 19.4596C5.0518 19.4596 1.04102 15.4489 1.04102 10.5013ZM9.99935 6.54297C10.3445 6.54297 10.6243 6.82279 10.6243 7.16797V10.2424L12.5246 12.1427C12.7687 12.3868 12.7687 12.7825 12.5246 13.0266C12.2805 13.2707 11.8848 13.2707 11.6407 13.0266L9.55741 10.9432C9.4402 10.826 9.37435 10.6671 9.37435 10.5013V7.16797C9.37435 6.82279 9.65417 6.54297 9.99935 6.54297Z"
                                fill="#000000"
                              />
                            </svg>
                            <div className="text-gray-900">
                              {c("StudyTime")}
                              <div className="self-start font-medium text-gray">
                                {course.course?.courses_translations[0].time_of_course}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-1 gap-1.5 md:justify-end  py-1.5 rounded-2xl">
                          <div className="flex gap-2 justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                            >
                              <path
                                d="M9.91055 11.37C9.81055 11.36 9.69055 11.36 9.58055 11.37C7.20055 11.29 5.31055 9.34 5.31055 6.94C5.31055 4.49 7.29055 2.5 9.75055 2.5C12.2005 2.5 14.1905 4.49 14.1905 6.94C14.1805 9.34 12.2905 11.29 9.91055 11.37Z"
                                stroke="black"
                                strokeOpacity="0.88"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.1593 4.5C19.0993 4.5 20.6593 6.07 20.6593 8C20.6593 9.89 19.1593 11.43 17.2893 11.5C17.2093 11.49 17.1193 11.49 17.0293 11.5"
                                stroke="black"
                                strokeOpacity="0.88"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4.9107 15.06C2.4907 16.68 2.4907 19.32 4.9107 20.93C7.6607 22.77 12.1707 22.77 14.9207 20.93C17.3407 19.31 17.3407 16.67 14.9207 15.06C12.1807 13.23 7.6707 13.23 4.9107 15.06Z"
                                stroke="black"
                                strokeOpacity="0.88"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.0898 20.5C19.8098 20.35 20.4898 20.06 21.0498 19.63C22.6098 18.46 22.6098 16.53 21.0498 15.36C20.4998 14.94 19.8298 14.66 19.1198 14.5"
                                stroke="black"
                                strokeOpacity="0.88"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="text-gray-900">
                              {" "}
                              {t("favorite2")}
                              <div className="self-start font-medium text-gray">
                                {course.course?.max_no_of_students_per_class}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                        <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                          <svg width="20" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 12.5C17.0523 12.5 17.5 12.0523 17.5 11.5C17.5 10.9477 17.0523 10.5 16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5C15.5 12.0523 15.9477 12.5 16.5 12.5Z" fill="#141522" />
                            <path d="M16.5 16.5C17.0523 16.5 17.5 16.0523 17.5 15.5C17.5 14.9477 17.0523 14.5 16.5 14.5C15.9477 14.5 15.5 14.9477 15.5 15.5C15.5 16.0523 15.9477 16.5 16.5 16.5Z" fill="#141522" />
                            <path d="M12.5 11.5C12.5 12.0523 12.0523 12.5 11.5 12.5C10.9477 12.5 10.5 12.0523 10.5 11.5C10.5 10.9477 10.9477 10.5 11.5 10.5C12.0523 10.5 12.5 10.9477 12.5 11.5Z" fill="#141522" />
                            <path d="M12.5 15.5C12.5 16.0523 12.0523 16.5 11.5 16.5C10.9477 16.5 10.5 16.0523 10.5 15.5C10.5 14.9477 10.9477 14.5 11.5 14.5C12.0523 14.5 12.5 14.9477 12.5 15.5Z" fill="#141522" />
                            <path d="M6.5 12.5C7.05229 12.5 7.5 12.0523 7.5 11.5C7.5 10.9477 7.05229 10.5 6.5 10.5C5.94772 10.5 5.5 10.9477 5.5 11.5C5.5 12.0523 5.94772 12.5 6.5 12.5Z" fill="#141522" />
                            <path d="M6.5 16.5C7.05229 16.5 7.5 16.0523 7.5 15.5C7.5 14.9477 7.05229 14.5 6.5 14.5C5.94772 14.5 5.5 14.9477 5.5 15.5C5.5 16.0523 5.94772 16.5 6.5 16.5Z" fill="#141522" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0.25C6.91421 0.25 7.25 0.585786 7.25 1V1.76272C7.912 1.74999 8.64133 1.74999 9.44346 1.75H13.5564C14.3586 1.74999 15.088 1.74999 15.75 1.76272V1C15.75 0.585786 16.0858 0.25 16.5 0.25C16.9142 0.25 17.25 0.585786 17.25 1V1.82709C17.5099 1.84691 17.7561 1.87182 17.989 1.90313C19.1614 2.06076 20.1104 2.39288 20.8588 3.14124C21.6071 3.88961 21.9392 4.83855 22.0969 6.01098C22.25 7.15018 22.25 8.6058 22.25 10.4435V12.5564C22.25 14.3941 22.25 15.8498 22.0969 16.989C21.9392 18.1614 21.6071 19.1104 20.8588 19.8588C20.1104 20.6071 19.1614 20.9392 17.989 21.0969C16.8498 21.25 15.3942 21.25 13.5565 21.25H9.44359C7.60585 21.25 6.15018 21.25 5.01098 21.0969C3.83856 20.9392 2.88961 20.6071 2.14124 19.8588C1.39288 19.1104 1.06076 18.1614 0.903135 16.989C0.749972 15.8498 0.749985 14.3942 0.75 12.5564V10.4436C0.749985 8.60582 0.749972 7.15019 0.903135 6.01098C1.06076 4.83855 1.39288 3.88961 2.14124 3.14124C2.88961 2.39288 3.83856 2.06076 5.01098 1.90313C5.2439 1.87182 5.49006 1.84691 5.75 1.82709V1C5.75 0.585786 6.08579 0.25 6.5 0.25ZM5.21085 3.38976C4.20476 3.52502 3.62511 3.77869 3.2019 4.2019C2.77869 4.62511 2.52502 5.20476 2.38976 6.21085C2.36685 6.38123 2.3477 6.56061 2.33168 6.75H20.6683C20.6523 6.56061 20.6331 6.38124 20.6102 6.21085C20.475 5.20476 20.2213 4.62511 19.7981 4.2019C19.3749 3.77869 18.7952 3.52502 17.7892 3.38976C16.7615 3.25159 15.4068 3.25 13.5 3.25H9.5C7.59318 3.25 6.23851 3.25159 5.21085 3.38976ZM2.25 10.5C2.25 9.64599 2.25032 8.90273 2.26309 8.25H20.7369C20.7497 8.90273 20.75 9.64599 20.75 10.5V12.5C20.75 14.4068 20.7484 15.7615 20.6102 16.7892C20.475 17.7952 20.2213 18.3749 19.7981 18.7981C19.3749 19.2213 18.7952 19.475 17.7892 19.6102C16.7615 19.7484 15.4068 19.75 13.5 19.75H9.5C7.59318 19.75 6.23851 19.7484 5.21085 19.6102C4.20476 19.475 3.62511 19.2213 3.2019 18.7981C2.77869 18.3749 2.52502 17.7952 2.38976 16.7892C2.25159 15.7615 2.25 14.4068 2.25 12.5V10.5Z" fill="#141522" />
                          </svg>

                          <div className="flex flex-col justify-center">
                            <div className="self-start text-gray-900">
                              {t("favorite3")}
                            </div>
                            <div className="font-medium text-gray text-nowrap">
                              {course.course?.courses_translations[0].course_duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                          <svg width="21" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 12.5C17.0523 12.5 17.5 12.0523 17.5 11.5C17.5 10.9477 17.0523 10.5 16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5C15.5 12.0523 15.9477 12.5 16.5 12.5Z" fill="#141522" />
                            <path d="M16.5 16.5C17.0523 16.5 17.5 16.0523 17.5 15.5C17.5 14.9477 17.0523 14.5 16.5 14.5C15.9477 14.5 15.5 14.9477 15.5 15.5C15.5 16.0523 15.9477 16.5 16.5 16.5Z" fill="#141522" />
                            <path d="M12.5 11.5C12.5 12.0523 12.0523 12.5 11.5 12.5C10.9477 12.5 10.5 12.0523 10.5 11.5C10.5 10.9477 10.9477 10.5 11.5 10.5C12.0523 10.5 12.5 10.9477 12.5 11.5Z" fill="#141522" />
                            <path d="M12.5 15.5C12.5 16.0523 12.0523 16.5 11.5 16.5C10.9477 16.5 10.5 16.0523 10.5 15.5C10.5 14.9477 10.9477 14.5 11.5 14.5C12.0523 14.5 12.5 14.9477 12.5 15.5Z" fill="#141522" />
                            <path d="M6.5 12.5C7.05229 12.5 7.5 12.0523 7.5 11.5C7.5 10.9477 7.05229 10.5 6.5 10.5C5.94772 10.5 5.5 10.9477 5.5 11.5C5.5 12.0523 5.94772 12.5 6.5 12.5Z" fill="#141522" />
                            <path d="M6.5 16.5C7.05229 16.5 7.5 16.0523 7.5 15.5C7.5 14.9477 7.05229 14.5 6.5 14.5C5.94772 14.5 5.5 14.9477 5.5 15.5C5.5 16.0523 5.94772 16.5 6.5 16.5Z" fill="#141522" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0.25C6.91421 0.25 7.25 0.585786 7.25 1V1.76272C7.912 1.74999 8.64133 1.74999 9.44346 1.75H13.5564C14.3586 1.74999 15.088 1.74999 15.75 1.76272V1C15.75 0.585786 16.0858 0.25 16.5 0.25C16.9142 0.25 17.25 0.585786 17.25 1V1.82709C17.5099 1.84691 17.7561 1.87182 17.989 1.90313C19.1614 2.06076 20.1104 2.39288 20.8588 3.14124C21.6071 3.88961 21.9392 4.83855 22.0969 6.01098C22.25 7.15018 22.25 8.6058 22.25 10.4435V12.5564C22.25 14.3941 22.25 15.8498 22.0969 16.989C21.9392 18.1614 21.6071 19.1104 20.8588 19.8588C20.1104 20.6071 19.1614 20.9392 17.989 21.0969C16.8498 21.25 15.3942 21.25 13.5565 21.25H9.44359C7.60585 21.25 6.15018 21.25 5.01098 21.0969C3.83856 20.9392 2.88961 20.6071 2.14124 19.8588C1.39288 19.1104 1.06076 18.1614 0.903135 16.989C0.749972 15.8498 0.749985 14.3942 0.75 12.5564V10.4436C0.749985 8.60582 0.749972 7.15019 0.903135 6.01098C1.06076 4.83855 1.39288 3.88961 2.14124 3.14124C2.88961 2.39288 3.83856 2.06076 5.01098 1.90313C5.2439 1.87182 5.49006 1.84691 5.75 1.82709V1C5.75 0.585786 6.08579 0.25 6.5 0.25ZM5.21085 3.38976C4.20476 3.52502 3.62511 3.77869 3.2019 4.2019C2.77869 4.62511 2.52502 5.20476 2.38976 6.21085C2.36685 6.38123 2.3477 6.56061 2.33168 6.75H20.6683C20.6523 6.56061 20.6331 6.38124 20.6102 6.21085C20.475 5.20476 20.2213 4.62511 19.7981 4.2019C19.3749 3.77869 18.7952 3.52502 17.7892 3.38976C16.7615 3.25159 15.4068 3.25 13.5 3.25H9.5C7.59318 3.25 6.23851 3.25159 5.21085 3.38976ZM2.25 10.5C2.25 9.64599 2.25032 8.90273 2.26309 8.25H20.7369C20.7497 8.90273 20.75 9.64599 20.75 10.5V12.5C20.75 14.4068 20.7484 15.7615 20.6102 16.7892C20.475 17.7952 20.2213 18.3749 19.7981 18.7981C19.3749 19.2213 18.7952 19.475 17.7892 19.6102C16.7615 19.7484 15.4068 19.75 13.5 19.75H9.5C7.59318 19.75 6.23851 19.7484 5.21085 19.6102C4.20476 19.475 3.62511 19.2213 3.2019 18.7981C2.77869 18.3749 2.52502 17.7952 2.38976 16.7892C2.25159 15.7615 2.25 14.4068 2.25 12.5V10.5Z" fill="#141522" />
                          </svg>

                          <div className="flex flex-col justify-center">
                            <div className="self-start text-gray-900">
                              {t("favorite4")}
                            </div>
                            <div className="font-medium text-gray text-nowrap">
                              {course.course?.lesson_duration} {t("favorite5")}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                          <svg width="21" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 12.5C17.0523 12.5 17.5 12.0523 17.5 11.5C17.5 10.9477 17.0523 10.5 16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5C15.5 12.0523 15.9477 12.5 16.5 12.5Z" fill="#141522" />
                            <path d="M16.5 16.5C17.0523 16.5 17.5 16.0523 17.5 15.5C17.5 14.9477 17.0523 14.5 16.5 14.5C15.9477 14.5 15.5 14.9477 15.5 15.5C15.5 16.0523 15.9477 16.5 16.5 16.5Z" fill="#141522" />
                            <path d="M12.5 11.5C12.5 12.0523 12.0523 12.5 11.5 12.5C10.9477 12.5 10.5 12.0523 10.5 11.5C10.5 10.9477 10.9477 10.5 11.5 10.5C12.0523 10.5 12.5 10.9477 12.5 11.5Z" fill="#141522" />
                            <path d="M12.5 15.5C12.5 16.0523 12.0523 16.5 11.5 16.5C10.9477 16.5 10.5 16.0523 10.5 15.5C10.5 14.9477 10.9477 14.5 11.5 14.5C12.0523 14.5 12.5 14.9477 12.5 15.5Z" fill="#141522" />
                            <path d="M6.5 12.5C7.05229 12.5 7.5 12.0523 7.5 11.5C7.5 10.9477 7.05229 10.5 6.5 10.5C5.94772 10.5 5.5 10.9477 5.5 11.5C5.5 12.0523 5.94772 12.5 6.5 12.5Z" fill="#141522" />
                            <path d="M6.5 16.5C7.05229 16.5 7.5 16.0523 7.5 15.5C7.5 14.9477 7.05229 14.5 6.5 14.5C5.94772 14.5 5.5 14.9477 5.5 15.5C5.5 16.0523 5.94772 16.5 6.5 16.5Z" fill="#141522" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0.25C6.91421 0.25 7.25 0.585786 7.25 1V1.76272C7.912 1.74999 8.64133 1.74999 9.44346 1.75H13.5564C14.3586 1.74999 15.088 1.74999 15.75 1.76272V1C15.75 0.585786 16.0858 0.25 16.5 0.25C16.9142 0.25 17.25 0.585786 17.25 1V1.82709C17.5099 1.84691 17.7561 1.87182 17.989 1.90313C19.1614 2.06076 20.1104 2.39288 20.8588 3.14124C21.6071 3.88961 21.9392 4.83855 22.0969 6.01098C22.25 7.15018 22.25 8.6058 22.25 10.4435V12.5564C22.25 14.3941 22.25 15.8498 22.0969 16.989C21.9392 18.1614 21.6071 19.1104 20.8588 19.8588C20.1104 20.6071 19.1614 20.9392 17.989 21.0969C16.8498 21.25 15.3942 21.25 13.5565 21.25H9.44359C7.60585 21.25 6.15018 21.25 5.01098 21.0969C3.83856 20.9392 2.88961 20.6071 2.14124 19.8588C1.39288 19.1104 1.06076 18.1614 0.903135 16.989C0.749972 15.8498 0.749985 14.3942 0.75 12.5564V10.4436C0.749985 8.60582 0.749972 7.15019 0.903135 6.01098C1.06076 4.83855 1.39288 3.88961 2.14124 3.14124C2.88961 2.39288 3.83856 2.06076 5.01098 1.90313C5.2439 1.87182 5.49006 1.84691 5.75 1.82709V1C5.75 0.585786 6.08579 0.25 6.5 0.25ZM5.21085 3.38976C4.20476 3.52502 3.62511 3.77869 3.2019 4.2019C2.77869 4.62511 2.52502 5.20476 2.38976 6.21085C2.36685 6.38123 2.3477 6.56061 2.33168 6.75H20.6683C20.6523 6.56061 20.6331 6.38124 20.6102 6.21085C20.475 5.20476 20.2213 4.62511 19.7981 4.2019C19.3749 3.77869 18.7952 3.52502 17.7892 3.38976C16.7615 3.25159 15.4068 3.25 13.5 3.25H9.5C7.59318 3.25 6.23851 3.25159 5.21085 3.38976ZM2.25 10.5C2.25 9.64599 2.25032 8.90273 2.26309 8.25H20.7369C20.7497 8.90273 20.75 9.64599 20.75 10.5V12.5C20.75 14.4068 20.7484 15.7615 20.6102 16.7892C20.475 17.7952 20.2213 18.3749 19.7981 18.7981C19.3749 19.2213 18.7952 19.475 17.7892 19.6102C16.7615 19.7484 15.4068 19.75 13.5 19.75H9.5C7.59318 19.75 6.23851 19.7484 5.21085 19.6102C4.20476 19.475 3.62511 19.2213 3.2019 18.7981C2.77869 18.3749 2.52502 17.7952 2.38976 16.7892C2.25159 15.7615 2.25 14.4068 2.25 12.5V10.5Z" fill="#141522" />
                          </svg>

                          <div className="flex flex-col justify-center">
                            <div className="self-start text-gray-900">
                              {c("LessonsWeekly")}
                            </div>
                            <div className="font-medium text-gray text-nowrap">
                              {course.course?.lessons_per_week}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" gap-2.5 mt-3.5">
                        <Link
                          href={`/${language}/language-schools/${course.course?.institutes_branch?.institute?.id}/${course.course?.institutes_branch?.id}/${course.course?.id}`}
                        >
                          <button className="w-full justify-center px-10 py-2 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
                            {c("BrowseTheCourse")}{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </> : <Favorites name={t("requests11")} />}

          {favorites && favorites.Favorite_Courses?.length != 0 ? <>
            <div className="my-5 text-3xl px-10 font-bold text-start text-neutral-800 max-md:max-w-full">
              {t("requests")}
            </div>
            <div className="flex flex-wrap gap-2">
              {favorites && favorites.Favorite_Programs?.map((program, index) => (
                <div key={index} className="flex-1">
                  {/* <div key={index} className="w-[450px] "> */}
                  <div className="flex flex-col grow p-2 md:p-5 w-full bg-white rounded-xl border border-gray border-solid shadow-2xl md:mt-5 max-md:max-w-full">
                    <div className="flex gap-3 self-start text-xl font-semibold text-start text-primary items-center">
                      <svg width="25" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.2172 0.49965C10.7962 -0.16655 9.20372 -0.16655 7.78272 0.499649L1.0916 3.63659C0.0156027 4.14105 -0.264933 5.56352 0.25 6.54666L0.25 11.5C0.25 11.9142 0.585786 12.25 1 12.25C1.41421 12.25 1.75 11.9142 1.75 11.5V7.67204L7.78281 10.5003C9.20381 11.1665 10.7963 11.1665 12.2173 10.5003L18.9084 7.36341C20.3639 6.68105 20.3639 4.31899 18.9084 3.63664L12.2172 0.49965Z" fill="#1E4C83" />
                        <path d="M3 9.91473V13.6254C3 14.6334 3.5035 15.5772 4.38533 16.0656C5.8537 16.8787 8.20399 18 10 18C11.796 18 14.1463 16.8787 15.6147 16.0656C16.4965 15.5772 17 14.6334 17 13.6254V9.91477L12.854 11.8585C11.0296 12.7138 8.9705 12.7138 7.14607 11.8585L3 9.91473Z" fill="#1E4C83" />
                      </svg>

                      <div className='line-clamp-1'>{program.program?.program_translations[0].name}</div>
                    </div>
                    <div className="flex gap-2 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                      <div className="flex flex-1 gap-2.5 justify-start  py-1.5 rounded-2xl">
                        <div className="flex gap-2 justify-center items-center">
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.66055 11.37C9.56055 11.36 9.44055 11.36 9.33055 11.37C6.95055 11.29 5.06055 9.34 5.06055 6.94C5.06055 4.49 7.04055 2.5 9.50055 2.5C11.9505 2.5 13.9405 4.49 13.9405 6.94C13.9305 9.34 12.0405 11.29 9.66055 11.37Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.9093 4.5C18.8493 4.5 20.4093 6.07 20.4093 8C20.4093 9.89 18.9093 11.43 17.0393 11.5C16.9593 11.49 16.8693 11.49 16.7793 11.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.6607 15.06C2.2407 16.68 2.2407 19.32 4.6607 20.93C7.4107 22.77 11.9207 22.77 14.6707 20.93C17.0907 19.31 17.0907 16.67 14.6707 15.06C11.9307 13.23 7.4207 13.23 4.6607 15.06Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.8398 20.5C19.5598 20.35 20.2398 20.06 20.7998 19.63C22.3598 18.46 22.3598 16.53 20.7998 15.36C20.2498 14.94 19.5798 14.66 18.8698 14.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>


                          <div className="text-gray-900 text-nowrap">
                            {t("favorite6")}
                            <div className="self-start font-medium text-gray">
                              {program.program?.program_translations[0].course_duration}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-2.5 justify-end  py-1.5 rounded-2xl max-md:px-5">
                        <div className="flex gap-2 justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M3.59998 7.87891H2C1.45 7.87891 1 8.32891 1 8.87891V17.4989C1 18.0489 1.45 18.4989 2 18.4989H3.59998C4.14998 18.4989 4.59998 18.0489 4.59998 17.4989V8.87891C4.59998 8.32891 4.14998 7.87891 3.59998 7.87891Z"
                              stroke="black"
                              strokeOpacity="0.88"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.7992 4.69141H9.19922C8.64922 4.69141 8.19922 5.14141 8.19922 5.69141V17.5014C8.19922 18.0514 8.64922 18.5014 9.19922 18.5014H10.7992C11.3492 18.5014 11.7992 18.0514 11.7992 17.5014V5.69141C11.7992 5.14141 11.3492 4.69141 10.7992 4.69141Z"
                              stroke="black"
                              strokeOpacity="0.88"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.0004 1.5H16.4004C15.8504 1.5 15.4004 1.95 15.4004 2.5V17.5C15.4004 18.05 15.8504 18.5 16.4004 18.5H18.0004C18.5504 18.5 19.0004 18.05 19.0004 17.5V2.5C19.0004 1.95 18.5504 1.5 18.0004 1.5Z"
                              stroke="black"
                              strokeOpacity="0.88"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="text-gray-900">
                            {t("requests8")}
                            <div className="self-start font-medium text-gray">
                              {program.program?.program_translations[0].course_language}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                      <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C6.89137 3.25 2.75 7.39137 2.75 12.5C2.75 17.6086 6.89137 21.75 12 21.75C17.1086 21.75 21.25 17.6086 21.25 12.5C21.25 7.39137 17.1086 3.25 12 3.25ZM1.25 12.5C1.25 6.56294 6.06294 1.75 12 1.75C17.9371 1.75 22.75 6.56294 22.75 12.5C22.75 18.4371 17.9371 23.25 12 23.25C6.06294 23.25 1.25 18.4371 1.25 12.5ZM12 7.75C12.4142 7.75 12.75 8.08579 12.75 8.5V12.1893L15.0303 14.4697C15.3232 14.7626 15.3232 15.2374 15.0303 15.5303C14.7374 15.8232 14.2626 15.8232 13.9697 15.5303L11.4697 13.0303C11.329 12.8897 11.25 12.6989 11.25 12.5V8.5C11.25 8.08579 11.5858 7.75 12 7.75Z" fill="#141522" />
                        </svg>

                        <div className="flex flex-col justify-center">
                          <div className="self-start text-gray-900">
                            {t("requests6")}
                          </div>
                          <div className="font-medium text-gray text-nowrap">
                            {new Date(program?.program?.start_date).toLocaleString('en-US', { year: 'numeric', month: 'short' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                        <div className="flex gap-2 justify-center items-center">
                          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C6.89137 3.25 2.75 7.39137 2.75 12.5C2.75 17.6086 6.89137 21.75 12 21.75C17.1086 21.75 21.25 17.6086 21.25 12.5C21.25 7.39137 17.1086 3.25 12 3.25ZM1.25 12.5C1.25 6.56294 6.06294 1.75 12 1.75C17.9371 1.75 22.75 6.56294 22.75 12.5C22.75 18.4371 17.9371 23.25 12 23.25C6.06294 23.25 1.25 18.4371 1.25 12.5ZM12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5V6.81673C14.3804 7.10867 15.75 8.33361 15.75 10C15.75 10.4142 15.4142 10.75 15 10.75C14.5858 10.75 14.25 10.4142 14.25 10C14.25 9.15573 13.3765 8.25 12 8.25C10.6235 8.25 9.75 9.15573 9.75 10C9.75 10.8443 10.6235 11.75 12 11.75C13.9372 11.75 15.75 13.0828 15.75 15C15.75 16.6664 14.3804 17.8913 12.75 18.1833V18.5C12.75 18.9142 12.4142 19.25 12 19.25C11.5858 19.25 11.25 18.9142 11.25 18.5V18.1833C9.61957 17.8913 8.25 16.6664 8.25 15C8.25 14.5858 8.58579 14.25 9 14.25C9.41421 14.25 9.75 14.5858 9.75 15C9.75 15.8443 10.6235 16.75 12 16.75C13.3765 16.75 14.25 15.8443 14.25 15C14.25 14.1557 13.3765 13.25 12 13.25C10.0628 13.25 8.25 11.9172 8.25 10C8.25 8.33361 9.61957 7.10867 11.25 6.81673V6.5C11.25 6.08579 11.5858 5.75 12 5.75Z" fill="#141522" />
                          </svg>

                          <div className="text-gray-900">
                            {t("favorite7")}
                            <div className="self-start font-medium text-gray">
                              {program?.program?.price} {program?.program?.university?.currency}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="mt-3.5 ">
                      <Link
                        href={`/${pathname.slice(1, 3)}/university/${program.program?.university?.id}/${program.program.id}`}
                      >
                        <button className="w-full justify-center px-10 py-2 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
                          {t("requests10")}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </> : <Favorites name={t("requests")} />}
        </>
      }

    </div>

  );
}
export default Favorites2;