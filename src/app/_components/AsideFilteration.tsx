"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "use-intl";
import useCurrentLang from "../_hooks/useCurrentLang";
import { getAllCities } from "../reduxTool-kit/slices/citiesSlice";
import { getAllCountries } from "../reduxTool-kit/slices/countriesSlice";
import { getAllLanguageSchools } from "../reduxTool-kit/slices/languageSchoolsSlice";
import { getAllStates } from "../reduxTool-kit/slices/statesSlice";
import { AppDispatch } from "../store";
interface selectCountry {
  name: string;
  id: number;
  logo: string | null;
}
interface selectState {
  name: string;
  id: number;
}

const languageStudy = [
  "English",
  "Arabic",
  "Italian",
  "German",
  "Chinese",
  "Spanish",
  "Korean",
  "French",
];
const languageAr = [
  "اللغة الانجليزية",
  "اللغة العربية",
  "اللغة الإيطالية",
  "اللغةالالمانية",
  "اللغةالصينية",
  "اللغةالاسبانية",
  "اللغةالكورية",
  "اللغةالفرنسية",
];
function AsideFilteration() {
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();
  // translate
  const language = useCurrentLang();
  const IN = useTranslations("languageSchool");
  const UN = useTranslations("Universities");
  const trFilter = useTranslations("newHome");
  // States
  const [recommended, setRecommended] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  // Country State
  const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<selectCountry>();
  const [searchCountry, setSearchCountry] = useState<string>("");
  // State States
  const [isStateOpen, setIsStateOpen] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<selectState>();
  const [searchState, setSearchState] = useState<string>("");
  // State City
  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<selectState>();
  const [searchCity, setSearchCity] = useState<string>("");
  // State Langauge
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  // State Search Value
  const [searchValue, setSearchValue] = useState<string>("");
  // Ref
  const langCountryRef = useRef("");
  const langMajerRef = useRef("");
  // Selector
  const countries = useSelector((state: any) => state.countries);
  const states = useSelector((state: any) => state.states);
  const cities = useSelector((state: any) => state.cities);
  const user = useSelector((state: any) => state.displayUser);
  // Filteration Data
  const filteredCountries = countries?.countries?.filter((country: any) =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );
  const filteredState = states?.states?.filter((state: any) =>
    state.name.toLowerCase().includes(searchState.toLowerCase())
  );
  const filteredCity = cities?.cities?.filter((city: any) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  // Handle Submition
  const handleSubmit = (eve: any) => {
    eve.preventDefault();

    const formState = {
      language: language,
      search: searchValue,
      country: selectedCountry?.id,
      city: selectedCity?.id,
      state: selectedState?.id,
      userId: user.id,
      recommended: recommended,
      rating: rating,
    };
    console.log(formState);
    dispatch(getAllLanguageSchools({ formState }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (
          selectedCountry ||
          selectedLanguage ||
          selectedState ||
          searchValue
        ) {
          handleSubmit(e);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCountry, selectedLanguage, selectedState, searchValue]);
  return (
    <>
      <aside className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-6 w-[40%]">
        {/* Heading */}
        <h2 className="text-[#1B1B1B] text-[clamp(.8rem,1.4vw,3rem)] font-bold ">
          {IN("searchForSchool")}
        </h2>
        <hr className="my-5 text-[#eee] " />
        <form
          onSubmit={(eve) => {
            handleSubmit(eve);
          }}
          className="flex flex-col gap-4"
        >
          {/* Filter By Name */}
          <div className=" flex flex-col gap-2">
            <label
              htmlFor="schoolNam"
              className="text-[#1B1B1B] text-[clamp(.8rem,1vw,3rem)] font-bold"
            >
              {IN("searchBySchoolName")}
            </label>
            <div className="relative">
              <svg
                className="absolute top-1/2 -translate-y-1/2 start-4"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  d="M17.9172 16.1836L15.2755 13.6836C14.7733 14.3302 14.1713 14.8928 13.4922 15.3503L16.2089 17.9336C16.3231 18.067 16.4643 18.1747 16.6232 18.2495C16.7822 18.3243 16.9551 18.3645 17.1308 18.3675C17.3064 18.3705 17.4806 18.3362 17.642 18.2669C17.8034 18.1976 17.9482 18.0949 18.067 17.9654C18.1857 17.836 18.2757 17.6829 18.3308 17.5161C18.386 17.3494 18.4052 17.1728 18.3871 16.9981C18.369 16.8234 18.314 16.6545 18.2259 16.5026C18.1377 16.3507 18.0183 16.2193 17.8755 16.1169L17.9172 16.1836Z"
                  fill="#A1A5B7"
                />
                <path
                  d="M9.28516 1.66797C7.8018 1.66797 6.35175 2.10784 5.11838 2.93195C3.88501 3.75606 2.92372 4.9274 2.35606 6.29784C1.78841 7.66829 1.63988 9.17629 1.92927 10.6311C2.21866 12.086 2.93296 13.4224 3.98186 14.4713C5.03075 15.5202 6.36712 16.2345 7.82198 16.5239C9.27684 16.8132 10.7848 16.6647 12.1553 16.0971C13.5257 15.5294 14.6971 14.5681 15.5212 13.3347C16.3453 12.1014 16.7852 10.6513 16.7852 9.16797C16.7852 7.17885 15.995 5.27119 14.5885 3.86467C13.1819 2.45814 11.2743 1.66797 9.28516 1.66797ZM9.28516 14.468C8.23892 14.468 7.21616 14.1578 6.34613 13.5767C5.47611 12.9956 4.79786 12.1697 4.3971 11.2033C3.99634 10.2368 3.89106 9.17327 4.09457 8.14701C4.29807 7.12076 4.80123 6.17786 5.54045 5.43747C6.27967 4.69709 7.22177 4.19245 8.24771 3.98733C9.27364 3.78221 10.3374 3.88582 11.3044 4.28505C12.2715 4.68429 13.0985 5.36124 13.681 6.23035C14.2634 7.09946 14.5752 8.12173 14.5768 9.16797C14.579 9.86389 14.4437 10.5534 14.1787 11.1969C13.9136 11.8403 13.524 12.4251 13.0323 12.9176C12.5406 13.4101 11.9565 13.8005 11.3134 14.0666C10.6704 14.3327 9.98108 14.4691 9.28516 14.468V14.468Z"
                  fill="#A1A5B7"
                />
              </svg>
              <input
                type="text"
                name="schoolName"
                id="schoolName"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`${IN("search")}`}
                className="w-full py-3 ps-11 placeholder:text-[#A5A5A5] bg-[#FAFAFA] border border-[#EEEEEE] rounded-full focus:outline-none"
              />
            </div>
          </div>

          {/* Filter By Country */}
          <div className="flex flex-col gap-2 items-start  w-full  relative">
            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
              {trFilter("searchFilters1")}
            </div>
            <div
              onClick={() => {
                const currentCountryLang = langCountryRef.current !== language;
                if (!countries?.countries?.length || currentCountryLang) {
                  dispatch(getAllCountries({ language: language }));
                  langCountryRef.current = language;
                }
                setIsCountryOpen(!isCountryOpen);
                setIsStateOpen(false);
                setIsCityOpen(false);
                setIsLanguageOpen(false);
              }}
              className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
            >
              <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                {selectedCountry?.name || trFilter("searchFiltersDrd1")}
              </span>
              <svg
                className={`${isCountryOpen ? "rotate-180" : ""} `}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                  fill="#666666"
                  stroke="white"
                />
              </svg>
            </div>
            {isCountryOpen && (
              <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {/* Search Input*/}
                <div className="px-4 py-2">
                  <input
                    type="text"
                    placeholder={trFilter("searchFiltersDrd8")}
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* قائمة النتائج بعد الفلترة */}
                {!countries.loading ? (
                  filteredCountries?.length > 0 ? (
                    filteredCountries.map((country: any) => (
                      <div
                        key={country?.id}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryOpen(false);
                          setSelectedState({ id: 0, name: "" });
                          setSelectedCity({ id: 0, name: "" });
                          setIsStateOpen(false);
                          setIsCityOpen(false);
                          setSearchCountry("");
                          dispatch(
                            getAllStates({
                              language: language,
                              countryId: country?.id,
                            })
                          );
                        }}
                        className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        {country.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-3 text-gray-400">
                      {trFilter("searchFiltersDrd5")}
                    </div>
                  )
                ) : (
                  <div className="px-6 py-3 text-gray-400">
                    {trFilter("searchFiltersDrd6")}...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter By State */}
          <div className="flex flex-col gap-2 items-start  w-full  relative">
            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
              {trFilter("searchFiltersDrd2")}
            </div>
            <div
              onClick={() => {
                setIsStateOpen(!isStateOpen);
                setIsCountryOpen(false);
                setIsCityOpen(false);
                setIsLanguageOpen(false);
              }}
              className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
            >
              <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                {selectedState?.name || trFilter("searchFiltersDrd2+")}
              </span>
              <svg
                className={`${isStateOpen ? "rotate-180" : ""} `}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                  fill="#666666"
                  stroke="white"
                />
              </svg>
            </div>
            {isStateOpen && (
              <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {/* حقل البحث */}
                <div className="px-4 py-2">
                  <input
                    type="text"
                    placeholder={trFilter("searchFiltersDrd7")}
                    value={searchCountry}
                    onChange={(e) => setSearchState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* قائمة النتائج بعد الفلترة */}
                {!states.loading ? (
                  filteredState?.length > 0 ? (
                    filteredState.map((state: any) => (
                      <div
                        key={state?.id}
                        onClick={() => {
                          setSelectedState(state);
                          setIsCountryOpen(false);
                          setIsStateOpen(false);
                          setSelectedCity({ id: 0, name: "" });
                          setIsCityOpen(false);
                          setSearchCountry("");
                          dispatch(
                            getAllCities({
                              language: language,
                              countryId: selectedCountry?.id,
                              stateId: state?.id,
                            })
                          );
                        }}
                        className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        {state.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-3 text-gray-400">
                      {trFilter("searchFiltersDrd5")}
                    </div>
                  )
                ) : (
                  <div className="px-6 py-3 text-gray-400">
                    {trFilter("searchFiltersDrd6")}...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter By City */}
          <div className="flex flex-col gap-2 items-start  w-full  relative">
            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
              {trFilter("searchFiltersDrd11")}
            </div>
            <div
              onClick={() => {
                setIsCityOpen(!isCityOpen);
                setIsCountryOpen(false);
                setIsStateOpen(false);
                setIsLanguageOpen(false);
              }}
              className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
            >
              <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                {selectedCity?.name || trFilter("searchFiltersDrd3+")}
              </span>
              <svg
                className={`${isCityOpen ? "rotate-180" : ""} `}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                  fill="#666666"
                  stroke="white"
                />
              </svg>
            </div>
            {isCityOpen && (
              <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {/* حقل البحث */}
                <div className="px-4 py-2">
                  <input
                    type="text"
                    placeholder={trFilter("searchFiltersDrd11")}
                    value={searchCountry}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* قائمة النتائج بعد الفلترة */}
                {!cities.loading ? (
                  filteredCity?.length > 0 ? (
                    filteredCity.map((city: any) => (
                      <div
                        key={city?.id}
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCountryOpen(false);
                          setIsStateOpen(false);
                          setIsCityOpen(false);
                          setSearchCity("");
                        }}
                        className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        {city.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-3 text-gray-400">
                      {trFilter("searchFiltersDrd5")}
                    </div>
                  )
                ) : (
                  <div className="px-6 py-3 text-gray-400">
                    {trFilter("searchFiltersDrd6")}...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter By  Language */}
          <div className="flex flex-col gap-2 items-start w-full  relative">
            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
              {trFilter("searchFiltersDrd4")}
            </div>
            <div
              onClick={() => {
                setIsLanguageOpen(!isLanguageOpen);
                setIsCountryOpen(false);
                setIsStateOpen(false);
                setIsCityOpen(false);
              }}
              className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
            >
              <span className="tracking-wide text-neutral-600 text-sm">
                {selectedLanguage || trFilter("searchFiltersDrd4+")}
              </span>
              <svg
                className={`${isLanguageOpen ? "rotate-180" : ""} `}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                  fill="#666666"
                  stroke="white"
                />
              </svg>
            </div>

            {isLanguageOpen && (
              <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {language == "en"
                  ? languageStudy.map((lang: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                        className="px-6 py-3 hover:bg-gray cursor-pointer"
                      >
                        {lang}
                      </div>
                    ))
                  : languageAr.map((lang: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                        className="px-6 py-3 hover:bg-gray cursor-pointer"
                      >
                        {lang}
                      </div>
                    ))}
              </div>
            )}
          </div>

          {/* Recommended */}
          <div className="flex overflow-hidden flex-col pb-4 mt-6 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
            <div className="text-base font-bold text-zinc-900">
              {UN("recommendFilter")}
            </div>
            <div className="flex gap-3 items-center self-start mt-2 text-sm font-medium text-slate-900">
              <div
                className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto rounded-lg border border-solid  max-md:px-5 cursor-pointer
                     ${
                       recommended === ""
                         ? "bg-primary border-primary text-white"
                         : "bg-white border-zinc-100 text-black"
                     }`}
                onClick={() => setRecommended("")}
              >
                {UN("all")}
              </div>
              <div
                className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto rounded-lg border border-solid max-md:px-5 cursor-pointer 
                    ${
                      recommended === "true"
                        ? "bg-primary border-primary text-white "
                        : "bg-white border-zinc-100 text-black"
                    }`}
                onClick={() => setRecommended("true")}
              >
                {UN("recommendFilter")}
              </div>
            </div>
          </div>
          {/* Rating */}
          <div className="flex overflow-hidden flex-col pb-4 mt-6 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
            <div className="text-base font-bold text-zinc-900">
              {UN("rating")}
            </div>
            <div className="flex flex-wrap gap-1 items-center mt-2 w-full text-sm font-medium text-slate-900">
              <div
                className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${
                  rating === "1" ? "bg-gray" : "bg-white"
                }`}
                onClick={() => setRating("1")}
              >
                <div className="self-stretch my-auto">1</div>
                <div>
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                      fill="#F8B84E"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${
                  rating === "2" ? "bg-gray" : "bg-white"
                }`}
                onClick={() => setRating("2")}
              >
                <div className="self-stretch my-auto">+2</div>
                <div>
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                      fill="#F8B84E"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${
                  rating === "3" ? "bg-gray" : "bg-white"
                }`}
                onClick={() => setRating("3")}
              >
                <div className="self-stretch my-auto">+3</div>
                <div>
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                      fill="#F8B84E"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${
                  rating === "4" ? "bg-gray" : "bg-white"
                }`}
                onClick={() => setRating("4")}
              >
                <div className="self-stretch my-auto">+4</div>
                <div>
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                      fill="#F8B84E"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${
                  rating === "5" ? "bg-gray" : "bg-white"
                }`}
                onClick={() => setRating("5")}
              >
                <div className="self-stretch my-auto">+5</div>
                <div>
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                      fill="#F8B84E"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Btn Submit */}
          <button
            type="submit"
            className=" flex overflow-hidden gap-1 justify-center items-center px-4 py-0 mt-6 w-full text-base font-medium tracking-wide text-white whitespace-nowrap border border-solid bg-primary border-primary min-h-[64px] rounded-[64px] cursor-pointer"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M21.9999 19.4199L18.8299 16.4199C18.2272 17.1959 17.5049 17.871 16.6899 18.4199L19.9499 21.5199C20.087 21.68 20.2565 21.8092 20.4472 21.899C20.6379 21.9887 20.8455 22.037 21.0562 22.0406C21.267 22.0442 21.4761 22.0031 21.6697 21.9199C21.8634 21.8368 22.0372 21.7135 22.1797 21.5581C22.3222 21.4028 22.4301 21.2191 22.4963 21.019C22.5625 20.8189 22.5855 20.607 22.5638 20.3973C22.5421 20.1877 22.4762 19.985 22.3703 19.8028C22.2645 19.6205 22.1212 19.4627 21.9499 19.3399L21.9999 19.4199Z"
                fill="white"
              />
              <path
                d="M11.64 2C9.85999 2 8.11993 2.52784 6.63989 3.51677C5.15984 4.50571 4.00629 5.91131 3.3251 7.55585C2.64391 9.20038 2.46568 11.01 2.81295 12.7558C3.16022 14.5016 4.01739 16.1053 5.27606 17.364C6.53473 18.6226 8.13838 19.4798 9.88421 19.8271C11.63 20.1743 13.4396 19.9961 15.0842 19.3149C16.7287 18.6337 18.1343 17.4802 19.1232 16.0001C20.1122 14.5201 20.64 12.78 20.64 11C20.64 8.61305 19.6918 6.32387 18.004 4.63604C16.3162 2.94821 14.027 2 11.64 2ZM11.64 17.36C10.3845 17.36 9.15722 16.9878 8.11319 16.2905C7.06915 15.5932 6.25526 14.6021 5.77435 13.4423C5.29344 12.2826 5.1671 11.0064 5.41131 9.77485C5.65552 8.54335 6.2593 7.41187 7.14637 6.52341C8.03343 5.63495 9.16396 5.02938 10.3951 4.78324C11.6262 4.53709 12.9027 4.66142 14.0631 5.1405C15.2236 5.61958 16.216 6.43192 16.915 7.47486C17.6139 8.51779 17.988 9.74452 17.99 11C17.9927 11.8351 17.8303 12.6625 17.5122 13.4347C17.1942 14.2068 16.7267 14.9086 16.1366 15.4995C15.5466 16.0905 14.8456 16.5591 14.0739 16.8784C13.3023 17.1976 12.4751 17.3613 11.64 17.36V17.36Z"
                fill="white"
              />
            </svg>

            <div className="self-stretch my-auto text-white">
              {UN("searchBtn")}
            </div>
          </button>
        </form>
      </aside>
    </>
  );
}

export default AsideFilteration;
