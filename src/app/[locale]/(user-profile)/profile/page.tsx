"use client";

import NewCertification from "@/app/_components/NewCertification";
import NewDataInfo from "@/app/_components/NewDataInfo";
import NewMyDocs from "@/app/_components/NewMyDocs";
import NewStudentResults from "@/app/_components/NewStudentResults";
import ProtectedRoute from "@/app/_components/ProtectedRoute";
import Spinner from "@/app/_components/Spinner";
import useCleanPath from "@/app/_hooks/useCleanPath";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { displayUser } from "@/app/reduxTool-kit/slices/displayUserSlice";
import { getUser } from "@/app/reduxTool-kit/slices/userSlice";
import { AppDispatch } from "@/app/store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Profile() {
  const [isActive, setIsActive] = useState("personalData");
  const [avatar, setAvatar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const { cleanPath } = useCleanPath();

  const user = useSelector((state: any) => state.user);
  const locale = useCurrentLang();
  const { tokenMainSite } = parseCookies();
  const t = useTranslations("Profile");
  const dispatch = useDispatch<AppDispatch>();

  // Function to handle avatar change and upload
  const handleAvatarChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setIsOpen(true);
      // setAvatarPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string); // base64 string (data:image/...)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeAvatar = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar ? avatar : user.avatar);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user.id}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            "Accept-Language": locale,
            Authorization: `Bearer ${tokenMainSite}`,
          },
        }
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }

      const result = await res.json();
      toast.success("Data Update Successfully");
      setIsLoading(false);
      dispatch(getUser({ tokenMainSite, locale }));
      dispatch(displayUser({ tokenMainSite, locale }));
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getUser({ locale, tokenMainSite }));
  }, [dispatch, locale, tokenMainSite]);

  return (
    <ProtectedRoute>
      <div className="p-2 md:p-5 lg:px-20 lg:py-10 bg-[#F2F2F2]">
        <div className="flex flex-col p-2 md:p-6 bg-white rounded border border-solid border-gray ">
          <div className=" flex flex-col md:flex-row gap-6 items-start pb-4 w-full border-b border-solid border-b-gray max-md:max-w-full">
            <div className=" flex gap-3 w-full md:w-1/2">
              {isOpen && (
                <div
                  tabIndex={-1}
                  className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                  <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
                    <h3 className="text-full font-semibold">{t("nav9")}:</h3>
                    <div className="flex justify-center py-4 ">
                      <Image
                        src={avatarPreview}
                        width={200}
                        height={200}
                        alt="Avatar"
                        className="rounded-full object-cover w-72 h-72 cursor-pointer"
                        onClick={() =>
                          document.getElementById("avatarInput")?.click()
                        }
                      />
                    </div>

                    <div className="flex justify-end mt-6 gap-2">
                      {isLoading ? (
                        <div>
                          <Spinner />{" "}
                        </div>
                      ) : (
                        <button
                          onClick={handleChangeAvatar}
                          className="bg-primary text-white px-4 py-2 rounded-lg"
                        >
                          {t("lable19")}
                        </button>
                      )}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="ml-2 border border-gray-300 px-4 py-2 rounded-lg"
                      >
                        {t("lable18")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Display Data Avatar & input*/}
              {/* ********************************************* */}
              <div>
                <div className="flex  items-end relative">
                  {user?.avatar ? (
                    <Image
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_PHOTO_URL
                      }/${cleanPath(user.avatar)}`}
                      width={80}
                      height={80}
                      alt="Avatar"
                      className="rounded-xl object-cover w-24 h-24 cursor-pointer"
                      onClick={() =>
                        document.getElementById("avatarInput")?.click()
                      }
                    />
                  ) : (
                    <div className="h-[80px] w-[80px] md:h-[96px]  md:w-[96px] bg-slate-500 flex justify-center items-center text-5xl text-white rounded-lg">
                      <span>{user?.first_name?.slice(0, 1).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="-ml-6 mb-0.5">
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.2614 15.6299H2.93267C2.65185 15.6299 2.41898 15.3971 2.41898 15.1162C2.41898 14.8354 2.65185 14.6025 2.93267 14.6025H15.2614C15.5423 14.6025 15.7751 14.8354 15.7751 15.1162C15.7751 15.3971 15.5423 15.6299 15.2614 15.6299Z"
                        fill="#3b82f6"
                      />
                      <path
                        d="M13.9053 2.94501C12.5765 1.61624 11.2751 1.58199 9.91212 2.94501L9.08336 3.77377C9.01486 3.84227 8.98747 3.95186 9.01486 4.04775C9.53541 5.86281 10.9875 7.31487 12.8025 7.83542C12.8299 7.84227 12.8573 7.84912 12.8847 7.84912C12.9601 7.84912 13.0286 7.82172 13.0834 7.76692L13.9053 6.93816C14.5834 6.26692 14.9121 5.61624 14.9121 4.9587C14.919 4.28062 14.5902 3.62309 13.9053 2.94501Z"
                        fill="#3b82f6"
                      />
                      <path
                        d="M11.5697 8.4585C11.371 8.36261 11.1792 8.26672 10.9943 8.15713C10.8436 8.06809 10.6998 7.9722 10.556 7.86946C10.4395 7.79412 10.3025 7.68453 10.1724 7.57494C10.1587 7.56809 10.1108 7.527 10.056 7.4722C9.82993 7.28042 9.57651 7.03385 9.35048 6.75987C9.32993 6.74617 9.29568 6.69823 9.24774 6.63658C9.17925 6.55439 9.06281 6.41741 8.96007 6.25987C8.87788 6.15713 8.78199 6.00645 8.69294 5.85576C8.58336 5.67083 8.48747 5.4859 8.39158 5.29412V5.29412C8.26585 5.02471 7.91225 4.94468 7.70203 5.1549L3.85048 9.00645C3.76144 9.09549 3.67925 9.26672 3.6587 9.38316L3.28883 12.0064C3.22034 12.4722 3.35048 12.9106 3.63815 13.2051C3.88473 13.4448 4.22719 13.5749 4.59705 13.5749C4.67925 13.5749 4.76144 13.5681 4.84363 13.5544L7.47377 13.1845C7.59705 13.164 7.76829 13.0818 7.85048 12.9927L11.7084 9.13485C11.9144 8.92882 11.837 8.57435 11.5697 8.4585V8.4585Z"
                        fill="#3b82f6"
                      />
                    </svg>
                  </div>
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() =>
                      document.getElementById("avatarInput")?.click()
                    }
                  >
                    <span className="text-white text-sm">{t("nav9")}</span>
                  </div>
                </div>

                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={(e: any) => {
                    // setIsOpen(false);
                    handleAvatarChange(e);
                  }}
                />
              </div>
              {/* ********************************************* */}
              <div>
                <div className="text-xl font-bold text-slate-600 capitalize">
                  {user?.first_name} {user?.last_name}
                </div>
                <div className="flex gap-3 items-start mt-3 w-full text-base font-medium tracking-wide max-w-[741px] text-zinc-900 max-md:max-w-full">
                  <div className="flex md:gap-2 items-center">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 4H7C4 4 2 5.5 2 9V16C2 19.5 4 21 7 21H17C20 21 22 19.5 22 16V9C22 5.5 20 4 17 4ZM17.47 10.09L14.34 12.59C13.68 13.12 12.84 13.38 12 13.38C11.16 13.38 10.31 13.12 9.66 12.59L6.53 10.09C6.21 9.83 6.16 9.35 6.41 9.03C6.67 8.71 7.14 8.65 7.46 8.91L10.59 11.41C11.35 12.02 12.64 12.02 13.4 11.41L16.53 8.91C16.85 8.65 17.33 8.7 17.58 9.03C17.84 9.35 17.79 9.83 17.47 10.09Z"
                        fill="#365D8D"
                      />
                    </svg>

                    <div className="self-stretch my-auto text-zinc-900 text-sm md:text-base">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex flex-col justify-center py-1 w-full md:w-1/2">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex gap-10 justify-between items-center w-full text-sm tracking-wide text-zinc-900 max-md:max-w-full">
                  <div className="self-stretch my-auto font-medium text-zinc-900">
                    {t("lable20")}
                  </div>
                  <div className="gap-2.5 self-stretch my-auto font-bold text-start whitespace-nowrap text-zinc-900">
                    {user?.profileProgress}%
                  </div>
                </div>
                <div className="flex flex-col justify-center py-px mt-4 w-full max-md:max-w-full">
                  <div className="w-full bg-gray-200 h-2.5 dark:bg-gray-700 bg-zinc-100">
                    <div
                      className={`${
                        user?.profileProgress <= 40
                          ? "bg-[#e23030]"
                          : user?.profileProgress > 40 &&
                            user?.profileProgress <= 70
                          ? "bg-[#CAA313]"
                          : user?.profileProgress > 70 &&
                            user?.profileProgress <= 89
                          ? "bg-[#2d2ae6]"
                          : user?.profileProgress >= 90
                          ? "bg-[#30e230]"
                          : ""
                      } h-2.5 rounded`}
                      style={{ width: `${user?.profileProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* second header */}
          <div className=" flex flex-col md:flex-row justify-between mt-4 xl:px-10 w-full text-sm text-center text-neutral-400 max-md:max-w-full">
            <div
              className={`flex gap-2.5 px-3 py-4 text-base font-medium capitalize cursor-pointer  max-md:px-5 items-center ${
                isActive == "personalData"
                  ? "text-emerald-500 border-b-2 border-solid border-b-emerald-500"
                  : "text-neutral-500 hover:text-emerald-500"
              }`}
              onClick={() => {
                setIsActive("personalData");
              }}
            >
              {t("head")}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                  fill={`${isActive == "personalData" ? "#07C37B" : "#A5A5A5"}`}
                />
              </svg>
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2.5 px-3 py-4 text-base font-medium capitalize  max-md:px-5 
            ${
              isActive == "documents"
                ? `${
                    user.files?.length > 0
                      ? "text-emerald-500 border-b-emerald-500"
                      : "text-[#CAA313] border-b-[#CAA313]"
                  }  border-b-2 border-solid `
                : `text-neutral-500 ${
                    user.files?.length > 0
                      ? "hover:text-emerald-500"
                      : "hover:text-[#CAA313]"
                  } `
            }`}
              onClick={() => {
                setIsActive("documents");
              }}
            >
              {t("nav1")}
              {user.files?.length > 0 ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                    fill={`${isActive == "documents" ? "#07C37B" : "#A5A5A5"}`}
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
                    fill={`${isActive == "documents" ? "#CAA313" : "#A5A5A5"}`}
                  />
                </svg>
              )}
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2.5 px-3 py-4 text-base font-medium capitalize  max-md:px-5 
            ${
              isActive == "certificates"
                ? `${
                    user.Certificates?.length > 0
                      ? "text-emerald-500 border-b-emerald-500"
                      : "text-[#CAA313] border-b-[#CAA313]"
                  }  border-b-2 border-solid `
                : `text-neutral-500 ${
                    user.Certificates?.length > 0
                      ? "hover:text-emerald-500"
                      : "hover:text-[#CAA313]"
                  } `
            }`}
              onClick={() => {
                setIsActive("certificates");
              }}
            >
              {t("nav2")}
              {user.Certificates?.length > 0 ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                    fill={`${
                      isActive == "certificates" ? "#07C37B" : "#A5A5A5"
                    }`}
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
                    fill={`${
                      isActive == "certificates" ? "#CAA313" : "#A5A5A5"
                    }`}
                  />
                </svg>
              )}
            </div>
            <div
              className={`flex items-center cursor-pointer gap-2.5 px-3 py-4 text-base font-medium capitalize  max-md:px-5 
            ${
              isActive == "testResults"
                ? `${
                    user.Quizzes?.length > 0
                      ? "text-emerald-500 border-b-emerald-500"
                      : "text-[#CAA313] border-b-[#CAA313]"
                  }  border-b-2 border-solid `
                : `text-neutral-500 ${
                    user.Quizzes?.length > 0
                      ? "hover:text-emerald-500"
                      : "hover:text-[#CAA313]"
                  } `
            }`}
              onClick={() => {
                setIsActive("testResults");
              }}
            >
              {t("nav3")}
              {user.Quizzes?.length > 0 ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                    fill={`${
                      isActive == "testResults" ? "#07C37B" : "#A5A5A5"
                    }`}
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
                    fill={`${
                      isActive == "testResults" ? "#CAA313" : "#A5A5A5"
                    }`}
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {isActive === "personalData" ? <NewDataInfo currentUser={user} /> : ""}
        {isActive === "documents" ? <NewMyDocs currentUser={user} /> : ""}
        {isActive === "certificates" ? (
          <NewCertification currentUser={user} />
        ) : (
          ""
        )}
        {isActive === "testResults" ? (
          <NewStudentResults currentUser={user} />
        ) : (
          ""
        )}
      </div>
    </ProtectedRoute>
  );
}
