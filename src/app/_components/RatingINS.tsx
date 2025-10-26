"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Poppup from "./Poppup";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getReviewINS } from '../reduxTool-kit/slices/reviewINSSlice';
import useCurrentLang from '../_hooks/useCurrentLang';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';


function RatingINS({ institute_branch_id }: any) {

    const { tokenMainSite } = parseCookies();
    const t = useTranslations("Rating");
    const dispatch = useDispatch<AppDispatch>();
    const language = useCurrentLang();
    const [isOpen, setIsOpen] = useState(false);
    const [reviewAndRating, setReviewAndRating] = useState(null);
    const [chooseRating, setChooseRating] = useState(false);
    const [rating, setRating] = useState<number>(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const reviews = useSelector((state: any) => state.reviewINS);
    // console.log("reviews?.reviews", reviews?.reviews?.reviews);

    const handleClick = () => {
        if (textareaRef.current) {
            textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            textareaRef.current.focus();
        }
    };


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleRating = (index: number) => {
        setRating(index);
        setChooseRating(true);
    };

    const Star = ({ index }: any) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => handleRating(index)}
            className="cursor-pointer"
        >
            <path
                d="M12.8967 2.54566C12.7282 2.20435 12.3806 1.98828 12 1.98828C11.6194 1.98828 11.2718 2.20435 11.1033 2.54566L8.24574 8.33475L1.85537 9.2688C1.47881 9.32384 1.16613 9.58784 1.04875 9.94985C0.931376 10.3119 1.02965 10.7091 1.30227 10.9746L5.92548 15.4776L4.83439 21.8392C4.77004 22.2144 4.92429 22.5936 5.23227 22.8173C5.54024 23.0411 5.94854 23.0705 6.28545 22.8934L12 19.8881L17.7145 22.8934C18.0515 23.0705 18.4598 23.0411 18.7677 22.8173C19.0757 22.5936 19.23 22.2144 19.1656 21.8392L18.0745 15.4776L22.6977 10.9746C22.9704 10.7091 23.0686 10.3119 22.9512 9.94985C22.8339 9.58784 22.5212 9.32384 22.1446 9.2688L15.7543 8.33475L12.8967 2.54566Z"
                fill={index <= rating ? "#E7B66B" : "white"}
                stroke={index <= rating ? "#E7B66B" : "#EBEBEB"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    const handleSubmit = async (e: any) => {
        // setShowPoppup(true);
        e.preventDefault();
        if (chooseRating) {
            if (tokenMainSite) {
                console.log("rating", rating);
                console.log("reviewAndRating", reviewAndRating);
                try {
                    const raw = JSON.stringify({
                        "number_of_stars": rating,
                        "review": reviewAndRating,
                        "institute_branch_id": institute_branch_id
                    });

                    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institute-reviews`, {
                        method: 'POST',
                        headers: {
                            "Accept-Language": language,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tokenMainSite}`,
                        },
                        body: raw,
                    })
                    if (!res.ok) {
                        const result = await res.json();
                        throw new Error(result.message);
                    }
                    const result = await res.json();
                    console.log("Review Slice", result);
                    return result;

                } catch (error: any) {
                    console.log(error.message);
                    toast.error(error.message);
                }
            } else {
                toast.error("Must Be Login ..!")
            }

        } else {
            toast.error("Must Choose Rating ..!")
        }


    }

    function formatDate(dateString: string) {
        // تحويل النص إلى كائن Date
        const date = new Date(dateString);

        // إعدادات اللغة العربية والتنسيق
        const options: any = { day: 'numeric', month: 'long', year: 'numeric' };

        // تنسيق التاريخ
        return date.toLocaleDateString(`${language}-EG`, options);
    }

    useEffect(() => {
        // dispatch(getReviewINS({ limt: 20, language, institute_branch_id: institute_branch_id }))
        dispatch(getReviewINS({ limt: 20, language, institute_branch_id: institute_branch_id }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])



    return (
        <div className="flex flex-col self-stretch">
            {reviews.loading ? <Loader /> : <>

                <div className="w-full text-2xl font-semibold leading-9 text-start text-gray-900 max-md:max-w-full capitalize">
                    {t("head")}
                </div>
                <div className="flex gap-5 justify-between mt-5 w-full max-md:flex-wrap max-md:max-w-full">
                    <div className="relative">
                        {/* <div className="inline-flex items-center overflow-hidden rounded-md border border-gray bg-white">
                        <span
                            onClick={toggleDropdown}
                            className=" px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
                        >
                            فرز حسب أحدث مراجعة
                        </span>

                        <button
                            onClick={toggleDropdown}
                            className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                        >
                            <span className="sr-only">Menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                        {isOpen && (
                            <div
                                className="absolute end-0 z-10 mt-2 w-20 rounded-md border border-gray bg-white shadow-lg transition-opacity duration-300 ease-in-out"
                                role="menu"
                            >
                                <div className="p-2">
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                        role="menuitem"
                                    >
                                        10
                                    </a>

                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                        role="menuitem"
                                    >
                                        20
                                    </a>

                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                        role="menuitem"
                                    >
                                        30
                                    </a>

                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                        role="menuitem"
                                    >
                                        40
                                    </a>
                                </div>
                            </div>
                        )} */}
                    </div>
                    <button className="justify-center px-10 py-2.5 text-sm font-medium text-center text-white bg-black rounded-[80px] max-md:px-5" onClick={handleClick}>
                        {/* <button className="justify-center px-10 py-2.5 text-sm font-medium text-center text-white bg-black rounded-[80px] max-md:px-5" onClick={handleClick}> */}
                        {t("writeComment")}
                    </button>
                </div>
                <div className="flex flex-col justify-center items-start px-5 py-2.5 mt-5 w-full bg-white rounded-lg max-md:px-5 max-md:max-w-full">
                    <div className="max-w-full w-[943px]">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow items-start font-medium text-start max-md:mt-10">
                                    <div className="text-sm text-gray-900"> {t("reviews")}  </div>
                                    <div className="my-4 text-4xl font-bold leading-5 text-center text-black">
                                        {reviews?.reviews?.total.toString()}
                                    </div>
                                    <div className="flex gap-1">
                                        {Array(reviews?.reviews?.total).fill(null).map((_, index) => (
                                            <Image
                                                key={index}
                                                src="/icons/star-gold.svg"
                                                width={18}
                                                height={18}
                                                alt="rating"
                                            />
                                        ))}
                                    </div>

                                    {/* <div className="mt-5 text-xs text-zinc-500">(578 comment)</div> */}
                                </div>
                            </div>
                            <div className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
                                <div className="flex gap-3 mt-8 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                                    <div className="flex flex-col justify-center text-xs font-medium leading-5 text-center text-gray-900 whitespace-nowrap">
                                        {/* <div>5 Star</div>
                                        <div className="mt-2">4 Star</div>
                                        <div className="mt-2">3 Star</div>
                                        <div className="mt-2">2 Star</div>
                                        <div className="mt-2">1 Star</div> */}
                                        {reviews?.reviews?.count?.map((rat: any, index: number) => (<div key={index} className={`${index == 0 ? "" : "mt-1"}`}>{rat.number_of_stars} {t("star")}</div>))}
                                    </div>

                                    <div className="flex flex-col items-start pl-20 mt-1 max-md:max-w-full">
                                        <div className="flex flex-col justify-center  max-w-full rounded-lg bg-slate-100 w-[351px]">
                                            <span id="ProgressLabel" className="sr-only">
                                                Loading
                                            </span>
                                            <span className="block rounded-full bg-gray-200">
                                                <span
                                                    className="block h-2 rounded-full bg-orange-300"
                                                    style={{ width: `${(reviews?.reviews?.count?.find((element: any) => element.number_of_stars === 1)._count) / (reviews?.reviews?.total) * 100}%` }}
                                                ></span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center mt-4 max-w-full rounded-lg bg-slate-100 w-[351px]">
                                            <span id="ProgressLabel" className="sr-only">
                                                Loading
                                            </span>
                                            <span className="block rounded-full bg-gray-200">
                                                <span
                                                    className="block h-2 rounded-full bg-orange-300"
                                                    style={{ width: `${(reviews?.reviews?.count?.find((element: any) => element.number_of_stars === 2)._count) / (reviews?.reviews?.total) * 100}%` }}
                                                ></span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center mt-4 max-w-full rounded-lg bg-slate-100 w-[351px]">
                                            <span id="ProgressLabel" className="sr-only">
                                                Loading
                                            </span>
                                            <span className="block rounded-full bg-gray-200">
                                                <span
                                                    className="block h-2 rounded-full bg-orange-300"
                                                    style={{ width: `${(reviews?.reviews?.count?.find((element: any) => element.number_of_stars === 3)._count) / (reviews?.reviews?.total) * 100}%` }}
                                                ></span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center mt-4 max-w-full rounded-lg bg-slate-100 w-[351px]">
                                            <span id="ProgressLabel" className="sr-only">
                                                Loading
                                            </span>
                                            <span className="block rounded-full bg-gray-200">
                                                <span
                                                    className="block h-2 rounded-full bg-orange-300"
                                                    style={{ width: `${(reviews?.reviews?.count?.find((element: any) => element.number_of_stars === 4)._count) / (reviews?.reviews?.total) * 100}%` }}
                                                ></span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center mt-4 max-w-full  rounded-lg bg-slate-100 w-[351px]">
                                            <span id="ProgressLabel" className="sr-only">
                                                Loading
                                            </span>
                                            <span className="block rounded-full bg-gray-200">
                                                <span
                                                    className="block h-2 rounded-full bg-orange-300"
                                                    style={{ width: `${(reviews?.reviews?.count?.find((element: any) => element.number_of_stars === 5)._count) / (reviews?.reviews?.total) * 100}%` }}
                                                ></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center text-xs font-medium leading-5 text-center text-gray-900 whitespace-nowrap">
                                        {reviews?.reviews?.count?.map((rat: any, index: number) => (<div key={index} className={`${index == 0 ? "" : "mt-1"}`}>{rat._count}</div>))}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-8 mt-4 w-full bg-white rounded-lg max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-col p-5 mb-10 bg-white rounded-2xl border border-gray border-solid shadow-2xl max-md:max-w-full">

                        <div className="flex gap-4 px-2 text-sm text-start text-zinc-500 max-md:flex-wrap max-md:px-5">
                            <div className="flex gap-1.5 justify-between items-center py-px whitespace-nowrap">
                                <div>{t("addRating")}</div>
                                {[1, 2, 3, 4, 5].map(index => (
                                    <Star key={index} index={index} />
                                ))}
                                <div>{rating}/5</div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <textarea required ref={textareaRef} className="mt-2 w-full rounded-lg border border-gray align-top shadow-sm sm:text-sm p-2 focus:outline-none mb-2" rows={4} placeholder={t('placeHolder')} defaultValue={""} onChange={(e: any) => setReviewAndRating(e.target.value)}></textarea>
                                {!rating && <span className='text-red-600 text-sm'>{t("errorMessage")}</span>}


                            </div>
                            <div className="flex gap-2.5 self-start mt-5">
                                <button className="flex items-center gap-2.5 justify-center p-2.5 text-base text-start text-white bg-primary rounded-xl max-md:px-5">
                                    <Image src="/icons/Chat Line-solid.svg" width={18} height={18} alt="rating" />
                                    <div >{t("addRating")}</div>
                                </button>
                                <button disabled className="justify-center p-2.5 text-sm font-medium text-center whitespace-nowrap rounded-xl border border-solid border-zinc-100 hover:bg-secondColor text-zinc-500">
                                    {t("cancel")}
                                </button>
                            </div>
                        </form>
                    </div>
                    {reviews?.reviews?.reviews.length > 0 && reviews?.reviews?.reviews?.map((review: any, index: number) => {
                        return (
                            <div key={index}>
                                <div className="flex gap-3 justify-between w-full max-md:flex-wrap max-md:max-w-full">

                                    <div className="flex gap-1">
                                        {/* <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" /> */}
                                        {Array(review.number_of_stars).fill(null).map((_, index) => (
                                            <Image
                                                key={index}
                                                src="/icons/star-gold.svg"
                                                width={18}
                                                height={18}
                                                alt="rating"
                                            />))}
                                    </div>
                                    <div className="text-xs leading-5 text-right text-zinc-500">
                                        {formatDate(review.created_at)}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start self-start mt-3 max-w-full text-sm w-[634px]">
                                    <div className="flex gap-3">

                                        <div className="flex flex-col justify-center font-semibold text-right text-indigo-500 leading-[143%]">
                                            <div className="justify-center items-center px-2.5 py-2.5 bg-indigo-500 rounded-full text-white">
                                                {review.user?.first_name.slice(0, 1).toUpperCase()}
                                                {review.user?.last_name.slice(0, 1).toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="my-auto text-center text-gray-900 leading-[129%] capitalize">
                                            {review.user?.first_name}{""}{review.user?.last_name}
                                        </div>
                                    </div>
                                    <div className="mt-3 text-center leading-[129%] text-zinc-500 capitalize">
                                        college student
                                    </div>
                                    <div className="self-stretch mt-3 leading-5 text-start text-gray-900 max-md:max-w-full capitalize">
                                        {/* As A Frontend Developer I think this life is one and zero like language of compiler */}
                                        {review.review}
                                    </div>
                                </div>
                                <div className="shrink-0 my-10 h-0.5 bg-stone-100 max-md:max-w-full" />
                            </div>
                        )
                    })}

                    {/* <div className="flex gap-3 justify-between w-full max-md:flex-wrap max-md:max-w-full">

                    <div className="flex gap-1">
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" /></div>
                    <div className="text-xs leading-5 text-right text-zinc-500">
                        20 يناير 2024
                    </div>
                </div>
                <div className="flex flex-col items-start self-start mt-3 max-w-full text-sm w-[634px]">
                    <div className="flex gap-3">

                        <div className="flex flex-col justify-center font-semibold text-right text-indigo-500 leading-[143%]">
                            <div className="justify-center items-center px-2.5 py-2.5 bg-indigo-500 rounded-full text-white">
                                {" "}
                                AK{" "}
                            </div>
                        </div>
                        <div className="my-auto text-center text-gray-900 leading-[129%]">
                            محمد خالد{" "}
                        </div>
                    </div>
                    <div className="mt-3 text-center leading-[129%] text-zinc-500">
                        طالب جامعي
                    </div>
                    <div className="self-stretch mt-3 leading-5 text-right text-gray-900 max-md:max-w-full">
                        لقد كان العمل في Sam.AI رحلة مذهلة حتى الآن. ,إن التكنولوجيا التي
                        نبنيها هي تقنية متطورة حقًا، وكوننا جزءًا من فريق يُحدث ثورة في
                        كيفية تحقيق الأشخاص لأهدافهم هو أمر مُرضٍ للغاية.
                    </div>
                </div>
                <div className="shrink-0 my-10 h-0.5 bg-stone-100 max-md:max-w-full" />
                <div className="flex gap-3 justify-between w-full max-md:flex-wrap max-md:max-w-full">

                    <div className="flex gap-1">
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" />
                        <Image src="/icons/star-gold.svg" width={18} height={18} alt="rating" /></div>
                    <div className="text-xs leading-5 text-right text-zinc-500">
                        20 يناير 2024
                    </div>
                </div>
                <div className="flex flex-col items-start self-start mt-3 max-w-full text-sm w-[634px]">
                    <div className="flex gap-3">

                        <div className="flex flex-col justify-center font-semibold text-right text-indigo-500 leading-[143%]">
                            <div className="justify-center items-center px-2.5 py-2.5 bg-indigo-500 rounded-full text-white">
                                {" "}
                                AK{" "}
                            </div>
                        </div>
                        <div className="my-auto text-center text-gray-900 leading-[129%]">
                            محمد خالد{" "}
                        </div>
                    </div>
                    <div className="mt-3 text-center leading-[129%] text-zinc-500">
                        طالب جامعي
                    </div>
                    <div className="self-stretch mt-3 leading-5 text-right text-gray-900 max-md:max-w-full">
                        لقد كان العمل في Sam.AI رحلة مذهلة حتى الآن. ,إن التكنولوجيا التي
                        نبنيها هي تقنية متطورة حقًا، وكوننا جزءًا من فريق يُحدث ثورة في
                        كيفية تحقيق الأشخاص لأهدافهم هو أمر مُرضٍ للغاية.
                    </div>
                </div> */}

                </div>
            </>}
            {/* <div className="flex justify-between gap-5 mt-8 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 px-5">
                    <div className="flex justify-center items-center p-3 bg-white rounded-lg border border-solid border-zinc-100">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b68c8548896dd0b3baa1a2f8c010465cf9ddd2084d00538b1f1ec6e8b2d0d9e?apiKey=e969867fc0a145258ec2d2dcaf1c3295&"
                            className="w-4 aspect-square"
                        />
                    </div>
                    <div className="justify-center p-3 text-xs font-semibold text-black whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-100">
                        10
                    </div>
                    <div className="justify-center p-3 text-sm font-semibold text-black whitespace-nowrap bg-white rounded-lg">
                        ...
                    </div>
                    <div className="justify-center p-3 text-xs font-semibold text-black whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-100">
                        3
                    </div>
                    <div className="justify-center items-start p-3 text-xs font-semibold text-black whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-100">
                        2
                    </div>
                    <div className="justify-center p-3 text-xs font-semibold text-white whitespace-nowrap bg-blue-900 rounded-lg">
                        1
                    </div>
                    <div className="flex justify-center items-center p-3 bg-white rounded-lg border border-solid border-zinc-100">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0c5227d849dac23f114f93ef4a7599e6016dfcce9705b3b766bf755e097aa2c?apiKey=e969867fc0a145258ec2d2dcaf1c3295&"
                            className="w-4 aspect-square"
                        />
                    </div>
                </div>
                <div className="flex gap-2.5 px-5 text-center max-md:flex-wrap max-md:px-5">
                    <div className="flex gap-4 justify-center px-4 py-2 text-xs font-semibold whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-100 text-stone-950">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f15b8d72fc8c681f9152719cd8a6bcc37703f94db478d101eece462e5fd028ac?apiKey=e969867fc0a145258ec2d2dcaf1c3295&"
                            className="shrink-0 my-auto w-4 aspect-square"
                        />
                        <div>10</div>
                    </div>
                    <div className="my-auto text-sm font-medium text-zinc-500">
                        عدد العناصر المعروضة
                    </div>
                </div>
            </div> */}

            {/* <Poppup /> */}
        </div>
    );
}

export default RatingINS
