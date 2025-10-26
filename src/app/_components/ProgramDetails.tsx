import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getAllPrograms } from '../reduxTool-kit/slices/programsSlice';
import useCurrentLang from '../_hooks/useCurrentLang';
import Spinner from './Spinner';
import Loader from './Loader';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { getProgram } from '../reduxTool-kit/slices/programSlice';
import Pagination from './Pagination';
import { getTotalPriceUNI } from '../reduxTool-kit/slices/calcTotalPriceUNISlice';
import AvailableOffices from './AvailableOffices';
import { useParams } from 'next/navigation';

interface programData {
    bank_statement: null,
    end_date: string,
    field: string,
    field_id: number,
    gpa: string,
    id: number,
    ilts: number,
    is_price_updated: true,
    major: string,
    major_id: number,
    price: number,
    price_period: number,
    program_periodic_notes: [],
    program_translations: {
        academic_degree: string,
        attendance_method: string,
        course_duration: string,
        course_language: string,
        id: number,
        languageCode: string,
        name: string,
        notes: [],
        price_period_type: string,
        program_id: number,
        startStudy: ['Oct']
    },
    recommend: true,
    start_date: string,
    status: string,
    toefl: number,
    university: {
        city: string,
        country: string,
        description: string,
        name: string,
        state: string,
    }
    university_id: 0,
}
interface Data {
    academic_degrees: any[];
    majorsAndFields: any;
    language: any[];
}

interface SelectProgram {
    onChange: () => void;
    currency: string;
    convertToLocaleCurrency: any
}

