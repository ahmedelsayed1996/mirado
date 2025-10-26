"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useTranslations } from "next-intl";
import useCurrentLang from '../_hooks/useCurrentLang';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLanguageSchools } from '../reduxTool-kit/slices/languageSchoolsSlice';
import { AppDispatch } from '../store';
interface DropdownProps {
  label: string;
  options: string[] | { data: string[] } | { name: string }[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, setSelected, onChange }) => {

  const isOptionsArray = Array.isArray(options);
  const optionItems = isOptionsArray ? options : options?.data || [];
  const t = useTranslations('home');

  return (
    <div className="flex gap-2.5 p-2.5 rounded-xl flex-wrap">
      <div className="flex flex-col w-full md:w-1/3 lg:w-auto">
        <div className="font-medium text-gray-900 ms-[5px]">{label}</div>
        <select
          className="mt-1.5 text-slate-500 focus:outline-none w-12 overflow-hidden text-ellipsis"
          style={{ width: "100px" }}
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            onChange(e.target.value);
          }}
        >
          <option value="" disabled>{t("searchFiltersDrd1")}...</option>
          {optionItems.map((option: any, index: number) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SearchINS: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [studyLanguage, setStudyLanguage] = useState<Object[]>([]);
  const language = useCurrentLang();
  const t = useTranslations('home');
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.displayUser);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const languages = [{ name: "English" }, { name: "French" }, { name: "Italian" }, { name: "German" }, { name: "Chinese" }, { name: "Spanish" }, { name: "Korean" }];


  const getAllCountry = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/countries?limit=9000&page=1`, {
        method: 'GET',
        headers: {
          "Accept-Language": `${language}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setCountries(result)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const getAllStates = async (countryId: any) => {
    // console.log("countryId", countryId); // 2
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/states?limit=9000&page=1&countryId=${countryId}`, {
        method: 'GET',
        headers: {
          "Accept-Language": `${language}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setStates(result);
      getAllCities("", countryId);
      // console.log();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const getAllCities = async (stateId: any, countryId = "") => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cities?limit=9000&page=1&stateId=${stateId}&countryId=${countryId}`, {
        method: 'GET',
        headers: {
          "Accept-Language": `${language}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log(result);
      setCities(result);
    } catch (error) {
      console.error('Error:', error);

    }
  }

  const handleSearch = (eve: any) => {
    eve.preventDefault();
    const searchValue = eve.target.search.value;
    const row = {
      "language": language,
      "search": searchValue,
      "country": selectedCountry,
      "state": selectedState,
      "city": selectedCity,
      "languageStudy": selectedLanguage,
      "userId": user.id,
    }

    // console.log(row);

    dispatch(getAllLanguageSchools(row));
    eve.target.search.value = "";
    setSelectedCountry("")
    setSelectedState("")
    setSelectedCity("")
    setStates([]);
    setCities([]);

    window.scrollTo({
      top: 500,
      left: 0,
      behavior: "smooth",
    });


  }

  useEffect(() => {
    getAllCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col self-stretch p-8 mt-2.5 text-base bg-white rounded-2xl shadow-2xl max-md:px-5 max-md:max-w-full">
      <form onSubmit={handleSearch}>
        <div className="gap-2.5 p-2.5 capitalize bg-secondColor rounded-xl text-zinc-500 max-md:flex-wrap max-md:pl-5">
          <div className="relative">
            <label htmlFor="search" className="sr-only"> Search </label>

            <input
              type="text"
              id="search"
              name="search"
              placeholder={t("searchBarIns")}
              className="w-full rounded-md border-none py-2.5 pe-10 sm:text-sm bg-secondColor px-10 focus:outline-none"
            />

            <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
              <button type="button" className="text-gray-600 hover:text-gray-700">
                <span className="sr-only">{t("searchButton")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>

        <div className="flex gap-4 justify-between mt-6 w-full max-md:flex-wrap max-md:max-w-full flex-col lg:flex-row">
          <div className="flex gap-4 capitalize flex-wrap ">
            <Dropdown
              label={t("searchFilters1")}
              options={countries}
              selected={selectedCountry}
              setSelected={setSelectedCountry}
              onChange={getAllStates}
            />
            <Dropdown
              label={t("searchFiltersDrd2")}
              options={states}
              selected={selectedState}
              setSelected={setSelectedState}
              onChange={getAllCities}
            />
            <Dropdown
              label={t("searchFiltersDrd3")}
              options={cities}
              selected={selectedCity}
              setSelected={setSelectedCity}
              onChange={console.log}
            />
            <Dropdown
              label={t("searchFiltersDrd4")}
              options={languages}
              selected={selectedLanguage}
              setSelected={setSelectedLanguage}
              onChange={console.log}

            />

          </div>
          <button className="justify-center px-12 py-2.5 my-auto font-medium tracking-tight text-center text-white whitespace-nowrap bg-primary rounded-xl leading-[150%] max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
            {t("searchButton")}
          </button>
        </div>
      </form>
    </div >
  );
};

export default SearchINS;

