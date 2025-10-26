"use client";
import BannerSection from "@/app/_components/BannerSection";
import HeadTittle from "@/app/_components/HeadTittle";
import Loader from "@/app/_components/Loader";
import Pagination from "@/app/_components/Pagination";
import SearchNotFound from "@/app/_components/SearchNotFound";
import Spinner from "@/app/_components/Spinner";
import useCleanPath from "@/app/_hooks/useCleanPath";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { getAllCities } from "@/app/reduxTool-kit/slices/citiesSlice";
import { getAllCountries } from "@/app/reduxTool-kit/slices/countriesSlice";
import { getAllLanguageSchools } from "@/app/reduxTool-kit/slices/languageSchoolsSlice";
import { getAllStates } from "@/app/reduxTool-kit/slices/statesSlice";
import { AppDispatch } from "@/app/store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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

function Institute() {
  const t = useTranslations("languageSchool");
  const f = useTranslations("filtration");

  // Routing
  const pathname = usePathname();
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();
  const { cleanPath } = useCleanPath();
  const { tokenMainSite } = parseCookies();
  // translate
  const language = useCurrentLang();
  const IN = useTranslations("languageSchool");
  const UN = useTranslations("Universities");
  const trFilter = useTranslations("newHome");
  const cardINS = useTranslations("institutesCard");

  // States
  const [hideFilter, setHideFilter] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [recommended, setRecommended] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [loadingStates, setLoadingStates] = useState(new Map());
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
  const dropdownRef = useRef<HTMLFormElement>(null);
  // Selector
  const languageSchools = useSelector((state: any) => state.languageSchools);
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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [limit, setLimit] = useState<number>(12);

  //  Handle Submtion Filteration
  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    console.log(searchValue);
    if (searchValue || selectedCountry || selectedState || selectedCity || selectedLanguage || recommended) {
      const formateData = {
        search: searchValue,
        country: selectedCountry?.id,
        state: selectedState?.id,
        city: selectedCity?.id,
        languageStudy: selectedLanguage,
        language: language,
        recommended: recommended,
        limt: limit || 10,
        page: currentPage || 1
      };

      dispatch(getAllLanguageSchools(formateData));
      setLimit(10);
      setCurrentPage(1);
      scrollToTop();
    } else {
      toast.error(UN("errorMessage"));
      return
    }




  };



  // subscribe
  const subscribe = async (schoolId: number) => {
    setLoadingStates((prev) => new Map(prev).set(schoolId, true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
            Authorization: `Bearer ${tokenMainSite}`,
          },
          body: JSON.stringify({
            userId: user.id,
            targetId: schoolId,
            targetType: "INSTITUTE",
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      dispatch(
        getAllLanguageSchools({
          language,
          recommended: recommended,
          limt: limit,
          userId: user.id,
        })
      );
      toast.success(cardINS("addSubscribe"));
    } catch (error: any) {
      toast.error(error.message, {
        toastId: "error1",
      });
      setError(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(schoolId, false));
    }
  };

  // unSubscribe
  const unSubscribe = async (schoolId: number) => {
    setLoadingStates((prev) => new Map(prev).set(schoolId, true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/unsubscribe`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
            Authorization: `Bearer ${tokenMainSite}`,
          },
          body: JSON.stringify({
            userId: user.id,
            targetId: schoolId,
            targetType: "INSTITUTE",
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      dispatch(
        getAllLanguageSchools({
          language,
          recommended: recommended,
          limt: limit,
          userId: user.id,
        })
      );
      toast.success(cardINS("removeSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(schoolId, false));
    }
  };
  // HideFilter
  const hideFilteration = (checkHideFilter: boolean) => {
    setHideFilter(checkHideFilter);
    localStorage.setItem("filterKey", JSON.stringify(checkHideFilter));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 400,
      left: 100,
      behavior: "smooth",
    });
  }

  // Handle change page Pagination
  const handlePageChange = (newPage: any) => {
    if (hasMoreData && newPage !== currentPage) {
      setCurrentPage(newPage);
      scrollToTop();
    }
    dispatch(
      getAllLanguageSchools({
        search: searchValue,
        country: selectedCountry?.id,
        state: selectedState?.id,
        city: selectedCity?.id,
        languageStudy: selectedLanguage,
        limt: limit,
        language: language,
        page: newPage,
        recommended: recommended,
        rating: rating,
      })
    );
  };
  useEffect(() => {
    const searchResult = localStorage.getItem("searchResult");
    const searchValue = searchResult ? JSON.parse(searchResult) : null;

    if (!searchValue) {
      dispatch(
        getAllLanguageSchools({
          page: currentPage,
          language,
          recommended: recommended,
          limt: limit,
        })
      );
    } else {
      const { country, state, city, search, languageStudy } = searchValue;
      const row = {
        language: language,
        search: search,
        country: country,
        state: state,
        city: city,
        languageStudy: languageStudy,
      };
      dispatch(getAllLanguageSchools(row));
      setTimeout(() => localStorage.removeItem("searchResult"), 3000);
    }
  }, [dispatch, language]);

  //  Handle Submit By Enter Key
  useEffect(() => {
    const filterValue = localStorage.getItem("filterKey");
    if (filterValue !== null) {
      setHideFilter(JSON.parse(filterValue));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (
          selectedCountry ||
          selectedCity ||
          selectedLanguage ||
          selectedState ||
          searchValue ||
          rating ||
          recommended
        ) {
          handleSubmit(e);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedCountry,
    selectedLanguage,
    selectedCity,
    selectedState,
    searchValue,
    rating,
    recommended,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
        setIsStateOpen(false)
        setIsCityOpen(false)
        setIsLanguageOpen(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <BannerSection
        head={t("head")}
        breadcrumb={t("head")}
        urlImage="/images/BannerInstitute.png"
      />
      <HeadTittle
        head={t("head")}
        headLine={t("subHead")}
        summary={t("subHeadTwo")}
      />

      <section className="bg-[#FAFAFA] pb-10 px-5 lg:px-10 xl:px-28">
        {/* Show Filteration */}
        {!hideFilter && (
          <button
            onClick={() => hideFilteration(true)}
            className="bg-[#F89A21]/20  text-[.5rem,0.91vw,3rem] flex items-center gap-4 py-2 px-6 mb-10 rounded-xl text-nowrap ms-auto"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4753 9.16797C13.0736 9.16797 11.1211 11.1205 11.1211 13.5221C11.1211 14.338 11.3503 15.108 11.7536 15.768C12.5053 17.033 13.8894 17.8763 15.4753 17.8763C17.0611 17.8763 18.4453 17.0238 19.1969 15.768C19.6003 15.1171 19.8294 14.338 19.8294 13.5221C19.8294 11.1205 17.8861 9.16797 15.4753 9.16797ZM17.1069 14.1913H16.1628V15.1721C16.1628 15.548 15.8511 15.8596 15.4753 15.8596C15.0994 15.8596 14.7878 15.548 14.7878 15.1721V14.1913H13.8528C13.4769 14.1913 13.1653 13.8796 13.1653 13.5038C13.1653 13.128 13.4769 12.8163 13.8528 12.8163H14.7878V11.918C14.7878 11.5421 15.0994 11.2305 15.4753 11.2305C15.8511 11.2305 16.1628 11.5421 16.1628 11.918V12.8163H17.1069C17.4828 12.8163 17.7944 13.128 17.7944 13.5038C17.7944 13.8796 17.4828 14.1913 17.1069 14.1913Z"
                fill="#F89A21"
              />
              <path
                d="M18.8667 3.6837V5.7187C18.8667 6.4612 18.4084 7.38703 17.9501 7.85453L17.7851 8.0012C17.6567 8.12036 17.4642 8.14786 17.2992 8.09286C17.1159 8.0287 16.9326 7.98286 16.7492 7.93703C16.3459 7.8362 15.9151 7.79036 15.4751 7.79036C12.3126 7.79036 9.74589 10.357 9.74589 13.5195C9.74589 14.5645 10.0301 15.5912 10.5709 16.4712C11.0292 17.2412 11.6709 17.8829 12.3676 18.3137C12.5784 18.4512 12.6609 18.7445 12.4776 18.9095C12.4134 18.9645 12.3492 19.0104 12.2851 19.0562L11.0017 19.8904C9.81005 20.6329 8.16922 19.7987 8.16922 18.3137V13.4095C8.16922 12.7587 7.80255 11.9245 7.43588 11.4662L3.96172 7.76286C3.50339 7.29536 3.13672 6.4612 3.13672 5.9112V3.77536C3.13672 2.6662 3.96172 1.83203 4.96089 1.83203H17.0426C18.0417 1.83203 18.8667 2.6662 18.8667 3.6837Z"
                fill="#F89A21"
                fill-opacity="0.5"
              />
            </svg>
            {f("showFilter")}
          </button>
        )}
        <div className=" flex flex-col md:flex-row gap-4 items-start">
          {/* Left Side Is A Filteration */}
          {hideFilter && (
            <aside className="bg-[#FFFFFF] rounded-2xl border border-[#EEEEEE] p-6 w-full md:w-[40%]">
              {/* Heading */}
              <div className="flex items-center justify-between">
                <h2 className="text-[#1B1B1B] text-base md:text-lg font-bold ">
                  {IN("searchForSchool")}
                </h2>
                <button
                  onClick={() => hideFilteration(false)}
                  className="text-[#F89A21]"
                >
                  {f("hideFilter")}
                </button>
              </div>
              <hr className="my-5 text-[#eee] " />
              <form
                onSubmit={(eve) => {
                  handleSubmit(eve);
                }}
                className="flex flex-col gap-4"
                ref={dropdownRef}
              >
                {/* Filter By Name */}
                <div className=" flex flex-col gap-2">
                  <div className="relative">
                    {!searchValue ? <>
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
                    </> : <>
                      <svg
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(getAllLanguageSchools({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, studyLanguage: selectedLanguage, language, recommended, limt: 10, page: 1 }));
                          setSearchValue("");
                          setSelectedCountry(undefined);
                          setSelectedState(undefined);
                          setSelectedCity(undefined);
                          setCurrentPage(1);
                          setLimit(10);
                          scrollToTop();
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </>}
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
                      const currentCountryLang =
                        langCountryRef.current !== language;
                      if (
                        !countries?.countries?.length ||
                        currentCountryLang
                      ) {
                        dispatch(getAllCountries({ language, entity: "institutes" }));
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
                    {selectedCountry?.name ?
                      <>
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(getAllLanguageSchools({ state: "", city: "", studyLanguage: selectedLanguage, language, recommended, limt: 10, page: 1 }));
                            setSelectedCountry(undefined);
                            setSelectedState(undefined);
                            setSelectedCity(undefined);
                            setCurrentPage(1);
                            setLimit(10);
                            scrollToTop();
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </>
                      :
                      <>
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
                      </>
                    }
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
                                dispatch(getAllLanguageSchools({ search: searchValue, country: country.id, state: selectedState?.id, city: selectedCity?.id, languageStudy: selectedLanguage, language, recommended, limt: 10, page: 1 }));
                                dispatch(getAllStates({ language: language, countryId: country?.id, }));
                                setSearchCountry("");
                                setCurrentPage(1);
                                setLimit(10);
                                scrollToTop();
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
                    {selectedState?.name ? <>
                      <>
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, languageStudy: selectedLanguage, language, recommended, limt: 10, page: 1 }));
                            setSelectedState(undefined)
                            setSelectedCity(undefined)
                            setCurrentPage(1)
                            setLimit(10)
                            scrollToTop();
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </>
                    </> : <>
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
                    </>}

                  </div>
                  {isStateOpen && (
                    <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      {/* حقل البحث */}
                      <div className="px-4 py-2">
                        <input
                          type="text"
                          placeholder={trFilter("searchFiltersDrd7")}
                          value={searchState}
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
                                setCurrentPage(1)
                                setLimit(10)
                                dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: state?.id, city: selectedCity?.id, languageStudy: selectedLanguage, language, recommended, limt: 10, page: 1 }));
                                dispatch(getAllCities({ language: language, countryId: selectedCountry?.id, stateId: state?.id, }));
                                scrollToTop();
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
                    {trFilter("searchFiltersDrd3")}
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
                    {selectedCity?.name ? <>
                      <>
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, languageStudy: selectedLanguage, language, recommended, limt: 10, page: 1 }));
                            setSelectedCity(undefined)
                            setCurrentPage(1)
                            setLimit(10);
                            scrollToTop();
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </>
                    </> : <>
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
                    </>}
                  </div>
                  {isCityOpen && (
                    <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      {/* حقل البحث */}
                      <div className="px-4 py-2">
                        <input
                          type="text"
                          placeholder={trFilter("searchFiltersDrd11")}
                          value={searchCity}
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
                                setCurrentPage(1)
                                setLimit(10)
                                dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, city: city?.id, languageStudy: selectedLanguage, language, recommended, limt: 10, page: 1 }));
                                scrollToTop();
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
                    {selectedLanguage ? <>
                      <>
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, languageStudy: "", language, recommended, limt: 10, page: 1 }));
                            setSelectedLanguage("");
                            setCurrentPage(1);
                            setLimit(10);
                            scrollToTop();
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </>
                    </> : <>
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
                    </>}
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
                              setCurrentPage(1)
                              setLimit(10)
                              dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, languageStudy: lang, language, recommended, limt: 10, page: 1 }));
                              scrollToTop();
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
                              setCurrentPage(1)
                              setLimit(10)
                              dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, languageStudy: lang, language, recommended, limt: 10, page: 1 }));
                              scrollToTop();
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
                <div className="flex overflow-hidden flex-col pb-4 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
                  <div className="text-base font-bold text-zinc-900">
                    {UN("recommendFilter")}
                  </div>
                  <div className="flex gap-3 items-center self-start mt-2 text-sm font-medium text-slate-900">
                    <div
                      className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto rounded-lg border border-solid  max-md:px-5 cursor-pointer
                              ${recommended === ""
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-zinc-100 text-black"
                        }`}
                      onClick={() => {
                        if (recommended !== "") {

                          setRecommended("")
                          dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, languageStudy: selectedLanguage, language, recommended: "", limt: 10, page: 1 }));
                          setSelectedCountry(undefined);
                          setSelectedState(undefined);
                          setSelectedCity(undefined);
                          setSelectedLanguage("");
                          setCurrentPage(1);
                          setLimit(10);
                          scrollToTop();
                        }
                      }}
                    >
                      {UN("all")}
                    </div>
                    <div
                      className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto rounded-lg border border-solid max-md:px-5 cursor-pointer 
                              ${recommended === "true"
                          ? "bg-primary border-primary text-white "
                          : "bg-white border-zinc-100 text-black"
                        }`}
                      onClick={() => {
                        if (recommended !== "true") {

                          setRecommended("true")
                          setCurrentPage(1)
                          setLimit(10)
                          dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, languageStudy: selectedLanguage, language, recommended: "true", limt: 10, page: 1 }));
                          scrollToTop();
                        }
                      }}
                    >
                      {UN("recommendFilter")}
                    </div>
                  </div>
                </div>
                {/* Rating */}
                {/* <div className="flex overflow-hidden flex-col pb-4 mt-6 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
                  <div className="text-base font-bold text-zinc-900">
                    {UN("rating")}
                  </div>
                  <div className="flex flex-wrap gap-1 items-center mt-2 w-full text-sm font-medium text-slate-900">
                    <div
                      className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "1" ? "bg-gray" : "bg-white"
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
                      className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "2" ? "bg-gray" : "bg-white"
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
                      className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "3" ? "bg-gray" : "bg-white"
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
                      className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "4" ? "bg-gray" : "bg-white"
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
                      className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "5" ? "bg-gray" : "bg-white"
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
                </div> */}

                {/* Btn Submit */}
                <button
                  type="submit"
                  className=" flex overflow-hidden gap-1 justify-center items-center px-4 py-0 w-full text-base font-medium tracking-wide text-white whitespace-nowrap border border-solid bg-primary border-primary min-h-[50px] rounded-[64px] cursor-pointer"
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
          )}
          {/* Display Data Institute */}
          <div className="flex flex-col justify-between gap-10 w-full">
            {languageSchools.loading && <Loader />}
            {!languageSchools.loading && (
              <>
                {languageSchools?.languageSchools?.data?.length > 0 ? (
                  <div
                    className={`grid ${hideFilter ? "lg:grid-cols-2" : "lg:grid-cols-3"
                      } gap-4 transition-all duration-300 `}
                  >
                    {languageSchools?.languageSchools?.data?.map(
                      (langSchool: any) => {
                        return (
                          <div
                            key={langSchool.id}
                            className="bg-white border border-[#EEEEEE] rounded-3xl p-3 xl:p-4 flex flex-col justify-between overflow-hidden "
                          >
                            {/* Header Card */}
                            <div className="flex items-center gap-5 ">
                              <div className="border border-[#EEEEEE] rounded-2xl w-auto aspect-square flex items-center justify-center relative ">
                                {langSchool.logo ? (
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                      }/${cleanPath(langSchool.logo)}`}
                                    alt={
                                      langSchool.name
                                        ? `${langSchool.name} logo`
                                        : "School logo"
                                    }
                                    width={130}
                                    height={130}
                                    loading="lazy"
                                  />
                                ) : (
                                  <Image
                                    loading="lazy"
                                    alt="university"
                                    src={"/images/university.png"}
                                    fill={true}
                                    className="object-cover absolute inset-0 size-full"
                                  />
                                )}
                                {/*  */}
                                {langSchool.offer != 0 && (
                                  <div
                                    className="bg-[#ECFDF3] text-xs absolute top-[8px]  text-[#085D3A] flex items-center gap-2 px-2 py-1 rounded-lg overflow-hidden">
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="5"
                                        cy="5"
                                        r="5"
                                        fill="#085D3A"
                                      />
                                    </svg>

                                    {UN("offerLabel", { percentage: langSchool.offer })}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-3">
                                <p className="flex gap-1 border border-[#eee] w-fit px-1 py-[2px] rounded-md relative">
                                  {langSchool.countries
                                    ?.slice(0, 3)
                                    .map((itemImg: any, index: number) => (
                                      <Image
                                        key={index}
                                        src={`${process.env
                                          .NEXT_PUBLIC_BASE_PHOTO_URL
                                          }/${cleanPath(itemImg.logo)}`}
                                        alt="Country Logo"
                                        width={20}
                                        height={20}
                                      />
                                    ))}

                                  {langSchool.countries?.length > 3 && (
                                    <div className="relative group">
                                      <div className="w-[25px] flex items-center justify-center bg-gray-200 rounded text-sm font-bold cursor-pointer">
                                        +{langSchool.countries.length - 3}
                                      </div>

                                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                                        {cardINS("moreCountry")}
                                      </div>
                                    </div>
                                  )}
                                </p>
                                {/* rating */}
                                {/* <p className="flex items-center gap-1">
                                    {langSchool.rating}
                                    <span className="flex  items-center ">
                                      {[...Array(5)].map((_, index) => {
                                        const currentRate = index + 1;
                                        const isActive =
                                          langSchool.rating >= currentRate;
                                        return (
                                          <svg
                                            key={index}
                                            width="18"
                                            height="15"
                                            viewBox="0 0 30 27"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M14.2613 0.576726C14.5346 -0.0803083 15.4654 -0.0803101 15.7387 0.576724L19.0444 8.52469C19.1596 8.80168 19.4201 8.99093 19.7191 9.01491L28.2996 9.7028C29.0089 9.75967 29.2966 10.6449 28.7561 11.1078L22.2187 16.7078C21.9909 16.903 21.8914 17.2092 21.961 17.501L23.9583 25.8741C24.1234 26.5663 23.3704 27.1134 22.7631 26.7425L15.417 22.2555C15.161 22.0991 14.839 22.0991 14.583 22.2555L7.2369 26.7425C6.62962 27.1134 5.87661 26.5663 6.04172 25.8741L8.03902 17.501C8.10862 17.2092 8.00913 16.903 7.78129 16.7078L1.24386 11.1078C0.703432 10.6449 0.991051 9.75967 1.70037 9.7028L10.2809 9.01491C10.5799 8.99093 10.8404 8.80168 10.9556 8.52469L14.2613 0.576726Z"
                                              fill={
                                                isActive ? "#FDB022" : "#F0F0F0"
                                              }
                                            />
                                          </svg>
                                        );
                                      })}
                                    </span>
                                  </p> */}
                                <p className="flex items-center gap-1 text-nowrap">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 3.92969C15.3515 3.92969 18.5878 5.8975 20.8281 9.41797C21.2659 10.1052 21.4999 11.0391 21.5 11.998C21.5 12.9573 21.2661 13.8887 20.8291 14.5703L20.8281 14.5713C19.7039 16.335 18.3361 17.7078 16.8281 18.6436C15.3201 19.5693 13.6799 20.0596 12 20.0596C8.64787 20.0596 5.41172 18.1007 3.17188 14.5713L3.01758 14.3018C2.67958 13.65 2.50006 12.8327 2.5 11.9951C2.5 11.0376 2.73395 10.1055 3.17188 9.41797C4.29649 7.65362 5.66424 6.2795 7.17285 5.34375C8.68046 4.41861 10.3207 3.92969 12 3.92969ZM12 7.45996C9.48305 7.45996 7.45996 9.49466 7.45996 12C7.46013 14.5052 9.48316 16.54 12 16.54C14.5168 16.54 16.5399 14.5052 16.54 12C16.54 9.49466 14.5169 7.45996 12 7.45996Z"
                                      stroke="#F89A21"
                                    />
                                    <path
                                      d="M11.998 9.64062C13.2919 9.64062 14.3584 10.7071 14.3584 12.001C14.3582 13.2924 13.2941 14.3506 11.998 14.3506C10.7045 14.3504 9.64863 13.2945 9.64844 12.001C9.64844 10.6961 10.7055 9.64084 11.998 9.64062Z"
                                      stroke="#F89A21"
                                    />
                                  </svg>
                                  {langSchool.visites}{" "}
                                  {cardINS("viewsLable1")}
                                </p>
                                {langSchool.recommend && (
                                  <div
                                    className={`flex items-center gap-2 rounded-lg ${language === "ar" ? "right-0" : "left-0"
                                      } top-0`}
                                  >
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="#FBCC90"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.2 21.02L12 17.77L5.8 21.02L7 
  14.14L2 9.27L9.1 8.26L12 2Z" />
                                    </svg>

                                    {UN("recommendFilter") || "Recommended"}
                                  </div>
                                )}


                              </div>
                            </div>
                            {/* Body Card*/}
                            <hgroup className="text-zinc-900 my-4">
                              <h2 className="line-clamp-1 whitespace-nowrap text-ellipsis overflow-hidden text-base md:text-lg font-bold text-zinc-900">
                                {langSchool.name}
                              </h2>
                              <p className="text-sm md:text-base tracking-wide leading-6 text-zinc-900 line-clamp-2 ">
                                {langSchool.description}
                              </p>
                            </hgroup>
                            <div className="flex items-center justify-between px-0 py-4 border-t border-solid border-t-zinc-100">
                              <div className="flex gap-2 items-center ">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2 22H22"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17 2H7C4 2 3 3.79 3 6V22H21V6C21 3.79 20 2 17 2Z"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7 16.5H10"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14 16.5H17"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7 12H10"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14 12H17"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7 7.5H10"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14 7.5H17"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                {langSchool.number_of_branches}{" "}
                                {cardINS("cardFoterIns3")}
                              </div>
                              <div className="flex gap-2 items-center ">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21.6602 10.4385L20.6802 14.6185C19.8402 18.2285 18.1802 19.6885 15.0602 19.3885C14.5602 19.3485 14.0202 19.2585 13.4402 19.1185L11.7602 18.7185C7.59018 17.7285 6.30018 15.6685 7.28018 11.4885L8.26018 7.29854C8.46018 6.44854 8.70018 5.70854 9.00018 5.09854C10.1702 2.67854 12.1602 2.02854 15.5002 2.81854L17.1702 3.20854C21.3602 4.18854 22.6402 6.25854 21.6602 10.4385Z"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M15.0584 19.3916C14.4384 19.8116 13.6584 20.1616 12.7084 20.4716L11.1284 20.9916C7.15839 22.2716 5.06839 21.2016 3.77839 17.2316L2.49839 13.2816C1.21839 9.31156 2.27839 7.21156 6.24839 5.93156L7.82839 5.41156C8.23839 5.28156 8.62839 5.17156 8.99839 5.10156C8.69839 5.71156 8.45839 6.45156 8.25839 7.30156L7.27839 11.4916C6.29839 15.6716 7.58839 17.7316 11.7584 18.7216L13.4384 19.1216C14.0184 19.2616 14.5584 19.3516 15.0584 19.3916Z"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12.6406 8.53125L17.4906 9.76125"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.6602 12.3984L14.5602 13.1384"
                                    stroke="#F89A21"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                {langSchool.number_of_courses}{" "}
                                {cardINS("cardFoterIns2")}
                              </div>
                            </div>
                            {/* Footer Card */}
                            <div className="flex items-center justify-between gap-3">
                              {loadingStates.get(langSchool.id) && (
                                <Spinner />
                              )}
                              {!loadingStates.get(langSchool.id) && (
                                <>
                                  <Link
                                    href={`/${language}/language-schools/${langSchool.id}`}
                                    className="text-white bg-[#365D8D] text-[clamp(.8rem,1vw,4rem)] rounded-full px-1 py-2 md:px-4 md:py-3 text-nowrap flex justify-center items-center gap-2 w-full"
                                  >
                                    {cardINS("cardButtonins")}
                                    {language == "en" ? (
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697"
                                          stroke="white"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M3.5 12H20.33"
                                          stroke="white"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                        />
                                      </svg>
                                    )}
                                  </Link>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                      if (tokenMainSite && user.id) {
                                        if (langSchool.is_notified) {
                                          unSubscribe(langSchool.id);
                                        } else if (!langSchool.is_notified) {
                                          subscribe(langSchool.id);
                                          [];
                                        }
                                      } else {
                                        toast.error(cardINS("messageError"));
                                      }
                                    }}
                                  >
                                    {langSchool.is_notified ? (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 56 56"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28C0.5 12.8122 12.8122 0.5 28 0.5Z"
                                          stroke="#F89A21"
                                        />
                                        <path
                                          d="M28.0203 18.5498C31.3635 18.55 34.0897 21.2756 34.0897 24.6299V26.5C34.0897 26.8024 34.157 27.1686 34.2498 27.501C34.3423 27.8318 34.4746 28.1779 34.6317 28.4365V28.4375L35.7615 30.3174C36.0943 30.8788 36.157 31.5389 35.9324 32.1426C35.7333 32.6689 35.3424 33.095 34.8279 33.335L34.6004 33.4258C33.6763 33.7337 32.7316 33.9818 31.7791 34.1562L31.3709 34.2256L31.3602 34.2275C31.2466 34.2482 31.1588 34.2638 31.075 34.2715L31.0565 34.2734L31.0379 34.2764L30.5252 34.3428L30.5125 34.3447C30.4095 34.3588 30.3035 34.3701 30.1942 34.3809L29.8563 34.4121H29.8514C29.2479 34.4705 28.6343 34.5 28.0203 34.5C27.5521 34.5 27.0837 34.4831 26.6199 34.4502L26.157 34.4121L26.1473 34.4111L25.7684 34.376L25.3963 34.3252L25.3865 34.3242L24.951 34.2646H24.95C24.8894 34.2541 24.8311 34.2458 24.783 34.2393L24.6395 34.2178L24.6346 34.2168L23.8221 34.0645C23.1485 33.9256 22.4831 33.7573 21.8231 33.5527L21.4285 33.4258L21.4246 33.4238L21.1844 33.332C20.7211 33.1238 20.363 32.7807 20.1522 32.3682L20.0594 32.1562L20.0584 32.1543L19.993 31.9395C19.8704 31.4274 19.9622 30.845 20.2811 30.3037L20.2801 30.3027L21.409 28.4277L21.4119 28.4229C21.5621 28.1663 21.6907 27.8199 21.782 27.4883C21.8731 27.1573 21.9402 26.7922 21.9402 26.4902V24.6299C21.9402 21.2776 24.6646 18.5596 28.0203 18.5498ZM27.9901 21.6396C27.294 21.6396 26.7305 22.2035 26.7303 22.8994V26C26.7304 26.6961 27.294 27.2598 27.9901 27.2598C28.6861 27.2597 29.2497 26.696 29.2498 26V22.8994C29.2496 22.2035 28.686 21.6397 27.9901 21.6396Z"
                                          fill="#F89A21"
                                          stroke="#F89A21"
                                        />
                                        <path
                                          d="M26.2464 36.627V36.6279C26.8282 36.679 27.4229 36.71 28.0198 36.71C28.4604 36.71 28.8998 36.6924 29.3333 36.6621L29.764 36.6279H29.7679C29.8102 36.6239 29.8569 36.6192 29.9066 36.6152C29.4454 37.1563 28.7619 37.4999 28.0003 37.5C27.3414 37.5 26.6922 37.2318 26.2396 36.7627L26.222 36.7451L26.1302 36.6523C26.1183 36.6395 26.1076 36.6255 26.096 36.6123C26.146 36.6172 26.1961 36.6227 26.2464 36.627Z"
                                          fill="#F89A21"
                                          stroke="#F89A21"
                                        />
                                        <rect
                                          x="30.5"
                                          y="16.5"
                                          width="9"
                                          height="9"
                                          rx="4.5"
                                          fill="#C30734"
                                        />
                                        <rect
                                          x="30.5"
                                          y="16.5"
                                          width="9"
                                          height="9"
                                          rx="4.5"
                                          stroke="white"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 56 56"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g opacity="0.5">
                                          <path
                                            d="M28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28C0.5 12.8122 12.8122 0.5 28 0.5Z"
                                            stroke="#F89A21"
                                          />
                                          <path
                                            d="M28.0203 18.5498C31.3635 18.55 34.0896 21.2756 34.0896 24.6299V26.5C34.0897 26.8024 34.1569 27.1686 34.2498 27.501C34.3422 27.8318 34.4746 28.1779 34.6316 28.4365V28.4375L35.7615 30.3174C36.0943 30.8788 36.157 31.5389 35.9324 32.1426C35.7333 32.6689 35.3424 33.095 34.8279 33.335L34.6004 33.4258C33.6763 33.7337 32.7315 33.9818 31.7791 34.1562L31.3709 34.2256L31.3601 34.2275C31.2465 34.2482 31.1588 34.2638 31.075 34.2715L31.0564 34.2734L31.0379 34.2764L30.5252 34.3428L30.5125 34.3447C30.4095 34.3588 30.3034 34.3701 30.1941 34.3809L29.8562 34.4121H29.8513C29.2479 34.4705 28.6343 34.5 28.0203 34.5C27.552 34.5 27.0836 34.4831 26.6199 34.4502L26.157 34.4121L26.1472 34.4111L25.7683 34.376L25.3963 34.3252L25.3865 34.3242L24.951 34.2646H24.95C24.8893 34.2541 24.831 34.2458 24.783 34.2393L24.6394 34.2178L24.6346 34.2168L23.8221 34.0645C23.1485 33.9256 22.483 33.7573 21.823 33.5527L21.4285 33.4258L21.4246 33.4238L21.1844 33.332C20.7211 33.1238 20.363 32.7807 20.1521 32.3682L20.0594 32.1562L20.0584 32.1543L19.993 31.9395C19.8704 31.4274 19.9622 30.845 20.281 30.3037L20.2801 30.3027L21.409 28.4277L21.4119 28.4229C21.5621 28.1663 21.6907 27.8199 21.782 27.4883C21.8731 27.1573 21.9402 26.7922 21.9402 26.4902V24.6299C21.9402 21.2776 24.6646 18.5596 28.0203 18.5498ZM27.99 21.6396C27.294 21.6396 26.7305 22.2035 26.7303 22.8994V26C26.7304 26.6961 27.2939 27.2598 27.99 27.2598C28.6861 27.2597 29.2497 26.696 29.2498 26V22.8994C29.2496 22.2035 28.686 21.6397 27.99 21.6396Z"
                                            fill="#F89A21"
                                            stroke="#F89A21"
                                          />
                                          <path
                                            d="M26.2464 36.627V36.6279C26.8282 36.679 27.4229 36.71 28.0198 36.71C28.4604 36.71 28.8998 36.6924 29.3333 36.6621L29.764 36.6279H29.7679C29.8102 36.6239 29.8569 36.6192 29.9066 36.6152C29.4454 37.1563 28.7619 37.4999 28.0003 37.5C27.3414 37.5 26.6922 37.2318 26.2396 36.7627L26.222 36.7451L26.1302 36.6523C26.1183 36.6395 26.1076 36.6255 26.096 36.6123C26.146 36.6172 26.1961 36.6227 26.2464 36.627Z"
                                            fill="#F89A21"
                                            stroke="#F89A21"
                                          />
                                        </g>
                                      </svg>
                                    )}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <SearchNotFound head="Language Schools" />
                )}
              </>
            )}

            {/* Pagination */}
            {pathname !== `/${language}` &&
              languageSchools?.languageSchools?.data?.length > 0 && (
                <div className=" flex flex-col md:flex-row gap-5 justify-between items-center my-5 ">
                  <div>
                    <Pagination
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      disableNext={!hasMoreData}
                      numberOfPages={languageSchools?.languageSchools?.pages}
                    />
                  </div>

                  <div className="flex flex-row gap-2 items-center text-sm leading-none text-zinc-900">
                    <div className="self-stretch my-auto text-zinc-900 line-clamp-1 leading-6">
                      {UN("pagination")}
                    </div>
                    <div>
                      <select
                        name="limit"
                        value={limit}
                        onChange={(e: any) => {
                          setLimit(e.target.value);
                          dispatch(getAllLanguageSchools({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, languageStudy: selectedLanguage, language, recommended, limt: e.target.value, page: currentPage }))
                        }}
                        className="flex gap-2 justify-center items-center px-2 py-1 my-auto bg-white rounded border border-gray"
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>
    </main >
  );
}

export default Institute;
