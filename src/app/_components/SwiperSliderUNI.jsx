import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import useCurrentLang from '../_hooks/useCurrentLang';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import Loader from './Loader';
import Image from 'next/image';
import useCleanPath from '../_hooks/useCleanPath';
import { parseCookies } from 'nookies';
import { toast } from "react-toastify";
import { getAllUniversities } from '../reduxTool-kit/slices/universitiesSlice';
import { useTranslations } from 'next-intl';

const FillStar = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.10404 0.999957C6.24269 0.722666 6.46606 0.584019 6.77416 0.584019C7.08226 0.584019 7.30564 0.722666 7.44428 0.999957L8.94628 4.05017L12.32 4.55853C12.6281 4.58934 12.8284 4.7511 12.9208 5.04379C13.0132 5.33649 12.9516 5.59067 12.7359 5.80635L10.2865 8.18643L10.8642 11.5601C10.9104 11.8528 10.8103 12.0878 10.5638 12.2649C10.3173 12.4421 10.0632 12.4613 9.80126 12.3227L6.77416 10.7514L3.74706 12.3227C3.48518 12.4768 3.23099 12.4613 2.98451 12.2765C2.73803 12.0916 2.6379 11.8528 2.68411 11.5601L3.2618 8.18643L0.812392 5.80635C0.596721 5.59067 0.535101 5.33649 0.627531 5.04379C0.719962 4.7511 0.920228 4.58934 1.22833 4.55853L4.60205 4.05017L6.10404 0.999957Z" fill="#FFCC00" />
    </svg>)
const SolidStar = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2106 4.55853C12.5187 4.58934 12.719 4.7511 12.8114 5.04379C12.9039 5.33649 12.8422 5.59067 12.6266 5.80635L10.1771 8.18643L10.7548 11.5601C10.8011 11.8528 10.7009 12.0878 10.4544 12.2649C10.208 12.4421 9.95378 12.4613 9.69189 12.3227L6.66479 10.7514L3.63769 12.3227C3.3758 12.4768 3.12162 12.4613 2.87514 12.2765C2.62865 12.0916 2.52852 11.8528 2.57474 11.5601L3.15243 8.18643L0.703017 5.80635C0.487346 5.59067 0.425726 5.33649 0.518156 5.04379C0.610587 4.7511 0.810853 4.58934 1.11895 4.55853L4.49267 4.05017L5.99467 0.999957C6.13331 0.722666 6.35669 0.584019 6.66479 0.584019C6.97289 0.584019 7.19626 0.722666 7.33491 0.999957L8.83691 4.05017L12.2106 4.55853ZM8.99866 7.7936L11.3094 5.52905L8.09746 5.0669L6.66479 2.15534L5.23211 5.0669L2.02015 5.52905L4.33092 7.7936L3.79944 11.0056L6.66479 9.48046L9.53014 11.0056L8.99866 7.7936Z" fill="#FFCC00" />
    </svg>)

