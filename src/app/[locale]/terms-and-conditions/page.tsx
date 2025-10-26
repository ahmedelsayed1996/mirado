import React from 'react';
import Link from "next/link";
import { useTranslations } from 'next-intl';


function TermsConditions() {
    const t = useTranslations("termsConditionsInst");
    return (
        <div className="flex flex-col bg-secondColor">
            <div className="flex flex-col items-start self-center ps-4 mt-5 w-full text-start text-primary max-w-[1300px] max-md:pl-5 max-md:max-w-full ">
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center gap-1 text-sm text-gray-600">
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
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
                            <Link href="/" className="block transition hover:text-gray"> {t("head")} </Link>
                        </li>

                        <li className="rtl:rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </li>

                        <li>
                            <Link href="#" className="block transition hover:text-gray">  {t("head2")}</Link>
                        </li>
                    </ol>
                </nav>
                <div className="mt-5 text-4xl font-bold"> {t("head2")}</div>
            </div>
            <div className="justify-center self-center p-8 mt-6 mb-20 w-full text-lg font-medium tracking-normal leading-7 text-start bg-white rounded-3xl shadow-2xl max-w-[1300px] text-zinc-500 max-md:px-5 max-md:max-w-full">
                <span className="text-lg text-black">
                    {t("paragraph1")}
                </span>
                <br />
                <br />
                <span className="text-lg text-black">
                    {t("paragraph2")}
                </span>
                <br />
                <br />
                <span className="text-lg text-black">
                    {t("paragraph3")}
                </span>
                <br />
                <br />
                <span className="text-lg text-black">
                    {t("paragraph4")}{" "}
                    <a href="mailto:support@eduxa.com" className="text-primary">support@eduxa.com.</a>
                </span><br /><br />
                <span className="text-lg text-black">
                    {t("paragraph5")}
                </span>
                <span className="text-lg text-black"></span>
                <br />
                <br />
                <span className="text-4xl text-black font-medium">
                    {t("paragraph6")}
                </span>
                <br />
                <br />
                <span className="text-base text-black">
                    {t("paragraph7")}

                </span>
                <br />
                <br />
                <span className="text-base text-black">
                    {t("paragraph8")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph9")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph10")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph11")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph12")}
                </span>
                <br />
                <br />
                <span className="text-lg text-black">
                    {t("paragraph13")}
                </span>
                <br />
                <br />
                <span className="text-4xl text-black font-medium">
                    {t("paragraph14")}
                </span>
                <br />
                <br />
                <span className="text-base text-black">
                    {t("paragraph15")}

                </span>
                <br />
                <br />
                <span className="text-base text-black">
                    {t("paragraph16")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph17")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph18")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph19")}
                </span>
                <br />
                <span className="text-base text-black">
                    {t("paragraph20")}
                </span>
                <br />
                <br />
                <span className="text-lg text-black">
                    {t("paragraph21")}
                </span>
                <br />
                <br />
                <br />
                <span className="text-4xl text-black font-medium">
                    {t("paragraph22")}
                </span>
                <br />
                <br />
                <span className="text-base text-black">
                    {" "}{t("paragraph23")}{" "}
                    <a href="mailto:support@eduxa.com" className="text-primary">support@eduxa.com.</a>
                    {" "}{t("paragraph24")}{" "}
                    <Link href="/" className="text-primary">www.eduxa.com</Link>

                </span>

            </div>

        </div>
    )
}

export default TermsConditions
