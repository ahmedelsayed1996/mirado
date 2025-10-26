"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import SelectCurrency from '@/app/_components/SelectCurrency';
import CustomerQuote from '@/app/_components/CustomerQuote';
import PayCreditCards from '@/app/_components/PayCreditCards';
import PaymentDone from '@/app/_components/PaymentDone';
import DepositPayment from '@/app/_components/DepositPayment';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '@/app/reduxTool-kit/slices/courseSlice';
import useCurrentLang from '@/app/_hooks/useCurrentLang';
import Loader from '@/app/_components/Loader';
import { parseCookies } from 'nookies';
import Poppup from '@/app/_components/Poppup';
import { getTotalPriceINS } from '@/app/reduxTool-kit/slices/calcTotalPriceINSSlice';
import CompleteYourData from '@/app/_components/CompleteYourData';
import { AppDispatch } from '@/app/store';
import AvailableOfficesINS from '@/app/_components/AvailableOfficesINS';
import { useTranslations } from 'next-intl';
import { getUser } from '@/app/reduxTool-kit/slices/userSlice';
import ResultNotFound from '@/app/_components/ResultNotFound';


interface PopPupData {
    title: string;
    prev: string;
    url: string;
    urlTwo: string;
    button: string;
}


const TickCircle = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F89A21" />
        <path d="M10.5795 15.5816C10.3795 15.5816 10.1895 15.5016 10.0495 15.3616L7.21945 12.5316C6.92945 12.2416 6.92945 11.7616 7.21945 11.4716C7.50945 11.1816 7.98945 11.1816 8.27945 11.4716L10.5795 13.7716L15.7195 8.63156C16.0095 8.34156 16.4895 8.34156 16.7795 8.63156C17.0695 8.92156 17.0695 9.40156 16.7795 9.69156L11.1095 15.3616C10.9695 15.5016 10.7795 15.5816 10.5795 15.5816Z" fill="white" />
    </svg>

)

