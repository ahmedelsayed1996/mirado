"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useTranslations } from "next-intl";
import useCurrentLang from '../_hooks/useCurrentLang';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversities } from '../reduxTool-kit/slices/universitiesSlice';

import Spinner from './Spinner';
import { AppDispatch } from '../store';

interface DropdownProps {
  label: string;
  options: string[] | { fields: string[] };
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, setSelected, onChange }) => {
  const isOptionsArray = Array.isArray(options);
  const optionItems = isOptionsArray ? options : options.fields || [];
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
              {option.name?.slice(0, 27)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


function SearchUNI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedFields, setSelectedFields] = useState<string>('');
  const [selectedMajors, setSelectedMajors] = useState<string>('');
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user);
  const language = useCurrentLang();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('home');

  // get all filter data
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
  const getAllStates = async (eve: any) => {
    // console.log(eve);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/states?limit=9000&page=1&countryId=${eve}`, {
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
      getAllCities("", eve);
      // console.log();
    } catch (error: any) {
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
    } catch (error: any) {
      console.error('Error:', error);

    }
  }
  const getAllMajors = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/majors?limit=9000&page=1`, {
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
      setMajors(result.data)

    } catch (error) {
      console.error('Error:', error);
    }
  }
  const getAllFields = async (eve: any) => {
    // console.log(eve);
    const idMajor = eve;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/majors/${idMajor}`, {
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
      setFields(result)

    } catch (error) {
      console.error('Error:', error);
    }
  }



  const handleSearch = (eve: any) => {
    setIsLoading(true);
    eve.preventDefault();
    const searchValue = eve.target.search.value;
    const row = {
      "language": language,
      "search": searchValue,
      "country": selectedCountry,
      "state": selectedState,
      "city": selectedCity,
      "majors": selectedMajors,
      "fields": selectedFields,
      "userId": user.id,
    }
    dispatch(getAllUniversities(row));

    eve.target.search.value = "";
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedMajors("");
    setSelectedFields("");
    setFields([]);
    setIsLoading(false);
    window.scrollTo({
      top: 500,
      left: 0,
      behavior: "smooth",
    });

  }

  useEffect(() => {
    getAllCountry();
    getAllMajors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  return (
    <div className="flex flex-col self-stretch p-8 mt-2.5 text-base bg-white rounded-2xl shadow-2xl max-md:px-5 max-md:max-w-full">
      <form onSubmit={handleSearch}>
        <div className=" gap-2.5 p-2.5 capitalize bg-secondColor rounded-xl text-zinc-500 max-md:flex-wrap max-md:pl-5">
          <div className="relative">
            <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
              <button type="button" className="text-gray-600 hover:text-gray-700">
                <span className="sr-only">Search</span>

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
            <label htmlFor="Search" className="sr-only"> Search </label>
            <input
              type="text"
              id="Search"
              name="search"
              placeholder={t("searchBarUni")}
              className="w-full rounded-md border-none py-2.5 ps-10 sm:text-sm bg-secondColor focus:outline-none"
            />
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
              onChange={getAllMajors}
            />
            <Dropdown
              label={t("searchFilters3")}
              options={majors}
              selected={selectedMajors}
              setSelected={setSelectedMajors}
              onChange={getAllFields}
            />
            <Dropdown
              label={t("searchFilters4")}
              options={fields}
              selected={selectedFields}
              setSelected={setSelectedFields}
              onChange={console.log}
            />
          </div>
          {isLoading ? <button className="justify-center font-medium tracking-tight text-center rounded-xl leading-[150%] max-md:px-5  hover:bg-white transition-all duration-300"><Spinner /></button> : <button className="justify-center px-12 py-2.5 my-auto font-medium tracking-tight text-center text-white whitespace-nowrap bg-primary rounded-xl leading-[150%] max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
            {t("searchButton")}
          </button>}

        </div>
      </form>
    </div>
  )
}
export default SearchUNI
