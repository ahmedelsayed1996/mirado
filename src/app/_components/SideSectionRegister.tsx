import Image from "next/image";
import Link from "next/link";
import React from "react";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useTranslations } from "next-intl";

function SideSectionRegister() {
  const language = useCurrentLang();
  const S = useTranslations("SideSectionRegister");

  return (
    <div className="hidden lg:flex flex-col px-2 lg:w-6/12 max-md:ml-0 ">
      <div className="flex overflow-hidden relative flex-col grow justify-center px-11  text-center min-h-[850px] text-zinc-900 max-md:px-3  max-md:mt-10 max-md:max-w-full">
        <img
          alt=""
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6c3679db686b08b2e968bbe8fa08ad69a8780a8b?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
          className="object-cover absolute inset-0 size-full rounded-xl"
        />
        <div className="flex relative flex-col md:px-8 md:py-8 rounded-xl bg-white bg-opacity-80  max-md:max-w-full">
          <div className="flex z-0 flex-col justify-center w-full  max-md:max-w-full border border-solid border-white border-opacity-50 rounded-xl p-2 md:p-5">
            <Link href={`/${language}`} className="self-center cursor-pointer">
              <Image src="/logo.svg" alt="logo" width={120} height={100} />
            </Link>
            <div className="flex flex-col items-center mt-4 w-full max-md:max-w-full">
              <div className="text-2xl font-bold max-md:max-w-full">
                {S("P1")}
              </div>
              <div className="mt-3 text-base font-medium tracking-wide max-md:max-w-full">
                {S("P2")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideSectionRegister;
