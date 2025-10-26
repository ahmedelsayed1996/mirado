"use client";
import { useTranslations } from "next-intl";
import useCurrentLang from "../_hooks/useCurrentLang";
import Link from "next/link";

function DistinguishesEduxa() {

    const language = useCurrentLang();
    const k = useTranslations("KnowwhatDistinguishesEduxa");


    return (
        <div className="relative ">
            <div className="flex justify-center items-center  py-10 max-md:py-10 w-full  max-sm:py-10 max-sm:h-auto">
                <div
                    className="flex gap-2 items-start flex-col h-[470px] px-5 lg:px-20 xl:px-28 max-sm:px-[25px] py-12 
             max-sm:py-[24px] max-sm:flex-col w-full max-sm:text-center"
                    style={{
                        backgroundImage: `url(/images/image.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="ps-3.5 text-xl text-white border-solid border-s-[5px] border-s-amber-500">
                        {k("Qus")}
                    </div>
                    <div className="flex flex-col justify-between items-start  w-full">
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="text-3xl font-bold text-white">
                                {k("Head")}
                            </div>
                            <div className="text-base font-medium tracking-normal leading-7 text-white max-w-[388px]">
                                {k("Paragraph")}
                            </div>
                        </div>
                        <Link
                            href={`/${language}/about`}
                            className="flex gap-1 justify-center items-center px-4 py-0 mt-6 h-12 text-base font-medium tracking-wide text-white cursor-pointer bg-primary rounded-[64px] max-sm:w-full"
                        >
                            <span>{k("Button")}</span>
                            <div>
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
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="grid gap-2 lg:gap-7 px-5 lg:px-16 xl:px-28 py-0 mt-0 grid-cols-[repeat(3,1fr)] max-md:grid-cols-[repeat(2,1fr)]  max-sm:grid-cols-[1fr] absolute top-96 ">
                <div className="relative flex bg-white rounded-2xl border border-solid border-zinc-100 max-sm:w-full overflow-hidden">
                    <div className={`absolute flex ${language == "en" ? "left-[17px]" : "left-[-70px]"}  h-[163px] top-[-26px] w-[163px]`}>
                        <div className="h-40 -rotate-45 bg-slate-100 rounded-[35px] w-[70px]" />
                        <div className={`flex absolute justify-center items-center p-3.5 bg-[#FE6C3F] shadow-lg h-[58px] ${language == "en" ? "left-[39px]" : "left-[132px]"} rounded-[29px] top-[84px] w-[58px]`}>
                            <div>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.6667 29.3333H21.3333C26.6933 29.3333 27.6533 27.1867 27.9333 24.5733L28.9333 13.9067C29.2933 10.6533 28.36 8 22.6667 8H9.33332C3.63999 8 2.70665 10.6533 3.06665 13.9067L4.06665 24.5733C4.34665 27.1867 5.30665 29.3333 10.6667 29.3333Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.6667 7.99984V6.93317C10.6667 4.57317 10.6667 2.6665 14.9333 2.6665H17.0667C21.3333 2.6665 21.3333 4.57317 21.3333 6.93317V7.99984"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.6667 17.3333V18.6667C18.6667 18.68 18.6667 18.68 18.6667 18.6933C18.6667 20.1467 18.6533 21.3333 16 21.3333C13.36 21.3333 13.3333 20.16 13.3333 18.7067V17.3333C13.3333 16 13.3333 16 14.6667 16H17.3333C18.6667 16 18.6667 16 18.6667 17.3333Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M28.8667 14.6665C25.7867 16.9065 22.2667 18.2398 18.6667 18.6932"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3.49333 15.0269C6.49333 17.0802 9.88 18.3202 13.3333 18.7069"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-5 pt-40">
                        <div className="text-xl font-bold text-zinc-900">{k("H3")}</div>
                        <div className="text-base font-medium tracking-wide leading-6 text-zinc-800">
                            {k("P3")}
                        </div>
                    </div>
                </div>
                <div className="relative flex bg-white rounded-2xl border border-solid border-zinc-100 max-sm:w-full overflow-hidden">
                    <div className={`absolute flex ${language == "en" ? "left-[17px]" : "left-[-70px]"}  h-[163px] top-[-26px] w-[163px]`}>
                        <div className="h-40 -rotate-45 bg-slate-100 rounded-[35px] w-[70px]" />
                        <div className={`flex absolute justify-center items-center p-3.5 bg-[#897CB5] shadow-lg h-[58px] ${language == "en" ? "left-[39px]" : "left-[132px]"} rounded-[29px] top-[84px] w-[58px]`}>
                            <div>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M29.3334 22.3204V6.22708C29.3334 4.62708 28.0267 3.44041 26.44 3.57375H26.36C23.56 3.81375 19.3067 5.24041 16.9334 6.73375L16.7067 6.88041C16.32 7.12041 15.68 7.12041 15.2934 6.88041L14.96 6.68041C12.5867 5.20041 8.34669 3.78708 5.54669 3.56041C3.96002 3.42708 2.66669 4.62708 2.66669 6.21375V22.3204C2.66669 23.6004 3.70669 24.8004 4.98669 24.9604L5.37335 25.0137C8.26669 25.4004 12.7334 26.8671 15.2934 28.2671L15.3467 28.2937C15.7067 28.4937 16.28 28.4937 16.6267 28.2937C19.1867 26.8804 23.6667 25.4004 26.5734 25.0137L27.0134 24.9604C28.2934 24.8004 29.3334 23.6004 29.3334 22.3204Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16 7.32031V27.3203"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.3333 11.3203H7.33331"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.3333 15.3203H7.33331"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-5 pt-40">
                        <div className="text-xl font-bold text-zinc-900">{k("H2")}</div>
                        <div className="text-base font-medium tracking-wide leading-6 text-zinc-800">
                            {k("P2")}
                        </div>
                    </div>
                </div>
                <div className="relative flex bg-white rounded-2xl border border-solid border-zinc-100 max-sm:w-full overflow-hidden">
                    <div className={`absolute flex ${language == "en" ? "left-[17px]" : "left-[-70px]"}  h-[163px] top-[-26px] w-[163px]`}>
                        <div className="h-40 -rotate-45 bg-slate-100 rounded-[35px] w-[70px]" />
                        <div className={`flex absolute justify-center items-center p-3.5 bg-[#00CC99] shadow-lg h-[58px] ${language == "en" ? "left-[39px]" : "left-[132px]"} rounded-[29px] top-[84px] w-[58px]`}>
                            <div>
                                <svg
                                    width="32"
                                    height="33"
                                    viewBox="0 0 32 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.4019 3.56381L5.37531 8.80381C2.80198 10.4838 2.80198 14.2438 5.37531 15.9238L13.4019 21.1638C14.8419 22.1104 17.2153 22.1104 18.6553 21.1638L26.6419 15.9238C29.2019 14.2438 29.2019 10.4971 26.6419 8.81714L18.6553 3.57714C17.2153 2.61714 14.8419 2.61714 13.4019 3.56381Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.50552 17.6299L7.49219 23.8833C7.49219 25.5766 8.79886 27.3899 10.3988 27.9233L14.6521 29.3366C15.3855 29.5766 16.5988 29.5766 17.3455 29.3366L21.5988 27.9233C23.1988 27.3899 24.5055 25.5766 24.5055 23.8833V17.6966"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M28.5312 20.1904V12.1904"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-5 pt-40">
                        <div className="text-xl font-bold text-zinc-900">{k("H1")}</div>
                        <div className="text-base font-medium tracking-wide leading-6 text-zinc-800">
                            {k("P1")}
                        </div>
                    </div>
                </div>
                <div className="relative flex bg-white rounded-2xl border border-solid border-zinc-100 max-sm:w-full overflow-hidden">
                    <div className={`absolute flex ${language == "en" ? "left-[17px]" : "left-[-70px]"}  h-[163px] top-[-26px] w-[163px]`}>
                        <div className="h-40 -rotate-45 bg-slate-100 rounded-[35px] w-[70px]" />
                        <div className={`flex absolute justify-center items-center p-3.5 bg-[#0091FF] shadow-lg h-[58px] ${language == "en" ? "left-[39px]" : "left-[132px]"} rounded-[29px] top-[84px] w-[58px]`}>
                            <div>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.6667 2.6665C21.3333 2.6665 22.6667 4.01317 22.6667 6.7065V16.1065C22.6667 18.7598 20.7867 19.7865 18.48 18.3998L16.72 17.3332C16.32 17.0932 15.68 17.0932 15.28 17.3332L13.52 18.3998C11.2133 19.7865 9.33333 18.7598 9.33333 16.1065V6.7065C9.33333 4.01317 10.6667 2.6665 13.3333 2.6665H18.6667Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.09334 6.65328C4.54667 7.41328 2.66667 10.2133 2.66667 15.8666V19.9066C2.66667 26.6399 5.33334 29.3333 12 29.3333H20C26.6667 29.3333 29.3333 26.6399 29.3333 19.9066V15.8666C29.3333 10.1199 27.3867 7.30661 22.6667 6.61328"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-5 pt-40">
                        <div className="text-xl font-bold text-zinc-900">{k("H6")}</div>
                        <div className="text-base font-medium tracking-wide leading-6 text-zinc-800">
                            {k("P6")}
                        </div>
                    </div>
                </div>
                <div className="relative flex bg-white rounded-2xl border border-solid border-zinc-100 max-sm:w-full overflow-hidden">
                    <div className={`absolute flex ${language == "en" ? "left-[17px]" : "left-[-70px]"}  h-[163px] top-[-26px] w-[163px]`}>
                        <div className="h-40 -rotate-45 bg-slate-100 rounded-[35px] w-[70px]" />
                        <div className={`flex absolute justify-center items-center p-3.5 bg-[#FFBD0F] shadow-lg h-[58px] ${language == "en" ? "left-[39px]" : "left-[132px]"} rounded-[29px] top-[84px] w-[58px]`}>
                            <div>
                                <svg
                                    width="32"
                                    height="33"
                                    viewBox="0 0 32 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.22656 10.1104L15.9999 16.9237L27.6932 10.1503"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16 29.0036V16.9102"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.2408 3.49743L6.12081 7.45747C4.50748 8.3508 3.1875 10.5908 3.1875 12.4308V19.9642C3.1875 21.8042 4.50748 24.0441 6.12081 24.9375L13.2408 28.8975C14.7608 29.7375 17.2541 29.7375 18.7741 28.8975L25.8942 24.9375C27.5075 24.0441 28.8275 21.8042 28.8275 19.9642V12.4308C28.8275 10.5908 27.5075 8.3508 25.8942 7.45747L18.7741 3.49743C17.2408 2.64409 14.7608 2.64409 13.2408 3.49743Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22.6689 17.8439V12.9639L10.0156 5.65723"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-5 pt-40">
                        <div className="text-xl font-bold text-zinc-900">{k("H5")}</div>
                        <div className="text-base font-medium tracking-wide leading-6 text-zinc-800">
                            {k("P5")}
                        </div>
                    </div>
                </div>
                <div className="relative flex bg-white rounded-2xl border border-solid border-zinc-100 max-sm:w-full overflow-hidden">
                    <div className={`absolute flex ${language == "en" ? "left-[17px]" : "left-[-70px]"}  h-[163px] top-[-26px] w-[163px]`}>
                        <div className="h-40 -rotate-45 bg-slate-100 rounded-[35px] w-[70px]" />
                        <div className={`flex absolute justify-center items-center p-3.5 bg-[#879EBA] shadow-lg h-[58px] ${language == "en" ? "left-[39px]" : "left-[132px]"} rounded-[29px] top-[84px] w-[58px]`}>
                            <div>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.6667 26.6665C21.2941 26.6665 26.6667 21.2939 26.6667 14.6665C26.6667 8.03909 21.2941 2.6665 14.6667 2.6665C8.03927 2.6665 2.66669 8.03909 2.66669 14.6665C2.66669 21.2939 8.03927 26.6665 14.6667 26.6665Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M25.2399 27.5863C25.9466 29.7196 27.5599 29.9329 28.7999 28.0663C29.9333 26.3596 29.1866 24.9596 27.1333 24.9596C25.6133 24.9463 24.7599 26.1329 25.2399 27.5863Z"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-5 pt-40">
                        <div className="text-xl font-bold text-zinc-900">{k("H4")}</div>
                        <div className="text-base font-medium tracking-wide leading-6 text-zinc-800">
                            {k("P4")}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" h-[113rem] md:h-[38rem] xl:h-[35rem]"></div>
        </div>
    )
}

export default DistinguishesEduxa
