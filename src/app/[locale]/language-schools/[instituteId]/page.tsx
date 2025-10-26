"use client";
import BannerSection from "@/app/_components/BannerSection";
import HeadTittle from "@/app/_components/HeadTittle";
import Loader from "@/app/_components/Loader";
import Pagination from "@/app/_components/Pagination";
import ResultNotFound from "@/app/_components/ResultNotFound";
import Spinner from "@/app/_components/Spinner";
import useCleanPath from "@/app/_hooks/useCleanPath";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { getAllBranches } from "@/app/reduxTool-kit/slices/branchesSlice";
import { fetchCoursesByBranch } from "@/app/reduxTool-kit/slices/coursesByBranch";
import { fetchFavoriteCourse } from "@/app/reduxTool-kit/slices/favoriteCourseSlice";
import { getLanguageSchool } from "@/app/reduxTool-kit/slices/languageSchoolSlice";
import { fetchUnFavoriteCourse } from "@/app/reduxTool-kit/slices/unFavoriteCourseSlice";
import { AppDispatch } from "@/app/store";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { parseCookies } from "nookies";
import { Key, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination as SwiperPagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "use-intl";

type myBranch = {
  city_name: string;
  country_name: string;
  description: string;
  files: [];
  institute_name: string;
  id: number;
  logo: string;
  min_age: number;
  min_cost: number;
  number_of_courses: number;
  offer: number;
  rating: number;
  recommend: number;
  visites: number;
  status: string;
  state_name: string;
  country: { name: string; logo: string };
};
function InstituteDetails() {
  // translations
  const trBanner = useTranslations("languageSchool");
  const trCard = useTranslations("institutesCard");
  const trUN = useTranslations("UniversityDetails");
  const trINS = useTranslations("aboutInst");
  const UNi = useTranslations("Universities");
  const INDE = useTranslations("instDetails");
  const trBr = useTranslations("listOfCourses");
  const trCoures = useTranslations("courses")

  const language = useCurrentLang();
  const { cleanPath } = useCleanPath();
  const params = useParams<{ instituteId: string; locale: string }>();
  const { instituteId, locale } = params;
  const { tokenMainSite } = parseCookies()
  const pathname = usePathname();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [limit, setLimit] = useState<number>(10);
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();
  // Selector
  const user = useSelector((state: any) => state.displayUser);
  const languageSchool = useSelector((state: any) => state.languageSchool);
  const branchesSchool = useSelector((state: any) => state.branches);
  const { FavCourse, loadingFav } = useSelector((state: any) => state.favoriteCourse)
  const unFavCourse = useSelector((state: any) => state.unFavCourseSlice)
  const { courses, loading, error } = useSelector(
    (state: any) => state.coursesByBranch
  );
  const images = languageSchool.files || [];

  // State
  const [showVideo, setShowVideo] = useState(false);
  const [showBranches, setShowBranches] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const UN = useTranslations("Universities");


  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle change page Pagination
  const handlePageChange = (newPage: any) => {
    if (hasMoreData && newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({
        top: 200,
        left: 100,
        behavior: "smooth",
      });
    }
  };

  // Handle CoursesByBranch Swiper
  const coursesByBranchFn = () => {
    setIsOpenDrawer(true);
    dispatch(
      fetchCoursesByBranch({
        language: language,
        instituteID: instituteId,
        tokenMainSite
      })
    );

  };

  // Add faverite Course 
  const addFavCourseFn = async (courseId: number) => {
    setLoadingStates((prev) => new Map(prev).set(courseId, true));
    try {
      await dispatch(fetchFavoriteCourse({ language, userId: user.id, courseId, tokenMainSite })).unwrap()
      dispatch(fetchCoursesByBranch({
        language: language,
        instituteID: instituteId,
        tokenMainSite
      }))
      toast.success(INDE("addCourse"))
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoadingStates((prev) => new Map(prev).set(courseId, false));
    }
  }

  // Remove Favorite Course 
  const unFavCourseFn = async (courseId: number) => {
    setLoadingStates((prev) => new Map(prev).set(courseId, true));
    try {
      dispatch(fetchUnFavoriteCourse({ userId: user.id, courseId, tokenMainSite })).unwrap()
      dispatch(fetchCoursesByBranch({
        language: language,
        instituteID: instituteId,
        tokenMainSite
      }))
      toast.success(INDE("removeCourse"))
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoadingStates((prev) => new Map(prev).set(courseId, false));
    }
  }

  // Selected Course 
  const selectCourse = (course: any) => {
    setLoadingStates((prev) => new Map(prev).set(course, true));
    setTimeout(() => {
      localStorage.setItem("selectedCourse", JSON.stringify(course))
      toast.success(trBr("SelectedCourse"))
      setLoadingStates((prev) => new Map(prev).set(course, false));
    }, 500);
  }

  useEffect(() => {
    dispatch(getLanguageSchool({ schoolsId: instituteId, locale }));
    dispatch(
      getAllBranches({ locale, schoolsId: instituteId, page: currentPage, limit: "12" })
    );
  }, [instituteId, locale, dispatch, currentPage]);

  return (
    <main className="bg-[#fafafa] ">
      {languageSchool.id ? (
        <>
          <BannerSection
            head={trBanner("head")}
            breadcrumb={trBanner("head")}
            urlImage="/images/bannerUNI.png"
          />

          <HeadTittle
            head={trBanner("head")}
            headLine={languageSchool?.name}
            summary={languageSchool?.description}
          />
          <section className="w-full max-md:max-w-full px-5 lg:px-10 xl:px-28">
            <div className="py-2 flex items-center gap-2  mx-auto">
              <span className="flex items-center gap-2">
                {languageSchool?.countries?.map(
                  (country: {
                    id: Key | null | undefined;
                    logo: string;
                    name: string;
                  }) => {
                    return (
                      <div
                        className="relative inline-block group"
                        key={country.id}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(country.logo)}`}
                          alt={country.name ? `${country.name} logo` : `country Logo`}
                          loading="lazy"
                          className="cursor-pointer"
                          width={22}
                          height={22}
                        />

                        {/* Tooltip */}
                        <span
                          className="
      absolute left-1/2 -top-7 -translate-x-1/2
      px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap
      opacity-0 group-hover:opacity-100 transition
    "
                        >
                          {country.name}
                        </span>
                      </div>

                    );
                  }
                )}
              </span>
              {/* rating */}
              {/* <span className="flex items-center gap-1 sm:border-x sm:border-[#EEEEEE] px-1">
                {languageSchool?.rating}
                <p className="flex">
                  {[1, 2, 3, 4, 5].map((_, index) => {
                    const currentRate = index + 1;
                    const isActive = languageSchool?.rating >= currentRate;
                    return (
                      <svg
                        key={index}
                        width="18"
                        height="15"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.16654 1.00191C6.30519 0.724619 6.52856 0.585972 6.83666 0.585972C7.14476 0.585972 7.36814 0.724619 7.50678 1.00191L9.00878 4.05212L12.3825 4.56049C12.6906 4.5913 12.8909 4.75305 12.9833 5.04575C13.0757 5.33844 13.0141 5.59263 12.7984 5.8083L10.349 8.18839L10.9267 11.5621C10.9729 11.8548 10.8728 12.0897 10.6263 12.2669C10.3798 12.444 10.1257 12.4633 9.86376 12.3247L6.83666 10.7533L3.80956 12.3247C3.54768 12.4787 3.29349 12.4633 3.04701 12.2784C2.80053 12.0936 2.7004 11.8548 2.74661 11.5621L3.3243 8.18839L0.874892 5.8083C0.659221 5.59263 0.597601 5.33844 0.690031 5.04575C0.782462 4.75305 0.982728 4.5913 1.29083 4.56049L4.66455 4.05212L6.16654 1.00191Z"
                          fill={isActive ? "#FDB022" : "#F0F0F0"}
                        />
                      </svg>
                    );
                  })}
                </p>
              </span> */}
              <span className="flex items-center gap-1">
                <svg
                  width="25"
                  height="22"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0625 3.92969C15.414 3.92969 18.6503 5.8975 20.8906 9.41797C21.3284 10.1052 21.5624 11.0391 21.5625 11.998C21.5625 12.9573 21.3286 13.8887 20.8916 14.5703L20.8906 14.5713C19.7664 16.335 18.3986 17.7078 16.8906 18.6436C15.3826 19.5693 13.7424 20.0596 12.0625 20.0596C8.71037 20.0596 5.47422 18.1007 3.23438 14.5713L3.08008 14.3018C2.74208 13.65 2.56256 12.8327 2.5625 11.9951C2.5625 11.0376 2.79645 10.1055 3.23438 9.41797C4.35899 7.65362 5.72674 6.2795 7.23535 5.34375C8.74296 4.41861 10.3832 3.92969 12.0625 3.92969ZM12.0625 7.45996C9.54555 7.45996 7.52246 9.49466 7.52246 12C7.52263 14.5052 9.54566 16.54 12.0625 16.54C14.5793 16.54 16.6024 14.5052 16.6025 12C16.6025 9.49466 14.5794 7.45996 12.0625 7.45996Z"
                    fill="#F89A21"
                    stroke="#F89A21"
                  />
                  <path
                    d="M12.0605 9.64062C13.3544 9.64062 14.4209 10.7071 14.4209 12.001C14.4207 13.2924 13.3566 14.3506 12.0605 14.3506C10.767 14.3504 9.71113 13.2945 9.71094 12.001C9.71094 10.6961 10.768 9.64084 12.0605 9.64062Z"
                    stroke="#F89A21"
                  />
                </svg>
                {languageSchool?.visites} {trCard("viewsLable1")}
              </span>
            </div>
            {/* Img & Video */}
            <div className="relative my-4 h-full rounded-t-md  mx-auto">
              {/* <div className="relative my-4 min-h-[350px]  rounded-t-md  mx-auto"> */}
              {showVideo ? (
                <>
                  {languageSchool?.video && (
                    <iframe
                      title="Institute Video"
                      src={languageSchool.video}
                      className="w-full h-[250px] md:h-[450px] rounded-md  inset-0"
                      allowFullScreen
                    ></iframe>
                  )}
                </>
              ) : (
                <>
                  {images?.length ? (
                    <div className="relative w-full h-full ">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${images[currentImageIndex]}`}
                        alt={`image-${currentImageIndex}`}
                        width={500}
                        height={500}
                        className="w-auto mx-auto  object-contain"
                      // className="w-auto mx-auto h-[400px] object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-xl lg:text-4xl text-black text-center">
                      {trUN("messageVideo")}
                    </div>
                  )}
                </>
              )}

              <div className="h-[43px] bg-[#1B1B1B]/60 absolute left-0 right-0 bottom-0 flex items-center justify-between px-4 ">
                <div className="flex items-center gap-4  text-white">
                  {/* Image */}
                  <span
                    className={`${!showVideo ? "font-bold text-yellow-500" : ""
                      } flex items-center gap-1 cursor-pointer`}
                    onClick={() => setShowVideo(false)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.2981 4.38031L11.72 4.25531L11.57 2.57406C11.5388 2.22093 11.2231 1.97406 10.8544 2.00218L1.60438 2.76156C1.23563 2.79281 0.97001 3.08968 0.998135 3.43968L1.66063 10.8084C1.69188 11.1616 2.01063 11.4084 2.37626 11.3803L2.84501 11.3428L2.77001 12.7741C2.75126 13.1678 3.05751 13.4866 3.47001 13.5084L13.7888 13.9991C14.2013 14.0178 14.5419 13.7303 14.5638 13.3366L14.9981 5.10843C15.0169 4.71781 14.7075 4.39906 14.2981 4.38031ZM3.20438 4.54593L2.98251 8.75843L2.43876 9.53031L1.93876 3.96781V3.95218V3.93656C1.95438 3.78031 2.07313 3.65531 2.23563 3.64281L10.3919 2.97406C10.5544 2.96156 10.695 3.06781 10.72 3.22093C10.72 3.22718 10.7294 3.22718 10.7294 3.23343C10.7294 3.23656 10.7388 3.23968 10.7388 3.24593L10.8231 4.20843L3.97938 3.88031C3.56688 3.86781 3.22313 4.15531 3.20438 4.54593ZM13.645 11.9491L12.1856 10.2209L11.3263 9.19906C11.2513 9.10843 11.1294 9.03343 10.995 9.02718C10.8606 9.02093 10.7606 9.07406 10.6481 9.15531L10.1356 9.52718C10.0263 9.59281 9.94188 9.63656 9.82626 9.63031C9.71376 9.62406 9.61376 9.58031 9.54188 9.51156C9.51688 9.48656 9.47001 9.44281 9.43251 9.40531L8.09501 7.87718C7.99813 7.75531 7.83876 7.67718 7.66376 7.66781C7.48563 7.65843 7.31376 7.73343 7.20126 7.84281L4.04188 11.2428L3.82938 11.4741L3.83876 11.2616L4.05126 7.23343L4.15438 5.26781V5.25218V5.23656C4.19813 5.06781 4.34813 4.94593 4.52626 4.95531L10.9075 5.26156L11.8044 5.30531L13.6263 5.39281C13.8075 5.40218 13.9481 5.53968 13.9513 5.71156C13.9513 5.71781 13.9606 5.72093 13.9606 5.72718C13.9606 5.73343 13.97 5.73656 13.97 5.74281L13.645 11.9491Z"
                        fill="white"
                      />
                      <path
                        d="M11.6625 8.19609C12.2688 8.19609 12.7625 7.70234 12.7625 7.09609C12.7625 6.48984 12.2719 5.99609 11.6625 5.99609C11.0563 5.99609 10.5625 6.48672 10.5625 7.09609C10.5625 7.70547 11.0531 8.19609 11.6625 8.19609Z"
                        fill="white"
                      />
                    </svg>
                    {trUN("images")}
                  </span>
                  {/* Video */}
                  <span
                    className={`${showVideo ? "font-bold text-yellow-500" : ""
                      } flex items-center gap-1 cursor-pointer`}
                    onClick={() => setShowVideo(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1.75 2.25H14.25V13.25H1.75V2.25Z" fill="white" />
                      <path d="M1.75 2.25H14.25V5.25H1.75V2.25Z" fill="#1B1B1B" />
                      <path
                        d="M3.75 3.75C3.75 3.88261 3.69732 4.00979 3.60355 4.10355C3.50979 4.19732 3.38261 4.25 3.25 4.25C3.11739 4.25 2.99021 4.19732 2.89645 4.10355C2.80268 4.00979 2.75 3.88261 2.75 3.75C2.75 3.61739 2.80268 3.49021 2.89645 3.39645C2.99021 3.30268 3.11739 3.25 3.25 3.25C3.38261 3.25 3.50979 3.30268 3.60355 3.39645C3.69732 3.49021 3.75 3.61739 3.75 3.75ZM4.336 2.25L5.836 3.75L4.336 5.25H5.75L6.543 4.457L7.25 3.75L6.543 3.043L5.75 2.25H4.336ZM7.336 2.25L8.836 3.75L7.336 5.25H8.75L9.543 4.457L10.25 3.75L9.543 3.043L8.75 2.25H7.336ZM10.336 2.25L11.836 3.75L10.336 5.25H11.75L12.543 4.457L13.25 3.75L12.543 3.043L11.75 2.25H10.336Z"
                        fill="white"
                      />
                      <path
                        d="M1.75 2C1.6837 2 1.62011 2.02636 1.57322 2.07324C1.52634 2.12013 1.5 2.1837 1.5 2.25V13.25C1.5 13.3163 1.52634 13.3799 1.57322 13.4268C1.62011 13.4737 1.6837 13.5 1.75 13.5H14.25C14.3163 13.5 14.3799 13.4737 14.4268 13.4268C14.4737 13.3799 14.5 13.3163 14.5 13.25V2.25C14.5 2.1837 14.4737 2.12013 14.4268 2.07324C14.3799 2.02636 14.3163 2 14.25 2H1.75ZM2 2.5H14V13H2V2.5Z"
                        fill="white"
                      />
                      <path
                        d="M1.75 2C1.6837 2 1.62011 2.02636 1.57322 2.07324C1.52634 2.12013 1.5 2.1837 1.5 2.25V5.25C1.5 5.3163 1.52634 5.37993 1.57322 5.42682C1.62011 5.4737 1.6837 5.5 1.75 5.5H14.25C14.3163 5.5 14.3799 5.4737 14.4268 5.42682C14.4737 5.37993 14.5 5.3163 14.5 5.25V2.25C14.5 2.1837 14.4737 2.12013 14.4268 2.07324C14.3799 2.02636 14.3163 2 14.25 2H1.75ZM2 2.5H14V5H2V2.5Z"
                        fill="white"
                      />
                      <path
                        d="M3.25 3C2.8385 3 2.5 3.339 2.5 3.75C2.5 4.1615 2.8385 4.5 3.25 4.5C3.6615 4.5 4 4.1615 4 3.75C4 3.339 3.6615 3 3.25 3ZM3.25 3.5C3.391 3.5 3.5 3.609 3.5 3.75C3.5 3.891 3.391 4 3.25 4C3.21704 4.00047 3.18432 3.99433 3.15377 3.98193C3.12323 3.96954 3.09548 3.95117 3.07217 3.92786C3.04886 3.90455 3.03047 3.8768 3.01807 3.84625C3.00567 3.81571 2.99953 3.78296 3 3.75C3 3.609 3.109 3.5 3.25 3.5ZM4.336 2C4.28649 1.99991 4.23807 2.01453 4.19687 2.04199C4.15568 2.06946 4.12357 2.10856 4.10461 2.1543C4.08565 2.20003 4.0807 2.25034 4.09038 2.29889C4.10006 2.34744 4.12395 2.39204 4.159 2.427L5.4825 3.75L4.159 5.07355C4.12412 5.10854 4.10039 5.15307 4.0908 5.20154C4.08122 5.25001 4.08621 5.30019 4.10515 5.34583C4.12409 5.39146 4.15612 5.43051 4.19721 5.45795C4.2383 5.48539 4.28659 5.49999 4.336 5.5H5.75C5.78285 5.50006 5.81539 5.49367 5.84577 5.48114C5.87614 5.46861 5.90374 5.4502 5.927 5.427L6.7195 4.63403L7.427 3.927C7.47387 3.88012 7.5002 3.81654 7.5002 3.75024C7.5002 3.68395 7.47387 3.62043 7.427 3.57355L6.7195 2.86652L5.927 2.07355C5.90378 2.05026 5.8762 2.03172 5.84582 2.0191C5.81545 2.00649 5.78289 2.00001 5.75 2H4.336ZM7.336 2C7.28649 1.99991 7.23807 2.01453 7.19687 2.04199C7.15568 2.06946 7.12357 2.10856 7.10461 2.1543C7.08565 2.20003 7.0807 2.25034 7.09038 2.29889C7.10006 2.34744 7.12395 2.39204 7.159 2.427L8.4825 3.75L7.159 5.07355C7.12412 5.10854 7.10039 5.15307 7.0908 5.20154C7.08122 5.25001 7.08621 5.30019 7.10515 5.34583C7.12409 5.39146 7.15612 5.43051 7.19721 5.45795C7.2383 5.48539 7.28659 5.49999 7.336 5.5H8.75C8.78285 5.50006 8.81539 5.49367 8.84577 5.48114C8.87614 5.46861 8.90374 5.4502 8.927 5.427L9.7195 4.63403L10.427 3.927C10.4739 3.88012 10.5002 3.81654 10.5002 3.75024C10.5002 3.68395 10.4739 3.62043 10.427 3.57355L9.7195 2.86652L8.927 2.07355C8.90378 2.05026 8.8762 2.03172 8.84582 2.0191C8.81545 2.00649 8.78289 2.00001 8.75 2H7.336ZM10.336 2C10.2865 1.99991 10.2381 2.01453 10.1969 2.04199C10.1557 2.06946 10.1236 2.10856 10.1046 2.1543C10.0856 2.20003 10.0807 2.25034 10.0904 2.29889C10.1001 2.34744 10.1239 2.39204 10.159 2.427L11.4825 3.75L10.159 5.07355C10.1241 5.10854 10.1004 5.15307 10.0908 5.20154C10.0812 5.25001 10.0862 5.30019 10.1051 5.34583C10.1241 5.39146 10.1561 5.43051 10.1972 5.45795C10.2383 5.48539 10.2866 5.49999 10.336 5.5H11.75C11.7829 5.50006 11.8154 5.49367 11.8458 5.48114C11.8761 5.46861 11.9037 5.4502 11.927 5.427L12.7195 4.63403L13.427 3.927C13.4739 3.88012 13.5002 3.81654 13.5002 3.75024C13.5002 3.68395 13.4739 3.62043 13.427 3.57355L12.7195 2.86652L11.927 2.07355C11.9038 2.05026 11.8762 2.03172 11.8458 2.0191C11.8155 2.00649 11.7829 2.00001 11.75 2H10.336ZM4.9395 2.5H5.6465L6.3665 3.22003L6.8965 3.75L6.3665 4.28003L5.6465 5H4.9395L6.0125 3.927C6.05937 3.88012 6.0857 3.81654 6.0857 3.75024C6.0857 3.68395 6.05937 3.62043 6.0125 3.57355L4.9395 2.5ZM7.9395 2.5H8.6465L9.3665 3.22003L9.8965 3.75L9.3665 4.28003L8.6465 5H7.9395L9.0125 3.927C9.05937 3.88012 9.0857 3.81654 9.0857 3.75024C9.0857 3.68395 9.05937 3.62043 9.0125 3.57355L7.9395 2.5ZM10.9395 2.5H11.6465L12.3665 3.22003L12.8965 3.75L12.3665 4.28003L11.6465 5H10.9395L12.0125 3.927C12.0594 3.88012 12.0857 3.81654 12.0857 3.75024C12.0857 3.68395 12.0594 3.62043 12.0125 3.57355L10.9395 2.5Z"
                        fill="white"
                      />
                    </svg>
                    {trUN("video")}
                  </span>
                </div>
                {/* Arrow Left & Right */}
                {!showVideo && (
                  <div className="flex items-center ">
                    {language == "en" && (
                      <>
                        {/* prev */}
                        <span
                          onClick={handlePrev}
                          className="cursor-pointer overflow-hidden"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.3203 17.9209V6.08105C15.3202 5.56882 14.7002 5.30826 14.334 5.66504L9.1543 10.8447C8.51956 11.4795 8.51956 12.5127 9.1543 13.1475L14.334 18.3281C14.7 18.6937 15.3203 18.434 15.3203 17.9209Z"
                              fill="white"
                              stroke="white"
                            />
                          </svg>
                        </span>
                        {/* next */}
                        <span
                          onClick={handleNext}
                          className="cursor-pointer overflow-hidden"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.67969 17.9209V6.08105C8.67983 5.56882 9.29977 5.30826 9.66602 5.66504L14.8457 10.8447C15.4804 11.4795 15.4804 12.5127 14.8457 13.1475L9.66602 18.3281C9.30003 18.6937 8.67969 18.434 8.67969 17.9209Z"
                              fill="white"
                              stroke="white"
                            />
                          </svg>
                        </span>
                      </>
                    )}
                    {language == "ar" && (
                      <>
                        {/* next */}
                        <span onClick={handleNext} className="cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.67969 17.9209V6.08105C8.67983 5.56882 9.29977 5.30826 9.66602 5.66504L14.8457 10.8447C15.4804 11.4795 15.4804 12.5127 14.8457 13.1475L9.66602 18.3281C9.30003 18.6937 8.67969 18.434 8.67969 17.9209Z"
                              fill="white"
                              stroke="white"
                            />
                          </svg>
                        </span>
                        {/* prev */}
                        <span onClick={handlePrev} className="cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.3203 17.9209V6.08105C15.3202 5.56882 14.7002 5.30826 14.334 5.66504L9.1543 10.8447C8.51956 11.4795 8.51956 12.5127 9.1543 13.1475L14.334 18.3281C14.7 18.6937 15.3203 18.434 15.3203 17.9209Z"
                              fill="white"
                              stroke="white"
                            />
                          </svg>
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tabs Institute Details & Institute branches */}
            <div className="my-[10px]  mx-auto flex md:gap-4 items-center justify-between ">
              <div className="flex justify-center items-center w-auto relative before:absolute before:w-full before:h-[2.5px] before:bottom-0 before:bg-[#A5A5A5]">
                <span
                  onClick={() => {
                    setShowBranches(true);
                  }}
                  className={`text-sm line-clamp-1 text-nowrap flex justify-center items-center gap-1 md:p-3 py-3 cursor-pointer relative before:absolute  before:h-[3.5px] before:bg-[#F89A21] before:bottom-0 before:rounded-xl before:transition-all before:duration-200 before:ease-linear hover:before:w-[95%] hover:text-[#1B1B1B]
                  ${showBranches
                      ? "text-[#1B1B1B] before:w-[95%]"
                      : "text-[#A5A5A5] before:w-0"
                    }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.792 1.33203H5.20536C2.7787 1.33203 1.33203 2.7787 1.33203 5.20536V10.7854C1.33203 13.2187 2.7787 14.6654 5.20536 14.6654H10.7854C13.212 14.6654 14.6587 13.2187 14.6587 10.792V5.20536C14.6654 2.7787 13.2187 1.33203 10.792 1.33203ZM10.4987 10.4987H5.4987C5.22536 10.4987 4.9987 10.272 4.9987 9.9987C4.9987 9.72536 5.22536 9.4987 5.4987 9.4987H10.4987C10.772 9.4987 10.9987 9.72536 10.9987 9.9987C10.9987 10.272 10.772 10.4987 10.4987 10.4987ZM10.4987 6.4987H5.4987C5.22536 6.4987 4.9987 6.27203 4.9987 5.9987C4.9987 5.72536 5.22536 5.4987 5.4987 5.4987H10.4987C10.772 5.4987 10.9987 5.72536 10.9987 5.9987C10.9987 6.27203 10.772 6.4987 10.4987 6.4987Z"
                      fill={`${showBranches ? "#F89A21" : "#A5A5A5"}`}
                    />
                  </svg>
                  {trINS("instBransh")}
                </span>
                <span
                  onClick={() => {
                    setShowBranches(false);
                  }}
                  className={`text-sm line-clamp-1 text-nowrap flex justify-center items-center gap-1 p-3 cursor-pointer relative before:absolute  before:h-[3.5px] before:bg-[#F89A21] before:bottom-0 before:rounded-xl before:transition-all before:duration-200 before:ease-linear hover:before:w-[95%] hover:text-[#1B1B1B] 
                  ${!showBranches
                      ? "text-[#1B1B1B] before:w-[95%]"
                      : "text-[#A5A5A5] before:w-0"
                    }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5451 2H3.39177C2.0651 2 1.39844 2.67333 1.39844 4.01333V14.6667H4.99844V12.1667C4.99844 11.8933 5.2251 11.6667 5.49844 11.6667C5.77177 11.6667 5.99844 11.8867 5.99844 12.1667V14.6667H9.53177V4.01333C9.53177 2.67333 8.87177 2 7.5451 2ZM7.1651 8.5H3.8651C3.59177 8.5 3.3651 8.27333 3.3651 8C3.3651 7.72667 3.59177 7.5 3.8651 7.5H7.1651C7.43844 7.5 7.6651 7.72667 7.6651 8C7.6651 8.27333 7.43844 8.5 7.1651 8.5ZM7.1651 6H3.8651C3.59177 6 3.3651 5.77333 3.3651 5.5C3.3651 5.22667 3.59177 5 3.8651 5H7.1651C7.43844 5 7.6651 5.22667 7.6651 5.5C7.6651 5.77333 7.43844 6 7.1651 6Z"
                      fill="#A5A5A5"
                    />
                    <path
                      d="M15.3346 14.1661H13.8213V12.1661C14.4546 11.9594 14.9146 11.3661 14.9146 10.6661V9.33276C14.9146 8.45943 14.2013 7.74609 13.328 7.74609C12.4546 7.74609 11.7413 8.45943 11.7413 9.33276V10.6661C11.7413 11.3594 12.1946 11.9461 12.8146 12.1594V14.1661H0.667969C0.394635 14.1661 0.167969 14.3928 0.167969 14.6661C0.167969 14.9394 0.394635 15.1661 0.667969 15.1661H13.288C13.3013 15.1661 13.308 15.1728 13.3213 15.1728C13.3346 15.1728 13.3413 15.1661 13.3546 15.1661H15.3346C15.608 15.1661 15.8346 14.9394 15.8346 14.6661C15.8346 14.3928 15.608 14.1661 15.3346 14.1661Z"
                      fill="#A5A5A5"
                    />
                  </svg>

                  {INDE("schoolDetails")}
                </span>
              </div>
              <button
                onClick={coursesByBranchFn}
                className=" py-2 px-1 md:px-6 text-nowrap bg-[#F89A21] text-white rounded-md ms-1"
              >
                <span className="items-center gap-1 hidden md:flex text-[clamp(.9rem,1vw,3rem)]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1667 4.4462V15.3454C20.1667 16.2345 19.4425 17.0504 18.5533 17.1604L18.2692 17.197C16.7658 17.3987 14.6483 18.022 12.9433 18.737C12.3475 18.9845 11.6875 18.5354 11.6875 17.8845V5.1337C11.6875 4.79453 11.88 4.48286 12.1825 4.31786C13.86 3.41036 16.3992 2.6037 18.1225 2.45703H18.1775C19.2775 2.45703 20.1667 3.3462 20.1667 4.4462Z"
                      fill="white"
                    />
                    <path
                      d="M9.81755 4.31786C8.14005 3.41036 5.60089 2.6037 3.87755 2.45703H3.81339C2.71339 2.45703 1.82422 3.3462 1.82422 4.4462V15.3454C1.82422 16.2345 2.54839 17.0504 3.43755 17.1604L3.72172 17.197C5.22505 17.3987 7.34255 18.022 9.04755 18.737C9.64339 18.9845 10.3034 18.5354 10.3034 17.8845V5.1337C10.3034 4.78536 10.1201 4.48286 9.81755 4.31786ZM4.58339 7.09536H6.64589C7.02172 7.09536 7.33339 7.40703 7.33339 7.78286C7.33339 8.16786 7.02172 8.47036 6.64589 8.47036H4.58339C4.20755 8.47036 3.89589 8.16786 3.89589 7.78286C3.89589 7.40703 4.20755 7.09536 4.58339 7.09536ZM7.33339 11.2204H4.58339C4.20755 11.2204 3.89589 10.9179 3.89589 10.5329C3.89589 10.157 4.20755 9.84536 4.58339 9.84536H7.33339C7.70922 9.84536 8.02089 10.157 8.02089 10.5329C8.02089 10.9179 7.70922 11.2204 7.33339 11.2204Z"
                      fill="white"
                    />
                  </svg>
                  {INDE("View_all_school_courses")}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 md:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              </button>
            </div>

            <section className=" mx-auto py-6">
              {showBranches ? (
                <>
                  {/* Institute branches */}
                  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {branchesSchool.branches?.data?.map((branch: myBranch) => {
                      return (
                        <div
                          className="bg-white border border-[#EEEEEE] rounded-3xl p-3 xl:p-4 flex flex-col justify-between overflow-hidden"
                          key={branch.id}
                        >
                          {/* Header Card */}
                          <div className="flex items-center gap-5 ">
                            <div className="border border-[#EEEEEE] rounded-2xl w-auto aspect-square flex items-center justify-center relative px-3 py-4">
                              {branch.logo ? (
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                    }/${cleanPath(branch.logo)}`}
                                  alt={
                                    branch?.institute_name
                                      ? `${branch?.institute_name} logo`
                                      : "branch logo"
                                  }
                                  placeholder="blur"
                                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGBgAAAABAABJzQnCgAAAABJRU5ErkJggg=="
                                  width={130}
                                  height={130}
                                  style={{ borderRadius: "15px" }}
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
                              {branch.offer != 0 && (
                                <div
                                  className="bg-[#ECFDF3] text-xs absolute top-[8px]  text-[#085D3A] flex items-center gap-2 px-2 py-1 rounded-lg overflow-hidden">

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
                                  {UN("offerLabel", { percentage: branch.offer }) || `Offer ${branch.offer}% Discount`}
                                </div>
                              )}


                            </div>
                            <div className="flex flex-col gap-3">
                              <span className="flex items-center gap-1 py-[2px] text-[clamp(.7rem,1vw,3rem)]">
                                {branch?.country?.logo ? (
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                      }/${cleanPath(branch.country.logo)}`}
                                    alt={
                                      branch.country.name
                                        ? `${branch.country.name} logo`
                                        : "branch logo"
                                    }
                                    width={25}
                                    height={25}
                                    loading="lazy"
                                    style={{ borderRadius: "15px" }}
                                  />
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#FDB022"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#FDB022"
                                    className="size-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                                    />
                                  </svg>
                                )}
                                <p className="line-clamp-1">{branch?.country?.name} {" - "} {branch?.city_name}</p>
                              </span>
                              {/* rating */}
                              {/* <span className="flex items-center gap-1">
                                {branch.rating}
                                <span className="flex items-center">
                                  {[...Array(5)].map((_, index) => {
                                    const currentRate = index + 1;
                                    const isActive = branch.rating >= currentRate;
                                    return (
                                      <svg
                                        key={index}
                                        width="18"
                                        height="15"
                                        viewBox="0 0 30 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14.2613 0.576726C14.5346 -0.0803083 15.4654 -0.0803101 15.7387 0.576724L19.0444 8.52469C19.1596 8.80168 19.4201 8.99093 19.7191 9.01491L28.2996 9.7028C29.0089 9.75967 29.2966 10.6449 28.7561 11.1078L22.2187 16.7078C21.9909 16.903 21.8914 17.2092 21.961 17.501L23.9583 25.8741C24.1234 26.5663 23.3704 27.1134 22.7631 26.7425L15.417 22.2555C15.161 22.0991 14.839 22.0991 14.583 22.2555L7.2369 26.7425C6.62962 27.1134 5.87661 26.5663 6.04172 25.8741L8.03902 17.501C8.10862 17.2092 8.00913 16.903 7.78129 16.7078L1.24386 11.1078C0.703432 10.6449 0.991051 9.75967 1.70037 9.7028L10.2809 9.01491C10.5799 8.99093 10.8404 8.80168 10.9556 8.52469L14.2613 0.576726Z"
                                          fill={isActive ? "#FDB022" : "#F0F0F0"}
                                        />
                                      </svg>
                                    );
                                  })}
                                </span>
                              </span> */}
                              <span className="flex items-center gap-1 text-[clamp(.8rem,1vw,3rem)] text-nowrap">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 3.92969C15.3515 3.92969 18.5878 5.8975 20.8281 9.41797C21.2659 10.1052 21.4999 11.0391 21.5 11.998C21.5 12.9573 21.2661 13.8887 20.8291 14.5703L20.8281 14.5713C19.7039 16.335 18.3361 17.7078 16.8281 18.6436C15.3201 19.5693 13.6799 20.0596 12 20.0596C8.64787 20.0596 5.41172 18.1007 3.17188 14.5713L3.01758 14.3018C2.67958 13.65 2.50006 12.8327 2.5 11.9951C2.5 11.0376 2.73395 10.1055 3.17188 9.41797C4.29649 7.65362 5.66424 6.2795 7.17285 5.34375C8.68046 4.41861 10.3207 3.92969 12 3.92969ZM12 7.45996C9.48305 7.45996 7.45996 9.49466 7.45996 12C7.46013 14.5052 9.48316 16.54 12 16.54C14.5168 16.54 16.5399 14.5052 16.54 12C16.54 9.49466 14.5169 7.45996 12 7.45996Z"
                                    stroke="#F89A21"
                                  />
                                  <path
                                    d="M11.998 9.64062C13.2919 9.64062 14.3584 10.7071 14.3584 12.001C14.3582 13.2924 13.2941 14.3506 11.998 14.3506C10.7045 14.3504 9.64863 13.2945 9.64844 12.001C9.64844 10.6961 10.7055 9.64084 11.998 9.64062Z"
                                    stroke="#F89A21"
                                  />
                                </svg>
                                {branch.visites} {trCard("visites")}
                              </span>
                              {branch.recommend && (
                                <div
                                  className={`  text-xs   flex items-center gap-2   py-1 rounded-lg ${language === "ar" ? "right-0" : "left-0"
                                    } top-0`}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="#FBCC90"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.2 21.02L12 17.77L5.8 21.02L7 
  14.14L2 9.27L9.1 8.26L12 2Z" />
                                  </svg>

                                  {UN("recommendFilter") || "Recommended"}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* body Card */}
                          <hgroup className="text-zinc-900 my-4">
                            <h2 className="line-clamp-1 whitespace-nowrap text-ellipsis overflow-hidden text-base md:text-lg font-bold text-zinc-900">
                              {branch.institute_name} ({branch.city_name})
                            </h2>
                            <p className="text-sm md:text-base tracking-wide leading-6 text-zinc-900 line-clamp-2 ">
                              {branch.description}
                            </p>
                          </hgroup>
                          <div className="flex items-center justify-between px-0 py-4 border-t border-solid border-t-zinc-100">
                            <div className="flex gap-1 items-center text-[clamp(.7rem,1vw,3rem)] ">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21.6602 10.4385L20.6802 14.6185C19.8402 18.2285 18.1802 19.6885 15.0602 19.3885C14.5602 19.3485 14.0202 19.2585 13.4402 19.1185L11.7602 18.7185C7.59018 17.7285 6.30018 15.6685 7.28018 11.4885L8.26018 7.29854C8.46018 6.44854 8.70018 5.70854 9.00018 5.09854C10.1702 2.67854 12.1602 2.02854 15.5002 2.81854L17.1702 3.20854C21.3602 4.18854 22.6402 6.25854 21.6602 10.4385Z"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.0584 19.3916C14.4384 19.8116 13.6584 20.1616 12.7084 20.4716L11.1284 20.9916C7.15839 22.2716 5.06839 21.2016 3.77839 17.2316L2.49839 13.2816C1.21839 9.31156 2.27839 7.21156 6.24839 5.93156L7.82839 5.41156C8.23839 5.28156 8.62839 5.17156 8.99839 5.10156C8.69839 5.71156 8.45839 6.45156 8.25839 7.30156L7.27839 11.4916C6.29839 15.6716 7.58839 17.7316 11.7584 18.7216L13.4384 19.1216C14.0184 19.2616 14.5584 19.3516 15.0584 19.3916Z"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.6406 8.53125L17.4906 9.76125"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.6602 12.3984L14.5602 13.1384"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {branch.number_of_courses} {trCard("cardFoterIns2")}
                            </div>
                            <div className="flex gap-1 items-center text-[clamp(.7rem,1vw,3rem)] ">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.15859 10.87C9.05859 10.86 8.93859 10.86 8.82859 10.87C6.44859 10.79 4.55859 8.84 4.55859 6.44C4.55859 3.99 6.53859 2 8.99859 2C11.4486 2 13.4386 3.99 13.4386 6.44C13.4286 8.84 11.5386 10.79 9.15859 10.87Z"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16.4112 4C18.3512 4 19.9112 5.57 19.9112 7.5C19.9112 9.39 18.4113 10.93 16.5413 11C16.4613 10.99 16.3713 10.99 16.2812 11"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M4.15875 14.56C1.73875 16.18 1.73875 18.82 4.15875 20.43C6.90875 22.27 11.4188 22.27 14.1688 20.43C16.5888 18.81 16.5888 16.17 14.1688 14.56C11.4288 12.73 6.91875 12.73 4.15875 14.56Z"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14"
                                  stroke="#F89A21"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {branch.min_age} {trCard("cardFoterIns1")}
                            </div>
                          </div>
                          {/* Footer Card */}
                          <div className="flex items-center justify-between gap-3">
                            {loadingStates.get(branch.id) ? <Spinner /> :
                              <>
                                <Link
                                  href={`/${language}/language-schools/${languageSchool.id}/${branch.id}`}
                                  className="text-white bg-[#365D8D] text-[clamp(.8rem,1vw,4rem)] rounded-full px-1 py-2 md:px-4 md:py-3 text-nowrap flex justify-center items-center gap-2 w-full"
                                >
                                  {trCard("cardButtonins2")}
                                </Link>
                              </>
                            }
                          </div>
                        </div>
                      );
                    })}
                  </section>
                  {/* Pagination */}
                  {branchesSchool?.branches?.total >= 6 ? (
                    <section>
                      {pathname !== `/${language}` &&
                        branchesSchool.branches?.data?.length > 0 && (
                          <div className=" flex flex-col md:flex-row gap-5 justify-between items-center my-5 ">
                            <div>
                              <Pagination
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                disableNext={!hasMoreData}
                                numberOfPages={branchesSchool?.branches?.pages}
                              />
                            </div>

                            <div className="flex flex-row gap-2 items-center text-sm leading-none text-zinc-900">
                              <div className="self-stretch my-auto text-zinc-900 line-clamp-1 leading-6">
                                {UNi("pagination")}
                              </div>
                              <div>
                                <select
                                  name="limit"
                                  value={limit}
                                  onChange={(e: any) => {
                                    setLimit(e.target.value);
                                    dispatch(
                                      getAllBranches({
                                        locale,
                                        schoolsId: instituteId,
                                        page: currentPage,
                                        limit: e.target.value,
                                      })
                                    );
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
                        )}
                    </section>
                  ) : null}
                </>
              ) : (
                <>
                  {/* Institute Details*/}
                  <section>
                    <div className="pb-6">
                      <h2 className="font-bold mb-2 text-[clamp(0.75rem,1.56vw,3rem)] text-[#1B1B1B] p-1 relative before:absolute before:top-0 before:bottom-0 before:start-0 before:w-1 ps-3 before:bg-[#F89A21] ">
                        {trINS("instDesc")}
                      </h2>
                      <p className="text-[#333333] text-[0.50rem,1.04vw,2rem]  ">
                        {languageSchool?.description}
                      </p>
                    </div>
                    <div>
                      <h2 className="font-bold pb-2 text-[clamp(0.75rem,1.56vw,3rem)] text-[#1B1B1B] p-1 relative before:absolute before:top-0 before:bottom-0 before:start-0 before:w-1 ps-3 before:bg-[#F89A21]">
                        {trUN("importantPoints")}
                      </h2>
                      <ul className="list-disc ps-5">
                        {languageSchool?.main_points?.map(
                          (point: string, index: number) => {
                            return (
                              <li className="py-2 leading-6" key={index}>
                                {point}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </section>
                </>
              )}
            </section>

            {/* Drawer */}
            {isOpenDrawer && (
              <div
                onClick={() => setIsOpenDrawer(false)}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
              ></div>
            )}
            {/* Display Drawer */}
            <aside
              className={`fixed top-0 right-0 z-50 h-full w-[23rem] lg:w-[40rem] py-3 bg-white rounded-2xl overflow-y-scroll shadow-lg transform transition-transform duration-300 ${isOpenDrawer ? "tranOpenDrawer-x-0" : "translate-x-full"
                }`}
            >
              {/* Header */}
              <div className="px-5 py-4 flex justify-between items-center p-4 border-b border-gray ">
                <div className="flex gap-2 items-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1667 4.4462V15.3454C20.1667 16.2345 19.4425 17.0504 18.5533 17.1604L18.2692 17.197C16.7658 17.3987 14.6483 18.022 12.9433 18.737C12.3475 18.9845 11.6875 18.5354 11.6875 17.8845V5.1337C11.6875 4.79453 11.88 4.48286 12.1825 4.31786C13.86 3.41036 16.3992 2.6037 18.1225 2.45703H18.1775C19.2775 2.45703 20.1667 3.3462 20.1667 4.4462Z"
                      fill="#F89A21"
                    />
                    <path
                      d="M9.81755 4.31786C8.14005 3.41036 5.60089 2.6037 3.87755 2.45703H3.81339C2.71339 2.45703 1.82422 3.3462 1.82422 4.4462V15.3454C1.82422 16.2345 2.54839 17.0504 3.43755 17.1604L3.72172 17.197C5.22505 17.3987 7.34255 18.022 9.04755 18.737C9.64339 18.9845 10.3034 18.5354 10.3034 17.8845V5.1337C10.3034 4.78536 10.1201 4.48286 9.81755 4.31786ZM4.58339 7.09536H6.64589C7.02172 7.09536 7.33339 7.40703 7.33339 7.78286C7.33339 8.16786 7.02172 8.47036 6.64589 8.47036H4.58339C4.20755 8.47036 3.89589 8.16786 3.89589 7.78286C3.89589 7.40703 4.20755 7.09536 4.58339 7.09536ZM7.33339 11.2204H4.58339C4.20755 11.2204 3.89589 10.9179 3.89589 10.5329C3.89589 10.157 4.20755 9.84536 4.58339 9.84536H7.33339C7.70922 9.84536 8.02089 10.157 8.02089 10.5329C8.02089 10.9179 7.70922 11.2204 7.33339 11.2204Z"
                      fill="#F89A21"
                    />
                  </svg>
                  <h3>{trBr("BranchCourses")} </h3>
                </div>
                <button onClick={() => setIsOpenDrawer(false)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0002 10.8287L5.79975 15.0291C5.68447 15.1444 5.54725 15.2017 5.38808 15.201C5.22878 15.2001 5.0901 15.1407 4.97204 15.0226C4.85829 14.9046 4.80253 14.7683 4.80475 14.6139C4.80683 14.4596 4.86475 14.3256 4.9785 14.2118L9.17246 10.001L4.9785 5.79015C4.87003 5.68182 4.81447 5.54911 4.81183 5.39202C4.8092 5.23494 4.86475 5.09737 4.9785 4.97932C5.09225 4.86126 5.22739 4.8005 5.38392 4.79702C5.54045 4.79355 5.67906 4.85084 5.79975 4.9689L10.0002 9.17327L14.2045 4.9689C14.3172 4.85626 14.4531 4.80029 14.6123 4.80098C14.7716 4.80182 14.9116 4.86126 15.0323 4.97932C15.1434 5.09737 15.1978 5.23362 15.1956 5.38807C15.1935 5.54237 15.1356 5.6764 15.0218 5.79015L10.8279 10.001L15.0218 14.2118C15.1303 14.3201 15.1859 14.4529 15.1885 14.6099C15.1911 14.767 15.1356 14.9046 15.0218 15.0226C14.9081 15.1407 14.7729 15.2015 14.6164 15.2049C14.4599 15.2084 14.3226 15.1498 14.2045 15.0291L10.0002 10.8287Z"
                      fill="#A5A5A5"
                    />
                  </svg>
                </button>
              </div>
              {/* Body */}
              <div className="w-[95%] mx-auto ">
                <div className=" py-6 flex items-center justify-between">
                  <div className="font-semibold">{courses?.total} {trBr("Branches")}</div>
                  {/* <button className="flex items-center gap-1 bg-[#F89A21]/30 px-6 py-2 rounded-md">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4753 9.16797C13.0736 9.16797 11.1211 11.1205 11.1211 13.5221C11.1211 14.338 11.3503 15.108 11.7536 15.768C12.5053 17.033 13.8894 17.8763 15.4753 17.8763C17.0611 17.8763 18.4453 17.0238 19.1969 15.768C19.6003 15.1171 19.8294 14.338 19.8294 13.5221C19.8294 11.1205 17.8861 9.16797 15.4753 9.16797ZM17.1069 14.1913H16.1628V15.1721C16.1628 15.548 15.8511 15.8596 15.4753 15.8596C15.0994 15.8596 14.7878 15.548 14.7878 15.1721V14.1913H13.8528C13.4769 14.1913 13.1653 13.8796 13.1653 13.5038C13.1653 13.128 13.4769 12.8163 13.8528 12.8163H14.7878V11.918C14.7878 11.5421 15.0994 11.2305 15.4753 11.2305C15.8511 11.2305 16.1628 11.5421 16.1628 11.918V12.8163H17.1069C17.4828 12.8163 17.7944 13.128 17.7944 13.5038C17.7944 13.8796 17.4828 14.1913 17.1069 14.1913Z"
                      fill="#F89A21"
                    />
                    <path
                      d="M18.8667 3.6837V5.7187C18.8667 6.4612 18.4084 7.38703 17.9501 7.85453L17.7851 8.0012C17.6567 8.12036 17.4642 8.14786 17.2992 8.09286C17.1159 8.0287 16.9326 7.98286 16.7492 7.93703C16.3459 7.8362 15.9151 7.79036 15.4751 7.79036C12.3126 7.79036 9.74589 10.357 9.74589 13.5195C9.74589 14.5645 10.0301 15.5912 10.5709 16.4712C11.0292 17.2412 11.6709 17.8829 12.3676 18.3137C12.5784 18.4512 12.6609 18.7445 12.4776 18.9095C12.4134 18.9645 12.3492 19.0104 12.2851 19.0562L11.0017 19.8904C9.81005 20.6329 8.16922 19.7987 8.16922 18.3137V13.4095C8.16922 12.7587 7.80255 11.9245 7.43588 11.4662L3.96172 7.76286C3.50339 7.29536 3.13672 6.4612 3.13672 5.9112V3.77536C3.13672 2.6662 3.96172 1.83203 4.96089 1.83203H17.0426C18.0417 1.83203 18.8667 2.6662 18.8667 3.6837Z"
                      fill="#F89A21"
                      fillOpacity="0.5"
                    />
                  </svg>
                  {trBr("filter")}
                </button> */}
                </div>
                {loading && <Loader />}
                {courses && courses?.data?.map((coursesByCity: any, index: number) => {
                  return <div key={index} className="px-2">
                    {/* Heading */}
                    <div className="flex items-center justify-between gap-3" >
                      <h3 className="flex items-center gap-1">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.901 7.74714C17.9385 3.51214 14.2444 1.60547 10.9994 1.60547C10.9994 1.60547 10.9994 1.60547 10.9902 1.60547C7.75436 1.60547 4.05102 3.50297 3.08852 7.73797C2.01602 12.468 4.91269 16.4738 7.53436 18.9946C8.50602 19.9296 9.75269 20.3971 10.9994 20.3971C12.246 20.3971 13.4927 19.9296 14.4552 18.9946C17.0769 16.4738 19.9735 12.4771 18.901 7.74714ZM10.9994 12.3396C9.40436 12.3396 8.11186 11.0471 8.11186 9.45214C8.11186 7.85714 9.40436 6.56464 10.9994 6.56464C12.5944 6.56464 13.8869 7.85714 13.8869 9.45214C13.8869 11.0471 12.5944 12.3396 10.9994 12.3396Z"
                            fill="#F89A21"
                          />
                        </svg>
                        <span className="text-[clamp(.8rem,1.3vw,3rem)] line-clamp-1">{languageSchool?.name} ( {coursesByCity.city} )</span>
                      </h3>
                      <Link className="text-nowrap line-clamp-1" href={`/${language}/language-schools/${languageSchool.id}/${coursesByCity.id}`}>
                        {trBr("seeAll")}
                      </Link>
                    </div>
                    <Swiper modules={[SwiperPagination]}
                      spaceBetween={15}
                      pagination={{ clickable: true }}
                      slidesPerView={1}
                      breakpoints={{
                        1024: { slidesPerView: 2 }, // optional: desktop
                      }}>
                      {coursesByCity.courses?.map((course: any) => {
                        return <SwiperSlide key={course.id} >
                          {/* Card */}
                          <div className="mx-1 border border-[#eee] rounded-2xl shadow-sm px-3 py-6 my-4">
                            {/* Header Card */}
                            <div>
                              <h2 className="font-bold text-[clamp(.63rem,1.30vw,2.50rem)] line-clamp-1">
                                {course.name}
                              </h2>
                            </div>
                            {/* body Card */}
                            <div className="border-y border-[#eee] my-4 grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 ">
                              <div className="flex items-start gap-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 2.5C17.2339 2.5 21.5 6.76614 21.5 12C21.5 14.7526 20.3143 17.2313 18.4219 18.9717L18.0596 19.3047C18.0102 19.3456 17.9678 19.3792 17.96 19.3857C17.7949 19.5233 17.617 19.6542 17.4229 19.79L17.4189 19.793C17.3093 19.8713 17.3031 19.8826 17.2617 19.9062L17.249 19.9131L17.2373 19.9209C17.0488 20.0434 16.8797 20.1353 16.6621 20.2656C16.6167 20.2916 16.567 20.3231 16.54 20.3398C16.5072 20.3602 16.4856 20.3734 16.4668 20.3828L16.458 20.3867C16.2591 20.4909 16.0609 20.5862 15.8633 20.6709L15.8496 20.6758L15.8359 20.6826C15.7515 20.7248 15.6955 20.7524 15.6445 20.7715L15.6338 20.7764L15.623 20.7803C15.4282 20.8638 15.243 20.9164 14.9863 21.0098C14.8954 21.0357 14.8107 21.0663 14.748 21.0898C14.5489 21.1584 14.3477 21.1975 14.0791 21.2646V21.2656C14.025 21.2757 13.9796 21.2857 13.9531 21.293C13.9236 21.3011 13.9125 21.3038 13.9092 21.3047L13.8926 21.3076L13.875 21.3115C13.6174 21.3667 13.3556 21.4039 13.0781 21.4326L13.043 21.4365L13.0088 21.4453C12.9982 21.448 12.9912 21.4488 12.9854 21.4502L12.9648 21.4521C12.6453 21.4812 12.3209 21.5 12 21.5C11.6894 21.5 11.3755 21.4817 11.0557 21.4541C11.0195 21.4459 10.9678 21.4385 10.9102 21.4346L10.9111 21.4326C10.6338 21.4039 10.3727 21.3667 10.1152 21.3115L10.0938 21.3066L10.0723 21.3037L9.92773 21.2695L9.91895 21.2666L9.91113 21.2646C9.66971 21.2043 9.43906 21.1469 9.20996 21.0801L9.20117 21.0771L9.19141 21.0752L9.00586 21.0117L8.99414 21.0078L8.98145 21.0039L8.6709 20.8975C8.56722 20.8598 8.46333 20.8199 8.35938 20.7773L8.3457 20.7715L8.15332 20.6826L8.13672 20.6748L8.11914 20.667C8.01765 20.6255 7.91862 20.582 7.82227 20.5361L7.54102 20.3916C7.51336 20.3757 7.48272 20.3572 7.44727 20.3359C7.41083 20.3141 7.36855 20.2887 7.32812 20.2656L7.32031 20.2617L7.31152 20.2568C7.1187 20.1558 6.93578 20.0461 6.7627 19.9277H6.76172C6.72675 19.9029 6.69472 19.8799 6.66504 19.8594C6.63223 19.8367 6.60189 19.8155 6.57031 19.793H6.56934C6.36851 19.6451 6.19316 19.5215 6.03027 19.3857L6.00977 19.3691L5.9873 19.3535C5.95565 19.3324 5.9667 19.3347 5.86035 19.2461H5.85938C5.81532 19.2073 5.76906 19.1702 5.73047 19.1396V19.1211L5.56934 18.9727C3.68601 17.232 2.5 14.7528 2.5 12C2.5 6.76614 6.76614 2.5 12 2.5ZM12 3C7.03386 3 3 7.03386 3 12C3 14.4578 3.99667 16.6923 5.60449 18.3213L5.99609 18.7188L6.34863 18.2852C6.61911 17.9516 6.9414 17.6471 7.33496 17.3877L7.33691 17.3857C8.60312 16.5416 10.2944 16.1055 12.0078 16.1055C13.7212 16.1055 15.4058 16.5418 16.6611 17.3848L16.665 17.3877C17.0628 17.6499 17.392 17.9536 17.6465 18.2783L17.9971 18.7256L18.3955 18.3213C20.0033 16.6923 21 14.4578 21 12C21 7.03386 16.9661 3 12 3Z"
                                    fill="#F89A21"
                                    stroke="#F89A21"
                                  />
                                  <path
                                    d="M12 7.42969C13.7939 7.42969 15.25 8.88583 15.25 10.6797C15.24 12.4412 13.8621 13.8593 12.1123 13.9199H11.9639C10.12 13.8673 8.75 12.4345 8.75 10.6797C8.75 8.88583 10.2061 7.42969 12 7.42969Z"
                                    fill="#F89A21"
                                    stroke="#F89A21"
                                  />
                                </svg>
                                <h3>
                                  {trCoures("requiredLevel")}
                                  <p>{course.required_level}</p>
                                </h3>
                              </div>

                              <div className="flex items-start gap-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 2.5C17.2439 2.5 21.5 6.75614 21.5 12C21.5 17.2439 17.2439 21.5 12 21.5C6.75614 21.5 2.5 17.2439 2.5 12C2.5 6.75614 6.75614 2.5 12 2.5ZM12 6.03027C11.3139 6.03027 10.75 6.59413 10.75 7.28027V7.70996H7.00977C6.3325 7.71009 5.75977 8.25544 5.75977 8.9502C5.75987 9.63617 6.32379 10.2001 7.00977 10.2002H13.1309C12.5611 13.2133 10.0128 15.4697 7 15.4697C6.31395 15.4697 5.75015 16.0337 5.75 16.7197C5.75 17.4059 6.31386 17.9697 7 17.9697C9.03319 17.9697 10.8989 17.2421 12.3818 16.0391C13.6882 17.284 15.2859 17.9697 17 17.9697C17.6772 17.9697 18.2497 17.4251 18.25 16.7305C18.25 16.0443 17.6861 15.4805 17 15.4805C15.9656 15.4805 14.954 15.0539 14.0908 14.2227C14.8997 13.0567 15.4516 11.6893 15.6553 10.21H16.9902C17.6763 10.2098 18.2402 9.64602 18.2402 8.95996C18.2402 8.27391 17.6763 7.71009 16.9902 7.70996H14.6074L14.5 7.7002C14.4541 7.7002 14.4163 7.70551 14.3926 7.70996H13.25V7.28027C13.25 6.59413 12.6861 6.03027 12 6.03027Z"
                                    fill="#F89A21"
                                    stroke="#F89A21"
                                  />
                                </svg>

                                <h3>
                                  {trCoures("languageStudy")}
                                  <p>{course.languages}</p>
                                </h3>
                              </div>
                              <div className="flex items-start gap-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.53906 7.83789C3.63412 6.72879 3.9817 5.85166 4.57129 5.22559C5.1602 4.6004 6.03933 4.17404 7.2959 4.05762L7.75 4.01562V2C7.75 1.86622 7.86624 1.75013 8 1.75C8.13386 1.75 8.25 1.86614 8.25 2V4H15.75V2C15.75 1.86622 15.8662 1.75013 16 1.75C16.1339 1.75 16.25 1.86614 16.25 2V4.01562L16.7041 4.05762C17.9609 4.17399 18.8397 4.60034 19.4287 5.22559C20.0188 5.85204 20.3661 6.72971 20.4609 7.83984H3.54199C3.54119 7.83945 3.54011 7.83883 3.53906 7.83789Z"
                                    fill="#F89A21"
                                    stroke="#F89A21"
                                  />
                                  <path
                                    d="M4 10.3398H20C20.2739 10.3398 20.5 10.566 20.5 10.8398V17C20.5 18.4231 20.144 19.5325 19.4463 20.2842C18.7545 21.0291 17.6547 21.5 16 21.5H8C6.3453 21.5 5.24547 21.0291 4.55371 20.2842C3.85595 19.5325 3.50003 18.4231 3.5 17V10.8398C3.5 10.566 3.72614 10.3398 4 10.3398ZM9.07227 16.1182C8.70924 15.9669 8.29076 15.9669 7.92773 16.1182C7.7538 16.1906 7.59557 16.2915 7.45508 16.418L7.44043 16.4316L7.42676 16.4463C7.16492 16.7228 7 17.1038 7 17.5C7.00004 17.8963 7.16486 18.2772 7.42676 18.5537L7.44043 18.5684L7.45508 18.5811C7.59557 18.7075 7.7538 18.8094 7.92773 18.8818C8.09883 18.9531 8.29423 19 8.5 19C8.70577 19 8.90117 18.9531 9.07227 18.8818C9.2462 18.8094 9.40443 18.7075 9.54492 18.5811L9.55957 18.5684L9.57324 18.5537C9.83514 18.2772 9.99996 17.8963 10 17.5C10 17.1038 9.83508 16.7228 9.57324 16.4463L9.55957 16.4316L9.54492 16.418L9.43555 16.3281C9.32383 16.2431 9.20262 16.1725 9.07227 16.1182ZM9.07227 12.6182C8.70924 12.4669 8.29076 12.4669 7.92773 12.6182C7.7538 12.6906 7.59557 12.7915 7.45508 12.918L7.43555 12.9355L7.41797 12.9551C7.29154 13.0956 7.19063 13.2538 7.11816 13.4277C7.04692 13.5988 7 13.7943 7 14C7.00002 14.2058 7.04687 14.4012 7.11816 14.5723C7.19057 14.746 7.29169 14.9036 7.41797 15.0439L7.43555 15.0635L7.45508 15.0811C7.59557 15.2075 7.7538 15.3094 7.92773 15.3818C8.09883 15.4531 8.29423 15.5 8.5 15.5C8.70577 15.5 8.90117 15.4531 9.07227 15.3818C9.2462 15.3094 9.40443 15.2075 9.54492 15.0811L9.56445 15.0635L9.58203 15.0439C9.70831 14.9036 9.80943 14.746 9.88184 14.5723C9.95313 14.4012 9.99998 14.2058 10 14C10 13.7943 9.95308 13.5988 9.88184 13.4277C9.80937 13.2538 9.70846 13.0956 9.58203 12.9551L9.56445 12.9355L9.54492 12.918L9.43555 12.8281C9.32383 12.7431 9.20262 12.6725 9.07227 12.6182ZM12.5713 12.6182C12.2496 12.4758 11.8851 12.4592 11.5537 12.5693L11.4277 12.6182C11.2538 12.6906 11.0956 12.7915 10.9551 12.918L10.9404 12.9316L10.9268 12.9463C10.6649 13.2228 10.5 13.6038 10.5 14C10.5 14.3962 10.6649 14.7772 10.9268 15.0537L10.9404 15.0684L10.9551 15.0811C11.0956 15.2075 11.2538 15.3094 11.4277 15.3818C11.5988 15.4531 11.7942 15.5 12 15.5C12.2058 15.5 12.4012 15.4531 12.5723 15.3818C12.7462 15.3094 12.9044 15.2075 13.0449 15.0811L13.0596 15.0684L13.0732 15.0537C13.3351 14.7772 13.5 14.3962 13.5 14C13.5 13.6038 13.3351 13.2228 13.0732 12.9463L13.0596 12.9316L13.0449 12.918L12.9355 12.8281C12.8281 12.7463 12.7117 12.6784 12.5869 12.625H12.5879C12.5856 12.624 12.5833 12.6231 12.5811 12.6221C12.5781 12.6208 12.5752 12.6194 12.5723 12.6182H12.5713Z"
                                    fill="#F89A21"
                                    stroke="#F89A21"
                                  />
                                </svg>
                                <h3>
                                  {trCoures("CourseDuration2")}
                                  <p>{course.course_duration}</p>
                                </h3>
                              </div>
                              <div className="flex items-start gap-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7 4H17C18.4234 4 19.5335 4.35572 20.2852 5.05371C21.0301 5.74547 21.5 6.84538 21.5 8.5V15.5C21.5 17.1546 21.0301 18.2545 20.2852 18.9463C19.5335 19.6443 18.4234 20 17 20H7C5.57665 20 4.46652 19.6443 3.71484 18.9463C2.96994 18.2545 2.5 17.1546 2.5 15.5V8.5C2.5 6.84538 2.96994 5.74547 3.71484 5.05371C4.46652 4.35572 5.57665 4 7 4ZM5 15.75C4.31386 15.75 3.75 16.3139 3.75 17C3.75 17.6861 4.31386 18.25 5 18.25H8C8.68614 18.25 9.25 17.6861 9.25 17C9.25 16.3139 8.68614 15.75 8 15.75H5ZM12 8.5C10.0639 8.5 8.5 10.0639 8.5 12C8.5 13.9361 10.0639 15.5 12 15.5C13.9361 15.5 15.5 13.9361 15.5 12C15.5 10.0639 13.9361 8.5 12 8.5ZM16 5.75C15.3139 5.75 14.75 6.31386 14.75 7C14.75 7.68614 15.3139 8.25 16 8.25H19C19.6861 8.25 20.25 7.68614 20.25 7C20.25 6.31386 19.6861 5.75 19 5.75H16Z"
                                    fill="#F89A21"
                                    stroke="#F89A21"
                                  />
                                </svg>
                                <h3>
                                  {trCoures("numberStudents")}
                                  <p>{course.max_no_of_students}</p>
                                </h3>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center gap-2">
                              {loadingStates.get(course.id) ? <Spinner /> : <>
                                <Link
                                  href={`/${language}/language-schools/${languageSchool.id}/${coursesByCity.id}`}
                                  onClick={() => selectCourse(course.id)}
                                  className="bg-[#365D8D] text-white text-center py-3 rounded-full w-full">
                                  {trBr("SelectCourse")}
                                </Link>
                                <button
                                  className="flex  justify-center items-center px-4 py-0 w-14 h-14 border border-[#F89A21] rounded-full cursor-pointer"
                                  onClick={() => {
                                    if (user.id && tokenMainSite) {
                                      course.is_favorite ? unFavCourseFn(course.id) : addFavCourseFn(course.id)
                                    } else {
                                      toast.error(INDE("messageError"))
                                    }
                                  }}>
                                  {course.is_favorite ?
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.4404 3.59961C19.2317 3.59984 21.4999 5.87347 21.5 8.68945C21.5 9.6831 21.3616 10.61 21.1162 11.4775L21.0039 11.8457L21.0029 11.8486C20.2487 14.2353 18.7033 16.1591 17.0352 17.5928C15.5737 18.8488 14.0403 19.7102 12.915 20.166L12.459 20.3359L12.4531 20.3379C12.3532 20.3731 12.189 20.3994 12 20.3994C11.858 20.3994 11.7301 20.3846 11.6328 20.3623L11.5469 20.3379L11.541 20.3359L11.085 20.166C9.9597 19.7102 8.42634 18.8488 6.96484 17.5928C5.40096 16.2487 3.94481 14.4742 3.14746 12.291L2.99707 11.8486L2.99609 11.8457L2.88379 11.4775C2.63838 10.61 2.5 9.68311 2.5 8.68945C2.50008 5.87347 4.76829 3.59984 7.55957 3.59961C9.20459 3.59961 10.6795 4.3992 11.5996 5.62891L12 6.16406L12.4004 5.62891C13.3205 4.3992 14.7954 3.59961 16.4404 3.59961Z"
                                        fill="#F89A21"
                                        stroke="#F89A21"
                                      />
                                    </svg>
                                    :
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12.62 20.8096C12.28 20.9296 11.72 20.9296 11.38 20.8096C8.48 19.8196 2 15.6896 2 8.68961C2 5.59961 4.49 3.09961 7.56 3.09961C9.38 3.09961 10.99 3.97961 12 5.33961C13.01 3.97961 14.63 3.09961 16.44 3.09961C19.51 3.09961 22 5.59961 22 8.68961C22 15.6896 15.52 19.8196 12.62 20.8096Z"
                                        stroke="#F89A21"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  }
                                </button>
                              </>
                              }
                            </div>
                          </div>
                        </SwiperSlide>
                      })}
                    </Swiper>

                  </div>
                })}
                {/* {courses} */}
                {courses?.data?.length > 0 ? (
                  <div className=" flex flex-col md:flex-row gap-5 justify-between items-center my-5 ">
                    <div>
                      <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        disableNext={!hasMoreData}
                        numberOfPages={courses?.pages}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 items-center text-sm leading-none text-zinc-900">
                      <div className="self-stretch my-auto text-zinc-900 line-clamp-1 leading-6">
                        {UNi("pagination")}
                      </div>
                      <div>
                        <select
                          name="limit"
                          value={limit}
                          onChange={(e: any) => {
                            setLimit(e.target.value);
                            dispatch(fetchCoursesByBranch({
                              language: language,
                              instituteID: instituteId,
                              tokenMainSite,
                              page: currentPage,
                              limit: e.target.value
                            }))
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
                  </div>) : null}

              </div>
            </aside>
          </section>

        </>
      ) : languageSchool?.error?.statusCode === 500 ? (
        <ResultNotFound />
      ) : (
        <Loader />
      )
      }
    </main >
  );
}

export default InstituteDetails;
