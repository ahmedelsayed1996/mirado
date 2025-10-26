"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { getLanguage } from '../../../../../getLanguage';
import Loader from "@/app/_components/Loader";
import ResultNotFound from "@/app/_components/ResultNotFound";
import useCleanPath from "@/app/_hooks/useCleanPath";
import { getLanguageSchool } from "@/app/reduxTool-kit/slices/languageSchoolSlice";
import { AppDispatch } from "@/app/store";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import BranchINS from "../../../_components/BranchINS";
// import Loader from './../../../_components/Loader';

const TickCircle = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="#F89A21"
    />
    <path
      d="M10.5795 15.5816C10.3795 15.5816 10.1895 15.5016 10.0495 15.3616L7.21945 12.5316C6.92945 12.2416 6.92945 11.7616 7.21945 11.4716C7.50945 11.1816 7.98945 11.1816 8.27945 11.4716L10.5795 13.7716L15.7195 8.63156C16.0095 8.34156 16.4895 8.34156 16.7795 8.63156C17.0695 8.92156 17.0695 9.40156 16.7795 9.69156L11.1095 15.3616C10.9695 15.5016 10.7795 15.5816 10.5795 15.5816Z"
      fill="white"
    />
  </svg>
);

function LanguageSchoolsDetails() {
  const [showBranch, setShowBranch] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const t = useTranslations("aboutInst");
  const { cleanPath } = useCleanPath();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { locale, schoolsId } = params;
  const languageSchool = useSelector((state: any) => state.languageSchool);

  const toggleBranch = (eve: any) => {
    if (eve === "branch") {
      setShowBranch(true);
    } else {
      setShowBranch(false);
    }
  };

  useEffect(() => {
    dispatch(getLanguageSchool(params));
  }, [params, dispatch]);

  return (
    <>
      {languageSchool.id ? (
        <div className="flex flex-col bg-secondColor">
          <div className="flex overflow-hidden relative flex-col justify-center ">
            <Image
              src="/images/Banner.png"
              // src="/images/institut-fill.png"
              fill={true}
              alt="Institute"
              className="aspect-[3.7] object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col pt-2 w-full max-md:max-w-full">
              <div className="z-10 px-2 pt-2 lg:px-20 lg:pt-10 pb-px mb-0 w-full md:px-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-between">
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow mt-6 max-md:mt-10 max-md:max-w-full">
                      <div className="flex flex-col gap-5 justify-center items-start   max-md:max-w-full">
                        <nav aria-label="Breadcrumb">
                          <ol className="flex items-center gap-1 text-sm text-gray-600">
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                              </svg>
                            </li>
                            <li>
                              <Link
                                href={`/${locale}/`}
                                className="block text-white transition hover:text-gray"
                              >
                                {" "}
                                {t("Home")}{" "}
                              </Link>
                            </li>

                            <li className="rtl:rotate-180">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </li>

                            <li>
                              <Link
                                href={`/${locale}/language-schools`}
                                className="block text-white transition hover:text-gray text-nowrap"
                              >
                                {" "}
                                {t("Ins")}{" "}
                              </Link>
                            </li>
                            <li className="rtl:rotate-180">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </li>

                            <li>
                              <Link
                                href="#"
                                className="block text-white transition hover:text-gray"
                              >
                                {t("InsDetail")}
                              </Link>
                            </li>
                          </ol>
                        </nav>
                        <div className="flex gap-4 mt-5 lg:flex-wrap">
                          <div className="flex justify-center items-center p-1 my-auto bg-white rounded-xl border border-gray border-solid h-[70px] w-[70px]">
                            {languageSchool.logo ? (
                              <Image
                                src={`${
                                  process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                }/${cleanPath(languageSchool.logo)}`}
                                width={58}
                                height={58}
                                alt={languageSchool.name}
                              />
                            ) : (
                              <Image
                                src="/images/university.png"
                                width={58}
                                height={58}
                                alt={languageSchool.name}
                              />
                            )}
                            {/* <Image
                            src={!languageSchool.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_SERVER_URL}/${languageSchool.logo}`}
                            width={58}
                            height={58}
                            alt={languageSchool.name}
                          /> */}
                          </div>
                          <div className="flex flex-col text-start max-md:max-w-full">
                            <div className="self-start text-3xl font-medium text-white">
                              {languageSchool.name}
                            </div>
                            <div className="flex gap-1 mt-3 text-base tracking-wide leading-6 text-white max-md:flex-wrap">
                              <Image
                                src="/icons/Map Point-white.svg"
                                width={22}
                                height={22}
                                alt="stars"
                              />

                              {languageSchool.countries &&
                                languageSchool.countries.length > 0 && (
                                  <div className="max-md:max-w-full">
                                    {languageSchool.countries
                                      .map((country: any) => country.name)
                                      .join(" - ")}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2.5  max-md:flex-wrap items-center">
                          <div className="flex gap-1.5 justify-center self-start px-2.5 py-1.5 text-sm font-semibold leading-4 text-amber-300 whitespace-nowrap rounded-md bg-secondColor bg-opacity-30">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.67787 1.00898C6.90812 0.468723 7.67391 0.468721 7.90416 1.00897L9.28294 4.24411C9.37929 4.47019 9.59224 4.62491 9.83702 4.64668L13.3399 4.95827C13.9249 5.0103 14.1615 5.7386 13.7188 6.12453L11.0681 8.43554C10.8829 8.59704 10.8015 8.84737 10.8565 9.08691L11.6426 12.5146C11.7738 13.087 11.1543 13.5371 10.6505 13.2354L7.63346 11.4286C7.42262 11.3023 7.15941 11.3023 6.94857 11.4286L3.93155 13.2354C3.42772 13.5371 2.80819 13.087 2.93946 12.5146L3.72557 9.08691C3.78051 8.84737 3.69917 8.59704 3.51393 8.43554L0.863201 6.12453C0.42054 5.7386 0.657179 5.0103 1.24214 4.95827L4.74501 4.64668C4.9898 4.62491 5.20274 4.47019 5.29909 4.24411L6.67787 1.00898Z"
                                fill="#FFD166"
                              />
                            </svg>

                            <div>
                              {languageSchool.rating
                                ? languageSchool.rating.toFixed(1)
                                : "N/A"}{" "}
                            </div>
                          </div>
                          <div className="text-base tracking-wide text-start text-ellipsis text-white text-opacity-90 max-md:max-w-full">
                            {/* (7,219 Rating ) */}
                            {/* (7,219 {t("rating")} ) */}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:flex gap-2.5 self-start  mt-56 text-nowrap text-lg leading-7 text-white max-md:pl-5 max-md:mt-10 max-md:mr-2.5">
                        <div
                          onClick={() => toggleBranch("INS")}
                          className={`justify-center p-3.5 font-medium ${
                            showBranch
                              ? ""
                              : "border-amber-500 border-solid border-b-[3px]"
                          } cursor-pointer`}
                        >
                          {t("aboutInst")}
                        </div>
                        <div
                          onClick={() => toggleBranch("branch")}
                          className={` p-3.5 ${
                            !showBranch
                              ? ""
                              : "border-amber-500 border-solid border-b-[3px]"
                          } cursor-pointer`}
                        >
                          {t("noOfBransh")}({languageSchool.number_of_branches})
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col p-3 w-full bg-white rounded-3xl border border-gray border-solid max-md:mt-10 max-md:max-w-full">
                      <div className="flex overflow-hidden flex-col max-md:p-1.5 rounded-xl">
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            setSelectedVideo(languageSchool?.video)
                          }
                        >
                          <iframe
                            src={languageSchool?.video}
                            title={languageSchool.name}
                            height="300"
                            width="100%"
                            className="pointer-events-none"
                          ></iframe>
                        </span>
                        {selectedVideo && (
                          <div
                            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
                            onClick={() => setSelectedVideo(null)}
                          >
                            <div className="w-[70%] h-[70%]">
                              <iframe
                                src={languageSchool?.video}
                                title="Fullscreen Video"
                                className="w-full h-full rounded-lg"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        )}

                        {/* old view */}
                        {/* {languageSchool?.video !== "null" ?
                        <iframe src={languageSchool?.video} title={languageSchool.name} height="300"></iframe>
                        : <>
                          {languageSchool.files.length > 0 ? <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(languageSchool.files[0])}`}
                            fill={true}
                            alt="Institute"
                            className='rounded-xl'
                          /> : <Image
                            src="/images/institut-fill.png"
                            fill={true}
                            alt="Institute"
                            className='rounded-xl'
                          />}
                        </>} */}
                        {/* <Image
                        src="/images/institut-fill.png"
                        fill={true}
                        alt="Institute"
                        className="rounded-xl"
                      />
                      {languageSchool.files.length > 0 ? <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${languageSchool.files[0]}`}
                        fill={true}
                        alt="Institute"
                        className='rounded-xl'
                      /> : <Image
                        src="/images/institut-fill.png"
                        fill={true}
                        alt="Institute"
                        className='rounded-xl'
                      />} */}
                        {/* {languageSchool.files && <Image
                        src={!languageSchool.logo ? "/images/institut-fill.png" : `${process.env.NEXT_PUBLIC_SERVER_URL}/${languageSchool.files[0]}`}
                        fill={true}
                        alt="Institute"
                        className="rounded-xl"
                      />} */}

                        {/* <div className="flex relative justify-center items-center self-end px-3.5 py-2.5 rounded-2xl  bg-white  w-[60px] cursor-pointer border border-white hover:border-primary">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.5" d="M22.6552 10.8763V11.7271C22.6552 12.7481 22.9466 13.7463 23.4927 14.5959L24.8308 16.6777C26.0531 18.5793 25.12 21.1639 22.9941 21.7653C17.4329 23.3383 11.5671 23.3383 6.00585 21.7653C3.88001 21.1639 2.94691 18.5793 4.16918 16.6777L5.50734 14.5959C6.05341 13.7463 6.3448 12.7481 6.3448 11.7271V10.8763C6.3448 6.20489 9.99601 2.41797 14.5 2.41797C19.004 2.41797 22.6552 6.20489 22.6552 10.8763Z" fill="#F89A21" />
                          <path d="M15.4062 7.25C15.4062 6.74949 15.0005 6.34375 14.5 6.34375C13.9995 6.34375 13.5938 6.74949 13.5938 7.25V12.0833C13.5938 12.5838 13.9995 12.9896 14.5 12.9896C15.0005 12.9896 15.4062 12.5838 15.4062 12.0833V7.25Z" fill="#F89A21" />
                          <path d="M8.75195 22.4102C9.5385 24.8331 11.8145 26.5847 14.4996 26.5847C17.1847 26.5847 19.4606 24.8331 20.2472 22.4102C16.4465 23.1234 12.5527 23.1234 8.75195 22.4102Z" fill="#F89A21" />
                        </svg>
                      </div>
                      <Image
                        src="/icons/Play Circle.svg"
                        width={70}
                        height={50}
                        // fill={true}
                        alt="Play Circle"
                        className="mt-7 aspect-square  z-10"
                      />
                      <div className="flex relative flex-col justify-center px-5 mt-20 w-16 rounded-[40px] max-md:mt-10">
                        <div className="shrink-0 h-1.5 bg-blue-900 rounded-3xl" />
                      </div> */}
                      </div>
                      <div className="flex gap-5 justify-between py-1.5 mt-0 lg:mt-8 w-full text-sm leading-6 text-right max-md:flex-wrap max-md:max-w-full">
                        <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 22.5L2 22.5"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M17 22.5V6.5C17 4.61438 17 3.67157 16.4142 3.08579C15.8284 2.5 14.8856 2.5 13 2.5H11C9.11438 2.5 8.17157 2.5 7.58579 3.08579C7 3.67157 7 4.61438 7 6.5V22.5"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M20.25 12C20.25 12.4142 20.5858 12.75 21 12.75C21.4142 12.75 21.75 12.4142 21.75 12H20.25ZM20.1111 8.83706L19.6945 9.46066L19.6945 9.46066L20.1111 8.83706ZM20.6629 9.38886L20.0393 9.80554L20.0393 9.80554L20.6629 9.38886ZM21.75 16C21.75 15.5858 21.4142 15.25 21 15.25C20.5858 15.25 20.25 15.5858 20.25 16H21.75ZM17.5 9.25C18.2178 9.25 18.6998 9.25091 19.0672 9.28828C19.422 9.32438 19.586 9.3882 19.6945 9.46066L20.5278 8.21346C20.1318 7.94886 19.6925 7.84415 19.219 7.79598C18.758 7.74909 18.1866 7.75 17.5 7.75V9.25ZM21.75 12C21.75 11.3134 21.7509 10.742 21.704 10.281C21.6559 9.80755 21.5511 9.36818 21.2865 8.97218L20.0393 9.80554C20.1118 9.91399 20.1756 10.078 20.2117 10.4328C20.2491 10.8002 20.25 11.2822 20.25 12H21.75ZM19.6945 9.46066C19.831 9.55186 19.9481 9.66905 20.0393 9.80554L21.2865 8.97218C21.0859 8.67191 20.8281 8.41409 20.5278 8.21346L19.6945 9.46066ZM20.25 16V22.5H21.75V16H20.25Z"
                              fill="#1C274C"
                            />
                            <path
                              d="M3.88886 8.83706L4.30554 9.46066L4.30554 9.46066L3.88886 8.83706ZM3.33706 9.38886L3.96066 9.80554L3.96066 9.80554L3.33706 9.38886ZM3.75 20.5C3.75 20.0858 3.41421 19.75 3 19.75C2.58579 19.75 2.25 20.0858 2.25 20.5H3.75ZM2.25 16.5C2.25 16.9142 2.58579 17.25 3 17.25C3.41421 17.25 3.75 16.9142 3.75 16.5H2.25ZM6.5 7.75C5.81338 7.75 5.24196 7.74909 4.78102 7.79598C4.30755 7.84415 3.86818 7.94886 3.47218 8.21346L4.30554 9.46066C4.41399 9.3882 4.57796 9.32438 4.93283 9.28828C5.30023 9.25091 5.78216 9.25 6.5 9.25V7.75ZM3.75 12C3.75 11.2822 3.75091 10.8002 3.78828 10.4328C3.82438 10.078 3.8882 9.91399 3.96066 9.80554L2.71346 8.97218C2.44886 9.36818 2.34415 9.80755 2.29598 10.281C2.24909 10.742 2.25 11.3134 2.25 12H3.75ZM3.47218 8.21346C3.17191 8.41409 2.91409 8.67191 2.71346 8.97218L3.96066 9.80554C4.05186 9.66905 4.16905 9.55186 4.30554 9.46066L3.47218 8.21346ZM2.25 20.5V22.5H3.75V20.5H2.25ZM2.25 12V16.5H3.75V12H2.25Z"
                              fill="#1C274C"
                            />
                            <path
                              d="M12 22.5V19.5"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10 5.5H14"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10 14.5H10.5M14 14.5H12.5"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M14 8.5H13.5M10 8.5H11.5"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10 11.5H14"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>

                          <div className="flex flex-col justify-center">
                            <div className="text-gray-900">
                              {t("noOfBransh")}
                            </div>
                            <div className="font-medium text-[#ACB5BB] text-start">
                              {languageSchool.number_of_branches}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                          <svg
                            width="23"
                            height="23"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.02 5.77261C17.2923 5.71011 18.25 6.75695 18.25 7.95154V13.4108C18.25 14.6716 17.2316 15.6365 16.0459 15.7249C15.5529 15.7617 15.0551 15.8216 14.678 15.9138C13.9402 16.094 12.9666 16.5647 12.357 16.8858C11.8214 17.1681 11.1786 17.1681 10.643 16.8858C10.0334 16.5647 9.05979 16.094 8.32199 15.9138C7.94487 15.8216 7.44708 15.7617 6.95414 15.7249C5.76836 15.6365 4.75 14.6716 4.75 13.4108V7.99649C4.75 6.77528 5.748 5.71817 7.04194 5.81291C7.56744 5.85139 8.17286 5.91879 8.67802 6.04222C9.59977 6.26744 10.6985 6.80646 11.3132 7.1291C11.4157 7.1829 11.5434 7.18078 11.6463 7.12125C12.2018 6.79984 13.1675 6.27873 13.9997 6.04804C14.6227 5.87535 15.3904 5.80353 16.02 5.77261ZM16.75 7.95154C16.75 7.53391 16.4314 7.2542 16.0935 7.2708C15.4907 7.30041 14.8582 7.36663 14.4003 7.49354C13.7696 7.66839 12.9487 8.1007 12.3975 8.41959C12.3493 8.44749 12.3001 8.47306 12.25 8.49628V15.2586C12.8591 14.9625 13.6393 14.6234 14.322 14.4566C14.8199 14.335 15.4149 14.2678 15.9343 14.2291C16.4097 14.1936 16.75 13.8157 16.75 13.4108V7.95154ZM10.616 8.45726C10.66 8.48035 10.7047 8.50154 10.75 8.52081V15.2586C10.1409 14.9625 9.36071 14.6234 8.67802 14.4566C8.18009 14.335 7.58508 14.2678 7.06568 14.2291C6.59031 14.1936 6.25 13.8157 6.25 13.4108V7.99649C6.25 7.56975 6.58277 7.28331 6.9324 7.30891C7.4319 7.34548 7.93898 7.40578 8.32199 7.49936C9.04804 7.67676 10.0035 8.13574 10.616 8.45726Z"
                              fill="#141522"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.44358 0.75C7.60583 0.749985 6.15019 0.749973 5.01098 0.903136C3.83856 1.06076 2.88961 1.39288 2.14124 2.14124C1.39288 2.88961 1.06076 3.83856 0.903136 5.01098C0.749973 6.15019 0.749985 7.60582 0.75 9.44357V13.5564C0.749985 15.3942 0.749973 16.8498 0.903136 17.989C1.06076 19.1614 1.39288 20.1104 2.14124 20.8588C2.88961 21.6071 3.83856 21.9392 5.01098 22.0969C6.15018 22.25 7.6058 22.25 9.44354 22.25H13.5564C15.3942 22.25 16.8498 22.25 17.989 22.0969C19.1614 21.9392 20.1104 21.6071 20.8588 20.8588C21.6071 20.1104 21.9392 19.1614 22.0969 17.989C22.25 16.8498 22.25 15.3942 22.25 13.5565V9.44359C22.25 7.60585 22.25 6.15018 22.0969 5.01098C21.9392 3.83856 21.6071 2.88961 20.8588 2.14124C20.1104 1.39288 19.1614 1.06076 17.989 0.903136C16.8498 0.749973 15.3942 0.749985 13.5564 0.75H9.44358ZM3.2019 3.2019C3.62511 2.77869 4.20476 2.52503 5.21085 2.38976C6.23851 2.25159 7.59318 2.25 9.5 2.25H13.5C15.4068 2.25 16.7615 2.25159 17.7892 2.38976C18.7952 2.52503 19.3749 2.77869 19.7981 3.2019C20.2213 3.62511 20.475 4.20476 20.6102 5.21085C20.7484 6.23851 20.75 7.59318 20.75 9.5V13.5C20.75 15.4068 20.7484 16.7615 20.6102 17.7892C20.475 18.7952 20.2213 19.3749 19.7981 19.7981C19.3749 20.2213 18.7952 20.475 17.7892 20.6102C16.7615 20.7484 15.4068 20.75 13.5 20.75H9.5C7.59318 20.75 6.23851 20.7484 5.21085 20.6102C4.20476 20.475 3.62511 20.2213 3.2019 19.7981C2.77869 19.3749 2.52503 18.7952 2.38976 17.7892C2.25159 16.7615 2.25 15.4068 2.25 13.5V9.5C2.25 7.59318 2.25159 6.23851 2.38976 5.21085C2.52503 4.20476 2.77869 3.62511 3.2019 3.2019Z"
                              fill="#141522"
                            />
                          </svg>

                          <div className="flex flex-col justify-center">
                            <div className="text-gray-900">
                              {t("noOfCourses")}
                              {/* Courses */}
                            </div>
                            <div className="font-medium text-[#ACB5BB] text-start">
                              {languageSchool.number_of_courses}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                          <svg
                            width="22"
                            height="23"
                            viewBox="0 0 22 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.7309 3.01063L14.4909 6.53063C14.7309 7.02063 15.3709 7.49063 15.9109 7.58063L19.1009 8.11062C21.1409 8.45062 21.6209 9.93062 20.1509 11.3906L17.6709 13.8706C17.2509 14.2906 17.0209 15.1006 17.1509 15.6806L17.8609 18.7506C18.4209 21.1806 17.1309 22.1206 14.9809 20.8506L11.9909 19.0806C11.4509 18.7606 10.5609 18.7606 10.0109 19.0806L7.02089 20.8506C4.88089 22.1206 3.58089 21.1706 4.14089 18.7506L4.85089 15.6806C4.98089 15.1006 4.75089 14.2906 4.33089 13.8706L1.85089 11.3906C0.390886 9.93062 0.860886 8.45062 2.90089 8.11062L6.09089 7.58063C6.62089 7.49063 7.26089 7.02063 7.50089 6.53063L9.26089 3.01063C10.2209 1.10063 11.7809 1.10063 12.7309 3.01063Z"
                              stroke="black"
                              strokeOpacity="0.88"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <div className="flex flex-col justify-center">
                            <div className=" text-gray-900 text-start">
                              {t("rating")}
                            </div>
                            <div className="font-medium text-[#ACB5BB] text-start">
                              {languageSchool.rating
                                ? languageSchool.rating.toFixed(1)
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:hidden flex  gap-1.5 self-start  mt-56 text-nowrap text-base leading-7 text-white  max-md:mt-10 max-md:mr-2.5">
                    <div
                      onClick={() => toggleBranch("INS")}
                      className={`justify-center p-3.5 font-medium ${
                        showBranch
                          ? ""
                          : "border-amber-500 border-solid border-b-[3px]"
                      } cursor-pointer`}
                    >
                      {t("aboutInst")}
                    </div>
                    <div
                      onClick={() => toggleBranch("branch")}
                      className={` p-3.5 ${
                        !showBranch
                          ? ""
                          : "border-amber-500 border-solid border-b-[3px]"
                      } cursor-pointer`}
                    >
                      {t("noOfBransh")}({languageSchool.number_of_branches})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showBranch ? (
            <div className="my-6">
              <div className=" my-4 text-lg md:text-2xl font-semibold leading-9 text-start text-gray-900 max-md:max-w-full px-20">
                {t("instBransh")}
              </div>
              <BranchINS limit={9} bg="secondColor" />
            </div>
          ) : (
            <div>
              {/* about branch  */}
              <div className=" mt-4 text-lg md:text-2xl font-semibold leading-9 text-start text-gray-900 max-md:max-w-full px-3 md:px-20">
                {t("instDesc")}
              </div>
              <div className=" md:mt-5 text-sm md:text-lg leading-9 text-start text-gray-900 max-md:max-w-full px-3 md:px-20">
                {languageSchool.description}
              </div>
              <div className=" mt-8 text-lg md:text-2xl font-medium leading-9 text-start text-gray-900 max-md:max-w-full px-3 md:px-20">
                {t("pointes")}
              </div>
              <div className="flex flex-col items-start self-start mt-5 mb-10  max-w-full text-lg leading-9 text-gray-900 px-3 md:px-20">
                {languageSchool.main_points &&
                  languageSchool.main_points?.map(
                    (point: string, index: number) => (
                      <div
                        key={index}
                        className="flex gap-2.5 justify-center items-start mt-3 text-base md:text-xl"
                      >
                        {/* <Image
                    src="/icons/tick-circle.svg"
                    width={24}
                    height={24}
                    alt="tick-circle "
                  /> */}
                        <div className="mt-1">
                          <TickCircle />
                        </div>
                        <div>{point}</div>
                      </div>
                    )
                  )}
              </div>
            </div>
          )}
        </div>
      ) : languageSchool.statusCode === 500 ? (
        <ResultNotFound />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default LanguageSchoolsDetails;
