import React from 'react';
import Link from "next/link";
import { useTranslations } from "next-intl";



function PrivacyPolicy() {
  const t = useTranslations("privacyPolicy");
  return (
    <div className="flex flex-col bg-secondColor">
      <div className="flex flex-col items-start self-center pl-20 mt-5 w-full text-start text-primary max-w-[1300px] max-md:pl-5 max-md:max-w-full ">
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
              <Link href="/" className="block transition hover:text-gray"> {t("breadCrumb")} </Link>
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
              <Link href="#" className="block transition hover:text-gray"> {t("head")} </Link>
            </li>
          </ol>
        </nav>
        <div className="mt-5 text-4xl font-bold">{t("head")}</div>
      </div>
      <div className="justify-center self-center p-8 mt-6 mb-20 w-full text-lg font-medium tracking-normal leading-7 text-start bg-white rounded-3xl shadow-2xl max-w-[1300px] text-zinc-500 max-md:px-5 max-md:max-w-full">
        <span className="text-2xl text-black">{t("section1")} </span>
        <br />
        <br />
        <span className="text-zinc-500">
        {t("section2")}
        </span>
        <br />


        <br />
        <div className="text-2xl text-black py-2">
        {t("section3")}</div>

        <span className="text-zinc-500">
        {t("section4")}        </span>
        <br />
        <ul className='list-disc ps-8'>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section5")} </strong>
            {t("section6")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section7")} </strong>
            {t("section8")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section9")} </strong>
            {t("section10")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section11")} </strong>
            {t("section12")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section13")} </strong>
            {t("section14")}</span>
          </li>
        </ul>
        <br /><br />
        <div className="text-2xl text-black py-2">
        {t("section15")}</div>

        <span className="text-zinc-500">
        {t("section16")}
        </span>
        <br />
        <ul className='list-disc ps-8'>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section17")} </strong>
            {t("section18")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section19")} </strong>
            {t("section20")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section21")} </strong>
            {t("section22")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section23")} </strong>
            {t("section24")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section25")} </strong>
            {t("section26")}</span>
          </li>
        </ul>
        <br /><br />
        <div className="text-2xl text-black py-2">
        {t("section27")}</div>

        <span className="text-zinc-500">
        {t("section28")}
        </span>
        <br />
        <ul className='list-disc ps-8'>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section29")} </strong>
            {t("section30")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section31")} </strong>
            {t("section32")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section33")} </strong>
            {t("section34")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section35")} </strong>
            {t("section36")}</span>
          </li>
        </ul>
        <br /><br />

        <div className="text-2xl text-black py-2">
        {t("section37")}</div>

        <span className="text-zinc-500">
        {t("section38")}
        </span>
        <br />
        <div className="text-2xl text-black py-2">
        {t("section39")}</div>

        <span className="text-zinc-500">
        {t("section40")}
        </span>
        <br />
        <ul className='list-disc ps-8'>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section41")} </strong>
            {t("section42")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section43")} </strong>
            {t("section44")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section45")} </strong>
            {t("section46")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section47")} </strong>
            {t("section48")}</span>
          </li>
          <li className='py-2'><span className=" text-base text-zinc-500">
            <strong>{t("section49")} </strong>
            {t("section50")}</span>
          </li>
        </ul>
        <br />
        <div className="text-2xl text-black py-2">
          {t("section51")}
        </div>

        <span className="text-zinc-500">
          {t("section52")}         </span>
        <br />
        <span className="text-zinc-500">
          {t("section53")}
        </span>
      </div>

    </div>
  )
}

export default PrivacyPolicy
