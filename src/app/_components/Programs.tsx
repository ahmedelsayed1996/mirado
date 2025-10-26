import React, { useCallback, useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import useCurrentLang from '../_hooks/useCurrentLang';
import { getAllPrograms } from "../reduxTool-kit/slices/programsSlice";
import Loader from './Loader';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import Spinner from './Spinner';
import Pagination from './Pagination';
import SearchNotFound from './SearchNotFound';
import { AppDispatch } from '../store';

interface Data {
    academic_degrees: any[];
    majorsAndFields: any;
    language: any[];
}
interface Field {
    field_id: string;
    field_name: string;
    count: number;
}

interface MajorsAndFields {
    [major: string]: Field[]; // كل تخصص يحتوي على مصفوفة من الحقول
}

function Programs() {
    const [data, setData] = useState<Data | null>(null);
    const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [price, setPrice] = useState(null);
    const [field, setField] = useState<string | null>(null);
    const [languageStudy, setLanguageStudy] = useState<string | null>(null);
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const language = useCurrentLang();
    const t = useTranslations("programs");
    const e = useTranslations("institutesCard");
    const { tokenMainSite } = parseCookies();
    const university = useSelector((state: any) => state.university);
    const programs = useSelector((state: any) => state.programs);
    const user = useSelector((state: any) => state.displayUser);
    console.log("data", data);

    const getFilterData = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/programs/${university.id}/filters`, {
                method: 'GET',
                headers: {
                    "Accept-Language": `${language}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);

            // console.log(result);

        } catch (error) {
            console.error('Error:', error);
        }
    }, [university.id, language]);

    const filterByLanguage = (data: string) => {
        setLanguageStudy(data);
        dispatch(getAllPrograms({ language, limt: 20, course_language: data, universityId: university.id, sortOrder: price, field_id: field, academic_degree: selectedDegree }));
    }

    const filterByFields = (data: string) => {
        setField(data);
        dispatch(getAllPrograms({ language, limt: 20, field_id: data, universityId: university.id, sortOrder: price, course_language: languageStudy, academic_degree: selectedDegree }));
    }

    const filterByPricing = (sortPrice: any) => {
        console.log("Call new time");
        setPrice(sortPrice);
        dispatch(getAllPrograms({ language, limt: 20, field_id: field, universityId: university.id, sortOrder: sortPrice, course_language: languageStudy, academic_degree: selectedDegree }));
    };

    const handleDegreeClick = (academicDegree: any) => {
        setSelectedDegree(academicDegree);
        dispatch(getAllPrograms({ language, limt: 20, academic_degree: academicDegree, universityId: university.id, sortOrder: price, course_language: languageStudy, field_id: field }));
    };

    const favorite = async (programId: number) => {

        // setIsLoadingData(true);
        setLoadingStates((prev) => new Map(prev).set(programId, true));
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/program`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": language,
                    Authorization: `Bearer ${tokenMainSite}`
                },
                body: JSON.stringify({
                    "programId": programId,
                    "userId": user.id,
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                // setIsLoadingData(false);
                throw new Error(result.message);
            }

            const result = await response.json();
            // setIsLoadingData(false);
            // console.log(result);
            dispatch(getAllPrograms({ language, limt: 20, universityId: university.id, userId: user.id }));
            toast.success(t("addSubscribe"));
            // router.push(`/${window.location.pathname.slice(1, 3)}/verify-password`);
        } catch (error: any) {
            toast.error(error.message);
            // setIsLoadingData(false);
        } finally {
            setLoadingStates((prev) => new Map(prev).set(programId, false));
        }
    }

    const unFavorite = async (programId: number) => {

        setLoadingStates((prev) => new Map(prev).set(programId, true));
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/program`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": language,
                    Authorization: `Bearer ${tokenMainSite}`
                },
                body: JSON.stringify({
                    "programId": programId,
                    "userId": user.id,
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                // setIsLoadingData(false);
                throw new Error(result.message);
            }

            const result = await response.json();
            // setIsLoadingData(false);
            // console.log(result);
            dispatch(getAllPrograms({ language, limt: 20, universityId: university.id, userId: user.id }));
            toast.success(t("removeSubscribe"));
            // router.push(`/${window.location.pathname.slice(1, 3)}/verify-password`);
        } catch (error: any) {
            toast.error(error.message);
            // setIsLoadingData(false);
        } finally {
            setLoadingStates((prev) => new Map(prev).set(programId, false));
        }
    }



    useEffect(() => {
        if (!data) {
            getFilterData();
        }
        dispatch(getAllPrograms({ page: currentPage, language, limt: 9, universityId: university.id, userId: user.id }));

    }, [language, user, currentPage, dispatch, getFilterData, university.id, data])

    const handlePageChange = (newPage: any) => {
        if (hasMoreData && newPage !== currentPage) {
            setCurrentPage(newPage);
            window.scrollTo({
                top: 200,
                left: 100,
                behavior: 'smooth'
            })
        }
    };


    return (
        <div className="flex flex-col self-stretch">
            {/* header filter */}



            <div className="flex gap-3  ">
                <div className="flex-1 my-auto text-sm md:text-xl font-semibold md:leading-9 text-start text-gray-900">
                    {t("head")}
                    {/* University Major */}
                </div>
                <div className="flex gap-5 items-start p-2 bg-white rounded-[111px] overflow-x-scroll lg:overflow-hidden">
                    <div className={`flex gap-1.5 justify-center items-center px-3 py-1 rounded-[111px] cursor-pointer ${selectedDegree ? 'bg-white ' : 'bg-amber-500'}`}
                        onClick={() => handleDegreeClick(null)}>
                        <div className={`justify-center items-center px-2 py-1.5 my-auto text-xs font-semibold  rounded-full ${selectedDegree ? ' bg-[#4F5466] text-white' : 'bg-white text-amber-500 '} `}>
                            {data?.academic_degrees && data?.academic_degrees?.length > 0
                                ? data.academic_degrees.reduce((total, degree) => total + degree.count, 0)
                                : '0'}
                        </div>
                        <div className={`text-sm md:text-base text-nowrap font-medium text-start ${selectedDegree ? 'text-zinc-500 ' : 'text-white'} `}>
                            {t("viewAll")}
                        </div>
                    </div>

                    {data && data.academic_degrees.map((academic, index) => (
                        <div
                            key={index}
                            className={`flex gap-1.5 justify-center px-2 py-1 whitespace-nowrap rounded-[111px] cursor-pointer ${selectedDegree === academic.academic_degree ? 'bg-amber-500 ' : 'bg-white'}`}
                            onClick={() => handleDegreeClick(academic.academic_degree)} // تغيير الدرجة عند الضغط
                        >
                            <div className={`justify-center px-2 py-1.5 my-auto text-xs font-semibold  rounded-full ${selectedDegree === academic.academic_degree ? 'bg-white text-amber-500' : 'bg-[#4F5466] text-white'}`}>
                                {academic.count}
                            </div>
                            <div className={`text-base font-medium text-start ${selectedDegree === academic.academic_degree ? 'text-white' : 'text-zinc-500'}`}>
                                {academic.academic_degree}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="justify-start mt-5 w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-3/6 lg:w-2/6 max-md:w-full max-md:mb-5">
                        <div className="flex flex-col justify-center px-5 pt-5 pb-9 mx-auto w-full bg-white rounded-xl border border-gray border-solid shadow-2xl">
                            <div className="text-xl font-semibold leading-6 text-start ">
                                {t("head")}
                            </div>
                            <div className="shrink-0 mt-5 h-px bg-gray border border-gray border-solid mb-5" />
                            {/* filter by Price  */}
                            <div className="space-y-8 ">
                                <details
                                    className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                                    open
                                >
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor p-2 text-gray-900 mb-2">
                                        <h2 className=" font-semibold">{t("filterPrice")}</h2>
                                        <svg
                                            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </summary>
                                    <fieldset>
                                        <div className="space-y-8 my-3">
                                            <label
                                                htmlFor="Option100"
                                                className="flex cursor-pointer justify-between px-1"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="flex items-center">
                                                        &#8203;
                                                        <input
                                                            className="size-4 rounded border-gray-300"
                                                            type="radio"
                                                            name='price'
                                                            id="Option100"
                                                            onClick={() => filterByPricing(null)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <strong className="font-medium text-gray-900">
                                                            {t("all")}
                                                        </strong>
                                                    </div>
                                                </div>
                                                <div>
                                                    {/* <span>150</span> */}
                                                </div>
                                            </label>
                                        </div>
                                        <div
                                            className="space-y-8 my-3">
                                            <label

                                                htmlFor="Option200"
                                                className="flex cursor-pointer justify-between px-1"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="flex items-center">
                                                        &#8203;
                                                        <input
                                                            type="radio"
                                                            name='price'
                                                            className="size-4 rounded border-gray-300"
                                                            id="Option200"
                                                            onClick={() => filterByPricing("asc")}
                                                        />
                                                    </div>
                                                    <div>
                                                        <strong className="font-medium text-gray-900">
                                                            {t("lowPrice")}
                                                        </strong>
                                                    </div>
                                                </div>
                                                <div>
                                                    {/* <span>10</span> */}
                                                </div>
                                            </label>
                                        </div>
                                        <div className="space-y-8 my-3">
                                            <label

                                                htmlFor="Option300"
                                                className="flex cursor-pointer justify-between px-1"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="flex items-center">
                                                        &#8203;
                                                        <input
                                                            type="radio"
                                                            name='price'
                                                            className="size-4 rounded border-gray-300"
                                                            id="Option300"
                                                            onClick={() => filterByPricing("desc")}
                                                        />
                                                    </div>
                                                    <div>
                                                        <strong className="font-medium text-gray-900">
                                                            {t("hightPrice")}
                                                        </strong>
                                                    </div>
                                                </div>
                                                <div>
                                                    {/* <span>5</span> */}
                                                </div>
                                            </label>
                                        </div>
                                    </fieldset>
                                </details>
                            </div>

                            {/* Filter by Language */}
                            <div className="space-y-4">
                                <details
                                    className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor p-2 text-gray-900 my-2">
                                        <h2 className="font-semibold">{t("filterLanguage")}</h2>
                                        <svg
                                            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </summary>
                                    <fieldset>
                                        {data && data.language?.map((lang: any, index: number) => (
                                            <div className="space-y-2 my-3" key={index}>
                                                <label
                                                    htmlFor={`Option${index}`}
                                                    className="flex cursor-pointer justify-between px-1"
                                                >
                                                    <div className="flex gap-4">
                                                        <div className="flex items-center">
                                                            &#8203;
                                                            <input
                                                                name='language'
                                                                type="radio"
                                                                className="size-4 rounded border-gray-300"
                                                                id={`Option${index}`}
                                                                onClick={() => { filterByLanguage(lang.course_language) }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <strong className="font-medium text-gray-900">
                                                                {lang.course_language}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span>{lang.count}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}

                                    </fieldset>
                                </details>
                            </div>

                            {/* Filter by Major and Fields */}
                            <div className="space-y-4">
                                {data?.majorsAndFields &&
                                    Object.entries(data.majorsAndFields).map(([major, fields]) => (
                                        <details
                                            key={major}
                                            className="   border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                                        >
                                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor p-2 text-gray-900 my-2">
                                                <h2 className="font-semibold"> {major}</h2>
                                                <svg
                                                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </summary>
                                            <fieldset>
                                                {(fields as Field[]).map((field) => (
                                                    <div className="space-y-2 my-3" key={field.field_id}>
                                                        <label
                                                            htmlFor={`field-${field.field_id}`}
                                                            className="flex cursor-pointer justify-between px-1"
                                                        >
                                                            <div className="flex gap-4">
                                                                <div className="flex items-center">
                                                                    &#8203;
                                                                    <input
                                                                        type="radio"
                                                                        name='fields'
                                                                        className="size-4 rounded checked:bg-blue-500"
                                                                        id={`field-${field.field_id}`}
                                                                        onClick={() => { filterByFields(field.field_id) }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <strong className="font-medium text-gray-900">
                                                                        {field.field_name}
                                                                    </strong>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span>{field.count}</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </fieldset>
                                        </details>
                                    ))}
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col w-3/6 lg:w-4/6 max-md:w-full">
                        {programs?.loading ? <Loader /> : <>
                            <div className="flex flex-col max-md:mt-5 max-md:w-full">
                                <div className="flex flex-wrap gap-2">
                                    {programs?.programs?.data.length > 0 ?
                                        <>
                                            {programs?.programs?.data.map((program: any) => (
                                                <div key={program.program_id} className="flex-1">
                                                    <div className="flex flex-col grow p-2 md:p-5 w-full bg-white rounded-xl border border-gray border-solid shadow-2xl max-md:mt-5  ">
                                                        <div className="flex gap-3 self-start text-xl font-semibold text-start text-primary items-center">
                                                            <svg width="25" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12.2172 0.49965C10.7962 -0.16655 9.20372 -0.16655 7.78272 0.499649L1.0916 3.63659C0.0156027 4.14105 -0.264933 5.56352 0.25 6.54666L0.25 11.5C0.25 11.9142 0.585786 12.25 1 12.25C1.41421 12.25 1.75 11.9142 1.75 11.5V7.67204L7.78281 10.5003C9.20381 11.1665 10.7963 11.1665 12.2173 10.5003L18.9084 7.36341C20.3639 6.68105 20.3639 4.31899 18.9084 3.63664L12.2172 0.49965Z" fill="#1E4C83" />
                                                                <path d="M3 9.91473V13.6254C3 14.6334 3.5035 15.5772 4.38533 16.0656C5.8537 16.8787 8.20399 18 10 18C11.796 18 14.1463 16.8787 15.6147 16.0656C16.4965 15.5772 17 14.6334 17 13.6254V9.91477L12.854 11.8585C11.0296 12.7138 8.9705 12.7138 7.14607 11.8585L3 9.91473Z" fill="#1E4C83" />
                                                            </svg>
                                                            <div className='line-clamp-1'>{program.program_name}</div>
                                                        </div>
                                                        <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start  ">
                                                            <div className="flex flex-1 gap-2.5 justify-start  py-1.5 rounded-2xl">
                                                                <div className="flex gap-2 justify-center items-center">
                                                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.66055 11.37C9.56055 11.36 9.44055 11.36 9.33055 11.37C6.95055 11.29 5.06055 9.34 5.06055 6.94C5.06055 4.49 7.04055 2.5 9.50055 2.5C11.9505 2.5 13.9405 4.49 13.9405 6.94C13.9305 9.34 12.0405 11.29 9.66055 11.37Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16.9093 4.5C18.8493 4.5 20.4093 6.07 20.4093 8C20.4093 9.89 18.9093 11.43 17.0393 11.5C16.9593 11.49 16.8693 11.49 16.7793 11.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M4.6607 15.06C2.2407 16.68 2.2407 19.32 4.6607 20.93C7.4107 22.77 11.9207 22.77 14.6707 20.93C17.0907 19.31 17.0907 16.67 14.6707 15.06C11.9307 13.23 7.4207 13.23 4.6607 15.06Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M18.8398 20.5C19.5598 20.35 20.2398 20.06 20.7998 19.63C22.3598 18.46 22.3598 16.53 20.7998 15.36C20.2498 14.94 19.5798 14.66 18.8698 14.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>

                                                                    <div className="text-gray-900 text-nowrap">
                                                                        {t("cardHead1")}
                                                                        {/* Duration of study */}
                                                                        <div className="self-start font-medium text-gray">
                                                                            {program.course_duration}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-1 gap-2.5 justify-end  py-1.5 rounded-2xl ">
                                                                <div className="flex gap-2 justify-center items-center">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="22"
                                                                        height="22"
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M3.59998 7.87891H2C1.45 7.87891 1 8.32891 1 8.87891V17.4989C1 18.0489 1.45 18.4989 2 18.4989H3.59998C4.14998 18.4989 4.59998 18.0489 4.59998 17.4989V8.87891C4.59998 8.32891 4.14998 7.87891 3.59998 7.87891Z"
                                                                            stroke="black"
                                                                            strokeOpacity="0.88"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M10.7992 4.69141H9.19922C8.64922 4.69141 8.19922 5.14141 8.19922 5.69141V17.5014C8.19922 18.0514 8.64922 18.5014 9.19922 18.5014H10.7992C11.3492 18.5014 11.7992 18.0514 11.7992 17.5014V5.69141C11.7992 5.14141 11.3492 4.69141 10.7992 4.69141Z"
                                                                            stroke="black"
                                                                            strokeOpacity="0.88"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M18.0004 1.5H16.4004C15.8504 1.5 15.4004 1.95 15.4004 2.5V17.5C15.4004 18.05 15.8504 18.5 16.4004 18.5H18.0004C18.5504 18.5 19.0004 18.05 19.0004 17.5V2.5C19.0004 1.95 18.5504 1.5 18.0004 1.5Z"
                                                                            stroke="black"
                                                                            strokeOpacity="0.88"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                    <div className="text-gray-900">
                                                                        {t("cardHead2")}
                                                                        {/* Language study */}
                                                                        <div className="self-start font-medium text-gray">
                                                                            {program.course_language}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                                                            <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C6.89137 3.25 2.75 7.39137 2.75 12.5C2.75 17.6086 6.89137 21.75 12 21.75C17.1086 21.75 21.25 17.6086 21.25 12.5C21.25 7.39137 17.1086 3.25 12 3.25ZM1.25 12.5C1.25 6.56294 6.06294 1.75 12 1.75C17.9371 1.75 22.75 6.56294 22.75 12.5C22.75 18.4371 17.9371 23.25 12 23.25C6.06294 23.25 1.25 18.4371 1.25 12.5ZM12 7.75C12.4142 7.75 12.75 8.08579 12.75 8.5V12.1893L15.0303 14.4697C15.3232 14.7626 15.3232 15.2374 15.0303 15.5303C14.7374 15.8232 14.2626 15.8232 13.9697 15.5303L11.4697 13.0303C11.329 12.8897 11.25 12.6989 11.25 12.5V8.5C11.25 8.08579 11.5858 7.75 12 7.75Z" fill="#141522" />
                                                                </svg>

                                                                <div className="flex flex-col justify-center">
                                                                    <div className="self-start text-gray-900">
                                                                        {t("cardHead3")}
                                                                    </div>
                                                                    <div className="font-medium text-gray text-nowrap">
                                                                        {new Date(program.start_date).toLocaleString('en-US', { year: 'numeric', month: 'short' })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-1.5 justify-center items-center py-1.5 rounded-2xl">
                                                                <div className="flex gap-2 justify-center items-center">
                                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C6.89137 3.25 2.75 7.39137 2.75 12.5C2.75 17.6086 6.89137 21.75 12 21.75C17.1086 21.75 21.25 17.6086 21.25 12.5C21.25 7.39137 17.1086 3.25 12 3.25ZM1.25 12.5C1.25 6.56294 6.06294 1.75 12 1.75C17.9371 1.75 22.75 6.56294 22.75 12.5C22.75 18.4371 17.9371 23.25 12 23.25C6.06294 23.25 1.25 18.4371 1.25 12.5ZM12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5V6.81673C14.3804 7.10867 15.75 8.33361 15.75 10C15.75 10.4142 15.4142 10.75 15 10.75C14.5858 10.75 14.25 10.4142 14.25 10C14.25 9.15573 13.3765 8.25 12 8.25C10.6235 8.25 9.75 9.15573 9.75 10C9.75 10.8443 10.6235 11.75 12 11.75C13.9372 11.75 15.75 13.0828 15.75 15C15.75 16.6664 14.3804 17.8913 12.75 18.1833V18.5C12.75 18.9142 12.4142 19.25 12 19.25C11.5858 19.25 11.25 18.9142 11.25 18.5V18.1833C9.61957 17.8913 8.25 16.6664 8.25 15C8.25 14.5858 8.58579 14.25 9 14.25C9.41421 14.25 9.75 14.5858 9.75 15C9.75 15.8443 10.6235 16.75 12 16.75C13.3765 16.75 14.25 15.8443 14.25 15C14.25 14.1557 13.3765 13.25 12 13.25C10.0628 13.25 8.25 11.9172 8.25 10C8.25 8.33361 9.61957 7.10867 11.25 6.81673V6.5C11.25 6.08579 11.5858 5.75 12 5.75Z" fill="#141522" />
                                                                    </svg>

                                                                    <div className="text-gray-900">

                                                                        {t("cardHead4")}
                                                                        {/* Start From */}
                                                                        <div className="self-start font-medium text-gray">
                                                                            {program.price}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="flex gap-2.5 mt-3.5 max-md:flex-wrap">
                                                            {loadingStates.get(program.program_id) ?
                                                                <Spinner /> : <>
                                                                    <Link href={`/${pathname.slice(1, 3)}/university/${university.id}/${program.program_id}`} className="flex-1 justify-center px-10 py-2 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 text-center" onClick={() => setLoadingStates((prev) => new Map(prev).set(program.program_id, true))}>
                                                                        {/* Browse The Program */}
                                                                        {t("button")}
                                                                    </Link>

                                                                    <div className="flex justify-center items-center px-4 py-2.5 rounded-2xl border border-gray border-solid hover:border-slate-500 cursor-pointer" onClick={() => {
                                                                        if (tokenMainSite && user.id) {
                                                                            // console.log("login");
                                                                            if (program.is_favorite) {
                                                                                unFavorite(program.program_id);
                                                                            } else if (!program.is_favorite) {
                                                                                favorite(program.program_id);
                                                                            }
                                                                        } else {
                                                                            toast.error(e("messageError"));
                                                                        }

                                                                    }}>
                                                                        {program.is_favorite ? <svg width="20" height="17" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path d="M0.916016 7.54014C0.916016 13.4162 5.77282 16.5474 9.32811 19.3501C10.5827 20.3391 11.791 21.2703 12.9993 21.2703C14.2077 21.2703 15.416 20.3391 16.6706 19.3501C20.2259 16.5474 25.0827 13.4162 25.0827 7.54014C25.0827 1.6641 18.4367 -2.50308 12.9993 3.14608C7.56204 -2.50308 0.916016 1.6641 0.916016 7.54014Z" fill="#FF0000" />
                                                                        </svg> : <svg width="20" height="17" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M0.916016 7.54014C0.916016 13.4162 5.77282 16.5474 9.32811 19.3501C10.5827 20.3391 11.791 21.2703 12.9993 21.2703C14.2077 21.2703 15.416 20.3391 16.6706 19.3501C20.2259 16.5474 25.0827 13.4162 25.0827 7.54014C25.0827 1.6641 18.4367 -2.50308 12.9993 3.14608C7.56204 -2.50308 0.916016 1.6641 0.916016 7.54014Z" fill="#CFCFCF" />
                                                                        </svg>}
                                                                    </div>
                                                                </>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </> : <SearchNotFound head="Programs" />}
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </div>

            {programs?.programs?.data.length > 0 && <div className="flex justify-end px-10 pt-5">
                <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    disableNext={!hasMoreData}
                    numberOfPages={programs?.programs?.pages}
                />
            </div>}

        </div>
    )
}

export default Programs