function ProgramDetails({ onChange, currency, convertToLocaleCurrency }: SelectProgram) {
    const dispatch = useDispatch<AppDispatch>();
    const language = useCurrentLang();
    const { tokenMainSite } = parseCookies();
    const params = useParams();
    // const t = useTranslations("programs");
    const e = useTranslations("institutesCard");
    const t = useTranslations("ProgramDetails");
    const [isOpen, setIsOpen] = useState(false);
    const { locale, universityId } = params;


    const university = useSelector((state: any) => state.university);
    const programs = useSelector((state: any) => state.programs);
    const user = useSelector((state: any) => state.displayUser);
    const totalPriceUNI = useSelector((state: any) => state.totalPriceUNI);
    const programData = useSelector((state: any) => state.program);


    const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
    const [data, setData] = useState<Data | null>(null);
    const [selectedDegree, setSelectedDegree] = useState(null);
    const [convertTotalPrice, setConvertTotalPrice] = useState<Record<string, any>>({});
    const [program, setProgram] = useState<programData>();
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [limit, setLimit] = useState<number>(10);

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
            dispatch(getAllPrograms({ language, limt: limit, universityId: university.id, userId: user.id }));
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
            dispatch(getAllPrograms({ language, limt: limit, universityId: university.id, userId: user.id }));
            toast.success(t("removeSubscribe"));
            // router.push(`/${window.location.pathname.slice(1, 3)}/verify-password`);
        } catch (error: any) {
            toast.error(error.message);
            // setIsLoadingData(false);
        } finally {
            setLoadingStates((prev) => new Map(prev).set(programId, false));
        }
    }

    const getProgramData = async (programId: number) => {
        setLoadingStates((prev) => new Map(prev).set(programId, true));
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/programs/${programId}`, {
                method: 'GET',
                headers: {
                    "Accept-Language": language,
                },

            })

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }
            const result = await res.json();
            setProgram(result);
            dispatch(getProgram({ programId: programId, locale: language }));
            onChange();
            // console.log(result);

            window.scrollTo({
                top: 1000,
                left: 100,
                behavior: 'smooth'
            })
            dispatch(getTotalPriceUNI({ programId: +programId, universityId: +university.id, locale: language }));
            // getTotalPrice(programId);

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoadingStates((prev) => new Map(prev).set(programId, false));
        }

    }

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

    const handleDegreeClick = (academicDegree: any) => {
        setSelectedDegree(academicDegree);
        dispatch(getAllPrograms({ language, limt: 20, academic_degree: academicDegree, universityId: university.id }));
    };

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

    // const getTotalPrice = async (programId: number) => {        
    //     const order = {
    //         "userId": user.id,
    //         "universityId": universityId,
    //         "totalEduxaFee": Math.ceil(totalPriceUNI?.totalEduxaFee).toString(),
    //         "transferFees": Math.ceil(totalPriceUNI?.transferFees).toString(),
    //         "totalPriceUNI": totalPriceUNI?.totalPriceWithTransferFees,
    //         "programId": programId,
    //         "convertedPrice": convertToLocaleCurrency?.convertedAmount ? `${convertToLocaleCurrency?.convertedAmount} ${currency}` : "",
    //     }
    //     localStorage.setItem("order", JSON.stringify(order));
    // }

    useEffect(() => {
        dispatch(getAllPrograms({ page: currentPage, language, limt: limit, universityId: university.id }))
    }, [currentPage])

    useEffect(() => {
        if (!data) {
            getFilterData();
        }
    }, [getFilterData, data])

    return (
        <div>
            <div className="flex overflow-hidden flex-col justify-center items-center px-6 py-8 mt-4 font-medium tracking-wide bg-white rounded-3xl border border-solid border-zinc-100 min-h-[267px] max-md:px-5 max-md:max-w-full">
                {program?.university_id == undefined ? <div className="flex flex-col items-center max-w-full w-[461px]">
                    <svg width="130" height="150" viewBox="0 0 96 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.49927 42.5V25C5.49927 23.6739 6.02605 22.4021 6.96373 21.4645C7.90142 20.5268 9.17319 20 10.4993 20H33.8243C34.9061 20 35.9588 20.3509 36.8243 21L44.1743 26.5C45.0397 27.1491 46.0924 27.5 47.1743 27.5H85.4993C86.8253 27.5 88.0971 28.0268 89.0348 28.9645C89.9725 29.9021 90.4993 31.1739 90.4993 32.5V42.5H5.49927Z" fill="url(#paint0_linear_625_20710)" />
                        <path d="M95.4988 45.4002L87.9988 90.4002C87.903 90.9918 87.5978 91.5292 87.139 91.9147C86.6801 92.3001 86.098 92.5079 85.4988 92.5002H10.4988C9.89957 92.5079 9.31751 92.3001 8.85864 91.9147C8.39977 91.5292 8.09463 90.9918 7.99879 90.4002L0.498794 45.4002C0.440383 45.04 0.461521 44.6714 0.560722 44.3203C0.659924 43.9692 0.834784 43.644 1.07303 43.3677C1.31127 43.0913 1.60712 42.8704 1.93981 42.7206C2.27249 42.5707 2.63395 42.4955 2.99879 42.5002H92.9988C93.3636 42.4955 93.7251 42.5707 94.0578 42.7206C94.3905 42.8704 94.6863 43.0913 94.9246 43.3677C95.1628 43.644 95.3377 43.9692 95.4369 44.3203C95.5361 44.6714 95.5572 45.04 95.4988 45.4002Z" fill="url(#paint1_linear_625_20710)" />
                        <path d="M84.3238 4.27409C82.0738 1.59909 77.9988 -0.400911 75.4988 1.94909C72.9988 -0.375911 68.9988 1.54909 66.6738 4.27409C63.9988 7.49909 63.5488 11.4491 65.6488 13.2241C67.7488 14.9991 71.6488 13.8991 74.3238 10.7241C76.2738 8.39909 74.7238 8.39909 76.6738 10.7241C79.3488 13.8991 83.2238 14.9991 85.3488 13.2241C87.4738 11.4491 86.9988 7.49909 84.3238 4.27409Z" fill="#F7E9D7" />
                        <path d="M75.499 15C78.2604 15 80.499 11.6421 80.499 7.5C80.499 3.35786 78.2604 0 75.499 0C72.7376 0 70.499 3.35786 70.499 7.5C70.499 11.6421 72.7376 15 75.499 15Z" fill="url(#paint2_linear_625_20710)" />
                        <path d="M87.9993 109.7C87.9885 110.744 87.6713 111.761 87.087 112.626C86.5027 113.491 85.6772 114.165 84.713 114.564C83.7488 114.964 82.6884 115.071 81.6637 114.873C80.639 114.675 79.6951 114.18 78.9493 113.45L65.4993 100L72.9993 92.5L86.4493 105.95C86.9424 106.442 87.3332 107.026 87.5993 107.67C87.8653 108.314 88.0012 109.004 87.9993 109.7Z" fill="url(#paint3_linear_625_20710)" />
                        <path d="M68.7539 89.272L62.2839 95.742C61.3076 96.7183 61.3076 98.3012 62.2839 99.2775L63.7511 100.745C64.7274 101.721 66.3103 101.721 67.2867 100.745L73.7567 94.2747C74.733 93.2984 74.733 91.7155 73.7567 90.7392L72.2894 89.272C71.3131 88.2957 69.7302 88.2957 68.7539 89.272Z" fill="url(#paint4_linear_625_20710)" />
                        <path d="M50.499 102.5C64.3061 102.5 75.499 91.3071 75.499 77.5C75.499 63.6929 64.3061 52.5 50.499 52.5C36.6919 52.5 25.499 63.6929 25.499 77.5C25.499 91.3071 36.6919 102.5 50.499 102.5Z" fill="url(#paint5_linear_625_20710)" />
                        <path d="M50.4985 97.5C61.5442 97.5 70.4985 88.5457 70.4985 77.5C70.4985 66.4543 61.5442 57.5 50.4985 57.5C39.4528 57.5 30.4985 66.4543 30.4985 77.5C30.4985 88.5457 39.4528 97.5 50.4985 97.5Z" fill="url(#paint6_linear_625_20710)" />
                        <path d="M50.4989 82.4998C46.9239 82.4998 47.1739 76.2248 51.2989 74.8748C51.7343 74.7278 52.1207 74.4635 52.4157 74.1112C52.7108 73.7588 52.9029 73.332 52.9712 72.8775C53.0394 72.4231 52.9811 71.9586 52.8026 71.5351C52.624 71.1117 52.3323 70.7456 51.9593 70.4772C51.5863 70.2087 51.1465 70.0483 50.6883 70.0135C50.23 69.9787 49.7711 70.0708 49.3618 70.2799C48.9525 70.4889 48.6088 70.8067 48.3684 71.1983C48.1279 71.5899 48.0001 72.0403 47.9989 72.4998C47.9989 73.1629 47.7355 73.7988 47.2667 74.2676C46.7978 74.7364 46.162 74.9998 45.4989 74.9998C40.7239 74.9998 42.9989 64.9998 50.4989 64.9998C52.2966 64.9606 54.0486 65.5686 55.4356 66.7129C56.8226 67.8573 57.7523 69.4619 58.0552 71.2343C58.3582 73.0068 58.0143 74.829 57.0862 76.3692C56.1581 77.9093 54.7076 79.0647 52.9989 79.6248V79.9998C52.9989 80.6629 52.7355 81.2988 52.2667 81.7676C51.7978 82.2364 51.162 82.4998 50.4989 82.4998ZM50.4989 89.9998C50.0045 89.9998 49.5211 89.8532 49.11 89.5785C48.6989 89.3038 48.3784 88.9134 48.1892 88.4565C48 87.9997 47.9505 87.4971 48.0469 87.0121C48.1434 86.5272 48.3815 86.0817 48.7311 85.7321C49.0808 85.3824 49.5262 85.1443 50.0112 85.0479C50.4961 84.9514 50.9988 85.0009 51.4556 85.1901C51.9124 85.3794 52.3029 85.6998 52.5776 86.1109C52.8523 86.522 52.9989 87.0054 52.9989 87.4998C52.9989 88.1629 52.7355 88.7988 52.2667 89.2676C51.7978 89.7364 51.162 89.9998 50.4989 89.9998Z" fill="#B4C8E1" />
                        <path d="M50.4987 37.5C45.7237 37.5 47.9987 27.5 55.4987 27.5H70.4987C71.1617 27.5 71.7976 27.2366 72.2664 26.7678C72.7353 26.2989 72.9987 25.663 72.9987 25V22.5C72.9987 21.837 73.2621 21.2011 73.7309 20.7322C74.1997 20.2634 74.8356 20 75.4987 20C76.1617 20 76.7976 20.2634 77.2664 20.7322C77.7353 21.2011 77.9987 21.837 77.9987 22.5V25C77.9987 26.9891 77.2085 28.8968 75.802 30.3033C74.3954 31.7098 72.4878 32.5 70.4987 32.5H55.4987C54.8356 32.5 54.1997 32.7634 53.7309 33.2322C53.2621 33.7011 52.9987 34.337 52.9987 35C52.9987 35.663 52.7353 36.2989 52.2664 36.7678C51.7976 37.2366 51.1617 37.5 50.4987 37.5Z" fill="#F7E9D7" />
                        <defs>
                            <linearGradient id="paint0_linear_625_20710" x1="47.9993" y1="42.5" x2="47.9993" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#365D8D" />
                                <stop offset="1" stopColor="#8ABEFE" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_625_20710" x1="47.9988" y1="92.5002" x2="47.9988" y2="42.5002" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#365D8D" />
                                <stop offset="1" stopColor="#8ABEFE" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_625_20710" x1="80.499" y1="7.5" x2="70.499" y2="7.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F89A21" />
                                <stop offset="1" stopColor="#FFBD69" />
                            </linearGradient>
                            <linearGradient id="paint3_linear_625_20710" x1="65.4993" y1="103.75" x2="87.9993" y2="103.75" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F89A21" />
                                <stop offset="1" stopColor="#FFBD69" />
                            </linearGradient>
                            <linearGradient id="paint4_linear_625_20710" x1="61.5454" y1="95.0062" x2="74.4954" y2="95.0062" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F89A21" />
                                <stop offset="1" stopColor="#FFBD69" />
                            </linearGradient>
                            <linearGradient id="paint5_linear_625_20710" x1="25.499" y1="77.5" x2="75.499" y2="77.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F89A21" />
                                <stop offset="1" stopColor="#FFBD69" />
                            </linearGradient>
                            <linearGradient id="paint6_linear_625_20710" x1="30.4985" y1="77.5" x2="70.4985" y2="77.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F5E6D3" />
                                <stop offset="1" stopColor="#FCF7F0" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="self-stretch mt-2 text-sm text-center text-zinc-800 max-md:max-w-full">
                        There are selected programs right now, select your program
                    </div>
                    <div className="flex gap-1 justify-center items-center px-4 py-3 mt-2 max-w-full text-base text-white bg-primary rounded-[64px] w-[230px] cursor-pointer" onClick={() => setIsOpen(true)}>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" d="M16.9167 14.6836L14.275 12.1836C13.7728 12.8302 13.1708 13.3928 12.4917 13.8503L15.2084 16.4336C15.3226 16.567 15.4638 16.6747 15.6228 16.7495C15.7817 16.8243 15.9547 16.8645 16.1303 16.8675C16.3059 16.8705 16.4801 16.8362 16.6415 16.7669C16.8029 16.6976 16.9478 16.5949 17.0665 16.4654C17.1852 16.336 17.2752 16.1829 17.3303 16.0161C17.3855 15.8494 17.4047 15.6728 17.3866 15.4981C17.3685 15.3234 17.3136 15.1545 17.2254 15.0026C17.1372 14.8507 17.0178 14.7193 16.875 14.6169L16.9167 14.6836Z" fill="white" />
                            <path d="M8.28345 0.166016C6.80009 0.166016 5.35004 0.605883 4.11667 1.42999C2.88331 2.2541 1.92201 3.42544 1.35435 4.79589C0.786697 6.16634 0.638172 7.67434 0.927561 9.12919C1.21695 10.5841 1.93126 11.9204 2.98015 12.9693C4.02904 14.0182 5.36542 14.7325 6.82027 15.0219C8.27513 15.3113 9.78313 15.1628 11.1536 14.5951C12.524 14.0275 13.6954 13.0662 14.5195 11.8328C15.3436 10.5994 15.7835 9.14938 15.7835 7.66602C15.7835 5.67689 14.9933 3.76924 13.5868 2.36271C12.1802 0.956192 10.2726 0.166016 8.28345 0.166016ZM8.28345 12.966C7.23721 12.966 6.21445 12.6559 5.34443 12.0748C4.4744 11.4937 3.79615 10.6677 3.39539 9.7013C2.99463 8.73486 2.88935 7.67131 3.09286 6.64506C3.29637 5.6188 3.79952 4.6759 4.53874 3.93552C5.27796 3.19514 6.22007 2.6905 7.246 2.48538C8.27193 2.28026 9.33565 2.38386 10.3027 2.7831C11.2698 3.18233 12.0968 3.85928 12.6793 4.7284C13.2617 5.59751 13.5735 6.61978 13.5751 7.66602C13.5773 8.36194 13.442 9.05143 13.177 9.69491C12.9119 10.3384 12.5223 10.9232 12.0306 11.4156C11.5389 11.9081 10.9548 12.2986 10.3117 12.5647C9.66866 12.8307 8.97937 12.9671 8.28345 12.966V12.966Z" fill="white" />
                        </svg>
                        <div className="self-stretch my-auto text-white">
                            Choose your Program
                        </div>
                    </div>
                    {isOpen && (
                        <div
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                        ></div>
                    )}

                    {/* Drawer */}
                    <div
                        className={`fixed top-0 right-0 z-50 h-full w-[50rem] bg-white rounded-2xl overflow-y-scroll shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray">
                            <div className='flex justify-center items-center gap-2'>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.1667 4.4462V15.3454C20.1667 16.2345 19.4425 17.0504 18.5533 17.1604L18.2692 17.197C16.7658 17.3987 14.6483 18.022 12.9433 18.737C12.3475 18.9845 11.6875 18.5354 11.6875 17.8845V5.1337C11.6875 4.79453 11.88 4.48286 12.1825 4.31786C13.86 3.41036 16.3992 2.6037 18.1225 2.45703H18.1775C19.2775 2.45703 20.1667 3.3462 20.1667 4.4462Z" fill="#F89A21" />
                                    <path d="M9.81755 4.31786C8.14005 3.41036 5.60089 2.6037 3.87755 2.45703H3.81339C2.71339 2.45703 1.82422 3.3462 1.82422 4.4462V15.3454C1.82422 16.2345 2.54839 17.0504 3.43755 17.1604L3.72172 17.197C5.22505 17.3987 7.34255 18.022 9.04755 18.737C9.64339 18.9845 10.3034 18.5354 10.3034 17.8845V5.1337C10.3034 4.78536 10.1201 4.48286 9.81755 4.31786ZM4.58339 7.09536H6.64589C7.02172 7.09536 7.33339 7.40703 7.33339 7.78286C7.33339 8.16786 7.02172 8.47036 6.64589 8.47036H4.58339C4.20755 8.47036 3.89589 8.16786 3.89589 7.78286C3.89589 7.40703 4.20755 7.09536 4.58339 7.09536ZM7.33339 11.2204H4.58339C4.20755 11.2204 3.89589 10.9179 3.89589 10.5329C3.89589 10.157 4.20755 9.84536 4.58339 9.84536H7.33339C7.70922 9.84536 8.02089 10.157 8.02089 10.5329C8.02089 10.9179 7.70922 11.2204 7.33339 11.2204Z" fill="#F89A21" />
                                </svg>

                                <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Available program options</h5>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-black hover:text-gray "
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 mt-6 w-full max-md:max-w-full">
                            <div className="flex flex-wrap  gap-3 items-center text-sm font-medium tracking-wide text-slate-900">
                                <div className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto border-solid max-md:px-5 rounded-lg ${selectedDegree ? 'bg-white' : 'bg-amber-500 text-white'}  border border-solid border-zinc-100 cursor-pointer hover:bg-gray`} onClick={() => handleDegreeClick(null)}>
                                    All {data?.academic_degrees && data?.academic_degrees?.length > 0
                                        ? data.academic_degrees.reduce((total, degree) => total + degree.count, 0)
                                        : '0'}
                                </div>
                                {data && data.academic_degrees.map((academic, index) => (
                                    <div key={index} className={`gap-2 px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer hover:bg-gray ${selectedDegree === academic.academic_degree ? 'bg-amber-500 text-white' : 'bg-white'} `} onClick={() => handleDegreeClick(academic.academic_degree)}>
                                        {academic.academic_degree} ({academic.count})
                                    </div>
                                ))}


                            </div>
                            <>
                                {/* Program cards */}
                                {programs.loading ?
                                    <div className='flex justify-center items-center w-full'><Loader /></div>
                                    : <div className="grid grid-cols-2 gap-4 justify-center items-center">
                                        {programs?.programs?.data?.map((program: any) => {
                                            return (<div key={program.program_id} className="flex flex-col justify-center px-3 py-6 bg-white rounded-3xl border border-solid border-zinc-100">
                                                <div className="flex flex-col w-full">
                                                    <div className="text-xl font-bold text-zinc-900 truncate">
                                                        {program.program_name}
                                                    </div>
                                                    <div className="flex flex-col mt-4 w-full text-sm tracking-wide text-slate-900">
                                                        <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-t border-solid border-t-zinc-100">
                                                            <div className="flex gap-10 justify-between items-center w-full">
                                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M12 2.5C17.2339 2.5 21.5 6.76614 21.5 12C21.5 14.7526 20.3143 17.2313 18.4219 18.9717L18.0596 19.3047L17.96 19.3857C17.8774 19.4546 17.7915 19.5219 17.7021 19.5889L17.4229 19.79L17.4189 19.793C17.3093 19.8713 17.3031 19.8826 17.2617 19.9062L17.249 19.9131L17.2373 19.9209C17.0488 20.0434 16.8797 20.1353 16.6621 20.2656C16.6167 20.2916 16.567 20.3231 16.54 20.3398L16.4668 20.3828L16.458 20.3867C16.2591 20.4909 16.0609 20.5862 15.8633 20.6709L15.8496 20.6758L15.8359 20.6826C15.7515 20.7248 15.6955 20.7524 15.6445 20.7715L15.6338 20.7764L15.623 20.7803C15.4282 20.8638 15.243 20.9164 14.9863 21.0098C14.8954 21.0357 14.8107 21.0663 14.748 21.0898C14.5489 21.1584 14.3477 21.1975 14.0791 21.2646V21.2656C14.025 21.2757 13.9796 21.2857 13.9531 21.293C13.9236 21.3011 13.9125 21.3038 13.9092 21.3047L13.8926 21.3076L13.875 21.3115C13.6174 21.3667 13.3556 21.4039 13.0781 21.4326L13.043 21.4365L13.0088 21.4453C12.9985 21.4479 12.992 21.4489 12.9863 21.4502H12.9854L12.9648 21.4521C12.6453 21.4812 12.3209 21.5 12 21.5C11.6894 21.5 11.3755 21.4817 11.0557 21.4541C11.0195 21.4459 10.9678 21.4385 10.9102 21.4346L10.9111 21.4326C10.6338 21.4039 10.3727 21.3667 10.1152 21.3115L10.0938 21.3066L10.0723 21.3037L9.92773 21.2695L9.91895 21.2666L9.91113 21.2646L9.20996 21.0801L9.20117 21.0771L9.19141 21.0752L9.00586 21.0117L8.99414 21.0078L8.98145 21.0039L8.6709 20.8975C8.56722 20.8598 8.46333 20.8199 8.35938 20.7773L8.3457 20.7715L8.15332 20.6826L8.13672 20.6748L8.11914 20.667L7.82227 20.5361L7.54102 20.3916C7.51336 20.3757 7.48272 20.3572 7.44727 20.3359C7.41083 20.3141 7.36855 20.2887 7.32812 20.2656L7.32031 20.2617L7.31152 20.2568L7.0293 20.0986C6.93798 20.0438 6.84912 19.9869 6.7627 19.9277H6.76172C6.72675 19.9029 6.69472 19.8799 6.66504 19.8594C6.63223 19.8367 6.60189 19.8155 6.57031 19.793H6.56934C6.36851 19.6451 6.19316 19.5215 6.03027 19.3857L6.00977 19.3691L5.9873 19.3535L5.86035 19.2461H5.85938C5.81532 19.2073 5.76906 19.1702 5.73047 19.1396V19.1211L5.56934 18.9727C3.68601 17.232 2.5 14.7528 2.5 12C2.5 6.76614 6.76614 2.5 12 2.5ZM12 3C7.03386 3 3 7.03386 3 12C3 14.4578 3.99667 16.6923 5.60449 18.3213L5.99609 18.7188L6.34863 18.2852C6.55155 18.0349 6.78322 17.8005 7.05273 17.5898L7.33496 17.3877L7.33691 17.3857C8.60312 16.5416 10.2944 16.1055 12.0078 16.1055C13.6141 16.1055 15.1952 16.4888 16.4209 17.2314L16.6611 17.3848L16.665 17.3877C17.0628 17.6499 17.392 17.9536 17.6465 18.2783L17.9971 18.7256L18.3955 18.3213C20.0033 16.6923 21 14.4578 21 12C21 7.03386 16.9661 3 12 3Z" fill="#F89A21" stroke="#F89A21" />
                                                                        <path d="M12 7.42969C13.7379 7.42969 15.1591 8.79632 15.2461 10.5127L15.25 10.6797C15.24 12.4412 13.8621 13.8593 12.1123 13.9199H11.9639C10.12 13.8673 8.75 12.4345 8.75 10.6797C8.75 8.88583 10.2061 7.42969 12 7.42969Z" fill="#F89A21" stroke="#F89A21" />
                                                                    </svg>

                                                                    <div className="flex flex-col w-[114px]">
                                                                        <div>Duration of Study</div>
                                                                        <div className="font-bold">{program.course_duration}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M12 2.5C17.2439 2.5 21.5 6.75614 21.5 12C21.5 17.2439 17.2439 21.5 12 21.5C6.75614 21.5 2.5 17.2439 2.5 12C2.5 6.75614 6.75614 2.5 12 2.5ZM12 6.03027C11.3139 6.03027 10.75 6.59413 10.75 7.28027V7.70996H7.00977C6.3325 7.71009 5.75977 8.25544 5.75977 8.9502C5.75987 9.63617 6.32379 10.2001 7.00977 10.2002H13.1309C12.5611 13.2133 10.0128 15.4697 7 15.4697C6.31395 15.4697 5.75015 16.0337 5.75 16.7197C5.75 17.4059 6.31386 17.9697 7 17.9697C9.03319 17.9697 10.8989 17.2421 12.3818 16.0391C13.6882 17.284 15.2859 17.9697 17 17.9697C17.6772 17.9697 18.2497 17.4251 18.25 16.7305C18.25 16.0443 17.6861 15.4805 17 15.4805C15.9656 15.4805 14.954 15.0539 14.0908 14.2227C14.8997 13.0567 15.4516 11.6893 15.6553 10.21H16.9902C17.6763 10.2098 18.2402 9.64602 18.2402 8.95996C18.2402 8.27391 17.6763 7.71009 16.9902 7.70996H14.6074L14.5 7.7002C14.4541 7.7002 14.4163 7.70551 14.3926 7.70996H13.25V7.28027C13.25 6.59413 12.6861 6.03027 12 6.03027Z" fill="#F89A21" stroke="#F89A21" />
                                                                    </svg>

                                                                    <div className="flex flex-col w-[114px]">
                                                                        <div>Language Study</div>
                                                                        <div className="font-bold">{program.course_language}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-b border-solid border-b-zinc-100">
                                                            <div className="flex gap-10 justify-between items-center w-full">
                                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M12 2.5C17.2439 2.5 21.5 6.75614 21.5 12C21.5 17.2439 17.2439 21.5 12 21.5C6.75614 21.5 2.5 17.2439 2.5 12C2.5 6.75614 6.75614 2.5 12 2.5ZM12 6.03027C11.3139 6.03027 10.75 6.59413 10.75 7.28027V7.70996H7.00977C6.3325 7.71009 5.75977 8.25544 5.75977 8.9502C5.75987 9.63617 6.32379 10.2001 7.00977 10.2002H13.1309C12.5611 13.2133 10.0128 15.4697 7 15.4697C6.31395 15.4697 5.75015 16.0337 5.75 16.7197C5.75 17.4059 6.31386 17.9697 7 17.9697C9.03319 17.9697 10.8989 17.2421 12.3818 16.0391C13.6882 17.284 15.2859 17.9697 17 17.9697C17.6772 17.9697 18.2497 17.4251 18.25 16.7305C18.25 16.0443 17.6861 15.4805 17 15.4805C15.9656 15.4805 14.954 15.0539 14.0908 14.2227C14.8997 13.0567 15.4516 11.6893 15.6553 10.21H16.9902C17.6763 10.2098 18.2402 9.64602 18.2402 8.95996C18.2402 8.27391 17.6763 7.71009 16.9902 7.70996H14.6074L14.5 7.7002C14.4541 7.7002 14.4163 7.70551 14.3926 7.70996H13.25V7.28027C13.25 6.59413 12.6861 6.03027 12 6.03027Z" fill="#F89A21" stroke="#F89A21" />
                                                                    </svg>

                                                                    <div className="flex flex-col w-[114px]">
                                                                        <div>Start Date</div>
                                                                        <div className="font-bold">
                                                                            {new Date(program.start_date).toLocaleString('en-US', { year: 'numeric', month: 'short' })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M7 4H17C18.4234 4 19.5335 4.35572 20.2852 5.05371C21.0301 5.74547 21.5 6.84538 21.5 8.5V15.5C21.5 17.1546 21.0301 18.2545 20.2852 18.9463C19.5335 19.6443 18.4234 20 17 20H7C5.57665 20 4.46652 19.6443 3.71484 18.9463C2.96994 18.2545 2.5 17.1546 2.5 15.5V8.5C2.5 6.84538 2.96994 5.74547 3.71484 5.05371C4.46652 4.35572 5.57665 4 7 4ZM5 15.75C4.31386 15.75 3.75 16.3139 3.75 17C3.75 17.6861 4.31386 18.25 5 18.25H8C8.68614 18.25 9.25 17.6861 9.25 17C9.25 16.3139 8.68614 15.75 8 15.75H5ZM12 8.5C10.0639 8.5 8.5 10.0639 8.5 12C8.5 13.9361 10.0639 15.5 12 15.5C13.9361 15.5 15.5 13.9361 15.5 12C15.5 10.0639 13.9361 8.5 12 8.5ZM16 5.75C15.3139 5.75 14.75 6.31386 14.75 7C14.75 7.68614 15.3139 8.25 16 8.25H19C19.6861 8.25 20.25 7.68614 20.25 7C20.25 6.31386 19.6861 5.75 19 5.75H16Z" fill="#F89A21" stroke="#F89A21" />
                                                                    </svg>

                                                                    <div className="flex flex-col w-[114px]">
                                                                        <div>Start From</div>
                                                                        <div className="font-bold">{program.price}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 items-center mt-4 w-full">
                                                        {loadingStates.get(program.program_id) ? <Spinner /> : <>
                                                            <div className="flex justify-center px-4 py-4 text-base font-medium tracking-wide text-white bg-primary rounded-[64px] grow cursor-pointer" onClick={() => {

                                                                getProgramData(program.program_id);

                                                            }}>
                                                                <div className="self-stretch my-auto text-white">
                                                                    Select Course
                                                                </div>
                                                            </div>
                                                            <div className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-4 py-0 my-auto w-14 h-14 border border-amber-500 border-solid rounded-[64px] cursor-pointer"
                                                                onClick={() => {
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
                                                                {program.is_favorite ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M16.4404 3.59961C19.2317 3.59984 21.4999 5.87347 21.5 8.68945C21.5 9.6831 21.3616 10.61 21.1162 11.4775L21.0039 11.8457L21.0029 11.8486C20.2487 14.2353 18.7033 16.1591 17.0352 17.5928C15.5737 18.8488 14.0403 19.7102 12.915 20.166L12.459 20.3359L12.4531 20.3379C12.3532 20.3731 12.189 20.3994 12 20.3994C11.858 20.3994 11.7301 20.3846 11.6328 20.3623L11.5469 20.3379L11.541 20.3359L11.085 20.166C9.9597 19.7102 8.42634 18.8488 6.96484 17.5928C5.40096 16.2487 3.94481 14.4742 3.14746 12.291L2.99707 11.8486L2.99609 11.8457L2.88379 11.4775C2.63838 10.61 2.5 9.68311 2.5 8.68945C2.50008 5.87347 4.76829 3.59984 7.55957 3.59961C9.20459 3.59961 10.6795 4.3992 11.5996 5.62891L12 6.16406L12.4004 5.62891C13.3205 4.3992 14.7954 3.59961 16.4404 3.59961Z" fill="#F89A21" stroke="#F89A21" />
                                                                </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.62 20.8096C12.28 20.9296 11.72 20.9296 11.38 20.8096C8.48 19.8196 2 15.6896 2 8.68961C2 5.59961 4.49 3.09961 7.56 3.09961C9.38 3.09961 10.99 3.97961 12 5.33961C13.01 3.97961 14.63 3.09961 16.44 3.09961C19.51 3.09961 22 5.59961 22 8.68961C22 15.6896 15.52 19.8196 12.62 20.8096Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>}



                                                            </div>
                                                        </>}
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        })}
                                    </div>}

                            </>

                            {/* Pagination */}
                            {programs?.programs?.data?.length > 0 &&
                                <div className="flex gap-5 justify-between items-center my-5 w-full px-10">
                                    <div>
                                        <Pagination
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                            disableNext={!hasMoreData}
                                            numberOfPages={programs?.programs?.pages}
                                        />
                                    </div>

                                    <div className="flex gap-2 items-center text-sm leading-none text-zinc-900">
                                        <div className="self-stretch my-auto text-zinc-900">
                                            Result per page
                                        </div>
                                        <div>
                                            <select
                                                name="" id=""
                                                value={limit}
                                                onChange={(e: any) => {
                                                    setLimit(e.target.value)
                                                    // dispatch(getAllUniversities({ page: currentPage, limt: e.target.value, language, recommended: recommended }));
                                                    dispatch(getAllPrograms({ language, limt: e.target.value, universityId: university.id, userId: user.id }));
                                                }}
                                                className="flex gap-2 justify-center items-center px-2 py-1 my-auto bg-white rounded border border-gray">
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {/* <div className="p-4 text-sm text-gray-600 dark:text-gray-300">
                            <p>This is a custom drawer without using any libraries.</p>
                            <p className="mt-2">
                                You can put anything you want here — links, forms, buttons, etc.
                            </p>
                        </div> */}
                    </div>
                </div> :
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <div className="flex flex-col w-full max-md:max-w-full">
                            <div className="text-xl font-bold text-zinc-900 max-md:max-w-full">
                                {/* Algonquin College : Diploma Practical Nursing (Diploma) */}
                                {program?.university?.name} : {program?.program_translations?.name} ({program?.program_translations?.academic_degree})
                            </div>
                            <div className="mt-2 text-sm tracking-wide text-justify text-zinc-900 max-md:max-w-full">
                                {program?.university?.description}
                            </div>
                        </div>
                        <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                            <div className="overflow-hidden px-3.5 w-full text-xl border-amber-500 border-solid border-l-[5px] border-l-amber-500 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                                Important Date
                            </div>
                            <div className="grid grid-cols-3 mt-4 w-full text-sm tracking-wide max-md:max-w-full">
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.1671 2.37398V1.33398C11.1671 1.06065 10.9405 0.833984 10.6671 0.833984C10.3938 0.833984 10.1671 1.06065 10.1671 1.33398V2.33398H5.83381V1.33398C5.83381 1.06065 5.60715 0.833984 5.33381 0.833984C5.06048 0.833984 4.83381 1.06065 4.83381 1.33398V2.37398C3.03381 2.54065 2.16048 3.61398 2.02714 5.20732C2.01381 5.40065 2.17381 5.56065 2.36048 5.56065H13.6405C13.8338 5.56065 13.9938 5.39398 13.9738 5.20732C13.8405 3.61398 12.9671 2.54065 11.1671 2.37398Z" fill="#666666" />
                                        <path d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        Start At : {new Date(program.start_date).toLocaleString('en-US', { year: 'numeric', month: 'short' })}
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.1671 2.37398V1.33398C11.1671 1.06065 10.9405 0.833984 10.6671 0.833984C10.3938 0.833984 10.1671 1.06065 10.1671 1.33398V2.33398H5.83381V1.33398C5.83381 1.06065 5.60715 0.833984 5.33381 0.833984C5.06048 0.833984 4.83381 1.06065 4.83381 1.33398V2.37398C3.03381 2.54065 2.16048 3.61398 2.02714 5.20732C2.01381 5.40065 2.17381 5.56065 2.36048 5.56065H13.6405C13.8338 5.56065 13.9938 5.39398 13.9738 5.20732C13.8405 3.61398 12.9671 2.54065 11.1671 2.37398Z" fill="#666666" />
                                        <path d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        End At : {new Date(program.end_date).toLocaleString('en-US', { year: 'numeric', month: 'short' })}
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center ">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        Duration : {program?.program_translations?.course_duration}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-4 w-full text-sm max-md:max-w-full">
                            <div className="overflow-hidden px-3.5 w-full text-xl border-amber-500 border-solid border-l-[5px] border-l-amber-500 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                                Program Info
                            </div>
                            <div className="grid grid-cols-3 mt-4 w-full">
                                <div className="flex gap-3 items-center whitespace-nowrap">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">{program?.program_translations?.academic_degree}</div>
                                </div>
                                <div className="flex z-10 gap-10 max-md:-mr-1 max-md:max-w-full">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                        </svg>
                                        </div>
                                        <div className="self-stretch my-auto text-zinc-900">
                                            {program?.major}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        {program?.field}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 mt-4 w-full tracking-wide max-md:pr-5 max-md:max-w-full">
                                <div className="flex gap-3 items-center whitespace-nowrap">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">{program?.program_translations?.course_language}</div>
                                </div>
                                <div className="flex gap-3 items-center whitespace-nowrap">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">{program?.program_translations?.attendance_method}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-4 w-full text-sm max-md:max-w-full">
                            <div className="overflow-hidden px-3.5 w-full text-xl border-amber-500 border-solid border-l-[5px] border-l-amber-500 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                                University Admission Requirements
                            </div>
                            <div className="grid grid-cols-3 mt-4 w-full tracking-wide max-md:max-w-full">
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        {t("IELTS")}: {program.ilts}
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        {t("TOEFL")}: {program.toefl}
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        {program.gpa === "0" ? <>{t("GPA")} : {t("GPAValue")}</> : <>{t("GPA")}: {program.gpa}</>}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 mt-4 w-full tracking-wide">
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z" fill="#666666" />
                                    </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        {t("bank")}: {program.bank_statement ? t("required") : t("not_required")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }



            </div>
            <div className="flex flex-wrap gap-6 items-start mt-6 w-full max-md:max-w-full">
                <div className="overflow-hidden flex-1 shrink px-3.5 text-2xl font-bold whitespace-nowrap border-amber-500 border-solid basis-0 border-l-[5px] border-l-amber-500 min-w-[240px] text-zinc-900 max-md:pr-5">
                    Programs
                </div>
                <div className="flex flex-wrap  gap-3 items-center text-sm font-medium tracking-wide text-slate-900">
                    <div className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto border-solid max-md:px-5 rounded-lg ${selectedDegree ? 'bg-white' : 'bg-amber-500 text-white'}  border border-solid border-zinc-100 cursor-pointer hover:bg-gray`} onClick={() => handleDegreeClick(null)}>
                        All {data?.academic_degrees && data?.academic_degrees?.length > 0
                            ? data.academic_degrees.reduce((total, degree) => total + degree.count, 0)
                            : '0'}
                    </div>
                    {data && data.academic_degrees.map((academic, index) => (
                        <div key={index} className={`gap-2 px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer hover:bg-gray ${selectedDegree === academic.academic_degree ? 'bg-amber-500 text-white' : 'bg-white'} `} onClick={() => handleDegreeClick(academic.academic_degree)}>
                            {academic.academic_degree} ({academic.count})
                        </div>
                    ))}


                </div>
                {/* Program cards */}
                {programs.loading ?
                    <div className='flex justify-center items-center w-full'><Loader /></div>
                    : <div className="grid grid-cols-2 gap-4 justify-center items-center">
                        {programs?.programs?.data?.map((program: any) => {
                            return (<div key={program.program_id} className="flex flex-col justify-center px-3 py-6 bg-white rounded-3xl border border-solid border-zinc-100">
                                <div className="flex flex-col w-full">
                                    <div className="text-xl font-bold text-zinc-900 truncate">
                                        {program.program_name}
                                    </div>
                                    <div className="flex flex-col mt-4 w-full text-sm tracking-wide text-slate-900">
                                        <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-t border-solid border-t-zinc-100">
                                            <div className="flex gap-10 justify-between items-center w-full">
                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2.5C17.2339 2.5 21.5 6.76614 21.5 12C21.5 14.7526 20.3143 17.2313 18.4219 18.9717L18.0596 19.3047L17.96 19.3857C17.8774 19.4546 17.7915 19.5219 17.7021 19.5889L17.4229 19.79L17.4189 19.793C17.3093 19.8713 17.3031 19.8826 17.2617 19.9062L17.249 19.9131L17.2373 19.9209C17.0488 20.0434 16.8797 20.1353 16.6621 20.2656C16.6167 20.2916 16.567 20.3231 16.54 20.3398L16.4668 20.3828L16.458 20.3867C16.2591 20.4909 16.0609 20.5862 15.8633 20.6709L15.8496 20.6758L15.8359 20.6826C15.7515 20.7248 15.6955 20.7524 15.6445 20.7715L15.6338 20.7764L15.623 20.7803C15.4282 20.8638 15.243 20.9164 14.9863 21.0098C14.8954 21.0357 14.8107 21.0663 14.748 21.0898C14.5489 21.1584 14.3477 21.1975 14.0791 21.2646V21.2656C14.025 21.2757 13.9796 21.2857 13.9531 21.293C13.9236 21.3011 13.9125 21.3038 13.9092 21.3047L13.8926 21.3076L13.875 21.3115C13.6174 21.3667 13.3556 21.4039 13.0781 21.4326L13.043 21.4365L13.0088 21.4453C12.9985 21.4479 12.992 21.4489 12.9863 21.4502H12.9854L12.9648 21.4521C12.6453 21.4812 12.3209 21.5 12 21.5C11.6894 21.5 11.3755 21.4817 11.0557 21.4541C11.0195 21.4459 10.9678 21.4385 10.9102 21.4346L10.9111 21.4326C10.6338 21.4039 10.3727 21.3667 10.1152 21.3115L10.0938 21.3066L10.0723 21.3037L9.92773 21.2695L9.91895 21.2666L9.91113 21.2646L9.20996 21.0801L9.20117 21.0771L9.19141 21.0752L9.00586 21.0117L8.99414 21.0078L8.98145 21.0039L8.6709 20.8975C8.56722 20.8598 8.46333 20.8199 8.35938 20.7773L8.3457 20.7715L8.15332 20.6826L8.13672 20.6748L8.11914 20.667L7.82227 20.5361L7.54102 20.3916C7.51336 20.3757 7.48272 20.3572 7.44727 20.3359C7.41083 20.3141 7.36855 20.2887 7.32812 20.2656L7.32031 20.2617L7.31152 20.2568L7.0293 20.0986C6.93798 20.0438 6.84912 19.9869 6.7627 19.9277H6.76172C6.72675 19.9029 6.69472 19.8799 6.66504 19.8594C6.63223 19.8367 6.60189 19.8155 6.57031 19.793H6.56934C6.36851 19.6451 6.19316 19.5215 6.03027 19.3857L6.00977 19.3691L5.9873 19.3535L5.86035 19.2461H5.85938C5.81532 19.2073 5.76906 19.1702 5.73047 19.1396V19.1211L5.56934 18.9727C3.68601 17.232 2.5 14.7528 2.5 12C2.5 6.76614 6.76614 2.5 12 2.5ZM12 3C7.03386 3 3 7.03386 3 12C3 14.4578 3.99667 16.6923 5.60449 18.3213L5.99609 18.7188L6.34863 18.2852C6.55155 18.0349 6.78322 17.8005 7.05273 17.5898L7.33496 17.3877L7.33691 17.3857C8.60312 16.5416 10.2944 16.1055 12.0078 16.1055C13.6141 16.1055 15.1952 16.4888 16.4209 17.2314L16.6611 17.3848L16.665 17.3877C17.0628 17.6499 17.392 17.9536 17.6465 18.2783L17.9971 18.7256L18.3955 18.3213C20.0033 16.6923 21 14.4578 21 12C21 7.03386 16.9661 3 12 3Z" fill="#F89A21" stroke="#F89A21" />
                                                        <path d="M12 7.42969C13.7379 7.42969 15.1591 8.79632 15.2461 10.5127L15.25 10.6797C15.24 12.4412 13.8621 13.8593 12.1123 13.9199H11.9639C10.12 13.8673 8.75 12.4345 8.75 10.6797C8.75 8.88583 10.2061 7.42969 12 7.42969Z" fill="#F89A21" stroke="#F89A21" />
                                                    </svg>

                                                    <div className="flex flex-col w-[114px]">
                                                        <div>Duration of Study</div>
                                                        <div className="font-bold">{program.course_duration}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2.5C17.2439 2.5 21.5 6.75614 21.5 12C21.5 17.2439 17.2439 21.5 12 21.5C6.75614 21.5 2.5 17.2439 2.5 12C2.5 6.75614 6.75614 2.5 12 2.5ZM12 6.03027C11.3139 6.03027 10.75 6.59413 10.75 7.28027V7.70996H7.00977C6.3325 7.71009 5.75977 8.25544 5.75977 8.9502C5.75987 9.63617 6.32379 10.2001 7.00977 10.2002H13.1309C12.5611 13.2133 10.0128 15.4697 7 15.4697C6.31395 15.4697 5.75015 16.0337 5.75 16.7197C5.75 17.4059 6.31386 17.9697 7 17.9697C9.03319 17.9697 10.8989 17.2421 12.3818 16.0391C13.6882 17.284 15.2859 17.9697 17 17.9697C17.6772 17.9697 18.2497 17.4251 18.25 16.7305C18.25 16.0443 17.6861 15.4805 17 15.4805C15.9656 15.4805 14.954 15.0539 14.0908 14.2227C14.8997 13.0567 15.4516 11.6893 15.6553 10.21H16.9902C17.6763 10.2098 18.2402 9.64602 18.2402 8.95996C18.2402 8.27391 17.6763 7.71009 16.9902 7.70996H14.6074L14.5 7.7002C14.4541 7.7002 14.4163 7.70551 14.3926 7.70996H13.25V7.28027C13.25 6.59413 12.6861 6.03027 12 6.03027Z" fill="#F89A21" stroke="#F89A21" />
                                                    </svg>

                                                    <div className="flex flex-col w-[114px]">
                                                        <div>Language Study</div>
                                                        <div className="font-bold">{program.course_language}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-b border-solid border-b-zinc-100">
                                            <div className="flex gap-10 justify-between items-center w-full">
                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2.5C17.2439 2.5 21.5 6.75614 21.5 12C21.5 17.2439 17.2439 21.5 12 21.5C6.75614 21.5 2.5 17.2439 2.5 12C2.5 6.75614 6.75614 2.5 12 2.5ZM12 6.03027C11.3139 6.03027 10.75 6.59413 10.75 7.28027V7.70996H7.00977C6.3325 7.71009 5.75977 8.25544 5.75977 8.9502C5.75987 9.63617 6.32379 10.2001 7.00977 10.2002H13.1309C12.5611 13.2133 10.0128 15.4697 7 15.4697C6.31395 15.4697 5.75015 16.0337 5.75 16.7197C5.75 17.4059 6.31386 17.9697 7 17.9697C9.03319 17.9697 10.8989 17.2421 12.3818 16.0391C13.6882 17.284 15.2859 17.9697 17 17.9697C17.6772 17.9697 18.2497 17.4251 18.25 16.7305C18.25 16.0443 17.6861 15.4805 17 15.4805C15.9656 15.4805 14.954 15.0539 14.0908 14.2227C14.8997 13.0567 15.4516 11.6893 15.6553 10.21H16.9902C17.6763 10.2098 18.2402 9.64602 18.2402 8.95996C18.2402 8.27391 17.6763 7.71009 16.9902 7.70996H14.6074L14.5 7.7002C14.4541 7.7002 14.4163 7.70551 14.3926 7.70996H13.25V7.28027C13.25 6.59413 12.6861 6.03027 12 6.03027Z" fill="#F89A21" stroke="#F89A21" />
                                                    </svg>

                                                    <div className="flex flex-col w-[114px]">
                                                        <div>Start Date</div>
                                                        <div className="font-bold">
                                                            {new Date(program.start_date).toLocaleString('en-US', { year: 'numeric', month: 'short' })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4H17C18.4234 4 19.5335 4.35572 20.2852 5.05371C21.0301 5.74547 21.5 6.84538 21.5 8.5V15.5C21.5 17.1546 21.0301 18.2545 20.2852 18.9463C19.5335 19.6443 18.4234 20 17 20H7C5.57665 20 4.46652 19.6443 3.71484 18.9463C2.96994 18.2545 2.5 17.1546 2.5 15.5V8.5C2.5 6.84538 2.96994 5.74547 3.71484 5.05371C4.46652 4.35572 5.57665 4 7 4ZM5 15.75C4.31386 15.75 3.75 16.3139 3.75 17C3.75 17.6861 4.31386 18.25 5 18.25H8C8.68614 18.25 9.25 17.6861 9.25 17C9.25 16.3139 8.68614 15.75 8 15.75H5ZM12 8.5C10.0639 8.5 8.5 10.0639 8.5 12C8.5 13.9361 10.0639 15.5 12 15.5C13.9361 15.5 15.5 13.9361 15.5 12C15.5 10.0639 13.9361 8.5 12 8.5ZM16 5.75C15.3139 5.75 14.75 6.31386 14.75 7C14.75 7.68614 15.3139 8.25 16 8.25H19C19.6861 8.25 20.25 7.68614 20.25 7C20.25 6.31386 19.6861 5.75 19 5.75H16Z" fill="#F89A21" stroke="#F89A21" />
                                                    </svg>

                                                    <div className="flex flex-col w-[114px]">
                                                        <div>Start From</div>
                                                        <div className="font-bold">{program.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center mt-4 w-full">
                                        {loadingStates.get(program.program_id) ? <Spinner /> : <>
                                            <div className="flex justify-center px-4 py-4 text-base font-medium tracking-wide text-white bg-primary rounded-[64px] grow cursor-pointer" onClick={() => {

                                                getProgramData(program.program_id);

                                            }}>
                                                <div className="self-stretch my-auto text-white">
                                                    Select Course
                                                </div>
                                            </div>
                                            <div className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-4 py-0 my-auto w-14 h-14 border border-amber-500 border-solid rounded-[64px] cursor-pointer"
                                                onClick={() => {
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
                                                {program.is_favorite ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.4404 3.59961C19.2317 3.59984 21.4999 5.87347 21.5 8.68945C21.5 9.6831 21.3616 10.61 21.1162 11.4775L21.0039 11.8457L21.0029 11.8486C20.2487 14.2353 18.7033 16.1591 17.0352 17.5928C15.5737 18.8488 14.0403 19.7102 12.915 20.166L12.459 20.3359L12.4531 20.3379C12.3532 20.3731 12.189 20.3994 12 20.3994C11.858 20.3994 11.7301 20.3846 11.6328 20.3623L11.5469 20.3379L11.541 20.3359L11.085 20.166C9.9597 19.7102 8.42634 18.8488 6.96484 17.5928C5.40096 16.2487 3.94481 14.4742 3.14746 12.291L2.99707 11.8486L2.99609 11.8457L2.88379 11.4775C2.63838 10.61 2.5 9.68311 2.5 8.68945C2.50008 5.87347 4.76829 3.59984 7.55957 3.59961C9.20459 3.59961 10.6795 4.3992 11.5996 5.62891L12 6.16406L12.4004 5.62891C13.3205 4.3992 14.7954 3.59961 16.4404 3.59961Z" fill="#F89A21" stroke="#F89A21" />
                                                </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.62 20.8096C12.28 20.9296 11.72 20.9296 11.38 20.8096C8.48 19.8196 2 15.6896 2 8.68961C2 5.59961 4.49 3.09961 7.56 3.09961C9.38 3.09961 10.99 3.97961 12 5.33961C13.01 3.97961 14.63 3.09961 16.44 3.09961C19.51 3.09961 22 5.59961 22 8.68961C22 15.6896 15.52 19.8196 12.62 20.8096Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>}



                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>}


                {/* Pagination */}
                {programs?.programs?.data?.length > 0 &&
                    <div className="flex gap-5 justify-between items-center my-5 w-full ">
                        <div>
                            <Pagination
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                disableNext={!hasMoreData}
                                numberOfPages={programs?.programs?.pages}
                            />
                        </div>

                        <div className="flex gap-2 items-center text-sm leading-none text-zinc-900">
                            <div className="self-stretch my-auto text-zinc-900">
                                Result per page
                            </div>
                            <div>
                                <select
                                    name="" id=""
                                    value={limit}
                                    onChange={(e: any) => {
                                        setLimit(e.target.value)
                                        // dispatch(getAllUniversities({ page: currentPage, limt: e.target.value, language, recommended: recommended }));
                                        dispatch(getAllPrograms({ language, limt: e.target.value, universityId: university.id, userId: user.id }));
                                    }}
                                    className="flex gap-2 justify-center items-center px-2 py-1 my-auto bg-white rounded border border-gray">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProgramDetails
