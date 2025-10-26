import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchINS from './SearchINS';
import SearchUNI from './SearchUNI';
import useCurrentLang from '../_hooks/useCurrentLang';
import { useRouter } from 'next/navigation';

function Hero() {
  const t = useTranslations("home");
  const [activeButton, setActiveButton] = useState<String>("UNI");
  const [countries, setCountries] = useState<Object[]>([]);
  const [states, setStates] = useState<Object[]>([]);
  const [cities, setCities] = useState<Object[]>([]);
  const [majors, setMajors] = useState<Object[]>([]);
  const [formState, setFormState] = useState({
    country: "",
    state: "",
    city: "",
    academicDegree: "",
    majors: "",
    search: "",
    languageStudy: "",
  });
  const router = useRouter()
  const language = useCurrentLang();

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/states?limit=1000&page=1&countryId=${eve}&format=true`, {
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
      // console.log("State: ", result);
      getAllCities("", eve);
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
  const getAllMajors = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/majors?limit=9000page=1`, {
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(name, value);
  };
  const handleSubmitToSearch = (e: any) => {
    e.preventDefault();
    localStorage.setItem("searchResult", JSON.stringify(formState));
    if (activeButton == "Ins") {
      router.push(`${language}/language-schools`);
    } else {
      router.push(`${language}/university`);
    }
  }

  useEffect(() => {
    getAllCountry();
    getAllMajors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-end w-full bg-primary  max-md:max-w-full">
            <div className="flex overflow-hidden relative flex-col justify-center  w-full min-h-[565px] md:min-h-[800px] max-md:px-5 max-md:max-w-full">
              <Image
                src="/images/hero-section.svg"
                alt="banner of hero section"
                fill={true}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col my-8 md:mt-20   ">
            <div className="flex flex-col pl-2 text-xl font-semibold tracking-normal text-start max-md:ps-5   capitalize">
              <div className="text-primary leading-[134%]  ">
                {t("head")}
              </div>
              <div
                className="mt-5 text-2xl lg:text-5xl text-gray-900  max-md:max-w-full tracking-wide leading-8 md:leading-10"
              >
                {t("subHead")}
              </div>
              <div className="mt-5 text-[#6C7278] max-md:max-w-full font-normal text-base md:text-xl lg:text-2xl">
                {t("secondHead")}
              </div>
            </div>
            <div className="flex flex-col pl-2 mt-8  ">
              <div className="flex gap-2.5 text-base md:text-xl tracking-tight leading-8 capitalize rounded-2xl">
                <button
                  onClick={() => setActiveButton("UNI")}
                  className={`justify-center px-5 lg:px-10 py-1 lg:py-2 rounded-[50px] max-md:px-5 ${activeButton === "UNI"
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {t("UNI")}
                </button>
                <button
                  onClick={() => setActiveButton("Ins")}
                  className={`justify-center px-5 lg:px-10 py-1 lg:py-2 rounded-[50px] max-md:px-5 ${activeButton === "Ins"
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {t("Ins")}
                </button>
              </div>
              {/* search section  */}
              <form onSubmit={handleSubmitToSearch} className='me-2'>
                {activeButton === "UNI"
                  ? <div className="flex flex-col self-stretch p-8 mt-2.5 text-base bg-white rounded-2xl shadow-2xl max-md:px-5  ">
                    <div className=" gap-2.5 md:p-2  capitalize bg-secondColor rounded-xl text-zinc-500 max-md:flex-wrap max-md:pl-5">
                      <div className="relative">
                        <label htmlFor="Search" className="sr-only">
                          {" "}
                          Search{" "}
                        </label>

                        <input
                          type="text"
                          id="Search"
                          name='search'
                          placeholder={t("searchBarUni")}
                          value={formState.search}
                          onChange={handleChange}
                          className="w-full rounded-md border-none py-2.5 ps-5 sm:text-sm bg-secondColor focus:outline-none"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
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
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-between mt-6 w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex gap-4 capitalize flex-wrap">
                        <div className="flex gap-2.5 p-2.5 rounded-xl w-1/2 lg:w-auto">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900 ms-[5px]">{t("searchFilters1")}</div>
                            <select
                              className="mt-1.5 text-slate-500 focus:outline-none w-32 overflow-hidden text-ellipsis"
                              style={{ width: "110px" }}
                              value={formState.country}
                              onChange={handleChange}
                              name='country'
                            >
                              <option value="" disabled>{t("searchFiltersDrd1")} ...</option>
                              {countries && countries.map((country: any, index) => {
                                return (
                                  <option key={index} value={country.id}>{country.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2.5 p-2.5 rounded-xl w-1/3 lg:w-auto">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900 ms-[5px]">{t("searchFilters2")}</div>
                            <select
                              className="mt-1.5 text-slate-500 focus:outline-none w-32 overflow-hidden text-ellipsis"
                              style={{ width: "150px" }}
                              value={formState.academicDegree}
                              onChange={handleChange}
                              name="academicDegree"
                            >
                              {language == "en" ? <>
                                <option value=""> Choose ...</option>
                                <option value="Bachelor's">Bachelor&apos;s</option>
                                <option value="Master">Master </option>
                                <option value="Ph.D">Ph.D </option>
                                <option value="Diploma">Diploma </option>
                                <option value="Certificate">Certificate </option>
                              </> : <>
                                <option value=""> اختر ...</option>
                                <option value="Bachelor's">بكالوريوس</option>
                                <option value="Master">ماجستير </option>
                                <option value="Ph.D">دكتوراه </option>
                                <option value="Diploma">دبلومة </option>
                                <option value="Certificate">شهادة </option>
                              </>}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2.5 p-2.5 rounded-xl w-1/2 lg:w-auto">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900 ms-[5px]">{t("searchFilters3")}</div>
                            <select
                              className="mt-1.5 text-slate-500 focus:outline-none w-2 overflow-hidden text-ellipsis"
                              style={{ width: "150px" }}
                              value={formState.majors}
                              onChange={handleChange}
                              name="majors"
                            >
                              <option value="" disabled>{t("searchFiltersDrd1")} ...</option>
                              {majors && majors.map((major: any, index) => {
                                return (
                                  <option key={index} value={major.id}>{major.name}</option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <button className="justify-center px-6 py-2.5 my-auto font-medium tracking-tight text-center text-white  bg-primary rounded-xl leading-[150%] border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-1/3 lg:w-auto">
                          {t("searchButton")}
                        </button>
                      </div>
                    </div>
                  </div>
                  : <div className="flex flex-col self-stretch p-8 mt-2.5 text-base bg-white rounded-2xl shadow-2xl max-md:px-5 max-md:max-w-full">
                    <div className=" gap-2.5  md:p-2 capitalize bg-secondColor rounded-xl text-zinc-500 max-md:flex-wrap max-md:pl-5">
                      <div className="relative">
                        <label htmlFor="Search" className="sr-only">
                          {" "}
                          Search{" "}
                        </label>

                        <input
                          type="text"
                          id="Search"
                          value={formState.search}
                          name='search'
                          onChange={handleChange}
                          placeholder={t("searchBarIns")}
                          className="w-full rounded-md border-none py-2.5 ps-5 sm:text-sm bg-secondColor focus:outline-none"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
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
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 justify-between mt-6 w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex gap-4 capitalize flex-wrap">
                        <div className="flex gap-2.5 p-2.5 rounded-xl w-1/2 lg:w-auto">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900 ms-[5px]">{t("searchFilters1")}</div>
                            <select
                              className="mt-1.5 text-slate-500 focus:outline-none w-32 overflow-hidden text-ellipsis"
                              style={{ width: "100px" }}
                              value={formState.country}
                              onChange={(e) => {
                                handleChange(e);
                                getAllStates(e.target.value);
                              }}
                              name='country'
                            >
                              <option value="" disabled>{t("searchFiltersDrd1")} ...</option>
                              {countries && countries.map((country: any, index) => {
                                return (
                                  <option key={index} value={country.id}>{country.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2.5 p-2.5 rounded-xl w-1/3 lg:w-auto">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900 ms-[5px]">{t("searchFiltersDrd2")}</div>
                            <select
                              className="mt-1.5 text-slate-500 focus:outline-none w-32 overflow-hidden text-ellipsis"
                              style={{ width: "120px" }}
                              value={formState.state}
                              onChange={(e) => {
                                handleChange(e);
                                getAllCities(e.target.value);
                              }}
                              name='state'
                            >
                              <option value="" disabled>{t("searchFiltersDrd1")} ...</option>
                              {states && states?.map((state: any, index) => {
                                return (
                                  <option key={index} value={state.id}>{state.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2.5 p-2.5 rounded-xl w-1/2 lg:w-auto">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900 ms-[5px]"> {t("searchFiltersDrd3")}</div>
                            <select
                              className="mt-1.5 text-slate-500 focus:outline-none  overflow-hidden text-ellipsis"
                              style={{ width: "100px" }}
                              value={formState.city}
                              onChange={handleChange}
                              name="city"
                            >
                              <option value="" disabled>{t("searchFiltersDrd1")} ...</option>
                              {cities && cities.map((city: any, index) => <option key={index} value={city.id}>{city.name}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2.5 p-2.5 rounded-xl w-1/3 lg:w-auto">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-900 ms-[5px]"> {t("searchFiltersDrd4")}</div>
                            <select
                              className="mt-1.5 text-slate-500 focus:outline-none "
                              value={formState.languageStudy}
                              onChange={handleChange}
                              name="languageStudy"
                            >
                              {language == "en" ? <>
                                <option value=""> Choose ...</option>
                                <option value="English">English</option>
                                <option value="Arabic">Arabic </option>
                                <option value="Italian">Italian </option>
                                <option value="German">German </option>
                                <option value="Chinese">Chinese </option>
                                <option value="Spanish">Spanish </option>
                                <option value="Korean">Korean </option>
                                <option value="French">French</option>
                              </> : <>
                                <option value=""> اختر ...</option>
                                <option value="اللغة الانجليزية">اللغة الانجليزية</option>
                                <option value="اللغة العربية">اللغة العربية</option>
                                <option value="اللغة الإيطالية">اللغة الإيطالية</option>
                                <option value="اللغةالالمانية">اللغةالالمانية</option>
                                <option value="اللغةالصينية">اللغةالصينية</option>
                                <option value="اللغةالاسبانية">اللغةالاسبانية</option>
                                <option value="اللغةالكورية">اللغةالكورية</option>
                                <option value="اللغةالفرنسية">اللغةالفرنسية</option>
                              </>}
                            </select>
                          </div>
                        </div>
                      </div>
                      <button className="justify-center px-12 py-2.5 my-auto font-medium tracking-tight text-center text-white whitespace-nowrap bg-primary rounded-xl leading-[150%] max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 ">
                        {t("searchButton")}
                      </button>
                    </div>
                  </div>
                }
              </form>
              <div className="mt-8 max-w-full ">
                <div className="flex gap-1 flex-wrap md:gap-0 justify-center">
                  <div className="flex flex-col items-start  w-1/2 md:w-3/12 max-md:ml-0 ">
                    <div className="flex flex-col grow leading-[150%] max-md:mt-10">
                      <div className="sm:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 max-md:text-4xl">
                        10 {t("counter5")}<span className="text-primary">+</span>
                      </div>
                      <div className="mt-1.5 sm:text-sm lg:text-lg font-medium tracking-tight text-start text-[#6C7278]">
                        {t("counter1")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start  w-1/3 md:w-3/12 max-md:ml-0 ">
                    <div className="flex flex-col grow leading-[150%] max-md:mt-10">
                      <div className="sm:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 max-md:text-4xl">
                        900<span className="text-primary">+</span>
                      </div>
                      <div className="mt-1.5 sm:text-sm lg:text-lg font-medium tracking-tight text-start text-[#6C7278]">
                        {t("counter2")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start  w-1/2 md:w-3/12 max-md:ml-0 ">
                    <div className="flex flex-col grow leading-[150%] max-md:mt-10">
                      <div className="sm:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 max-md:text-4xl">
                        1500<span className="text-primary">+</span>
                      </div>
                      <div className="mt-1.5 sm:text-sm lg:text-lg font-medium tracking-tight text-start text-[#6C7278]">
                        {t("counter3")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start  w-1/3 md:w-3/12 max-md:ml-0 ">
                    <div className="flex flex-col grow leading-[150%] max-md:mt-10">
                      <div className="sm:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900 max-md:text-4xl">
                        100 {t("counter5")}<span className="text-primary">+</span>
                      </div>
                      <div className="mt-1.5 sm:text-sm lg:text-lg font-medium tracking-tight text-start text-[#6C7278]">
                        {t("counter4")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero
