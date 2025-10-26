"use client"
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import useCurrentLang from "../_hooks/useCurrentLang";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguageSchools } from "../reduxTool-kit/slices/languageSchoolsSlice";
import SearchNotFound from "./SearchNotFound";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { AppDispatch } from "../store";
import useCleanPath from "../_hooks/useCleanPath";

function ProductINS({ props, bg, recommended }: {
  props: number; recommended: String; bg: String;
}) {

  const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState("");
  const t = useTranslations("institutesCard");
  const language = useCurrentLang();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { tokenMainSite } = parseCookies();
  const { cleanPath } = useCleanPath();
  const languageSchools = useSelector((state: any) => state.languageSchools);
  const user = useSelector((state: any) => state.displayUser);
  // console.log("languageSchools//", languageSchools);


  const subscribe = async (schoolId: number) => {
    setLoadingStates((prev) => new Map(prev).set(schoolId, true));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`
        },
        body: JSON.stringify({
          "userId": user.id,
          "targetId": schoolId,
          "targetType": "INSTITUTE"
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      dispatch(getAllLanguageSchools({ language, recommended: recommended, limt: props, userId: user.id }))
      toast.success(t("addSubscribe"));
    } catch (error: any) {
      toast.error(error.message, {
        toastId: 'error1',
      });
      setError(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(schoolId, false));
    }
  }

  const unSubscribe = async (schoolId: number) => {
    setLoadingStates((prev) => new Map(prev).set(schoolId, true));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/unsubscribe`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`
        },
        body: JSON.stringify({
          "userId": user.id,
          "targetId": schoolId,
          "targetType": "INSTITUTE"
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      dispatch(getAllLanguageSchools({ language, recommended: recommended, limt: props, userId: user.id }))
      toast.success(t("removeSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(schoolId, false));
    }
  }

  useEffect(() => {
    const searchResult = localStorage.getItem("searchResult");
    // const searchValue = JSON.parse(searchResult);
    const searchValue = searchResult ? JSON.parse(searchResult) : null;
    // if (hasMoreData) {
    //   console.log("has more data" , hasMoreData);
    //   dispatch(getAllLanguageSchools({ page: currentPage, language, recommended: recommended, limt: props, userId: user.id }));
    // } 

    if (!searchValue) {
      dispatch(getAllLanguageSchools({ page: currentPage, language, recommended: recommended, limt: props, userId: user.id }))
    } else {
      const { country, state, city, search, languageStudy } = searchValue;
      const row = {
        "language": language,
        "search": search,
        "country": country,
        "state": state,
        "city": city,
        "languageStudy": languageStudy,
        "userId": user.id,
      }
      dispatch(getAllLanguageSchools(row));
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

  // useEffect(() => {
  //   console.log("hasn't more data" , hasMoreData);
  //   if (hasMoreData) {
  //     console.log("has more data" , hasMoreData);
  //     dispatch(getAllLanguageSchools({ page: currentPage, language, recommended: recommended, limt: props, userId: user.id }));
  //   }
  // }, [currentPage]);

  return (<>
    <div className={`flex flex-wrap gap-6 justify-center md:px-4 bg-${bg}`}>
      {languageSchools?.loading ? <Loader /> :
        <>
          {languageSchools?.languageSchools?.data?.length > 0 ? languageSchools?.languageSchools?.data?.map((languageSchool: any, index: number) => (
            <div
              key={index}
              className="flex flex-col p-5 rounded-2xl border border-[#EBEBEB] border-solid shadow-xl w-full md:w-[430px] basis-10/12 md:basis-1/12 justify-between"
            >
              <div className="flex overflow-hidden relative flex-col py-2.5 pr-5 pl-3.5 min-h-[224px] max-md:pr-5 max-md:max-w-full z-0">
                {languageSchool.files?.length === 0 ?
                  <Image
                    src="/images/institut.png"
                    fill={true} alt={languageSchool.name} className="rounded-2xl" /> :
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(languageSchool?.files[0])}`}
                    fill={true} alt={languageSchool.name} className="rounded-2xl" />
                }

                {/* <Image
                  src={languageSchool.files?.length === 0 ? "/images/institut.png" :
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/${languageSchool.files[0]}`}
                  fill={true} alt={languageSchool.name} className="rounded-2xl" /> */}
                {languageSchool.offer ?
                  <div
                    className={`relative justify-center self-start px-2.5 py-2 text-base font-medium tracking-tight leading-6 text-center text-white bg-primary rounded-[111px] max-md:px-5`}
                  >
                    {t("offerIcon")} {languageSchool.offer}%
                  </div> : ""}
              </div>
              <div className="flex gap-4 justify-between mt-3.5 w-full text-sm leading-6 text-right text-zinc-500 max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-1">
                  {languageSchool.recommend ? <>
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
                  <div>{languageSchool.visites} {t("viewsLable1")} </div>
                </div>
              </div>
              <div className="flex gap-4 mt-3.5 ">
                <div className="flex justify-center items-center p-2.5 bg-white rounded-xl border border-[#EBEBEB] border-solid h-[60px] w-[60px] relative">
                  {/* <Image
                  src="/images/university.png"
                  width={80}
                  height={80}
                  alt="stars"
                /> */}
                  <Image
                    src={!languageSchool.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(languageSchool.logo)}`}
                    fill={true}
                    alt={languageSchool.name}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col my-auto text-start">
                  <div className="text-xl font-medium text-gray-900 line-clamp-1">
                    {languageSchool.name}
                  </div>
                  <div className="flex gap-1 mt-3 text-base tracking-wide leading-6 text-zinc-500 items-center">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.25 9.14329C0.25 4.24427 4.15501 0.25 9 0.25C13.845 0.25 17.75 4.24427 17.75 9.14329C17.75 11.5084 17.076 14.0479 15.8844 16.2419C14.6944 18.4331 12.9556 20.3372 10.7805 21.3539C9.65057 21.882 8.34943 21.882 7.21949 21.3539C5.04437 20.3372 3.30562 18.4331 2.11556 16.2419C0.924029 14.0479 0.25 11.5084 0.25 9.14329ZM9 1.75C5.00843 1.75 1.75 5.04748 1.75 9.14329C1.75 11.2404 2.35263 13.5354 3.4337 15.526C4.51624 17.5192 6.04602 19.1496 7.85465 19.995C8.58205 20.335 9.41795 20.335 10.1454 19.995C11.954 19.1496 13.4838 17.5192 14.5663 15.526C15.6474 13.5354 16.25 11.2404 16.25 9.14329C16.25 5.04748 12.9916 1.75 9 1.75ZM9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75ZM5.25 9C5.25 6.92893 6.92893 5.25 9 5.25C11.0711 5.25 12.75 6.92893 12.75 9C12.75 11.0711 11.0711 12.75 9 12.75C6.92893 12.75 5.25 11.0711 5.25 9Z" fill="#1E4C83" />
                    </svg>
                    {/* {country.id === languageSchool.length ? "-" : ""} {country.name}  */}

                    {/* {languageSchool.countries?.map((country, index) => (
                      <div key={index} className="flex flex-wrap gap-1">
                        <div className=" line-clamp-1 text-sm">
                          {languageSchool.countries?.length < 3 ? country.name : "Available in more than one country"  }
                           
                        </div>
                      </div>
                    ))} */}
                    <div className="flex gap-1 line-clamp-1">
                      {languageSchool.countries?.length <= 2 ? (
                        languageSchool.countries.map((country: any, index: number) => (
                          <div key={index} className="flex  gap-1">
                            <div className="line-clamp-1 text-sm ">
                              {country.name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm">
                          {t("viewsLable3")}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
              <div className="mt-3.5 text-base tracking-wide text-start text-ellipsis text-zinc-500 max-md:max-w-full line-clamp-2">
                {languageSchool.description}
              </div>
              <div className="flex gap-5  px-2 mt-3.5 text-sm leading-6 text-start ">
                <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5 22.5L2.5 22.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M17.5 22.5V6.5C17.5 4.61438 17.5 3.67157 16.9142 3.08579C16.3284 2.5 15.3856 2.5 13.5 2.5H11.5C9.61438 2.5 8.67157 2.5 8.08579 3.08579C7.5 3.67157 7.5 4.61438 7.5 6.5V22.5" stroke="#1C274C" strokeWidth="1.5" />
                    <path d="M20.75 12C20.75 12.4142 21.0858 12.75 21.5 12.75C21.9142 12.75 22.25 12.4142 22.25 12H20.75ZM20.6111 8.83706L20.1945 9.46066L20.1945 9.46066L20.6111 8.83706ZM21.1629 9.38886L20.5393 9.80554L20.5393 9.80554L21.1629 9.38886ZM22.25 16C22.25 15.5858 21.9142 15.25 21.5 15.25C21.0858 15.25 20.75 15.5858 20.75 16H22.25ZM18 9.25C18.7178 9.25 19.1998 9.25091 19.5672 9.28828C19.922 9.32438 20.086 9.3882 20.1945 9.46066L21.0278 8.21346C20.6318 7.94886 20.1925 7.84415 19.719 7.79598C19.258 7.74909 18.6866 7.75 18 7.75V9.25ZM22.25 12C22.25 11.3134 22.2509 10.742 22.204 10.281C22.1559 9.80755 22.0511 9.36818 21.7865 8.97218L20.5393 9.80554C20.6118 9.91399 20.6756 10.078 20.7117 10.4328C20.7491 10.8002 20.75 11.2822 20.75 12H22.25ZM20.1945 9.46066C20.331 9.55186 20.4481 9.66905 20.5393 9.80554L21.7865 8.97218C21.5859 8.67191 21.3281 8.41409 21.0278 8.21346L20.1945 9.46066ZM20.75 16V22.5H22.25V16H20.75Z" fill="#1C274C" />
                    <path d="M4.38886 8.83706L4.80554 9.46066L4.80554 9.46066L4.38886 8.83706ZM3.83706 9.38886L4.46066 9.80554L4.46066 9.80554L3.83706 9.38886ZM4.25 20.5C4.25 20.0858 3.91421 19.75 3.5 19.75C3.08579 19.75 2.75 20.0858 2.75 20.5H4.25ZM2.75 16.5C2.75 16.9142 3.08579 17.25 3.5 17.25C3.91421 17.25 4.25 16.9142 4.25 16.5H2.75ZM7 7.75C6.31338 7.75 5.74196 7.74909 5.28102 7.79598C4.80755 7.84415 4.36818 7.94886 3.97218 8.21346L4.80554 9.46066C4.91399 9.3882 5.07796 9.32438 5.43283 9.28828C5.80023 9.25091 6.28216 9.25 7 9.25V7.75ZM4.25 12C4.25 11.2822 4.25091 10.8002 4.28828 10.4328C4.32438 10.078 4.3882 9.91399 4.46066 9.80554L3.21346 8.97218C2.94886 9.36818 2.84415 9.80755 2.79598 10.281C2.74909 10.742 2.75 11.3134 2.75 12H4.25ZM3.97218 8.21346C3.67191 8.41409 3.41409 8.67191 3.21346 8.97218L4.46066 9.80554C4.55186 9.66905 4.66905 9.55186 4.80554 9.46066L3.97218 8.21346ZM2.75 20.5V22.5H4.25V20.5H2.75ZM2.75 12V16.5H4.25V12H2.75Z" fill="#1C274C" />
                    <path d="M12.5 22.5V19.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10.5 5.5H14.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10.5 14.5H11M14.5 14.5H13" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14.5 8.5H14M10.5 8.5H12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10.5 11.5H14.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>

                  <div className="flex flex-col justify-center ">
                    <div className="text-gray-900">

                      {t("cardFoterIns3")}
                    </div>
                    <div className="font-medium text-[#ACB5BB]">{languageSchool.number_of_branches} </div>
                  </div>
                </div>
                <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.52 5.77261C16.7923 5.71011 17.75 6.75695 17.75 7.95154V13.4108C17.75 14.6716 16.7316 15.6365 15.5459 15.7249C15.0529 15.7617 14.5551 15.8216 14.178 15.9138C13.4402 16.094 12.4666 16.5647 11.857 16.8858C11.3214 17.1681 10.6786 17.1681 10.143 16.8858C9.53345 16.5647 8.55979 16.094 7.82199 15.9138C7.44487 15.8216 6.94708 15.7617 6.45414 15.7249C5.26836 15.6365 4.25 14.6716 4.25 13.4108V7.99649C4.25 6.77528 5.248 5.71817 6.54194 5.81291C7.06744 5.85139 7.67286 5.91879 8.17802 6.04222C9.09977 6.26744 10.1985 6.80646 10.8132 7.1291C10.9157 7.1829 11.0434 7.18078 11.1463 7.12125C11.7018 6.79984 12.6675 6.27873 13.4997 6.04804C14.1227 5.87535 14.8904 5.80353 15.52 5.77261ZM16.25 7.95154C16.25 7.53391 15.9314 7.2542 15.5935 7.2708C14.9907 7.30041 14.3582 7.36663 13.9003 7.49354C13.2696 7.66839 12.4487 8.1007 11.8975 8.41959C11.8493 8.44749 11.8001 8.47306 11.75 8.49628V15.2586C12.3591 14.9625 13.1393 14.6234 13.822 14.4566C14.3199 14.335 14.9149 14.2678 15.4343 14.2291C15.9097 14.1936 16.25 13.8157 16.25 13.4108V7.95154ZM10.116 8.45726C10.16 8.48035 10.2047 8.50154 10.25 8.52081V15.2586C9.64094 14.9625 8.86071 14.6234 8.17802 14.4566C7.68009 14.335 7.08508 14.2678 6.56568 14.2291C6.09031 14.1936 5.75 13.8157 5.75 13.4108V7.99649C5.75 7.56975 6.08277 7.28331 6.4324 7.30891C6.9319 7.34548 7.43898 7.40578 7.82199 7.49936C8.54804 7.67676 9.50348 8.13574 10.116 8.45726Z" fill="#141522" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.94358 0.75C7.10583 0.749985 5.65019 0.749973 4.51098 0.903136C3.33856 1.06076 2.38961 1.39288 1.64124 2.14124C0.892881 2.88961 0.560764 3.83856 0.403136 5.01098C0.249973 6.15019 0.249985 7.60582 0.25 9.44357V13.5564C0.249985 15.3942 0.249973 16.8498 0.403136 17.989C0.560764 19.1614 0.892881 20.1104 1.64124 20.8588C2.38961 21.6071 3.33856 21.9392 4.51098 22.0969C5.65018 22.25 7.1058 22.25 8.94354 22.25H13.0564C14.8942 22.25 16.3498 22.25 17.489 22.0969C18.6614 21.9392 19.6104 21.6071 20.3588 20.8588C21.1071 20.1104 21.4392 19.1614 21.5969 17.989C21.75 16.8498 21.75 15.3942 21.75 13.5565V9.44359C21.75 7.60585 21.75 6.15018 21.5969 5.01098C21.4392 3.83856 21.1071 2.88961 20.3588 2.14124C19.6104 1.39288 18.6614 1.06076 17.489 0.903136C16.3498 0.749973 14.8942 0.749985 13.0564 0.75H8.94358ZM2.7019 3.2019C3.12511 2.77869 3.70476 2.52503 4.71085 2.38976C5.73851 2.25159 7.09318 2.25 9 2.25H13C14.9068 2.25 16.2615 2.25159 17.2892 2.38976C18.2952 2.52503 18.8749 2.77869 19.2981 3.2019C19.7213 3.62511 19.975 4.20476 20.1102 5.21085C20.2484 6.23851 20.25 7.59318 20.25 9.5V13.5C20.25 15.4068 20.2484 16.7615 20.1102 17.7892C19.975 18.7952 19.7213 19.3749 19.2981 19.7981C18.8749 20.2213 18.2952 20.475 17.2892 20.6102C16.2615 20.7484 14.9068 20.75 13 20.75H9C7.09318 20.75 5.73851 20.7484 4.71085 20.6102C3.70476 20.475 3.12511 20.2213 2.7019 19.7981C2.27869 19.3749 2.02503 18.7952 1.88976 17.7892C1.75159 16.7615 1.75 15.4068 1.75 13.5V9.5C1.75 7.59318 1.75159 6.23851 1.88976 5.21085C2.02503 4.20476 2.27869 3.62511 2.7019 3.2019Z" fill="#141522" />
                  </svg>

                  <div className="flex flex-col justify-center">
                    <div className="text-gray-900">
                      {t("cardFoterIns2")}
                    </div>
                    <div className="font-medium text-[#ACB5BB]">{languageSchool?.number_of_courses}</div>
                  </div>
                </div>
                <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                  <svg width="20" height="21" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9809 3.01063L14.7409 6.53063C14.9809 7.02063 15.6209 7.49063 16.1609 7.58063L19.3509 8.11062C21.3909 8.45062 21.8709 9.93062 20.4009 11.3906L17.9209 13.8706C17.5009 14.2906 17.2709 15.1006 17.4009 15.6806L18.1109 18.7506C18.6709 21.1806 17.3809 22.1206 15.2309 20.8506L12.2409 19.0806C11.7009 18.7606 10.8109 18.7606 10.2609 19.0806L7.27089 20.8506C5.13089 22.1206 3.83089 21.1706 4.39089 18.7506L5.10089 15.6806C5.23089 15.1006 5.00089 14.2906 4.58089 13.8706L2.10089 11.3906C0.640886 9.93062 1.11089 8.45062 3.15089 8.11062L6.34089 7.58063C6.87089 7.49063 7.51089 7.02063 7.75089 6.53063L9.51089 3.01063C10.4709 1.10063 12.0309 1.10063 12.9809 3.01063Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>


                  <div className="flex flex-col justify-center">
                    <div className=" text-gray-900"> {t("cardFoterIns4")}</div>
                    <div className="font-medium text-[#ACB5BB]">{languageSchool?.rating ? languageSchool?.rating?.toFixed(1) : "N/A"}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 mt-3.5 max-md:flex-wrap max-md:max-w-full items-center">
                {loadingStates.get(languageSchool.id) ? <Spinner /> :
                  // {isLoading ? <Spinner /> :
                  <>
                    <Link
                      href={`/${language}/language-schools/${languageSchool.id}`}
                      className="grow"
                      onClick={() => setLoadingStates((prev) => new Map(prev).set(languageSchool.id, true))}
                    >
                      <button className="flex-1 justify-center px-2 py-2  text-white bg-primary rounded-xl  border hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-full grow">
                        {t("cardButtonins")}
                      </button>
                    </Link>
                    <div className="flex justify-center items-center px-4 py-1 rounded-2xl border border-gray hover:border-primary border-solid cursor-pointer" onClick={() => {
                      if (tokenMainSite && user.id) {
                        // console.log("login");
                        if (languageSchool.is_notified) {
                          unSubscribe(languageSchool.id);
                        } else if (!languageSchool.is_notified) {
                          subscribe(languageSchool.id);
                        }
                      } else {
                        toast.error(t("messageError"));
                        // console.log("not login");
                      }

                    }}>
                      {languageSchool.is_notified ? <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          )) : <SearchNotFound head="Language Schools" />}
        </>}
    </div>
    <div className={`flex flex-wrap justify-center py-5 ${pathname === `/${language}` && "bg-secondColor"} `}>
      {pathname !== `/${language}` && languageSchools?.languageSchools?.data?.length > 0 &&
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          disableNext={!hasMoreData}
          numberOfPages={languageSchools?.languageSchools?.pages}
        />}
    </div>
  </>
  );
}

export default ProductINS;
