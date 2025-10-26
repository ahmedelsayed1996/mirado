"use client";
import React, { useState } from "react";
import Link from "next/link";
import useCurrentLang from "../_hooks/useCurrentLang";
function AvailableAccommodation() {
  const language = useCurrentLang();
  return (
    <div className="flex justify-center self-center items-center   bg-secondColor bg-opacity-80 max-md:px-5  ">
      <div className="flex flex-col justify-center self-stretch px-12 py-8 my-auto bg-secondColor rounded-2xl border border-gray border-solid shadow-2xl min-w-[240px] w-[1057px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-center self-stretch px-12 py-12 my-auto bg-white rounded-2xl border border-gray border-solid shadow-2xl w-auto max-md:px-5">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="flex flex-row w-full text-xl font-medium leading-none text-right text-zinc-600 max-md:max-w-full items-center justify-between">
              <button
                onClick={() => window.close()}
                className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
              >
                <p className="font-bold">{"X"}</p>
              </button>
              <div className="text-2xl font-semibold text-gray-900">
                خيارات الإقامة المتاحة{" "}
              </div>
            </div>
          </div>

          <div className="flex  flex-col">
            <div className="flex flex-col flex-1 gap-5 pt-6 shrink justify-center w-full text-right max-md:max-w-full">
              {/* ________________________________card1____________________________ */}

              <div className="flex flex-col flex-1 shrink justify-center px-5 py-4 rounded-lg border  border-slate-200 border-dashed basis-0 bg-zinc-50 hover:border-primary hover:bg-[#bad0eb] min-w-[240px] max-md:max-w-full">
                <div className="flex flex-wrap gap-5 items-center w-full max-md:max-w-full">
                  <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px]  max-md:max-w-full">
                    <div className="self-end text-lg leading-none text-gray-900">
                      الإفطار والعشاء /غرفة مفردة
                    </div>
                    <div className="text-right flex-col-reverse flex-wrap gap-5 items-center mt-2.5 w-full text-base leading-loose max-md:max-w-full">
                      <div className="  my-auto text-blue-900">
                        اسبوعى :{" "}
                        <span className="font-medium text-blue-900">
                          200 رس
                        </span>{" "}
                      </div>
                      <div className="self-stretch my-auto text-blue-900">
                        مصاريف التسجيل :{" "}
                        <span className="font-medium text-blue-900">75 رس</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="office"
                    className="shrink-0 self-stretch my-auto w-6 h-6 border-gray-300 rounded-full cursor-pointer"
                  />{" "}
                </div>
                <div className="mt-5 w-full min-h-0 border  border-slate-200 border-solid max-md:max-w-full" />
                <div className="flex flex-wrap gap-10 justify-between items-start mt-5 w-full text-sm leading-6 max-md:max-w-full">
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">
                          الحد الأدنى لمدة الحجز
                        </div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/856afb2382eaea5fe456804d3d67d4c3b1e2f596b0eb42d53408685ae347075b?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded-md aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">دورة الحجز</div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09472888185b69a70d5a47057bc72f6d4a04bfffb2968a3cfdfa5b6c093e27cb?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المسافة من المعهد</div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/477c5a08f4fee28e385c79618f46a7053d0687a247bf1aef85bf2c29cf0f03eb?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المرافق</div>
                        <div className="font-medium text-zinc-500">
                          مرافق خاصة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba5d6554b057040719b0e69e6b468fbc39ccc56b6f3b2f8867e19d525b7add3?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الغرفة</div>
                        <div className="font-medium text-zinc-500">
                          الإقامة مع عائلة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b95f9439fd04a4e6e79199bf5ffeb11a5d1123fe033908f1293eb2587e5a4e74?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الطعام</div>
                        <div className="font-medium text-zinc-500">GBP 25</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d92395abb133450af2b62fd410f35b4c65fe2abb97979d083f9a571a1f324dc?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* ________________________________card2____________________________ */}

              <div className="flex flex-col flex-1 shrink justify-center px-5 py-4 rounded-lg border  hover:border-primary hover:bg-[#bad0eb]  border-slate-200 border-dashed basis-0 bg-zinc-50 min-w-[240px] max-md:max-w-full">
                <div className="flex flex-wrap gap-5 items-center w-full max-md:max-w-full">
                  <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="self-end text-lg leading-none text-gray-900">
                      الإفطار والعشاء /غرفة مفردة
                    </div>
                    <div className="text-right flex-col-reverse flex-wrap  gap-5 items-center mt-2.5 w-full text-base leading-loose max-md:max-w-full">
                      <div className="self-stretch my-auto text-blue-900">
                        اسبوعى :{" "}
                        <span className="font-medium text-blue-900">
                          200 رس
                        </span>{" "}
                      </div>
                      <div className="self-stretch my-auto text-blue-900">
                        مصاريف التسجيل :{" "}
                        <span className="font-medium text-blue-900">75 رس</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="office"
                    className="shrink-0 self-stretch my-auto w-6 h-6 border-gray-300 rounded-full cursor-pointer"
                  />{" "}
                </div>
                <div className="mt-5 w-full min-h-0 border  border-slate-200 border-solid max-md:max-w-full" />
                <div className="flex flex-wrap gap-10 justify-between items-start mt-5 w-full text-sm leading-6 max-md:max-w-full">
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">
                          الحد الأدنى لمدة الحجز
                        </div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/856afb2382eaea5fe456804d3d67d4c3b1e2f596b0eb42d53408685ae347075b?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded-md aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">دورة الحجز</div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09472888185b69a70d5a47057bc72f6d4a04bfffb2968a3cfdfa5b6c093e27cb?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المسافة من المعهد</div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/477c5a08f4fee28e385c79618f46a7053d0687a247bf1aef85bf2c29cf0f03eb?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المرافق</div>
                        <div className="font-medium text-zinc-500">
                          مرافق خاصة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba5d6554b057040719b0e69e6b468fbc39ccc56b6f3b2f8867e19d525b7add3?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الغرفة</div>
                        <div className="font-medium text-zinc-500">
                          الإقامة مع عائلة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b95f9439fd04a4e6e79199bf5ffeb11a5d1123fe033908f1293eb2587e5a4e74?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الطعام</div>
                        <div className="font-medium text-zinc-500">GBP 25</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d92395abb133450af2b62fd410f35b4c65fe2abb97979d083f9a571a1f324dc?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* ________________________________card3____________________________ */}

              <div className="flex flex-col flex-1 shrink justify-center px-5 py-4 rounded-lg border  hover:border-primary hover:bg-[#bad0eb]  border-slate-200 border-dashed basis-0 bg-zinc-50 min-w-[240px] max-md:max-w-full">
                <div className="flex flex-wrap gap-5 items-center w-full max-md:max-w-full">
                  <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="self-end text-lg leading-none text-gray-900">
                      الإفطار والعشاء /غرفة مفردة
                    </div>
                    <div className="text-right flex-col-reverse flex-wrap gap-5 items-center mt-2.5 w-full text-base leading-loose max-md:max-w-full">
                      <div className="self-stretch my-auto text-blue-900">
                        اسبوعى :{" "}
                        <span className="font-medium text-blue-900">
                          200 رس
                        </span>{" "}
                      </div>
                      <div className="self-stretch my-auto text-blue-900">
                        مصاريف التسجيل :{" "}
                        <span className="font-medium text-blue-900">75 رس</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="office"
                    className="shrink-0 self-stretch my-auto w-6 h-6 border-gray-300 rounded-full cursor-pointer"
                  />{" "}
                </div>
                <div className="mt-5 w-full min-h-0 border  border-slate-200 border-solid max-md:max-w-full" />
                <div className="flex flex-wrap gap-10 justify-between items-start mt-5 w-full text-sm leading-6 max-md:max-w-full">
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">
                          الحد الأدنى لمدة الحجز
                        </div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/856afb2382eaea5fe456804d3d67d4c3b1e2f596b0eb42d53408685ae347075b?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded-md aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">دورة الحجز</div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09472888185b69a70d5a47057bc72f6d4a04bfffb2968a3cfdfa5b6c093e27cb?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المسافة من المعهد</div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/477c5a08f4fee28e385c79618f46a7053d0687a247bf1aef85bf2c29cf0f03eb?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المرافق</div>
                        <div className="font-medium text-zinc-500">
                          مرافق خاصة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba5d6554b057040719b0e69e6b468fbc39ccc56b6f3b2f8867e19d525b7add3?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الغرفة</div>
                        <div className="font-medium text-zinc-500">
                          الإقامة مع عائلة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b95f9439fd04a4e6e79199bf5ffeb11a5d1123fe033908f1293eb2587e5a4e74?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الطعام</div>
                        <div className="font-medium text-zinc-500">GBP 25</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d92395abb133450af2b62fd410f35b4c65fe2abb97979d083f9a571a1f324dc?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* ________________________________card4____________________________ */}
              <div className="flex flex-col  flex-1 shrink justify-center px-5 pt-6 rounded-lg border  hover:border-primary hover:bg-[#bad0eb]  border-slate-200 border-dashed basis-0 bg-zinc-50 min-w-[240px] max-md:max-w-full">
                <div className="flex flex-wrap  gap-5 items-center w-full max-md:max-w-full">
                  <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="self-end text-lg leading-none text-gray-900">
                      غرفة مفردة/الإفطار والعشاء
                    </div>
                    <div className="text-right flex-col-reverse flex-wrap gap-5 items-center mt-2.5 w-full text-base leading-loose max-md:max-w-full">
                      <div className="self-stretch my-auto text-blue-900">
                        اسبوعى :{" "}
                        <span className="font-medium text-blue-900">
                          200 رس
                        </span>{" "}
                      </div>
                      <div className="self-stretch my-auto text-blue-900">
                        مصاريف التسجيل :{" "}
                        <span className="font-medium text-blue-900">75 رس</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="office"
                    className="shrink-0 self-stretch my-auto w-6 h-6 border-gray-300 rounded-full cursor-pointer"
                  />{" "}
                </div>
                <div className="mt-5 w-full min-h-0 border  border-slate-200 border-solid max-md:max-w-full" />
                <div className="flex flex-wrap gap-10 justify-between items-start mt-5 w-full text-sm leading-6 max-md:max-w-full">
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">
                          الحد الأدنى لمدة الحجز
                        </div>
                        <div className="font-medium text-zinc-500">اسبوعين</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b85ad3c71b14dbdd564449d5e1fccb69793ab4d62aebeff7c7e70b9bfa7979d9?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded-md aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">دورة الحجز</div>
                        <div className="font-medium text-zinc-500">اسبوعي</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/459d72986b641866c04a53d4df41cd5ba29b6ed174181d9572d0225723d1ccaa?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المسافة من المعهد</div>
                        <div className="font-medium text-zinc-500">20 Km</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/593c49ea20a54cd740393341def2b6a8dfa069ec57f25268e304ac3b91247f42?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">المرافق</div>
                        <div className="font-medium text-zinc-500">
                          مرافق خاصة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4de55aa7a1be10ee451edf0c3816dd13ee2b123dac7373eb3a1704134d9007a?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الغرفة</div>
                        <div className="font-medium text-zinc-500">
                          الإقامة مع عائلة
                        </div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/316cc558c9e16492fa661ba15658af1c2d3a90003f1255c76ac89ddf60112b95?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 rounded aspect-square"
                      /> */}
                    </div>
                    <div className="flex gap-1.5 justify-center items-center py-1.5 mt-2.5 rounded-2xl">
                      <div className="flex flex-col justify-center items-end self-stretch my-auto">
                        <div className="text-gray-900">نوع الطعام</div>
                        <div className="font-medium text-zinc-500">GBP 25</div>
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0166765c2ca3cbeb814f025baaf94ff30c5aa6e14abe41ea51ac388c89be30e9?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 items-start pt-6">
            <div className="flex gap-2.5 items-start min-w-[240px]">
              <button className="flex flex-col justify-center items-center px-3 py-2.5 bg-white rounded-lg border border-solid border-zinc-100 min-h-[35px] w-[39px]">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc5205b62b3bec912b2c4392871a957d86718b242d7ab7ef6a1b88c4d552800a?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                  className="object-contain w-4 aspect-square"
                  alt="Previous"
                /> */}
              </button>

              <button className="px-3 py-2.5 text-xs font-semibold text-black whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-100 min-h-[35px] w-[39px]">
                10
              </button>

              <button className="px-3 py-2 text-sm font-semibold text-black whitespace-nowrap bg-white rounded-lg min-h-[35px] w-[39px]">
                ...
              </button>

              <button className="px-3 py-2.5 text-xs font-semibold text-black whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-100 min-h-[35px] w-[39px]">
                3
              </button>

              <button className="px-3 py-2.5 text-xs font-semibold text-black whitespace-nowrap bg-white rounded-lg border border-solid border-zinc-100 min-h-[35px] w-[39px]">
                2
              </button>

              <button className="px-3 py-2.5 text-xs font-semibold text-white whitespace-nowrap bg-primary rounded-lg min-h-[35px] w-[39px]">
                1
              </button>

              <button className="flex flex-col justify-center items-center px-3 py-2.5 bg-white rounded-lg border border-solid border-zinc-100 min-h-[35px] w-[39px]">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/428ad75b2802c8623cb240276bf5ddd0c9df4df4f00a2784e1fcfaa963d341a5?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                  className="object-contain w-4 aspect-square"
                  alt="Next"
                /> */}
              </button>
            </div>

            <div className="flex flex-1 shrink gap-2.5 items-center text-center whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
              <button className="gap-4 self-stretch px-4 py-2 my-auto text-xs font-semibold bg-white rounded-lg border border-solid border-zinc-100 min-h-[35px] text-stone-950 w-[42px]">
                6
              </button>
              <div className="self-stretch my-auto text-sm justify-end font-medium text-zinc-500">
                متوفر
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-center mt-6  text-base text-right w-[226px] text-white max-md:max-w-full">
            <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
              <Link
                href={`/${language}/#`}
                className="flex-1 justify-center text-center p-4 whitespace-nowrap  border border-gray border-solid rounded-2xl text-primary bg-white rounded-xl max-md:px-5 border-primary hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-52 mx-auto"
              >
                رجوع
              </Link>
            </div>
            <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
              <Link
                href={`/${language}/#`}
                className="flex-1 justify-center text-center p-4   whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
              >
                تأكيد
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableAccommodation;
