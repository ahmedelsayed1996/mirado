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
import { getAllFields } from "@/app/reduxTool-kit/slices/fieldSlice";
import { getAllMajors } from "@/app/reduxTool-kit/slices/majorSlice";
import { getAllStates } from "@/app/reduxTool-kit/slices/statesSlice";
import { getAllUniversities } from "@/app/reduxTool-kit/slices/universitiesSlice";
import { AppDispatch } from "@/app/store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const FillStar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.10404 0.999957C6.24269 0.722666 6.46606 0.584019 6.77416 0.584019C7.08226 0.584019 7.30564 0.722666 7.44428 0.999957L8.94628 4.05017L12.32 4.55853C12.6281 4.58934 12.8284 4.7511 12.9208 5.04379C13.0132 5.33649 12.9516 5.59067 12.7359 5.80635L10.2865 8.18643L10.8642 11.5601C10.9104 11.8528 10.8103 12.0878 10.5638 12.2649C10.3173 12.4421 10.0632 12.4613 9.80126 12.3227L6.77416 10.7514L3.74706 12.3227C3.48518 12.4768 3.23099 12.4613 2.98451 12.2765C2.73803 12.0916 2.6379 11.8528 2.68411 11.5601L3.2618 8.18643L0.812392 5.80635C0.596721 5.59067 0.535101 5.33649 0.627531 5.04379C0.719962 4.7511 0.920228 4.58934 1.22833 4.55853L4.60205 4.05017L6.10404 0.999957Z"
      fill="#FFCC00"
    />
  </svg>
);
const SolidStar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.2106 4.55853C12.5187 4.58934 12.719 4.7511 12.8114 5.04379C12.9039 5.33649 12.8422 5.59067 12.6266 5.80635L10.1771 8.18643L10.7548 11.5601C10.8011 11.8528 10.7009 12.0878 10.4544 12.2649C10.208 12.4421 9.95378 12.4613 9.69189 12.3227L6.66479 10.7514L3.63769 12.3227C3.3758 12.4768 3.12162 12.4613 2.87514 12.2765C2.62865 12.0916 2.52852 11.8528 2.57474 11.5601L3.15243 8.18643L0.703017 5.80635C0.487346 5.59067 0.425726 5.33649 0.518156 5.04379C0.610587 4.7511 0.810853 4.58934 1.11895 4.55853L4.49267 4.05017L5.99467 0.999957C6.13331 0.722666 6.35669 0.584019 6.66479 0.584019C6.97289 0.584019 7.19626 0.722666 7.33491 0.999957L8.83691 4.05017L12.2106 4.55853ZM8.99866 7.7936L11.3094 5.52905L8.09746 5.0669L6.66479 2.15534L5.23211 5.0669L2.02015 5.52905L4.33092 7.7936L3.79944 11.0056L6.66479 9.48046L9.53014 11.0056L8.99866 7.7936Z"
      fill="#FFCC00"
    />
  </svg>
);

interface selectCountry {
  name: string;
  id: number;
  logo: string | null;
}
interface selectState {
  name: string;
  id: number;
}
interface selectMajor {
  name: string;
  id: number;
}
interface selectField {
  name: string;
  id: number;
}

