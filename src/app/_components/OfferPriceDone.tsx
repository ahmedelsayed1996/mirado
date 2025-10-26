import React from "react";
import Link from "next/link";
import Image from "next/image";
import useCurrentLang from "../_hooks/useCurrentLang";
function OfferPriceDone() {
  const language = useCurrentLang();

  return (
    <div className="flex justify-center self-center items-center   bg-secondColor bg-opacity-80 max-md:px-5  ">
      <div className="flex overflow-hidden gap-2.5 justify-center self-center items-center px-96 py-64 bg-gray-50 bg-opacity-80 max-md:px-5 max-md:py-24">
        <div className="flex relative flex-col justify-center self-center px-8 py-10  bg-white rounded-2xl border border-gray border-solid shadow-2xl min-h-[600px] min-w-[240px] w-[781px] max-md:px-5">
          <button
            onClick={() => window.close()}
            className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
          >
            <p className="font-bold">{"X"}</p>
          </button>

          <div className="flex z-0 flex-col w-full max-md:max-w-full">
            <div className="flex flex-col justify-center px-5 w-full rounded-xl max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex gap-2.5 justify-center items-center self-center px-2.5 bg-slate-50	opacity-1.5  bg-gray-50 aspect-square min-h-[214px] rounded-[60px] w-[214px]">
                  {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4f1bfe91f892d115bf6a9832dff7ba3f2a517d988f0e2177bd736be28ca3729?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                    className="object-contain self-stretch my-auto aspect-square w-[102px] "
                  /> */}
                </div>
                <div className=" text-4xl font-medium text-center text-gray-900 max-md:max-w-full">
                  تم إنشاء عرض سعرك بنجاح
                </div>
                <div className="mt-4 text-sm font-medium leading-loose text-center capitalize text-zinc-500 max-md:max-w-full">
                  برجاء التوجه للمكتب بالفاتورة لإستكمال باقي الإجراءات
                </div>
              </div>
            </div>
            <Link
              href={`/${language}/login`}
              className="flex justify-center items-center self-center gap-2 px-5 py-3.5 mt-5 max-w-full text-base tracking-normal leading-none text-center bg-white rounded-xl border border-gray-200 border-solid min-h-[52px] text-zinc-500 w-[190px] border border-gray border-solid  text-primary bg-white rounded-xl max-md:px-5  hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-52 mx-auto"
            >
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bbd2eb00ccb2f2c47915b497bedfe87f53b922776778c2877d5420b6f0af6fa3?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                className="object-contain shrink-0 self-stretch my-auto w-6 rounded-md aspect-square"
              /> */}
              تحميل الفاتورة
            </Link>
            {/* ------------------------------------------------------------------------------------------------- */}
            <div className="flex flex-wrap gap-5 justify-center mt-7 w-full text-base tracking-normal leading-none max-md:max-w-full">
              <Link
                href={`/${language}/login`}
                className="flex-1 justify-center text-center p-5 whitespace-nowrap  border border-gray border-solid rounded-2xl text-primary bg-white rounded-xl max-md:px-5 border-primary hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-52 mx-auto"
              >
                عرض الطلبات
              </Link>

              <Link
                href={`/${language}/language-schools`}
                className="flex-1 justify-center text-center p-5  whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
              >
                تصفح المزيد
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferPriceDone;
