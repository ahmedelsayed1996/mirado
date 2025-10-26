import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import useCurrentLang from '../_hooks/useCurrentLang';

function NewAbout() {

    const n = useTranslations("newHome");
    const language = useCurrentLang();

    return (
        <div className="overflow-hidden py-10 px-5 md:px-12 lg:px-20 xl:py-10 xl:px-28">
            <div className="flex gap-5 flex-col lg:flex-row">
                <div className="flex flex-col w-full lg:w-[69%] relative">
                    {/* <Image src="/images/home.webp" alt="About Eduxa" width={1400} height={600} /> */}
                    <Image src="https://api.eduxa.com/upload/home.webp" alt="About Eduxa" width={1400} height={600} />
                </div>
                <div className="flex flex-col w-full lg:w-[31%]">
                    <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10">
                        <div className="flex flex-col w-full">
                            <div className="overflow-hidden px-3.5 w-full text-xl border-amber-500 border-s-[5px] text-zinc-900 max-md:pr-5">
                                {n("AboutEduxa")}
                            </div>
                            <div className="flex flex-col mt-2 w-full">
                                <div className="text-3xl font-bold text-zinc-900">
                                    {n("AboutEduxah1")}
                                </div>
                                <div className="flex flex-col mt-4 w-full text-base font-medium tracking-normal leading-7 text-zinc-500">
                                    <div>{n("AboutEduxap1")}</div>
                                    <div className="mt-6">{n("AboutEduxap2")}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex overflow-hidden gap-1 justify-center items-center px-4 mt-9 max-w-full text-base font-medium tracking-wide text-white border border-solid bg-primary border-primary py-2 rounded-[64px] w-[230px]">
                            <Link
                                href={`/${language}/about`}
                                className="self-stretch my-auto"
                            >
                                {n("UncoverOurJourney")}
                            </Link>
                            {language === "en" ?
                                <svg
                                    width="22"
                                    height="21"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.9301 5.92993L21.0001 11.9999L14.9301 18.0699"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAbout
