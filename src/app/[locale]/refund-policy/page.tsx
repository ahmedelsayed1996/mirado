import { useTranslations } from 'next-intl';
import Link from 'next/link'
import React from 'react'

function RefundPolicy() {
    const t = useTranslations("RefundPolicy");
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
                            <Link href="#" className="block transition hover:text-gray">
                            {t("head1")}
                            </Link>
                        </li>
                    </ol>
                </nav>
                <div className="mt-5 text-4xl font-bold">{t("head1")}</div>
            </div>
            <div className="justify-center self-center p-8 mt-6 mb-20 w-full text-lg font-medium tracking-normal leading-7 text-start bg-white rounded-3xl shadow-2xl max-w-[1300px] text-zinc-500 max-md:px-5 max-md:max-w-full">
                <span className="text-2xl text-black">{t("head2")}</span>
                <br />
                <br />
                <ul className='list-disc ps-8'>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head3")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head4")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head5")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head6")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head7")}
                    </span>
                    </li>
                </ul>
                <br /><br />
                <span className="text-2xl text-black">{t("head8")}</span>
                <br />
                <br />
                <ul className='list-disc ps-8'>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head9")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head10")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head11")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head12")}
                    </span>
                    </li>
                    <li className='py-2'><span className=" text-base text-zinc-500">
                    {t("head13")}
                    </span>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default RefundPolicy
