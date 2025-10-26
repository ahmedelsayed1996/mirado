"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { nationalities } from "../_hooks/nationalities";
import { AppDispatch } from "../store";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import { parseCookies } from "nookies";
import Spinner from "./Spinner";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

interface SelectCurrencyProps {
  onClose: () => void; // الدالة لإغلاق المكون
  onCompleted: () => void; // الدالة لإغلاق المكون
  // onCurrencySelect: (currency: string) => void; // الدالة للتعامل مع العملة المختارة
  // currencySelected: string;
}

function CompleteYourData({ onClose, onCompleted }: SelectCurrencyProps) {
  // const [CountryOfNationality, setCountryOfNationality] = useState<string>("");
  const [CountryOfResidence, setCountryOfResidence] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [gender, setGender] = useState<string>("");
  const [CountryOfNationality, setCountryOfNationality] = useState<any>({});
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { locale, universityId, programId } = params;
  const user = useSelector((state: any) => state.user);
  const { tokenMainSite } = parseCookies();
  const t = useTranslations("Popup");

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDelete = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index); // إزالة الملف المحدد
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async (eve: any) => {
    eve.preventDefault();
    // if (user?.files?.length == 0) {
    if (user?.files?.length == 0 && !selectedFiles.length) {
      toast.error("Must Upload your Docx");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("country_id", selectedCountry ? selectedCountry : user.country?.id);
      formData.append("nationality", CountryOfNationality.nationality ? CountryOfNationality.nationality : user.nationality);
      formData.append("nationality_ar", CountryOfNationality.nationality_ar ? CountryOfNationality.nationality_ar : user.nationality_ar);
      formData.append("gender", gender ? gender : user.gender);
      // console.log("nationality", CountryOfNationality.nationality);
      // console.log("nationality_ar", CountryOfNationality.nationality_ar);

      if (selectedFiles) {
        selectedFiles.forEach((file) => {
          formData.append(`files`, file);
        });
      } else {
        formData.append(`files`, "");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenMainSite}`
        },
        body: formData
      });

      if (!res.ok) {
        const result = await res.json();
        setIsLoading(false);
        throw new Error(result.message);
      }
      const result = await res.json();
      onCompleted();
      setIsLoading(false);
    }
    // }
  }


  const getAllCountries = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/countries?limit=9000&page=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": Array.isArray(locale) ? locale.join(",") : locale,
        }
      })
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }
      const result = await res.json();
      setCountryOfResidence(result);
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getAllCountries();
    dispatch(getUser({ tokenMainSite, locale }));

    if (user.gender  && user.country?.id && user.nationality && user.files.length > 0) {
      console.log("Completed Data");
      onCompleted();
    } else {
      console.log("Must Complete Data");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex justify-center items-center md:px-16 bg-secondColor bg-opacity-80 ">
      <div className="flex overflow-hidden gap-2.5 justify-center items-center px-20 py-20 bg-gray-50 bg-opacity-80 max-md:px-5 max-md:py-24 ">
        <div className="flex flex-col justify-center self-stretch p-3 md:px-8 md:py-5 my-auto bg-white rounded-2xl border border-gray border-solid shadow-2xl w-[781px] ">
          <div className="flex  md:gap-10 justify-between items-center w-full max-md:max-w-full">
            <div className="self-stretch my-auto text-lg md:text-2xl font-semibold text-center text-gray-900">
              {t("completeInfo")}
            </div>
            <button
              onClick={onClose}
              className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
            >
              <p className="font-bold">{"X"}</p>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-6 w-full h-[422px] max-md:max-w-full">
              <div className="flex flex-wrap gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">
                {!user.nationality && <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("nationality")}
                  </label>
                  <div className="relative mt-1">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 19.3617H17.24C16.44 19.3617 15.68 19.6717 15.12 20.2317L13.41 21.9217C12.63 22.6917 11.36 22.6917 10.58 21.9217L8.87 20.2317C8.31 19.6717 7.54 19.3617 6.75 19.3617H6C4.34 19.3617 3 18.0317 3 16.3917V5.48169C3 3.84169 4.34 2.51172 6 2.51172H18C19.66 2.51172 21 3.84169 21 5.48169V16.3917C21 18.0217 19.66 19.3617 18 19.3617Z" stroke="#1E4C83" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.9999 10.4998C13.2868 10.4998 14.33 9.45662 14.33 8.1698C14.33 6.88298 13.2868 5.83984 11.9999 5.83984C10.7131 5.83984 9.66992 6.88298 9.66992 8.1698C9.66992 9.45662 10.7131 10.4998 11.9999 10.4998Z" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 16.1584C16 14.3584 14.21 12.8984 12 12.8984C9.79 12.8984 8 14.3584 8 16.1584" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <select
                      value={JSON.stringify(CountryOfNationality)}
                      required
                      // onChange={(e) => {
                      //   const selectedNationality = nationalities.find(n => n.nationality === e.target.value);
                      //   setCountryOfNationality({ english: selectedNationality.nationality, arabic: selectedNationality.nationality_ar });
                      // }}
                      // onChange={(e) => setCountryOfNationality(e.target.value)}
                      onChange={(e) => {
                        const selectedNationality = JSON.parse(e.target.value);
                        setCountryOfNationality(selectedNationality);
                      }}

                      className="block w-full py-2 pl-10 pr-3 bg-zinc-50 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    >
                      <option value="" >
                        {t("choose")}
                      </option>
                      {nationalities.map((n, index) => (
                        <option key={index} value={JSON.stringify(n)}>
                          {`${locale === "en" ? n.nationality : n.nationality_ar}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>}

                {/* ------------country of residence-------------- */}
                {!user.country?.id && <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("countryResidence")}
                  </label>
                  <div className="relative mt-1">

                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99051 0.332031C4.93051 0.332031 0.833008 4.4387 0.833008 9.4987C0.833008 14.5587 4.93051 18.6654 9.99051 18.6654C15.0597 18.6654 19.1663 14.5587 19.1663 9.4987C19.1663 4.4387 15.0597 0.332031 9.99051 0.332031ZM16.343 5.83203H13.6388C13.3455 4.6862 12.9238 3.5862 12.3738 2.5687C14.0605 3.1462 15.463 4.31953 16.343 5.83203ZM9.99967 2.20203C10.7605 3.30203 11.3563 4.5212 11.7505 5.83203H8.24884C8.64301 4.5212 9.23884 3.30203 9.99967 2.20203ZM2.90467 11.332C2.75801 10.7454 2.66634 10.1312 2.66634 9.4987C2.66634 8.8662 2.75801 8.25203 2.90467 7.66536H6.00301C5.92967 8.27036 5.87467 8.87536 5.87467 9.4987C5.87467 10.122 5.92967 10.727 6.00301 11.332H2.90467ZM3.65634 13.1654H6.36051C6.65384 14.3112 7.07551 15.4112 7.62551 16.4287C5.93884 15.8512 4.53634 14.687 3.65634 13.1654ZM6.36051 5.83203H3.65634C4.53634 4.31036 5.93884 3.1462 7.62551 2.5687C7.07551 3.5862 6.65384 4.6862 6.36051 5.83203ZM9.99967 16.7954C9.23884 15.6954 8.64301 14.4762 8.24884 13.1654H11.7505C11.3563 14.4762 10.7605 15.6954 9.99967 16.7954ZM12.1447 11.332H7.85467C7.77217 10.727 7.70801 10.122 7.70801 9.4987C7.70801 8.87536 7.77217 8.2612 7.85467 7.66536H12.1447C12.2272 8.2612 12.2913 8.87536 12.2913 9.4987C12.2913 10.122 12.2272 10.727 12.1447 11.332ZM12.3738 16.4287C12.9238 15.4112 13.3455 14.3112 13.6388 13.1654H16.343C15.463 14.6779 14.0605 15.8512 12.3738 16.4287ZM13.9963 11.332C14.0697 10.727 14.1247 10.122 14.1247 9.4987C14.1247 8.87536 14.0697 8.27036 13.9963 7.66536H17.0947C17.2413 8.25203 17.333 8.8662 17.333 9.4987C17.333 10.1312 17.2413 10.7454 17.0947 11.332H13.9963Z" fill="#1E4C83" />
                    </svg>

                    <select
                      value={selectedCountry}
                      onChange={(e: any) => setSelectedCountry(e.target.value)}
                      className="block w-full py-2 pl-10 pr-3 bg-zinc-50 rounded-md shadow-sm focus:outline-none sm:text-sm"
                      required
                    >
                      <option value="">
                        {t("choose")}
                      </option>
                      {CountryOfResidence && CountryOfResidence.map((country: any) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>}

              </div>
              {!user.gender && <div className="flex gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">

                <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("gender")}
                  </label>
                  <div className="relative mt-1">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16.5C15.866 16.5 19 13.366 19 9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5C5 13.366 8.13401 16.5 12 16.5Z" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 16.5V22.5" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 19.5H9" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      className="block w-full py-2 pl-10 pr-3  bg-zinc-50 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    >
                      <option value="" disabled>
                        {t("choose")}
                      </option>
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                    </select>
                  </div>
                </div>
              </div>}

              {user?.files?.length === 0 && <>
                <div className="flex gap-7 items-start mt-7 w-full h-[148px] max-md:max-w-full">
                  <div className="flex flex-col flex-1 shrink justify-center w-full basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base font-medium text-start text-rose-500 max-md:max-w-full">
                      <span>{t("attach")}</span>
                    </div>

                    {/* حقل اختيار الملفات */}
                    <div className="flex gap-2.5 items-start self-start mt-2.5 text-xs text-stone-500">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <div className="flex flex-col justify-center text-center w-[110px] cursor-pointer">
                          <svg width="110" height="103" viewBox="0 0 110 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="110" height="102" rx="10" fill="#C3B9B9" fillOpacity="0.2" />
                            <path d="M46.7501 47.547C50.3648 47.547 53.2951 44.6167 53.2951 41.002C53.2951 37.3873 50.3648 34.457 46.7501 34.457C43.1354 34.457 40.2051 37.3873 40.2051 41.002C40.2051 44.6167 43.1354 47.547 46.7501 47.547Z" fill="#898989" />
                            <path d="M66.5225 24.5H43.4775C33.4675 24.5 27.5 30.4675 27.5 40.4775V63.5225C27.5 66.52 28.0225 69.1325 29.04 71.3325C31.405 76.5575 36.465 79.5 43.4775 79.5H66.5225C76.5325 79.5 82.5 73.5325 82.5 63.5225V57.225V40.4775C82.5 30.4675 76.5325 24.5 66.5225 24.5ZM78.0175 53.375C75.8725 51.5325 72.4075 51.5325 70.2625 53.375L58.8225 63.1925C56.6775 65.035 53.2125 65.035 51.0675 63.1925L50.1325 62.4225C48.18 60.7175 45.0725 60.5525 42.8725 62.0375L32.5875 68.94C31.9825 67.4 31.625 65.6125 31.625 63.5225V40.4775C31.625 32.7225 35.7225 28.625 43.4775 28.625H66.5225C74.2775 28.625 78.375 32.7225 78.375 40.4775V53.6775L78.0175 53.375Z" fill="#898989" />
                          </svg>
                          <div className="mt-2.5">{t("upload")}</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* عرض الصور المختارة */}
                  <div className="flex gap-4 mt-4 overflow-x-auto max-w-full h-[120px]">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative w-[110px] h-[110px] flex-shrink-0">
                        <Image
                          width={50}
                          height={50}
                          src={URL.createObjectURL(file)}
                          alt={`selected-${index}`}
                          className="object-cover rounded-xl w-full h-full"
                        />
                        {/* زر الحذف */}
                        <button
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          onClick={() => handleDelete(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-7 w-full text-sm leading-6 text-black max-md:max-w-full items-center">
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00033 1.79297C4.74313 1.79297 1.29199 5.24411 1.29199 9.5013C1.29199 13.7585 4.74313 17.2096 9.00033 17.2096C13.2575 17.2096 16.7087 13.7585 16.7087 9.5013C16.7087 5.24411 13.2575 1.79297 9.00033 1.79297ZM0.0419922 9.5013C0.0419922 4.55375 4.05277 0.542969 9.00033 0.542969C13.9479 0.542969 17.9587 4.55375 17.9587 9.5013C17.9587 14.4489 13.9479 18.4596 9.00033 18.4596C4.05277 18.4596 0.0419922 14.4489 0.0419922 9.5013ZM9.00033 5.54297C9.3455 5.54297 9.62533 5.82279 9.62533 6.16797V9.24242L11.5256 11.1427C11.7697 11.3868 11.7697 11.7825 11.5256 12.0266C11.2815 12.2707 10.8858 12.2707 10.6417 12.0266L8.55838 9.94324C8.44117 9.82603 8.37533 9.66706 8.37533 9.5013V6.16797C8.37533 5.82279 8.65515 5.54297 9.00033 5.54297Z" fill="#FF4C51" />
                  </svg>

                  <div className="text-red-600">
                    {t("comment2")}
                  </div>
                </div>
              </>
              }

            </div>
            {isLoading ? <Spinner /> : <div className="px-5 py-8 mt-6 text-start ">
              <button
                className="flex-1 justify-center text-center px-3 py-2 mt-10 whitespace-nowrap   text-white bg-primary rounded-xl  max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
              >
                {t("next")}
              </button>
            </div>}

          </form>
        </div>
      </div>
    </div>
  );
}

export default CompleteYourData;
