"use client";
import AvailableOffices from "@/app/_components/AvailableOffices";
import BannerSection from "@/app/_components/BannerSection";
import HeadTittle from "@/app/_components/HeadTittle";
import Loader from "@/app/_components/Loader";
import Pagination from "@/app/_components/Pagination";
import Poppup from "@/app/_components/Poppup";
import ResultNotFound from "@/app/_components/ResultNotFound";
import Spinner from "@/app/_components/Spinner";
import useCleanPath from "@/app/_hooks/useCleanPath";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { getTotalPriceUNI } from "@/app/reduxTool-kit/slices/calcTotalPriceUNISlice";
import { getProgram } from "@/app/reduxTool-kit/slices/programSlice";
import { getAllPrograms } from "@/app/reduxTool-kit/slices/programsSlice";
import { getUniversity } from "@/app/reduxTool-kit/slices/universitySlice";
import { getUser } from "@/app/reduxTool-kit/slices/userSlice";
import { AppDispatch } from "@/app/store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { currencies } from "../../../_lib/currencies";

const FillStar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.10404 0.999957C6.24269 0.722666 6.46606 0.584019 6.77416 0.584019C7.08226 0.584019 7.30564 0.722666 7.44428 0.999957L8.94628 4.05017L12.32 4.55853C12.6281 4.58934 12.8284 4.7511 12.9208 5.04379C13.0132 5.33649 12.9516 5.59067 12.7359 5.80635L10.2865 8.18643L10.8642 11.5601C10.9104 11.8528 10.8103 12.0878 10.5638 12.2649C10.3173 12.4421 10.0632 12.4613 9.80126 12.3227L6.77416 10.7514L3.74706 12.3227C3.48518 12.4768 3.23099 12.4613 2.98451 12.2765C2.73803 12.0916 2.6379 11.8528 2.68411 11.5601L3.2618 8.18643L0.812392 5.80635C0.596721 5.59067 0.535101 5.33649 0.627531 5.04379C0.719962 4.7511 0.920228 4.58934 1.22833 4.55853L4.60205 4.05017L6.10404 0.999957Z"
      fill="#FFCC00"
    />
  </svg>
);
const SolidStar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.2106 4.55853C12.5187 4.58934 12.719 4.7511 12.8114 5.04379C12.9039 5.33649 12.8422 5.59067 12.6266 5.80635L10.1771 8.18643L10.7548 11.5601C10.8011 11.8528 10.7009 12.0878 10.4544 12.2649C10.208 12.4421 9.95378 12.4613 9.69189 12.3227L6.66479 10.7514L3.63769 12.3227C3.3758 12.4768 3.12162 12.4613 2.87514 12.2765C2.62865 12.0916 2.52852 11.8528 2.57474 11.5601L3.15243 8.18643L0.703017 5.80635C0.487346 5.59067 0.425726 5.33649 0.518156 5.04379C0.610587 4.7511 0.810853 4.58934 1.11895 4.55853L4.49267 4.05017L5.99467 0.999957C6.13331 0.722666 6.35669 0.584019 6.66479 0.584019C6.97289 0.584019 7.19626 0.722666 7.33491 0.999957L8.83691 4.05017L12.2106 4.55853ZM8.99866 7.7936L11.3094 5.52905L8.09746 5.0669L6.66479 2.15534L5.23211 5.0669L2.02015 5.52905L4.33092 7.7936L3.79944 11.0056L6.66479 9.48046L9.53014 11.0056L8.99866 7.7936Z"
      fill="#FFCC00"
    />
  </svg>
);

interface Data {
  academic_degrees: any[];
  majorsAndFields: any;
  language: any[];
}
interface PopPupData {
  title: string;
  prev: string;
  url: string;
  urlTwo: string;
  button: string;
}

interface programData {
  bank_statement: null;
  end_date: string;
  field: string;
  field_id: number;
  gpa: string;
  id: number;
  ilts: number;
  is_price_updated: true;
  major: string;
  major_id: number;
  price: number;
  price_period: number;
  program_periodic_notes: [];
  program_translations: {
    academic_degree: string;
    attendance_method: string;
    course_duration: string;
    course_language: string;
    id: number;
    languageCode: string;
    name: string;
    notes: [];
    price_period_type: string;
    program_id: number;
    startStudy: ["Oct"];
  };
  recommend: true;
  start_date: string;
  status: string;
  toefl: number;
  university: {
    city: string;
    country: string;
    description: string;
    name: string;
    state: string;
  };
  university_id: 0;
}

