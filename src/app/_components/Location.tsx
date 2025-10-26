import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

function Location({ fullAddress, spacialMark, urlMaps, name }: {
  fullAddress: string;
  spacialMark: string;
  urlMaps: string;
  name: string;

}) {
  const t = useTranslations("location");

  return (
    <div className="flex flex-col self-stretch">
      <div className="w-full text-lg md:text-2xl capitalize font-semibold leading-9 text-start text-gray-900 max-md:max-w-full">
       {name} {t("head")}
      </div>
      <div className="flex flex-col justify-center mt-5 w-full bg-white max-md:max-w-full">
        <div className="flex overflow-hidden relative flex-col py-1 pr-1.5 w-full min-h-[317px] max-md:max-w-full">
          {urlMaps ? <iframe
            title="location"
            src={urlMaps}
            width="600"
            height="450"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe> : <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d223.8017633314675!2d32.7200274!3d26.1697236!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144eb7d5dffbd6a5%3A0xcc55ab25a0641f1c!2z2YXYutiz2YTZhyDYp9mE2LLZh9ix2KfYoQ!5e0!3m2!1sar!2seg!4v1737292489441!5m2!1sar!2seg"
            width="600"
            height="450"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>}

        </div>
      </div>
      <div className="justify-center mt-5 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center items-center self-stretch px-2.5 py-8 w-full bg-white rounded-2xl border border-gray border-solid max-md:mt-4 max-md:max-w-full">
              <div className="flex justify-center items-center px-6 bg-secondColor rounded-2xl border border-gray border-solid h-[90px] w-[90px] max-md:px-5">
                <Image
                  src="/icons/Map Point.svg"
                  width={40}
                  height={40}
                  alt="Favirate"
                />
              </div>
              <div className="mt-4 text-xl leading-8 text-primary">
                {t("location")}
              </div>
              <div className="self-stretch mt-4 text-base leading-6 text-center text-neutral-400 max-md:max-w-full">
                {fullAddress && fullAddress}
                {/* 55 Main Street, 2nd Floor Tanta City */}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex grow justify-center items-center self-stretch px-2.5 py-7 w-full bg-white rounded-2xl border border-gray border-solid max-md:px-5 max-md:mt-4 max-md:max-w-full">
              <div className="flex flex-col items-center max-w-full w-[191px]">
                <div className="flex justify-center items-center px-6 bg-secondColor rounded-2xl border border-gray border-solid h-[90px] w-[90px] max-md:px-5">
                  <Image
                    src="/icons/Map Point.svg"
                    width={40}
                    height={40}
                    alt="Favirate"
                  />
                </div>
                <div className="mt-4 text-xl leading-8 text-primary">
                  {t("landMark")}
                </div>
                <div className="self-stretch mt-4 text-base leading-6 text-center text-neutral-400">
                  {spacialMark && spacialMark}
                  {/* امام مسجد عمر بن الخطاب من شاراع الاخلاص */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Location;
