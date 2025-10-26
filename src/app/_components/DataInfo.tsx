"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { nationalities } from "../_hooks/nationalities";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import useCurrentLang from "../_hooks/useCurrentLang";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import { AppDispatch } from "../store";
import Spinner from "./Spinner";
import { useTranslations } from "next-intl";
import { displayUser } from "../reduxTool-kit/slices/displayUserSlice";
import useCleanPath from "../_hooks/useCleanPath";


interface Country {
  id: string;
  name: string;
}

function DataInfo({ currentUser }: any) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryOfNationality, setCountryOfNationality] = useState<string>("");
  const [countryOfNationalityAR, setCountryOfNationalityAR] = useState<string>("");
  const [CountryOfResidence, setCountryOfResidence] = useState<null>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [Capital, setCapital] = useState<string>("");
  const [city, setCity] = useState<object>([]);
  const [avatar, setAvatar] = useState(null);
  const { cleanPath } = useCleanPath();
  const { tokenMainSite } = parseCookies();
  const locale = useCurrentLang();
  const t = useTranslations("Profile");
  // console.log("user info", currentUser);
  // console.log("user", user);
  // console.log("currentUser", currentUser);
  const [avatarPreview, setAvatarPreview] = useState("");
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = async (eve: any) => {
    eve.preventDefault();
    setIsLoading(true);
    const nationalityData = nationalities.find(item => item.nationality === countryOfNationality || item.nationality_ar === countryOfNationality);

    const formData = new FormData();
    console.log("firstName", firstName);
    formData.append("avatar", avatar ? avatar : currentUser.avatar);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("phone_number", phoneNumber);
    formData.append("nationality", nationalityData?.nationality || "");
    formData.append("nationality_ar", nationalityData?.nationality_ar || "");
    formData.append("country_id", CountryOfResidence || "");


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${currentUser.id}`, {
      method: "PATCH",
      body: formData,
      headers: {
        "Accept-Language": locale,
        Authorization: `Bearer ${tokenMainSite}`
      },
    });

    if (!res.ok) {
      const result = await res.json();
      setIsLoading(false);
      throw new Error(result.message);
    }

    const result = await res.json();
    toast.success("Data Update Successfully");
    setIsLoading(false);
    dispatch(getUser({ tokenMainSite, locale }));
    dispatch(displayUser({ tokenMainSite, locale }));

  };

  const getAllCountry = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/countries?limit=9000&page=1`, {
        method: "GET",
        headers: {
          "Accept-Language": Array.isArray(params.locale) ? params.locale.join(",") : params.locale,
        },
      })
      const result = await res.json();
      setCountries(result);
    } catch (error) {
      console.log(error);
    }
  }
  const getAllCity = async (countryId: any) => {
    console.log("choose country");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cities?limit=1000&page=1&countryId=${countryId}`, {
        method: "GET",
        headers: {
          "Accept-Language": Array.isArray(params.locale) ? params.locale.join(",") : params.locale,
        },
      })
      const result = await res.json();
      setCity(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file)); // Preview the image before upload
    }
  };



  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.first_name);
      setLastName(currentUser.last_name);
      setEmail(currentUser.email);
      setGender(currentUser.gender);
      setPhoneNumber(currentUser.phone_number);
      setCountryOfResidence(currentUser.country?.id);

      const nationalityObj: any = nationalities.find(item => item.nationality === currentUser.nationality || item.nationality_ar === currentUser.nationality)
      // console.log("nationality" , nationality);
      setCountryOfNationality(nationalityObj?.nationality);
      setCountryOfNationalityAR(nationalityObj?.nationality_ar);
    }
  }, [currentUser]);
  useEffect(() => {
    getAllCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex overflow-hidden flex-col self-start px-4 lg:px-8 pt-8 pb-4 bg-white rounded-3xl border border-gray border-solid w-full md:w-4/6 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full text-lg font-bold text-start text-blue-900 max-md:max-w-full">
        <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="35" height="35" rx="17.5" fill="#1E4C83" />
            <path d="M18.0007 18.0013C20.3018 18.0013 22.1673 16.1358 22.1673 13.8346C22.1673 11.5334 20.3018 9.66797 18.0007 9.66797C15.6995 9.66797 13.834 11.5334 13.834 13.8346C13.834 16.1358 15.6995 18.0013 18.0007 18.0013Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.1585 26.3333C25.1585 23.1083 21.9501 20.5 18.0001 20.5C14.0501 20.5 10.8418 23.1083 10.8418 26.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full">
            {" "}
            {t("head")}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-8 w-full text-xl font-semibold text-center text-gray-900 rounded-3xl max-md:max-w-full">
        <div className="relative group">
          <Image
            src={
              avatarPreview 
                ? avatarPreview
                : currentUser?.avatar 
                  ? `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(currentUser.avatar)}`
                  : "/images/avatar.png" 
            }
            width={150}
            height={150}
            alt="Avatar"
            className="rounded-full object-cover w-36 h-36 cursor-pointer"
            onClick={() => document.getElementById("avatarInput")?.click()}
          />

          {/* Overlay Text on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" onClick={() => document.getElementById('avatarInput')?.click()}>
            <span className="text-white text-sm">{t("nav9")}</span>
          </div>
        </div>

        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <div className="mt-5 max-md:max-w-full">
          {currentUser.first_name} {currentUser.last_name}
        </div>
      </div>


      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-8 w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-10 items-center w-full font-medium text-start max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full">
                <span>{t("lable1")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7df86680d2f2c35d43c01fa935116044dfaef02c504125e52f801ab225577300?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="object-contain shrink-0 self-stretch my-auto aspect-square w-[22px]"
                  alt="User Icon"
                /> */}
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.9993 11.4635C13.5307 11.4635 15.5827 9.41151 15.5827 6.88021C15.5827 4.3489 13.5307 2.29688 10.9993 2.29688C8.46804 2.29688 6.41602 4.3489 6.41602 6.88021C6.41602 9.41151 8.46804 11.4635 10.9993 11.4635Z" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.8733 20.6315C18.8733 17.084 15.3442 14.2148 10.9992 14.2148C6.65416 14.2148 3.125 17.084 3.125 20.6315" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <input
                  type="text"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t("lable2")}
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full">
                <span>{t("lable3")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7df86680d2f2c35d43c01fa935116044dfaef02c504125e52f801ab225577300?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="object-contain shrink-0 self-stretch my-auto aspect-square w-[22px]"
                /> */}
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.9993 11.4635C13.5307 11.4635 15.5827 9.41151 15.5827 6.88021C15.5827 4.3489 13.5307 2.29688 10.9993 2.29688C8.46804 2.29688 6.41602 4.3489 6.41602 6.88021C6.41602 9.41151 8.46804 11.4635 10.9993 11.4635Z" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.8733 20.6315C18.8733 17.084 15.3442 14.2148 10.9992 14.2148C6.65416 14.2148 3.125 17.084 3.125 20.6315" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="text"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  placeholder={t("lable4")}
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">
            {/* -----------------e-mail-------------------- */}

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full">
                <span>{t("lable5")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a4ab5d2c696f1329ab85eb2f0f89d5bee3eb36acf158b742c49b63acbb6c4c5?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="object-contain shrink-0 self-stretch my-auto aspect-square w-[22px]"
                /> */}
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.584 19.2552H6.41732C3.66732 19.2552 1.83398 17.8802 1.83398 14.6719V8.25521C1.83398 5.04688 3.66732 3.67188 6.41732 3.67188H15.584C18.334 3.67188 20.1673 5.04688 20.1673 8.25521V14.6719C20.1673 17.8802 18.334 19.2552 15.584 19.2552Z" stroke="#1E4C83" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.5827 8.71484L12.7135 11.0065C11.7693 11.7582 10.2202 11.7582 9.27601 11.0065L6.41602 8.71484" stroke="#1E4C83" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <input
                  type="email"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  placeholder="eduxa@gmail.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* -------------------------------------------------e-mail----------------------------------------------------------- */}
          <div className="flex flex-wrap gap-10 items-center mt-7 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto font-medium text-start basis-0 min-w-[240px] max-md:max-w-full">
              {/* --------------------------------------gender--------------------------------------------- */}
              <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                <label className="block text-sm font-medium text-gray-700">
                  {t("lable6")}
                </label>
                <div className="relative mt-1">
                  {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2d5c1f35e637c8c5b54a0052cafdc9645840a825f0360f0580a6f3ccbd92bde?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                  /> */}
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16.4648C15.866 16.4648 19 13.3308 19 9.46484C19 5.59885 15.866 2.46484 12 2.46484C8.13401 2.46484 5 5.59885 5 9.46484C5 13.3308 8.13401 16.4648 12 16.4648Z" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16.4648V22.4648" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 19.4648H9" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <select
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full py-2 pl-10 pr-3  bg-zinc-50 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    required
                  >
                    <option value="" disabled>
                      {t("lable7")}...
                    </option>
                    <option value="male">{t("lable8")}</option>
                    <option value="female">{t("lable10")}</option>
                  </select>
                </div>
              </div>
            </div>
            {/* -------------------gender--------------------- */}


            {/* -----------------------phone number-------------------- */}

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full">
                <span>{t("lable11")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d4f600fec2b102e9a066c74abeb0d5d6a631dde7c3cd17fdb37de87b7b7f3d0?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="object-contain shrink-0 self-stretch my-auto aspect-square w-[22px]"
                /> */}
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.7583 11.7093L12.2295 11.1775L12.2295 11.1775L12.7583 11.7093ZM13.1758 11.2942L13.7046 11.826L13.7046 11.826L13.1758 11.2942ZM15.3911 11.0038L15.0329 11.6628L15.0329 11.6628L15.3911 11.0038ZM17.1424 11.9559L16.7842 12.6148L17.1424 11.9559ZM17.6359 14.9396L18.1647 15.4714L18.1647 15.4714L17.6359 14.9396ZM16.3337 16.2344L15.8049 15.7025L15.8049 15.7025L16.3337 16.2344ZM15.1193 16.8483L15.1889 17.595L15.1889 17.595L15.1193 16.8483ZM6.0801 12.9629L6.60891 12.4311L6.0801 12.9629ZM1.66866 4.73035L0.919871 4.7729L0.919871 4.7729L1.66866 4.73035ZM7.60374 6.06114L8.13256 6.59298L8.13256 6.59298L7.60374 6.06114ZM7.7474 3.6284L8.3478 3.17893L8.3478 3.17893L7.7474 3.6284ZM6.5915 2.08437L5.9911 2.53384L5.9911 2.53384L6.5915 2.08437ZM3.73901 1.8238L4.26783 2.35564L4.26783 2.35564L3.73901 1.8238ZM2.30021 3.25443L1.77139 2.72259L1.77139 2.72259L2.30021 3.25443ZM9.05721 10.0027L9.58603 9.47084L9.05721 10.0027ZM13.2872 12.2412L13.7046 11.826L12.647 10.7624L12.2295 11.1775L13.2872 12.2412ZM15.0329 11.6628L16.7842 12.6148L17.5006 11.2969L15.7493 10.3449L15.0329 11.6628ZM17.1071 14.4078L15.8049 15.7025L16.8625 16.7662L18.1647 15.4714L17.1071 14.4078ZM15.0497 16.1015C13.7356 16.224 10.3165 16.1176 6.60891 12.4311L5.55128 13.4947C9.62948 17.5498 13.5157 17.751 15.1889 17.595L15.0497 16.1015ZM6.60891 12.4311C3.07126 8.91349 2.48977 5.96021 2.41745 4.68779L0.919871 4.7729C1.01283 6.40855 1.74708 9.71213 5.55128 13.4947L6.60891 12.4311ZM7.86965 6.8544L8.13256 6.59298L7.07492 5.52931L6.81201 5.79073L7.86965 6.8544ZM8.3478 3.17893L7.1919 1.63489L5.9911 2.53384L7.14701 4.07787L8.3478 3.17893ZM3.21019 1.29196L1.77139 2.72259L2.82903 3.78627L4.26783 2.35564L3.21019 1.29196ZM7.34083 6.32256C6.81201 5.79073 6.8113 5.79144 6.81058 5.79215C6.81034 5.7924 6.80961 5.79312 6.80913 5.79361C6.80815 5.79459 6.80715 5.7956 6.80615 5.79662C6.80413 5.79867 6.80205 5.80081 6.7999 5.80303C6.79562 5.80748 6.7911 5.81227 6.78636 5.81742C6.77688 5.82771 6.76653 5.83943 6.75549 5.8526C6.73342 5.87893 6.70857 5.91116 6.68257 5.94954C6.63043 6.0265 6.574 6.12767 6.52626 6.25439C6.42874 6.51321 6.37757 6.85165 6.4421 7.26758C6.56811 8.07983 7.12503 9.13912 8.52839 10.5345L9.58603 9.47084C8.28063 8.17285 7.97936 7.39209 7.92437 7.03763C7.8984 6.87021 7.92603 6.79362 7.92993 6.78326C7.93289 6.7754 7.93284 6.77843 7.92438 6.79091C7.92023 6.79704 7.91406 6.80544 7.9052 6.81601C7.90077 6.8213 7.89565 6.82714 7.88977 6.83354C7.88682 6.83673 7.88368 6.84007 7.88033 6.84355C7.87866 6.84529 7.87693 6.84706 7.87515 6.84887C7.87426 6.84977 7.87336 6.85069 7.87244 6.85161C7.87198 6.85207 7.87128 6.85277 7.87105 6.853C7.87035 6.8537 7.86965 6.8544 7.34083 6.32256ZM8.52839 10.5345C9.93226 11.9304 10.9964 12.4826 11.8099 12.6073C12.226 12.6712 12.5642 12.6205 12.8228 12.5242C12.9495 12.477 13.0507 12.4212 13.1278 12.3696C13.1663 12.3438 13.1986 12.3192 13.225 12.2973C13.2382 12.2863 13.25 12.2761 13.2603 12.2666C13.2655 12.2619 13.2703 12.2574 13.2748 12.2532C13.277 12.2511 13.2792 12.249 13.2812 12.247C13.2823 12.246 13.2833 12.245 13.2843 12.244C13.2848 12.2435 13.2855 12.2428 13.2857 12.2426C13.2864 12.2419 13.2872 12.2412 12.7583 11.7093C12.2295 11.1775 12.2302 11.1768 12.2309 11.1761C12.2312 11.1758 12.2319 11.1752 12.2323 11.1747C12.2333 11.1738 12.2342 11.1729 12.2351 11.172C12.2369 11.1702 12.2387 11.1685 12.2404 11.1669C12.2439 11.1635 12.2473 11.1604 12.2505 11.1575C12.2569 11.1516 12.2628 11.1466 12.2681 11.1422C12.2786 11.1334 12.287 11.1274 12.293 11.1233C12.3053 11.1151 12.3078 11.1154 12.2991 11.1186C12.287 11.1231 12.2078 11.1508 12.0373 11.1247C11.6773 11.0695 10.8909 10.7683 9.58603 9.47084L8.52839 10.5345ZM7.1919 1.63489C6.23616 0.35824 4.35465 0.154005 3.21019 1.29196L4.26783 2.35564C4.72664 1.89943 5.54806 1.94202 5.9911 2.53384L7.1919 1.63489ZM2.41745 4.68779C2.40072 4.39334 2.53524 4.07839 2.82903 3.78627L1.77139 2.72259C1.27021 3.22093 0.872005 3.93066 0.919871 4.7729L2.41745 4.68779ZM15.8049 15.7025C15.5602 15.9459 15.3029 16.0779 15.0497 16.1015L15.1889 17.595C15.8805 17.5305 16.4451 17.1813 16.8625 16.7662L15.8049 15.7025ZM8.13256 6.59298C9.05819 5.67261 9.12582 4.21819 8.3478 3.17893L7.14701 4.07787C7.49913 4.54823 7.44465 5.16168 7.07492 5.52931L8.13256 6.59298ZM16.7842 12.6148C17.4998 13.0038 17.6046 13.913 17.1071 14.4078L18.1647 15.4714C19.4251 14.2182 19.0343 12.1307 17.5006 11.2969L16.7842 12.6148ZM13.7046 11.826C14.0362 11.4964 14.5725 11.4125 15.0329 11.6628L15.7493 10.3449C14.7328 9.79233 13.4698 9.94429 12.647 10.7624L13.7046 11.826Z" fill="#1E4C83" />
                </svg>

                <input
                  type="text"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  value={phoneNumber || ""}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {/* <div>+966</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1fbe2232e35c783b84733270a68ec36712a121cc2fe9631ce83bc4ebe27d44de?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="object-contain shrink-0 aspect-[1.38] fill-green-600 w-[29px]"
                /> */}
              </div>
            </div>
          </div>
          {/* -----------------------------------------------Country of Nationality------------------------------------------------------------- */}

          <div className="flex flex-wrap gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <label className="block text-sm font-medium text-gray-700">
                {t("lable12")}
              </label>
              <div className="relative mt-1">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd50b914a316f43a7a0c12fc54a4ba87572e6852810c2dc9aca23b0d26e3c113?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                /> */}
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 19.3265H17.24C16.44 19.3265 15.68 19.6365 15.12 20.1965L13.41 21.8865C12.63 22.6565 11.36 22.6565 10.58 21.8865L8.87 20.1965C8.31 19.6365 7.54 19.3265 6.75 19.3265H6C4.34 19.3265 3 17.9966 3 16.3566V5.44653C3 3.80653 4.34 2.47656 6 2.47656H18C19.66 2.47656 21 3.80653 21 5.44653V16.3566C21 17.9866 19.66 19.3265 18 19.3265Z" stroke="#1E4C83" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.9999 10.4647C13.2868 10.4647 14.33 9.42147 14.33 8.13464C14.33 6.84782 13.2868 5.80469 11.9999 5.80469C10.7131 5.80469 9.66992 6.84782 9.66992 8.13464C9.66992 9.42147 10.7131 10.4647 11.9999 10.4647Z" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 16.1232C16 14.3232 14.21 12.8633 12 12.8633C9.79 12.8633 8 14.3232 8 16.1232" stroke="#1E4C83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>


                <select
                  value={locale === "en" ? countryOfNationality : countryOfNationalityAR}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCountryOfNationality(value);
                  }
                  }
                  className="block w-full py-2 pl-10 pr-3  bg-zinc-50  rounded-md shadow-sm focus:outline-none sm:text-sm">
                  <option value="" disabled>
                    {t("lable13")}
                  </option>
                  {nationalities.map((n: any, index: number) => (
                    <option key={index}
                      // value={n}
                      // value={JSON.stringify(n)}
                      value={locale === "en" ? n.nationality : n.nationality_ar}
                    >
                      {locale === "en" ? n.nationality : n.nationality_ar}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            {/* ---------------------------country of residence---------------------------------------- */}

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <label className="block text-sm font-medium text-gray-700">
                {t("lable14")}
              </label>
              <div className="relative mt-1">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99148 0.296875C4.93148 0.296875 0.833984 4.40354 0.833984 9.46354C0.833984 14.5235 4.93148 18.6302 9.99148 18.6302C15.0607 18.6302 19.1673 14.5235 19.1673 9.46354C19.1673 4.40354 15.0607 0.296875 9.99148 0.296875ZM16.344 5.79687H13.6398C13.3465 4.65104 12.9248 3.55104 12.3748 2.53354C14.0615 3.11104 15.464 4.28437 16.344 5.79687ZM10.0007 2.16687C10.7615 3.26687 11.3573 4.48604 11.7515 5.79687H8.24982C8.64398 4.48604 9.23982 3.26687 10.0007 2.16687ZM2.90565 11.2969C2.75898 10.7102 2.66732 10.096 2.66732 9.46354C2.66732 8.83104 2.75898 8.21687 2.90565 7.63021H6.00398C5.93065 8.23521 5.87565 8.84021 5.87565 9.46354C5.87565 10.0869 5.93065 10.6919 6.00398 11.2969H2.90565ZM3.65732 13.1302H6.36148C6.65482 14.276 7.07648 15.376 7.62648 16.3935C5.93982 15.816 4.53732 14.6519 3.65732 13.1302ZM6.36148 5.79687H3.65732C4.53732 4.27521 5.93982 3.11104 7.62648 2.53354C7.07648 3.55104 6.65482 4.65104 6.36148 5.79687ZM10.0007 16.7602C9.23982 15.6602 8.64398 14.441 8.24982 13.1302H11.7515C11.3573 14.441 10.7615 15.6602 10.0007 16.7602ZM12.1457 11.2969H7.85565C7.77315 10.6919 7.70898 10.0869 7.70898 9.46354C7.70898 8.84021 7.77315 8.22604 7.85565 7.63021H12.1457C12.2282 8.22604 12.2923 8.84021 12.2923 9.46354C12.2923 10.0869 12.2282 10.6919 12.1457 11.2969ZM12.3748 16.3935C12.9248 15.376 13.3465 14.276 13.6398 13.1302H16.344C15.464 14.6427 14.0615 15.816 12.3748 16.3935ZM13.9973 11.2969C14.0707 10.6919 14.1257 10.0869 14.1257 9.46354C14.1257 8.84021 14.0707 8.23521 13.9973 7.63021H17.0957C17.2423 8.21687 17.334 8.83104 17.334 9.46354C17.334 10.096 17.2423 10.7102 17.0957 11.2969H13.9973Z" fill="#1E4C83" />
                </svg>

                <select
                  value={CountryOfResidence || ""}
                  onChange={(e: any) => {
                    setCountryOfResidence(e.target.value);
                    getAllCity(e.target.value);
                  }}
                  // required
                  className="block w-full py-2 pl-10 pr-3 bg-zinc-50 rounded-md shadow-sm focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    {currentUser.country?.name || `${t("lable15")}`}
                  </option>
                  {countries.length > 0 ? (
                    countries.map((country: any, index: number) => (
                      <option key={index} value={country.id}>
                        {country.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>{t("lable16")}...</option>
                  )}
                </select>
              </div>
            </div>

          </div>
          {/* --------------------------------------------------capital----------------------------------------- */}
          {/* <div className="flex flex-wrap gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <label className="block text-sm font-medium text-gray-700">
                Capital
              </label>
              <div className="relative mt-1">
                <img
                  alt="capital icon"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f02cc1047db3b311963fa4202cc6be5950966f0ea0f78fe907c21be6589fa330?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                />
                <select
                  value={Capital || ""}
                  onChange={(e) => setCapital(e.target.value)}
                  className="block w-full py-2 pl-10 pr-3  bg-zinc-50  rounded-md shadow-sm focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="cairo">cairo</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Paris">Paris</option>
                </select>
              </div>
            </div>


            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="relative mt-1">
                <img
                  alt="city icon"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/17feed182090e260fb9a1ffe80327d5495c8b47f6b03f58881c4c8fdc747ff5a?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                />
                <select
                  value={currentUser.city || ""}
                  onChange={(e: any) => setCity(e.target.value)}
                  className="block w-full py-2 pl-10 pr-3  bg-zinc-50  rounded-md shadow-sm focus:outline-none sm:text-sm"
                >
                </select>
              </div>
            </div>
          </div> */}
          {/* ---------------------------Best way to contact?---------------------------- */}
          {/* <div className="flex flex-wrap gap-10  mt-7 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-full max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base font-medium text-start text-gray-900 max-md:max-w-full">
                Best way to contact?
              </div>
              <div className="flex gap-2.5 mt-2.5   min-h-[55px] w-full max-md:max-w-full">
                <div className="flex flex-1 shrink gap-5  items-center  h-full rounded-xl basis-0 bg-zinc-50">
                  <div className="flex gap-2.5 justify-center items-center p-2.5  rounded-xl  bg-blue-900 bg-opacity-10 w-[150px] h-[55px]">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="WhatsApp"
                        className="hidden"
                        onChange={(e) => setContactMethod(e.target.value)}
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d595a4df804c3598a47c2bf7f0be8df8cd72c2d5ea323ec79e5dfe535c0ea77?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      />
                      <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                        WhatsApp
                      </div>
                      <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                        {contactMethod === "WhatsApp" && (
                          <div className="w-full h-full rounded-full bg-blue-900"></div>
                        )}
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-2.5 justify-center items-center p-2.5  rounded-xl  bg-blue-900 bg-opacity-10 w-[125px] h-[55px]">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="E-mail"
                        className="hidden"
                        onChange={(e) => setContactMethod(e.target.value)}
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/16d1300110ae5cc6a5d5015900c0377a0c261c0ecc3d0b05ea5eca3a3004c579?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      />
                      <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                        E-mail
                      </div>
                      <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                        {contactMethod === "E-mail" && (
                          <div className="w-full h-full rounded-full bg-blue-900"></div>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="flex gap-2.5 justify-center items-center p-2.5  rounded-xl  bg-blue-900 bg-opacity-10 w-[110px] h-[55px]">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        className="hidden"
                        onChange={(e) => setContactMethod(e.target.value)}
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e514826f83ce3356f4f372f8cdc2cab789f0cb46e8c72fa99a0cd8451eb1ea7e?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                      />
                      <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                        phone
                      </div>
                      <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                        {contactMethod === "phone" && (
                          <div className="w-full h-full rounded-full bg-blue-900"></div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 shrink justify-start self-stretch  basis-0 min-w-[153px] h-[55px] max-md:max-w-full mt-7">
            <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base font-medium text-start text-gray-900 max-md:max-w-full">
              What are you interested in?
            </div>
            <div className="flex gap-5 self-start mt-2.5 min-h-[55px] bg-zinc-50 w-full ">
              <div className="flex gap-2.5 justify-center items-center p-2.5 h-full rounded-xl  bg-blue-900 bg-opacity-10 w-[px]">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="Language Institutes"
                    className="hidden"
                    onChange={(e) => setContactMethod(e.target.value)}
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4de0359147cdfdcb030e484bbc17e53addff8c28193d30e99ebf37869ff5b79c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  />
                  <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                    Language Institutes
                  </div>
                  <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                    {contactMethod === "Language Institutes" && (
                      <div className="w-full h-full rounded-full bg-blue-900"></div>
                    )}
                  </div>
                </label>
              </div>

              <div className="flex gap-2.5 justify-center items-center p-2.5 rounded-xl  bg-blue-900 bg-opacity-10 w-[153px] h-[55px]">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="Universities"
                    className="hidden"
                    onChange={(e) => setContactMethod(e.target.value)}
                  />
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.37 3.11469L21.37 6.71466C21.72 6.85466 22 7.27466 22 7.64466V10.9647C22 11.5147 21.55 11.9647 21 11.9647H3C2.45 11.9647 2 11.5147 2 10.9647V7.64466C2 7.27466 2.28 6.85466 2.63 6.71466L11.63 3.11469C11.83 3.03469 12.17 3.03469 12.37 3.11469Z"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22.9648H2V19.9648C2 19.4148 2.45 18.9648 3 18.9648H21C21.55 18.9648 22 19.4148 22 19.9648V22.9648Z"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 18.9648V11.9648"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 18.9648V11.9648"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18.9648V11.9648"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 18.9648V11.9648"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 18.9648V11.9648"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 22.9648H23"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 9.46484C12.8284 9.46484 13.5 8.79327 13.5 7.96484C13.5 7.13642 12.8284 6.46484 12 6.46484C11.1716 6.46484 10.5 7.13642 10.5 7.96484C10.5 8.79327 11.1716 9.46484 12 9.46484Z"
                      stroke="#1E4C83"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                    Universities
                  </div>
                  <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                    {contactMethod === "Universities" && (
                      <div className="w-full h-full rounded-full bg-blue-900"></div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div> */}

          {/* -----------------------How did you find us?----------------------------- */}

          {/* <div className="flex gap-10 items-center mt-7 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base font-medium text-start text-gray-900 max-md:max-w-full mt-7">
                How did you find us?
              </div>
              <div className="flex flex-wrap gap-5 mt-2.5 w-full min-h-[55px] max-md:max-w-full bg-zinc-50 items-center ">
                <div className="flex gap-2.5 justify-center items-center p-2.5 h-full rounded-xl  bg-blue-900 bg-opacity-10 w-[px]">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="Tik Tok"
                      className="hidden"
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/454b29f7770e68463e93aa6c42bc31447f2fdd9f966357407c2b4a06a03c59c1?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                      Tik Tok
                    </div>
                    <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                      {contactMethod === "Tik Tok" && (
                        <div className="w-full h-full rounded-full bg-blue-900"></div>
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex gap-2.5 justify-center items-center p-2.5 h-full rounded-xl  bg-blue-900 bg-opacity-10 w-[px]">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="LinkedIn"
                      className="hidden"
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a024cce7a2448ca8e915c1860f2cb5f38dacd5e1dc9c38d5fd5db32ac585530?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                      LinkedIn
                    </div>
                    <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                      {contactMethod === "LinkedIn" && (
                        <div className="w-full h-full rounded-full bg-blue-900"></div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="flex gap-2.5 justify-center items-center p-2.5 h-full rounded-xl  bg-blue-900 bg-opacity-10 w-[px]">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="Instagram"
                      className="hidden"
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5ca8298b743c4c161581bc7eda70012ddfadde3b766b1aed624bfc77cf0ee2a?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                      Instagram
                    </div>
                    <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                      {contactMethod === "Instagram" && (
                        <div className="w-full h-full rounded-full bg-blue-900"></div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="flex gap-2.5 justify-center items-center p-2.5 h-full rounded-xl  bg-blue-900 bg-opacity-10 w-[px]">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="X"
                      className="hidden"
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5ca8298b743c4c161581bc7eda70012ddfadde3b766b1aed624bfc77cf0ee2a?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                      X
                    </div>
                    <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                      {contactMethod === "X" && (
                        <div className="w-full h-full rounded-full bg-blue-900"></div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="flex gap-2.5 justify-center items-center p-2.5 h-full rounded-xl  bg-blue-900 bg-opacity-10 w-[px]">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="Facebook"
                      className="hidden"
                      onChange={(e) => setContactMethod(e.target.value)}
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5ca8298b743c4c161581bc7eda70012ddfadde3b766b1aed624bfc77cf0ee2a?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-center basis-0 text-zinc-500">
                      Facebook
                    </div>
                    <div className="flex shrink-0 rounded-full bg-zinc-100 h-[15px] w-[15px]">
                      {contactMethod === "Facebook" && (
                        <div className="w-full h-full rounded-full bg-blue-900"></div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex gap-6 items-center mt-10  text-base text-start  text-white max-md:max-w-full">
          <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto  max-md:max-w-full">
            {isLoading ? <Spinner /> :
              <button
                className="flex flex-1 items-center justify-center text-center p-3  text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300  mx-auto"
              >
                <svg
                  className="mx-2"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="#1E4C83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16602 2.13281H7.49935C3.33268 2.13281 1.66602 3.79948 1.66602 7.96615V12.9661C1.66602 17.1328 3.33268 18.7995 7.49935 18.7995H12.4993C16.666 18.7995 18.3327 17.1328 18.3327 12.9661V11.2995"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3675 2.98123L6.80088 9.5479C6.55088 9.7979 6.30088 10.2896 6.25088 10.6479L5.89254 13.1562C5.75921 14.0646 6.40088 14.6979 7.30921 14.5729L9.81754 14.2146C10.1675 14.1646 10.6592 13.9146 10.9175 13.6646L17.4842 7.0979C18.6175 5.96457 19.1509 4.6479 17.4842 2.98123C15.8175 1.31457 14.5009 1.8479 13.3675 2.98123Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.4258 3.92188C12.9841 5.91354 14.5424 7.47188 16.5424 8.03854"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("lable17")}
              </button>}


          </div>
          <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto  max-md:max-w-full">
            <button
              className="flex-1 justify-center text-center p-3   border  border-solid  text-primary bg-white rounded-xl border-primary hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 mx-auto"
            >
              {t("lable18")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DataInfo;
