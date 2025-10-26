

"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import BranchINS from '../../../../_components/BranchINS';
import Courses from '../../../../_components/Courses';
import Location from '../../../../_components/Location';
import RatingINS from '../../../../_components/RatingINS';
import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getBranch } from '@/app/reduxTool-kit/slices/branchSlice';
import Loader from '@/app/_components/Loader';
import { AppDispatch } from '@/app/store';
import useCleanPath from '@/app/_hooks/useCleanPath';
import ResultNotFound from '@/app/_components/ResultNotFound';

const TickCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F89A21" />
      <path d="M10.5795 15.5816C10.3795 15.5816 10.1895 15.5016 10.0495 15.3616L7.21945 12.5316C6.92945 12.2416 6.92945 11.7616 7.21945 11.4716C7.50945 11.1816 7.98945 11.1816 8.27945 11.4716L10.5795 13.7716L15.7195 8.63156C16.0095 8.34156 16.4895 8.34156 16.7795 8.63156C17.0695 8.92156 17.0695 9.40156 16.7795 9.69156L11.1095 15.3616C10.9695 15.5016 10.7795 15.5816 10.5795 15.5816Z" fill="white" />
  </svg>

)

function BranchDetails() {
  const [showBranch, setShowBranch] = useState<boolean>(true);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [showRating, setShowRating] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showProgram, setShowProgram] = useState<boolean>(false);
  const { cleanPath } = useCleanPath();
  const params = useParams();
  const t = useTranslations("instDetails");
  const dispatch = useDispatch<AppDispatch>();
  const { branchsId, locale, schoolsId } = params;

  const branch = useSelector((state: any) => state.branch);
  // console.log("branch", branch);

  const toggleBranch = (eve: any) => {
    if (eve === "branch") {
      setShowBranch(true);
      setShowLocation(false);
      setShowRating(false);
      setShowProgram(false);
    } else if (eve === "location") {
      setShowLocation(true);
      setShowBranch(false);
      setShowRating(false);
      setShowProgram(false);
    } else if (eve === "rating") {
      setShowRating(true);
      setShowBranch(false);
      setShowLocation(false);
      setShowProgram(false);
    } else if (eve === "program") {
      setShowProgram(true);
      setShowBranch(false);
      setShowLocation(false);
      setShowRating(false);
    }
  }

  useEffect(() => {
    dispatch(getBranch(params));
  }, [params, dispatch])

  return (
    <>
      {branch.id ? <div className="flex flex-col bg-secondColor">
        <div className="flex overflow-hidden relative flex-col justify-center min-h-[468px]">
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
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow mt-6 max-md:mt-10 max-md:max-w-full">
                    <div className="flex flex-col gap-5 justify-center items-start max-md:max-w-full ">
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
                              href={`/${locale}`}
                              className="block text-white transition hover:text-gray"
                            >
                              {" "}
                              {t("home")}{" "}
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
                              {t("languageSchool")}{" "}
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
                              {t("instDetails")}
                              {/* Branch Details */}
                            </Link>
                          </li>
                        </ol>
                      </nav>
                      <div className="flex gap-4   ">
                        <div className="flex justify-center items-center p-1 my-auto bg-white rounded-xl border border-gray border-solid h-[70px] w-[70px]">
                          <Image
                            src={!branch.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(branch.logo)}`}
                            width={58}
                            height={58}
                            alt={branch.name}
                          />
                        </div>
                        <div className="flex flex-col text-start max-md:max-w-full">
                          <div className="self-start text-3xl font-medium text-white">
                            {branch.institute_name}( {branch.city?.name} )
                          </div>
                          <div className="flex gap-1 mt-3 text-base tracking-wide leading-6 text-white max-md:flex-wrap">
                            {/* <Image
                            src="/icons/Map Point-white.svg"
                            width={22}
                            height={22}
                            alt="stars"
                          /> */}
                            <svg width="16" height="20" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M0.25 9.64329C0.25 4.74427 4.15501 0.75 9 0.75C13.845 0.75 17.75 4.74427 17.75 9.64329C17.75 12.0084 17.076 14.5479 15.8844 16.7419C14.6944 18.9331 12.9556 20.8372 10.7805 21.8539C9.65057 22.382 8.34943 22.382 7.21949 21.8539C5.04437 20.8372 3.30562 18.9331 2.11556 16.7419C0.924029 14.5479 0.25 12.0084 0.25 9.64329ZM9 2.25C5.00843 2.25 1.75 5.54748 1.75 9.64329C1.75 11.7404 2.35263 14.0354 3.4337 16.026C4.51624 18.0192 6.04602 19.6496 7.85465 20.495C8.58205 20.835 9.41795 20.835 10.1454 20.495C11.954 19.6496 13.4838 18.0192 14.5663 16.026C15.6474 14.0354 16.25 11.7404 16.25 9.64329C16.25 5.54748 12.9916 2.25 9 2.25ZM9 7.25C7.75736 7.25 6.75 8.25736 6.75 9.5C6.75 10.7426 7.75736 11.75 9 11.75C10.2426 11.75 11.25 10.7426 11.25 9.5C11.25 8.25736 10.2426 7.25 9 7.25ZM5.25 9.5C5.25 7.42893 6.92893 5.75 9 5.75C11.0711 5.75 12.75 7.42893 12.75 9.5C12.75 11.5711 11.0711 13.25 9 13.25C6.92893 13.25 5.25 11.5711 5.25 9.5Z" fill="white" />
                            </svg>

                            <div className="flex-1 max-md:max-w-full">
                              {`
                              ${branch.country?.name ? `${branch.country?.name}` : ""}
                              ${branch.state?.name ? ` - ${branch.state?.name}` : ""}
                              ${branch.city?.name ? ` - ${branch.city?.name}` : ""}
                              `}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2.5  max-md:flex-wrap items-center">
                        <div className="flex gap-1.5 justify-center self-start px-2.5 py-1.5 text-sm font-semibold leading-4 text-amber-300 whitespace-nowrap rounded-md bg-white bg-opacity-10">
                          <Image
                            src="/icons/Star.svg"
                            width={18}
                            height={18}
                            alt="stars"
                          />
                          <div>{branch.rating ? branch.rating.toFixed(1) : "N/A"}</div>
                        </div>
                        <div className="text-base tracking-wide text-start text-ellipsis text-white text-opacity-90 max-md:max-w-full">
                          {/* (7,219 {t("rating")} ) */}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex gap-2.5 self-start  mt-56  text-lg leading-7 text-white max-md:pl-5 text-nowrap max-md:mt-10 max-md:mr-2.5 z-50">
                      <div
                        onClick={() => toggleBranch("branch")}
                        className={`justify-center p-3.5 font-medium ${!showBranch
                          ? ""
                          : "border-amber-500 border-solid border-b-[3px]"
                          } cursor-pointer`}
                      >
                        {t("aboutBransh")}
                      </div>
                      <div
                        onClick={() => toggleBranch("program")}
                        className={` p-3.5 ${!showProgram
                          ? ""
                          : "border-amber-500 border-solid border-b-[3px]"
                          } cursor-pointer`}
                      >
                        {t("courses")} ({branch.number_of_courses})
                      </div>

                      <div
                        onClick={() => toggleBranch("location")}
                        className={`justify-center p-3.5 font-medium ${!showLocation
                          ? ""
                          : "border-amber-500 border-solid border-b-[3px]"
                          } cursor-pointer`}
                      >
                        {t("location")}
                      </div>
                      <div
                        onClick={() => toggleBranch("rating")}
                        className={`justify-center p-3.5 font-medium ${!showRating
                          ? ""
                          : "border-amber-500 border-solid border-b-[3px]"
                          } cursor-pointer`}
                      >
                        {t("ratings")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col p-3 w-full bg-white rounded-3xl border border-gray border-solid max-md:mt-10 max-md:max-w-full">
                    <div className="flex overflow-hidden relative flex-col rounded-xl max-md:p-1.5 ">
                      {/* <iframe src={branch?.video} title={branch?.institute_name} height="300"></iframe>  */}
                      <span className="cursor-pointer" onClick={() => setSelectedVideo(branch?.video)}>
                        <iframe
                          src={branch?.video}
                          title={branch?.institute_name}
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
                              src={branch?.video}
                              title="Fullscreen Video"
                              className="w-full h-full rounded-lg"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )}

                      {/* old view */}
                      {/* {branch.files && <Image
                        src={branch.files?.length === 0 ? "/images/institut.png" : `${process.env.NEXT_PUBLIC_SERVER_URL}/${branch.files[0]}`}
                        fill={true}
                        alt="Institute"
                        className="rounded-xl"
                      />} 
                      <div className="flex relative justify-center items-center self-end px-3.5 py-2.5 rounded-2xl  bg-white  w-[60px] border border-white hover:border-primary cursor-pointer">
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
                      </div>*/}
                    </div>
                    <div className="flex gap-5 justify-between py-1.5 mt-2 lg:mt-8 w-full text-sm leading-6 text-start max-md:flex-wrap max-md:max-w-full">
                      <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                        <svg width="19" height="20" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.7309 3.01063L14.4909 6.53063C14.7309 7.02063 15.3709 7.49063 15.9109 7.58063L19.1009 8.11062C21.1409 8.45062 21.6209 9.93062 20.1509 11.3906L17.6709 13.8706C17.2509 14.2906 17.0209 15.1006 17.1509 15.6806L17.8609 18.7506C18.4209 21.1806 17.1309 22.1206 14.9809 20.8506L11.9909 19.0806C11.4509 18.7606 10.5609 18.7606 10.0109 19.0806L7.02089 20.8506C4.88089 22.1206 3.58089 21.1706 4.14089 18.7506L4.85089 15.6806C4.98089 15.1006 4.75089 14.2906 4.33089 13.8706L1.85089 11.3906C0.390886 9.93062 0.860886 8.45062 2.90089 8.11062L6.09089 7.58063C6.62089 7.49063 7.26089 7.02063 7.50089 6.53063L9.26089 3.01063C10.2209 1.10063 11.7809 1.10063 12.7309 3.01063Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <div className="flex flex-col justify-center">
                          <div className="text-gray-900">{t("rating")} </div>
                          <div className="font-medium text-[#ACB5BB]">
                            {branch.rating ? branch.rating.toFixed(1) : "N/A"}
                            {/* {t("stars")} */}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.02 5.77261C17.2923 5.71011 18.25 6.75695 18.25 7.95154V13.4108C18.25 14.6716 17.2316 15.6365 16.0459 15.7249C15.5529 15.7617 15.0551 15.8216 14.678 15.9138C13.9402 16.094 12.9666 16.5647 12.357 16.8858C11.8214 17.1681 11.1786 17.1681 10.643 16.8858C10.0334 16.5647 9.05979 16.094 8.32199 15.9138C7.94487 15.8216 7.44708 15.7617 6.95414 15.7249C5.76836 15.6365 4.75 14.6716 4.75 13.4108V7.99649C4.75 6.77528 5.748 5.71817 7.04194 5.81291C7.56744 5.85139 8.17286 5.91879 8.67802 6.04222C9.59977 6.26744 10.6985 6.80646 11.3132 7.1291C11.4157 7.1829 11.5434 7.18078 11.6463 7.12125C12.2018 6.79984 13.1675 6.27873 13.9997 6.04804C14.6227 5.87535 15.3904 5.80353 16.02 5.77261ZM16.75 7.95154C16.75 7.53391 16.4314 7.2542 16.0935 7.2708C15.4907 7.30041 14.8582 7.36663 14.4003 7.49354C13.7696 7.66839 12.9487 8.1007 12.3975 8.41959C12.3493 8.44749 12.3001 8.47306 12.25 8.49628V15.2586C12.8591 14.9625 13.6393 14.6234 14.322 14.4566C14.8199 14.335 15.4149 14.2678 15.9343 14.2291C16.4097 14.1936 16.75 13.8157 16.75 13.4108V7.95154ZM10.616 8.45726C10.66 8.48035 10.7047 8.50154 10.75 8.52081V15.2586C10.1409 14.9625 9.36071 14.6234 8.67802 14.4566C8.18009 14.335 7.58508 14.2678 7.06568 14.2291C6.59031 14.1936 6.25 13.8157 6.25 13.4108V7.99649C6.25 7.56975 6.58277 7.28331 6.9324 7.30891C7.4319 7.34548 7.93898 7.40578 8.32199 7.49936C9.04804 7.67676 10.0035 8.13574 10.616 8.45726Z" fill="#141522" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.44358 0.75C7.60583 0.749985 6.15019 0.749973 5.01098 0.903136C3.83856 1.06076 2.88961 1.39288 2.14124 2.14124C1.39288 2.88961 1.06076 3.83856 0.903136 5.01098C0.749973 6.15019 0.749985 7.60582 0.75 9.44357V13.5564C0.749985 15.3942 0.749973 16.8498 0.903136 17.989C1.06076 19.1614 1.39288 20.1104 2.14124 20.8588C2.88961 21.6071 3.83856 21.9392 5.01098 22.0969C6.15018 22.25 7.6058 22.25 9.44354 22.25H13.5564C15.3942 22.25 16.8498 22.25 17.989 22.0969C19.1614 21.9392 20.1104 21.6071 20.8588 20.8588C21.6071 20.1104 21.9392 19.1614 22.0969 17.989C22.25 16.8498 22.25 15.3942 22.25 13.5565V9.44359C22.25 7.60585 22.25 6.15018 22.0969 5.01098C21.9392 3.83856 21.6071 2.88961 20.8588 2.14124C20.1104 1.39288 19.1614 1.06076 17.989 0.903136C16.8498 0.749973 15.3942 0.749985 13.5564 0.75H9.44358ZM3.2019 3.2019C3.62511 2.77869 4.20476 2.52503 5.21085 2.38976C6.23851 2.25159 7.59318 2.25 9.5 2.25H13.5C15.4068 2.25 16.7615 2.25159 17.7892 2.38976C18.7952 2.52503 19.3749 2.77869 19.7981 3.2019C20.2213 3.62511 20.475 4.20476 20.6102 5.21085C20.7484 6.23851 20.75 7.59318 20.75 9.5V13.5C20.75 15.4068 20.7484 16.7615 20.6102 17.7892C20.475 18.7952 20.2213 19.3749 19.7981 19.7981C19.3749 20.2213 18.7952 20.475 17.7892 20.6102C16.7615 20.7484 15.4068 20.75 13.5 20.75H9.5C7.59318 20.75 6.23851 20.7484 5.21085 20.6102C4.20476 20.475 3.62511 20.2213 3.2019 19.7981C2.77869 19.3749 2.52503 18.7952 2.38976 17.7892C2.25159 16.7615 2.25 15.4068 2.25 13.5V9.5C2.25 7.59318 2.25159 6.23851 2.38976 5.21085C2.52503 4.20476 2.77869 3.62511 3.2019 3.2019Z" fill="#141522" />
                        </svg>

                        <div className="flex flex-col justify-center">
                          <div className="text-gray-900">
                            {t("noOfCourses")}
                          </div>
                          <div className="font-medium text-[#ACB5BB]">{branch.number_of_courses}</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.66055 11.37C9.56055 11.36 9.44055 11.36 9.33055 11.37C6.95055 11.29 5.06055 9.34 5.06055 6.94C5.06055 4.49 7.04055 2.5 9.50055 2.5C11.9505 2.5 13.9405 4.49 13.9405 6.94C13.9305 9.34 12.0405 11.29 9.66055 11.37Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16.9093 4.5C18.8493 4.5 20.4093 6.07 20.4093 8C20.4093 9.89 18.9093 11.43 17.0393 11.5C16.9593 11.49 16.8693 11.49 16.7793 11.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4.6607 15.06C2.2407 16.68 2.2407 19.32 4.6607 20.93C7.4107 22.77 11.9207 22.77 14.6707 20.93C17.0907 19.31 17.0907 16.67 14.6707 15.06C11.9307 13.23 7.4207 13.23 4.6607 15.06Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M18.8398 20.5C19.5598 20.35 20.2398 20.06 20.7998 19.63C22.3598 18.46 22.3598 16.53 20.7998 15.36C20.2498 14.94 19.5798 14.66 18.8698 14.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex flex-col justify-center">
                          <div className=" text-gray-900">{t("minAge")} </div>
                          <div className="font-medium text-[#ACB5BB]">
                            {branch.min_age ? branch.min_age : "0"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden flex -ms-3 gap-1 self-start  mt-10  text-sm leading-7 text-white text-nowrap z-50 overflow-scroll">
                  <div
                    onClick={() => toggleBranch("branch")}
                    className={`justify-center p-1.5 font-medium ${!showBranch
                      ? ""
                      : "border-amber-500 border-solid border-b-[3px]"
                      } cursor-pointer`}
                  >
                    {t("aboutBransh")}
                  </div>
                  <div
                    onClick={() => toggleBranch("program")}
                    className={` p-1.5 ${!showProgram
                      ? ""
                      : "border-amber-500 border-solid border-b-[3px]"
                      } cursor-pointer`}
                  >
                    {t("courses")} ({branch.number_of_courses})
                  </div>

                  <div
                    onClick={() => toggleBranch("location")}
                    className={`justify-center p-1.5 font-medium ${!showLocation
                      ? ""
                      : "border-amber-500 border-solid border-b-[3px]"
                      } cursor-pointer`}
                  >
                    {t("location")}
                  </div>
                  <div
                    onClick={() => toggleBranch("rating")}
                    className={`justify-center p-1.5 font-medium ${!showRating
                      ? ""
                      : "border-amber-500 border-solid border-b-[3px]"
                      } cursor-pointer`}
                  >
                    {t("ratings")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showBranch && (
          <div>
            <div className=" mt-4 text-lg md:text-2xl font-semibold leading-9 text-start text-gray-900 max-md:max-w-full px-3 md:px-20">
              {t("DescriptionOf")} {branch.institute_name} ({branch.city?.name})
            </div>
            <div className=" md:mt-5 text-sm md:text-lg leading-9 text-start text-gray-900 max-md:max-w-full px-3 md:px-20">

              {branch.description}
            </div>
            <div className=" mt-4 text-lg md:text-2xl font-semibold leading-9 text-start text-gray-900 max-md:max-w-full px-3 md:px-20">
              {t("importantPoints")}
            </div>

            <div className="flex flex-col items-start self-start mt-5 mb-10  max-w-full text-lg leading-9 text-gray-900 px-3 md:px-20">
              {branch.main_points && branch.main_points?.map((point: string, index: number) => (
                <div key={index} className="flex gap-2.5 justify-center items-start mt-3 text-sm md:text-lg">
                  <div>
                  <div className='mt-1'>
                                        <TickCircle />
                                    </div>
                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F89A21" />
                      <path d="M10.5795 15.5816C10.3795 15.5816 10.1895 15.5016 10.0495 15.3616L7.21945 12.5316C6.92945 12.2416 6.92945 11.7616 7.21945 11.4716C7.50945 11.1816 7.98945 11.1816 8.27945 11.4716L10.5795 13.7716L15.7195 8.63156C16.0095 8.34156 16.4895 8.34156 16.7795 8.63156C17.0695 8.92156 17.0695 9.40156 16.7795 9.69156L11.1095 15.3616C10.9695 15.5016 10.7795 15.5816 10.5795 15.5816Z" fill="white" />
                    </svg> */}
                  </div>
                  <div>{point}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {showProgram && (
          <div className="my-6 px-2 md:px-14">
            {" "}
            <Courses />{" "}
          </div>
        )}
        {showLocation && (
          <div className="my-6 px-2 md:px-14">
            {" "}
            <Location
              fullAddress={branch.address}
              spacialMark={branch.special_mark}
              urlMaps={branch.location}
              name={t("languageSchool")}
            />{" "}
          </div>
        )}
        {showRating && (
          <div className="my-6 px-2 md:px-14">
            {" "}
            <RatingINS institute_branch_id={branch.id} />{" "}
          </div>
        )}
      </div> : branch.statusCode === 500 ? <ResultNotFound /> :  <Loader />}
    </>

  );
}

export default BranchDetails
