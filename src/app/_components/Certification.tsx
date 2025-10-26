"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { parseCookies } from "nookies";
import useCurrentLang from "../_hooks/useCurrentLang";
import { toast } from "react-toastify";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import Loader from "./Loader";
import Spinner from "./Spinner";
import { AppDispatch } from "../store";
import { useTranslations } from "next-intl";

const allCountries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

function Certification({ currentUser }: { currentUser: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { tokenMainSite } = parseCookies();
  const locale = useCurrentLang();
  const t = useTranslations("Profile");
  const [formData, setFormData] = useState({
    certificationName: '',
    dateOfGraduation: '',
    instituteUniversity: '',
    grad: '',
    country: ''
  });
  // console.log("currentUser", currentUser);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (eve: any) => {
    eve.preventDefault();
    setIsLoading(true);
    const raw = JSON.stringify({
      // "user_id": currentUser.id,
      // "quizzeTitle": formData.testTitle,
      // "quizzeData": new Date(formData.date),
      // "quizzeScore": formData.testGrade,
      // "Institute_or_university": formData.universityInstitute
      "user_id": currentUser.id,
      "name": formData.certificationName,
      "dateOfGraduation": new Date(formData.dateOfGraduation),
      "rating": formData.grad,
      "Institute_or_university": formData.instituteUniversity,
      "country": formData.country
    });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/certificates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenMainSite}`
        },
        body: raw
      })
      const result = await res.json();
      toast.success("Add Certification Successfully");
      setIsLoading(false);
      dispatch(getUser({ tokenMainSite, locale }))
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error)
    }

  }

  return (
    <div className="flex overflow-hidden flex-col self-start p-2 md:p-4 lg:p-8 pb-4 bg-white rounded-3xl border border-gray border-solid  w-full md:w-4/6 md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">

          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d76d62869a51d548cc519538c49754b929fd64607c5658ac30bccdebc57701f6?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[35px]"
          /> */}
          <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="35" height="35" rx="17.5" fill="#1E4C83" />
            <path d="M16.2124 9.81902L10.6941 13.4215C8.9249 14.5765 8.9249 17.1615 10.6941 18.3165L16.2124 21.919C17.2024 22.5698 18.8341 22.5698 19.8241 21.919L25.3149 18.3165C27.0749 17.1615 27.0749 14.5857 25.3149 13.4307L19.8241 9.82818C18.8341 9.16818 17.2024 9.16818 16.2124 9.81902Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.1615 19.4883L12.1523 23.7874C12.1523 24.9516 13.0507 26.1983 14.1507 26.5649L17.0748 27.5366C17.579 27.7016 18.4132 27.7016 18.9265 27.5366L21.8507 26.5649C22.9507 26.1983 23.849 24.9516 23.849 23.7874V19.5341" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.6172 21.25V15.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex-1 shrink self-stretch my-auto text-lg font-bold text-blue-900 basis-7 max-md:max-w-full">
          {t("nav2")}
          </div>
          {/* <div className="flex  shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
            <Link
              href={`/${window.location.pathname.slice(1, 3)}/#`}
              className="flex items-center justify-center text-center p-4 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-80 mx-auto"
            >
              <span className="font-bold text-2xl mx-1  items-center justify-center text-center w-6 h-8 ">
                +
              </span>{" "}
              Add a new certificate
            </Link>
          </div> */}
        </div>
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/24eb0d2eb07f7bbdcf196c6c052c8b34d8930b610da27a97d3fe815b1d92c12f?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
          className="object-contain mt-4 w-full aspect-[1000] max-md:max-w-full"
        /> */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-6 mt-8 w-full font-medium bg-white rounded-3xl border border-solid border-zinc-100 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("certificate")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="date"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  name="dateOfGraduation"
                  value={formData.dateOfGraduation}
                  required
                  onChange={handleInputChange}
                  placeholder="02/02/2024"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("certificate1")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="text"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  value={formData.certificationName}
                  onChange={handleInputChange}
                  required
                  name="certificationName"
                  placeholder={t("certificate2")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 items-center mt-7 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("certificate3")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="text"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  value={formData.grad}
                  required
                  name="grad"
                  onChange={handleInputChange}
                  placeholder={t("certificate4")}
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <div className="flex-1 shrink gap-0.5 self-stretch w-full text-base text-gray-900 max-md:max-w-full text-start">
                <span>{t("certificate5")}</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center px-2.5 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                <input
                  type="text"
                  className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                  value={formData.instituteUniversity}
                  required
                  name="instituteUniversity"
                  onChange={handleInputChange}
                  placeholder={t("certificate6")}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 items-center mt-7 w-full whitespace-nowrap max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <label className="block text-sm font-medium text-gray-700 text-start">
              {t("certificate7")}
              </label>
              <div className="relative mt-1">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/64a1349ea8ac5c1fc90ba025c42da50d5e37c1765e02d44d3c4655bfa105e5f9?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                /> */}
                <select
                  value={formData.country}
                  required
                  name="country"
                  onChange={handleInputChange}
                  className="block w-full py-2 pl-10 pr-3  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-zinc-100 focus:border-zinc-100 sm:text-sm"
                >
                  <option value="" disabled>
                  {t("certificate8")} ...
                  </option>
                  {allCountries.map((country, index) => <option key={index} value={country}>{country}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-center mt-10  text-base text-start  text-white max-md:max-w-full">
            <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
              {isLoading ? <Spinner /> : <button

                className="flex items-center justify-center text-center p-2 md:p-4 whitespace-nowrap text-white bg-primary rounded-xl md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-full md:w-80 mx-auto"
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
                {t("certificate9")}
              </button>}

            </div>
            {/* <div className="flex shrink gap-2.5 items-center self-stretch my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
            <Link
              href={`/${window.location.pathname.slice(1, 3)}/#`}
              className="flex items-center justify-center text-center p-4 whitespace-nowrap  border  border-solid  text-primary bg-white rounded-xl max-md:px-5 border-primary hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-52 mx-auto"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/34db0987c31af22b7736e15be291560000124ab4a68db91b198dd6b44326cb6e?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                className="flex items-center justify-center mx-2 my-auto w-5 aspect-square"
              />
              Delete certificate
            </Link>
          </div> */}
          </div>
        </div>
      </form>
      <div className="mt-5">
        {currentUser.Certificates && currentUser.Certificates.map((certificate: any, index: number) => {
          return (
            <div key={index} className="flex flex-col flex-1 shrink justify-center px-5 py-4 rounded-lg  hover:bg-[#bad0eb]  border-dashed border my-2 border-gray basis-0 bg-zinc-50 min-w-[240px] max-md:max-w-full cursor-pointer">
              <label htmlFor="s" className="flex flex-wrap gap-5 items-center w-full max-md:max-w-full cursor-pointer">
                {/* <input
                        required
                        id={office.id}
                        value={office.id}
                        type="radio"
                        name="office"
                        className="shrink-0 self-stretch my-auto w-6 h-6 border-gray-300 rounded-full cursor-pointer"
                      /> */}
                <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full cursor-pointer">
                  <div className="self-start text-lg leading-none">
                  {t("certificate10")}:  {certificate.name} <br /><br />
                  {t("certificate11")}:  {certificate.rating}
                  </div>
                  <div className="flex flex-wrap gap-1 items-center mt-2.5 w-full text-base tracking-wide leading-none max-md:max-w-full">
                    <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.75 9.14329C0.75 4.24427 4.65501 0.25 9.5 0.25C14.345 0.25 18.25 4.24427 18.25 9.14329C18.25 11.5084 17.576 14.0479 16.3844 16.2419C15.1944 18.4331 13.4556 20.3372 11.2805 21.3539C10.1506 21.882 8.84943 21.882 7.71949 21.3539C5.54437 20.3372 3.80562 18.4331 2.61556 16.2419C1.42403 14.0479 0.75 11.5084 0.75 9.14329ZM9.5 1.75C5.50843 1.75 2.25 5.04748 2.25 9.14329C2.25 11.2404 2.85263 13.5354 3.9337 15.526C5.01624 17.5192 6.54602 19.1496 8.35465 19.995C9.08205 20.335 9.91795 20.335 10.6454 19.995C12.454 19.1496 13.9838 17.5192 15.0663 15.526C16.1474 13.5354 16.75 11.2404 16.75 9.14329C16.75 5.04748 13.4916 1.75 9.5 1.75ZM9.5 6.75C8.25736 6.75 7.25 7.75736 7.25 9C7.25 10.2426 8.25736 11.25 9.5 11.25C10.7426 11.25 11.75 10.2426 11.75 9C11.75 7.75736 10.7426 6.75 9.5 6.75ZM5.75 9C5.75 6.92893 7.42893 5.25 9.5 5.25C11.5711 5.25 13.25 6.92893 13.25 9C13.25 11.0711 11.5711 12.75 9.5 12.75C7.42893 12.75 5.75 11.0711 5.75 9Z" fill="#141522" />
                    </svg>
                    <div className=" self-start shrink my-auto  ">
                      {certificate.country}
                    </div>

                  </div>
                </div>

              </label>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Certification;
