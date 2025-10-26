"use client";
import Loader from "@/app/_components/Loader";
import NotFound from "@/app/_components/NotFound";
import ProtectedRoute from "@/app/_components/ProtectedRoute";
import RequestTableCourse from "@/app/_components/RequestTableCourse";
import RequestTableProgram from "@/app/_components/RequestTableProgram";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { getAllRequests } from "@/app/reduxTool-kit/slices/requestsSlice";
import { AppDispatch } from "@/app/store";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MyRequests() {
  const dispatch = useDispatch<AppDispatch>();
  const language = useCurrentLang();
  const [activeButton, setActiveButton] = useState<string>("program");
  const requests = useSelector((state: any) => state.request);
  const t = useTranslations("Profile");

  useEffect(() => {
    dispatch(getAllRequests({ language }));
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <div className="flex overflow-hidden flex-col bg-zinc-100">
        <div className="flex overflow-hidden flex-col items-center self-center pb-5 my-8 w-full bg-white rounded-lg border border-solid border-zinc-100 max-w-[1199px] max-md:max-w-full">
          {/* heading */}
          <div className="flex overflow-hidden flex-col justify-center items-start self-stretch px-6 py-3 w-full text-sm font-medium tracking-wide border-b border-solid border-b-zinc-100 text-zinc-900 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-2 items-center">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 0.5H16C17.937 0.5 19.4999 2.05926 19.5 3.96973V14.0303C19.4999 15.9407 17.937 17.5 16 17.5H4C2.06296 17.5 0.500149 15.9407 0.5 14.0303V3.96973C0.500149 2.05926 2.06296 0.5 4 0.5ZM6.06738 9.58203L5.64258 9.6123C3.72541 9.7949 2.19708 11.3118 2.00293 13.2295L2.00195 13.2373L2.00098 13.2441C1.98117 13.5214 2.07912 13.7945 2.25879 13.9941C2.44926 14.2058 2.72695 14.3203 3 14.3203H10C10.2731 14.3203 10.5507 14.2058 10.7412 13.9941C10.92 13.7955 11.0284 13.5103 10.9854 13.209H10.9844C10.797 11.3576 9.34935 9.88805 7.52539 9.63281L7.34766 9.6123H7.34668C6.92593 9.57262 6.49381 9.5622 6.06738 9.58203ZM15 11.75C14.3139 11.75 13.75 12.3139 13.75 13C13.75 13.6861 14.3139 14.25 15 14.25H17C17.6861 14.25 18.25 13.6861 18.25 13C18.25 12.3139 17.6861 11.75 17 11.75H15ZM13 7.75C12.3139 7.75 11.75 8.31386 11.75 9C11.75 9.68614 12.3139 10.25 13 10.25H17C17.6861 10.25 18.25 9.68614 18.25 9C18.25 8.31386 17.6861 7.75 17 7.75H13ZM6.5 3.66992C4.95386 3.66992 3.69043 4.93433 3.69043 6.48047C3.69069 8.0264 4.95401 9.29004 6.5 9.29004C8.04599 9.29004 9.30931 8.0264 9.30957 6.48047C9.30957 4.93433 8.04614 3.66992 6.5 3.66992ZM12 3.75C11.3139 3.75 10.75 4.31386 10.75 5C10.75 5.68614 11.3139 6.25 12 6.25H17C17.6861 6.25 18.25 5.68614 18.25 5C18.25 4.31386 17.6861 3.75 17 3.75H12Z"
                  fill="#365D8D"
                  stroke="#365D8D"
                />
              </svg>
              <div className="self-stretch my-auto text-zinc-900">
                {t("nav4")}
              </div>
            </div>
          </div>

          {/* Tabs Program & Courses */}
          <div className="flex flex-wrap gap-5 justify-between mt-4 w-full max-w-[1150px] max-md:max-w-full">
            <div className="flex relative items-start">
              <div className="flex items-center my-auto">
                {/* Programs */}
                <div
                  onClick={() => setActiveButton("program")}
                  className={`flex gap-1 justify-center items-center p-4 my-auto cursor-pointer ${
                    activeButton === "program"
                      ? "border-b-2 border-amber-500"
                      : ""
                  } `}
                >
                  <div
                    className={`flex items-center gap-1 my-auto text-sm ${
                      activeButton === "program"
                        ? "font-bold text-zinc-900"
                        : "text-neutral-400 font-medium"
                    }  tracking-wide whitespace-nowrap `}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.7935 0.333984H4.20683C1.78016 0.333984 0.333496 1.78065 0.333496 4.20732V9.78732C0.333496 12.2207 1.78016 13.6673 4.20683 13.6673H9.78683C12.2135 13.6673 13.6602 12.2207 13.6602 9.79399V4.20732C13.6668 1.78065 12.2202 0.333984 9.7935 0.333984ZM9.50016 9.50065H4.50016C4.22683 9.50065 4.00016 9.27398 4.00016 9.00065C4.00016 8.72732 4.22683 8.50065 4.50016 8.50065H9.50016C9.7735 8.50065 10.0002 8.72732 10.0002 9.00065C10.0002 9.27398 9.7735 9.50065 9.50016 9.50065ZM9.50016 5.50065H4.50016C4.22683 5.50065 4.00016 5.27398 4.00016 5.00065C4.00016 4.72732 4.22683 4.50065 4.50016 4.50065H9.50016C9.7735 4.50065 10.0002 4.72732 10.0002 5.00065C10.0002 5.27398 9.7735 5.50065 9.50016 5.50065Z"
                        fill={
                          activeButton === "program" ? "#F89A21" : "#A5A5A5"
                        }
                      />
                    </svg>
                    {t("requests")}
                  </div>
                </div>
                {/* Courses */}
                <div
                  onClick={() => setActiveButton("course")}
                  className={`flex gap-1 justify-center items-center p-4 my-auto cursor-pointer ${
                    activeButton === "course"
                      ? "border-b-2 border-amber-500"
                      : ""
                  } `}
                >
                  <div
                    className={`flex items-center gap-1 my-auto text-sm ${
                      activeButton === "course"
                        ? "font-bold text-zinc-900"
                        : "text-neutral-400 font-medium"
                    }  tracking-wide whitespace-nowrap `}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.667 6.79398H11.7403C10.1603 6.79398 8.87366 5.50732 8.87366 3.92732V2.00065C8.87366 1.63398 8.57366 1.33398 8.20699 1.33398H5.38033C3.32699 1.33398 1.66699 2.66732 1.66699 5.04732V10.954C1.66699 13.334 3.32699 14.6673 5.38033 14.6673H10.6203C12.6737 14.6673 14.3337 13.334 14.3337 10.954V7.46065C14.3337 7.09398 14.0337 6.79398 13.667 6.79398Z"
                        fill={activeButton === "course" ? "#F89A21" : "#A5A5A5"}
                      />
                      <path
                        d="M10.5338 1.47365C10.2604 1.20032 9.78711 1.38699 9.78711 1.76699V4.09365C9.78711 5.06699 10.6138 5.87365 11.6204 5.87365C12.2538 5.88032 13.1338 5.88032 13.8871 5.88032C14.2671 5.88032 14.4671 5.43365 14.2004 5.16699C13.2404 4.20032 11.5204 2.46032 10.5338 1.47365Z"
                        fill={activeButton === "course" ? "#F89A21" : "#A5A5A5"}
                      />
                    </svg>
                    {t("requests11")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {requests.loading && <Loader />}
          {!requests.loading && (
            <>
              {activeButton === "program" ? (
                requests.request?.University_Orders?.length > 0 ? (
                  <RequestTableProgram
                    headers={[
                      t("requests20"),
                      t("requests21"),
                      t("requests22"),
                      t("requests8"),
                      t("requests9"),
                      t("requests17"),
                      t("requestRate"),
                      t("requests23"),
                    ]}
                    data={requests.request?.University_Orders}
                  />
                ) : (
                  <NotFound
                    head="There are no requests yet."
                    summary="You have not placed any orders yet. Once you have placed an order,
                                you will be able to track the status and manage your orders here.
                                Continue exploring and shopping to fill this section with what suits
                                your needs."
                    button="Add your Program"
                    link="university"
                  />
                )
              ) : requests.request?.Institute_Orders.length > 0 ? (
                <RequestTableCourse
                  headers={[
                    t("requests31"),
                    t("requests21"),
                    t("requests22"),
                    t("favorite1"),
                    t("requests9"),
                    t("requests17"),
                    t("requestRate"),
                    t("requests23"),
                  ]}
                  data={requests.request?.Institute_Orders}
                />
              ) : (
                <NotFound
                  head="There are no requests yet."
                  summary="You have not placed any orders yet. Once you have placed an order,
                                you will be able to track the status and manage your orders here.
                                Continue exploring and shopping to fill this section with what suits
                                your needs."
                  button="Add your Course"
                  link="language-schools"
                />
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default MyRequests;