export default function SwiperSliderUNI({ data }) {

    const { cleanPath } = useCleanPath();
    const { tokenMainSite } = parseCookies();
    const user = useSelector((state) => state.displayUser);
    const language = useCurrentLang();
    const [loadingStates, setLoadingStates] = useState(new Map());
    const [error, setError] = useState("");
    const [universities, setUniversities] = useState([]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);


    const dispatch = useDispatch();
    const t = useTranslations("UniversitiesCard");
    const e = useTranslations("institutesCard");

    const subscribe = async (universityId) => {
        setLoadingStates((prev) => new Map(prev).set(universityId, true));
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenMainSite}`
                },
                body: JSON.stringify({
                    "userId": user.id,
                    "targetId": universityId,
                    "targetType": "UNIVERSITY"
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message);
            }

            const result = await response.json();
            setUniversities(prev =>
                prev.map(u => u.id === universityId ? { ...u, is_notified: true } : u)
            );
            toast.success(t("addSubscribe"));
        } catch (error) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setLoadingStates((prev) => new Map(prev).set(universityId, false));
        }
    }

    const unSubscribe = async (universityId) => {
        setLoadingStates((prev) => new Map(prev).set(universityId, true));
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/unsubscribe`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenMainSite}`
                },
                body: JSON.stringify({
                    "userId": user.id,
                    "targetId": universityId,
                    "targetType": "UNIVERSITY"
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message);
            }

            const result = await response.json();
            setUniversities(prev =>
                prev.map(u => u.id === universityId ? { ...u, is_notified: false } : u)
            );
            toast.success(t("removeSubscribe"));
        } catch (error) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setLoadingStates((prev) => new Map(prev).set(universityId, false));
        }
    }


    const onSwiper = (swiper) => {
        swiperRef.current = swiper;

        setTimeout(() => {
            if (prevRef.current && nextRef.current) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.update();
            }
        }, 100);
    };

    useEffect(() => {
        if (data?.universities?.data) {
            setUniversities(data.universities.data);
        }
    }, [data]);



    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!isMounted || !prevRef.current || !nextRef.current) return;

        const initSwiper = () => {
            if (swiperRef.current) {
                swiperRef.current.params.navigation.prevEl = prevRef.current;
                swiperRef.current.params.navigation.nextEl = nextRef.current;

                swiperRef.current.navigation.destroy();
                swiperRef.current.navigation.init();
                swiperRef.current.navigation.update();

                swiperRef.current.update();
            }
        };

        initSwiper();

        // إعادة التهيئة عند تغير حجم النافذة (للتأكد من أن كل شيء يعمل بعد التغييرات)
        const handleResize = () => {
            initSwiper();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMounted, data.loading]);



    return (
        <div className='relative'>
            <Swiper
                onSwiper={onSwiper}
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: isMounted ? prevRef.current : undefined,
                    nextEl: isMounted ? nextRef.current : undefined,
                    disabledClass: 'swiper-button-disabled'
                }}
                grabCursor={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                className="mySwiper"

            >
                {data.loading ? (<Loader />) :
                    (
                        universities?.map((uni) => {
                            return (
                                <SwiperSlide key={uni.id}>
                                    <div className="p-4 lg:p-6 bg-white rounded-3xl border border-solid border-zinc-100">
                                        <div className='flex justify-start items-center gap-5'>
                                            <div className="flex justify-center items-center mb-4 rounded-lg border border-solid border-zinc-100 h-[130px] w-[145px] relative">
                                                <Image
                                                    src={!uni.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(uni.logo)}`}
                                                    fill={true}
                                                    alt={uni.name}
                                                    className="object-contain rounded-lg size-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 mb-4">
                                                <div className="flex gap-0.5 items-center relative">
                                                    <Image
                                                        src={!uni.country_logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(uni.country_logo)}`}
                                                        width={20}
                                                        height={20}
                                                        // fill={true}
                                                        alt={uni.name}
                                                        className="rounded-xl h-[22px] w-[22px]"
                                                    />
                                                    <div className="text-sm text-zinc-900">{uni.country_name}</div>
                                                </div>
                                                <div className='flex gap-1'>
                                                    <div>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 3.93018C15.2468 3.93018 18.3854 5.77707 20.6152 9.09326L20.8281 9.41846C21.2659 10.1057 21.4999 11.0396 21.5 11.9985C21.5 12.8377 21.3208 13.6554 20.9834 14.3032L20.8291 14.5708L20.8281 14.5718C19.7039 16.3355 18.3361 17.7083 16.8281 18.644C15.3201 19.5698 13.6799 20.0601 12 20.0601C8.75267 20.0601 5.61408 18.2225 3.38477 14.8989L3.17188 14.5718L3.01758 14.3022C2.67958 13.6504 2.50006 12.8332 2.5 11.9956C2.5 11.1578 2.67949 10.3399 3.01758 9.68799L3.17188 9.41846C4.29652 7.65406 5.66517 6.28097 7.17383 5.34521L7.17285 5.34424C8.68046 4.4191 10.3207 3.93018 12 3.93018ZM12 7.46045C9.48305 7.46045 7.45996 9.49515 7.45996 12.0005C7.46013 14.5057 9.48316 16.5405 12 16.5405C14.5168 16.5405 16.5399 14.5057 16.54 12.0005C16.54 9.49515 14.5169 7.46045 12 7.46045Z" stroke="#F89A21" />
                                                            <path d="M11.9996 9.64014C13.2935 9.64014 14.36 10.7066 14.36 12.0005C14.3598 13.2919 13.2957 14.3501 11.9996 14.3501C10.7061 14.3499 9.65022 13.2941 9.65002 12.0005C9.65002 10.6956 10.7071 9.64035 11.9996 9.64014Z" stroke="#F89A21" />
                                                        </svg>
                                                    </div>
                                                    <span className='text-nowrap text-sm'> {uni.visites} {t("viewsLable1")}</span>
                                                </div>
                                                {/* rating */}
                                                {/* <div className="flex gap-2 items-center">
                                                    <div className="text-sm text-zinc-900">{uni.rating}</div>
                                                    <div className="flex gap-0.5">
                                                        <div className="flex gap-[2px]">
                                                            {Array.from({ length: 5 }, (_, index) =>
                                                                index < uni.rating ? <FillStar key={index} /> : <SolidStar key={index} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div> */}

                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="mb-1 line-clamp-1 text-2xl font-bold text-zinc-900">
                                                {uni.name}
                                            </div>
                                            <div className="text-base tracking-wide leading-6 text-zinc-900 line-clamp-2">
                                                {uni.description}
                                            </div>
                                        </div>
                                        <div className="flex justify-between px-0 py-4 border-t border-solid border-t-zinc-100">
                                            <div className="flex gap-1.5 items-center">
                                                <div>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.25999 11.0199V15.9899C4.25999 17.8099 4.25999 17.8099 5.97999 18.9699L10.71 21.6999C11.42 22.1099 12.58 22.1099 13.29 21.6999L18.02 18.9699C19.74 17.8099 19.74 17.8099 19.74 15.9899V11.0199C19.74 9.19994 19.74 9.19994 18.02 8.03994L13.29 5.30994C12.58 4.89994 11.42 4.89994 10.71 5.30994L5.97999 8.03994C4.25999 9.19994 4.25999 9.19994 4.25999 11.0199Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.63 10.99L13.2 11.88C13.29 12.02 13.49 12.16 13.64 12.2L14.66 12.46C15.29 12.62 15.46 13.16 15.05 13.66L14.38 14.47C14.28 14.6 14.2 14.83 14.21 14.99L14.27 16.04C14.31 16.69 13.85 17.02 13.25 16.78L12.27 16.39C12.12 16.33 11.87 16.33 11.72 16.39L10.74 16.78C10.14 17.02 9.67999 16.68 9.71999 16.04L9.77999 14.99C9.78999 14.83 9.70999 14.59 9.60999 14.47L8.93999 13.66C8.52999 13.16 8.69999 12.62 9.32999 12.46L10.35 12.2C10.51 12.16 10.71 12.01 10.79 11.88L11.36 10.99C11.72 10.45 12.28 10.45 12.63 10.99Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="text-sm text-slate-900">{uni.major_count} {t("cardFoterUni3")}</div>
                                            </div>
                                            <div className="flex gap-1.5 items-center">
                                                <div>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21.66 10.44L20.68 14.62C19.84 18.23 18.18 19.69 15.06 19.39C14.56 19.35 14.02 19.26 13.44 19.12L11.76 18.72C7.59 17.73 6.3 15.67 7.28 11.49L8.26 7.30001C8.46 6.45001 8.7 5.71001 9 5.10001C10.17 2.68001 12.16 2.03001 15.5 2.82001L17.17 3.21001C21.36 4.19001 22.64 6.26001 21.66 10.44Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M15.06 19.3901C14.44 19.8101 13.66 20.1601 12.71 20.4701L11.13 20.9901C7.16001 22.2701 5.07001 21.2001 3.78001 17.2301L2.50001 13.2801C1.22001 9.3101 2.28001 7.2101 6.25001 5.9301L7.83001 5.4101C8.24001 5.2801 8.63001 5.1701 9.00001 5.1001C8.70001 5.7101 8.46001 6.4501 8.26001 7.3001L7.28001 11.4901C6.30001 15.6701 7.59001 17.7301 11.76 18.7201L13.44 19.1201C14.02 19.2601 14.56 19.3501 15.06 19.3901Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.64 8.53003L17.49 9.76003" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M11.66 12.3999L14.56 13.1399" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </div>
                                                <div className="text-sm text-slate-900">{uni.program_count} {t("cardFoterUni4")}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center mt-4">
                                            {loadingStates.get(uni.id) ? <Spinner /> : <>
                                                <Link href={`/${language}/university/${uni.id}`} className="flex gap-1 items-center px-4  py-0 h-12 text-nowrap text-base text-white cursor-pointer bg-primary rounded-[64px] justify-center grow">
                                                    <span>{t("cardButtonUni")}</span>
                                                    <div>
                                                        {language === "en" ?
                                                            <svg
                                                                width="22"
                                                                height="21"
                                                                viewBox="0 0 25 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            ><path
                                                                    d="M14.9301 5.92993L21.0001 11.9999L14.9301 18.0699"
                                                                    stroke="white"
                                                                    strokeWidth="1.5"
                                                                    strokeMiterlimit="10"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                /><path
                                                                    d="M4 12H20.83"
                                                                    stroke="white"
                                                                    strokeWidth="1.5"
                                                                    strokeMiterlimit="10"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg> :
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.56995 18.0701L3.49995 12.0001L9.56995 5.93007" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M20.5 12L3.67 12" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>}
                                                    </div>
                                                </Link>
                                                <div onClick={() => {
                                                    if (tokenMainSite && user.id) {
                                                        // console.log("login");
                                                        if (uni.is_notified) {
                                                            unSubscribe(uni.id);
                                                        } else if (!uni.is_notified) {
                                                            subscribe(uni.id);[]
                                                        }
                                                    } else {
                                                        toast.error(e("messageError"));
                                                    }
                                                }}
                                                    className="flex justify-center items-center cursor-pointer rounded-[64px]">
                                                    <div>
                                                        {uni.is_notified ? <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28C0.5 12.8122 12.8122 0.5 28 0.5Z" stroke="#F89A21" />
                                                            <path d="M28.0203 18.5498C31.3635 18.55 34.0897 21.2756 34.0897 24.6299V26.5C34.0897 26.8024 34.157 27.1686 34.2498 27.501C34.3423 27.8318 34.4746 28.1779 34.6317 28.4365V28.4375L35.7615 30.3174C36.0943 30.8788 36.157 31.5389 35.9324 32.1426C35.7333 32.6689 35.3424 33.095 34.8279 33.335L34.6004 33.4258C33.6763 33.7337 32.7316 33.9818 31.7791 34.1562L31.3709 34.2256L31.3602 34.2275C31.2466 34.2482 31.1588 34.2638 31.075 34.2715L31.0565 34.2734L31.0379 34.2764L30.5252 34.3428L30.5125 34.3447C30.4095 34.3588 30.3035 34.3701 30.1942 34.3809L29.8563 34.4121H29.8514C29.2479 34.4705 28.6343 34.5 28.0203 34.5C27.5521 34.5 27.0837 34.4831 26.6199 34.4502L26.157 34.4121L26.1473 34.4111L25.7684 34.376L25.3963 34.3252L25.3865 34.3242L24.951 34.2646H24.95C24.8894 34.2541 24.8311 34.2458 24.783 34.2393L24.6395 34.2178L24.6346 34.2168L23.8221 34.0645C23.1485 33.9256 22.4831 33.7573 21.8231 33.5527L21.4285 33.4258L21.4246 33.4238L21.1844 33.332C20.7211 33.1238 20.363 32.7807 20.1522 32.3682L20.0594 32.1562L20.0584 32.1543L19.993 31.9395C19.8704 31.4274 19.9622 30.845 20.2811 30.3037L20.2801 30.3027L21.409 28.4277L21.4119 28.4229C21.5621 28.1663 21.6907 27.8199 21.782 27.4883C21.8731 27.1573 21.9402 26.7922 21.9402 26.4902V24.6299C21.9402 21.2776 24.6646 18.5596 28.0203 18.5498ZM27.9901 21.6396C27.294 21.6396 26.7305 22.2035 26.7303 22.8994V26C26.7304 26.6961 27.294 27.2598 27.9901 27.2598C28.6861 27.2597 29.2497 26.696 29.2498 26V22.8994C29.2496 22.2035 28.686 21.6397 27.9901 21.6396Z" fill="#F89A21" stroke="#F89A21" />
                                                            <path d="M26.2464 36.627V36.6279C26.8282 36.679 27.4229 36.71 28.0198 36.71C28.4604 36.71 28.8998 36.6924 29.3333 36.6621L29.764 36.6279H29.7679C29.8102 36.6239 29.8569 36.6192 29.9066 36.6152C29.4454 37.1563 28.7619 37.4999 28.0003 37.5C27.3414 37.5 26.6922 37.2318 26.2396 36.7627L26.222 36.7451L26.1302 36.6523C26.1183 36.6395 26.1076 36.6255 26.096 36.6123C26.146 36.6172 26.1961 36.6227 26.2464 36.627Z" fill="#F89A21" stroke="#F89A21" />
                                                            <rect x="30.5" y="16.5" width="9" height="9" rx="4.5" fill="#C30734" />
                                                            <rect x="30.5" y="16.5" width="9" height="9" rx="4.5" stroke="white" />
                                                        </svg>
                                                            : <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.5">
                                                                    <path d="M28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28C0.5 12.8122 12.8122 0.5 28 0.5Z" stroke="#F89A21" />
                                                                    <path d="M28.0203 18.5498C31.3635 18.55 34.0896 21.2756 34.0896 24.6299V26.5C34.0897 26.8024 34.1569 27.1686 34.2498 27.501C34.3422 27.8318 34.4746 28.1779 34.6316 28.4365V28.4375L35.7615 30.3174C36.0943 30.8788 36.157 31.5389 35.9324 32.1426C35.7333 32.6689 35.3424 33.095 34.8279 33.335L34.6004 33.4258C33.6763 33.7337 32.7315 33.9818 31.7791 34.1562L31.3709 34.2256L31.3601 34.2275C31.2465 34.2482 31.1588 34.2638 31.075 34.2715L31.0564 34.2734L31.0379 34.2764L30.5252 34.3428L30.5125 34.3447C30.4095 34.3588 30.3034 34.3701 30.1941 34.3809L29.8562 34.4121H29.8513C29.2479 34.4705 28.6343 34.5 28.0203 34.5C27.552 34.5 27.0836 34.4831 26.6199 34.4502L26.157 34.4121L26.1472 34.4111L25.7683 34.376L25.3963 34.3252L25.3865 34.3242L24.951 34.2646H24.95C24.8893 34.2541 24.831 34.2458 24.783 34.2393L24.6394 34.2178L24.6346 34.2168L23.8221 34.0645C23.1485 33.9256 22.483 33.7573 21.823 33.5527L21.4285 33.4258L21.4246 33.4238L21.1844 33.332C20.7211 33.1238 20.363 32.7807 20.1521 32.3682L20.0594 32.1562L20.0584 32.1543L19.993 31.9395C19.8704 31.4274 19.9622 30.845 20.281 30.3037L20.2801 30.3027L21.409 28.4277L21.4119 28.4229C21.5621 28.1663 21.6907 27.8199 21.782 27.4883C21.8731 27.1573 21.9402 26.7922 21.9402 26.4902V24.6299C21.9402 21.2776 24.6646 18.5596 28.0203 18.5498ZM27.99 21.6396C27.294 21.6396 26.7305 22.2035 26.7303 22.8994V26C26.7304 26.6961 27.2939 27.2598 27.99 27.2598C28.6861 27.2597 29.2497 26.696 29.2498 26V22.8994C29.2496 22.2035 28.686 21.6397 27.99 21.6396Z" fill="#F89A21" stroke="#F89A21" />
                                                                    <path d="M26.2464 36.627V36.6279C26.8282 36.679 27.4229 36.71 28.0198 36.71C28.4604 36.71 28.8998 36.6924 29.3333 36.6621L29.764 36.6279H29.7679C29.8102 36.6239 29.8569 36.6192 29.9066 36.6152C29.4454 37.1563 28.7619 37.4999 28.0003 37.5C27.3414 37.5 26.6922 37.2318 26.2396 36.7627L26.222 36.7451L26.1302 36.6523C26.1183 36.6395 26.1076 36.6255 26.096 36.6123C26.146 36.6172 26.1961 36.6227 26.2464 36.627Z" fill="#F89A21" stroke="#F89A21" />
                                                                </g>
                                                            </svg>
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                            }
                                        </div>

                                    </div>
                                </SwiperSlide>
                            )
                        })
                    )
                }

                {/* <SwiperSlide>
                    <div className="p-6 bg-white rounded-3xl border border-solid border-zinc-100">
                        <div className='flex justify-between items-center'>
                            <div className="flex justify-center items-center mb-4 rounded-lg border border-solid border-zinc-100 h-[153px] w-[153px]">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/98440cccb758ba74704d4e8337cad75e5fa59e58"
                                    alt="University Logo"
                                    className="object-contain rounded-lg size-full"
                                />
                            </div>
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex gap-1.5 items-center">
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b3ea59b7fb71a8a152e2c6f0fd625abbfdc7641"
                                        alt="Country flag"
                                        className="rounded-xl h-[22px] w-[22px]"
                                    />
                                    <div className="text-sm text-zinc-900">Canda</div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="text-sm text-zinc-900">4.8</div>
                                    <div className="flex gap-0.5">
                                        <div className='flex gap-[2px]'>
                                            <FillStar />
                                            <FillStar />
                                            <FillStar />
                                            <FillStar />
                                            <SolidStar />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-1 text-2xl font-bold text-zinc-900">
                                Algonquin College
                            </div>
                            <div className="text-base tracking-wide leading-6 text-zinc-900">
                                It is a publicly funded, English-language college located in
                                Ottawa..
                            </div>
                        </div>
                        <div className="flex justify-between px-0 py-4 border-t border-solid border-t-zinc-100">
                            <div className="flex gap-1.5 items-center">
                                <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.25999 11.0199V15.9899C4.25999 17.8099 4.25999 17.8099 5.97999 18.9699L10.71 21.6999C11.42 22.1099 12.58 22.1099 13.29 21.6999L18.02 18.9699C19.74 17.8099 19.74 17.8099 19.74 15.9899V11.0199C19.74 9.19994 19.74 9.19994 18.02 8.03994L13.29 5.30994C12.58 4.89994 11.42 4.89994 10.71 5.30994L5.97999 8.03994C4.25999 9.19994 4.25999 9.19994 4.25999 11.0199Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.63 10.99L13.2 11.88C13.29 12.02 13.49 12.16 13.64 12.2L14.66 12.46C15.29 12.62 15.46 13.16 15.05 13.66L14.38 14.47C14.28 14.6 14.2 14.83 14.21 14.99L14.27 16.04C14.31 16.69 13.85 17.02 13.25 16.78L12.27 16.39C12.12 16.33 11.87 16.33 11.72 16.39L10.74 16.78C10.14 17.02 9.67999 16.68 9.71999 16.04L9.77999 14.99C9.78999 14.83 9.70999 14.59 9.60999 14.47L8.93999 13.66C8.52999 13.16 8.69999 12.62 9.32999 12.46L10.35 12.2C10.51 12.16 10.71 12.01 10.79 11.88L11.36 10.99C11.72 10.45 12.28 10.45 12.63 10.99Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="text-sm text-slate-900">03 Majors</div>
                            </div>
                            <div className="flex gap-1.5 items-center">
                                <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.66 10.44L20.68 14.62C19.84 18.23 18.18 19.69 15.06 19.39C14.56 19.35 14.02 19.26 13.44 19.12L11.76 18.72C7.59 17.73 6.3 15.67 7.28 11.49L8.26 7.30001C8.46 6.45001 8.7 5.71001 9 5.10001C10.17 2.68001 12.16 2.03001 15.5 2.82001L17.17 3.21001C21.36 4.19001 22.64 6.26001 21.66 10.44Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.06 19.3901C14.44 19.8101 13.66 20.1601 12.71 20.4701L11.13 20.9901C7.16001 22.2701 5.07001 21.2001 3.78001 17.2301L2.50001 13.2801C1.22001 9.3101 2.28001 7.2101 6.25001 5.9301L7.83001 5.4101C8.24001 5.2801 8.63001 5.1701 9.00001 5.1001C8.70001 5.7101 8.46001 6.4501 8.26001 7.3001L7.28001 11.4901C6.30001 15.6701 7.59001 17.7301 11.76 18.7201L13.44 19.1201C14.02 19.2601 14.56 19.3501 15.06 19.3901Z" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.64 8.53003L17.49 9.76003" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.66 12.3999L14.56 13.1399" stroke="#F89A21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>
                                <div className="text-sm text-slate-900">56 Programs</div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center mt-4">
                            <div className="flex gap-1 items-center px-4 py-0 h-12 text-base text-white cursor-pointer bg-primary rounded-[64px] justify-center grow">
                                <span>Discover all Universities</span>
                                <div>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.4301 6.42993L20.5001 12.4999L14.4301 18.5699" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.5 12.5H20.33" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <Link href={`${language}`} className="flex justify-center items-center w-14 h-14 border border-amber-500 border-solid cursor-pointer rounded-[64px] max-sm:w-full">
                                <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.40853 12.4276L5.40856 12.4276L5.4115 12.4226C5.56166 12.1661 5.69076 11.8206 5.78205 11.489C5.87324 11.1578 5.93999 10.7923 5.93999 10.49V8.63005C5.93999 5.27767 8.6648 2.55967 12.0207 2.55005C15.3637 2.55042 18.09 5.27593 18.09 8.63005V10.5C18.09 10.8025 18.1568 11.1683 18.2497 11.5008C18.3423 11.8325 18.4746 12.18 18.6322 12.4389C18.6325 12.4394 18.6328 12.4399 18.6331 12.4404L19.7601 14.3155C19.7603 14.3158 19.7605 14.3161 19.7607 14.3164C20.0943 14.8785 20.1572 15.5395 19.932 16.1439C19.7044 16.7447 19.2269 17.2144 18.6009 17.426C17.5447 17.778 16.4614 18.0511 15.3707 18.2264L15.3706 18.2263L15.3605 18.2281C15.2467 18.2488 15.1587 18.2645 15.0747 18.2721L15.0562 18.2738L15.0378 18.2769C14.8734 18.3042 14.707 18.3229 14.5248 18.3431L14.5248 18.343L14.5124 18.3446C14.3067 18.3727 14.0891 18.3917 13.8567 18.4119L13.8567 18.4119L13.8518 18.4124C13.2481 18.4708 12.6342 18.5 12.02 18.5C11.3955 18.5 10.7713 18.4708 10.1574 18.4123L10.1574 18.4122L10.1469 18.4114C9.89034 18.3924 9.64338 18.3639 9.39602 18.3259L9.39603 18.3258L9.38607 18.3244C9.23877 18.3048 9.09425 18.2855 8.95948 18.2663C8.897 18.2552 8.83649 18.247 8.78663 18.2402L8.78255 18.2396C8.72577 18.2319 8.68173 18.2258 8.63943 18.2181L8.63944 18.2181L8.63435 18.2172C7.5456 18.0309 6.48065 17.7766 5.42811 17.4257L5.42453 17.4245C4.76183 17.2092 4.27295 16.7352 4.05895 16.1566L4.05815 16.1545C3.84855 15.5955 3.91633 14.9237 4.27973 14.3056L5.40853 12.4276ZM11.99 11.26C12.6861 11.26 13.25 10.6962 13.25 10V6.90005C13.25 6.20391 12.6861 5.64005 11.99 5.64005C11.2938 5.64005 10.73 6.20391 10.73 6.90005V10C10.73 10.6962 11.2938 11.26 11.99 11.26Z" fill="#F89A21" stroke="#F89A21" />
                                        <path d="M10.0956 20.6143C10.146 20.6193 10.1966 20.6239 10.2474 20.6282C10.8289 20.6792 11.4233 20.71 12.02 20.71C12.6073 20.71 13.1924 20.6791 13.7645 20.628L13.7645 20.628L13.7674 20.6277C13.8104 20.6237 13.858 20.6197 13.9086 20.6156C13.4474 21.1572 12.7621 21.5 12 21.5C11.3411 21.5 10.6924 21.2319 10.2398 20.7628L10.2311 20.7538L10.222 20.7452C10.1782 20.7042 10.136 20.6604 10.0956 20.6143Z" fill="#F89A21" stroke="#F89A21" />
                                    </svg>

                                </div>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide> */}


            </Swiper>
            <button ref={nextRef} className="custom-next absolute top-1/2 -left-20 -translate-y-1/2 p-2 rounded-full  transition hidden md:block">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44Z" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M31 24H19" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 30L17 24L23 18" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button ref={prevRef} className=" custom-prev absolute top-1/2 -right-20 -translate-y-1/2 p-2 rounded-full  transition hidden md:block">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 24H29" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M25 30L31 24L25 18" stroke="#666666" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </button>
        </div>
    );
}
