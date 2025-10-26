"use client";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect, FC } from "react";
import LocalFont from "next/font/local";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { parseCookies, destroyCookie } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLang from "../_hooks/useCurrentLang";
import { displayUser } from "../reduxTool-kit/slices/displayUserSlice";
import { AppDispatch } from "../store";
import useCleanPath from "../_hooks/useCleanPath";

const myFont = LocalFont({
  src: "../../../public/fonts/SomarSans-Regular.ttf",
});

const Header: FC = () => {
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
  const dispatch = useDispatch<AppDispatch>()
  const locale = useCurrentLang();
  const language = useCurrentLang();

  const displayUserInfo = useSelector((state: any) => state.displayUser);


  const handleLogOut = () => {
    destroyCookie(null, 'tokenMainSite', {
      path: '/',
    });
    // router.refresh();
    window.location.reload();
  }


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

      // console.log("Token:", token);
      try {
        // إرسال الطلب للتحقق من المستخدم
        // const result = await dispatch(displayUser({ token, locale }));
        const result = await dispatch(displayUser({ tokenMainSite, locale })).unwrap();
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
  }


  return (
    <header className="bg-white leading-10 sticky top-0 z-10" >
      <nav className="relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-4 lg:py-0 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <Link
                href={`/${language}`}
                className="md:flex md:items-center md:gap-12 cursor-pointer"
              >
                <Image src="/logo.svg" alt="logo" width={90} height={80} />
              </Link>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
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
              className={`absolute  z-20 w-full  py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full hidden"
                }`}
            >
              <div className="flex flex-col mx-6 lg:flex-row lg:items-center lg:mx-8 lg:gap-5" >

                <div className="flex items-center">
                  <Image
                    src={
                      currentPath === `/${language}`
                        ? "/images/bold-point.svg"
                        : "/images/outline-point.svg"
                    }
                    alt="point"
                    width={10}
                    height={10}
                  />
                  <Link
                    className={`${currentPath === `/${language}`
                      ? "text-black font-medium"
                      : "text-[#5b5b64]"
                      } mx-2 transition hover:text-black`}
                    href={`/${language}`}
                  >
                    {t("home")}
                  </Link>
                </div>
                <div className="flex items-center">
                  <Image
                    src={
                      currentPath.includes("university")
                        ? "/images/bold-point.svg"
                        : "/images/outline-point.svg"
                    }
                    alt="point"
                    width={10}
                    height={10}
                  />
                  <Link
                    className={`${currentPath.includes("university")
                      ? "text-black font-medium"
                      : "text-[#5b5b64]"
                      } mx-2 transition hover:text-black`}
                    href={`/${language}/university`}
                  >
                    {t("Universities")}
                  </Link>
                </div>
                <div className="flex items-center">
                  <Image
                    src={
                      currentPath.includes("language-schools")
                        ? "/images/bold-point.svg"
                        : "/images/outline-point.svg"
                    }
                    alt="point"
                    width={10}
                    height={10}
                  />
                  <Link
                    className={`${currentPath.includes("language-schools")
                      ? "text-black font-medium"
                      : "text-[#5b5b64]"
                      } mx-2 transition hover:text-black text-nowrap`}
                    href={`/${language}/language-schools`}
                  >
                    {t("institutes")}
                  </Link>
                </div>
                <div className="flex items-center">
                  <Image
                    src={
                      currentPath === `/${language}/about`
                        ? "/images/bold-point.svg"
                        : "/images/outline-point.svg"
                    }
                    alt="point"
                    width={10}
                    height={10}
                  />
                  <Link
                    className={`${currentPath === `/${language}/about`
                      ? "text-black font-medium"
                      : "text-[#5b5b64]"
                      } mx-2 transition hover:text-black text-nowrap`}
                    href={`/${language}/about`}
                  >
                    {t("whoWeAre")}
                  </Link>
                </div>
                <div
                  x-data="{ isActive: false }"
                  className="items-center  relative"
                >
                  {/* popup language */}
                  <div className="inline-flex items-center overflow-hidden rounded-md  bg-white">
                    <button
                      onClick={handleClickLang}
                      className=" text-black bg-secondColor hover:bg-gray-50 hover:text-gray-700 flex justify-center items-center py-1 px-1"
                    >
                      <Image
                        src="/images/language.svg"
                        alt="flag"
                        width={25}
                        height={25}
                        className="rounded-l mx-2"
                      />
                      {language === "en" ? "English" : "Arabic"}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="absolute start-0 z-10 mt-2 w-24 rounded-md border-gray-100 bg-white shadow-lg"
                    role="menu"
                    x-show="isActive"
                  >
                    {showLanguage ? (
                      <div className="p-2 ">
                        <div className="flex justify-start items-center">
                          <Link
                            href={`/ar/${window.location.pathname.slice(4)}`}
                            className="rounded-lg px-1 pe-2 py-2 text-sm text-gray-500 hover:bg-gray hover:text-gray-700 flex items-center"
                          >
                            <Image
                              src="/images/sa.svg"
                              alt="AR flag"
                              width={25}
                              height={25}
                              className="rounded-l mx-2"
                            />
                            AR
                          </Link>
                        </div>
                        <div className="flex justify-start items-center">
                          <Link
                            href={`/en/${window.location.pathname.slice(4)}`}
                            className="  rounded-lg px-1 pe-2 py-2 text-sm text-gray-500 hover:bg-gray hover:text-gray-700 flex items-center"
                          >
                            <Image
                              src="/images/us.svg"
                              alt="EN flag"
                              width={25}
                              height={25}
                              className="rounded-l mx-2"
                            />
                            EN
                          </Link>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {/* popup profile */}
              <div className="flex mx-6 lg:mx-0 my-3 md:block">
                {isLoggedIn ? <div
                  onClick={handleClickUser}
                  className="flex items-center cursor-pointer gap-1 ps-1 justify-between rounded-xl border-gray-300 border-gray border-[0.8px] max-w-[197px] hover:border-primary shrink"
                >
                  {displayUserInfo.avatar ?
                    <Image src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(displayUserInfo.avatar)}`} width={80} height={80} alt="Avatar" className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]" /> :
                    <Image src="/images/avatar.png" width={80} height={80} alt="Avatar" className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]" />
                  }

                  <div className="flex gap-1 items-center mt-1.5 text-start">
                    <div className="flex flex-col items-start self-stretch my-auto">
                      <div className=" text-xs mx-1 font-bold text-gray-900">
                        {locale == "ar" ? "مرحبا" : "Welcome"}
                      </div>
                      <div className="mt-1.5 mx-1 mb-1.5 text-sm text-zinc-500 line-clamp-1">
                        {displayUserInfo.first_name} {displayUserInfo.last_name}
                      </div>
                    </div>

                  </div>
                  <div x-data="{ isActive: false }" className="flex">
                    <div className="inline-flex items-center overflow-hidden rounded-md  bg-white">
                      <button
                        className=" text-black  hover:bg-gray-50 hover:text-gray-700 flex justify-center items-center py-1 px-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15" height="16"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      // className={`absolute start-0 top-72 lg:top-16   z-10 mt-2 w-36 lg:w-44 rounded-md border-gray-100 bg-white shadow-lg`}
                      className={`absolute start-5 top-72 lg:top-16 ${language == "ar" ? "lg:start-[38rem]" : "lg:start-[42rem]"}  z-10 mt-2 w-36 lg:w-40 rounded-md border-gray-100 bg-secondColor shadow-lg`}
                      role="menu"
                      x-show="isActive"
                    >
                      {showUserData ? (
                        <div className="p-2 ">
                          <div className="flex justify-center hover:bg-gray items-center">
                            <Link
                              href={`/${locale}/profile`}
                              className=" rounded-lg px-1 pe-2 py-2 text-sm text-gray-500  hover:text-gray-700 flex items-center"
                            >
                              {/* <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7df86680d2f2c35d43c01fa935116044dfaef02c504125e52f801ab225577300?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain shrink-0 self-stretch mx-1 my-auto aspect-square w-[22px]"
                                alt="User Icon"
                              /> */}
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
                              {/* <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/870d0c5662af94c073590fba7b7235c41018d721224837d86f55aba69fd2730e?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain mx-1 shrink-0 self-stretch my-auto w-5 aspect-square"
                              /> */}
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
                    </div>
                  </div>
                </div> : <div className="flex gap-2 grow">
                  <Link
                    className="inline-flex items-center gap-2 rounded-md bg-primary  border hover:border-primary hover:text-primary hover:bg-white  duration-300  px-5 py-0 text-sm font-medium text-white focus:relative transition ease-in-out delay-150"
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
                    className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-medium text-primary border border-primary hover:text-white hover:bg-primary transition-all duration-300 focus:relative"
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

                </div>}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr className="text-[#E0E0E0]" />
    </header>
  );
};

export default Header;
