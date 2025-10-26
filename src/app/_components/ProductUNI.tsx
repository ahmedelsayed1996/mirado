"use client"
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import useCurrentLang from "../_hooks/useCurrentLang";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllUniversities } from "../reduxTool-kit/slices/universitiesSlice";
import SearchNotFound from "./SearchNotFound";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { AppDispatch } from "../store";
import useCleanPath from "../_hooks/useCleanPath";

function ProductUNI({ props, recommended }: {
  props: number; recommended: String;
}) {
  // const [universities, setUniversities] = useState<Object[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState("");
  const t = useTranslations("UniversitiesCard");
  const e = useTranslations("institutesCard");
  const { cleanPath } = useCleanPath();
  const language = useCurrentLang();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { tokenMainSite } = parseCookies();

  const universities = useSelector((state: any) => state.universities);
  const user = useSelector((state: any) => state.displayUser);
  // console.log("universities//", universities.universities?.length);

  const subscribe = async (universityId: number) => {
    setLoadingStates((prev) => new Map(prev).set(universityId, true));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language":language,
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
      dispatch(getAllUniversities({ language, recommended: recommended, userId: user.id, limt: props }))
      toast.success(t("addSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(universityId, false));
    }
  }

  const unSubscribe = async (universityId: number) => {
    setLoadingStates((prev) => new Map(prev).set(universityId, true));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/unsubscribe`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language":language,
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
      dispatch(getAllUniversities({ language, recommended: recommended, userId: user.id, limt: props }))
      toast.success(t("removeSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(universityId, false));
    }
  }

  useEffect(() => {
    const searchResult = localStorage.getItem("searchResult");
    const searchValue = searchResult ? JSON.parse(searchResult) : null;

    if (!searchValue) {
      dispatch(getAllUniversities({ page: currentPage, limt: props, language, recommended: recommended, userId: user.id }));
    } else {
      const { country, academicDegree, majors, search } = searchValue
      const row = {
        "language": language,
        "search": search,
        "country": country,
        "majors": majors,
        "academic_degree": academicDegree,
        "userId": user.id,
      }
      dispatch(getAllUniversities(row));
      setTimeout(() => localStorage.removeItem("searchResult"), 3000);

    }
  }, [user, currentPage, dispatch, language, props, recommended]);


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
    <>

      <div className="flex flex-wrap gap-6 justify-center md:mx-4 ">
        {universities.loading ? <Loader /> : <>
          {universities?.universities?.data?.length > 0 ? universities?.universities?.data?.map((university: any, index: number) => (
            <div
              key={index}
              className="flex flex-col p-5 rounded-2xl border border-[#EBEBEB] border-solid shadow-xl w-full md:w-[430px] basis-10/12 md:basis-1/12 justify-between"
            >
              <div className="flex overflow-hidden relative flex-col py-2.5 pr-5 pl-3.5 min-h-[224px] max-md:pr-5 max-md:max-w-full z-0">
                {university.files ?
                  <Image
                    src={university.files?.length == 0 ? "/images/institut.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(university.files[0])}`}
                    fill={true} alt={university.name} className="rounded-2xl" /> :
                  <Image
                    src="/images/institut.png"
                    fill={true} alt={university.name} className="rounded-2xl" />
                }
                {/* {university.files ?
                  <Image
                    src={university.files?.length == 0 ? "/images/institut.png" : `${process.env.NEXT_PUBLIC_SERVER_URL}/${university.files[0]}`}
                    fill={true} alt={university.name} className="rounded-2xl" /> :
                  <Image
                    src="/images/institut.png"
                    fill={true} alt={university.name} className="rounded-2xl" />
                } */}

                {/* <div
                  className={`relative justify-center self-start px-2.5 py-2 text-base font-medium tracking-tight leading-6 text-center text-white bg-primary rounded-[111px] max-md:px-5`}
                >
                  {t("scolershipIcon")}
                </div> */}
              </div>
              <div className="flex gap-4 justify-between mt-3.5 w-full text-sm leading-6 text-right text-zinc-500 max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-1">
                  {university.recommend ? <>
                    <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.00366 3.88268C8.59929 2.37244 10.7366 2.37244 11.3323 3.88268L12.4043 6.60082C12.4337 6.67532 12.4927 6.73429 12.5672 6.76367L15.2853 7.83569C16.7955 8.43132 16.7955 10.5687 15.2853 11.1643L12.5672 12.2363C12.4927 12.2657 12.4337 12.3247 12.4043 12.3992L11.3323 15.1173C10.7366 16.6276 8.59929 16.6276 8.00366 15.1173L6.93164 12.3992C6.90226 12.3247 6.84329 12.2657 6.76879 12.2363L4.05064 11.1643C2.54041 10.5687 2.54041 8.43132 4.05065 7.83569L6.76879 6.76367C6.84329 6.73429 6.90226 6.67532 6.93164 6.60082L8.00366 3.88268ZM9.93688 4.43301C9.84064 4.18899 9.4953 4.189 9.39906 4.43301L8.32704 7.15115C8.14519 7.61224 7.78021 7.97722 7.31912 8.15907L4.60098 9.23109C4.35696 9.32733 4.35697 9.67267 4.60098 9.76891L7.31912 10.8409C7.78021 11.0228 8.14519 11.3878 8.32704 11.8488L9.39906 14.567C9.4953 14.811 9.84064 14.811 9.93688 14.567L11.0089 11.8488C11.1907 11.3878 11.5557 11.0228 12.0168 10.8409L14.735 9.76891C14.979 9.67267 14.979 9.32733 14.735 9.23109L12.0168 8.15907C11.5557 7.97722 11.1907 7.61224 11.0089 7.15116L9.93688 4.43301ZM16.4587 13.573C16.8915 12.4757 18.4444 12.4757 18.8772 13.573L19.6459 15.5221L21.595 16.2908C22.6923 16.7235 22.6923 18.2765 21.595 18.7092L19.6459 19.4779L18.8772 21.427C18.4444 22.5243 16.8915 22.5243 16.4587 21.427L15.69 19.4779L13.7409 18.7092C12.6436 18.2765 12.6436 16.7235 13.7409 16.2908L15.69 15.5221L16.4587 13.573ZM17.668 14.5953L17.0535 16.1533C16.9214 16.4883 16.6562 16.7534 16.3212 16.8856L14.7633 17.5L16.3212 18.1144C16.6562 18.2466 16.9214 18.5117 17.0535 18.8467L17.668 20.4047L18.2824 18.8467C18.4145 18.5117 18.6797 18.2466 19.0147 18.1144L20.5726 17.5L19.0147 16.8856C18.6797 16.7534 18.4145 16.4883 18.2824 16.1533L17.668 14.5953Z" fill="#6C7278" />
                    </svg>
                    <div> {t("viewsLable2")}</div>
                  </> : ""}


                </div>
                <div className="flex gap-1 items-center">
                  <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.60888 15.7957C2.75895 14.6915 2.33398 14.1394 2.33398 12.5C2.33398 10.8606 2.75895 10.3085 3.60888 9.20433C5.30595 6.99956 8.1521 4.5 12.334 4.5C16.5159 4.5 19.362 6.99956 21.0591 9.20433C21.909 10.3085 22.334 10.8606 22.334 12.5C22.334 14.1394 21.909 14.6915 21.0591 15.7957C19.362 18.0004 16.5159 20.5 12.334 20.5C8.1521 20.5 5.30595 18.0004 3.60888 15.7957Z" stroke="#6C7278" strokeWidth="1.5" />
                    <path d="M15.334 12.5C15.334 14.1569 13.9908 15.5 12.334 15.5C10.6771 15.5 9.33398 14.1569 9.33398 12.5C9.33398 10.8431 10.6771 9.5 12.334 9.5C13.9908 9.5 15.334 10.8431 15.334 12.5Z" stroke="#6C7278" strokeWidth="1.5" />
                  </svg>
                  <div>{university.visites} {t("viewsLable1")} </div>
                </div>
              </div>

              <div className="flex gap-2 md:gap-4 mt-3.5  ">
                <div className="flex w-2/6 lg:w-2/6 justify-center items-center p-2.5 bg-white rounded-xl border border-[#EBEBEB] border-solid h-[70px] lg:h-[75px] relative">
                  <Image
                    src={!university.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(university.logo)}`}
                    fill={true}
                    alt={university.name}
                    className="rounded-xl"
                  />
                  {/* <img src={!university.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_SERVER_URL}/${university.logo}`}  alt={university.name}
                    className="rounded-xl"/> */}
                </div>
                <div className="flex w-4/6 flex-col my-auto text-start">
                  <div className="text-xl font-medium text-gray-900 line-clamp-1">
                    {university.name}
                  </div>
                  <div className="flex gap-1 mt-3 text-base tracking-wide leading-6 text-zinc-500">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.25 9.14329C0.25 4.24427 4.15501 0.25 9 0.25C13.845 0.25 17.75 4.24427 17.75 9.14329C17.75 11.5084 17.076 14.0479 15.8844 16.2419C14.6944 18.4331 12.9556 20.3372 10.7805 21.3539C9.65057 21.882 8.34943 21.882 7.21949 21.3539C5.04437 20.3372 3.30562 18.4331 2.11556 16.2419C0.924029 14.0479 0.25 11.5084 0.25 9.14329ZM9 1.75C5.00843 1.75 1.75 5.04748 1.75 9.14329C1.75 11.2404 2.35263 13.5354 3.4337 15.526C4.51624 17.5192 6.04602 19.1496 7.85465 19.995C8.58205 20.335 9.41795 20.335 10.1454 19.995C11.954 19.1496 13.4838 17.5192 14.5663 15.526C15.6474 13.5354 16.25 11.2404 16.25 9.14329C16.25 5.04748 12.9916 1.75 9 1.75ZM9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75ZM5.25 9C5.25 6.92893 6.92893 5.25 9 5.25C11.0711 5.25 12.75 6.92893 12.75 9C12.75 11.0711 11.0711 12.75 9 12.75C6.92893 12.75 5.25 11.0711 5.25 9Z" fill="#1E4C83" />
                    </svg>

                    <div className="line-clamp-1 text-sm">
                      {`
                      ${university.country_name ? `${university.country_name}` : ""}
                      ${university.state_name ? ` - ${university.state_name}` : ""}
                      ${university.city_name ? ` - ${university.city_name}` : ""}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3.5 text-base tracking-wide text-start text-ellipsis text-zinc-500 max-md:max-w-full line-clamp-2">
                {university.description}
              </div>
              <div className="flex gap-5 justify-center px-2 mt-3.5 text-sm leading-6 text-start   max-md:px-5">
                <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                  <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.2433 0.435023C12.5553 0.707434 12.5874 1.18122 12.315 1.49325L4.45786 10.4933C4.31543 10.6564 4.10943 10.75 3.89287 10.75C3.6763 10.75 3.47031 10.6564 3.32788 10.4933L0.185023 6.89325C-0.0873878 6.58122 -0.0552667 6.10743 0.256767 5.83502C0.568802 5.56261 1.04259 5.59473 1.315 5.90677L3.89287 8.8596L11.185 0.506767C11.4574 0.194733 11.9312 0.162612 12.2433 0.435023Z" fill="#141522" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.2675 0.519463C17.5674 0.805132 17.579 1.27986 17.2933 1.57981L8.72162 10.5798C8.57013 10.7389 8.35653 10.8235 8.13721 10.8114C7.91789 10.7993 7.71489 10.6917 7.58182 10.5169L7.1535 9.95442C6.90256 9.62487 6.96629 9.15429 7.29584 8.90336C7.57895 8.68778 7.96614 8.70443 8.22874 8.92235L16.2071 0.545309C16.4928 0.245366 16.9675 0.233794 17.2675 0.519463Z" fill="#141522" />
                  </svg>

                  <div className="flex flex-col justify-center">
                    <div className="text-gray-900"> {t("cardFoterUni3")}</div>
                    <div className="font-medium text-[#ACB5BB]">{university.major_count}</div>
                  </div>
                </div>
                <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7309 3.01063L14.4909 6.53063C14.7309 7.02063 15.3709 7.49063 15.9109 7.58063L19.1009 8.11062C21.1409 8.45062 21.6209 9.93062 20.1509 11.3906L17.6709 13.8706C17.2509 14.2906 17.0209 15.1006 17.1509 15.6806L17.8609 18.7506C18.4209 21.1806 17.1309 22.1206 14.9809 20.8506L11.9909 19.0806C11.4509 18.7606 10.5609 18.7606 10.0109 19.0806L7.02089 20.8506C4.88089 22.1206 3.58089 21.1706 4.14089 18.7506L4.85089 15.6806C4.98089 15.1006 4.75089 14.2906 4.33089 13.8706L1.85089 11.3906C0.390886 9.93062 0.860886 8.45062 2.90089 8.11062L6.09089 7.58063C6.62089 7.49063 7.26089 7.02063 7.50089 6.53063L9.26089 3.01063C10.2209 1.10063 11.7809 1.10063 12.7309 3.01063Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex flex-col justify-center">
                    <div className="text-gray-900">
                      {t("cardFoterUni2")}
                    </div>
                    <div className="font-medium text-[#ACB5BB] ">{university?.rating ? university?.rating : "N/A"} </div>
                  </div>
                </div>
                <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.69513 0.750001H14.8049C16.1725 0.74998 17.2748 0.749963 18.1418 0.866524C19.0419 0.98754 19.7997 1.24643 20.4017 1.84835C21.0036 2.45027 21.2625 3.20814 21.3835 4.10825C21.5 4.97522 21.5 6.07754 21.5 7.44513V11.5549C21.5 12.9225 21.5 14.0248 21.3835 14.8918C21.2625 15.7919 21.0036 16.5497 20.4017 17.1516C19.9037 17.6496 19.2969 17.9146 18.5861 18.0593C17.8959 18.1998 17.0633 18.2352 16.0776 18.2457L16.072 18.2458L15.8476 18.2464C15.7508 18.5506 15.5935 18.84 15.3755 19.0958C15.2444 19.2496 15.1652 19.4408 15.1491 19.6423C15.053 20.8466 14.0966 21.803 12.8923 21.8991C12.6909 21.9152 12.4996 21.9944 12.3458 22.1255C11.4262 22.9091 10.0738 22.9091 9.1542 22.1255C9.00039 21.9944 8.80915 21.9152 8.60771 21.8991C7.40336 21.803 6.44701 20.8466 6.3509 19.6423C6.33483 19.4409 6.25561 19.2496 6.12454 19.0958C5.90682 18.8403 5.74959 18.5514 5.65285 18.2477C4.61252 18.2407 3.7417 18.2125 3.02635 18.0811C2.26836 17.9418 1.62328 17.6766 1.09835 17.1517C0.496434 16.5497 0.237541 15.7919 0.116524 14.8918C-3.6709e-05 14.0248 -2.00767e-05 12.9225 5.46497e-07 11.5549V7.44513C-2.00767e-05 6.07754 -3.6709e-05 4.97522 0.116524 4.10825C0.23754 3.20814 0.496434 2.45027 1.09835 1.84835C1.70027 1.24643 2.45814 0.98754 3.35825 0.866524C4.22522 0.749963 5.32754 0.74998 6.69513 0.750001ZM5.65434 16.7476C5.7512 16.4456 5.90794 16.1584 6.12454 15.9042C6.25561 15.7504 6.33483 15.5592 6.3509 15.3577C6.44701 14.1534 7.40336 13.197 8.60771 13.1009C8.80915 13.0848 9.00039 13.0056 9.1542 12.8745C10.0738 12.0909 11.4262 12.0909 12.3458 12.8745C12.4996 13.0056 12.6909 13.0848 12.8923 13.1009C14.0966 13.197 15.053 14.1534 15.1491 15.3577C15.1652 15.5592 15.2444 15.7504 15.3755 15.9042C15.5918 16.158 15.7484 16.4448 15.8453 16.7464L16.0644 16.7457C17.0497 16.7352 17.7522 16.6983 18.2868 16.5895C18.8013 16.4847 19.109 16.3229 19.341 16.091C19.6178 15.8142 19.7982 15.4257 19.8969 14.6919C19.9984 13.9365 20 12.9354 20 11.5V7.5C20 6.06458 19.9984 5.06347 19.8969 4.30812C19.7982 3.57435 19.6178 3.18577 19.341 2.90901C19.0642 2.63225 18.6757 2.4518 17.9419 2.35315C17.1865 2.25159 16.1854 2.25 14.75 2.25H6.75C5.31458 2.25 4.31347 2.25159 3.55812 2.35315C2.82435 2.4518 2.43577 2.63225 2.15901 2.90901C1.88225 3.18577 1.7018 3.57435 1.60315 4.30812C1.50159 5.06347 1.5 6.06459 1.5 7.5V11.5C1.5 12.9354 1.50159 13.9365 1.60315 14.6919C1.7018 15.4257 1.88225 15.8142 2.15901 16.091C2.40246 16.3344 2.73054 16.5016 3.29735 16.6057C3.86753 16.7105 4.61325 16.7404 5.65434 16.7476ZM7 5.5C7 5.08579 7.33579 4.75 7.75 4.75H13.75C14.1642 4.75 14.5 5.08579 14.5 5.5C14.5 5.91421 14.1642 6.25 13.75 6.25H7.75C7.33579 6.25 7 5.91421 7 5.5ZM5 9C5 8.58579 5.33579 8.25 5.75 8.25H15.75C16.1642 8.25 16.5 8.58579 16.5 9C16.5 9.41421 16.1642 9.75 15.75 9.75H5.75C5.33579 9.75 5 9.41421 5 9ZM11.3729 14.0162C11.014 13.7103 10.486 13.7103 10.1271 14.0162C9.73307 14.352 9.24312 14.555 8.72703 14.5961C8.25695 14.6337 7.88366 15.0069 7.84615 15.477C7.80496 15.9931 7.60202 16.4831 7.26621 16.8771C6.96034 17.236 6.96034 17.764 7.26621 18.1229C7.60202 18.5169 7.80496 19.0069 7.84615 19.523C7.88366 19.9931 8.25695 20.3663 8.72703 20.4039C9.24312 20.445 9.73307 20.648 10.1271 20.9838C10.486 21.2897 11.014 21.2897 11.3729 20.9838C11.7669 20.648 12.2569 20.445 12.773 20.4039C13.2431 20.3663 13.6163 19.9931 13.6539 19.523C13.695 19.0069 13.898 18.5169 14.2338 18.1229C14.5397 17.764 14.5397 17.236 14.2338 16.8771C13.898 16.4831 13.695 15.9931 13.6539 15.477C13.6163 15.0069 13.2431 14.6337 12.773 14.5961C12.2569 14.555 11.7669 14.352 11.3729 14.0162ZM11.7383 15.9517C12.0411 15.6691 12.5157 15.6854 12.7983 15.9883C13.0809 16.2911 13.0646 16.7657 12.7617 17.0483L10.6189 19.0483C10.3307 19.3172 9.88356 19.3172 9.59541 19.0483L8.73826 18.2483C8.43545 17.9657 8.41908 17.4911 8.70171 17.1883C8.98433 16.8854 9.45893 16.8691 9.76174 17.1517L10.1071 17.4741L11.7383 15.9517Z" fill="#1C274D" />
                  </svg>
                  <div className="flex flex-col justify-center">
                    <div className=" text-gray-900"> {t("cardFoterUni4")}</div>
                    <div className="font-medium text-[#ACB5BB]">{university.program_count}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 mt-3.5 max-md:flex-wrap max-md:max-w-full items-center">
                {/* {isLoading ? <Spinner /> : */}
                {loadingStates.get(university.id) ? <Spinner /> :
                  <>
                    <Link
                      href={`/${language}/university/${university.id}`}
                      className=" grow"
                      onClick={() => setLoadingStates((prev) => new Map(prev).set(university.id, true))}
                    >
                      <button className="flex-1 justify-center px-5 py-2  text-white bg-primary rounded-xl max-md:px-5 border hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 grow w-full">
                        {t("cardButtonUni")}
                      </button>
                    </Link>
                    <div className="flex justify-center items-center px-4 py-1 rounded-2xl border border-gray hover:border-primary border-solid cursor-pointer" onClick={() => {
                      if (tokenMainSite && user.id) {
                        // console.log("login");
                        if (university.is_notified) {
                          unSubscribe(university.id);
                        } else if (!university.is_notified) {
                          subscribe(university.id);
                        }
                      } else {
                        toast.error(e("messageError"));
                      }

                    }}>
                      {university.is_notified ? <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path opacity="0.5" d="M23.1552 10.8743V11.7251C23.1552 12.7462 23.4466 13.7444 23.9927 14.5939L25.3308 16.6757C26.5531 18.5773 25.62 21.162 23.4941 21.7633C17.9329 23.3364 12.0671 23.3364 6.50585 21.7633C4.38001 21.162 3.44691 18.5773 4.66918 16.6757L6.00734 14.5939C6.55341 13.7444 6.8448 12.7462 6.8448 11.7251V10.8743C6.8448 6.20294 10.496 2.41602 15 2.41602C19.504 2.41602 23.1552 6.20294 23.1552 10.8743Z" fill="#F89A21" />
                        <path d="M15.9062 7.25C15.9062 6.74949 15.5005 6.34375 15 6.34375C14.4995 6.34375 14.0938 6.74949 14.0938 7.25V12.0833C14.0938 12.5838 14.4995 12.9896 15 12.9896C15.5005 12.9896 15.9062 12.5838 15.9062 12.0833V7.25Z" fill="#F89A21" />
                        <path d="M9.25195 22.4082C10.0385 24.8311 12.3145 26.5827 14.9996 26.5827C17.6847 26.5827 19.9606 24.8311 20.7472 22.4082C16.9465 23.1214 13.0527 23.1214 9.25195 22.4082Z" fill="#F89A21" />
                      </svg> : <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path opacity="0.5" d="M23.1552 11.3743V12.2251C23.1552 13.2462 23.4466 14.2444 23.9927 15.0939L25.3308 17.1757C26.5531 19.0773 25.62 21.662 23.4941 22.2633C17.9329 23.8364 12.0671 23.8364 6.50585 22.2633C4.38001 21.662 3.44691 19.0773 4.66918 17.1757L6.00734 15.0939C6.55341 14.2444 6.8448 13.2462 6.8448 12.2251V11.3743C6.8448 6.70294 10.496 2.91602 15 2.91602C19.504 2.91602 23.1552 6.70294 23.1552 11.3743Z" fill="#8D93A5" />
                        <path d="M15.9062 7.75C15.9062 7.24949 15.5005 6.84375 15 6.84375C14.4995 6.84375 14.0938 7.24949 14.0938 7.75V12.5833C14.0938 13.0838 14.4995 13.4896 15 13.4896C15.5005 13.4896 15.9062 13.0838 15.9062 12.5833V7.75Z" fill="#8D93A5" />
                        <path d="M9.25195 22.9082C10.0385 25.3311 12.3145 27.0827 14.9996 27.0827C17.6847 27.0827 19.9606 25.3311 20.7472 22.9082C16.9465 23.6214 13.0527 23.6214 9.25195 22.9082Z" fill="#8D93A5" />
                      </svg>}
                    </div>
                  </>
                }
              </div>


            </div>
          )) : <SearchNotFound head="University" />}
        </>}

      </div>
      <div className="flex flex-wrap justify-center my-5">
        {pathname !== `/${language}` && universities?.universities?.data?.length > 0 && <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          disableNext={!hasMoreData}
          numberOfPages={universities?.universities?.pages}
        />}
      </div>
    </>
  );
}

export default ProductUNI;