function Courses() {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const params = useParams();
    const { locale, schoolsId, branchsId, courses } = params;
    const language = useCurrentLang();
    const [localeQuote, setLocaleQuote] = useState(false);
    const [specialQuote, setSpecialQuote] = useState(false);
    const [showCourse, setShowCourse] = useState(true);
    const [officePayment, setOfficePayment] = useState(false);
    const [completeInfo, setCompleteInfo] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const [currency, setCurrency] = useState(null);
    const { tokenMainSite } = parseCookies();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [objPopPup, setObjPopPup] = useState<PopPupData>({ title: "You must be registered on the site.", url: "login", button: "Go to Login", prev: "To apply for available courses or program, please register on the website first.", urlTwo: "register" });
    const [orderID, setOrderID] = useState("");
    const t = useTranslations("coursesDetails");
    const course = useSelector((state: any) => state.course);
    const user = useSelector((state: any) => state.displayUser);
    const userData = useSelector((state: any) => state.user);

    const handleClose = () => {
        setShowCourse(true);
        setIsLoggedIn(true);
        setLocaleQuote(false);
        setSpecialQuote(false);
        setOfficePayment(false);
        setCompleteInfo(false);
        setPaymentDone(false);
    };
    const handleCurrencySelected = (currency: any) => {
        setCurrency(currency);
        setLocaleQuote(false);
        setSpecialQuote(true);
    };
    const handleOfficeSelected = (id: string) => {
        // console.log("Order id: ", id);
        setOrderID(id);
        setOfficePayment(false);
        setPaymentDone(true);
        // setLocaleQuote(false);
    };
    const paymentMethod = () => {
        setSpecialQuote(false);
        if (userData.nationality && userData.gender && userData.files?.length > 0 && userData.country?.id) {
            console.log("Completed Data");
            completedInfo();
        } else {
            setCompleteInfo(true);
        }
    }
    const completedInfo = () => {
        setCompleteInfo(false);
        setOfficePayment(true);
    }


    // handle how many day left
    const endDate = new Date(course.course?.offer_end_date);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // handle discount price
    const discountedPrice = course?.course?.isOfferValid ? (course?.course?.min_cost - (course?.course?.min_cost * (course.course?.offer / 100))) : course?.course?.min_cost;


    useEffect(() => {
        dispatch(getCourse({ language, courseId: courses }));
        // dispatch(getUser({ locale: language, tokenMainSite }));

    }, [dispatch, language, courses])

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prevState => !prevState);

    console.log(course.id);
    console.log(course);
    return (
        <>
            {course?.course?.id ? <div className="flex flex-col bg-gray-50">

                {!isLoggedIn ? <div className='bg-gray opacity-1'>
                    <Poppup onClose={handleClose} obj={objPopPup} />
                </div> : ""}
                {localeQuote && <div className='bg-gray opacity-1'>
                    <SelectCurrency onClose={handleClose} onCurrencySelect={handleCurrencySelected} />
                </div>}
                {specialQuote && <div className='bg-gray opacity-1'>
                    <DepositPayment onClose={handleClose} onPayment={paymentMethod} />
                </div>}
                {completeInfo && <div className='bg-gray opacity-1'>
                    <CompleteYourData onClose={handleClose} onCompleted={completedInfo} />
                </div>}
                {/* {paymentFees && <div className='bg-gray opacity-1'>
                    <PayCreditCards onClose={handleClose} payInOffice={payOffice} onOfficeSelect={handleOfficeSelected} />
                </div>}  */}
                {/* {officePayment && <div className='bg-gray opacity-1'>
                    <AvailableOfficesINS onClose={handleClose} onOfficeSelect={handleOfficeSelected} />
                </div>} */}
                {paymentDone && <div className='bg-gray opacity-1'>
                    <PaymentDone onClose={handleClose} orderID={orderID} />
                </div>}
                {/* <div className='bg-gray opacity-1'>
                    <PaymentDone onClose={handleClose} orderID={orderID} />
                </div> */}

                {showCourse && <>
                    <div className="flex flex-col-reverse lg:flex-row items-start ps-20 pe-20 md:ps-5 md:pe-2 lg:ps-15 lg:pe-15 pt-8 w-full font-medium text-gray-900 bg-blue-200 bg-opacity-10 max-md:px-2 max-md:max-w-full gap-12">
                        <div className="w-[100%] lg:w-[65%]">
                            <nav className='hidden lg:block' aria-label="Breadcrumb">
                                <ol className="flex items-center gap-1 text-sm text-gray-600">
                                    <li>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="black"
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
                                        <Link href={`/`} className="block text-black transition hover:text-gray"> {t("breadCrumb1")} </Link>
                                    </li>

                                    <li className="rtl:rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="black"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </li>

                                    <li>
                                        <Link href={`${pathname.slice(1, 3)}/language-schools`} className="block text-black transition hover:text-gray">{t("breadCrumb2")}</Link>
                                    </li>
                                    <li className="rtl:rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="black"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </li>

                                    <li>
                                        <Link href="#" className="block text-black transition hover:text-gray">{t("breadCrumb3")}</Link>
                                    </li>
                                </ol>
                            </nav>
                            <div className="mt-5 text-lg md:text-3xl font-bold text-start  max-md:max-w-full">{!course.loading && course.course?.translation?.name}</div>
                            {/* <div className="flex flex-col justify-center p-2 mt-5 max-w-full text-base text-start text-black whitespace-nowrap bg-white rounded-[111px] w-[102px]">
                            </div> */}
                            <div className="flex flex-col justify-center items-start  mt-8 max-w-full text-lg leading-7 text-slate-600 w-[346px] md:pl-5">
                                <div className="justify-center p-3.5 border-amber-500 border-solid border-b-[3px]">
                                    {t("description")}
                                </div>
                            </div>
                            <div>
                                <div className=" my-4 text-2xl font-semibold leading-9 text-start text-gray-900 max-md:max-w-full ">
                                    {t("description")}
                                </div>
                                <div className=" my-8 text-base md:text-xl leading-9 text-gray-900 max-md:max-w-full text-justify">
                                    {!course.loading && course.course?.translation?.description}
                                </div>
                                {!course.loading && course.course?.translation?.requirments?.length > 0 && <>
                                    <div className=" my-8 text-2xl font-medium leading-9 text-start text-gray-900 max-md:max-w-full ">
                                        {t("comments")}
                                    </div>
                                    <div className="flex flex-col items-start self-start mb-16  max-w-full text-lg leading-9 text-gray-900 max-md:mr-2.5 ">
                                        {!course.loading && course.course?.translation?.requirments?.map((comment: any, index: number) => {
                                            return (
                                                <div key={index} className="flex gap-2.5 justify-center items-start">
                                                    <div className='mt-1'>
                                                        <TickCircle />
                                                    </div>
                                                    <div>{comment}</div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </>}
                            </div>
                        </div>
                        <nav className='block lg:hidden order-last   md:mb-5' aria-label="Breadcrumb">
                            <ol className="flex items-center gap-1 text-sm text-gray-600">
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="black"
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
                                    <Link href={`/`} className="block text-black transition hover:text-gray"> {t("breadCrumb1")} </Link>
                                </li>

                                <li className="rtl:rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="black"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </li>

                                <li>
                                    <Link href={`${pathname.slice(1, 3)}/language-schools`} className="block text-black transition hover:text-gray">{t("breadCrumb2")}</Link>
                                </li>
                                <li className="rtl:rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="black"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </li>

                                <li>
                                    <Link href="#" className="block text-black transition hover:text-gray">{t("breadCrumb3")}</Link>
                                </li>
                            </ol>
                        </nav>
                        <div className="flex w-[100%] flex-col lg:w-[35%] max-md:ml-0 mb-3">
                            <div className="flex flex-col p-5 w-full bg-white rounded-3xl border border-gray border-solid max-md:mt-6 max-md:max-w-full">

                                <div className="mt-3.5 text-2xl font-semibold leading-6 text-start text-primary max-md:max-w-full">
                                    {discountedPrice.toFixed(2)} {course?.course?.institutes_branch?.currency?.toUpperCase()}
                                </div>
                                <div className='text-red-500 pt-2'>{t("messagePrice")}</div>
                                {course.course?.isOfferValid && <>
                                    <div className="flex gap-1.5  mt-3 text-sm leading-6 max-md:flex-wrap max-md:px-5">
                                        <div className="text-start text-zinc-500 line-through">
                                            {course && course?.course?.min_cost} {course?.course?.institutes_branch?.currency?.toUpperCase()}
                                        </div>
                                        <div className="text-gray-900">{course && course?.course?.offer}% {t("discount")} <br />
                                        </div>
                                    </div>
                                    <div className='text-sm text-emerald-500'>
                                        {course && course?.course?.translation?.offer_comment}
                                    </div>
                                </>
                                }

                                {daysLeft > 0 ? <>
                                    <div className="flex gap-1.5 mt-3 text-sm leading-6  max-md:flex-wrap max-md:pl-2 text-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.99935 2.79297C5.74215 2.79297 2.29102 6.24411 2.29102 10.5013C2.29102 14.7585 5.74215 18.2096 9.99935 18.2096C14.2565 18.2096 17.7077 14.7585 17.7077 10.5013C17.7077 6.24411 14.2565 2.79297 9.99935 2.79297ZM1.04102 10.5013C1.04102 5.55375 5.0518 1.54297 9.99935 1.54297C14.9469 1.54297 18.9577 5.55375 18.9577 10.5013C18.9577 15.4489 14.9469 19.4596 9.99935 19.4596C5.0518 19.4596 1.04102 15.4489 1.04102 10.5013ZM9.99935 6.54297C10.3445 6.54297 10.6243 6.82279 10.6243 7.16797V10.2424L12.5246 12.1427C12.7687 12.3868 12.7687 12.7825 12.5246 13.0266C12.2805 13.2707 11.8848 13.2707 11.6407 13.0266L9.55741 10.9432C9.4402 10.826 9.37435 10.6671 9.37435 10.5013V7.16797C9.37435 6.82279 9.65417 6.54297 9.99935 6.54297Z" fill="#FF4C51" />
                                        </svg>
                                        <div className='text-rose-500'>{daysLeft > 0 ? `${daysLeft} ${t("commentOffer")}` : `${t("commentOffer2")}`}</div>
                                    </div>
                                </> : ""}

                                <div className="bg-gray border border-gray border-solid max-w-[498px] min-h-[1px] mt-5" />
                                <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <div className="flex gap-2 justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
                                                <path d="M3.59998 7.87891H2C1.45 7.87891 1 8.32891 1 8.87891V17.4989C1 18.0489 1.45 18.4989 2 18.4989H3.59998C4.14998 18.4989 4.59998 18.0489 4.59998 17.4989V8.87891C4.59998 8.32891 4.14998 7.87891 3.59998 7.87891Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.7992 4.69141H9.19922C8.64922 4.69141 8.19922 5.14141 8.19922 5.69141V17.5014C8.19922 18.0514 8.64922 18.5014 9.19922 18.5014H10.7992C11.3492 18.5014 11.7992 18.0514 11.7992 17.5014V5.69141C11.7992 5.14141 11.3492 4.69141 10.7992 4.69141Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18.0004 1.5H16.4004C15.8504 1.5 15.4004 1.95 15.4004 2.5V17.5C15.4004 18.05 15.8504 18.5 16.4004 18.5H18.0004C18.5504 18.5 19.0004 18.05 19.0004 17.5V2.5C19.0004 1.95 18.5504 1.5 18.0004 1.5Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="text-gray-900 text-nowrap">
                                                {t("requiredLevel")}
                                                <div className="self-start font-medium text-[#ACB5BB]">
                                                    {course && course.course?.translation?.required_level}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <div className="flex gap-2 justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.99935 2.79297C5.74215 2.79297 2.29102 6.24411 2.29102 10.5013C2.29102 14.7585 5.74215 18.2096 9.99935 18.2096C14.2565 18.2096 17.7077 14.7585 17.7077 10.5013C17.7077 6.24411 14.2565 2.79297 9.99935 2.79297ZM1.04102 10.5013C1.04102 5.55375 5.0518 1.54297 9.99935 1.54297C14.9469 1.54297 18.9577 5.55375 18.9577 10.5013C18.9577 15.4489 14.9469 19.4596 9.99935 19.4596C5.0518 19.4596 1.04102 15.4489 1.04102 10.5013ZM9.99935 6.54297C10.3445 6.54297 10.6243 6.82279 10.6243 7.16797V10.2424L12.5246 12.1427C12.7687 12.3868 12.7687 12.7825 12.5246 13.0266C12.2805 13.2707 11.8848 13.2707 11.6407 13.0266L9.55741 10.9432C9.4402 10.826 9.37435 10.6671 9.37435 10.5013V7.16797C9.37435 6.82279 9.65417 6.54297 9.99935 6.54297Z" fill="#000000" />
                                            </svg>
                                            <div className="text-gray-900">{t("studyTime")}

                                                <div className="self-start font-medium text-[#ACB5BB]">
                                                    {course && course.course?.translation?.time_of_course}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <div className="flex gap-2 justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                <path d="M9.91055 11.37C9.81055 11.36 9.69055 11.36 9.58055 11.37C7.20055 11.29 5.31055 9.34 5.31055 6.94C5.31055 4.49 7.29055 2.5 9.75055 2.5C12.2005 2.5 14.1905 4.49 14.1905 6.94C14.1805 9.34 12.2905 11.29 9.91055 11.37Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17.1593 4.5C19.0993 4.5 20.6593 6.07 20.6593 8C20.6593 9.89 19.1593 11.43 17.2893 11.5C17.2093 11.49 17.1193 11.49 17.0293 11.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.9107 15.06C2.4907 16.68 2.4907 19.32 4.9107 20.93C7.6607 22.77 12.1707 22.77 14.9207 20.93C17.3407 19.31 17.3407 16.67 14.9207 15.06C12.1807 13.23 7.6707 13.23 4.9107 15.06Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19.0898 20.5C19.8098 20.35 20.4898 20.06 21.0498 19.63C22.6098 18.46 22.6098 16.53 21.0498 15.36C20.4998 14.94 19.8298 14.66 19.1198 14.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="text-gray-900"> {t("maximumStudents")}
                                                <div className="self-start font-medium text-[#ACB5BB]">
                                                    {course.course?.max_no_of_students_per_class}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 12.5C16.5523 12.5 17 12.0523 17 11.5C17 10.9477 16.5523 10.5 16 10.5C15.4477 10.5 15 10.9477 15 11.5C15 12.0523 15.4477 12.5 16 12.5Z" fill="#141522" />
                                            <path d="M16 16.5C16.5523 16.5 17 16.0523 17 15.5C17 14.9477 16.5523 14.5 16 14.5C15.4477 14.5 15 14.9477 15 15.5C15 16.0523 15.4477 16.5 16 16.5Z" fill="#141522" />
                                            <path d="M12 11.5C12 12.0523 11.5523 12.5 11 12.5C10.4477 12.5 10 12.0523 10 11.5C10 10.9477 10.4477 10.5 11 10.5C11.5523 10.5 12 10.9477 12 11.5Z" fill="#141522" />
                                            <path d="M12 15.5C12 16.0523 11.5523 16.5 11 16.5C10.4477 16.5 10 16.0523 10 15.5C10 14.9477 10.4477 14.5 11 14.5C11.5523 14.5 12 14.9477 12 15.5Z" fill="#141522" />
                                            <path d="M6 12.5C6.55229 12.5 7 12.0523 7 11.5C7 10.9477 6.55229 10.5 6 10.5C5.44772 10.5 5 10.9477 5 11.5C5 12.0523 5.44772 12.5 6 12.5Z" fill="#141522" />
                                            <path d="M6 16.5C6.55229 16.5 7 16.0523 7 15.5C7 14.9477 6.55229 14.5 6 14.5C5.44772 14.5 5 14.9477 5 15.5C5 16.0523 5.44772 16.5 6 16.5Z" fill="#141522" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 0.25C6.41421 0.25 6.75 0.585786 6.75 1V1.76272C7.412 1.74999 8.14133 1.74999 8.94346 1.75H13.0564C13.8586 1.74999 14.588 1.74999 15.25 1.76272V1C15.25 0.585786 15.5858 0.25 16 0.25C16.4142 0.25 16.75 0.585786 16.75 1V1.82709C17.0099 1.84691 17.2561 1.87182 17.489 1.90313C18.6614 2.06076 19.6104 2.39288 20.3588 3.14124C21.1071 3.88961 21.4392 4.83855 21.5969 6.01098C21.75 7.15018 21.75 8.6058 21.75 10.4435V12.5564C21.75 14.3941 21.75 15.8498 21.5969 16.989C21.4392 18.1614 21.1071 19.1104 20.3588 19.8588C19.6104 20.6071 18.6614 20.9392 17.489 21.0969C16.3498 21.25 14.8942 21.25 13.0565 21.25H8.94359C7.10585 21.25 5.65018 21.25 4.51098 21.0969C3.33856 20.9392 2.38961 20.6071 1.64124 19.8588C0.89288 19.1104 0.560763 18.1614 0.403135 16.989C0.249972 15.8498 0.249985 14.3942 0.25 12.5564V10.4436C0.249985 8.60582 0.249972 7.15019 0.403135 6.01098C0.560763 4.83855 0.89288 3.88961 1.64124 3.14124C2.38961 2.39288 3.33856 2.06076 4.51098 1.90313C4.7439 1.87182 4.99006 1.84691 5.25 1.82709V1C5.25 0.585786 5.58579 0.25 6 0.25ZM4.71085 3.38976C3.70476 3.52502 3.12511 3.77869 2.7019 4.2019C2.27869 4.62511 2.02502 5.20476 1.88976 6.21085C1.86685 6.38123 1.8477 6.56061 1.83168 6.75H20.1683C20.1523 6.56061 20.1331 6.38124 20.1102 6.21085C19.975 5.20476 19.7213 4.62511 19.2981 4.2019C18.8749 3.77869 18.2952 3.52502 17.2892 3.38976C16.2615 3.25159 14.9068 3.25 13 3.25H9C7.09318 3.25 5.73851 3.25159 4.71085 3.38976ZM1.75 10.5C1.75 9.64599 1.75032 8.90273 1.76309 8.25H20.2369C20.2497 8.90273 20.25 9.64599 20.25 10.5V12.5C20.25 14.4068 20.2484 15.7615 20.1102 16.7892C19.975 17.7952 19.7213 18.3749 19.2981 18.7981C18.8749 19.2213 18.2952 19.475 17.2892 19.6102C16.2615 19.7484 14.9068 19.75 13 19.75H9C7.09318 19.75 5.73851 19.7484 4.71085 19.6102C3.70476 19.475 3.12511 19.2213 2.7019 18.7981C2.27869 18.3749 2.02502 17.7952 1.88976 16.7892C1.75159 15.7615 1.75 14.4068 1.75 12.5V10.5Z" fill="#141522" />
                                        </svg>

                                        <div className="flex flex-col justify-center">
                                            <div className="self-start text-gray-900">
                                                {t("courseDuration")}
                                            </div>
                                            <div className="font-medium text-[#ACB5BB] text-nowrap">
                                                {course && course.course?.translation?.course_duration}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 12.5C16.5523 12.5 17 12.0523 17 11.5C17 10.9477 16.5523 10.5 16 10.5C15.4477 10.5 15 10.9477 15 11.5C15 12.0523 15.4477 12.5 16 12.5Z" fill="#141522" />
                                            <path d="M16 16.5C16.5523 16.5 17 16.0523 17 15.5C17 14.9477 16.5523 14.5 16 14.5C15.4477 14.5 15 14.9477 15 15.5C15 16.0523 15.4477 16.5 16 16.5Z" fill="#141522" />
                                            <path d="M12 11.5C12 12.0523 11.5523 12.5 11 12.5C10.4477 12.5 10 12.0523 10 11.5C10 10.9477 10.4477 10.5 11 10.5C11.5523 10.5 12 10.9477 12 11.5Z" fill="#141522" />
                                            <path d="M12 15.5C12 16.0523 11.5523 16.5 11 16.5C10.4477 16.5 10 16.0523 10 15.5C10 14.9477 10.4477 14.5 11 14.5C11.5523 14.5 12 14.9477 12 15.5Z" fill="#141522" />
                                            <path d="M6 12.5C6.55229 12.5 7 12.0523 7 11.5C7 10.9477 6.55229 10.5 6 10.5C5.44772 10.5 5 10.9477 5 11.5C5 12.0523 5.44772 12.5 6 12.5Z" fill="#141522" />
                                            <path d="M6 16.5C6.55229 16.5 7 16.0523 7 15.5C7 14.9477 6.55229 14.5 6 14.5C5.44772 14.5 5 14.9477 5 15.5C5 16.0523 5.44772 16.5 6 16.5Z" fill="#141522" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 0.25C6.41421 0.25 6.75 0.585786 6.75 1V1.76272C7.412 1.74999 8.14133 1.74999 8.94346 1.75H13.0564C13.8586 1.74999 14.588 1.74999 15.25 1.76272V1C15.25 0.585786 15.5858 0.25 16 0.25C16.4142 0.25 16.75 0.585786 16.75 1V1.82709C17.0099 1.84691 17.2561 1.87182 17.489 1.90313C18.6614 2.06076 19.6104 2.39288 20.3588 3.14124C21.1071 3.88961 21.4392 4.83855 21.5969 6.01098C21.75 7.15018 21.75 8.6058 21.75 10.4435V12.5564C21.75 14.3941 21.75 15.8498 21.5969 16.989C21.4392 18.1614 21.1071 19.1104 20.3588 19.8588C19.6104 20.6071 18.6614 20.9392 17.489 21.0969C16.3498 21.25 14.8942 21.25 13.0565 21.25H8.94359C7.10585 21.25 5.65018 21.25 4.51098 21.0969C3.33856 20.9392 2.38961 20.6071 1.64124 19.8588C0.89288 19.1104 0.560763 18.1614 0.403135 16.989C0.249972 15.8498 0.249985 14.3942 0.25 12.5564V10.4436C0.249985 8.60582 0.249972 7.15019 0.403135 6.01098C0.560763 4.83855 0.89288 3.88961 1.64124 3.14124C2.38961 2.39288 3.33856 2.06076 4.51098 1.90313C4.7439 1.87182 4.99006 1.84691 5.25 1.82709V1C5.25 0.585786 5.58579 0.25 6 0.25ZM4.71085 3.38976C3.70476 3.52502 3.12511 3.77869 2.7019 4.2019C2.27869 4.62511 2.02502 5.20476 1.88976 6.21085C1.86685 6.38123 1.8477 6.56061 1.83168 6.75H20.1683C20.1523 6.56061 20.1331 6.38124 20.1102 6.21085C19.975 5.20476 19.7213 4.62511 19.2981 4.2019C18.8749 3.77869 18.2952 3.52502 17.2892 3.38976C16.2615 3.25159 14.9068 3.25 13 3.25H9C7.09318 3.25 5.73851 3.25159 4.71085 3.38976ZM1.75 10.5C1.75 9.64599 1.75032 8.90273 1.76309 8.25H20.2369C20.2497 8.90273 20.25 9.64599 20.25 10.5V12.5C20.25 14.4068 20.2484 15.7615 20.1102 16.7892C19.975 17.7952 19.7213 18.3749 19.2981 18.7981C18.8749 19.2213 18.2952 19.475 17.2892 19.6102C16.2615 19.7484 14.9068 19.75 13 19.75H9C7.09318 19.75 5.73851 19.7484 4.71085 19.6102C3.70476 19.475 3.12511 19.2213 2.7019 18.7981C2.27869 18.3749 2.02502 17.7952 1.88976 16.7892C1.75159 15.7615 1.75 14.4068 1.75 12.5V10.5Z" fill="#141522" />
                                        </svg>
                                        <div className="flex flex-col justify-center">
                                            <div className="self-start text-gray-900">
                                                {t("lessonDuration")}
                                            </div>
                                            <div className="font-medium text-[#ACB5BB] text-nowrap">
                                                {course && course.course?.lesson_duration}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 12.5C16.5523 12.5 17 12.0523 17 11.5C17 10.9477 16.5523 10.5 16 10.5C15.4477 10.5 15 10.9477 15 11.5C15 12.0523 15.4477 12.5 16 12.5Z" fill="#141522" />
                                            <path d="M16 16.5C16.5523 16.5 17 16.0523 17 15.5C17 14.9477 16.5523 14.5 16 14.5C15.4477 14.5 15 14.9477 15 15.5C15 16.0523 15.4477 16.5 16 16.5Z" fill="#141522" />
                                            <path d="M12 11.5C12 12.0523 11.5523 12.5 11 12.5C10.4477 12.5 10 12.0523 10 11.5C10 10.9477 10.4477 10.5 11 10.5C11.5523 10.5 12 10.9477 12 11.5Z" fill="#141522" />
                                            <path d="M12 15.5C12 16.0523 11.5523 16.5 11 16.5C10.4477 16.5 10 16.0523 10 15.5C10 14.9477 10.4477 14.5 11 14.5C11.5523 14.5 12 14.9477 12 15.5Z" fill="#141522" />
                                            <path d="M6 12.5C6.55229 12.5 7 12.0523 7 11.5C7 10.9477 6.55229 10.5 6 10.5C5.44772 10.5 5 10.9477 5 11.5C5 12.0523 5.44772 12.5 6 12.5Z" fill="#141522" />
                                            <path d="M6 16.5C6.55229 16.5 7 16.0523 7 15.5C7 14.9477 6.55229 14.5 6 14.5C5.44772 14.5 5 14.9477 5 15.5C5 16.0523 5.44772 16.5 6 16.5Z" fill="#141522" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 0.25C6.41421 0.25 6.75 0.585786 6.75 1V1.76272C7.412 1.74999 8.14133 1.74999 8.94346 1.75H13.0564C13.8586 1.74999 14.588 1.74999 15.25 1.76272V1C15.25 0.585786 15.5858 0.25 16 0.25C16.4142 0.25 16.75 0.585786 16.75 1V1.82709C17.0099 1.84691 17.2561 1.87182 17.489 1.90313C18.6614 2.06076 19.6104 2.39288 20.3588 3.14124C21.1071 3.88961 21.4392 4.83855 21.5969 6.01098C21.75 7.15018 21.75 8.6058 21.75 10.4435V12.5564C21.75 14.3941 21.75 15.8498 21.5969 16.989C21.4392 18.1614 21.1071 19.1104 20.3588 19.8588C19.6104 20.6071 18.6614 20.9392 17.489 21.0969C16.3498 21.25 14.8942 21.25 13.0565 21.25H8.94359C7.10585 21.25 5.65018 21.25 4.51098 21.0969C3.33856 20.9392 2.38961 20.6071 1.64124 19.8588C0.89288 19.1104 0.560763 18.1614 0.403135 16.989C0.249972 15.8498 0.249985 14.3942 0.25 12.5564V10.4436C0.249985 8.60582 0.249972 7.15019 0.403135 6.01098C0.560763 4.83855 0.89288 3.88961 1.64124 3.14124C2.38961 2.39288 3.33856 2.06076 4.51098 1.90313C4.7439 1.87182 4.99006 1.84691 5.25 1.82709V1C5.25 0.585786 5.58579 0.25 6 0.25ZM4.71085 3.38976C3.70476 3.52502 3.12511 3.77869 2.7019 4.2019C2.27869 4.62511 2.02502 5.20476 1.88976 6.21085C1.86685 6.38123 1.8477 6.56061 1.83168 6.75H20.1683C20.1523 6.56061 20.1331 6.38124 20.1102 6.21085C19.975 5.20476 19.7213 4.62511 19.2981 4.2019C18.8749 3.77869 18.2952 3.52502 17.2892 3.38976C16.2615 3.25159 14.9068 3.25 13 3.25H9C7.09318 3.25 5.73851 3.25159 4.71085 3.38976ZM1.75 10.5C1.75 9.64599 1.75032 8.90273 1.76309 8.25H20.2369C20.2497 8.90273 20.25 9.64599 20.25 10.5V12.5C20.25 14.4068 20.2484 15.7615 20.1102 16.7892C19.975 17.7952 19.7213 18.3749 19.2981 18.7981C18.8749 19.2213 18.2952 19.475 17.2892 19.6102C16.2615 19.7484 14.9068 19.75 13 19.75H9C7.09318 19.75 5.73851 19.7484 4.71085 19.6102C3.70476 19.475 3.12511 19.2213 2.7019 18.7981C2.27869 18.3749 2.02502 17.7952 1.88976 16.7892C1.75159 15.7615 1.75 14.4068 1.75 12.5V10.5Z" fill="#141522" />
                                        </svg>

                                        <div className="flex flex-col justify-center">
                                            <div className="self-start text-gray-900">
                                                {t("classesWeekly")}
                                            </div>
                                            <div className="font-medium text-[#ACB5BB] text-nowrap">
                                                {course.course?.lessons_per_week}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex lg:gap-1 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5195 1.36618C9.91556 0.965841 9.32627 0.850062 8.67724 0.954063C8.1236 1.04278 7.52424 1.29635 6.88107 1.56845L6.81371 1.59694C6.19223 1.8597 5.59398 2.18161 5.02762 2.56003C3.2598 3.74126 1.88194 5.42018 1.0683 7.38448C0.254658 9.34879 0.041772 11.5103 0.456563 13.5955C0.871354 15.6808 1.89519 17.5963 3.39861 19.0997C4.90202 20.6031 6.81749 21.627 8.90278 22.0418C10.9881 22.4566 13.1495 22.2437 15.1138 21.43C17.0782 20.6164 18.7571 19.2385 19.9383 17.4707C20.3167 16.9043 20.6386 16.3061 20.9014 15.6846L20.9299 15.6173C21.202 14.9741 21.4555 14.3747 21.5443 13.8211C21.6483 13.1721 21.5325 12.5828 21.1322 11.9789C20.7022 11.3303 20.1171 11.0167 19.4065 10.8747C18.7731 10.7482 17.9813 10.7482 17.0711 10.7483L15 10.7483C14.036 10.7483 13.3884 10.7467 12.9054 10.6818C12.4439 10.6198 12.2464 10.5125 12.1161 10.3822C11.9858 10.2519 11.8786 10.0544 11.8165 9.59294C11.7516 9.1099 11.75 8.46234 11.75 7.49833L11.75 5.42724C11.7501 4.51701 11.7502 3.72524 11.6236 3.09187C11.4816 2.38128 11.168 1.79609 10.5195 1.36618ZM7.39784 2.97853C8.13201 2.66813 8.56231 2.49161 8.91457 2.43517C9.19073 2.39092 9.39963 2.42349 9.69067 2.61641C9.93707 2.77976 10.0709 2.97684 10.1527 3.38582C10.2466 3.85559 10.25 4.49595 10.25 5.49833L10.25 7.55032C10.25 8.44879 10.2499 9.19803 10.3299 9.79281C10.4143 10.4206 10.6 10.9874 11.0555 11.4429C11.5109 11.8983 12.0777 12.084 12.7055 12.1684C13.3003 12.2484 14.0495 12.2484 14.948 12.2483L17 12.2483C18.0024 12.2483 18.6427 12.2518 19.1125 12.3457C19.5215 12.4274 19.7186 12.5613 19.8819 12.8077C20.0748 13.0987 20.1074 13.3076 20.0632 13.5838C20.0067 13.936 19.8302 14.3663 19.5198 15.1005C19.2937 15.6352 19.0167 16.15 18.6911 16.6374C17.6747 18.1585 16.23 19.3441 14.5398 20.0442C12.8496 20.7443 10.9897 20.9275 9.19542 20.5706C7.40109 20.2137 5.7529 19.3327 4.45927 18.0391C3.16563 16.7454 2.28465 15.0972 1.92774 13.3029C1.57083 11.5086 1.75401 9.64872 2.45412 7.95851C3.15423 6.26829 4.33982 4.82364 5.86098 3.80724C6.34832 3.4816 6.86308 3.20462 7.39784 2.97853Z" fill="#141522" />
                                            <path d="M13.6869 1.08682C13.2858 0.983578 12.8769 1.22507 12.7737 1.62621C12.6704 2.02735 12.9119 2.43623 13.3131 2.53948C16.5624 3.37581 19.1223 5.93566 19.9586 9.18505C20.0619 9.58619 20.4708 9.82768 20.8719 9.72444C21.273 9.62119 21.5145 9.2123 21.4113 8.81116C20.4387 5.03252 17.4656 2.05938 13.6869 1.08682Z" fill="#141522" />
                                        </svg>


                                        <div className="flex flex-col justify-center">
                                            <div className="self-start text-gray-900">
                                                {t("courseType")}
                                            </div>
                                            <div className="font-medium text-[#ACB5BB] text-nowrap">
                                                {course && course.course?.translation?.type_of_course.slice(0, 15)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.95646 2.68191C7.70433 2.76179 7.45533 2.85257 7.21018 2.95411C6.08792 3.41897 5.0682 4.10032 4.20926 4.95926C3.35032 5.8182 2.66897 6.83792 2.20411 7.96018C1.8352 8.85081 1.60837 9.7922 1.53045 10.75H6.01094C6.04294 9.6541 6.14498 8.5741 6.31457 7.55057C6.5225 6.29558 6.82972 5.13914 7.22522 4.15039C7.44114 3.61057 7.6851 3.11641 7.95646 2.68191ZM10.75 0.75C9.33829 0.75 7.9404 1.02806 6.63615 1.56829C5.3319 2.10853 4.14683 2.90037 3.1486 3.8986C2.15037 4.89683 1.35853 6.0819 0.818295 7.38615C0.278057 8.6904 1.19209e-07 10.0883 0 11.5C-1.19209e-07 12.9117 0.278057 14.3096 0.818295 15.6138C1.35853 16.9181 2.15037 18.1032 3.1486 19.1014C4.14683 20.0996 5.3319 20.8915 6.63615 21.4317C7.9404 21.9719 9.33829 22.25 10.75 22.25C12.1617 22.25 13.5596 21.9719 14.8638 21.4317C16.1681 20.8915 17.3532 20.0996 18.3514 19.1014C19.3496 18.1032 20.1415 16.9181 20.6817 15.6138C21.2219 14.3096 21.5 12.9117 21.5 11.5C21.5 10.0883 21.2219 8.6904 20.6817 7.38615C20.1415 6.0819 19.3496 4.89683 18.3514 3.8986C17.3532 2.90037 16.1681 2.10853 14.8638 1.5683C13.5596 1.02806 12.1617 0.75 10.75 0.75ZM10.75 2.25C10.4887 2.25 10.1512 2.37579 9.75877 2.7822C9.36341 3.19161 8.96762 3.83326 8.61793 4.70747C8.27056 5.57589 7.9885 6.62424 7.79439 7.79576C7.63866 8.73569 7.54316 9.73313 7.51162 10.75L13.9884 10.75C13.9568 9.73313 13.8613 8.73569 13.7056 7.79576C13.5115 6.62424 13.2294 5.5759 12.8821 4.70748C12.5324 3.83326 12.1366 3.19161 11.7412 2.7822C11.3488 2.37579 11.0113 2.25 10.75 2.25ZM15.4891 10.75C15.4571 9.6541 15.355 8.57411 15.1854 7.55057C14.9775 6.29558 14.6703 5.13914 14.2748 4.15039C14.0589 3.61057 13.8149 3.11641 13.5435 2.68191C13.7957 2.76179 14.0447 2.85257 14.2898 2.95411C15.4121 3.41897 16.4318 4.10032 17.2907 4.95926C18.1497 5.81821 18.831 6.83792 19.2959 7.96018C19.6648 8.85082 19.8916 9.7922 19.9695 10.75H15.4891ZM13.9884 12.25L7.51162 12.25C7.54316 13.2669 7.63866 14.2643 7.79439 15.2042C7.9885 16.3758 8.27056 17.4241 8.61793 18.2925C8.96762 19.1667 9.36341 19.8084 9.75877 20.2178C10.1512 20.6242 10.4887 20.75 10.75 20.75C11.0113 20.75 11.3488 20.6242 11.7412 20.2178C12.1366 19.8084 12.5324 19.1667 12.8821 18.2925C13.2294 17.4241 13.5115 16.3758 13.7056 15.2042C13.8613 14.2643 13.9568 13.2669 13.9884 12.25ZM13.5435 20.3181C13.8149 19.8836 14.0589 19.3894 14.2748 18.8496C14.6703 17.8609 14.9775 16.7044 15.1854 15.4494C15.355 14.4259 15.4571 13.3459 15.4891 12.25H19.9695C19.8916 13.2078 19.6648 14.1492 19.2959 15.0398C18.831 16.1621 18.1497 17.1818 17.2907 18.0407C16.4318 18.8997 15.4121 19.581 14.2898 20.0459C14.0447 20.1474 13.7957 20.2382 13.5435 20.3181ZM7.95646 20.3181C7.6851 19.8836 7.44114 19.3894 7.22521 18.8496C6.82971 17.8609 6.5225 16.7044 6.31457 15.4494C6.14498 14.4259 6.04294 13.3459 6.01094 12.25H1.53045C1.60837 13.2078 1.8352 14.1492 2.20411 15.0398C2.66897 16.1621 3.35032 17.1818 4.20926 18.0407C5.0682 18.8997 6.08792 19.581 7.21018 20.0459C7.45533 20.1474 7.70433 20.2382 7.95646 20.3181Z" fill="#141522" />
                                        </svg>

                                        <div className="flex flex-col justify-center">
                                            <div className="self-start text-gray-900">
                                                {t("studyLanguage")}
                                            </div>
                                            <div className="font-medium text-[#ACB5BB] text-nowrap">
                                                {course && course.course?.translation?.languages}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="10.75" cy="6.5" r="4" stroke="#141522" strokeWidth="1.5" />
                                            <path d="M21.75 10.5H19.75H17.75" stroke="#141522" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M18.7475 18.5C18.75 18.3358 18.75 18.169 18.75 18C18.75 15.5147 15.1683 13.5 10.75 13.5C6.33172 13.5 2.75 15.5147 2.75 18C2.75 20.4853 2.75 22.5 10.75 22.5C12.981 22.5 14.5898 22.3433 15.75 22.0634" stroke="#141522" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>


                                        <div className="flex flex-col justify-center">
                                            <div className="self-start text-gray-900">
                                                {t("minimumAge")}
                                            </div>
                                            <div className="font-medium text-[#ACB5BB] text-nowrap">
                                                {course?.course?.institutes_branch?.min_age}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <button className="gap-2.5 px-3 py-2 md:py-2.5 mt-4 w-full text-sm md:text-xl text-center text-white bg-primary rounded-xl border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 disabled:opacity-50"
                                    onClick={() => {
                                        if (tokenMainSite && user?.id) {

                                            setSpecialQuote(true);
                                            setShowCourse(false);

                                        } else {

                                            setIsLoggedIn(false);
                                            setShowCourse(false);
                                        }
                                    }}
                                >
                                    {t("createQuote")}
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="z-10 self-center mt-0 w-full max-w-[1548px] max-md:mt-0 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">

                            <div className="flex flex-col  w-[65%] max-md:ml-0 max-md:w-full">

                            </div>

                        </div>
                    </div>
                </>}



            </div> : course.course?.statusCode == 500 || course.course?.statusCode == 404 ? <ResultNotFound /> : <Loader />}
        </>


    )
}

export default Courses
