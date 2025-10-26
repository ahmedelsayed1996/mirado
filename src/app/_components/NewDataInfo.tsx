"use client"
import { useEffect, useState } from "react";
import { nationalities } from "../_hooks/nationalities";
import { countries } from "../_hooks/countries";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { getAllCountries } from "../reduxTool-kit/slices/countriesSlice";
import { displayUser } from "../reduxTool-kit/slices/displayUserSlice";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { useTranslations } from "next-intl";
import Spinner from "./Spinner";
import dynamic from "next/dynamic";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

const PhoneInput = dynamic(() => import("react-phone-input-2"), {
    ssr: false,
    loading: () => <div className="h-12 w-full flex items-center justify-center">Loading...</div>,
});

import "react-phone-input-2/lib/style.css";
function NewDataInfo({ currentUser }: any) {

    const dispatch = useDispatch<AppDispatch>();
    const locale = useCurrentLang();
    const t = useTranslations("Profile");
    const l = useTranslations("Login");
    const { tokenMainSite } = parseCookies();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        fromWhere: "",
        phone: "",
        gender: "",
        dob: "",
        nationality: "",
        nationalityAr: "",
        residence: "",
        country: "",
        countryAr: "",
    });
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        fromWhere: "",
        phone: "",
        gender: "",
        dob: "",
        nationality: "",
        nationalityAr: "",
        residence: "",
        country: "",
        countryAr: "",
    });
    const [country, setCountry] = useState<string>("");
    const [countryAr, setCountryAr] = useState<string>("");
    const [countryOfNationality, setCountryOfNationality] = useState<string>("");
    const [countryOfNationalityAR, setCountryOfNationalityAR] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.length <= 10) {
            setError((prev) => ({
                ...prev,
                phone: l("massage7"),
            }));
            return;
        }

        const nationalityData = nationalities.find(item => item.nationality === countryOfNationality || item.nationality_ar === countryOfNationality);
        const countryChoose = countries.find(item => item.country === country || item.country_ar === country);

        const formDataBuildIn = new FormData();
        formDataBuildIn.append("first_name", formData.firstName);
        formDataBuildIn.append("last_name", formData.lastName);
        if (formData.gender) {
            formDataBuildIn.append("gender", formData.gender);
        }
        if (formData.phone) {
            formDataBuildIn.append("phone_number", formData.phone);
        }
        formDataBuildIn.append("date_of_birth", `${new Date(formData.dob).toISOString()}`);
        formDataBuildIn.append("nationality", nationalityData?.nationality || "");
        formDataBuildIn.append("nationality_ar", nationalityData?.nationality_ar || "");
        formDataBuildIn.append("hear_about_us", formData.fromWhere || "");
        if (countryChoose) {
            formDataBuildIn.append("country", countryChoose?.country || "");
            formDataBuildIn.append("country_ar", countryChoose?.country_ar || "");
        }

        setError((prev) => ({
            ...prev,
            phone: "",
        }));
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${currentUser.id}`, {
                method: "PATCH",
                body: formDataBuildIn,
                headers: {
                    "Accept-Language": locale,
                    Authorization: `Bearer ${tokenMainSite}`
                },
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }

            const result = await res.json();
            toast.success("Data Update Successfully");
            setIsLoading(false);
            dispatch(getUser({ tokenMainSite, locale }));
            dispatch(displayUser({ tokenMainSite, locale }));
            setIsDirty(false);
        } catch (error: any) {
            toast.error(error.message);
            console.error("Error:", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser) {
            const nationalityObj: any = nationalities.find(item => item.nationality === currentUser.nationality || item.nationality_ar === currentUser.nationality);
            const countryObj: any = countries.find(item => item.country === currentUser.country || item.country_ar === currentUser.country);
            const dateOnly = new Date(currentUser.date_of_birth ? currentUser.date_of_birth : "2000-05-05T00:00:00.000Z")?.toISOString().split("T")[0];
            setFormData((prev) => ({
                ...prev,
                firstName: currentUser.first_name,
                lastName: currentUser.last_name,
                phone: currentUser.phone_number,
                gender: currentUser.gender,
                dob: dateOnly,
                nationality: nationalityObj?.nationality,
                nationalityAr: nationalityObj?.nationality_ar,
                country: countryObj?.country,
                countryAr: countryObj?.country_ar,
                fromWhere: currentUser?.hear_about_us
            }));
            setCountry(countryObj?.country);
            setCountryAr(countryObj?.country_ar);
            setCountryOfNationality(nationalityObj?.nationality);
            setCountryOfNationalityAR(nationalityObj?.nationality_ar);
        }
    }, [currentUser, dispatch]);


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col px-4 py-6 bg-white rounded border border-gray my-5"
            >
                <div className="flex flex-wrap gap-4">
                    {/* firstName */}
                    <div className="flex flex-col w-full sm:w-[46%]">
                        <label className="mb-1 font-medium text-zinc-900">{t("lable1")}</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName || ""}
                            onChange={handleChange}
                            placeholder="Cameron"
                            className="px-3 py-2 border border-neutral-400 rounded capitalize"
                            required
                        />
                    </div>
                    {/* last Name */}
                    <div className="flex flex-col w-full sm:w-[46%]">
                        <label className="mb-1 font-medium text-zinc-900">{t("lable3")}</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName || ""}
                            onChange={handleChange}
                            placeholder="Williamson"
                            className="px-3 py-2 border border-neutral-400 rounded capitalize"
                            required
                        />
                    </div>

                    {/* <div className="flex flex-col w-full sm:w-[46%] mt-4">
                        <label className="mb-1 font-medium text-zinc-900">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Example@Example.com"
                            className="px-3 py-2 border border-neutral-400 rounded"
                        />
                    </div> */}

                    {/* phone Number */}
                    <div className="flex flex-col w-full sm:w-[46%] mt-2">
                        <label className="mb-1 font-medium text-zinc-900">{t("lable11")}</label>
                        <div className="relative mt-2 w-full flex items-center gap-2" style={{ direction: "ltr" }}>
                            <PhoneInput
                                country={"sa"}
                                disabled={currentUser?.is_phone_verified}
                                value={formData.phone || ""}
                                inputProps={{
                                    name: "phone",
                                    required: true,
                                    autoFocus: true,
                                    className:
                                        "w-full pl-4 md:pl-24 pr-4 py-2 text-md border border-neutral-400 rounded focus:outline-none",
                                }}
                                onChange={(phone) => {
                                    setFormData((prev) => ({ ...prev, "phone": phone }));
                                    setIsDirty(true);
                                }}
                                containerClass="w-full"
                                inputClass="w-full pl-14"
                                buttonClass=" flex items-center justify-center h-full px-2 w-20"
                                dropdownClass="absolute z-50 bg-white shadow-lg border border-neutral-400 rounded mt-2 left-0 top-7 "
                            />
                            {/* <div>{currentUser?.is_phone_verified ?
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                                        fill={`#07C37B`}
                                    />
                                </svg> :
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM9.25 6C9.25 5.59 9.59 5.25 10 5.25C10.41 5.25 10.75 5.59 10.75 6V11C10.75 11.41 10.41 11.75 10 11.75C9.59 11.75 9.25 11.41 9.25 11V6ZM10.92 14.38C10.87 14.51 10.8 14.61 10.71 14.71C10.61 14.8 10.5 14.87 10.38 14.92C10.26 14.97 10.13 15 10 15C9.87 15 9.74 14.97 9.62 14.92C9.5 14.87 9.39 14.8 9.29 14.71C9.2 14.61 9.13 14.51 9.08 14.38C9.03 14.26 9 14.13 9 14C9 13.87 9.03 13.74 9.08 13.62C9.13 13.5 9.2 13.39 9.29 13.29C9.39 13.2 9.5 13.13 9.62 13.08C9.86 12.98 10.14 12.98 10.38 13.08C10.5 13.13 10.61 13.2 10.71 13.29C10.8 13.39 10.87 13.5 10.92 13.62C10.97 13.74 11 13.87 11 14C11 14.13 10.97 14.26 10.92 14.38Z"
                                        fill={`#A5A5A5`}
                                    />
                                </svg>}
                            </div> */}
                            <div className="relative inline-block group cursor-pointer">
                                {currentUser?.is_phone_verified ? (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                                            fill="#07C37B"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM9.25 6C9.25 5.59 9.59 5.25 10 5.25C10.41 5.25 10.75 5.59 10.75 6V11C10.75 11.41 10.41 11.75 10 11.75C9.59 11.75 9.25 11.41 9.25 11V6ZM10.92 14.38C10.87 14.51 10.8 14.61 10.71 14.71C10.61 14.8 10.5 14.87 10.38 14.92C10.26 14.97 10.13 15 10 15C9.87 15 9.74 14.97 9.62 14.92C9.5 14.87 9.39 14.8 9.29 14.71C9.2 14.61 9.13 14.51 9.08 14.38C9.03 14.26 9 14.13 9 14C9 13.87 9.03 13.74 9.08 13.62C9.13 13.5 9.2 13.39 9.29 13.29C9.39 13.2 9.5 13.13 9.62 13.08C9.86 12.98 10.14 12.98 10.38 13.08C10.5 13.13 10.61 13.2 10.71 13.29C10.8 13.39 10.87 13.5 10.92 13.62C10.97 13.74 11 13.87 11 14C11 14.13 10.97 14.26 10.92 14.38Z"
                                            fill="#A5A5A5"
                                        />
                                    </svg>
                                )}
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray text-black text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {currentUser?.is_phone_verified ? l("massage8") : l("massage9")}
                                </span>
                            </div>


                        </div>
                        {error.phone && <span className="text-red-500 text-sm mt-1">
                            {error.phone}
                        </span>}


                    </div>
                    {/* gender */}
                    <div className="flex flex-col w-full sm:w-[46%] mt-4">
                        <label className="mb-1 font-medium text-zinc-900">{t("lable6")}</label>
                        <select
                            name="gender"
                            value={formData.gender || ""}
                            onChange={handleChange}
                            className="px-3 py-1 border border-neutral-400 rounded"
                            required
                        >
                            <option value="">{t("lable7")}</option>
                            <option value="male">{t("lable8")}</option>
                            <option value="female">{t("lable10")}</option>
                        </select>
                    </div>
                    {/* Birth Date */}
                    <div className="flex flex-col w-full sm:w-[46%] mt-4">
                        <label className="mb-1 font-medium text-zinc-900">{t("lable21")}</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob || ""}
                            onChange={handleChange}
                            className="px-3 py-2 border border-neutral-400 rounded uppercase"
                            required
                        />
                    </div>
                    {/* countryOfNationality */}
                    <div className="flex flex-col w-full sm:w-[46%] mt-4">
                        <label className="mb-1 font-medium text-zinc-900">{t("lable12")}</label>
                        <select
                            value={locale === "en" ? countryOfNationality : countryOfNationalityAR}
                            // onChange={handleChange}
                            required
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("Country", value);
                                if (locale === "en") {
                                    setCountryOfNationality(value);
                                } else {
                                    setCountryOfNationalityAR(value);
                                }
                                setIsDirty(true);
                            }}
                            className="block w-full py-1.5 pl-2 border border-neutral-400 rounded shadow-sm focus:outline-none sm:text-sm">
                            <option value="" disabled>
                                {t("lable7")}
                            </option>
                            {nationalities.map((n: any, index: number) => (
                                <option key={index}
                                    value={locale === "en" ? n.nationality : n.nationality_ar}
                                >
                                    {locale === "en" ? n.nationality : n.nationality_ar}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* CountryOfResidence */}
                    <div className="flex flex-col w-full sm:w-[46%] mt-4">
                        <label className="mb-1 font-medium text-zinc-900" >{t("lable14")}</label>
                        <select
                            value={locale === "en" ? country : countryAr || ""}
                            onChange={(e: any) => {
                                setIsDirty(true);
                                if (locale === "en") {
                                    setCountry(e.target.value);
                                } else {
                                    setCountryAr(e.target.value);
                                }
                            }}
                            required
                            className="block w-full py-1.5 pl-2 border border-neutral-400 rounded shadow-sm focus:outline-none sm:text-sm"
                        >
                            <option value=""> {t("lable15")} </option>
                            {countries.map((n: any, index: number) => (
                                <option key={index}
                                    // value={n}
                                    // value={JSON.stringify(n)}
                                    value={locale === "en" ? n.country : n.country_ar}
                                >
                                    {locale === "en" ? n.country : n.country_ar}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* fromWhere */}
                    <div className="flex flex-col w-full sm:w-[46%] mt-4">
                        <label className="mb-1 font-medium text-zinc-900">{t("lable28")}</label>
                        <select
                            name="fromWhere"
                            value={formData.fromWhere || ""}
                            onChange={handleChange}
                            className="px-3 py-1 border border-neutral-400 rounded"
                            required
                        >
                            <option value="">{t("lable7")}</option>
                            <option value="FACEBOOK">{t("lable22")}</option>
                            <option value="LINKEDIN">{t("lable23")}</option>
                            <option value="INSTAGRAM">{t("lable24")}</option>
                            <option value="X">{t("lable25")}</option>
                            <option value="GOOGLE_SEARCH">{t("lable26")}</option>
                            <option value="A_FRIEND">{t("lable27")}</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2 self-end mt-6">
                    <button
                        type="button"
                        // onClick={() => console.log("Cancelled")}
                        className="px-4 py-2 text-stone-500 border border-zinc-300 rounded-[64px] hover:text-primary hover:border-primary"
                    >
                        {t("lable18")}
                    </button>
                    {isLoading ? <Spinner /> :
                        <button
                            disabled={!isDirty}
                            type="submit"
                            className="px-4 py-2 text-white bg-primary rounded-[64px]"
                        >
                            {t("lable17")}
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default NewDataInfo
