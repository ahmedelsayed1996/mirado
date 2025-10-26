import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLang from "../_hooks/useCurrentLang";
import { getAllCities } from "../reduxTool-kit/slices/citiesSlice";
import { getAllCountries } from "../reduxTool-kit/slices/countriesSlice";
import { getAllMajors } from "../reduxTool-kit/slices/majorSlice";
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

interface selectCity {
  name: string;
  id: number;
}

interface selectMajor {
  name: string;
  id: number;
}

const academicDegree = [
  "Bachelor's",
  "Master",
  "Ph.D",
  "Diploma",
  "Certificate",
];
const academicDegreeAr = ["بكالوريوس", "ماجستير", "دكتوراه", "دبلومة", "شهادة"];
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

function NewSearch() {
  const language = useCurrentLang();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [activeButton, setActiveButton] = useState<String>("UNI");
  const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<selectCountry>();
  const [isStateOpen, setIsStateOpen] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<selectState>();
  const [isAcademicDegreeOpen, setIsAcademicDegreeOpen] =
    useState<boolean>(false);
  const [selectedAcademicDegree, setSelectedAcademicDegree] =
    useState<string>("");
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isMajorsOpen, setIsMajorsOpen] = useState<boolean>(false);
  const [selectedMajors, setSelectedMajors] = useState<selectMajor>();
  const [searchMajor, setSearchMajor] = useState<string>("");
  const [searchCountry, setSearchCountry] = useState<string>("");
  const [searchState, setSearchState] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const [searchCity, setSearchCity] = useState<string>("");

  const [isCityOpened, setIsCityOpened] = useState(false);
  const [selectedCity, setSelectedCity] = useState<selectCity>();

  const langCountryRef = useRef("");
  const langMajerRef = useRef("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const n = useTranslations("newHome");
  const countries = useSelector((state: any) => state.countries);
  const states = useSelector((state: any) => state.states);
  const majors = useSelector((state: any) => state.majors);
  const cities = useSelector((state: any) => state.cities);

  const filteredCountries = countries?.countries?.filter((country: any) =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const filteredState = states?.states?.filter((state: any) =>
    state.name.toLowerCase().includes(searchState.toLowerCase())
  );

  const filteredCities = cities?.cities?.filter((city: any) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  const filteredMajors = majors?.majors?.data?.filter((major: any) =>
    major.name.toLowerCase().includes(searchMajor.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (
          selectedCountry ||
          selectedAcademicDegree ||
          selectedLanguage ||
          selectedMajors ||
          selectedState ||
          searchValue
        ) {
          handleSubmit();
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
  ]);

  const handleSubmit = () => {

    const formState = {
      country: selectedCountry?.id,
      state: selectedState?.id,
      city: selectedCity?.name,
      academicDegree: selectedAcademicDegree,
      majors: selectedMajors?.id,
      search: searchValue,
      languageStudy: selectedLanguage,
    };
    const hasAnyValue = Object.values(formState).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
    if (hasAnyValue) {
      setError(false);
      localStorage.setItem("searchResult", JSON.stringify(formState));
      if (activeButton == "UNI") {
        router.push(`/${language}/university`);
      } else if (activeButton == "Ins") {
        router.push(`/${language}/language-schools`);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
        setIsAcademicDegreeOpen(false);
        setIsMajorsOpen(false);
        setIsStateOpen(false)
        setIsCityOpened(false)
        setIsLanguageOpen(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="-translate-y-60 md:-translate-y-28 xl:ms-28 relative z-[5]">
      <div className=" bg-white rounded-s-2xl border border-solid border-zinc-100  shadow-[0_2px_4px_rgba(0,0,0,0.08)]  max-md:w-full xs:p-0 sm:p-4 max-sm:rounded-lg py-5">
        <div className="flex gap-2.5 text-base tracking-tight capitalize ps-3 xl:ps-8 justify-between items-center flex-col md:flex-row">
          <div className="border border-solid border-zinc-100  rounded-[50px] p-2">
            <button
              onClick={() => setActiveButton("UNI")}
              className={`justify-center px-5 lg:px-10 py-1 lg:py-2 rounded-[50px] max-md:px-5 ${activeButton === "UNI"
                ? "bg-primary text-white"
                : "bg-white text-black"
                }`}
            >
              {n("UNI")}
            </button>
            <button
              onClick={() => setActiveButton("Ins")}
              className={`justify-center px-5 lg:px-10 py-1 lg:py-2 rounded-[50px] max-md:px-5 ${activeButton === "Ins"
                ? "bg-primary text-white"
                : "bg-white text-black"
                }`}
            >
              {n("Ins")}
            </button>
          </div>
        </div>
        <div ref={dropdownRef} className="flex justify-center items-center  max-md:static max-md:w-full ">
          {activeButton === "UNI" ? (
            <div className="flex gap-3  w-full mt-4 max-md:flex-col max-md:gap-4 px-3 xl:ps-8">
              {/* Filter By  Text */}
              <div className="flex flex-col gap-2 items-start lg:w-64  xl:flex-1">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchButton")}
                </div> */}
                <div className="flex gap-4 items-center px-4 py-4 h-10 border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] max-sm:px-4 max-sm:py-3  w-full">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M17.9166 16.1833L15.275 13.6833C14.7727 14.33 14.1707 14.8926 13.4916 15.35L16.2083 17.9334C16.3225 18.0668 16.4638 18.1744 16.6227 18.2492C16.7816 18.324 16.9546 18.3643 17.1302 18.3673C17.3058 18.3703 17.4801 18.336 17.6415 18.2667C17.8029 18.1974 17.9477 18.0946 18.0664 17.9652C18.1852 17.8358 18.2751 17.6826 18.3303 17.5159C18.3855 17.3491 18.4046 17.1726 18.3865 16.9979C18.3684 16.8232 18.3135 16.6543 18.2253 16.5024C18.1371 16.3505 18.0177 16.219 17.875 16.1167L17.9166 16.1833Z"
                        fill="#A1A5B7"
                      />
                      <path
                        d="M9.28333 1.66675C7.79997 1.66675 6.34992 2.10662 5.11655 2.93073C3.88318 3.75484 2.92189 4.92618 2.35423 6.29662C1.78657 7.66707 1.63805 9.17507 1.92744 10.6299C2.21683 12.0848 2.93113 13.4212 3.98003 14.47C5.02892 15.5189 6.36529 16.2332 7.82015 16.5226C9.27501 16.812 10.783 16.6635 12.1535 16.0958C13.5239 15.5282 14.6952 14.5669 15.5194 13.3335C16.3435 12.1002 16.7833 10.6501 16.7833 9.16675C16.7833 7.17762 15.9932 5.26997 14.5866 3.86345C13.1801 2.45692 11.2725 1.66675 9.28333 1.66675ZM9.28333 14.4667C8.23709 14.4667 7.21433 14.1566 6.3443 13.5755C5.47428 12.9944 4.79603 12.1685 4.39527 11.202C3.99451 10.2356 3.88923 9.17204 4.09274 8.14579C4.29624 7.11954 4.7994 6.17664 5.53862 5.43625C6.27784 4.69587 7.21994 4.19123 8.24588 3.98611C9.27181 3.78099 10.3355 3.88459 11.3026 4.28383C12.2697 4.68307 13.0967 5.36002 13.6791 6.22913C14.2616 7.09824 14.5733 8.12051 14.575 9.16675C14.5772 9.86267 14.4419 10.5522 14.1768 11.1956C13.9118 11.8391 13.5222 12.4239 13.0305 12.9164C12.5388 13.4088 11.9546 13.7993 11.3116 14.0654C10.6685 14.3315 9.97925 14.4679 9.28333 14.4667V14.4667Z"
                        fill="#A1A5B7"
                      />
                    </svg>
                  </div>

                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={n("searchplaceholder")}
                    className="w-full bg-transparent focus:outline-none text-base tracking-wide text-neutral-600 placeholder:text-neutral-400 max-sm:text-sm"
                  />
                </div>
              </div>
              {/* Filter By Country */}
              <div className="flex flex-col gap-2 items-start  lg:w-64  relative">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchFilters1")}
                </div> */}
                <div
                  onClick={() => {
                    console.log(activeButton)
                    const currentCountryLang =
                      langCountryRef.current !== language;
                 //   if (!countries?.countries?.length || currentCountryLang) {
                      dispatch(getAllCountries({ language: language ,entity: "universities"}))  
                     
                      langCountryRef.current = language;
                   // }
                    setIsCountryOpen(!isCountryOpen);
                    setIsAcademicDegreeOpen(false);
                    setIsMajorsOpen(false);
                    setIsStateOpen(false);
                    setIsLanguageOpen(false);
                  }}
                  className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-10 rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 "
                >
                  <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                    {selectedCountry?.name || n("searchFiltersDrd1")}
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
                    {/* حقل البحث */}
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        placeholder={`${n("searchFiltersDrd8")}`}
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
                              setIsAcademicDegreeOpen(false);
                              setIsMajorsOpen(false);
                              setSearchCountry("");
                            }}
                            className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                          >
                            {country.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-6 py-3 text-gray-400">
                          {language == "en"
                            ? "No results found"
                            : "لاتوجد نتائج"}
                        </div>
                      )
                    ) : (
                      <div className="px-6 py-3 text-gray-400">
                        {language == "en" ? "Loading..." : "التحميل..."}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Filter By Academic Degree */}
              <div className="flex flex-col gap-2 items-start  lg:w-64  relative">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchFilters2")}
                </div> */}
                <div
                  onClick={() => {
                    setIsAcademicDegreeOpen(!isAcademicDegreeOpen);
                    setIsCountryOpen(false);
                    setIsMajorsOpen(false);
                    setIsStateOpen(false);
                    setIsLanguageOpen(false);
                  }}
                  className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-10 rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 "
                >
                  <span className="tracking-wide text-neutral-600 text-sm">
                    {selectedAcademicDegree || n("searchFilters2")}
                  </span>
                  <svg
                    className={`${isAcademicDegreeOpen ? "rotate-180" : ""} `}
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

                {isAcademicDegreeOpen && (
                  <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {language == "en"
                      ? academicDegree.map((academic: any, index: number) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedAcademicDegree(academic);
                            setIsAcademicDegreeOpen(false);
                          }}
                          className="px-6 py-3 hover:bg-gray cursor-pointer"
                        >
                          {academic}
                        </div>
                      ))
                      : academicDegreeAr.map((academic: any, index: number) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedAcademicDegree(academic);
                            setIsAcademicDegreeOpen(false);
                          }}
                          className="px-6 py-3 hover:bg-gray cursor-pointer"
                        >
                          {academic}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {/* Filter By  Majors */}
              <div className="flex flex-col gap-2 items-start  lg:w-64  relative">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchFilters3")}
                </div> */}
                <div
                  onClick={() => {
                    const currentMajerLang = langMajerRef.current !== language;
                    if (!majors?.majors?.data?.length || currentMajerLang) {
                      dispatch(getAllMajors({ language: language }));
                      langMajerRef.current = language;
                    }
                    setIsMajorsOpen(!isMajorsOpen);
                    setIsAcademicDegreeOpen(false);
                    setIsCountryOpen(false);
                    setIsStateOpen(false);
                    setIsLanguageOpen(false);
                  }}
                  className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-10 rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 "
                >
                  <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                    {selectedMajors?.name || n("searchFilters3+")}
                  </span>
                  <svg
                    className={`${isMajorsOpen ? "rotate-180" : ""} `}
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
                {isMajorsOpen && (
                  <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        placeholder={`${n("searchMajor")}`}
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
                              setSearchMajor(""); // reset البحث
                            }}
                            className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                          >
                            {major.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-6 py-3 text-gray-400">
                          {language == "en"
                            ? "No results found"
                            : "لاتوجد نتائج "}
                        </div>
                      )
                    ) : (
                      <div className="px-6 py-3 text-gray-400">
                        {language == "en" ? "Loading..." : "التحميل..."}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-3 w-full mt-4 max-md:flex-col max-md:gap-4 px-3 xl:ps-8">
              {/* Filter By  Text */}
              <div className="flex flex-col gap-2 items-start lg:w-64  xl:flex-1">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchButtonlang")}
                </div> */}
                <div className="flex gap-4 items-center px-4 py-4 h-16 border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] max-sm:px-4 max-sm:py-3 max-sm:h-[50px] w-full xl:flex-1">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M17.9166 16.1833L15.275 13.6833C14.7727 14.33 14.1707 14.8926 13.4916 15.35L16.2083 17.9334C16.3225 18.0668 16.4638 18.1744 16.6227 18.2492C16.7816 18.324 16.9546 18.3643 17.1302 18.3673C17.3058 18.3703 17.4801 18.336 17.6415 18.2667C17.8029 18.1974 17.9477 18.0946 18.0664 17.9652C18.1852 17.8358 18.2751 17.6826 18.3303 17.5159C18.3855 17.3491 18.4046 17.1726 18.3865 16.9979C18.3684 16.8232 18.3135 16.6543 18.2253 16.5024C18.1371 16.3505 18.0177 16.219 17.875 16.1167L17.9166 16.1833Z"
                        fill="#A1A5B7"
                      />
                      <path
                        d="M9.28333 1.66675C7.79997 1.66675 6.34992 2.10662 5.11655 2.93073C3.88318 3.75484 2.92189 4.92618 2.35423 6.29662C1.78657 7.66707 1.63805 9.17507 1.92744 10.6299C2.21683 12.0848 2.93113 13.4212 3.98003 14.47C5.02892 15.5189 6.36529 16.2332 7.82015 16.5226C9.27501 16.812 10.783 16.6635 12.1535 16.0958C13.5239 15.5282 14.6952 14.5669 15.5194 13.3335C16.3435 12.1002 16.7833 10.6501 16.7833 9.16675C16.7833 7.17762 15.9932 5.26997 14.5866 3.86345C13.1801 2.45692 11.2725 1.66675 9.28333 1.66675ZM9.28333 14.4667C8.23709 14.4667 7.21433 14.1566 6.3443 13.5755C5.47428 12.9944 4.79603 12.1685 4.39527 11.202C3.99451 10.2356 3.88923 9.17204 4.09274 8.14579C4.29624 7.11954 4.7994 6.17664 5.53862 5.43625C6.27784 4.69587 7.21994 4.19123 8.24588 3.98611C9.27181 3.78099 10.3355 3.88459 11.3026 4.28383C12.2697 4.68307 13.0967 5.36002 13.6791 6.22913C14.2616 7.09824 14.5733 8.12051 14.575 9.16675C14.5772 9.86267 14.4419 10.5522 14.1768 11.1956C13.9118 11.8391 13.5222 12.4239 13.0305 12.9164C12.5388 13.4088 11.9546 13.7993 11.3116 14.0654C10.6685 14.3315 9.97925 14.4679 9.28333 14.4667V14.4667Z"
                        fill="#A1A5B7"
                      />
                    </svg>
                  </div>

                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={n("searchplaceholder")}
                    className="w-full bg-transparent focus:outline-none text-base tracking-wide text-neutral-600 placeholder:text-neutral-400 max-sm:text-sm"
                  />
                </div>
              </div>
              {/* Filter By Country */}
              <div className="flex flex-col gap-2 items-start lg:w-60  relative">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchFilters1")}
                </div> */}
                <div
                  onClick={() => {
                    console.log("langauge clicked3");
                    const currentCountryLang =
                      langCountryRef.current !== language;
                  //  if (!countries?.countries?.length || currentCountryLang) {
                       dispatch(getAllCountries({ language: language ,entity: "institutes"}));
                      langCountryRef.current = language;
                  //  }
                    setIsCountryOpen(!isCountryOpen);
                    setIsCityOpened(false);
                    setIsAcademicDegreeOpen(false);
                    setIsMajorsOpen(false);
                    setIsStateOpen(false);
                    setIsLanguageOpen(false);
                  }}
                  className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                >
                  <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                    {selectedCountry?.name || n("searchFiltersDrd1")}
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
                    {/* حقل البحث */}
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        placeholder={`${language == "en"
                          ? "Search countries..."
                          : "ابحث عن الدولة..."
                          }`}
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
                              dispatch(
                                getAllStates({
                                  language: language,
                                  countryId: country.id,
                                })
                              );
                              dispatch(
                                getAllCities({
                                  language: language,
                                  stateId: "",
                                  countryId: country.id,
                                })
                              );
                              setSelectedCountry(country);
                              setIsCountryOpen(false);
                              setIsAcademicDegreeOpen(false);
                              setIsMajorsOpen(false);
                              setSearchCountry("");
                              setSelectedState(undefined);
                              setSelectedCity(undefined);
                            }}
                            className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                          >
                            {country.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-6 py-3 text-gray-400">
                          {language == "en"
                            ? "No results found"
                            : "لاتوجد نتائج"}
                        </div>
                      )
                    ) : (
                      <div className="px-6 py-3 text-gray-400">
                        {language == "en" ? "Loading..." : "التحميل...."}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Filter By State */}
              <div className="flex flex-col gap-2 items-start lg:w-60  relative">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchFiltersDrd2")}
                </div> */}
                <div
                  onClick={() => {
                    console.log("langauge clicked2");
                    setIsStateOpen(!isStateOpen);
                    setIsCityOpened(false);
                    setIsCountryOpen(false);
                    setIsMajorsOpen(false);
                    setIsLanguageOpen(false);
                    setIsAcademicDegreeOpen(false);
                  }}
                  className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                >
                  <span className="tracking-wide text-neutral-600 text-sm">
                    {selectedState?.name || n("searchFiltersDrd2+")}
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
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        placeholder={`${language == "en"
                          ? "Search State..."
                          : "ابحث عن الولاية..."
                          }`}
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {!states.loading ? (
                      filteredState?.length > 0 ? (
                        filteredState.map((state: any) => (
                          <div
                            key={state?.id}
                            onClick={() => {
                              dispatch(
                                getAllCities({
                                  language: language,
                                  stateId: state.id,
                                  countryId: selectedCountry?.id,
                                })
                              );
                              setSelectedState(state);
                              setIsCountryOpen(false);
                              setIsStateOpen(false);
                              setIsAcademicDegreeOpen(false);
                              setIsMajorsOpen(false);
                              setSearchState("");
                              setSelectedCity(undefined);
                            }}
                            className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                          >
                            {state.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-6 py-3 text-gray-400">
                          {language == "en"
                            ? "No results found"
                            : "لاتوجد نتائج"}
                        </div>
                      )
                    ) : (
                      <div className="px-6 py-3 text-gray-400">
                        {language == "en" ? "Loading..." : "التحميل..."}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Filter By City */}
              <div className="flex flex-col gap-2 items-start lg:w-60  relative">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchFiltersDrd3")}
                </div> */}
                <div
                  onClick={() => {
                    console.log("langauge clicked1");
                    setIsCityOpened(!isCityOpened);
                    setIsStateOpen(false);
                    setIsCountryOpen(false);
                    setIsMajorsOpen(false);
                    setIsLanguageOpen(false);
                    setIsAcademicDegreeOpen(false);
                  }}
                  className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                >
                  <span className="tracking-wide text-neutral-600 text-sm">
                    {selectedCity?.name || n("searchFiltersDrd3+")}
                  </span>
                  <svg
                    className={`${isCityOpened ? "rotate-180" : ""} `}
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

                {isCityOpened && (
                  <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        placeholder={`${language == "en"
                          ? "Search City..."
                          : "ابحث عن المدينه..."
                          }`}
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {!cities.loading ? (
                      filteredCities?.length > 0 ? (
                        filteredCities.map((city: any) => (
                          <div
                            key={city?.id}
                            onClick={() => {
                              setSelectedCity({
                                name: city.name,
                                id: city.id,
                              });
                              setSelectedState(undefined);
                              setIsCountryOpen(false);
                              setIsStateOpen(false);
                              setIsAcademicDegreeOpen(false);
                              setIsMajorsOpen(false);
                              setSearchCity("");
                            }}
                            className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                          >
                            {city.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-6 py-3 text-gray-400">
                          {language == "en"
                            ? "No results found"
                            : "لاتوجد نتائج"}
                        </div>
                      )
                    ) : (
                      <div className="px-6 py-3 text-gray-400">
                        {language == "en" ? "Loading..." : "التحميل..."}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Filter By  Language */}
              <div className="flex flex-col gap-2 items-start lg:w-60  relative">
                {/* <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                  {n("searchFiltersDrd4")}
                </div> */}
                <div
                  onClick={() => {
                    console.log("langauge clicked0");
                    setIsLanguageOpen(!isLanguageOpen);
                    setIsCountryOpen(false);
                    setIsCityOpened(false);
                    setIsMajorsOpen(false);
                    setIsStateOpen(false);
                    setIsAcademicDegreeOpen(false);
                  }}
                  className="flex justify-between items-center py-4 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 h-[60px] rounded-[64px] cursor-pointer max-sm:px-4 max-sm:py-3 max-sm:h-[50px]"
                >
                  <span className="tracking-wide text-neutral-600 text-sm">
                    {selectedLanguage || n("searchFiltersDrd4+")}
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
            </div>
          )}
        </div>
        <div className="flex xl:justify-end flex-col gap-1  items-end px-4 py-0 mt-4 rounded-[64px]  max-md:mt-5 max-sm:text-sm">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 justify-center px-5 lg:px-10 py-1 lg:py-2 rounded-[50px] max-md:px-14 max-md:py-2.5  bg-primary text-white"
          >
            {n("searchButtonlang")}
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M20.0001 17.42L16.8301 14.42C16.2274 15.196 15.505 15.8711 14.6901 16.42L17.9501 19.52C18.0871 19.6801 18.2566 19.8093 18.4473 19.8991C18.638 19.9889 18.8456 20.0371 19.0563 20.0408C19.2671 20.0444 19.4762 20.0032 19.6699 19.9201C19.8635 19.8369 20.0373 19.7136 20.1798 19.5583C20.3223 19.403 20.4302 19.2192 20.4964 19.0191C20.5627 18.819 20.5857 18.6071 20.564 18.3975C20.5422 18.1878 20.4763 17.9852 20.3705 17.8029C20.2646 17.6206 20.1214 17.4629 19.9501 17.34L20.0001 17.42Z"
                fill="white"
              />
              <path
                d="M9.64002 0C7.85999 0 6.11993 0.527841 4.63989 1.51677C3.15984 2.50571 2.00629 3.91131 1.3251 5.55585C0.643914 7.20038 0.465684 9.00998 0.812951 10.7558C1.16022 12.5016 2.01739 14.1053 3.27606 15.364C4.53473 16.6226 6.13838 17.4798 7.88421 17.8271C9.63003 18.1743 11.4396 17.9961 13.0842 17.3149C14.7287 16.6337 16.1343 15.4802 17.1232 14.0001C18.1122 12.5201 18.64 10.78 18.64 9C18.64 6.61305 17.6918 4.32387 16.004 2.63604C14.3162 0.948212 12.027 0 9.64002 0ZM9.64002 15.36C8.38453 15.36 7.15722 14.9878 6.11319 14.2905C5.06915 13.5932 4.25526 12.6021 3.77435 11.4423C3.29344 10.2826 3.1671 9.00636 3.41131 7.77485C3.65552 6.54335 4.2593 5.41187 5.14637 4.52341C6.03343 3.63495 7.16396 3.02938 8.39508 2.78324C9.6262 2.53709 10.9027 2.66142 12.0631 3.1405C13.2236 3.61958 14.216 4.43192 14.915 5.47486C15.6139 6.51779 15.988 7.74452 15.99 9C15.9927 9.83511 15.8303 10.6625 15.5122 11.4347C15.1942 12.2068 14.7267 12.9086 14.1366 13.4995C13.5466 14.0905 12.8456 14.5591 12.0739 14.8784C11.3023 15.1976 10.4751 15.3613 9.64002 15.36V15.36Z"
                fill="white"
              />
            </svg>
          </button>
          {error ? <span className="text-red-500">{n("errorMessage")} !</span> : ""}
        </div>
      </div>
    </div>
  );
}

export default NewSearch;