function UniversityDetails() {
  const { cleanPath } = useCleanPath();
  const params = useParams();
  const { locale, universityId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const language = useCurrentLang();
  const { tokenMainSite } = parseCookies();
  const e = useTranslations("institutesCard");
  const t = useTranslations("ProgramDetails");
  const u = useTranslations("Universities");
  const d = useTranslations("UniversityDetails");
  const p = useTranslations("programs");
  const a = useTranslations("Poppup");

  const university = useSelector((state: any) => state.university);
  const totalPriceUNI = useSelector((state: any) => state.totalPriceUNI);
  const programInfo = useSelector((state: any) => state.program);
  const user = useSelector((state: any) => state.displayUser);
  const userData = useSelector((state: any) => state.user);
  const programs = useSelector((state: any) => state.programs);
  const images = university.files || [];

  const [showVideo, setShowVideo] = useState(false);
  const [fillData, setFillData] = useState(false);

  const [activeButton, setActiveButton] = useState<string>("program");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [convertTotalPrice, setConvertTotalPrice] = useState<
    Record<string, any>
  >({});
  const [data, setData] = useState<Data | null>(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStates, setLoadingStates] = useState(
    new Map<number, boolean>()
  );
  const [program, setProgram] = useState<programData>(programInfo);
  const [limit, setLimit] = useState<number>(10);
  const [showPopPup, setShowPopPup] = useState(true);
  const [objPopPup, setObjPopPup] = useState<PopPupData>({
    title: "",
    url: "",
    urlTwo: "",
    button: "",
    prev: "",
  });

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCreateQuote = async () => {
    if (!agreed) {
      setError(true);
    } else {
      const order = {
        userId: user.id,
        universityId: universityId,
        programId: programInfo?.id,
        totalPriceUNI: totalPriceUNI?.totalPriceWithTransferFees,
        convertedPrice: convertTotalPrice?.convertedAmount
          ? `${convertTotalPrice?.convertedAmount} ${selectedCurrency}`
          : "",
        totalEduxaFee: Math.ceil(totalPriceUNI?.totalEduxaFee).toString(),
        transferFees: Math.ceil(totalPriceUNI?.transferFees).toString(),
      };
      localStorage.setItem("orderUNI", JSON.stringify(order));
      setError(false);
      setOpenPopup(true);
    }
  };

  const changeCurrency = async (value: string) => {
    setSelectedCurrency(value);
    // setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/currency/convert?amount=${totalPriceUNI.totalPriceWithTransferFees
        }&fromCurrency=${totalPriceUNI?.currency?.toLowerCase()}&toCurrency=${value.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      setConvertTotalPrice(result);
    } catch (error) {
      console.error(error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: any) => {
    if (hasMoreData && newPage !== currentPage) {
      setCurrentPage(newPage);
      dispatch(
        getAllPrograms({
          page: newPage,
          language,
          limt: limit,
          academic_degree: selectedDegree,
          universityId: universityId,
        })
      );
      window.scrollTo({
        top: 200,
        left: 100,
        behavior: "smooth",
      });
    }
  };

  const getProgramData = async (programId: number) => {
    setLoadingStates((prev) => new Map(prev).set(programId, true));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/programs/${programId}`,
        {
          method: "GET",
          headers: {
            "Accept-Language": language,
          },
        }
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }
      const result = await res.json();
      setProgram(result);
      dispatch(getProgram({ programId: programId, locale: language }));

      window.scrollTo({
        top: 600,
        left: 100,
        behavior: "smooth",
      });
      dispatch(
        getTotalPriceUNI({
          programId: +programId,
          universityId: +university.id,
          locale: language,
        })
      );
      setFillData(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(programId, false));
    }
  };

  const favorite = async (programId: number) => {
    // setIsLoadingData(true);
    setLoadingStates((prev) => new Map(prev).set(programId, true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/program`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
            Authorization: `Bearer ${tokenMainSite}`,
          },
          body: JSON.stringify({
            programId: programId,
            userId: user.id,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        // setIsLoadingData(false);
        throw new Error(result.message);
      }

      const result = await response.json();
      // setIsLoadingData(false);
      // console.log(result);
      dispatch(
        getAllPrograms({
          language,
          limt: limit,
          universityId: universityId,

          academic_degree: selectedDegree,
          userId: user.id,
        })
      );
      toast.success(p("addSubscribe"));
      // router.push(`/${window.location.pathname.slice(1, 3)}/verify-password`);
    } catch (error: any) {
      toast.error(error.message);
      // setIsLoadingData(false);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(programId, false));
    }
  };

  const unFavorite = async (programId: number) => {
    setLoadingStates((prev) => new Map(prev).set(programId, true));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/program`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
            Authorization: `Bearer ${tokenMainSite}`,
          },
          body: JSON.stringify({
            programId: programId,
            userId: user.id,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        // setIsLoadingData(false);
        throw new Error(result.message);
      }

      const result = await response.json();
      // setIsLoadingData(false);
      // console.log(result);
      dispatch(
        getAllPrograms({
          language,
          limt: limit,
          universityId: universityId,
          academic_degree: selectedDegree,
          userId: user.id,
        })
      );
      toast.success(p("removeSubscribe"));
      // router.push(`/${window.location.pathname.slice(1, 3)}/verify-password`);
    } catch (error: any) {
      toast.error(error.message);
      // setIsLoadingData(false);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(programId, false));
    }
  };

  const handleDegreeClick = (academicDegree: any) => {
    setSelectedDegree(academicDegree);
    setCurrentPage(1);
    dispatch(
      getAllPrograms({
        language,
        limt: limit,
        academic_degree: academicDegree,
        universityId: universityId,
      })
    );
  };

  const getFilterData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/programs/${universityId}/filters`,
        {
          method: "GET",
          headers: {
            "Accept-Language": `${language}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("idddddd", result)
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [university.id, language]);

  const handleClose = () => {
    setOpenPopup(false);
  };

  useEffect(() => {
    if (!data) {
      getFilterData();
    }
  }, [getFilterData, data]);

  useEffect(() => {
    dispatch(
      getAllPrograms({
        page: currentPage,
        language,
        limt: limit,
        universityId: universityId,
        academic_degree: selectedDegree,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getUniversity(params));
    if (tokenMainSite) {
      dispatch(getUser({ tokenMainSite, locale }));
    }

    setProgram((prev: any) => ({ ...prev, university_id: undefined }));
    // dispatch(displayUser({ tokenMainSite, locale }));
  }, [params, dispatch]);

  return (
    <>
      {!showPopPup && (
        <div className="bg-gray opacity-1">
          <Poppup
            obj={objPopPup}
            onClose={() => {
              // window.scrollTo({
              //     top: 0,
              //     left: 0,
              //     behavior: 'smooth'
              // });
              setShowPopPup(true);
            }}
          />
        </div>
      )}
      <>
        {university.id ? (
          <div className="">
            <BannerSection
              head={u("uniButton")}
              breadcrumb={u("uniButton")}
              urlImage="/images/bannerUNI.png"
            />

            <HeadTittle
              head={u("uniButton")}
              headLine={university?.name}
              summary={university?.description}
            />

            <div className="flex gap-2 pt-2 text-sm tracking-wide text-zinc-900 px-5 lg:px-10 xl:px-32 justify-start bg-neutral-50">
              <div className="flex gap-1.5 items-center pe-2 border-e border-solid border-e-zinc-100">
                <div className="h-[20px] w-[20px] relative">
                  <Image
                    src={
                      !university?.country?.logo
                        ? "/images/university.png"
                        : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                        }/${cleanPath(university?.country?.logo)}`
                    }
                    fill={true}
                    alt={university?.country?.name}
                    className="object-contain rounded-lg size-full"
                  />
                </div>
                <div className="self-stretch my-auto text-zinc-900">
                  {university?.country?.name}
                </div>
              </div>
              {/* rating */}
              {/* <div className="flex gap-1 items-center pe-2 border-e border-solid border-e-zinc-100">
                <div className="self-stretch my-auto text-zinc-900 ">
                  {university?.rating}
                </div>
                <div className="flex gap-[2px]">
                  {Array.from({ length: 5 }, (_, index) =>
                    index < university.rating ? (
                      <FillStar key={index} />
                    ) : (
                      <SolidStar key={index} />
                    )
                  )}
                </div>
              </div> */}
              <div className="flex gap-1.5 items-center tracking-normal leading-7 text-slate-900">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0642 3.92969C15.311 3.92969 18.4496 5.77658 20.6794 9.09277L20.8923 9.41797C21.3301 10.1052 21.5641 11.0391 21.5642 11.998C21.5642 12.8373 21.385 13.6549 21.0476 14.3027L20.8933 14.5703L20.8923 14.5713C19.7681 16.335 18.4003 17.7078 16.8923 18.6436C15.3843 19.5693 13.7441 20.0596 12.0642 20.0596C8.81688 20.0596 5.67829 18.222 3.44897 14.8984L3.23608 14.5713L3.08179 14.3018C2.74379 13.65 2.56427 12.8327 2.56421 11.9951C2.56421 11.1573 2.7437 10.3394 3.08179 9.6875L3.23608 9.41797C4.36073 7.65357 5.72938 6.28048 7.23804 5.34473L7.23706 5.34375C8.74467 4.41861 10.3849 3.92969 12.0642 3.92969ZM12.0642 7.45996C9.54726 7.45996 7.52417 9.49466 7.52417 12C7.52434 14.5052 9.54737 16.54 12.0642 16.54C14.5811 16.54 16.6041 14.5052 16.6042 12C16.6042 9.49466 14.5812 7.45996 12.0642 7.45996Z"
                    fill="#F89A21"
                    stroke="#F89A21"
                  />
                  <path
                    d="M12.0637 9.64062C13.3576 9.64062 14.4241 10.7071 14.4241 12.001C14.4239 13.2924 13.3597 14.3506 12.0637 14.3506C10.7702 14.3504 9.7143 13.2945 9.71411 12.001C9.71411 10.6961 10.7712 9.64084 12.0637 9.64062Z"
                    stroke="#F89A21"
                  />
                </svg>
                <div className="self-stretch my-auto">
                  {university?.visites} {u("views")}
                </div>
              </div>
            </div>
            {/* ****** */}
            <div className="self-center pt-6 w-full px-5 lg:px-10 xl:px-32 bg-neutral-50">
              <div className="flex gap-5 max-md:flex-col">
                {/* Aside */}
                <aside className="flex flex-col w-[40%] max-md:w-full">
                  {fillData ? (
                    <div className="flex overflow-hidden gap-2 items-center p-6 w-full bg-white rounded-3xl border border-solid border-zinc-100 max-md:px-5 max-md:mt-6">
                      <div className="flex flex-col self-stretch my-auto w-full">
                        <div className="flex gap-5 justify-between py-1 w-full font-bold border-b border-solid border-b-zinc-100">
                          <div className="text-2xl text-zinc-900">
                            {d("totalReservation")}
                          </div>
                          {/* <div className="self-start text-lg tracking-wide text-right text-amber-500">
                            {totalPriceUNI.totalPriceWithTransferFees}{" "}
                            {totalPriceUNI?.currency}
                          </div> */}
                        </div>
                        <div className="flex flex-col pb-4 mt-6 w-full tracking-wide border-b border-solid border-b-zinc-100">
                          <div className="flex flex-col w-full text-base">
                            <div className="font-bold text-zinc-900">
                              {d("program")}
                            </div>
                            <div className="flex overflow-hidden flex-col justify-center items-start px-4 py-4 mt-2 w-full border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] text-neutral-400 max-md:pr-5">
                              <div className="flex gap-2.5 items-center">
                                
                                <div className="self-stretch my-auto text-black font-bold">
                                  {program?.program_translations?.name}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col mt-4 w-full text-zinc-900">
                            <div className="flex flex-col justify-center pb-3 w-full text-lg font-medium border-b border-solid border-b-zinc-100">
                              <div className="overflow-hidden px-3.5 py-0.5 border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-zinc-900 max-md:pe-5">
                                {d("programDetails")}
                              </div>
                            </div>
                            <div className="flex flex-col items-start mt-3.5 w-full text-sm max-md:pr-5">
                              <div className="flex gap-10 w-full">
                                <div className="flex flex-1 gap-3 items-center">
                                  <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.1667 2.37398V1.33398C11.1667 1.06065 10.94 0.833984 10.6667 0.833984C10.3933 0.833984 10.1667 1.06065 10.1667 1.33398V2.33398H5.83332V1.33398C5.83332 1.06065 5.60666 0.833984 5.33332 0.833984C5.05999 0.833984 4.83332 1.06065 4.83332 1.33398V2.37398C3.03332 2.54065 2.15999 3.61398 2.02666 5.20732C2.01332 5.40065 2.17332 5.56065 2.35999 5.56065H13.64C13.8333 5.56065 13.9933 5.39398 13.9733 5.20732C13.84 3.61398 12.9667 2.54065 11.1667 2.37398Z"
                                        fill="#666666"
                                      />
                                      <path
                                        d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z"
                                        fill="#666666"
                                      />
                                    </svg>
                                  </div>
                                  <div className="self-stretch my-auto text-zinc-900">
                                    {d("start")} :{" "}
                                    {program.start_date
                                      ? new Date(
                                        program.start_date
                                      ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                      })
                                      : d("drawer7")}
                                  </div>
                                </div>
                                <div className="flex flex-1 gap-3 items-center">
                                  <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.1667 2.37398V1.33398C11.1667 1.06065 10.94 0.833984 10.6667 0.833984C10.3933 0.833984 10.1667 1.06065 10.1667 1.33398V2.33398H5.83332V1.33398C5.83332 1.06065 5.60666 0.833984 5.33332 0.833984C5.05999 0.833984 4.83332 1.06065 4.83332 1.33398V2.37398C3.03332 2.54065 2.15999 3.61398 2.02666 5.20732C2.01332 5.40065 2.17332 5.56065 2.35999 5.56065H13.64C13.8333 5.56065 13.9933 5.39398 13.9733 5.20732C13.84 3.61398 12.9667 2.54065 11.1667 2.37398Z"
                                        fill="#666666"
                                      />
                                      <path
                                        d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z"
                                        fill="#666666"
                                      />
                                    </svg>
                                  </div>
                                  <div className="self-stretch my-auto text-zinc-900">
                                    {d("end")} :{" "}
                                    {program.start_date
                                      ? new Date(
                                        program.end_date
                                      ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                      })
                                      : d("drawer7")}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3 items-center mt-4">
                                <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.99992 1.33398C4.32659 1.33398 1.33325 4.32732 1.33325 8.00065C1.33325 11.674 4.32659 14.6673 7.99992 14.6673C11.6733 14.6673 14.6666 11.674 14.6666 8.00065C14.6666 4.32732 11.6733 1.33398 7.99992 1.33398ZM7.49992 5.33398C7.49992 5.06065 7.72659 4.83398 7.99992 4.83398C8.27325 4.83398 8.49992 5.06065 8.49992 5.33398V8.66732C8.49992 8.94065 8.27325 9.16732 7.99992 9.16732C7.72659 9.16732 7.49992 8.94065 7.49992 8.66732V5.33398ZM8.61325 10.9207C8.57992 11.0073 8.53325 11.074 8.47325 11.1407C8.40659 11.2007 8.33325 11.2473 8.25325 11.2807C8.17325 11.314 8.08659 11.334 7.99992 11.334C7.91325 11.334 7.82659 11.314 7.74659 11.2807C7.66659 11.2473 7.59325 11.2007 7.52659 11.1407C7.46659 11.074 7.41992 11.0073 7.38659 10.9207C7.35325 10.8407 7.33325 10.754 7.33325 10.6673C7.33325 10.5807 7.35325 10.494 7.38659 10.414C7.41992 10.334 7.46659 10.2607 7.52659 10.194C7.59325 10.134 7.66659 10.0873 7.74659 10.054C7.90659 9.98732 8.09325 9.98732 8.25325 10.054C8.33325 10.0873 8.40659 10.134 8.47325 10.194C8.53325 10.2607 8.57992 10.334 8.61325 10.414C8.64659 10.494 8.66659 10.5807 8.66659 10.6673C8.66659 10.754 8.64659 10.8407 8.61325 10.9207Z"
                                      fill="#666666"
                                    />
                                  </svg>
                                </div>
                                <div className="self-stretch my-auto text-zinc-900">
                                  {d("startStudy")} :{" "}
                                  {program?.program_translations?.startStudy?.join(
                                    ","
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="flex flex-col mt-4 w-full text-base relative">
                            <div className="font-bold text-zinc-900">
                              {d("choose")}
                            </div>
                            <select
                              id="options"
                              required
                              value={
                                selectedCurrency || totalPriceUNI?.currency
                              }
                              onChange={(eve: any) =>
                                changeCurrency(eve.target.value)
                              }
                              className="w-full mt-2 text-black font-bold focus:outline-none border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] text-ellipsis px-4 py-3 pr-10 appearance-none"
                            >
                              <option value="" disabled>
                                {d("chooseBtn")}
                              </option>
                              {currencies?.map(
                                (currency: any, index: number) => (
                                  <option key={index} value={currency?.name}>
                                    {currency?.name} ({currency.symbol})
                                  </option>
                                )
                              )}
                            </select>
                            <div className="absolute top-2/3 right-4 -translate-y-1/2 pointer-events-none">
                              <svg
                                width="18"
                                height="10"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.08032 0.679688H12.9202C13.4324 0.679828 13.693 1.29977 13.3362 1.66602L8.15649 6.8457C7.52176 7.48044 6.4885 7.48044 5.85376 6.8457L0.673096 1.66602C0.307571 1.30003 0.567217 0.679688 1.08032 0.679688Z"
                                  fill="#666666"
                                  stroke="white"
                                />
                              </svg>
                            </div>
                          </div> */}
                        </div>
                        <div className="flex flex-col mt-6 w-full tracking-wide text-zinc-900">
                          <div className="flex flex-col justify-end items-start pb-3 w-full text-lg font-medium border-b border-solid border-b-zinc-100">
                            <div className="overflow-hidden px-3.5 py-0.5   border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
                              {" "}
                              {d("priceDetails")}
                            </div>
                          </div>
                          <div className="flex flex-col mt-3.5 w-full text-base">
                            <div className="flex gap-10 justify-between items-center w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900 line-through decoration">
                                {d("eduxaFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900 line-through decoration">
                                {totalPriceUNI.totalEduxaFee}{" "}
                                USD
                              </div>
                            </div>
                            <div className="flex gap-2 items-center mt-2 text-xs text-yellow-600">
                              <div>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.99935 1.16797C3.78518 1.16797 1.16602 3.78714 1.16602 7.0013C1.16602 10.2155 3.78518 12.8346 6.99935 12.8346C10.2135 12.8346 12.8327 10.2155 12.8327 7.0013C12.8327 3.78714 10.2135 1.16797 6.99935 1.16797ZM6.56185 4.66797C6.56185 4.4288 6.76018 4.23047 6.99935 4.23047C7.23852 4.23047 7.43685 4.4288 7.43685 4.66797V7.58464C7.43685 7.8238 7.23852 8.02214 6.99935 8.02214C6.76018 8.02214 6.56185 7.8238 6.56185 7.58464V4.66797ZM7.53602 9.5563C7.50685 9.63213 7.46602 9.69047 7.41352 9.7488C7.35518 9.8013 7.29102 9.84214 7.22102 9.8713C7.15102 9.90047 7.07518 9.91797 6.99935 9.91797C6.92352 9.91797 6.84768 9.90047 6.77768 9.8713C6.70768 9.84214 6.64352 9.8013 6.58518 9.7488C6.53268 9.69047 6.49185 9.63213 6.46268 9.5563C6.43352 9.4863 6.41602 9.41047 6.41602 9.33464C6.41602 9.2588 6.43352 9.18297 6.46268 9.11297C6.49185 9.04297 6.53268 8.9788 6.58518 8.92047C6.64352 8.86797 6.70768 8.82714 6.77768 8.79797C6.91768 8.73964 7.08102 8.73964 7.22102 8.79797C7.29102 8.82714 7.35518 8.86797 7.41352 8.92047C7.46602 8.9788 7.50685 9.04297 7.53602 9.11297C7.56518 9.18297 7.58268 9.2588 7.58268 9.33464C7.58268 9.41047 7.56518 9.4863 7.53602 9.5563Z"
                                    fill="#CAA313"
                                  />
                                </svg>
                              </div>
                              <div className="self-stretch my-auto text-yellow-600 w-[361px]">
                                {d("commentEduxa")}
                              </div>
                            </div>
                            <div className="flex gap-10 justify-between items-center mt-2 w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("universityFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                {totalPriceUNI.totalUniversityPrice}{" "}
                                {totalPriceUNI?.currency}
                              </div>
                            </div>
                            <div className="flex gap-10 justify-between items-center mt-2 w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("programFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                {totalPriceUNI.totalProgramPrice}{" "}
                                {totalPriceUNI?.currency}
                              </div>
                            </div>
                            {/* bank transfer fees */}
                            {/* <div className="flex gap-10 justify-between items-center mt-2 w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("bankFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                {totalPriceUNI.transferFees}{" "}
                                {totalPriceUNI?.currency}
                              </div>
                            </div>
                            <div className="flex gap-2 items-center mt-2 text-xs text-yellow-600">
                              <div>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.99935 1.16797C3.78518 1.16797 1.16602 3.78714 1.16602 7.0013C1.16602 10.2155 3.78518 12.8346 6.99935 12.8346C10.2135 12.8346 12.8327 10.2155 12.8327 7.0013C12.8327 3.78714 10.2135 1.16797 6.99935 1.16797ZM6.56185 4.66797C6.56185 4.4288 6.76018 4.23047 6.99935 4.23047C7.23852 4.23047 7.43685 4.4288 7.43685 4.66797V7.58464C7.43685 7.8238 7.23852 8.02214 6.99935 8.02214C6.76018 8.02214 6.56185 7.8238 6.56185 7.58464V4.66797ZM7.53602 9.5563C7.50685 9.63213 7.46602 9.69047 7.41352 9.7488C7.35518 9.8013 7.29102 9.84214 7.22102 9.8713C7.15102 9.90047 7.07518 9.91797 6.99935 9.91797C6.92352 9.91797 6.84768 9.90047 6.77768 9.8713C6.70768 9.84214 6.64352 9.8013 6.58518 9.7488C6.53268 9.69047 6.49185 9.63213 6.46268 9.5563C6.43352 9.4863 6.41602 9.41047 6.41602 9.33464C6.41602 9.2588 6.43352 9.18297 6.46268 9.11297C6.49185 9.04297 6.53268 8.9788 6.58518 8.92047C6.64352 8.86797 6.70768 8.82714 6.77768 8.79797C6.91768 8.73964 7.08102 8.73964 7.22102 8.79797C7.29102 8.82714 7.35518 8.86797 7.41352 8.92047C7.46602 8.9788 7.50685 9.04297 7.53602 9.11297C7.56518 9.18297 7.58268 9.2588 7.58268 9.33464C7.58268 9.41047 7.56518 9.4863 7.53602 9.5563Z"
                                    fill="#CAA313"
                                  />
                                </svg>
                              </div>
                              <div className="self-stretch my-auto text-yellow-600 w-[361px]">
                                {d("comment")}
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div className="flex flex-col mt-6 w-full tracking-wide">
                          <div className="flex flex-col w-full">
                            <div className="flex gap-10 justify-between items-center w-full text-base text-zinc-900">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("totalPrice")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                {totalPriceUNI.totalPriceWithTransferFees}{" "}
                                {totalPriceUNI?.currency}
                              </div>
                            </div>
                            {convertTotalPrice.convertedAmount && (
                              <div className="flex gap-10 justify-between items-center w-full text-base text-zinc-900">
                                <div className="self-stretch my-auto leading-loose text-zinc-900">
                                  {d("totalPriceTwo")}
                                </div>
                                <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                  {Math.ceil(convertTotalPrice.convertedAmount)}{" "}
                                  {selectedCurrency}
                                </div>
                              </div>
                            )}
                            {/* <div className="flex gap-2 items-center mt-2 text-xs text-yellow-600">
                                                    <div>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.99935 1.16797C3.78518 1.16797 1.16602 3.78714 1.16602 7.0013C1.16602 10.2155 3.78518 12.8346 6.99935 12.8346C10.2135 12.8346 12.8327 10.2155 12.8327 7.0013C12.8327 3.78714 10.2135 1.16797 6.99935 1.16797ZM6.56185 4.66797C6.56185 4.4288 6.76018 4.23047 6.99935 4.23047C7.23852 4.23047 7.43685 4.4288 7.43685 4.66797V7.58464C7.43685 7.8238 7.23852 8.02214 6.99935 8.02214C6.76018 8.02214 6.56185 7.8238 6.56185 7.58464V4.66797ZM7.53602 9.5563C7.50685 9.63213 7.46602 9.69047 7.41352 9.7488C7.35518 9.8013 7.29102 9.84214 7.22102 9.8713C7.15102 9.90047 7.07518 9.91797 6.99935 9.91797C6.92352 9.91797 6.84768 9.90047 6.77768 9.8713C6.70768 9.84214 6.64352 9.8013 6.58518 9.7488C6.53268 9.69047 6.49185 9.63213 6.46268 9.5563C6.43352 9.4863 6.41602 9.41047 6.41602 9.33464C6.41602 9.2588 6.43352 9.18297 6.46268 9.11297C6.49185 9.04297 6.53268 8.9788 6.58518 8.92047C6.64352 8.86797 6.70768 8.82714 6.77768 8.79797C6.91768 8.73964 7.08102 8.73964 7.22102 8.79797C7.29102 8.82714 7.35518 8.86797 7.41352 8.92047C7.46602 8.9788 7.50685 9.04297 7.53602 9.11297C7.56518 9.18297 7.58268 9.2588 7.58268 9.33464C7.58268 9.41047 7.56518 9.4863 7.53602 9.5563Z" fill="#CAA313" />
                                                        </svg>
                                                    </div>
                                                    <div className="self-stretch my-auto text-yellow-600">
                                                        {d("comment2")}
                                                    </div>
                                                </div> */}
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-sm font-medium tracking-wide text-zinc-900 cursor-pointer mt-6">
                          <input
                            type="checkbox"
                            className=" w-4 h-4 border border-zinc-300 rounded accent-amber-500 text-white"
                            checked={agreed}
                            onChange={(e) => {
                              setAgreed(e.target.checked);
                              if (e.target.checked) setError(false);
                            }}
                          />
                          <span>
                            {d("agree")}{" "}
                            <Link
                              target="_blank"
                              href={`/${locale}/refund-policy`}
                              className="text-blue-500 underline"
                            >
                              {d("agree2")}
                            </Link>
                          </span>
                        </label>
                        {error && (
                          <p className="mt-1 text-red-500 text-xs">
                            {d("agree")} {d("agree2")}
                          </p>
                        )}
                        <div
                          className="flex gap-1 justify-center items-center px-4 mt-6 w-full text-base font-medium tracking-wide text-white border border-solid bg-primary border-primary min-h-[60px] rounded-[64px] cursor-pointer"
                          onClick={() => {
                            console.log(agreed);
                            if (!agreed) {
                              setError(true)
                            } else {
                              if (user.id) {

                                if (userData?.phone_number) {
                                  handleCreateQuote();
                                } else {
                                  setObjPopPup({
                                    title: a("massage2"),
                                    prev: a("prev1"),
                                    url: "profile",
                                    urlTwo: "",
                                    button: a("button2"),
                                  });
                                  setShowPopPup(false);
                                }
                              } else {
                                setObjPopPup({
                                  title: a("massage"),
                                  prev: a("prev"),
                                  url: "login",
                                  urlTwo: "register",
                                  button: a("button"),
                                });
                                setShowPopPup(false);
                              }
                            }
                          }}
                        >
                          <div className="self-stretch my-auto text-white">
                            {d("createQuote")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex overflow-hidden gap-2 items-center p-6 w-full bg-white rounded-3xl border border-solid border-zinc-100 max-md:px-5 max-md:mt-6">
                      <div className="flex flex-col self-stretch my-auto w-full">
                        <div className="flex gap-5 justify-between py-1 w-full font-bold border-b border-solid border-b-zinc-100">
                          <div className="text-lg md:text-2xl text-zinc-900">
                            {d("totalReservation")}
                          </div>
                          {/* <div className="self-start text-lg tracking-wide text-end text-amber-500">
                            0.0
                          </div> */}
                        </div>
                        <div className="flex flex-col pb-4 mt-6 w-full tracking-wide border-b border-solid border-b-zinc-100">
                          {/* <div className="flex flex-col w-full text-base">
                            <div className="font-bold text-zinc-900">
                              {d("program")}
                            </div>
                            <div
                              className="flex flex-col justify-center items-start px-4 py-4 mt-2 w-full border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] text-neutral-400 cursor-pointer"
                              onClick={() => setIsOpen(true)}
                            >
                              <div className="flex gap-2.5 items-center">
                                <div className="self-stretch my-auto text-neutral-400">
                                  {d("drawer6")}
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <div className="flex flex-col mt-4 w-full text-zinc-900">
                            <div className="flex flex-col justify-center pb-3 font-medium border-b border-solid border-b-zinc-100 ">
                              <div className="  px-3.5 py-0.5 border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-zinc-900 text-lg md:text-xl">
                                {d("programDetails")}
                              </div>
                            </div>
                            <div className="flex flex-col items-start mt-3.5 w-full text-sm max-md:pr-5">
                              <div className="flex gap-10 w-full">
                                <div className="flex flex-1 gap-3 items-center">
                                  <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.1667 2.37398V1.33398C11.1667 1.06065 10.94 0.833984 10.6667 0.833984C10.3933 0.833984 10.1667 1.06065 10.1667 1.33398V2.33398H5.83332V1.33398C5.83332 1.06065 5.60666 0.833984 5.33332 0.833984C5.05999 0.833984 4.83332 1.06065 4.83332 1.33398V2.37398C3.03332 2.54065 2.15999 3.61398 2.02666 5.20732C2.01332 5.40065 2.17332 5.56065 2.35999 5.56065H13.64C13.8333 5.56065 13.9933 5.39398 13.9733 5.20732C13.84 3.61398 12.9667 2.54065 11.1667 2.37398Z"
                                        fill="#666666"
                                      />
                                      <path
                                        d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z"
                                        fill="#666666"
                                      />
                                    </svg>
                                  </div>
                                  <div className="self-stretch my-auto text-zinc-900">
                                    {d("start")} : -
                                  </div>
                                </div>
                                <div className="flex flex-1 gap-3 items-center">
                                  <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.1667 2.37398V1.33398C11.1667 1.06065 10.94 0.833984 10.6667 0.833984C10.3933 0.833984 10.1667 1.06065 10.1667 1.33398V2.33398H5.83332V1.33398C5.83332 1.06065 5.60666 0.833984 5.33332 0.833984C5.05999 0.833984 4.83332 1.06065 4.83332 1.33398V2.37398C3.03332 2.54065 2.15999 3.61398 2.02666 5.20732C2.01332 5.40065 2.17332 5.56065 2.35999 5.56065H13.64C13.8333 5.56065 13.9933 5.39398 13.9733 5.20732C13.84 3.61398 12.9667 2.54065 11.1667 2.37398Z"
                                        fill="#666666"
                                      />
                                      <path
                                        d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z"
                                        fill="#666666"
                                      />
                                    </svg>
                                  </div>
                                  <div className="self-stretch my-auto text-zinc-900">
                                    {d("end")} : -
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3 items-center mt-4">
                                <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.99992 1.33398C4.32659 1.33398 1.33325 4.32732 1.33325 8.00065C1.33325 11.674 4.32659 14.6673 7.99992 14.6673C11.6733 14.6673 14.6666 11.674 14.6666 8.00065C14.6666 4.32732 11.6733 1.33398 7.99992 1.33398ZM7.49992 5.33398C7.49992 5.06065 7.72659 4.83398 7.99992 4.83398C8.27325 4.83398 8.49992 5.06065 8.49992 5.33398V8.66732C8.49992 8.94065 8.27325 9.16732 7.99992 9.16732C7.72659 9.16732 7.49992 8.94065 7.49992 8.66732V5.33398ZM8.61325 10.9207C8.57992 11.0073 8.53325 11.074 8.47325 11.1407C8.40659 11.2007 8.33325 11.2473 8.25325 11.2807C8.17325 11.314 8.08659 11.334 7.99992 11.334C7.91325 11.334 7.82659 11.314 7.74659 11.2807C7.66659 11.2473 7.59325 11.2007 7.52659 11.1407C7.46659 11.074 7.41992 11.0073 7.38659 10.9207C7.35325 10.8407 7.33325 10.754 7.33325 10.6673C7.33325 10.5807 7.35325 10.494 7.38659 10.414C7.41992 10.334 7.46659 10.2607 7.52659 10.194C7.59325 10.134 7.66659 10.0873 7.74659 10.054C7.90659 9.98732 8.09325 9.98732 8.25325 10.054C8.33325 10.0873 8.40659 10.134 8.47325 10.194C8.53325 10.2607 8.57992 10.334 8.61325 10.414C8.64659 10.494 8.66659 10.5807 8.66659 10.6673C8.66659 10.754 8.64659 10.8407 8.61325 10.9207Z"
                                      fill="#666666"
                                    />
                                  </svg>
                                </div>
                                <div className="self-stretch my-auto text-zinc-900">
                                  {d("startStudy")} : -
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col mt-6 w-full tracking-wide text-zinc-900">
                          <div className="flex flex-col justify-end items-start pb-3 w-full text-lg font-medium border-b border-solid border-b-zinc-100">
                            <div className="overflow-hidden px-3.5 py-0.5 border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-lg md:text-xl">
                              {" "}
                              {d("priceDetails")}
                            </div>
                          </div>
                          <div className="flex flex-col mt-3.5 w-full text-base">
                            <div className="flex gap-10 justify-between items-center w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("eduxaFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                0.0
                              </div>
                            </div>
                            <div className="flex gap-10 justify-between items-center mt-2 w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("universityFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                0.0
                              </div>
                            </div>
                            <div className="flex gap-10 justify-between items-center mt-2 w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("programFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                0.0
                              </div>
                            </div>
                            <div className="flex gap-10 justify-between items-center mt-2 w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("bankFees")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                0.0
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center p-4 mt-6 w-full text-base tracking-wide rounded border border-solid bg-neutral-50 border-zinc-100 text-zinc-900">
                          <div className="flex flex-col w-full">
                            <div className="flex gap-10 justify-between items-center w-full">
                              <div className="self-stretch my-auto leading-loose text-zinc-900">
                                {d("totalPrice")}
                              </div>
                              <div className="self-stretch my-auto font-bold text-right text-zinc-900">
                                0.0
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 py-px mt-6 w-full text-sm font-medium tracking-wide text-zinc-900">
                          <div className="flex shrink-0 my-auto w-4 h-4 rounded border border-solid border-zinc-300" />
                          {d("agree")}{" "}
                          <Link
                            target="_blank"
                            href={`/${locale}/refund-policy`}
                            className=" text-blue-500 underline"
                          >
                            {d("agree2")}
                          </Link>
                        </div>
                        <div className="flex overflow-hidden gap-1 justify-center items-center px-4 py-0 mt-6 w-full text-base font-medium tracking-wide text-white border border-solid opacity-50 bg-primary border-primary min-h-[60px] rounded-[64px]">
                          <div className="self-stretch my-auto text-white">
                            {d("createQuote")}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </aside>
                {/* Artical */}
                <article className="flex flex-col w-[60%] max-md:w-full ">
                  <div className="flex flex-col w-full max-md:mt-6 max-md:max-w-full">
                    <div
                      className={`flex overflow-hidden relative flex-col justify-center ${showVideo ? "pt-80" : ""
                        }  w-full text-sm tracking-wide text-white whitespace-nowrap min-h-[350px]  max-md:max-w-full rounded-md`}
                    >
                      {showVideo ? (
                        <>
                          {university?.video && (
                            <iframe
                              title="University Video"
                              src={university.video}
                              className="w-full h-full rounded-md absolute inset-0"
                              allowFullScreen
                            ></iframe>
                          )}
                        </>
                      ) : (
                        <div className="relative w-full h-full ">
                          {images.length > 0 ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${images[currentImageIndex]}`}
                              alt={`image-${currentImageIndex}`}
                              fill={true}
                              className="rounded-t-md w-full h-full object-contain"
                            />
                          ) : (
                            <div className="text-xl lg:text-4xl text-black text-center">
                              {d("messageVideo")}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex overflow-hidden relative justify-between items-center px-4 py-2.5 w-full bg-[#1B1B1B]/60 max-md:pr-5 max-md:max-w-full">
                        <div className="flex gap-2 items-center">
                          <div
                            onClick={() => setShowVideo(false)}
                            className="flex gap-2 items-center self-stretch my-auto cursor-pointer"
                          >
                            <svg
                              width="14"
                              height="12"
                              viewBox="0 0 14 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.2981 2.38031L10.72 2.25531L10.57 0.574056C10.5388 0.220931 10.2231 -0.0259446 9.85438 0.00218043L0.604385 0.761556C0.235635 0.792806 -0.0299902 1.08968 -0.00186522 1.43968L0.660635 8.80843C0.691885 9.16156 1.01063 9.40843 1.37626 9.38031L1.84501 9.34281L1.77001 10.7741C1.75126 11.1678 2.05751 11.4866 2.47001 11.5084L12.7888 11.9991C13.2013 12.0178 13.5419 11.7303 13.5638 11.3366L13.9981 3.10843C14.0169 2.71781 13.7075 2.39906 13.2981 2.38031ZM2.20438 2.54593L1.98251 6.75843L1.43876 7.53031L0.93876 1.96781V1.95218V1.93656C0.954385 1.78031 1.07313 1.65531 1.23563 1.64281L9.39188 0.974055C9.55439 0.961555 9.69501 1.06781 9.72001 1.22093C9.72001 1.22718 9.72938 1.22718 9.72938 1.23343C9.72938 1.23656 9.73876 1.23968 9.73876 1.24593L9.82313 2.20843L2.97938 1.88031C2.56688 1.86781 2.22313 2.15531 2.20438 2.54593ZM12.645 9.94906L11.1856 8.22093L10.3263 7.19906C10.2513 7.10843 10.1294 7.03343 9.99501 7.02718C9.86063 7.02093 9.76063 7.07406 9.64813 7.15531L9.13563 7.52718C9.02626 7.59281 8.94188 7.63656 8.82626 7.63031C8.71376 7.62406 8.61376 7.58031 8.54188 7.51156C8.51688 7.48656 8.47001 7.44281 8.43251 7.40531L7.09501 5.87718C6.99813 5.75531 6.83876 5.67718 6.66376 5.66781C6.48563 5.65843 6.31376 5.73343 6.20126 5.84281L3.04188 9.24281L2.82938 9.47406L2.83876 9.26156L3.05126 5.23343L3.15438 3.26781V3.25218V3.23656C3.19813 3.06781 3.34813 2.94593 3.52626 2.95531L9.90751 3.26156L10.8044 3.30531L12.6263 3.39281C12.8075 3.40218 12.9481 3.53968 12.9513 3.71156C12.9513 3.71781 12.9606 3.72093 12.9606 3.72718C12.9606 3.73343 12.97 3.73656 12.97 3.74281L12.645 9.94906Z"
                                fill="white"
                              />
                            </svg>

                            <div
                              className={`self-stretch my-auto ${!showVideo ? "font-bold text-yellow-500" : ""
                                } `}
                            >
                              {d("images")}
                            </div>
                          </div>
                          <div
                            onClick={() => setShowVideo(true)}
                            className="flex gap-2 items-center self-stretch my-auto cursor-pointer"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.75 2.25H14.25V13.25H1.75V2.25Z"
                                fill="white"
                              />
                              <path
                                d="M1.75 2.25H14.25V5.25H1.75V2.25Z"
                                fill="#1B1B1B"
                              />
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
                            <div
                              className={`self-stretch my-auto ${showVideo ? "font-bold text-yellow-500" : ""
                                } `}
                            >
                              {d("video")}
                            </div>
                          </div>
                        </div>
                        {!showVideo && (
                          <div className="flex  place-items-center gap-4 ">
                            {language == "en" && (
                              <>
                                <div
                                  className="cursor-pointer"
                                  onClick={handlePrev}
                                >
                                  <svg
                                    width="10"
                                    height="20"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.32031 12.9209L7.32031 1.08105C7.32017 0.568823 6.70023 0.308264 6.33398 0.665039L1.1543 5.84473C0.519559 6.47946 0.519559 7.51272 1.1543 8.14746L6.33398 13.3281C6.69997 13.6937 7.32031 13.434 7.32031 12.9209Z"
                                      fill="white"
                                      stroke="white"
                                    />
                                  </svg>
                                </div>
                                <div
                                  className="cursor-pointer"
                                  onClick={handleNext}
                                >
                                  <svg
                                    width="10"
                                    height="20"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M0.679688 12.9209L0.679688 1.08105C0.679828 0.568823 1.29977 0.308264 1.66602 0.665039L6.8457 5.84473C7.48044 6.47946 7.48044 7.51272 6.8457 8.14746L1.66602 13.3281C1.30003 13.6937 0.679688 13.434 0.679688 12.9209Z"
                                      fill="white"
                                      stroke="white"
                                    />
                                  </svg>
                                </div>
                              </>
                            )}
                            {language == "ar" && (
                              <>
                                <div
                                  className="cursor-pointer"
                                  onClick={handleNext}
                                >
                                  <svg
                                    width="10"
                                    height="20"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M0.679688 12.9209L0.679688 1.08105C0.679828 0.568823 1.29977 0.308264 1.66602 0.665039L6.8457 5.84473C7.48044 6.47946 7.48044 7.51272 6.8457 8.14746L1.66602 13.3281C1.30003 13.6937 0.679688 13.434 0.679688 12.9209Z"
                                      fill="white"
                                      stroke="white"
                                    />
                                  </svg>
                                </div>
                                <div
                                  className="cursor-pointer"
                                  onClick={handlePrev}
                                >
                                  <svg
                                    width="10"
                                    height="20"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.32031 12.9209L7.32031 1.08105C7.32017 0.568823 6.70023 0.308264 6.33398 0.665039L1.1543 5.84473C0.519559 6.47946 0.519559 7.51272 1.1543 8.14746L6.33398 13.3281C6.69997 13.6937 7.32031 13.434 7.32031 12.9209Z"
                                      fill="white"
                                      stroke="white"
                                    />
                                  </svg>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ----------------- */}
                    <div className="flex relative items-start self-start mt-1.5 ">
                      <div className="flex absolute inset-x-0 bottom-0 z-0 shrink-0 self-start bg-gray-300 rounded-full h-[3px] min-w-[240px] w-[313px] bg-[#A5A5A5]" />
                      <div className="flex z-0 gap-5 items-center my-auto min-w-[240px] px-4">
                        <div
                          className={`flex relative gap-1 justify-center items-center self-stretch py-4 my-auto ${activeButton === "program"
                            ? "border-b-[3px] border-amber-500 font-bold text-zinc-900"
                            : "text-neutral-400 font-medium"
                            }  cursor-pointer`}
                          onClick={() => setActiveButton("program")}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.7935 1.33398H5.20683C2.78016 1.33398 1.3335 2.78065 1.3335 5.20732V10.7873C1.3335 13.2207 2.78016 14.6673 5.20683 14.6673H10.7868C13.2135 14.6673 14.6602 13.2207 14.6602 10.794V5.20732C14.6668 2.78065 13.2202 1.33398 10.7935 1.33398ZM10.5002 10.5007H5.50016C5.22683 10.5007 5.00016 10.274 5.00016 10.0007C5.00016 9.72732 5.22683 9.50065 5.50016 9.50065H10.5002C10.7735 9.50065 11.0002 9.72732 11.0002 10.0007C11.0002 10.274 10.7735 10.5007 10.5002 10.5007ZM10.5002 6.50065H5.50016C5.22683 6.50065 5.00016 6.27398 5.00016 6.00065C5.00016 5.72732 5.22683 5.50065 5.50016 5.50065H10.5002C10.7735 5.50065 11.0002 5.72732 11.0002 6.00065C11.0002 6.27398 10.7735 6.50065 10.5002 6.50065Z"
                              fill="#F89A21"
                            />
                          </svg>
                          <div className="text-sm tracking-wide ">
                            {d("programDetails")}
                          </div>
                        </div>
                        <div
                          className={`flex relative gap-1 justify-center items-center self-stretch py-4 my-auto ${activeButton === "uni"
                            ? "border-b-[3px] border-amber-500 font-bold text-zinc-900"
                            : "text-neutral-400 font-medium"
                            }  cursor-pointer`}
                          onClick={() => setActiveButton("uni")}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.54657 2H3.39324C2.06657 2 1.3999 2.67333 1.3999 4.01333V14.6667H4.9999V12.1667C4.9999 11.8933 5.22657 11.6667 5.4999 11.6667C5.77324 11.6667 5.9999 11.8867 5.9999 12.1667V14.6667H9.53324V4.01333C9.53324 2.67333 8.87324 2 7.54657 2ZM7.16657 8.5H3.86657C3.59324 8.5 3.36657 8.27333 3.36657 8C3.36657 7.72667 3.59324 7.5 3.86657 7.5H7.16657C7.4399 7.5 7.66657 7.72667 7.66657 8C7.66657 8.27333 7.4399 8.5 7.16657 8.5ZM7.16657 6H3.86657C3.59324 6 3.36657 5.77333 3.36657 5.5C3.36657 5.22667 3.59324 5 3.86657 5H7.16657C7.4399 5 7.66657 5.22667 7.66657 5.5C7.66657 5.77333 7.4399 6 7.16657 6Z"
                              fill="#F89A21"
                            />
                            <path
                              d="M15.3332 14.1661H13.8198V12.1661C14.4532 11.9594 14.9132 11.3661 14.9132 10.6661V9.33276C14.9132 8.45943 14.1998 7.74609 13.3265 7.74609C12.4532 7.74609 11.7398 8.45943 11.7398 9.33276V10.6661C11.7398 11.3594 12.1932 11.9461 12.8132 12.1594V14.1661H0.666504C0.393171 14.1661 0.166504 14.3928 0.166504 14.6661C0.166504 14.9394 0.393171 15.1661 0.666504 15.1661H13.2865C13.2998 15.1661 13.3065 15.1728 13.3198 15.1728C13.3332 15.1728 13.3398 15.1661 13.3532 15.1661H15.3332C15.6065 15.1661 15.8332 14.9394 15.8332 14.6661C15.8332 14.3928 15.6065 14.1661 15.3332 14.1661Z"
                              fill="#F89A21"
                            />
                          </svg>
                          <div className="text-sm tracking-wide ">
                            {d("breadcrumb3")}
                          </div>
                        </div>
                      </div>
                    </div>

                    {activeButton === "program" ? (
                      <div>
                        <div className="flex overflow-hidden flex-col justify-center items-center px-6 py-8 mt-4 font-medium tracking-wide  rounded-3xl border border-solid border-zinc-100 min-h-[267px] max-md:px-5 max-md:max-w-full bg-white">
                          {program?.university_id == undefined ? (
                            <div className="flex flex-col items-center max-w-full w-[461px]">
                              <svg
                                width="130"
                                height="150"
                                viewBox="0 0 96 115"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.49927 42.5V25C5.49927 23.6739 6.02605 22.4021 6.96373 21.4645C7.90142 20.5268 9.17319 20 10.4993 20H33.8243C34.9061 20 35.9588 20.3509 36.8243 21L44.1743 26.5C45.0397 27.1491 46.0924 27.5 47.1743 27.5H85.4993C86.8253 27.5 88.0971 28.0268 89.0348 28.9645C89.9725 29.9021 90.4993 31.1739 90.4993 32.5V42.5H5.49927Z"
                                  fill="url(#paint0_linear_625_20710)"
                                />
                                <path
                                  d="M95.4988 45.4002L87.9988 90.4002C87.903 90.9918 87.5978 91.5292 87.139 91.9147C86.6801 92.3001 86.098 92.5079 85.4988 92.5002H10.4988C9.89957 92.5079 9.31751 92.3001 8.85864 91.9147C8.39977 91.5292 8.09463 90.9918 7.99879 90.4002L0.498794 45.4002C0.440383 45.04 0.461521 44.6714 0.560722 44.3203C0.659924 43.9692 0.834784 43.644 1.07303 43.3677C1.31127 43.0913 1.60712 42.8704 1.93981 42.7206C2.27249 42.5707 2.63395 42.4955 2.99879 42.5002H92.9988C93.3636 42.4955 93.7251 42.5707 94.0578 42.7206C94.3905 42.8704 94.6863 43.0913 94.9246 43.3677C95.1628 43.644 95.3377 43.9692 95.4369 44.3203C95.5361 44.6714 95.5572 45.04 95.4988 45.4002Z"
                                  fill="url(#paint1_linear_625_20710)"
                                />
                                <path
                                  d="M84.3238 4.27409C82.0738 1.59909 77.9988 -0.400911 75.4988 1.94909C72.9988 -0.375911 68.9988 1.54909 66.6738 4.27409C63.9988 7.49909 63.5488 11.4491 65.6488 13.2241C67.7488 14.9991 71.6488 13.8991 74.3238 10.7241C76.2738 8.39909 74.7238 8.39909 76.6738 10.7241C79.3488 13.8991 83.2238 14.9991 85.3488 13.2241C87.4738 11.4491 86.9988 7.49909 84.3238 4.27409Z"
                                  fill="#F7E9D7"
                                />
                                <path
                                  d="M75.499 15C78.2604 15 80.499 11.6421 80.499 7.5C80.499 3.35786 78.2604 0 75.499 0C72.7376 0 70.499 3.35786 70.499 7.5C70.499 11.6421 72.7376 15 75.499 15Z"
                                  fill="url(#paint2_linear_625_20710)"
                                />
                                <path
                                  d="M87.9993 109.7C87.9885 110.744 87.6713 111.761 87.087 112.626C86.5027 113.491 85.6772 114.165 84.713 114.564C83.7488 114.964 82.6884 115.071 81.6637 114.873C80.639 114.675 79.6951 114.18 78.9493 113.45L65.4993 100L72.9993 92.5L86.4493 105.95C86.9424 106.442 87.3332 107.026 87.5993 107.67C87.8653 108.314 88.0012 109.004 87.9993 109.7Z"
                                  fill="url(#paint3_linear_625_20710)"
                                />
                                <path
                                  d="M68.7539 89.272L62.2839 95.742C61.3076 96.7183 61.3076 98.3012 62.2839 99.2775L63.7511 100.745C64.7274 101.721 66.3103 101.721 67.2867 100.745L73.7567 94.2747C74.733 93.2984 74.733 91.7155 73.7567 90.7392L72.2894 89.272C71.3131 88.2957 69.7302 88.2957 68.7539 89.272Z"
                                  fill="url(#paint4_linear_625_20710)"
                                />
                                <path
                                  d="M50.499 102.5C64.3061 102.5 75.499 91.3071 75.499 77.5C75.499 63.6929 64.3061 52.5 50.499 52.5C36.6919 52.5 25.499 63.6929 25.499 77.5C25.499 91.3071 36.6919 102.5 50.499 102.5Z"
                                  fill="url(#paint5_linear_625_20710)"
                                />
                                <path
                                  d="M50.4985 97.5C61.5442 97.5 70.4985 88.5457 70.4985 77.5C70.4985 66.4543 61.5442 57.5 50.4985 57.5C39.4528 57.5 30.4985 66.4543 30.4985 77.5C30.4985 88.5457 39.4528 97.5 50.4985 97.5Z"
                                  fill="url(#paint6_linear_625_20710)"
                                />
                                <path
                                  d="M50.4989 82.4998C46.9239 82.4998 47.1739 76.2248 51.2989 74.8748C51.7343 74.7278 52.1207 74.4635 52.4157 74.1112C52.7108 73.7588 52.9029 73.332 52.9712 72.8775C53.0394 72.4231 52.9811 71.9586 52.8026 71.5351C52.624 71.1117 52.3323 70.7456 51.9593 70.4772C51.5863 70.2087 51.1465 70.0483 50.6883 70.0135C50.23 69.9787 49.7711 70.0708 49.3618 70.2799C48.9525 70.4889 48.6088 70.8067 48.3684 71.1983C48.1279 71.5899 48.0001 72.0403 47.9989 72.4998C47.9989 73.1629 47.7355 73.7988 47.2667 74.2676C46.7978 74.7364 46.162 74.9998 45.4989 74.9998C40.7239 74.9998 42.9989 64.9998 50.4989 64.9998C52.2966 64.9606 54.0486 65.5686 55.4356 66.7129C56.8226 67.8573 57.7523 69.4619 58.0552 71.2343C58.3582 73.0068 58.0143 74.829 57.0862 76.3692C56.1581 77.9093 54.7076 79.0647 52.9989 79.6248V79.9998C52.9989 80.6629 52.7355 81.2988 52.2667 81.7676C51.7978 82.2364 51.162 82.4998 50.4989 82.4998ZM50.4989 89.9998C50.0045 89.9998 49.5211 89.8532 49.11 89.5785C48.6989 89.3038 48.3784 88.9134 48.1892 88.4565C48 87.9997 47.9505 87.4971 48.0469 87.0121C48.1434 86.5272 48.3815 86.0817 48.7311 85.7321C49.0808 85.3824 49.5262 85.1443 50.0112 85.0479C50.4961 84.9514 50.9988 85.0009 51.4556 85.1901C51.9124 85.3794 52.3029 85.6998 52.5776 86.1109C52.8523 86.522 52.9989 87.0054 52.9989 87.4998C52.9989 88.1629 52.7355 88.7988 52.2667 89.2676C51.7978 89.7364 51.162 89.9998 50.4989 89.9998Z"
                                  fill="#B4C8E1"
                                />
                                <path
                                  d="M50.4987 37.5C45.7237 37.5 47.9987 27.5 55.4987 27.5H70.4987C71.1617 27.5 71.7976 27.2366 72.2664 26.7678C72.7353 26.2989 72.9987 25.663 72.9987 25V22.5C72.9987 21.837 73.2621 21.2011 73.7309 20.7322C74.1997 20.2634 74.8356 20 75.4987 20C76.1617 20 76.7976 20.2634 77.2664 20.7322C77.7353 21.2011 77.9987 21.837 77.9987 22.5V25C77.9987 26.9891 77.2085 28.8968 75.802 30.3033C74.3954 31.7098 72.4878 32.5 70.4987 32.5H55.4987C54.8356 32.5 54.1997 32.7634 53.7309 33.2322C53.2621 33.7011 52.9987 34.337 52.9987 35C52.9987 35.663 52.7353 36.2989 52.2664 36.7678C51.7976 37.2366 51.1617 37.5 50.4987 37.5Z"
                                  fill="#F7E9D7"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_625_20710"
                                    x1="47.9993"
                                    y1="42.5"
                                    x2="47.9993"
                                    y2="20"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#365D8D" />
                                    <stop offset="1" stopColor="#8ABEFE" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint1_linear_625_20710"
                                    x1="47.9988"
                                    y1="92.5002"
                                    x2="47.9988"
                                    y2="42.5002"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#365D8D" />
                                    <stop offset="1" stopColor="#8ABEFE" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint2_linear_625_20710"
                                    x1="80.499"
                                    y1="7.5"
                                    x2="70.499"
                                    y2="7.5"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F89A21" />
                                    <stop offset="1" stopColor="#FFBD69" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint3_linear_625_20710"
                                    x1="65.4993"
                                    y1="103.75"
                                    x2="87.9993"
                                    y2="103.75"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F89A21" />
                                    <stop offset="1" stopColor="#FFBD69" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint4_linear_625_20710"
                                    x1="61.5454"
                                    y1="95.0062"
                                    x2="74.4954"
                                    y2="95.0062"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F89A21" />
                                    <stop offset="1" stopColor="#FFBD69" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint5_linear_625_20710"
                                    x1="25.499"
                                    y1="77.5"
                                    x2="75.499"
                                    y2="77.5"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F89A21" />
                                    <stop offset="1" stopColor="#FFBD69" />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint6_linear_625_20710"
                                    x1="30.4985"
                                    y1="77.5"
                                    x2="70.4985"
                                    y2="77.5"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F5E6D3" />
                                    <stop offset="1" stopColor="#FCF7F0" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div className="self-stretch mt-2 text-sm text-center text-zinc-800 max-md:max-w-full">
                                {d("message1")}
                              </div>
                              <div
                                className="flex gap-1 justify-center items-center px-4 py-3 mt-2 max-w-full text-base text-white bg-primary rounded-[64px] w-[230px] cursor-pointer"
                                onClick={() => setIsOpen(true)}
                              >
                                <svg
                                  width="18"
                                  height="17"
                                  viewBox="0 0 18 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    opacity="0.3"
                                    d="M16.9167 14.6836L14.275 12.1836C13.7728 12.8302 13.1708 13.3928 12.4917 13.8503L15.2084 16.4336C15.3226 16.567 15.4638 16.6747 15.6228 16.7495C15.7817 16.8243 15.9547 16.8645 16.1303 16.8675C16.3059 16.8705 16.4801 16.8362 16.6415 16.7669C16.8029 16.6976 16.9478 16.5949 17.0665 16.4654C17.1852 16.336 17.2752 16.1829 17.3303 16.0161C17.3855 15.8494 17.4047 15.6728 17.3866 15.4981C17.3685 15.3234 17.3136 15.1545 17.2254 15.0026C17.1372 14.8507 17.0178 14.7193 16.875 14.6169L16.9167 14.6836Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M8.28345 0.166016C6.80009 0.166016 5.35004 0.605883 4.11667 1.42999C2.88331 2.2541 1.92201 3.42544 1.35435 4.79589C0.786697 6.16634 0.638172 7.67434 0.927561 9.12919C1.21695 10.5841 1.93126 11.9204 2.98015 12.9693C4.02904 14.0182 5.36542 14.7325 6.82027 15.0219C8.27513 15.3113 9.78313 15.1628 11.1536 14.5951C12.524 14.0275 13.6954 13.0662 14.5195 11.8328C15.3436 10.5994 15.7835 9.14938 15.7835 7.66602C15.7835 5.67689 14.9933 3.76924 13.5868 2.36271C12.1802 0.956192 10.2726 0.166016 8.28345 0.166016ZM8.28345 12.966C7.23721 12.966 6.21445 12.6559 5.34443 12.0748C4.4744 11.4937 3.79615 10.6677 3.39539 9.7013C2.99463 8.73486 2.88935 7.67131 3.09286 6.64506C3.29637 5.6188 3.79952 4.6759 4.53874 3.93552C5.27796 3.19514 6.22007 2.6905 7.246 2.48538C8.27193 2.28026 9.33565 2.38386 10.3027 2.7831C11.2698 3.18233 12.0968 3.85928 12.6793 4.7284C13.2617 5.59751 13.5735 6.61978 13.5751 7.66602C13.5773 8.36194 13.442 9.05143 13.177 9.69491C12.9119 10.3384 12.5223 10.9232 12.0306 11.4156C11.5389 11.9081 10.9548 12.2986 10.3117 12.5647C9.66866 12.8307 8.97937 12.9671 8.28345 12.966V12.966Z"
                                    fill="white"
                                  />
                                </svg>
                                <div className="self-stretch my-auto text-white">
                                  {d("message2")}
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
                                className={`fixed top-0 right-0 z-50 h-full w-[23rem] lg:w-[50rem] bg-white rounded-2xl overflow-y-scroll shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                                  }`}
                              >
                                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray">
                                  <div className="flex justify-center items-center gap-2">
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

                                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                      {d("drawer")}
                                    </h5>
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
                                    <div
                                      className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto border-solid max-md:px-5 rounded-lg ${selectedDegree
                                        ? "bg-white"
                                        : "bg-amber-500 text-white"
                                        }  border border-solid border-zinc-100 cursor-pointer hover:bg-gray`}
                                      onClick={() => handleDegreeClick(null)}
                                    >
                                      {d("all")}{" "}
                                      {data?.academic_degrees &&
                                        data?.academic_degrees?.length > 0
                                        ? data.academic_degrees.reduce(
                                          (total, degree) =>
                                            total + degree.count,
                                          0
                                        )
                                        : "0"}
                                    </div>
                                    {data &&
                                      data.academic_degrees.map(
                                        (academic, index) => (
                                          <div
                                            key={index}
                                            className={`gap-2 px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer hover:bg-gray ${selectedDegree ===
                                              academic.academic_degree
                                              ? "bg-amber-500 text-white"
                                              : "bg-white"
                                              } `}
                                            onClick={() =>
                                              handleDegreeClick(
                                                academic.academic_degree
                                              )
                                            }
                                          >
                                            {academic.academic_degree} (
                                            {academic.count})
                                          </div>
                                        )
                                      )}
                                  </div>
                                  {/* Program cards */}
                                  {programs.loading ? (
                                    <div className="flex justify-center items-center w-full">
                                      <Loader />
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
                                      {programs?.programs?.data?.map(
                                        (program: any) => {
                                          const endDate = new Date(
                                            program.end_date
                                          );
                                          const today = new Date();
                                          const timeDiff =
                                            endDate.getTime() - today.getTime();
                                          const daysLeft = Math.ceil(
                                            timeDiff / (1000 * 3600 * 24)
                                          );

                                          return (
                                            <div
                                              key={program.program_id}
                                              className="flex flex-col justify-center px-3 py-6 bg-white rounded-3xl border border-solid border-zinc-100"
                                            >
                                              <div className="flex flex-col w-full">
                                                <div className="flex gap-2 items-center px-2 py-0 -mt-4 h-5 bg-red-50 rounded-md">
                                                  <div>
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
                                                        fill="#912018"
                                                      />
                                                    </svg>
                                                  </div>
                                                  <div className="text-xs tracking-wide text-center text-red-800">
                                                    {daysLeft > 0
                                                      ? `${t(
                                                        "left"
                                                      )} ${daysLeft} ${t(
                                                        "daysLeft"
                                                      )} `
                                                      : "Application closed"}
                                                  </div>
                                                </div>
                                                <div className="text-xl font-bold text-zinc-900 truncate">
                                                  {program.program_name}
                                                </div>
                                                <div className="flex flex-col mt-4 w-full text-sm tracking-wide text-slate-900">
                                                  <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-t border-solid border-t-zinc-100">
                                                    <div className="flex gap-10 justify-between items-center w-full">
                                                      <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                        <svg
                                                          width="22"
                                                          height="22"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            d="M12 2.5C17.2339 2.5 21.5 6.76614 21.5 12C21.5 14.7526 20.3143 17.2313 18.4219 18.9717L18.0596 19.3047L17.96 19.3857C17.8774 19.4546 17.7915 19.5219 17.7021 19.5889L17.4229 19.79L17.4189 19.793C17.3093 19.8713 17.3031 19.8826 17.2617 19.9062L17.249 19.9131L17.2373 19.9209C17.0488 20.0434 16.8797 20.1353 16.6621 20.2656C16.6167 20.2916 16.567 20.3231 16.54 20.3398L16.4668 20.3828L16.458 20.3867C16.2591 20.4909 16.0609 20.5862 15.8633 20.6709L15.8496 20.6758L15.8359 20.6826C15.7515 20.7248 15.6955 20.7524 15.6445 20.7715L15.6338 20.7764L15.623 20.7803C15.4282 20.8638 15.243 20.9164 14.9863 21.0098C14.8954 21.0357 14.8107 21.0663 14.748 21.0898C14.5489 21.1584 14.3477 21.1975 14.0791 21.2646V21.2656C14.025 21.2757 13.9796 21.2857 13.9531 21.293C13.9236 21.3011 13.9125 21.3038 13.9092 21.3047L13.8926 21.3076L13.875 21.3115C13.6174 21.3667 13.3556 21.4039 13.0781 21.4326L13.043 21.4365L13.0088 21.4453C12.9985 21.4479 12.992 21.4489 12.9863 21.4502H12.9854L12.9648 21.4521C12.6453 21.4812 12.3209 21.5 12 21.5C11.6894 21.5 11.3755 21.4817 11.0557 21.4541C11.0195 21.4459 10.9678 21.4385 10.9102 21.4346L10.9111 21.4326C10.6338 21.4039 10.3727 21.3667 10.1152 21.3115L10.0938 21.3066L10.0723 21.3037L9.92773 21.2695L9.91895 21.2666L9.91113 21.2646L9.20996 21.0801L9.20117 21.0771L9.19141 21.0752L9.00586 21.0117L8.99414 21.0078L8.98145 21.0039L8.6709 20.8975C8.56722 20.8598 8.46333 20.8199 8.35938 20.7773L8.3457 20.7715L8.15332 20.6826L8.13672 20.6748L8.11914 20.667L7.82227 20.5361L7.54102 20.3916C7.51336 20.3757 7.48272 20.3572 7.44727 20.3359C7.41083 20.3141 7.36855 20.2887 7.32812 20.2656L7.32031 20.2617L7.31152 20.2568L7.0293 20.0986C6.93798 20.0438 6.84912 19.9869 6.7627 19.9277H6.76172C6.72675 19.9029 6.69472 19.8799 6.66504 19.8594C6.63223 19.8367 6.60189 19.8155 6.57031 19.793H6.56934C6.36851 19.6451 6.19316 19.5215 6.03027 19.3857L6.00977 19.3691L5.9873 19.3535L5.86035 19.2461H5.85938C5.81532 19.2073 5.76906 19.1702 5.73047 19.1396V19.1211L5.56934 18.9727C3.68601 17.232 2.5 14.7528 2.5 12C2.5 6.76614 6.76614 2.5 12 2.5ZM12 3C7.03386 3 3 7.03386 3 12C3 14.4578 3.99667 16.6923 5.60449 18.3213L5.99609 18.7188L6.34863 18.2852C6.55155 18.0349 6.78322 17.8005 7.05273 17.5898L7.33496 17.3877L7.33691 17.3857C8.60312 16.5416 10.2944 16.1055 12.0078 16.1055C13.6141 16.1055 15.1952 16.4888 16.4209 17.2314L16.6611 17.3848L16.665 17.3877C17.0628 17.6499 17.392 17.9536 17.6465 18.2783L17.9971 18.7256L18.3955 18.3213C20.0033 16.6923 21 14.4578 21 12C21 7.03386 16.9661 3 12 3Z"
                                                            fill="#F89A21"
                                                            stroke="#F89A21"
                                                          />
                                                          <path
                                                            d="M12 7.42969C13.7379 7.42969 15.1591 8.79632 15.2461 10.5127L15.25 10.6797C15.24 12.4412 13.8621 13.8593 12.1123 13.9199H11.9639C10.12 13.8673 8.75 12.4345 8.75 10.6797C8.75 8.88583 10.2061 7.42969 12 7.42969Z"
                                                            fill="#F89A21"
                                                            stroke="#F89A21"
                                                          />
                                                        </svg>

                                                        <div className="flex flex-col w-[114px]">
                                                          <div>
                                                            {d("drawer2")}
                                                          </div>
                                                          <div className="font-bold">
                                                            {
                                                              program.course_duration
                                                            }
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                        <svg
                                                          width="22"
                                                          height="22"
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

                                                        <div className="flex flex-col w-[114px]">
                                                          <div>
                                                            {d("drawer3")}
                                                          </div>
                                                          <div className="font-bold">
                                                            {
                                                              program.course_language
                                                            }
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-b border-solid border-b-zinc-100">
                                                    <div className="flex gap-10 justify-between items-center w-full">
                                                      <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                        <svg
                                                          width="22"
                                                          height="22"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            d="M3.53882 7.83789C3.63387 6.72879 3.98146 5.85166 4.57104 5.22559C5.15995 4.6004 6.03909 4.17404 7.29565 4.05762L7.74976 4.01562V2C7.74976 1.86622 7.866 1.75013 7.99976 1.75C8.13361 1.75 8.24976 1.86614 8.24976 2V4H15.7498V2C15.7498 1.86622 15.866 1.75013 15.9998 1.75C16.1336 1.75 16.2498 1.86614 16.2498 2V4.01562L16.7039 4.05762C17.9606 4.17399 18.8395 4.60034 19.4285 5.22559C20.0185 5.85204 20.3659 6.72971 20.4607 7.83984H3.54175C3.54095 7.83945 3.53987 7.83883 3.53882 7.83789Z"
                                                            fill="#F89A21"
                                                            stroke="#F89A21"
                                                          />
                                                          <path
                                                            d="M4 10.3398H20C20.2739 10.3398 20.5 10.566 20.5 10.8398V17C20.5 18.4231 20.144 19.5325 19.4463 20.2842C18.7545 21.0291 17.6547 21.5 16 21.5H8C6.3453 21.5 5.24547 21.0291 4.55371 20.2842C3.85595 19.5325 3.50003 18.4231 3.5 17V10.8398C3.5 10.566 3.72614 10.3398 4 10.3398ZM9.07227 16.1182C8.70924 15.9669 8.29076 15.9669 7.92773 16.1182C7.7538 16.1906 7.59557 16.2915 7.45508 16.418L7.44043 16.4316L7.42676 16.4463C7.16492 16.7228 7 17.1038 7 17.5C7.00004 17.8963 7.16486 18.2772 7.42676 18.5537L7.44043 18.5684L7.45508 18.5811C7.59557 18.7075 7.7538 18.8094 7.92773 18.8818C8.09883 18.9531 8.29423 19 8.5 19C8.70577 19 8.90117 18.9531 9.07227 18.8818C9.2462 18.8094 9.40443 18.7075 9.54492 18.5811L9.55957 18.5684L9.57324 18.5537C9.83514 18.2772 9.99996 17.8963 10 17.5C10 17.1038 9.83508 16.7228 9.57324 16.4463L9.55957 16.4316L9.54492 16.418L9.43555 16.3281C9.32383 16.2431 9.20262 16.1725 9.07227 16.1182ZM9.07227 12.6182C8.70924 12.4669 8.29076 12.4669 7.92773 12.6182C7.7538 12.6906 7.59557 12.7915 7.45508 12.918L7.43555 12.9355L7.41797 12.9551C7.29154 13.0956 7.19063 13.2538 7.11816 13.4277C7.04692 13.5988 7 13.7943 7 14C7.00002 14.2058 7.04687 14.4012 7.11816 14.5723C7.19057 14.746 7.29169 14.9036 7.41797 15.0439L7.43555 15.0635L7.45508 15.0811C7.59557 15.2075 7.7538 15.3094 7.92773 15.3818C8.09883 15.4531 8.29423 15.5 8.5 15.5C8.70577 15.5 8.90117 15.4531 9.07227 15.3818C9.2462 15.3094 9.40443 15.2075 9.54492 15.0811L9.56445 15.0635L9.58203 15.0439C9.70831 14.9036 9.80943 14.746 9.88184 14.5723C9.95313 14.4012 9.99998 14.2058 10 14C10 13.7943 9.95308 13.5988 9.88184 13.4277C9.80937 13.2538 9.70846 13.0956 9.58203 12.9551L9.56445 12.9355L9.54492 12.918L9.43555 12.8281C9.32383 12.7431 9.20262 12.6725 9.07227 12.6182ZM12.5713 12.6182C12.2496 12.4758 11.8851 12.4592 11.5537 12.5693L11.4277 12.6182C11.2538 12.6906 11.0956 12.7915 10.9551 12.918L10.9404 12.9316L10.9268 12.9463C10.6649 13.2228 10.5 13.6038 10.5 14C10.5 14.3962 10.6649 14.7772 10.9268 15.0537L10.9404 15.0684L10.9551 15.0811C11.0956 15.2075 11.2538 15.3094 11.4277 15.3818C11.5988 15.4531 11.7942 15.5 12 15.5C12.2058 15.5 12.4012 15.4531 12.5723 15.3818C12.7462 15.3094 12.9044 15.2075 13.0449 15.0811L13.0596 15.0684L13.0732 15.0537C13.3351 14.7772 13.5 14.3962 13.5 14C13.5 13.6038 13.3351 13.2228 13.0732 12.9463L13.0596 12.9316L13.0449 12.918L12.9355 12.8281C12.8281 12.7463 12.7117 12.6784 12.5869 12.625H12.5879C12.5856 12.624 12.5833 12.6231 12.5811 12.6221C12.5781 12.6208 12.5752 12.6194 12.5723 12.6182H12.5713Z"
                                                            fill="#F89A21"
                                                            stroke="#F89A21"
                                                          />
                                                        </svg>

                                                        <div className="flex flex-col w-[114px]">
                                                          <div>
                                                            {d("drawer4")}
                                                          </div>
                                                          <div className="font-bold">
                                                            {program.start_date
                                                              ? new Date(
                                                                program.start_date
                                                              ).toLocaleString(
                                                                "en-US",
                                                                {
                                                                  year: "numeric",
                                                                  month:
                                                                    "short",
                                                                }
                                                              )
                                                              : d("drawer7")}
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="flex gap-1.5 items-start self-stretch my-auto">
                                                        <svg
                                                          width="22"
                                                          height="22"
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

                                                        <div className="flex flex-col w-[114px]">
                                                          <div>
                                                            {d("drawer5")}
                                                          </div>
                                                          <div className="font-bold">
                                                            {program.price}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="flex gap-2 items-center mt-4 w-full">
                                                  {loadingStates.get(
                                                    program.program_id
                                                  ) ? (
                                                    <Spinner />
                                                  ) : (
                                                    <>
                                                      <div
                                                        className="flex justify-center px-4 py-4 text-base font-medium tracking-wide text-white bg-primary rounded-[64px] grow cursor-pointer"
                                                        onClick={() => {
                                                          getProgramData(
                                                            program.program_id
                                                          );
                                                        }}
                                                      >
                                                        <div className="self-stretch my-auto text-white">
                                                          {d("drawer6")}
                                                        </div>
                                                      </div>
                                                      <div
                                                        className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-4 py-0 my-auto w-14 h-14 border border-amber-500 border-solid rounded-[64px] cursor-pointer"
                                                        onClick={() => {
                                                          if (
                                                            tokenMainSite &&
                                                            user.id
                                                          ) {
                                                            // console.log("login");
                                                            if (
                                                              program.is_favorite
                                                            ) {
                                                              unFavorite(
                                                                program.program_id
                                                              );
                                                            } else if (
                                                              !program.is_favorite
                                                            ) {
                                                              favorite(
                                                                program.program_id
                                                              );
                                                            }
                                                          } else {
                                                            toast.error(
                                                              e("messageError")
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        {program.is_favorite ? (
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
                                                        ) : (
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
                                                        )}
                                                      </div>
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  )}
                                  {/* Pagination */}
                                  {programs?.programs?.data?.length > 0 && (
                                    <div className="flex  flex-col lg:flex-row gap-5 justify-between items-center my-5 w-full px-10">
                                      <div>
                                        <Pagination
                                          currentPage={currentPage}
                                          onPageChange={handlePageChange}
                                          disableNext={!hasMoreData}
                                          numberOfPages={
                                            programs?.programs?.pages
                                          }
                                        />
                                      </div>

                                      <div className="flex gap-2 items-center text-sm leading-none text-zinc-900">
                                        <div className="self-stretch my-auto text-zinc-900">
                                          {u("pagination")}
                                        </div>
                                        <div>
                                          <select
                                            name=""
                                            id=""
                                            value={limit}
                                            onChange={(e: any) => {
                                              setLimit(e.target.value);
                                              // dispatch(getAllUniversities({ page: currentPage, limt: e.target.value, language, recommended: recommended }));
                                              dispatch(
                                                getAllPrograms({
                                                  language,
                                                  limt: e.target.value,
                                                  universityId: universityId,
                                                  academic_degree: selectedDegree,
                                                  userId: user.id,
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
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col w-full max-md:max-w-full">
                              <div className="flex flex-col w-full max-md:max-w-full">
                                <div className="text-lg md:text-xl font-bold text-zinc-900 max-md:max-w-full">
                                  {program?.university?.name} :{" "}
                                  {program?.program_translations?.name} (
                                  {
                                    program?.program_translations
                                      ?.academic_degree
                                  }
                                  )
                                </div>
                                <div className="mt-2 text-sm tracking-wide text-justify text-zinc-900 max-md:max-w-full">
                                  {program?.university?.description}
                                </div>
                              </div>
                              <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                                <div className="overflow-hidden px-3.5 w-full text-lg md:text-xl border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-zinc-900 max-md:ps-5 max-md:max-w-full">
                                  {d("programDetails2")}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 mt-4 w-full text-sm tracking-wide max-md:max-w-full">
                                  <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.1671 2.37398V1.33398C11.1671 1.06065 10.9405 0.833984 10.6671 0.833984C10.3938 0.833984 10.1671 1.06065 10.1671 1.33398V2.33398H5.83381V1.33398C5.83381 1.06065 5.60715 0.833984 5.33381 0.833984C5.06048 0.833984 4.83381 1.06065 4.83381 1.33398V2.37398C3.03381 2.54065 2.16048 3.61398 2.02714 5.20732C2.01381 5.40065 2.17381 5.56065 2.36048 5.56065H13.6405C13.8338 5.56065 13.9938 5.39398 13.9738 5.20732C13.8405 3.61398 12.9671 2.54065 11.1671 2.37398Z"
                                          fill="#666666"
                                        />
                                        <path
                                          d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {d("start")} :{" "}
                                      {program.start_date
                                        ? new Date(
                                          program.start_date
                                        ).toLocaleString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                        })
                                        : d("drawer7")}
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.1671 2.37398V1.33398C11.1671 1.06065 10.9405 0.833984 10.6671 0.833984C10.3938 0.833984 10.1671 1.06065 10.1671 1.33398V2.33398H5.83381V1.33398C5.83381 1.06065 5.60715 0.833984 5.33381 0.833984C5.06048 0.833984 4.83381 1.06065 4.83381 1.33398V2.37398C3.03381 2.54065 2.16048 3.61398 2.02714 5.20732C2.01381 5.40065 2.17381 5.56065 2.36048 5.56065H13.6405C13.8338 5.56065 13.9938 5.39398 13.9738 5.20732C13.8405 3.61398 12.9671 2.54065 11.1671 2.37398Z"
                                          fill="#666666"
                                        />
                                        <path
                                          d="M13.3333 6.56055H2.66667C2.3 6.56055 2 6.86055 2 7.22721V11.3339C2 13.3339 3 14.6672 5.33333 14.6672H10.6667C13 14.6672 14 13.3339 14 11.3339V7.22721C14 6.86055 13.7 6.56055 13.3333 6.56055ZM6.14 12.1405C6.07333 12.2005 6 12.2472 5.92 12.2805C5.84 12.3139 5.75333 12.3339 5.66667 12.3339C5.58 12.3339 5.49333 12.3139 5.41333 12.2805C5.33333 12.2472 5.26 12.2005 5.19333 12.1405C5.07333 12.0139 5 11.8405 5 11.6672C5 11.4939 5.07333 11.3205 5.19333 11.1939C5.26 11.1339 5.33333 11.0872 5.41333 11.0539C5.57333 10.9872 5.76 10.9872 5.92 11.0539C6 11.0872 6.07333 11.1339 6.14 11.1939C6.26 11.3205 6.33333 11.4939 6.33333 11.6672C6.33333 11.8405 6.26 12.0139 6.14 12.1405ZM6.28 9.58721C6.24667 9.66721 6.2 9.74055 6.14 9.80721C6.07333 9.86721 6 9.91388 5.92 9.94721C5.84 9.98055 5.75333 10.0005 5.66667 10.0005C5.58 10.0005 5.49333 9.98055 5.41333 9.94721C5.33333 9.91388 5.26 9.86721 5.19333 9.80721C5.13333 9.74055 5.08667 9.66721 5.05333 9.58721C5.02 9.50721 5 9.42055 5 9.33388C5 9.24721 5.02 9.16055 5.05333 9.08055C5.08667 9.00055 5.13333 8.92721 5.19333 8.86055C5.26 8.80055 5.33333 8.75388 5.41333 8.72055C5.57333 8.65388 5.76 8.65388 5.92 8.72055C6 8.75388 6.07333 8.80055 6.14 8.86055C6.2 8.92721 6.24667 9.00055 6.28 9.08055C6.31333 9.16055 6.33333 9.24721 6.33333 9.33388C6.33333 9.42055 6.31333 9.50721 6.28 9.58721ZM8.47333 9.80721C8.40667 9.86721 8.33333 9.91388 8.25333 9.94721C8.17333 9.98055 8.08667 10.0005 8 10.0005C7.91333 10.0005 7.82667 9.98055 7.74667 9.94721C7.66667 9.91388 7.59333 9.86721 7.52667 9.80721C7.40667 9.68055 7.33333 9.50721 7.33333 9.33388C7.33333 9.16055 7.40667 8.98721 7.52667 8.86055C7.59333 8.80055 7.66667 8.75388 7.74667 8.72055C7.90667 8.64721 8.09333 8.64721 8.25333 8.72055C8.33333 8.75388 8.40667 8.80055 8.47333 8.86055C8.59333 8.98721 8.66667 9.16055 8.66667 9.33388C8.66667 9.50721 8.59333 9.68055 8.47333 9.80721Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {d("end")} :{" "}
                                      {program.start_date
                                        ? new Date(
                                          program.end_date
                                        ).toLocaleString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                        })
                                        : d("drawer7")}
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-center ">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {d("startStudy")} :{" "}
                                      {program?.program_translations?.startStudy?.join(
                                        ","
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col mt-4 w-full text-sm max-md:max-w-full">
                                <div className="overflow-hidden px-3.5 w-full text-lg md:text-xl border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-zinc-900 max-md:ps-5 max-md:max-w-full">
                                  {d("programDetails3")}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 mt-4 w-full">
                                  <div className="flex gap-3 items-center whitespace-nowrap">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {
                                        program?.program_translations
                                          ?.academic_degree
                                      }
                                    </div>
                                  </div>
                                  <div className="flex z-10 gap-10 max-md:-mr-1 max-md:max-w-full">
                                    <div className="flex gap-3 items-center">
                                      <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                        {" "}
                                        <svg
                                          width="14"
                                          height="14"
                                          viewBox="0 0 14 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                            fill="#666666"
                                          />
                                        </svg>
                                      </div>
                                      <div className="self-stretch my-auto text-zinc-900">
                                        {program?.major}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {program?.field}
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 mt-4 w-full tracking-wide max-md:pr-5 max-md:max-w-full">
                                  <div className="flex gap-3 items-center whitespace-nowrap">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {
                                        program?.program_translations
                                          ?.course_language
                                      }
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-center whitespace-nowrap">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {
                                        program?.program_translations
                                          ?.attendance_method
                                      }
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-center ">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {d("duration")} :{" "}
                                      {
                                        program?.program_translations
                                          ?.course_duration
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col mt-4 w-full text-sm max-md:max-w-full">
                                <div className="overflow-hidden px-3.5 w-full text-lg md:text-xl border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-zinc-900 max-md:ps-5 max-md:max-w-full">
                                  {d("programDetails4")}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-4 w-full tracking-wide max-md:max-w-full">
                                  <div className="flex gap-1 md:gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {t("IELTS")}: {program.ilts}
                                    </div>
                                  </div>
                                  <div className="flex gap-1 md:gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {t("TOEFL")}: {program.toefl}
                                    </div>
                                  </div>
                                  <div className="flex gap-1 md:gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {program.gpa === "0" ? (
                                        <>
                                          {t("GPA")} : {t("GPAValue")}
                                        </>
                                      ) : (
                                        <>
                                          {t("GPA")}: {program.gpa}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex gap-1 md:gap-3 items-center">
                                    <div className="flex items-center justify-center my-auto w-8 h-8 bg-white rounded-md border-solid border-[0.667px] border-zinc-100">
                                      {" "}
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M6.99967 0.333984C3.32634 0.333984 0.333008 3.32732 0.333008 7.00065C0.333008 10.674 3.32634 13.6673 6.99967 13.6673C10.673 13.6673 13.6663 10.674 13.6663 7.00065C13.6663 3.32732 10.673 0.333984 6.99967 0.333984ZM6.49967 4.33398C6.49967 4.06065 6.72634 3.83398 6.99967 3.83398C7.27301 3.83398 7.49967 4.06065 7.49967 4.33398V7.66732C7.49967 7.94065 7.27301 8.16732 6.99967 8.16732C6.72634 8.16732 6.49967 7.94065 6.49967 7.66732V4.33398ZM7.61301 9.92065C7.57967 10.0073 7.53301 10.074 7.47301 10.1407C7.40634 10.2007 7.33301 10.2473 7.25301 10.2807C7.17301 10.314 7.08634 10.334 6.99967 10.334C6.91301 10.334 6.82634 10.314 6.74634 10.2807C6.66634 10.2473 6.59301 10.2007 6.52634 10.1407C6.46634 10.074 6.41967 10.0073 6.38634 9.92065C6.35301 9.84065 6.33301 9.75398 6.33301 9.66732C6.33301 9.58065 6.35301 9.49398 6.38634 9.41398C6.41967 9.33398 6.46634 9.26065 6.52634 9.19398C6.59301 9.13398 6.66634 9.08732 6.74634 9.05398C6.90634 8.98732 7.09301 8.98732 7.25301 9.05398C7.33301 9.08732 7.40634 9.13398 7.47301 9.19398C7.53301 9.26065 7.57967 9.33398 7.61301 9.41398C7.64634 9.49398 7.66634 9.58065 7.66634 9.66732C7.66634 9.75398 7.64634 9.84065 7.61301 9.92065Z"
                                          fill="#666666"
                                        />
                                      </svg>
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                      {t("bank")}:{" "}
                                      {program.bank_statement
                                        ? t("required")
                                        : t("not_required")}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-6 items-start mt-6 w-full">
                          <div className="flex-1 shrink px-3.5 text-2xl font-bold whitespace-nowrap border-amber-500 border-solid basis-0 border-s-[5px] border-s-amber-500 text-zinc-900 max-md:pe-5">
                            {d("program")}
                          </div>
                          <div className="flex flex-wrap  gap-3 items-center text-sm font-medium tracking-wide text-slate-900">
                            <div
                              className={`overflow-hidden gap-2 self-stretch px-6 py-2 my-auto border-solid max-md:px-5 rounded-lg ${selectedDegree
                                ? "bg-white"
                                : "bg-amber-500 text-white"
                                }  border border-solid border-zinc-100 cursor-pointer hover:bg-gray`}
                              onClick={() => handleDegreeClick(null)}
                            >
                              {d("all")}{" "}
                              {data?.academic_degrees &&
                                data?.academic_degrees?.length > 0
                                ? data.academic_degrees.reduce(
                                  (total, degree) => total + degree.count,
                                  0
                                )
                                : "0"}
                            </div>
                            {data &&
                              data.academic_degrees.map((academic, index) => (
                                <div
                                  key={index}
                                  className={`gap-2 px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer hover:bg-gray ${selectedDegree === academic.academic_degree
                                    ? "bg-amber-500 text-white"
                                    : "bg-white"
                                    } `}
                                  onClick={() =>
                                    handleDegreeClick(academic.academic_degree)
                                  }
                                >
                                  {academic.academic_degree} ({academic.count})
                                </div>
                              ))}
                            {/* <div  className={`gap-2 px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer hover:bg-gray bg-amber-500 text-white `} >
                                                    Master.s 10
                                                    </div> */}
                          </div>
                          {/* Program cards */}
                          {programs.loading ? (
                            <div className="flex justify-center items-center w-full">
                              <Loader />
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center w-full">
                              {programs?.programs?.data?.map((program: any) => {
                                return (
                                  <div
                                    key={program.program_id}
                                    className="flex flex-col justify-center px-3 py-6 bg-white rounded-3xl border border-solid border-zinc-100 w-full"
                                  >
                                    <div className="flex flex-col w-full">
                                      <div className="text-xl font-bold text-zinc-900 truncate">
                                        {program.program_name}
                                      </div>
                                      <div className="flex flex-col mt-4 w-full text-sm tracking-wide text-slate-900">
                                        <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-t border-solid border-t-zinc-100">
                                          <div className="flex gap-1 xl:gap-10 justify-between items-center w-full">
                                            <div className="flex gap-1.5 items-start self-stretch my-auto">
                                              <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M12 2.5C17.2339 2.5 21.5 6.76614 21.5 12C21.5 14.7526 20.3143 17.2313 18.4219 18.9717L18.0596 19.3047L17.96 19.3857C17.8774 19.4546 17.7915 19.5219 17.7021 19.5889L17.4229 19.79L17.4189 19.793C17.3093 19.8713 17.3031 19.8826 17.2617 19.9062L17.249 19.9131L17.2373 19.9209C17.0488 20.0434 16.8797 20.1353 16.6621 20.2656C16.6167 20.2916 16.567 20.3231 16.54 20.3398L16.4668 20.3828L16.458 20.3867C16.2591 20.4909 16.0609 20.5862 15.8633 20.6709L15.8496 20.6758L15.8359 20.6826C15.7515 20.7248 15.6955 20.7524 15.6445 20.7715L15.6338 20.7764L15.623 20.7803C15.4282 20.8638 15.243 20.9164 14.9863 21.0098C14.8954 21.0357 14.8107 21.0663 14.748 21.0898C14.5489 21.1584 14.3477 21.1975 14.0791 21.2646V21.2656C14.025 21.2757 13.9796 21.2857 13.9531 21.293C13.9236 21.3011 13.9125 21.3038 13.9092 21.3047L13.8926 21.3076L13.875 21.3115C13.6174 21.3667 13.3556 21.4039 13.0781 21.4326L13.043 21.4365L13.0088 21.4453C12.9985 21.4479 12.992 21.4489 12.9863 21.4502H12.9854L12.9648 21.4521C12.6453 21.4812 12.3209 21.5 12 21.5C11.6894 21.5 11.3755 21.4817 11.0557 21.4541C11.0195 21.4459 10.9678 21.4385 10.9102 21.4346L10.9111 21.4326C10.6338 21.4039 10.3727 21.3667 10.1152 21.3115L10.0938 21.3066L10.0723 21.3037L9.92773 21.2695L9.91895 21.2666L9.91113 21.2646L9.20996 21.0801L9.20117 21.0771L9.19141 21.0752L9.00586 21.0117L8.99414 21.0078L8.98145 21.0039L8.6709 20.8975C8.56722 20.8598 8.46333 20.8199 8.35938 20.7773L8.3457 20.7715L8.15332 20.6826L8.13672 20.6748L8.11914 20.667L7.82227 20.5361L7.54102 20.3916C7.51336 20.3757 7.48272 20.3572 7.44727 20.3359C7.41083 20.3141 7.36855 20.2887 7.32812 20.2656L7.32031 20.2617L7.31152 20.2568L7.0293 20.0986C6.93798 20.0438 6.84912 19.9869 6.7627 19.9277H6.76172C6.72675 19.9029 6.69472 19.8799 6.66504 19.8594C6.63223 19.8367 6.60189 19.8155 6.57031 19.793H6.56934C6.36851 19.6451 6.19316 19.5215 6.03027 19.3857L6.00977 19.3691L5.9873 19.3535L5.86035 19.2461H5.85938C5.81532 19.2073 5.76906 19.1702 5.73047 19.1396V19.1211L5.56934 18.9727C3.68601 17.232 2.5 14.7528 2.5 12C2.5 6.76614 6.76614 2.5 12 2.5ZM12 3C7.03386 3 3 7.03386 3 12C3 14.4578 3.99667 16.6923 5.60449 18.3213L5.99609 18.7188L6.34863 18.2852C6.55155 18.0349 6.78322 17.8005 7.05273 17.5898L7.33496 17.3877L7.33691 17.3857C8.60312 16.5416 10.2944 16.1055 12.0078 16.1055C13.6141 16.1055 15.1952 16.4888 16.4209 17.2314L16.6611 17.3848L16.665 17.3877C17.0628 17.6499 17.392 17.9536 17.6465 18.2783L17.9971 18.7256L18.3955 18.3213C20.0033 16.6923 21 14.4578 21 12C21 7.03386 16.9661 3 12 3Z"
                                                  fill="#F89A21"
                                                  stroke="#F89A21"
                                                />
                                                <path
                                                  d="M12 7.42969C13.7379 7.42969 15.1591 8.79632 15.2461 10.5127L15.25 10.6797C15.24 12.4412 13.8621 13.8593 12.1123 13.9199H11.9639C10.12 13.8673 8.75 12.4345 8.75 10.6797C8.75 8.88583 10.2061 7.42969 12 7.42969Z"
                                                  fill="#F89A21"
                                                  stroke="#F89A21"
                                                />
                                              </svg>

                                              <div className="flex flex-col w-[114px]">
                                                <div>{d("drawer2")}</div>
                                                <div className="font-bold">
                                                  {program.course_duration}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex gap-1.5 items-start self-stretch my-auto">
                                              <svg
                                                width="22"
                                                height="22"
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

                                              <div className="flex flex-col w-[114px]">
                                                <div>{d("drawer3")}</div>
                                                <div className="font-bold">
                                                  {program.course_language}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex overflow-hidden flex-col justify-center py-4 w-full border-b border-solid border-b-zinc-100">
                                          <div className="flex gap-1 xl:gap-10 justify-between items-center w-full">
                                            <div className="flex gap-1.5 items-start self-stretch my-auto">
                                              <svg
                                                width="22"
                                                height="22"
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

                                              <div className="flex flex-col w-[114px]">
                                                <div>{d("drawer4")}</div>
                                                <div className="font-bold">
                                                  {program.start_date
                                                    ? new Date(
                                                      program.start_date
                                                    ).toLocaleString(
                                                      "en-US",
                                                      {
                                                        year: "numeric",
                                                        month: "short",
                                                      }
                                                    )
                                                    : d("drawer7")}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex gap-1.5 items-start self-stretch my-auto">
                                              <svg
                                                width="22"
                                                height="22"
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

                                              <div className="flex flex-col w-[114px]">
                                                <div>{d("drawer5")}</div>
                                                <div className="font-bold">
                                                  {program.price}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex gap-2 items-center mt-4 w-full">
                                        {loadingStates.get(
                                          program.program_id
                                        ) ? (
                                          <Spinner />
                                        ) : (
                                          <>
                                            <div
                                              className="flex justify-center px-4 py-4 text-base font-medium tracking-wide text-white bg-primary rounded-[64px] grow cursor-pointer"
                                              onClick={() => {
                                                getProgramData(
                                                  program.program_id
                                                );
                                              }}
                                            >
                                              <div className="self-stretch my-auto text-white">
                                                {d("drawer6")}
                                              </div>
                                            </div>
                                            <div
                                              className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-4 py-0 my-auto w-14 h-14 border border-amber-500 border-solid rounded-[64px] cursor-pointer"
                                              onClick={() => {
                                                if (tokenMainSite && user.id) {
                                                  if (program.is_favorite) {
                                                    unFavorite(
                                                      program.program_id
                                                    );
                                                  } else if (
                                                    !program.is_favorite
                                                  ) {
                                                    favorite(
                                                      program.program_id
                                                    );
                                                  }
                                                } else {
                                                  toast.error(
                                                    e("messageError")
                                                  );
                                                }
                                              }}
                                            >
                                              {program.is_favorite ? (
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
                                              ) : (
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
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Pagination */}
                          {programs?.programs?.data?.length > 0 && (
                            <div className="flex flex-col md:flex-row gap-5 justify-between items-center my-5 w-full ">
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
                                  {u("pagination")}
                                </div>
                                <div>
                                  <select
                                    name=""
                                    id=""
                                    value={limit}
                                    onChange={(e: any) => {
                                      setLimit(e.target.value);
                                      // dispatch(getAllUniversities({ page: currentPage, limt: e.target.value, language, recommended: recommended }));
                                      dispatch(
                                        getAllPrograms({
                                          language,
                                          limt: e.target.value,
                                          universityId: universityId,
                                          academic_degree: selectedDegree,
                                          userId: user.id,
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
                        </div>
                      </div>
                    ) : (
                      <div className="box-border flex flex-col gap-6 items-start p-5 mx-auto my-0 w-full max-w-[744px] max-sm:gap-4 max-sm:p-4">
                        <div className="flex relative flex-col gap-2 items-start w-full max-sm:gap-1.5">
                          <div className="box-border flex relative items-center px-3.5 py-0 w-full border-solid border-s-[5px] border-s-amber-500">
                            <h3 className="px-0 py-2 text-2xl font-bold text-zinc-900 max-md:text-xl max-sm:text-lg">
                              {university?.name}
                            </h3>
                          </div>
                          <div className="flex relative flex-col gap-4 items-start w-full max-sm:gap-3">
                            <div className="flex relative flex-col gap-2 items-start w-full max-sm:gap-1.5">
                              <div className="relative w-full text-base tracking-wide text-zinc-800">
                                {university?.description}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex relative flex-col gap-2 items-start w-full max-sm:gap-1.5">
                          <div className="box-border flex relative items-center px-3.5 py-0 w-full border-solid border-s-[5px] border-s-amber-500">
                            <div className="px-0 py-2 text-2xl font-bold text-zinc-900 max-md:text-xl max-sm:text-lg">
                              {d("importantPoints")}
                            </div>
                          </div>
                          <div className="flex relative flex-col gap-4 items-start w-full max-sm:gap-3">
                            <div className="flex relative flex-col gap-2 items-start w-full max-sm:gap-1.5">
                              <ul className="list-disc list-inside ps-3">
                                {university.main_points?.map(
                                  (point: string, index: number) => (
                                    <li key={index}>{point}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="flex relative flex-col gap-2 items-start w-full max-sm:gap-1.5">
                          <div className="box-border flex relative items-center px-3.5 py-0 w-full border-solid border-s-[5px] border-s-amber-500">
                            <div className="px-0 py-2 text-2xl font-bold text-zinc-900 max-md:text-xl max-sm:text-lg">
                              {d("programDetails6")}
                            </div>
                          </div>
                          <div className="flex relative flex-col gap-4 items-start w-full max-sm:gap-3">
                            <div className="flex relative flex-col gap-2 items-start w-full max-sm:gap-1.5">
                              <iframe
                                title="location"
                                src={university.location}
                                width="600"
                                height="350"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </div>
            </div>

            {openPopup && <AvailableOffices onClose={handleClose} />}
          </div>
        ) : university?.error?.statusCode === 500 ? (
          <ResultNotFound />
        ) : (
          <Loader />
        )}
      </>
    </>
  );
}

export default UniversityDetails;
