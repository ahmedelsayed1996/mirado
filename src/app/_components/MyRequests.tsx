"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NotFoundReq from "./NotFoundReq";
import useCurrentLang from "../_hooks/useCurrentLang";
import { parseCookies } from "nookies";
import Loader from "./Loader";
import { useTranslations } from "next-intl";

interface RequestsType {
  University_Orders: any[];
  Institute_Orders: any[];
}
function MyRequests({ currentUser }: any) {
  const pathname = usePathname();
  const language = useCurrentLang();
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<RequestsType | null>(null);
  const { tokenMainSite } = parseCookies();
  const t = useTranslations("Profile");

  const getAllRequests = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/orders`, {
        method: 'GET',
        headers: {
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`
        },
      })
      const result = await res.json();
      setIsLoading(false);
      console.log("Oder Request:", result);

      setRequests(result);
    } catch (error) {
      setIsLoading(false);
      console.log(error);


    }
  }
  useEffect(() => {
    getAllRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])
  return (
    <div className="flex overflow-hidden flex-col self-start p-2 md:p-4 lg:p-8  bg-white rounded-3xl border border-gray border-solid  w-full md:w-4/6 md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full text-lg font-bold text-start text-blue-900 whitespace-nowrap max-md:max-w-full">
        <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="35" height="35" rx="17.5" fill="#1E4C83" />
            <path d="M22.584 26.25H13.4173C9.75065 26.25 8.83398 25.3333 8.83398 21.6667V14.3333C8.83398 10.6667 9.75065 9.75 13.4173 9.75H22.584C26.2507 9.75 27.1673 10.6667 27.1673 14.3333V21.6667C27.1673 25.3333 26.2507 26.25 22.584 26.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.834 14.332H24.4173" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.75 18H24.4167" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22.584 21.668H24.4173" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.792 17.3496C15.7083 17.3496 16.4511 16.6067 16.4511 15.6904C16.4511 14.7741 15.7083 14.0312 14.792 14.0312C13.8756 14.0312 13.1328 14.7741 13.1328 15.6904C13.1328 16.6067 13.8756 17.3496 14.792 17.3496Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.0007 21.9691C17.8723 20.6399 16.8182 19.5949 15.489 19.4758C15.0307 19.4299 14.5632 19.4299 14.0957 19.4758C12.7665 19.6041 11.7123 20.6399 11.584 21.9691" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full">
            {t("nav4")}
          </div>
        </div>
      </div>
      <div className="my-2 text-3xl px-10 font-bold text-start text-neutral-800 max-md:max-w-full">
      {t("requests")}
      </div>
      <div className="flex overflow-hidden flex-col self-stretch  bg-white  border-gray border-solid  gap-3  md:px-5">
        {isLoading ? <Loader /> : <>
          {requests?.University_Orders && requests.University_Orders?.length !== 0 ? <>
            {requests.University_Orders?.map((university, index) => {
              return (
                <div key={index} className="flex flex-col flex-1 shrink justify-center p-5 w-full bg-white rounded-2xl border border-gray border-solid basis-0 min-w-[240px]  max-md:max-w-full">
                  <div className="flex flex-wrap gap-6 w-full  max-md:max-w-full">
                    <div className="flex flex-col flex-1 shrink self-start basis-0 min-w-[240px] max-md:max-w-full">
                      <div className="flex flex-wrap gap-3.5 items-start w-full max-md:max-w-full">
                        <div className="flex flex-1 shrink gap-4 items-center text-xl font-medium text-start text-gray-900 basis-8 min-w-[240px] max-md:max-w-full">
                          <div className="flex flex-col flex-1 shrink self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                            <div className="w-full max-md:max-w-full">
                              {university.program?.program_translations[0].name}
                            </div>
                          </div>
                        </div>
                        {university.status === "approved" ?
                          <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#28C76F] whitespace-nowrap bg-[#28C76F] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                            <div className="self-stretch my-auto">{t("requests1")}</div>
                            <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#28C76F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#28C76F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div> : university.status === "pending" ?
                            <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#f59e0b] whitespace-nowrap bg-[#f59e0b] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                              <div className="self-stretch my-auto">{t("requests2")}</div>
                              <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div> : university.status === "under_process" ?
                              <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#0b2cf5] whitespace-nowrap bg-[#0b2cf5] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                <div className="self-stretch my-auto">{t("requests3")}</div>
                                <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#0b2cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#0b2cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div> : university.status === "rejected" ?
                                <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#f50b0b] whitespace-nowrap bg-[#f50b0b] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                  <div className="self-stretch my-auto">{t("requests4")}</div>
                                  <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#f50b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#f50b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div> : university.status === "travelled" ?
                                  <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#ef00f7] whitespace-nowrap bg-[#ef00f7] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                    <div className="self-stretch my-auto">{t("requests5")}</div>
                                    <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#ef00f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#ef00f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div> : ""}
                      </div>
                      <div className="flex flex-col justify-center mt-3.5 w-full max-md:max-w-full">
                        <div className="flex flex-col justify-center w-full text-sm leading-6 text-start max-md:max-w-full">
                          <div className="flex flex-col justify-center w-full max-md:max-w-full">
                            <div className="flex flex-wrap gap-4 justify-center items-center w-full max-md:max-w-full">
                              <div className="flex gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M11 1.71484C5.89137 1.71484 1.75 5.85621 1.75 10.9648C1.75 16.0735 5.89137 20.2148 11 20.2148C16.1086 20.2148 20.25 16.0735 20.25 10.9648C20.25 5.85621 16.1086 1.71484 11 1.71484ZM0.25 10.9648C0.25 5.02778 5.06294 0.214844 11 0.214844C16.9371 0.214844 21.75 5.02778 21.75 10.9648C21.75 16.9019 16.9371 21.7148 11 21.7148C5.06294 21.7148 0.25 16.9019 0.25 10.9648ZM11 6.21484C11.4142 6.21484 11.75 6.55063 11.75 6.96484V10.6542L14.0303 12.9345C14.3232 13.2274 14.3232 13.7023 14.0303 13.9952C13.7374 14.2881 13.2626 14.2881 12.9697 13.9952L10.4697 11.4952C10.329 11.3545 10.25 11.1638 10.25 10.9648V6.96484C10.25 6.55063 10.5858 6.21484 11 6.21484Z" fill="#141522" />
                                </svg>

                                <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                  <div className="text-gray-900">{t("requests6")}</div>
                                  <div className="font-medium text-gray-400">
                                    {university.program?.start_date.slice(0, 10)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-1 shrink gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl basis-0">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M11.166 1.71484C6.05738 1.71484 1.91602 5.85621 1.91602 10.9648C1.91602 16.0735 6.05738 20.2148 11.166 20.2148C16.2746 20.2148 20.416 16.0735 20.416 10.9648C20.416 5.85621 16.2746 1.71484 11.166 1.71484ZM0.416016 10.9648C0.416016 5.02778 5.22895 0.214844 11.166 0.214844C17.1031 0.214844 21.916 5.02778 21.916 10.9648C21.916 16.9019 17.1031 21.7148 11.166 21.7148C5.22895 21.7148 0.416016 16.9019 0.416016 10.9648ZM11.166 4.21484C11.5802 4.21484 11.916 4.55063 11.916 4.96484V5.28158C13.5464 5.57351 14.916 6.79845 14.916 8.46484C14.916 8.87906 14.5802 9.21484 14.166 9.21484C13.7518 9.21484 13.416 8.87906 13.416 8.46484C13.416 7.62057 12.5425 6.71484 11.166 6.71484C9.78953 6.71484 8.91602 7.62057 8.91602 8.46484C8.91602 9.30911 9.78953 10.2148 11.166 10.2148C13.1032 10.2148 14.916 11.5477 14.916 13.4648C14.916 15.1312 13.5464 16.3562 11.916 16.6481V16.9648C11.916 17.3791 11.5802 17.7148 11.166 17.7148C10.7518 17.7148 10.416 17.3791 10.416 16.9648V16.6481C8.78558 16.3562 7.41602 15.1312 7.41602 13.4648C7.41602 13.0506 7.7518 12.7148 8.16602 12.7148C8.58023 12.7148 8.91602 13.0506 8.91602 13.4648C8.91602 14.3091 9.78953 15.2148 11.166 15.2148C12.5425 15.2148 13.416 14.3091 13.416 13.4648C13.416 12.6206 12.5425 11.7148 11.166 11.7148C9.22879 11.7148 7.41602 10.382 7.41602 8.46484C7.41602 6.79845 8.78559 5.57351 10.416 5.28158V4.96484C10.416 4.55063 10.7518 4.21484 11.166 4.21484Z" fill="#141522" />
                                </svg>

                                <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                  <div className="text-gray-900">{t("requests7")}</div>
                                  <div className="font-medium text-gray-400">{university.program?.price} {university.program?.university?.currency}</div>
                                </div>

                              </div>
                              <div className="flex flex-1 shrink gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl basis-0">
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3.59998 7.34375H2C1.45 7.34375 1 7.79375 1 8.34375V16.9637C1 17.5137 1.45 17.9637 2 17.9637H3.59998C4.14998 17.9637 4.59998 17.5137 4.59998 16.9637V8.34375C4.59998 7.79375 4.14998 7.34375 3.59998 7.34375Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M10.7992 4.15625H9.19922C8.64922 4.15625 8.19922 4.60625 8.19922 5.15625V16.9662C8.19922 17.5162 8.64922 17.9662 9.19922 17.9662H10.7992C11.3492 17.9662 11.7992 17.5162 11.7992 16.9662V5.15625C11.7992 4.60625 11.3492 4.15625 10.7992 4.15625Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M18.0004 0.964844H16.4004C15.8504 0.964844 15.4004 1.41484 15.4004 1.96484V16.9648C15.4004 17.5148 15.8504 17.9648 16.4004 17.9648H18.0004C18.5504 17.9648 19.0004 17.5148 19.0004 16.9648V1.96484C19.0004 1.41484 18.5504 0.964844 18.0004 0.964844Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                  <div className="text-gray-900">{t("requests8")}</div>
                                  <div className="font-medium text-gray-400">{university.program?.program_translations[0].course_language}</div>
                                </div>

                              </div>
                              <div className="flex flex-1 shrink gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl basis-0">
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.49258 11.8348C9.39258 11.8248 9.27258 11.8248 9.16258 11.8348C6.78258 11.7548 4.89258 9.80484 4.89258 7.40484C4.89258 4.95484 6.87258 2.96484 9.33258 2.96484C11.7826 2.96484 13.7726 4.95484 13.7726 7.40484C13.7626 9.80484 11.8726 11.7548 9.49258 11.8348Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M16.7413 4.96484C18.6813 4.96484 20.2413 6.53484 20.2413 8.46484C20.2413 10.3548 18.7413 11.8948 16.8713 11.9648C16.7913 11.9548 16.7013 11.9548 16.6113 11.9648" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M4.49273 15.5248C2.07273 17.1448 2.07273 19.7848 4.49273 21.3948C7.24273 23.2348 11.7527 23.2348 14.5027 21.3948C16.9227 19.7748 16.9227 17.1348 14.5027 15.5248C11.7627 13.6948 7.25273 13.6948 4.49273 15.5248Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M18.6719 20.9648C19.3919 20.8148 20.0719 20.5248 20.6319 20.0948C22.1919 18.9248 22.1919 16.9948 20.6319 15.8248C20.0819 15.4048 19.4119 15.1248 18.7019 14.9648" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                  <div className="text-gray-900">{t("requests9")}</div>
                                  <div className="font-medium text-gray-400">{university.program?.program_translations[0].price_period_type}</div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2.5 mt-2.5 w-full text-xl text-center text-white min-h-[58px] max-md:max-w-full">
                          <button className="flex-1 justify-center px-10 py-2 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
                            <Link
                              href={`/${pathname.slice(1, 3)}/university/${university.program?.university?.id}/${university.program?.id}`}
                            >
                              {t("requests10")}
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </> : <NotFoundReq />}
        </>}

      </div>

      {/* ---------------------------------------Courses------------------------------------------------------- */}

      <div className="mt-8 text-3xl px-10 font-bold text-start text-neutral-800 max-md:max-w-full">
      {t("requests11")}
      </div>
      <div className="flex overflow-hidden flex-col self-stretch bg-white md:px-5">
        <div className="flex flex-wrap gap-5 items-start">
          <div className="flex flex-1 shrink gap-6 items-end basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center  w-full bg-white basis-0 min-w-[240px]  max-md:max-w-full">
              <div className="flex overflow-hidden flex-col self-stretch  bg-white  border-gray border-solid  gap-3 ">
                {isLoading ? <Loader /> : <>
                  {requests && requests.Institute_Orders?.length !== 0 ? <>
                    {requests.Institute_Orders?.map((order, index) => {
                      return (
                        <div key={index} className="flex flex-col flex-1 shrink justify-center p-5 w-full bg-white  border border-gray border-solid basis-0   max-md:max-w-full rounded-2xl">
                          <div className="flex flex-wrap gap-3.5 items-start w-full max-md:max-w-full">
                            <div className="flex flex-1 shrink gap-4 items-center text-xl font-medium text-start text-gray-900 basis-8 min-w-[240px] max-md:max-w-full">
                              <div className="flex flex-col flex-1 shrink self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                <div className="w-full max-md:max-w-full text-primary font-semibold">
                                  {order.course?.courses_translations[0].name}
                                </div>
                              </div>
                            </div>
                            {order.status === "approved" ?
                              <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#28C76F] whitespace-nowrap bg-[#28C76F] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                <div className="self-stretch my-auto">{t("requests1")}</div>
                                <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#28C76F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#28C76F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div> : order.status === "pending" ?
                                <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#f59e0b] whitespace-nowrap bg-[#f59e0b] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                  <div className="self-stretch my-auto">{t("requests2")}</div>
                                  <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div> : order.status === "under_process" ?
                                  <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#0b2cf5] whitespace-nowrap bg-[#0b2cf5] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                    <div className="self-stretch my-auto">{t("requests3")}</div>
                                    <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#0b2cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#0b2cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div> : order.status === "rejected" ?
                                    <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#f50b0b] whitespace-nowrap bg-[#f50b0b] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                      <div className="self-stretch my-auto">{t("requests4")}</div>
                                      <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#f50b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#f50b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </div> : order.status === "travelled" ?
                                      <div className="flex overflow-hidden gap-2 justify-center items-center px-4 py-3.5 text-xl text-[#ef00f7] whitespace-nowrap bg-[#ef00f7] bg-opacity-10 min-h-[58px] rounded-[111px]  w-[162px]">
                                        <div className="self-stretch my-auto">{t("requests5")}</div>
                                        <svg width="21" height="21" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M20.6673 11.4635C20.6673 16.5235 16.5607 20.6302 11.5007 20.6302C6.44065 20.6302 2.33398 16.5235 2.33398 11.4635C2.33398 6.40354 6.44065 2.29688 11.5007 2.29688C16.5607 2.29688 20.6673 6.40354 20.6673 11.4635Z" stroke="#ef00f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M14.9002 14.3785L12.0585 12.6827C11.5635 12.3893 11.1602 11.6835 11.1602 11.106V7.34766" stroke="#ef00f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </div> :
                                      ""
                            }
                          </div>
                          <div className="flex flex-col justify-center mt-3.5 w-full max-md:max-w-full">
                            <div className="flex flex-col justify-center w-full text-sm leading-6 text-start max-md:max-w-full">
                              <div className="flex flex-col justify-center w-full max-md:max-w-full">
                                <div className="flex flex-wrap gap-4 justify-center items-center w-full max-md:max-w-full">
                                  <p className="w-full text-[#6C7278] line-clamp-2">{order.course?.courses_translations[0].description}</p>
                                  <div className="flex gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8 2.46484V5.46484" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M16 2.46484V5.46484" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M3.5 9.55469H20.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M22 19.4648C22 20.2148 21.79 20.9248 21.42 21.5248C20.73 22.6848 19.46 23.4648 18 23.4648C16.99 23.4648 16.07 23.0948 15.37 22.4648C15.06 22.2048 14.79 21.8848 14.58 21.5248C14.21 20.9248 14 20.2148 14 19.4648C14 17.2548 15.79 15.4648 18 15.4648C19.2 15.4648 20.27 15.9948 21 16.8248C21.62 17.5348 22 18.4548 22 19.4648Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M16.4395 19.4644L17.4295 20.4544L19.5594 18.4844" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M21 8.96484V16.8248C20.27 15.9948 19.2 15.4648 18 15.4648C15.79 15.4648 14 17.2548 14 19.4648C14 20.2148 14.21 20.9248 14.58 21.5248C14.79 21.8848 15.06 22.2048 15.37 22.4648H8C4.5 22.4648 3 20.4648 3 17.4648V8.96484C3 5.96484 4.5 3.96484 8 3.96484H16C19.5 3.96484 21 5.96484 21 8.96484Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M11.9945 14.1641H12.0035" stroke="black" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M8.29529 14.1641H8.30427" stroke="black" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M8.29529 17.1641H8.30427" stroke="black" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                    <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                      <div className="text-gray-900">{t("requests12")}</div>
                                      <div className="font-medium text-gray-400">
                                        {order.start_date.slice(0, 10)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 shrink gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl basis-0">
                                    <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M11.2391 1.46484H4.75906C0.999062 1.46484 0.709061 4.84484 2.73906 6.68484L13.2591 16.2448C15.2891 18.0848 14.9991 21.4648 11.2391 21.4648H4.75906C0.999062 21.4648 0.709061 18.0848 2.73906 16.2448L13.2591 6.68484C15.2891 4.84484 14.9991 1.46484 11.2391 1.46484Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                    <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                      <div className="text-gray-900">{t("requests13")}</div>
                                      <div className="font-medium text-gray-400">{order.number_of_weeks} {t("requests14")}</div>
                                    </div>

                                  </div>
                                  <div className="flex flex-1 shrink gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl basis-0">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12.0009 13.8963C13.724 13.8963 15.1209 12.4994 15.1209 10.7763C15.1209 9.05312 13.724 7.65625 12.0009 7.65625C10.2777 7.65625 8.88086 9.05312 8.88086 10.7763C8.88086 12.4994 10.2777 13.8963 12.0009 13.8963Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" />
                                      <path d="M3.61971 8.95485C5.58971 0.294846 18.4197 0.304846 20.3797 8.96485C21.5297 14.0448 18.3697 18.3448 15.5997 21.0048C13.5897 22.9448 10.4097 22.9448 8.38971 21.0048C5.62971 18.3448 2.46971 14.0348 3.61971 8.95485Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" />
                                    </svg>


                                    <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                      <div className="text-gray-900">{t("certificate7")}</div>
                                      <div className="font-medium text-gray-400">{order.institute_branch?.country?.name}</div>
                                    </div>

                                  </div>
                                  <div className="flex flex-1 shrink gap-2.5 justify-center items-center self-stretch py-1.5 my-auto rounded-2xl basis-0">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M22 9.46437V15.4644C22 17.9644 21.5 19.7144 20.38 20.8444L14 14.4644L21.73 6.73438C21.91 7.52438 22 8.42437 22 9.46437Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M21.73 6.73485L6.26999 22.1948C3.25999 21.5048 2 19.4248 2 15.4648V9.46484C2 4.46484 4 2.46484 9 2.46484H15C18.96 2.46484 21.04 3.72485 21.73 6.73485Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M20.3795 20.8448C19.2495 21.9648 17.4995 22.4648 14.9995 22.4648H8.99954C7.95954 22.4648 7.05953 22.3748 6.26953 22.1948L13.9995 14.4648L20.3795 20.8448Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M6.23929 8.44359C6.91929 5.51359 11.3193 5.51359 11.9993 8.44359C12.3893 10.1636 11.3093 11.6236 10.3593 12.5236C9.66928 13.1836 8.5793 13.1836 7.8793 12.5236C6.9293 11.6236 5.83929 10.1636 6.23929 8.44359Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" />
                                      <path d="M9.09412 9.16406H9.1031" stroke="black" strokeOpacity="0.88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex flex-col justify-center items-start self-stretch my-auto">
                                      <div className="text-gray-900">{t("requests15")}</div>
                                      <div className="font-medium text-gray-400">{order.institute_branch?.state?.name}</div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2.5 mt-2.5 w-full text-xl text-center text-white min-h-[58px] max-md:max-w-full">
                              <button className="flex-1 justify-center px-10 py-2 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
                                <Link
                                  href={`/${pathname.slice(1, 3)}/language-schools/${order.institute_branch?.institute?.id}/${order.institute_branch?.id}/${order.course?.id}`}
                                >
                                  {t("requests16")}
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}  </> : <NotFoundReq />}
                </>}



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRequests;
