import React from 'react';
import Image from "next/image";
import { useTranslations } from "next-intl";
import BioHead from './BioHead';


function OurPartners() {
  const t = useTranslations("ourPartners");

  return (
    <div className="flex flex-col items-center  pb-20 md:text-xl tracking-tight leading-7 bg-secondColor">
      {/* <div className="justify-center px-8 py-1.5 font-medium text-primary whitespace-nowrap border border-primary border-solid rounded-[80px] max-md:px-5">
          {t("label")}
        </div>
        <div className="mt-3 text-xl md:text-4xl font-semibold md:tracking-tighter text-center text-gray-900 max-md:max-w-full">
          {t("head")}
        </div>
        <div className="mt-6 px-1 leading-7 text-center text-zinc-500 ">
          {t("paragraph")}
        </div> */}
      <BioHead button={t("label")} headLine={t("head")} summary={t("paragraph")} bg="bg-secondColor" />
      <div className="flex gap-5 justify-center max-md:flex-wrap my-12">
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
      </div>
      <div className="flex gap-5 justify-around max-md:flex-wrap ">
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
        <div className="flex justify-center items-center px-8 py-5 bg-gray-50 rounded-xl border border-gray border-solid max-md:px-5">
          <Image
            src="/images/amazon-blue.svg"
            width={100}
            height={100}
            alt="team work"
          />
        </div>
      </div>
    </div>
  );
}

export default OurPartners
