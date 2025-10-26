import { useTranslations } from 'next-intl';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import useCurrentLang from '../_hooks/useCurrentLang';

function NewContact() {
    const c = useTranslations("CommonQuestion");
    const language = useCurrentLang();

    return (
        < section className="flex py-16 lg:px-16 xl:px-28" >
            <div className="flex overflow-hidden relative flex-col justify-center  w-full rounded-3xl md:min-h-[332px] max-md:p-5 md:p-10 max-md:max-w-full">
                <Image src="/images/contactBanner.webp" width={800} height={500} alt="flag"
                    className="object-cover absolute inset-0 size-full" />
                <div className="flex xl:gap-3 relative justify-between items-center flex-col lg:flex-row w-full">
                    <div className="flex flex-col my-auto font-bold ">
                        <div className="text-xl text-white ">
                            {c("ConnectWithUs")}
                        </div>
                        <div className="mt-6 text-xl md:text-3xl text-white lg:leading-[51px] ">
                            {c("Paragraph")}
                        </div>
                    </div>
                    <Link
                        href={`/${language}/contact`}
                        className="flex gap-1 w-1/2 xl:w-[626px] xl:h-[68px] justify-center items-center text-base font-medium tracking-wide text-white  bg-primary py-2 md:py-4 mt-5 lg:mt-0 rounded-[64px]"
                    >
                        <div className="self-stretch my-auto"> {c("UnderButton")}</div>
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
                    </Link>
                </div>
            </div>
        </section >
    )
}

export default NewContact
