import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import BioHead from "./BioHead";

function FQA() {
  const t = useTranslations("commonQuest");

  return (
    <div className="flex flex-col px-16 pt-5 bg-gray-50 max-md:px-5 mb-10">
      <BioHead button={t("Labe")} headLine={t("head")} summary={t("paragraph")} bg="bg-white" />
      <div className="space-y-4 gap-5  mt-14  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 max-md:mt-10">
        <details
          className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus1")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6  text-neutral-400 text-start max-md:max-w-full ">
            {t("ans1")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus2")}{" "}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans2")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus3")}{" "}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans3")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus4")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans4")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus5")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans5")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus6")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans6")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus7")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans7")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus8")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans8")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  mt-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus9")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans9p1")}
            {t("ans9p2")}
          </p>
        </details>
      </div>
      <div className="space-y-4 gap-5  my-3  text-start rounded-2xl border border-gray border-solid max-md:flex-wrap max-md:px-5 md:mt-10">
        <details className="group rounded-lg bg-gray-50 py-4 md:p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 ">
            <div className="md:text-lg lg:text-2xl font-medium text-gray-900 max-md:max-w-full">
              {t("qus10")}
            </div>

            <span className="relative size-5 shrink-0">
              <Image
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
              />
              <Image src="/icons/mins.svg" width={20} height={20} alt="mins" />
            </span>
          </summary>
          <div className="shrink-0 mt-6 h-px bg-gray-200 border border-gray border-solid max-md:max-w-full" />
          <p className=" leading-snug lg:leading-relaxed text-gray-700 mt-2 lg:mt-6 text-neutral-400 text-start max-md:max-w-full">
            {t("ans10")}
          </p>
        </details>
      </div>
    </div>
  );
}

export default FQA;
