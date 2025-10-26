"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCleanPath from "../_hooks/useCleanPath";
import useCurrentLang from "../_hooks/useCurrentLang";
import { displayUser } from "../reduxTool-kit/slices/displayUserSlice";
import { AppDispatch } from "../store";

const NewHeader: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [showUserData, setShowUserData] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const { cleanPath } = useCleanPath();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { tokenMainSite } = parseCookies();
  const dispatch = useDispatch<AppDispatch>();
  const locale = useCurrentLang();
  const language = useCurrentLang();
  const profileRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const displayUserInfo = useSelector((state: any) => state.displayUser);

  const handleLogOut = () => {
    destroyCookie(null, "tokenMainSite", {
      path: "/",
    });
    // router.refresh();
    window.location.reload();
  };

  useEffect(() => {
    setIsMounted(true);
    setCurrentPath(window.location.pathname);
  }, [pathname]);

  useEffect(() => {
    const checkUserToken = async () => {
      if (!tokenMainSite) {
        // إذا لم تكن هناك token
        setIsLoggedIn(false);
        // console.log("Token not found. User not logged in.");
        return;
      }

      try {
        // console.log("Token:");
        // إرسال الطلب للتحقق من المستخدم
        // const result = await dispatch(displayUser({ token, locale }));
        const result = await dispatch(
          displayUser({ tokenMainSite, locale })
        ).unwrap();
        // console.log("User data:", result);

        if (result && Object.keys(result).length > 0) {
          // إذا تم العثور على بيانات المستخدم
          setIsLoggedIn(true);
          // console.log("User authenticated.");
        } else {
          // إذا لم يتم العثور على بيانات للمستخدم
          setIsLoggedIn(false);
          console.log("No user data found. User not logged in.");
        }
      } catch (error) {
        // التعامل مع الأخطاء
        setIsLoggedIn(false);
        console.error("Error fetching user data:", error);
      }
    };

    checkUserToken();
  }, [dispatch, tokenMainSite, locale]);

  const handleClickCurrency = () => {
    setIsActive(!isActive);
  };

  const handleClickLang = () => {
    setShowLanguage(!showLanguage);
    setShowUserData(false);
  };
  const handleClickUser = () => {
    setShowUserData(!showUserData);
    setShowLanguage(false);
  };
  const closeDropdown = () => {
    setShowUserData(false);
    setShowLanguage(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowUserData(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (burgerRef.current && !burgerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.classList.add("overflow-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-hidden");
  //   }
  //   return () => document.body.classList.remove("overflow-hidden");
  // }, [isOpen]);

  return (
    <header className="bg-white leading-10 sticky top-0 z-20">
      <nav className="relative bg-white shadow ">
        <div className="@container/main px-6 md:px-12 lg:px-20 py-2 xl:py-0 mx-auto">
          <div className={`xl:flex xl:items-center lg:justify-between xl:justify-center  xl:${locale == "ar" ? "gap-0" : "gap-8"}`}>
            <div className="flex items-center justify-between ">
              <Link
                href={`/${language}`}
                className="md:flex md:items-center md:gap-12 cursor-pointer"
              >
                <Image
                  src="/logo.svg"
                  alt="eduxa logo"
                  width={90}
                  height={80}
                />
              </Link>

              {/* Mobile menu button */}
              <div className="flex xl:hidden" >
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600 "
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {/* Mobile Menu */}
            <div
              className={`absolute flex ${isLoggedIn ? "flex-row" : "flex-col md:flex-row"} justify-between z-20 w-[92%] transition-all duration-300 ease-in-out bg-neutral-100 rounded-lg xl:relative xl:bg-transparent xl:w-auto xl:opacity-100 xl:translate-x-0 xl:flex xl:items-center ${isOpen
                ? "translate-x-0 md:translate-x-4 opacity-100 "
                : "opacity-0 -translate-x-full hidden"
                }`}
            >
              {/* navigation page */}
              <div className="flex  xl:items-center ms-2 md:ms-6 lg:mx-8 lg:gap-5 ">
                <div className="flex gap-2 items-start max-md:gap-4 xl:gap-4 flex-col   xl:flex-row">
                  <Link
                    href={`/${language}`}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 text-base border-b border-solid  max-md:px-2.5 max-md:py-2 hover:border-b-primary hover:text-primary ${currentPath === `/${language}`
                      ? "font-bold text-primary border-b-primary"
                      : "font-semibold text-black border-b-gray"
                      }`}
                  >
                    {t("home")}
                  </Link>
                  <Link
                    href={`/${language}/university`}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 text-base border-b border-solid  max-md:px-2.5 max-md:py-2
                                            hover:border-b-primary hover:text-primary  
                                          ${currentPath.includes("university")
                        ? "font-bold text-primary border-b-primary"
                        : "font-semibold text-black border-b-gray"
                      }`}
                  >
                    {t("Universities")}
                  </Link>
                  <Link
                    href={`/${language}/language-schools`}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 text-base border-b border-solid  max-md:px-2.5 max-md:py-2 text-nowrap
                                            hover:border-b-primary hover:text-primary  
                                           ${currentPath.includes(
                      "language-schools"
                    )
                        ? "font-bold text-primary border-b-primary"
                        : "font-semibold text-black border-b-gray"
                      }`}
                  >
                    {t("institutes")}
                  </Link>
                  <Link
                    href={`/${language}/about`}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 text-base border-b border-solid  max-md:px-2.5 max-md:py-2 text-nowrap
                                            hover:border-b-primary hover:text-primary  
                                           ${currentPath.includes("about")
                        ? "font-bold text-primary border-b-primary"
                        : "font-semibold text-black border-b-gray"
                      }`}
                  >
                    {t("whoWeAre")}
                  </Link>

                  <Link
                    href={`/${language}/contact`}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 text-base border-b border-solid  max-md:px-2.5 max-md:py-2 text-nowrap
                                            hover:border-b-primary hover:text-primary  
                                            ${currentPath.includes("contact")
                        ? "font-bold text-primary border-b-primary"
                        : "font-semibold text-black border-b-gray"
                      }`}
                  >
                    {t("contact")}
                  </Link>
                  <Link
                    href={`/${language}/faq`}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 text-base border-b border-solid  max-md:px-2.5 max-md:py-2 text-nowrap
                                            hover:border-b-primary hover:text-primary  
                                            ${currentPath.includes("faq")
                        ? "font-bold text-primary border-b-primary"
                        : "font-semibold text-black border-b-gray"
                      }`}
                  >
                    {t("FAQ")}
                  </Link>
                </div>
                {/* popup language */}
              </div>

              {/* popup profile */}
              <div className="me-1 md:mx-6 lg:mx-8 xl:mx-0 my-3 md:block">
                {isLoggedIn ? (
                  <div
                    ref={profileRef}
                    onClick={handleClickUser}
                    className="flex items-center cursor-pointer gap-1 p-1 justify-between rounded-xl border-gray-300 border-gray border-[0.8px] max-w-[197px] hover:border-primary shrink bg-[#FAFAFA]"
                  >
                    {displayUserInfo.avatar !== null ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                          }/${cleanPath(displayUserInfo.avatar)}`}
                        width={80}
                        height={60}
                        alt={displayUserInfo?.name || "avatar"}
                        className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[30px]"
                      />
                    ) : (
                      <Image
                        src="/images/avatar.png"
                        width={80}
                        height={60}
                        alt="avatar"
                        className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[30px]"
                      />
                    )}

                    <div className="flex gap-1 items-center  text-start">
                      <div className="flex flex-col items-start self-stretch my-auto">
                        {/* <div className=" text-xs mx-1 font-bold text-gray-900">
                                                    {locale == "ar" ? "مرحبا" : "Welcome"}
                                                </div> */}
                        <div className="mt-1.5 mx-1 mb-1.5 text-sm text-zinc-500 line-clamp-1">
                          {displayUserInfo.first_name}{" "}
                          {displayUserInfo.last_name}
                        </div>
                      </div>
                    </div>
                    <div x-data="{ isActive: false }" className="flex">
                      <div className="inline-flex items-center overflow-hidden rounded-md  bg-white">
                        <button className=" text-black  hover:bg-gray-50 hover:text-gray-700 flex justify-center items-center py-1 px-1">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.6672 2H8.28717C4.64717 2 2.47717 4.17 2.47717 7.81V16.18C2.47717 19.83 4.64717 22 8.28717 22H16.6572C20.2972 22 22.4672 19.83 22.4672 16.19V7.81C22.4772 4.17 20.3072 2 16.6672 2ZM16.5372 11.17L13.0072 14.7C12.8572 14.85 12.6672 14.92 12.4772 14.92C12.2872 14.92 12.0972 14.85 11.9472 14.7L8.41717 11.17C8.12717 10.88 8.12717 10.4 8.41717 10.11C8.70717 9.82 9.18717 9.82 9.47717 10.11L12.4772 13.11L15.4772 10.11C15.7672 9.82 16.2472 9.82 16.5372 10.11C16.8272 10.4 16.8272 10.87 16.5372 11.17Z"
                              fill="#666666"
                            />
                          </svg>
                        </button>
                      </div>
                      <div
                        className={`absolute top-[3.5rem] md:top-[3.5rem] lg:top-[3.5rem] xl:top-[4rem] ${language == "ar"
                          ? "start-40 md:start-[30rem] lg:start-[44rem] xl:start-[45rem]"
                          : "start-28 md:start-[30rem] lg:start-[42rem] xl:start-[45rem]"
                          }  z-10 w-44 md:w-52 lg:w-60 rounded-md border-gray-100 bg-secondColor shadow-lg`}
                        role="menu"
                        x-show="isActive"
                      >
                        {/* <div className={`absolute top-[21.5rem] md:top-[19.5rem] lg:top-20 ${language == "ar" ? "start-14 lg:start-[38rem] xl:start-[41rem]" : "start-5 lg:start-[34.5rem] xl:start-[43rem]"}  z-10 w-36 lg:w-60 rounded-md border-gray-100 bg-secondColor shadow-lg`}
                                                role="menu"
                                                x-show="isActive"
                                            > */}
                        {showUserData ? (
                          <div className="flex overflow-hidden flex-col bg-white rounded border border-solid shadow-xl border-zinc-100 max-w-[256px]">
                            <div className="flex flex-col justify-center p-4 w-full">
                              <div className="flex flex-col w-56 max-w-full">
                                <div className="flex flex-col items-center self-center">
                                  {displayUserInfo.avatar !== null ? (
                                    <Image
                                      src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                                        }/${cleanPath(displayUserInfo.avatar)}`}
                                      width={100}
                                      height={80}
                                      alt={displayUserInfo?.name || "avatar"}
                                      className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[80px]"
                                    />
                                  ) : (
                                    <div className="h-[80px] w-[80px] bg-white flex justify-center items-center text-3xl text-black rounded-full shadow-lg">
                                      <span>
                                        {displayUserInfo.first_name
                                          ?.slice(0, 1)
                                          .toUpperCase()}
                                      </span>
                                    </div>
                                  )}

                                  <div className="mt-3 text-sm tracking-wide text-center text-black">
                                    {displayUserInfo.first_name}{" "}
                                    {displayUserInfo.last_name}
                                  </div>
                                </div>
                                <div className="flex flex-col mt-3.5 w-full text-sm tracking-wide text-zinc-900">
                                  <Link
                                    href={`/${language}/profile`}
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex overflow-hidden gap-2 items-center p-2 w-full   border-b-2 border-gray"
                                  >
                                    <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900">
                                      {t("myProfile")}
                                    </div>
                                    <svg
                                      width="20"
                                      height="21"
                                      viewBox="0 0 20 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M14.1666 18H5.83329C2.49996 18 1.66663 17.1667 1.66663 13.8333V7.16667C1.66663 3.83333 2.49996 3 5.83329 3H14.1666C17.5 3 18.3333 3.83333 18.3333 7.16667V13.8333C18.3333 17.1667 17.5 18 14.1666 18Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M11.6666 7.16667H15.8333"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M12.5 10.5H15.8333"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M14.1666 13.8333H15.8333"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7.08328 9.90833C7.91631 9.90833 8.59162 9.23302 8.59162 8.4C8.59162 7.56697 7.91631 6.89166 7.08328 6.89166C6.25026 6.89166 5.57495 7.56697 5.57495 8.4C5.57495 9.23302 6.25026 9.90833 7.08328 9.90833Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M9.99996 14.1083C9.88329 12.9 8.92496 11.95 7.71663 11.8417C7.29996 11.8 6.87496 11.8 6.44996 11.8417C5.24163 11.9583 4.28329 12.9 4.16663 14.1083"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                  <Link
                                    href={`/${language}/my-requests`}
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex overflow-hidden gap-2 items-center p-2 w-full   border-b-2 border-gray"
                                  >
                                    <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900">
                                      {t("myRequest")}
                                    </div>
                                    <svg
                                      width="20"
                                      height="21"
                                      viewBox="0 0 20 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8.33329 5.50001H11.6666C13.3333 5.50001 13.3333 4.66667 13.3333 3.83334C13.3333 2.16667 12.5 2.16667 11.6666 2.16667H8.33329C7.49996 2.16667 6.66663 2.16667 6.66663 3.83334C6.66663 5.50001 7.49996 5.50001 8.33329 5.50001Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M13.3333 3.85001C16.1083 4.00001 17.5 5.02501 17.5 8.83334V13.8333C17.5 17.1667 16.6667 18.8333 12.5 18.8333H7.5C3.33333 18.8333 2.5 17.1667 2.5 13.8333V8.83334C2.5 5.03334 3.89167 4.00001 6.66667 3.85001"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                  <Link
                                    href={`/${language}/my-favorite`}
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex overflow-hidden gap-2 items-center p-2 w-full   border-b-2 border-gray"
                                  >
                                    <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900">
                                      {t("myFavorites")}
                                    </div>
                                    <svg
                                      width="20"
                                      height="21"
                                      viewBox="0 0 20 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M10.5166 17.8417C10.2333 17.9417 9.76663 17.9417 9.48329 17.8417C7.06663 17.0167 1.66663 13.575 1.66663 7.74166C1.66663 5.16666 3.74163 3.08333 6.29996 3.08333C7.81663 3.08333 9.15829 3.81666 9.99996 4.95C10.8416 3.81666 12.1916 3.08333 13.7 3.08333C16.2583 3.08333 18.3333 5.16666 18.3333 7.74166C18.3333 13.575 12.9333 17.0167 10.5166 17.8417Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                  <Link
                                    href={`/${language}/settings`}
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex overflow-hidden gap-2 items-center p-2 w-full   border-b-2 border-gray"
                                  >
                                    <div className="overflow-hidden flex-1 shrink self-stretch my-auto basis-0 text-zinc-900">
                                      {t("settings")}
                                    </div>
                                    <svg
                                      width="20"
                                      height="21"
                                      viewBox="0 0 20 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M10 13C11.3807 13 12.5 11.8807 12.5 10.5C12.5 9.11929 11.3807 8 10 8C8.61929 8 7.5 9.11929 7.5 10.5C7.5 11.8807 8.61929 13 10 13Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M1.66663 11.2333V9.76666C1.66663 8.9 2.37496 8.18333 3.24996 8.18333C4.75829 8.18333 5.37496 7.11666 4.61663 5.80833C4.18329 5.05833 4.44163 4.08333 5.19996 3.65L6.64163 2.825C7.29996 2.43333 8.14996 2.66666 8.54163 3.325L8.63329 3.48333C9.38329 4.79166 10.6166 4.79166 11.375 3.48333L11.4666 3.325C11.8583 2.66666 12.7083 2.43333 13.3666 2.825L14.8083 3.65C15.5666 4.08333 15.825 5.05833 15.3916 5.80833C14.6333 7.11666 15.25 8.18333 16.7583 8.18333C17.625 8.18333 18.3416 8.89166 18.3416 9.76666V11.2333C18.3416 12.1 17.6333 12.8167 16.7583 12.8167C15.25 12.8167 14.6333 13.8833 15.3916 15.1917C15.825 15.95 15.5666 16.9167 14.8083 17.35L13.3666 18.175C12.7083 18.5667 11.8583 18.3333 11.4666 17.675L11.375 17.5167C10.625 16.2083 9.39163 16.2083 8.63329 17.5167L8.54163 17.675C8.14996 18.3333 7.29996 18.5667 6.64163 18.175L5.19996 17.35C4.44163 16.9167 4.18329 15.9417 4.61663 15.1917C5.37496 13.8833 4.75829 12.8167 3.24996 12.8167C2.37496 12.8167 1.66663 12.1 1.66663 11.2333Z"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                  <div
                                    onClick={handleLogOut}
                                    className="flex overflow-hidden gap-2 justify-end py-2.5 w-full text-rose-700 bg-white"
                                  >
                                    <svg
                                      width="20"
                                      height="21"
                                      viewBox="0 0 20 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4.84156 16.9991C4.4924 16.9991 4.1958 16.8771 3.95177 16.6331C3.70788 16.3892 3.58594 16.0927 3.58594 15.7435V5.34059C3.58594 4.99142 3.70788 4.69482 3.95177 4.45079C4.1958 4.20691 4.4924 4.08496 4.84156 4.08496H9.52823C9.66378 4.08496 9.78059 4.13357 9.87865 4.23079C9.9767 4.32802 10.0257 4.44378 10.0257 4.57809C10.0257 4.71517 9.9767 4.83378 9.87865 4.93392C9.78059 5.03406 9.66378 5.08413 9.52823 5.08413H4.84156C4.7774 5.08413 4.71858 5.11079 4.6651 5.16413C4.61177 5.2176 4.5851 5.27642 4.5851 5.34059V15.7435C4.5851 15.8077 4.61177 15.8664 4.6651 15.9198C4.71858 15.9732 4.7774 16 4.84156 16H9.52823C9.66378 16 9.78059 16.0486 9.87865 16.1458C9.9767 16.243 10.0257 16.3588 10.0257 16.4931C10.0257 16.6302 9.9767 16.7488 9.87865 16.8489C9.78059 16.9491 9.66378 16.9991 9.52823 16.9991H4.84156ZM14.4882 11.0416H8.6324C8.49434 11.0416 8.37635 10.993 8.27844 10.8958C8.18052 10.7986 8.13156 10.6814 8.13156 10.5443C8.13156 10.41 8.18052 10.2928 8.27844 10.1927C8.37635 10.0925 8.49434 10.0425 8.6324 10.0425H14.4882L13.2955 8.84996C13.1819 8.73899 13.1238 8.61461 13.1211 8.47684C13.1185 8.33906 13.1775 8.21822 13.2982 8.11434C13.4163 8.01031 13.5362 7.96135 13.658 7.96746C13.7798 7.97371 13.8952 8.02989 14.0041 8.136L15.9697 10.1018C16.1 10.2271 16.1651 10.3732 16.1651 10.5402C16.1651 10.7071 16.1002 10.8543 15.9705 10.9816L13.9984 12.9535C13.8916 13.0577 13.7782 13.1089 13.658 13.1073C13.5379 13.1057 13.4216 13.0529 13.3091 12.9487C13.195 12.8429 13.1356 12.726 13.1307 12.5981C13.126 12.4702 13.1822 12.3463 13.2993 12.2264L14.4882 11.0416Z"
                                        fill="#C30734"
                                      />
                                    </svg>

                                    <div className="overflow-hidden flex-1 shrink self-stretch text-rose-700 basis-0">
                                      {t("logout")}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <div className={`absolute top-[21.5rem] md:top-[19.5rem] lg:top-20 ${language == "ar" ? "start-14 lg:start-[38rem] xl:start-[44rem]" : "start-5 lg:start-[41rem] xl:start-[47rem]"}  z-10 w-36 lg:w-36 rounded-md border-gray-100 bg-secondColor shadow-lg`}
                                                role="menu"
                                                x-show="isActive"
                                            >
                                                {showUserData ? (
                                                    <div className="p-2 ">
                                                        <div className="flex justify-center hover:bg-gray items-center">
                                                            <Link
                                                                href={`/${locale}/profile`}
                                                                className=" rounded-lg py-2 text-sm text-gray-500  hover:text-gray-700 flex items-center gap-1"
                                                            >
                                                                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9.49935 10.0007C11.6855 10.0007 13.4577 8.22844 13.4577 6.04232C13.4577 3.85619 11.6855 2.08398 9.49935 2.08398C7.31322 2.08398 5.54102 3.85619 5.54102 6.04232C5.54102 8.22844 7.31322 10.0007 9.49935 10.0007Z" stroke="#1e4c83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M16.3 17.9167C16.3 14.8529 13.2521 12.375 9.49963 12.375C5.74713 12.375 2.69922 14.8529 2.69922 17.9167" stroke="#1e4c83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                
                                                                {locale == 'en' ? "Profile" : "حسابي"}


                                                            </Link>
                                                        </div>
                                                        <div className="flex justify-center items-center hover:bg-gray">
                                                            <button
                                                                onClick={handleLogOut}
                                                                className=" rounded-lg px-1 pe-2 py-2 text-sm text-gray-500  hover:text-gray-700 flex items-center gap-1"
                                                            >
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.6995 18.5581H12.5911C8.89115 18.5581 7.10782 17.0997 6.79948 13.8331C6.76615 13.4914 7.01615 13.1831 7.36615 13.1497C7.70782 13.1164 8.01615 13.3747 8.04948 13.7164C8.29115 16.3331 9.52448 17.3081 12.5995 17.3081H12.7078C16.0995 17.3081 17.2995 16.1081 17.2995 12.7164V7.28307C17.2995 3.89141 16.0995 2.69141 12.7078 2.69141H12.5995C9.50782 2.69141 8.27448 3.68307 8.04948 6.34974C8.00782 6.69141 7.72448 6.94974 7.36615 6.91641C7.28402 6.90999 7.20396 6.88742 7.13057 6.84999C7.05718 6.81257 6.99191 6.76102 6.93849 6.69831C6.88506 6.63559 6.84455 6.56295 6.81927 6.48455C6.79398 6.40614 6.78443 6.32351 6.79115 6.24141C7.07448 2.92474 8.86615 1.44141 12.5911 1.44141H12.6995C16.7912 1.44141 18.5412 3.19141 18.5412 7.28307V12.7164C18.5412 16.8081 16.7912 18.5581 12.6995 18.5581Z" fill="#FE3A46" />
                                                                    <path d="M12.3993 10.625H1.66602C1.32435 10.625 1.04102 10.3417 1.04102 10C1.04102 9.65833 1.32435 9.375 1.66602 9.375H12.3993C12.5651 9.375 12.7241 9.44085 12.8413 9.55806C12.9585 9.67527 13.0243 9.83424 13.0243 10C13.0243 10.1658 12.9585 10.3247 12.8413 10.4419C12.7241 10.5592 12.5651 10.625 12.3993 10.625Z" fill="#FE3A46" />
                                                                    <path d="M10.5411 13.4172C10.3827 13.4172 10.2244 13.3589 10.0994 13.2339C9.98315 13.1162 9.91797 12.9575 9.91797 12.7922C9.91797 12.6268 9.98315 12.4681 10.0994 12.3505L12.4494 10.0005L10.0994 7.65052C9.98315 7.53291 9.91797 7.37421 9.91797 7.20885C9.91797 7.0435 9.98315 6.8848 10.0994 6.76719C10.3411 6.52552 10.7411 6.52552 10.9827 6.76719L13.7744 9.55885C14.0161 9.80052 14.0161 10.2005 13.7744 10.4422L10.9827 13.2339C10.8577 13.3589 10.6994 13.4172 10.5411 13.4172Z" fill="#FE3A46" />
                                                                </svg>
                                                                {locale == 'en' ? "Logout" : "تسجيل الخروج"}

                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div> */}
                    </div>
                  </div>) :
                  (
                    <div className="flex gap-2 grow ms-4">
                      <Link
                        className="inline-flex items-center gap-2 rounded-3xl bg-primary  border hover:border-primary hover:text-primary hover:bg-white  duration-300  px-3 py-0 text-base font-medium text-white focus:relative transition ease-in-out delay-150"
                        href={`/${language}/register`}
                      >
                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" fill-primary group-hover:fill-white"
                        >
                          <path
                            d="M9.49935 10.0007C11.6855 10.0007 13.4577 8.22844 13.4577 6.04232C13.4577 3.85619 11.6855 2.08398 9.49935 2.08398C7.31322 2.08398 5.54102 3.85619 5.54102 6.04232C5.54102 8.22844 7.31322 10.0007 9.49935 10.0007Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.3 17.9167C16.3 14.8529 13.2521 12.375 9.49963 12.375C5.74713 12.375 2.69922 14.8529 2.69922 17.9167"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {t("createAccount")}
                      </Link>

                      <Link
                        href={`/${language}/login`}
                        className="inline-flex items-center gap-2 rounded-3xl bg-white px-3 py-2 text-base font-medium text-primary border border-primary hover:text-white hover:bg-primary transition-all duration-300 focus:relative"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" fill-primary group-hover:fill-white"
                        >
                          <path
                            d="M11.6673 11.8773V13.619C10.9131 13.3523 10.1059 13.2705 9.31349 13.3805C8.52109 13.4904 7.76665 13.7889 7.11351 14.2508C6.46037 14.7128 5.9276 15.3247 5.55995 16.0352C5.1923 16.7457 5.0005 17.534 5.00065 18.334L3.33398 18.3332C3.33373 17.3156 3.56642 16.3114 4.01423 15.3976C4.46205 14.4839 5.1131 13.6848 5.9175 13.0615C6.7219 12.4383 7.6583 12.0074 8.65495 11.802C9.65159 11.5966 10.682 11.6221 11.6673 11.8765V11.8773ZM10.0007 10.834C7.23815 10.834 5.00065 8.59648 5.00065 5.83398C5.00065 3.07148 7.23815 0.833984 10.0007 0.833984C12.7632 0.833984 15.0007 3.07148 15.0007 5.83398C15.0007 8.59648 12.7632 10.834 10.0007 10.834ZM10.0007 9.16732C11.8423 9.16732 13.334 7.67565 13.334 5.83398C13.334 3.99232 11.8423 2.50065 10.0007 2.50065C8.15898 2.50065 6.66732 3.99232 6.66732 5.83398C6.66732 7.67565 8.15898 9.16732 10.0007 9.16732ZM16.6673 14.1673H19.1673V15.834H16.6673V18.7507L12.5007 15.0007L16.6673 11.2507V14.1673Z"
                            className="fill-current"
                          />
                        </svg>

                        {t("Login")}
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>
{/* Overlay when mobile menu is open */}
{isOpen && (
  <button
    aria-label="Close menu overlay"
    onClick={() => setIsOpen(false)}
    className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-10 xl:hidden"
  />
)}

    </header>
  );
};

export default NewHeader;