function University() {
  const [loadingStates, setLoadingStates] = useState(new Map());
  const [recommended, setRecommended] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<selectCountry>();
  const [searchCountry, setSearchCountry] = useState<string>("");

  const [isStateOpen, setIsStateOpen] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<selectState>();
  const [searchState, setSearchState] = useState<string>("");

  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<selectState>();
  const [searchCity, setSearchCity] = useState<string>("");

  const [isAcademicDegreeOpen, setIsAcademicDegreeOpen] =
    useState<boolean>(false);
  const [selectedAcademicDegree, setSelectedAcademicDegree] =
    useState<string>("");

  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const [isMajorsOpen, setIsMajorsOpen] = useState<boolean>(false);
  const [selectedMajors, setSelectedMajors] = useState<selectMajor>();
  const [searchMajor, setSearchMajor] = useState<string>("");

  const [selectedFields, setSelectedFields] = useState<selectField>();
  const [isFieldsOpen, setIsFieldsOpen] = useState<boolean>(false);
  const [searchFields, setSearchFields] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");


  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  //   const t = useTranslations('languageSchool');
  const u = useTranslations("Universities");
  const t = useTranslations("UniversitiesCard");
  const e = useTranslations("institutesCard");
  const n = useTranslations("newHome");

  const language = useCurrentLang();
  const { cleanPath } = useCleanPath();
  const { tokenMainSite } = parseCookies();

  const countries = useSelector((state: any) => state.countries);
  const user = useSelector((state: any) => state.displayUser);
  const states = useSelector((state: any) => state.states);
  const cities = useSelector((state: any) => state.cities);
  const majors = useSelector((state: any) => state.majors);
  const fields = useSelector((state: any) => state.fields);
  const universities = useSelector((state: any) => state.universities);

  const langCountryRef = useRef("");
  const langMajerRef = useRef("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries?.countries?.filter((country: any) =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const filteredState = states?.states?.filter((state: any) =>
    state.name.toLowerCase().includes(searchState.toLowerCase())
  );
  const filteredCity = cities?.cities?.filter((city: any) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  const filteredMajors = majors?.majors?.data?.filter((major: any) =>
    major.name.toLowerCase().includes(searchMajor.toLowerCase())
  );

  const filteredFields = fields?.fields?.data?.filter((field: any) =>
    field.name.toLowerCase().includes(searchFields.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 400,
      left: 100,
      behavior: "smooth",
    });
  }

  const handleSubmit = (eve: any) => {
    eve.preventDefault();
    if (searchValue || selectedCountry || selectedState || selectedCity || selectedMajors || selectedFields) {
      const row = {
        language: language,
        search: searchValue,
        country: selectedCountry?.id,
        city: selectedCity?.id,
        state: selectedState?.id,
        majors: selectedMajors?.id,
        fields: selectedFields?.id,
        recommended: recommended,
        limt: limit,
        page: currentPage
      };
      // console.log("All University", row);
      dispatch(getAllUniversities(row));
      scrollToTop();
    } else {
      toast.error(u("errorMessage"));
      return
    }

  };

  const subscribe = async (universityId: number) => {
    setLoadingStates((prev) => new Map(prev).set(universityId, true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenMainSite}`,
            "Accept-Language": language,
          },
          body: JSON.stringify({
            userId: user.id,
            targetId: universityId,
            targetType: "UNIVERSITY",
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      dispatch(
        getAllUniversities({
          page: currentPage,
          limt: limit,
          language,
          recommended: recommended,
        })
      );
      // setUniversities((prev: any) =>
      //   prev.map((u: any) => u.id === universityId ? { ...u, is_notified: true } : u)
      // );
      toast.success(t("addSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(universityId, false));
    }
  };

  const unSubscribe = async (universityId: number) => {
    setLoadingStates((prev) => new Map(prev).set(universityId, true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/unsubscribe`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenMainSite}`,
          },
          body: JSON.stringify({
            userId: user.id,
            targetId: universityId,
            targetType: "UNIVERSITY",
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      dispatch(
        getAllUniversities({
          page: currentPage,
          limt: limit,
          language,
          recommended: recommended,
        })
      );
      // setUniversities((prev: any) =>
      //   prev.map((u: any) => u.id === universityId ? { ...u, is_notified: false } : u)
      // );
      toast.success(t("removeSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(universityId, false));
    }
  };

  const handlePageChange = (newPage: any) => {
    if (hasMoreData && newPage !== currentPage) {
      setCurrentPage(newPage);
      scrollToTop();

      dispatch(getAllUniversities({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, majors: selectedMajors?.id, fields: selectedFields?.id, page: newPage, limt: limit, language, recommended }));
    }
  };

  useEffect(() => {
    const searchResult = localStorage.getItem("searchResult");
    const searchValue = searchResult ? JSON.parse(searchResult) : null;

    if (!searchValue) {
      dispatch(
        getAllUniversities({
          page: currentPage,
          limt: limit,
          language,
          recommended: recommended,
        })
      );
    } else {
      const { country, academicDegree, majors, search } = searchValue;
      const row = {
        language: language,
        search: search,
        country: country,
        majors: majors,
        academic_degree: academicDegree,
        userId: user.id,
      };
      dispatch(getAllUniversities(row));
      setTimeout(() => localStorage.removeItem("searchResult"), 3000);
    }

    // dispatch(getAllUniversities({ page: currentPage, limt: limit, language, recommended: recommended }));
    // }, [dispatch, currentPage, limit, language]);
  }, [dispatch, language]);

  // Handle Subimit for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (
          selectedCountry ||
          selectedAcademicDegree ||
          selectedLanguage ||
          selectedMajors ||
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
    selectedAcademicDegree,
    selectedLanguage,
    selectedMajors,
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
        setIsCityOpen(false)
        setIsMajorsOpen(false)
        setIsStateOpen(false)
        setIsFieldsOpen(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <BannerSection
        head={u("uniButton")}
        breadcrumb={u("uniButton")}
        urlImage="/images/bannerUNI.png"
      />

      <HeadTittle
        head={u("uniButton")}
        headLine={u("headLine")}
        summary={u("summary")}
      />
      <div className="flex flex-col md:flex-row gap-5 px-5 lg:px-10 xl:px-28 pb-10 bg-neutral-50">
        {/* Left Side {Filteration} */}
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
          <div className="flex gap-2 items-center p-6 w-full bg-white rounded-3xl border border-solid border-zinc-100">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col self-stretch my-auto w-full"
            >
              <div className="flex gap-9 py-1 w-full border-b border-solid border-b-zinc-100">
                <div className="grow shrink text-2xl font-bold text-zinc-900 w-[219px]">
                  {u("search")}
                </div>
              </div>
              <div
                ref={dropdownRef}
                className="flex flex-col pb-4 mt-6 w-full text-base tracking-wide border-b border-solid border-b-zinc-100">
                <div className="flex gap-3  w-full  flex-col max-md:gap-4">
                  {/* Filter By  Text */}
                  <div className="flex flex-col gap-2 items-start w-full  xl:flex-1">
                    <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                      {n("searchButton")}
                    </div>
                    <div className=" flex flex-col gap-2 w-full">
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
                              dispatch(getAllUniversities({
                                country: selectedCountry?.id,
                                state: selectedState?.id,
                                city: selectedCity?.id,
                                majors: selectedMajors?.id,
                                fields: selectedFields?.id,
                                recommended,
                                page: 1,
                                limt: limit,
                                language
                              }));
                              scrollToTop();
                              setSearchValue("")
                              setCurrentPage(1)
                              setLimit(10)
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
                          placeholder={`${n("searchButton")}`}
                          className="w-full py-3 ps-11 placeholder:text-[#A5A5A5] bg-[#FAFAFA] border border-[#EEEEEE] rounded-full focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Filter By Country */}
                  <div className="flex flex-col gap-2 items-start  w-full  relative">
                    <div
                      className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                      {n("searchFilters1")}
                    </div>
                    <div
                      onClick={() => {
                        const currentCountryLang = langCountryRef.current !== language;
                        if (!countries?.countries?.length || currentCountryLang) {

                          dispatch(getAllCountries({ language, entity: "universities" }));
                          langCountryRef.current = language;
                        }
                        setIsStateOpen(false);
                        setIsCityOpen(false);
                        setIsCountryOpen(!isCountryOpen)
                        setIsAcademicDegreeOpen(false);
                        setIsStateOpen(false);
                        setIsCityOpen(false);
                      }}
                      className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                    >
                      <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                        {selectedCountry?.name || n("searchFiltersDrd1")}
                      </span>
                      {selectedCountry?.name ? (
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCountry(undefined);
                            setSelectedState(undefined);
                            setSelectedCity(undefined);
                            setCurrentPage(1);
                            dispatch(getAllUniversities({
                              state: "",
                              city: "",
                              majors: selectedMajors?.id,
                              fields: selectedFields?.id,
                              recommended,
                              page: 1,
                              limt: limit,
                              language
                            }));
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
                      ) : (
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
                      )}
                    </div>
                    {isCountryOpen && (
                      <div
                        className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        {/* حقل البحث */}
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            placeholder={n("searchFiltersDrd8")}
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
                                  setSelectedState({ id: 0, name: "" });
                                  setSelectedCity({ id: 0, name: "" });
                                  setIsCountryOpen(false);
                                  setIsStateOpen(false);
                                  setIsCityOpen(false);
                                  setIsAcademicDegreeOpen(false);
                                  setIsMajorsOpen(false);
                                  setSearchCountry("");
                                  setCurrentPage(1);
                                  dispatch(getAllUniversities({
                                    country: country?.id,
                                    state: selectedState?.id,
                                    city: selectedCity?.id,
                                    majors: selectedMajors?.id,
                                    fields: selectedFields?.id,
                                    page: 1,
                                    limt: limit,
                                    language,
                                    recommended
                                  }));
                                  dispatch(getAllStates({ language: language, countryId: country?.id }));
                                  scrollToTop();
                                }}
                                className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                              >
                                {country.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-3 text-gray-400">
                              {n("searchFiltersDrd5")}
                            </div>
                          )
                        ) : (
                          <div className="px-6 py-3 text-gray-400">
                            {n("searchFiltersDrd6")}...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Filter By State */}
                  <div className="flex flex-col gap-2 items-start  w-full  relative">
                    <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                      {n("searchFiltersDrd2")}
                    </div>
                    <div
                      onClick={() => {
                        setIsStateOpen(!isStateOpen);
                        setIsCountryOpen(false);
                        setIsCityOpen(false);
                        setIsAcademicDegreeOpen(false);
                        setIsMajorsOpen(false);
                        setIsLanguageOpen(false);
                        setIsCountryOpen(false);
                      }}
                      className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                    >
                      <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                        {selectedState?.name || n("searchFiltersDrd2+")}
                      </span>
                      {selectedState?.name ? (
                        <svg
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentPage(1);
                            dispatch(getAllUniversities({
                              country: selectedCountry?.id,
                              majors: selectedMajors?.id,
                              fields: selectedFields?.id,
                              page: 1,
                              limt: limit,
                              language, recommended
                            }));
                            scrollToTop();
                            setSelectedState(undefined)
                            setIsStateOpen(false);
                            setIsCityOpen(false);
                            setSelectedCity(undefined)
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
                      ) : (
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
                      )}

                    </div>
                    {isStateOpen && (
                      <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        {/* حقل البحث */}
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            placeholder={n("searchFiltersDrd7")}
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
                                  setSelectedCity({ id: 0, name: "" });
                                  setIsCountryOpen(false);
                                  setIsStateOpen(false);
                                  setIsCityOpen(false);
                                  setIsAcademicDegreeOpen(false);
                                  setIsMajorsOpen(false);
                                  setSearchCountry("");
                                  dispatch(getAllUniversities({ country: selectedCountry?.id, state: state?.id, city: selectedCity?.id, majors: selectedMajors?.id, fields: selectedFields?.id, page: currentPage, limt: limit, language, recommended }));
                                  dispatch(getAllCities({ language: language, countryId: selectedCountry?.id, stateId: state?.id }));
                                  scrollToTop();
                                }}
                                className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                              >
                                {state.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-3 text-gray-400">
                              {n("searchFiltersDrd5")}
                            </div>
                          )
                        ) : (
                          <div className="px-6 py-3 text-gray-400">
                            {n("searchFiltersDrd6")}...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Filter By City */}
                  <div className="flex flex-col gap-2 items-start  w-full  relative">
                    <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                      {n("searchFiltersDrd11")}
                    </div>
                    <div
                      onClick={() => {
                        setIsCityOpen(!isCityOpen);
                        setIsCountryOpen(false);
                        setIsStateOpen(false);
                        setIsAcademicDegreeOpen(false);
                        setIsMajorsOpen(false);
                        setIsLanguageOpen(false);
                        setIsCountryOpen(false);
                        setIsStateOpen(false);
                      }}
                      className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                    >
                      <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                        {selectedCity?.name || n("searchFiltersDrd3+")}
                      </span>
                      {selectedCity?.name ? (
                        <svg onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage(1);
                          scrollToTop();
                          dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, majors: selectedMajors?.id, fields: selectedFields?.id, page: 1, limt: limit, language, recommended }));
                          setSelectedCity(undefined)
                          setSelectedFields(undefined)
                          setSelectedMajors(undefined)
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      ) : (
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
                      )}



                    </div>
                    {isCityOpen && (
                      <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        {/* حقل البحث */}
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            placeholder={n("searchFiltersDrd11")}
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
                                  setIsAcademicDegreeOpen(false);
                                  setIsMajorsOpen(false);
                                  setSearchCity("");
                                  scrollToTop();
                                  dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: city?.id, majors: selectedMajors?.id, fields: selectedFields?.id, page: currentPage, limt: limit, language, recommended }));
                                }}
                                className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                              >
                                {city.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-3 text-gray-400">
                              {n("searchFiltersDrd5")}
                            </div>
                          )
                        ) : (
                          <div className="px-6 py-3 text-gray-400">
                            {n("searchFiltersDrd6")}...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Filter By  Majors */}
                  <div className="flex flex-col gap-2 items-start  w-full  relative">
                    <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                      {n("searchFilters3")}
                    </div>
                    <div
                      onClick={() => {
                        const currentMajerLang =
                          langMajerRef.current !== language;
                        if (!majors?.majors?.data?.length || currentMajerLang) {
                          dispatch(getAllMajors({ language: language }));
                          langMajerRef.current = language;
                        }
                        setIsMajorsOpen(!isMajorsOpen);
                        setIsAcademicDegreeOpen(false);
                        setIsCountryOpen(false);
                        setIsStateOpen(false);
                        setIsFieldsOpen(false);
                      }}
                      className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px] "
                    >
                      <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm line-clamp-1" >
                        {selectedMajors?.name || n("searchFilters3+")}
                      </span>

                      {selectedMajors?.name ?
                        <svg onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage(1);
                          dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, fields: selectedFields?.id, page: 1, limt: limit, language, recommended }));
                          scrollToTop();
                          setSelectedMajors(undefined)
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        : <svg
                          className={`${isFieldsOpen ? "rotate-180" : ""} `}
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
                        </svg>}
                    </div>
                    {isMajorsOpen && (
                      <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        <div className="px-4 py-2 ">
                          <input
                            type="text"
                            placeholder={n("searchFiltersDrd9")}
                            value={searchMajor}
                            onChange={(e) => setSearchMajor(e.target.value)}
                            className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        {!majors.loading ? (
                          filteredMajors?.length > 0 ? (
                            filteredMajors.map((major: any) => (
                              <div
                                key={major?.id}
                                onClick={() => {
                                  setSelectedMajors(major);
                                  setIsMajorsOpen(false);
                                  setSearchMajor("");
                                  setSelectedFields({ id: 0, name: "" });
                                  dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, majors: major?.id, fields: selectedFields?.id, page: currentPage, limt: limit, language, recommended }));
                                  scrollToTop();
                                }}
                                className="px-6 py-3 hover:bg-gray-100 cursor-pointer "
                              >
                                {major.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-3 text-gray-400">
                              {n("searchFiltersDrd5")}
                            </div>
                          )
                        ) : (
                          <div className="px-6 py-3 text-gray-400">
                            {n("searchFiltersDrd6")}...
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Filter By  Field */}
                  <div className="flex flex-col gap-2 items-start  w-full  relative">
                    <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                      {n("searchFilters4")}
                    </div>
                    <div
                      onClick={() => {
                        if (!fields?.fields?.data?.length) {
                          dispatch(getAllFields({ language }));
                        }
                        setIsFieldsOpen(!isFieldsOpen);
                        setIsMajorsOpen(false);
                        setIsCountryOpen(false);
                        setIsStateOpen(false);
                        setIsLanguageOpen(false);
                      }}
                      className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                    >
                      <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                        {selectedFields?.name || n("searchFilters4+")}
                      </span>
                      {selectedFields?.name ? <svg onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPage(1);
                        dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, majors: selectedMajors?.id, page: 1, limt: limit, language, recommended }));
                        scrollToTop();
                        setSelectedFields(undefined)
                      }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                        : <svg
                          className={`${isFieldsOpen ? "rotate-180" : ""} `}
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
                        </svg>}

                    </div>
                    {isFieldsOpen && (
                      <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        <div className="px-4 py-2">
                          <input
                            type="text"
                            placeholder={n("searchFiltersDrd10")}
                            value={searchFields}
                            onChange={(e) => setSearchFields(e.target.value)}
                            className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        {!fields.loading ? (
                          filteredFields?.length > 0 ? (
                            filteredFields.map((field: any) => (
                              <div
                                key={field?.id}
                                onClick={() => {
                                  setSelectedFields(field);
                                  setIsFieldsOpen(false);
                                  setSearchFields("");
                                  dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, majors: selectedMajors?.id, fields: field?.id, page: currentPage, limt: limit, language, recommended }));
                                  scrollToTop();
                                }}
                                className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                              >
                                {field.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-3 text-gray-400">
                              {n("searchFiltersDrd5")}
                            </div>
                          )
                        ) : (
                          <div className="px-6 py-3 text-gray-400">
                            {n("searchFiltersDrd6")}...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* filter by recommended */}
              <div className="flex  overflow-hidden flex-col pb-4 mt-6 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
                <div className="text-base font-bold text-zinc-900">
                  {u("recommendFilter")}
                </div>
                <div className="flex gap-3 items-center self-start mt-2 text-sm font-medium text-slate-900">
                  <div
                    className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto rounded-lg border border-solid  max-md:px-5 cursor-pointer
                    ${recommended === ""
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-zinc-100 text-black"
                      }`}
                    onClick={() => {
                      console.log(recommended);
                      if (recommended !== "") {
                        setRecommended("");
                        setCurrentPage(1);
                        dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, majors: selectedMajors?.id, fields: selectedFields?.id, language, page: 1, limt: limit, recommended: "" }));
                        scrollToTop();
                      }
                    }
                    }
                  >
                    {u("all")}
                  </div>
                  <div
                    className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto rounded-lg border border-solid max-md:px-5 cursor-pointer 
                    ${recommended === "true"
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-zinc-100 text-black"
                      }`}

                    onClick={() => {
                      if (recommended !== "true") {
                        setRecommended("true")
                        dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, majors: selectedMajors?.id, fields: selectedFields?.id, language, page: currentPage, limt: limit, recommended: "true" }));
                        scrollToTop();
                      }
                    }}
                  >
                    {u("recommendFilter")}
                  </div>
                </div>
              </div>
              {/* filter by rating */}
              {/* <div className="flex overflow-hidden flex-col pb-4 mt-6 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
                <div className="text-base font-bold text-zinc-900">
                  {u("rating")}
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
              <button
                type="submit"
                className=" flex overflow-hidden gap-1 justify-center items-center px-4 py-0 mt-6 w-full text-base font-medium tracking-wide text-white whitespace-nowrap border border-solid bg-primary border-primary min-h-[60px] rounded-[64px] cursor-pointer"
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
                  {u("searchBtn")}
                </div>
              </button>
            </form>
          </div>
        </div >

        {/* right Side Display */}
        < div className="flex gap-4 flex-wrap flex-row justify-start w-full md:w-1/2 lg:w-2/3" >
          {
            universities.loading ? (
              <div className="flex justify-center items-center w-full mt-20">
                <Loader />
              </div>
            ) : (
              <>
                {universities?.universities?.data?.length > 0 ? (
                  universities?.universities?.data?.map((university: any) => (
                    <div
                      className="p-4 lg:p-6 bg-white rounded-3xl border border-solid border-zinc-100 lg:w-[47%] h-max"
                      key={university.id}
                    >
                      <div className="flex justify-start items-center gap-5">
                        {/* <div className="flex flex-col items-center text-xs tracking-wide text-center text-emerald-800 bg-white rounded-lg border border-solid border-zinc-100 w-1/2 ">
                          <div className="flex overflow-hidden relative flex-col items-start px-4 pt-2 w-full aspect-square rounded-lg">
                            {university.logo ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                  }/${cleanPath(university.logo)}`}
                                alt={university.name}
                                // fill={true}
                                width={130}
                                height={130}
                                className=""
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

                            {university.recommend ? (
                              <div className="flex relative gap-2 items-center px-2 mb-0 bg-emerald-50 rounded min-h-[20px]">
                                <div className="flex shrink-0 self-stretch my-auto w-2.5 h-2.5 bg-emerald-800 rounded-full" />
                                <div className="self-stretch my-auto">
                                  {u("recommendFilter")}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div> */}
                        <div className="border border-[#EEEEEE] rounded-2xl w-auto aspect-square flex items-center justify-center relative ">
                          {university.logo ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                }/${cleanPath(university.logo)}`}
                              alt={
                                university.name
                                  ? `${university.name} logo`
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

                          {university.recommend && (
                            <div className="bg-[#ECFDF3] text-xs absolute top-[8px]  text-[#085D3A] flex items-center gap-2 px-2 py-1 rounded-lg overflow-hidden">
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

                              {u("recommendFilter")}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                          <div className="flex gap-1.5 items-center relative">
                            <Image
                              src={
                                !university.country_logo
                                  ? "/images/university.png"
                                  : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                  }/${cleanPath(university.country_logo)}`
                              }
                              width={20}
                              height={20}
                              // alt={"logo"}
                              alt={university.country_name}
                              className="rounded-xl h-[22px] w-[22px]"
                            />
                            <div className="text-sm text-zinc-900">
                              {university.country_name}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <div>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 3.93018C15.2468 3.93018 18.3854 5.77707 20.6152 9.09326L20.8281 9.41846C21.2659 10.1057 21.4999 11.0396 21.5 11.9985C21.5 12.8377 21.3208 13.6554 20.9834 14.3032L20.8291 14.5708L20.8281 14.5718C19.7039 16.3355 18.3361 17.7083 16.8281 18.644C15.3201 19.5698 13.6799 20.0601 12 20.0601C8.75267 20.0601 5.61408 18.2225 3.38477 14.8989L3.17188 14.5718L3.01758 14.3022C2.67958 13.6504 2.50006 12.8332 2.5 11.9956C2.5 11.1578 2.67949 10.3399 3.01758 9.68799L3.17188 9.41846C4.29652 7.65406 5.66517 6.28097 7.17383 5.34521L7.17285 5.34424C8.68046 4.4191 10.3207 3.93018 12 3.93018ZM12 7.46045C9.48305 7.46045 7.45996 9.49515 7.45996 12.0005C7.46013 14.5057 9.48316 16.5405 12 16.5405C14.5168 16.5405 16.5399 14.5057 16.54 12.0005C16.54 9.49515 14.5169 7.46045 12 7.46045Z"
                                  stroke="#F89A21"
                                />
                                <path
                                  d="M11.9996 9.64014C13.2935 9.64014 14.36 10.7066 14.36 12.0005C14.3598 13.2919 13.2957 14.3501 11.9996 14.3501C10.7061 14.3499 9.65022 13.2941 9.65002 12.0005C9.65002 10.6956 10.7071 9.64035 11.9996 9.64014Z"
                                  stroke="#F89A21"
                                />
                              </svg>
                            </div>
                            <span className="text-nowrap text-sm">
                              {" "}
                              {university.visites} {t("viewsLable1")}
                            </span>
                          </div>
                          {/* rating */}
                          {/* <div className="flex gap-2 items-center">
                            <div className="text-sm text-zinc-900">
                              {university.rating}
                            </div>
                            <div className="flex gap-0.5">
                              <div className="flex gap-[2px]">
                                {Array.from(
                                  { length: university.rating },
                                  (_, index) =>
                                    index < 5 ? (
                                      <FillStar key={index} />
                                    ) : (
                                      <SolidStar key={index} />
                                    )
                                )}
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="my-4">
                        <div className="mb-1 line-clamp-1 text-2xl font-bold text-zinc-900">
                          {university.name}
                        </div>
                        <div className="text-base tracking-wide leading-6 text-zinc-900 line-clamp-2 ">
                          {university.description}
                        </div>
                      </div>
                      <div className="flex justify-between px-0 py-4 border-t border-solid border-t-zinc-100">
                        <div className="flex gap-1.5 items-center">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.25999 11.0199V15.9899C4.25999 17.8099 4.25999 17.8099 5.97999 18.9699L10.71 21.6999C11.42 22.1099 12.58 22.1099 13.29 21.6999L18.02 18.9699C19.74 17.8099 19.74 17.8099 19.74 15.9899V11.0199C19.74 9.19994 19.74 9.19994 18.02 8.03994L13.29 5.30994C12.58 4.89994 11.42 4.89994 10.71 5.30994L5.97999 8.03994C4.25999 9.19994 4.25999 9.19994 4.25999 11.0199Z"
                                stroke="#F89A21"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56"
                                stroke="#F89A21"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.63 10.99L13.2 11.88C13.29 12.02 13.49 12.16 13.64 12.2L14.66 12.46C15.29 12.62 15.46 13.16 15.05 13.66L14.38 14.47C14.28 14.6 14.2 14.83 14.21 14.99L14.27 16.04C14.31 16.69 13.85 17.02 13.25 16.78L12.27 16.39C12.12 16.33 11.87 16.33 11.72 16.39L10.74 16.78C10.14 17.02 9.67999 16.68 9.71999 16.04L9.77999 14.99C9.78999 14.83 9.70999 14.59 9.60999 14.47L8.93999 13.66C8.52999 13.16 8.69999 12.62 9.32999 12.46L10.35 12.2C10.51 12.16 10.71 12.01 10.79 11.88L11.36 10.99C11.72 10.45 12.28 10.45 12.63 10.99Z"
                                stroke="#F89A21"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="text-sm text-slate-900">
                            {university.major_count} {t("cardFoterUni3")}
                          </div>
                        </div>
                        <div className="flex gap-1.5 items-center">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.66 10.44L20.68 14.62C19.84 18.23 18.18 19.69 15.06 19.39C14.56 19.35 14.02 19.26 13.44 19.12L11.76 18.72C7.59 17.73 6.3 15.67 7.28 11.49L8.26 7.30001C8.46 6.45001 8.7 5.71001 9 5.10001C10.17 2.68001 12.16 2.03001 15.5 2.82001L17.17 3.21001C21.36 4.19001 22.64 6.26001 21.66 10.44Z"
                                stroke="#F89A21"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.06 19.3901C14.44 19.8101 13.66 20.1601 12.71 20.4701L11.13 20.9901C7.16001 22.2701 5.07001 21.2001 3.78001 17.2301L2.50001 13.2801C1.22001 9.3101 2.28001 7.2101 6.25001 5.9301L7.83001 5.4101C8.24001 5.2801 8.63001 5.1701 9.00001 5.1001C8.70001 5.7101 8.46001 6.4501 8.26001 7.3001L7.28001 11.4901C6.30001 15.6701 7.59001 17.7301 11.76 18.7201L13.44 19.1201C14.02 19.2601 14.56 19.3501 15.06 19.3901Z"
                                stroke="#F89A21"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.64 8.53003L17.49 9.76003"
                                stroke="#F89A21"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.66 12.3999L14.56 13.1399"
                                stroke="#F89A21"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="text-sm text-slate-900">
                            {university.program_count} {t("cardFoterUni4")}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center mt-4">
                        {loadingStates.get(university.id) ? (
                          <Spinner />
                        ) : (
                          <>
                            <Link
                              href={`/${language}/university/${university.id}`}
                              className="flex gap-1 items-center px-4  py-0 h-12 text-nowrap text-base text-white cursor-pointer bg-primary rounded-[64px] justify-center grow"
                            >
                              <span>{t("cardButtonUni")}</span>
                              <div>
                                {language === "en" ? (
                                  <svg
                                    width="22"
                                    height="21"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M14.9301 5.92993L21.0001 11.9999L14.9301 18.0699"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M4 12H20.83"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.56995 18.0701L3.49995 12.0001L9.56995 5.93007"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M20.5 12L3.67 12"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                            </Link>
                            <div
                              onClick={() => {
                                if (tokenMainSite && user.id) {
                                  // console.log("login");
                                  if (university.is_notified) {
                                    unSubscribe(university.id);
                                  } else if (!university.is_notified) {
                                    subscribe(university.id);
                                    [];
                                  }
                                } else {
                                  toast.error(e("messageError"));
                                }
                              }}
                              className="flex justify-center items-center cursor-pointer rounded-[64px]"
                            >
                              <div>
                                {university.is_notified ? (
                                  <svg
                                    width="56"
                                    height="56"
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
                                    width="56"
                                    height="56"
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
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <SearchNotFound head={u("uniButton")} />
                )}
              </>
            )
          }

          {/* Pagination */}
          {
            pathname !== `/${language}` &&
            universities?.universities?.data?.length > 0 && (
              <div className="flex flex-col md:flex-row gap-5 justify-between items-center my-5 w-full ">
                <div>
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    disableNext={!hasMoreData}
                    numberOfPages={universities?.universities?.pages}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-2 items-center text-sm leading-none text-zinc-900">
                  <div className="self-stretch my-auto text-zinc-900 line-clamp-1 leading-6">
                    {u("pagination")}
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      value={limit}
                      onChange={(e: any) => {
                        setLimit(e.target.value);
                        // console.log("searchValue", selectedValue);
                        dispatch(getAllUniversities({ search: searchValue, country: selectedCountry?.id, state: selectedState?.id, majors: selectedMajors?.id, fields: selectedFields?.id, page: currentPage, limt: e.target.value, language, recommended }));
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
            )
          }
        </div >
      </div >
    </>
  );
}
export default University;
