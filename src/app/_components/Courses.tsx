import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../reduxTool-kit/slices/coursesSlice';
import useCurrentLang from '../_hooks/useCurrentLang';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import Pagination from './Pagination';
import SearchNotFound from './SearchNotFound';
import { AppDispatch } from '../store';
import Loader from './Loader';


function Courses() {

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
  const [requiredLevel, setRequiredLevel] = useState(null);
  const [price, setPrice] = useState(null);
  const [timeCourse, setTimeCourse] = useState(null);
  const [startDateForCourse, setStartDateForCourse] = useState<any[]>([]);
  const [date, setDate] = useState(null);
  const [maxStudents, setMaxStudents] = useState(null);
  const [maxNumberOfStudents, setMaxNumberOfStudents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const t = useTranslations("courses");
  const e = useTranslations("institutesCard");
  const params = useParams();
  const { locale, schoolsId, branchsId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const language = useCurrentLang();
  const { tokenMainSite } = parseCookies();
  const courses = useSelector((state: any) => state.courses);
  const user = useSelector((state: any) => state.displayUser);
  // console.log("courses //", courses);


  const getMaxNumberOfStudents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/max-no-of-students?branch_id=${branchsId}`);

      const result = await res.json();
      // console.log("MaxNumberOfStudents", result);
      setMaxNumberOfStudents(result);

    } catch (error) {
      console.log(error);
    }
  }
  const getStartDateForCourse = async () => {
    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/course-start-dates?branch_id=${branchsId}`);

      const result = await res.json();
      // console.log("StartDateForCourse", result);
      setStartDateForCourse(result);

    } catch (error) {
      console.log(error);
    }
  }


  const filterByStartDate = (valueDate: any) => {
    setDate(valueDate);
    dispatch(getAllCourses({ language, limt: 10, instituteBranchId: branchsId, userId: user.id, required_level: requiredLevel, time_of_course: timeCourse, sortOrder: price, max_no_of_students_per_class: maxStudents, course_start_dates: valueDate }));
  };
  const filterByMaxNumOfStudents = (number: any) => {
    setMaxStudents(number);
    dispatch(getAllCourses({ language, limt: 10, instituteBranchId: branchsId, userId: user.id, required_level: requiredLevel, time_of_course: timeCourse, sortOrder: price, max_no_of_students_per_class: number, course_start_dates: date }));
  };
  const filterByRequiredLevel = (level: any) => {
    setRequiredLevel(level);
    dispatch(getAllCourses({ language, limt: 10, instituteBranchId: branchsId, userId: user.id, required_level: level, time_of_course: timeCourse, sortOrder: price, max_no_of_students_per_class: maxStudents, course_start_dates: date }));
  };
  const filterByPricing = (sortPrice: any) => {
    setPrice(sortPrice)
    dispatch(getAllCourses({ language, limt: 10, instituteBranchId: branchsId, userId: user.id, required_level: requiredLevel, time_of_course: timeCourse, sortOrder: sortPrice, max_no_of_students_per_class: maxStudents, course_start_dates: date }));
  };
  const filterByTimeCourse = (time: any) => {
    setTimeCourse(time)
    dispatch(getAllCourses({ language, limt: 10, instituteBranchId: branchsId, userId: user.id, required_level: requiredLevel, time_of_course: time, sortOrder: price, max_no_of_students_per_class: maxStudents, course_start_dates: date }));
  };

  const getDaysRemaining = (endDate: any) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffInTime = end.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays > 0 ? diffInDays : 0;
  };


  const favorite = async (courseId: any) => {
    // console.log("favorite");
    // console.log("courseId", courseId);
    setLoadingStates((prev) => new Map(prev).set(courseId, true));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language":language,
          Authorization: `Bearer ${tokenMainSite}`
        },
        body: JSON.stringify({
          "courseId": courseId,
          "userId": user.id,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      console.log(result);
      dispatch(getAllCourses({ language, limt: 20, instituteBranchId: branchsId, userId: user.id }));
      toast.success(t("addSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(courseId, false));
    }
  }

  const unFavorite = async (courseId: any) => {
    setLoadingStates((prev) => new Map(prev).set(courseId, true));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/course`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language":language,
          Authorization: `Bearer ${tokenMainSite}`
        },
        body: JSON.stringify({
          "courseId": courseId,
          "userId": user.id,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      dispatch(getAllCourses({ language, limt: 20, instituteBranchId: branchsId, userId: user.id }));
      toast.success(t("removeSubscribe"));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingStates((prev) => new Map(prev).set(courseId, false));
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

  useEffect(() => {
    // if (!maxNumberOfStudents.length) {
    getMaxNumberOfStudents();
    // }
    // if (!startDateForCourse.length) {
    getStartDateForCourse();
    // }
    dispatch(getAllCourses({ page: currentPage, language, limt: 9, instituteBranchId: branchsId, userId: user.id }));
    // }, [user, currentPage, dispatch, branchsId, user , maxNumberOfStudents , startDateForCourse , language]);
  }, [user, currentPage, dispatch, branchsId, user, language]);

  

  return (
    <div className="flex flex-col self-stretch">
      <div className="flex gap-3  ">
        <div className="flex-1 my-auto text-xl font-semibold leading-9 text-start text-gray-900">
          {t("branchCourses")}
          {/* Branch Courses */}
        </div>
        <div className="flex gap-5 items-start p-2 bg-white rounded-[111px] ">
        </div>
      </div>

      <div className="justify-start mt-5 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/6 lg:w-3/12 max-md:w-full max-md:mb-5">
            <div className="flex flex-col justify-center px-5 pt-5 pb-9 mx-auto w-full bg-white rounded-xl border border-gray border-solid shadow-2xl">
              <div className="text-xl font-medium leading-6 text-start text-black">
                {t("head")}
                {/* Filters */}
              </div>
              {/* filter by Required Level */}
              <div className="shrink-0 mt-5 h-px bg-gray border border-gray border-solid" />
              <div className="space-y-4">
                <details
                  className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor my-5 px-4  py-2 text-gray-900">
                    <h2 className="font-medium">
                      {t("requiredLevel")}
                      {/* Required level */}
                    </h2>

                    <svg
                      className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <fieldset>
                    <div className="space-y-2">
                      <label
                        htmlFor="option1"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="recommended"
                              className="hidden peer"
                              value="all"
                              id="option1"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByRequiredLevel("Beginner");
                                } else {
                                  filterByRequiredLevel("مبتدئ");
                                }
                              }
                              }
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Beginner" : "مبتدئ"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>150</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option2"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="recommended"
                              className="hidden peer"
                              value="all"
                              id="option2"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByRequiredLevel("Elementary");
                                } else {
                                  filterByRequiredLevel("ابتدائي");
                                }
                              }
                              }
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Elementary" : "ابتدائي"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>150</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option3"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="recommended"
                              className="hidden peer"
                              value="all"
                              id="option3"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByRequiredLevel("Lower Intermediate");
                                } else {
                                  filterByRequiredLevel("أقل من المتوسط");
                                }
                              }
                              }
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Lower Intermediate" : "أقل من المتوسط"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>150</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option4"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="recommended"
                              className="hidden peer"
                              value="all"
                              id="option4"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByRequiredLevel("Intermediate");
                                } else {
                                  filterByRequiredLevel("متوسط");
                                }
                              }
                              }
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Intermediate" : "متوسط"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>150</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option5"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="recommended"
                              className="hidden peer"
                              value="all"
                              id="option5"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByRequiredLevel("Upper Intermediate");
                                } else {
                                  filterByRequiredLevel("فوق المتوسط");
                                }
                              }
                              }
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Upper Intermediate" : "فوق متوسط"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>150</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option6"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="recommended"
                              className="hidden peer"
                              value="all"
                              id="option6"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByRequiredLevel("Advanced");
                                } else {
                                  filterByRequiredLevel("متقدم");
                                }
                              }
                              }
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Advanced" : "متقدم"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>150</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option7"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="recommended"
                              className="hidden peer"
                              value="all"
                              id="option7"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByRequiredLevel("Professional");
                                } else {
                                  filterByRequiredLevel("محترف");
                                }
                              }
                              }
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Professional" : "محترف"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>150</span> */}
                        </div>
                      </label>
                    </div>
                  </fieldset>
                </details>
              </div>
              {/* filter by price */}
              <div className="space-y-4 ">
                <details
                  className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor my-5 px-4  py-2 text-gray-900 ">
                    <h2 className="font-medium">
                      {t("sec1")}
                      {/* Pricing */}

                    </h2>
                    <svg
                      className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <fieldset>
                    <div className="space-y-2">
                      <label
                        htmlFor="option70"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option70"
                              onClick={() => filterByPricing(null)}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              {t("all")}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>60</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option8"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option8"
                              onClick={() => filterByPricing("desc")}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              {t("maxmemPrice")}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>60</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option9"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option9"
                              onClick={() => filterByPricing("asc")}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              {t("minimumPrice")}
                            </strong>

                          </div>
                        </div>
                        <div>
                          {/* <span>60</span> */}
                        </div>
                      </label>
                    </div>
                  </fieldset>
                </details>
              </div>
              {/* filter by start study */}
              <div className="space-y-4 ">
                <details
                  className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"

                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor my-5 px-4  py-2 text-gray-900 ">
                    <h2 className="font-medium">
                      {t("StudyTime")}
                    </h2>
                    <svg
                      className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <fieldset>
                    {startDateForCourse.length > 0 && startDateForCourse.map((startDate: string, index: number) => {
                      return (
                        <div className="space-y-2" key={index}>
                          <label
                            htmlFor={`option70${index}`}
                            className="flex cursor-pointer justify-between px-1"
                            onClick={() => filterByStartDate(startDate)}
                          >
                            <div className="flex gap-4 items-center">
                              <div className="flex items-center">
                                &#8203;
                                <input
                                  type="radio"
                                  name="rating"
                                  className="hidden peer"
                                  id="option7"
                                />
                                <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                              </div>
                              <div className='flex gap-1'>
                                <strong className="font-medium text-gray-900">
                                  {startDate.slice(0, 10)}
                                </strong>
                              </div>
                            </div>
                            <div>
                              {/* <span>60</span> */}
                            </div>
                          </label>
                        </div>
                      )
                    })}
                  </fieldset>
                </details>
              </div>
              {/* filter by Study time */}
              <div className="space-y-4 ">
                <details
                  className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor my-5 px-4  py-2 text-gray-900 ">
                    <h2 className="font-medium">
                      {t("CourseDuration")}
                    </h2>
                    <svg
                      className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <fieldset>
                    <div className="space-y-2">
                      <label
                        htmlFor="option10"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option10"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByTimeCourse("Morning");
                                } else {
                                  filterByTimeCourse("صباحا");
                                }
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Morning" : "صباحا"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>60</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option11"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option11"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByTimeCourse("After Noon");
                                } else {
                                  filterByTimeCourse("بعد الظهر");
                                }
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "After Noon" : "بعد الظهر"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>60</span> */}
                        </div>
                      </label>
                      <label
                        htmlFor="option12"
                        className="flex cursor-pointer justify-between px-1"

                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option12"
                              onClick={() => {
                                if (language == 'en') {
                                  filterByTimeCourse("Evening");
                                } else {
                                  filterByTimeCourse("مساءا");
                                }
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              {(language == 'en') ? "Evening" : "مساءا"}
                            </strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>60</span> */}
                        </div>
                      </label>
                    </div>
                  </fieldset>
                </details>
              </div>
              {/* filter by maximum number of student */}
              <div className="space-y-4 ">
                <details
                  className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor my-5 px-4  py-2 text-gray-900 ">
                    <h2 className="font-medium">
                      {t("numberStudents")}
                    </h2>
                    <svg
                      className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <fieldset>
                    {maxNumberOfStudents && maxNumberOfStudents.map((num, index) => {
                      return (
                        <div className="space-y-2" key={index}>
                          <label
                            htmlFor={`option50${index}`}
                            className="flex cursor-pointer justify-between px-1"
                            onClick={() => filterByMaxNumOfStudents(num)}
                          >
                            <div className="flex gap-4 items-center">
                              <div className="flex items-center">
                                &#8203;
                                <input
                                  type="radio"
                                  name="rating"
                                  className="hidden peer"
                                  id={`option50${index}`}
                                />
                                <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                              </div>
                              <div className='flex gap-1'>
                                <strong className="font-medium text-gray-900">
                                  {num}
                                </strong>
                              </div>
                            </div>
                            <div>
                              {/* <span>60</span> */}
                            </div>
                          </label>
                        </div>
                      )
                    })}
                  </fieldset>
                </details>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-3/6 lg:w-9/12 max-md:ml-0 max-md:w-full">
            {courses.loading ? <Loader /> :
              <>
                <div className="flex flex-col grow self-stretch max-md:mt-5 max-md:max-w-full">
                  <div className="justify-start max-md:max-w-full">
                    <div className="flex flex-wrap gap-5 max-md:flex-col max-md:gap-0">
                      {courses?.courses?.data?.length > 0 ?
                        <>
                          {courses?.courses?.data?.map((course: any, index: number) => {
                            const daysRemaining = getDaysRemaining(course.offer_end_date);
                            const discountedPrice = course.isOfferValid ? (course.course?.min_cost - (course.course?.min_cost * (course.course.offer / 100))) : course.course.min_cost;
                            return (
                              <div key={index} className="flex flex-col max-md:ml-0 max-md:w-full flex-1">
                                <div className="flex flex-col grow p-5 w-full bg-white rounded-xl border border-gray border-solid shadow-2xl max-md:mt-5 max-md:max-w-full justify-between">
                                  <div className="flex gap-3 self-start text-xl font-semibold text-start text-primary">
                                    <Image
                                      src="/icons/Square Academic Cap.svg"
                                      width={25}
                                      height={25}
                                      alt="Square Academic Cap"
                                    />
                                    <div className='line-clamp-1'>{course.name}</div>
                                  </div>
                                  <div className="mt-3.5 text-base tracking-wide text-start text-ellipsis text-zinc-500 max-md:max-w-full line-clamp-2">
                                    {course.description}
                                  </div>
                                  <div className="mt-3.5 text-2xl font-semibold leading-6 text-start text-primary max-md:max-w-full">
                                    {discountedPrice} {course.course?.institutes_branch?.currency}
                                  </div>
                                  <div className="flex gap-1.5  mt-3 text-sm leading-6 max-md:flex-wrap max-md:px-5">
                                    {course.isOfferValid ? <>
                                      <div className="text-start text-zinc-500 line-through">
                                        {course.course?.min_cost}
                                        {course.course?.institutes_branch?.currency}
                                      </div>
                                      <div className="text-gray-900">
                                        {t("offer")} {course.course.offer?.toString()}%
                                      </div>
                                    </> : ""}
                                  </div>
                                  <div className="flex gap-1.5 mt-3 text-sm leading-6 text-rose-500 max-md:flex-wrap max-md:pl-5">
                                    {daysRemaining === 0 ? "" : <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M9.99935 2.79297C5.74215 2.79297 2.29102 6.24411 2.29102 10.5013C2.29102 14.7585 5.74215 18.2096 9.99935 18.2096C14.2565 18.2096 17.7077 14.7585 17.7077 10.5013C17.7077 6.24411 14.2565 2.79297 9.99935 2.79297ZM1.04102 10.5013C1.04102 5.55375 5.0518 1.54297 9.99935 1.54297C14.9469 1.54297 18.9577 5.55375 18.9577 10.5013C18.9577 15.4489 14.9469 19.4596 9.99935 19.4596C5.0518 19.4596 1.04102 15.4489 1.04102 10.5013ZM9.99935 6.54297C10.3445 6.54297 10.6243 6.82279 10.6243 7.16797V10.2424L12.5246 12.1427C12.7687 12.3868 12.7687 12.7825 12.5246 13.0266C12.2805 13.2707 11.8848 13.2707 11.6407 13.0266L9.55741 10.9432C9.4402 10.826 9.37435 10.6671 9.37435 10.5013V7.16797C9.37435 6.82279 9.65417 6.54297 9.99935 6.54297Z"
                                          fill="#FF4C51"
                                        />
                                      </svg>
                                      <div>{daysRemaining} days left for this price!</div>
                                    </>}

                                  </div>
                                  <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                      <div className="flex gap-2 justify-center items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="18"
                                          height="18"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M3.59998 7.87891H2C1.45 7.87891 1 8.32891 1 8.87891V17.4989C1 18.0489 1.45 18.4989 2 18.4989H3.59998C4.14998 18.4989 4.59998 18.0489 4.59998 17.4989V8.87891C4.59998 8.32891 4.14998 7.87891 3.59998 7.87891Z"
                                            stroke="black"
                                            strokeOpacity="0.88"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M10.7992 4.69141H9.19922C8.64922 4.69141 8.19922 5.14141 8.19922 5.69141V17.5014C8.19922 18.0514 8.64922 18.5014 9.19922 18.5014H10.7992C11.3492 18.5014 11.7992 18.0514 11.7992 17.5014V5.69141C11.7992 5.14141 11.3492 4.69141 10.7992 4.69141Z"
                                            stroke="black"
                                            strokeOpacity="0.88"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M18.0004 1.5H16.4004C15.8504 1.5 15.4004 1.95 15.4004 2.5V17.5C15.4004 18.05 15.8504 18.5 16.4004 18.5H18.0004C18.5504 18.5 19.0004 18.05 19.0004 17.5V2.5C19.0004 1.95 18.5504 1.5 18.0004 1.5Z"
                                            stroke="black"
                                            strokeOpacity="0.88"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div className="text-gray-900 text-nowrap">
                                          {t("requiredLevel")}
                                          <div className="self-start font-medium text-gray">
                                            {course.required_level}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-2.5 justify-center  py-1.5 rounded-2xl max-md:px-5">
                                      <div className="flex gap-2 justify-center items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="21"
                                          viewBox="0 0 20 21"
                                          fill="none"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.99935 2.79297C5.74215 2.79297 2.29102 6.24411 2.29102 10.5013C2.29102 14.7585 5.74215 18.2096 9.99935 18.2096C14.2565 18.2096 17.7077 14.7585 17.7077 10.5013C17.7077 6.24411 14.2565 2.79297 9.99935 2.79297ZM1.04102 10.5013C1.04102 5.55375 5.0518 1.54297 9.99935 1.54297C14.9469 1.54297 18.9577 5.55375 18.9577 10.5013C18.9577 15.4489 14.9469 19.4596 9.99935 19.4596C5.0518 19.4596 1.04102 15.4489 1.04102 10.5013ZM9.99935 6.54297C10.3445 6.54297 10.6243 6.82279 10.6243 7.16797V10.2424L12.5246 12.1427C12.7687 12.3868 12.7687 12.7825 12.5246 13.0266C12.2805 13.2707 11.8848 13.2707 11.6407 13.0266L9.55741 10.9432C9.4402 10.826 9.37435 10.6671 9.37435 10.5013V7.16797C9.37435 6.82279 9.65417 6.54297 9.99935 6.54297Z"
                                            fill="#000000"
                                          />
                                        </svg>
                                        <div className="text-gray-900">
                                          {t("StudyTime")}
                                          <div className="self-start font-medium text-gray">
                                            {course.time_of_course}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center  py-1.5 rounded-2xl">
                                      <div className="flex gap-2 justify-center items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="25"
                                          viewBox="0 0 25 25"
                                          fill="none"
                                        >
                                          <path
                                            d="M9.91055 11.37C9.81055 11.36 9.69055 11.36 9.58055 11.37C7.20055 11.29 5.31055 9.34 5.31055 6.94C5.31055 4.49 7.29055 2.5 9.75055 2.5C12.2005 2.5 14.1905 4.49 14.1905 6.94C14.1805 9.34 12.2905 11.29 9.91055 11.37Z"
                                            stroke="black"
                                            strokeOpacity="0.88"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M17.1593 4.5C19.0993 4.5 20.6593 6.07 20.6593 8C20.6593 9.89 19.1593 11.43 17.2893 11.5C17.2093 11.49 17.1193 11.49 17.0293 11.5"
                                            stroke="black"
                                            strokeOpacity="0.88"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M4.9107 15.06C2.4907 16.68 2.4907 19.32 4.9107 20.93C7.6607 22.77 12.1707 22.77 14.9207 20.93C17.3407 19.31 17.3407 16.67 14.9207 15.06C12.1807 13.23 7.6707 13.23 4.9107 15.06Z"
                                            stroke="black"
                                            strokeOpacity="0.88"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M19.0898 20.5C19.8098 20.35 20.4898 20.06 21.0498 19.63C22.6098 18.46 22.6098 16.53 21.0498 15.36C20.4998 14.94 19.8298 14.66 19.1198 14.5"
                                            stroke="black"
                                            strokeOpacity="0.88"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <div className="text-gray-900">
                                          {" "}
                                          {t("numberStudents")}
                                          <div className="self-start font-medium text-gray">
                                            {course.max_no_of_students}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex gap-0 justify-between mt-3.5 text-sm leading-6 text-start max-md:flex-wrap">
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                      <svg width="20" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5 12.5C17.0523 12.5 17.5 12.0523 17.5 11.5C17.5 10.9477 17.0523 10.5 16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5C15.5 12.0523 15.9477 12.5 16.5 12.5Z" fill="#141522" />
                                        <path d="M16.5 16.5C17.0523 16.5 17.5 16.0523 17.5 15.5C17.5 14.9477 17.0523 14.5 16.5 14.5C15.9477 14.5 15.5 14.9477 15.5 15.5C15.5 16.0523 15.9477 16.5 16.5 16.5Z" fill="#141522" />
                                        <path d="M12.5 11.5C12.5 12.0523 12.0523 12.5 11.5 12.5C10.9477 12.5 10.5 12.0523 10.5 11.5C10.5 10.9477 10.9477 10.5 11.5 10.5C12.0523 10.5 12.5 10.9477 12.5 11.5Z" fill="#141522" />
                                        <path d="M12.5 15.5C12.5 16.0523 12.0523 16.5 11.5 16.5C10.9477 16.5 10.5 16.0523 10.5 15.5C10.5 14.9477 10.9477 14.5 11.5 14.5C12.0523 14.5 12.5 14.9477 12.5 15.5Z" fill="#141522" />
                                        <path d="M6.5 12.5C7.05229 12.5 7.5 12.0523 7.5 11.5C7.5 10.9477 7.05229 10.5 6.5 10.5C5.94772 10.5 5.5 10.9477 5.5 11.5C5.5 12.0523 5.94772 12.5 6.5 12.5Z" fill="#141522" />
                                        <path d="M6.5 16.5C7.05229 16.5 7.5 16.0523 7.5 15.5C7.5 14.9477 7.05229 14.5 6.5 14.5C5.94772 14.5 5.5 14.9477 5.5 15.5C5.5 16.0523 5.94772 16.5 6.5 16.5Z" fill="#141522" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0.25C6.91421 0.25 7.25 0.585786 7.25 1V1.76272C7.912 1.74999 8.64133 1.74999 9.44346 1.75H13.5564C14.3586 1.74999 15.088 1.74999 15.75 1.76272V1C15.75 0.585786 16.0858 0.25 16.5 0.25C16.9142 0.25 17.25 0.585786 17.25 1V1.82709C17.5099 1.84691 17.7561 1.87182 17.989 1.90313C19.1614 2.06076 20.1104 2.39288 20.8588 3.14124C21.6071 3.88961 21.9392 4.83855 22.0969 6.01098C22.25 7.15018 22.25 8.6058 22.25 10.4435V12.5564C22.25 14.3941 22.25 15.8498 22.0969 16.989C21.9392 18.1614 21.6071 19.1104 20.8588 19.8588C20.1104 20.6071 19.1614 20.9392 17.989 21.0969C16.8498 21.25 15.3942 21.25 13.5565 21.25H9.44359C7.60585 21.25 6.15018 21.25 5.01098 21.0969C3.83856 20.9392 2.88961 20.6071 2.14124 19.8588C1.39288 19.1104 1.06076 18.1614 0.903135 16.989C0.749972 15.8498 0.749985 14.3942 0.75 12.5564V10.4436C0.749985 8.60582 0.749972 7.15019 0.903135 6.01098C1.06076 4.83855 1.39288 3.88961 2.14124 3.14124C2.88961 2.39288 3.83856 2.06076 5.01098 1.90313C5.2439 1.87182 5.49006 1.84691 5.75 1.82709V1C5.75 0.585786 6.08579 0.25 6.5 0.25ZM5.21085 3.38976C4.20476 3.52502 3.62511 3.77869 3.2019 4.2019C2.77869 4.62511 2.52502 5.20476 2.38976 6.21085C2.36685 6.38123 2.3477 6.56061 2.33168 6.75H20.6683C20.6523 6.56061 20.6331 6.38124 20.6102 6.21085C20.475 5.20476 20.2213 4.62511 19.7981 4.2019C19.3749 3.77869 18.7952 3.52502 17.7892 3.38976C16.7615 3.25159 15.4068 3.25 13.5 3.25H9.5C7.59318 3.25 6.23851 3.25159 5.21085 3.38976ZM2.25 10.5C2.25 9.64599 2.25032 8.90273 2.26309 8.25H20.7369C20.7497 8.90273 20.75 9.64599 20.75 10.5V12.5C20.75 14.4068 20.7484 15.7615 20.6102 16.7892C20.475 17.7952 20.2213 18.3749 19.7981 18.7981C19.3749 19.2213 18.7952 19.475 17.7892 19.6102C16.7615 19.7484 15.4068 19.75 13.5 19.75H9.5C7.59318 19.75 6.23851 19.7484 5.21085 19.6102C4.20476 19.475 3.62511 19.2213 3.2019 18.7981C2.77869 18.3749 2.52502 17.7952 2.38976 16.7892C2.25159 15.7615 2.25 14.4068 2.25 12.5V10.5Z" fill="#141522" />
                                      </svg>

                                      <div className="flex flex-col justify-center">
                                        <div className="self-start text-gray-900">
                                          {t("CourseDuration2")}
                                        </div>
                                        <div className="font-medium text-gray text-nowrap">
                                          {course.course_duration}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                      <svg width="21" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5 12.5C17.0523 12.5 17.5 12.0523 17.5 11.5C17.5 10.9477 17.0523 10.5 16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5C15.5 12.0523 15.9477 12.5 16.5 12.5Z" fill="#141522" />
                                        <path d="M16.5 16.5C17.0523 16.5 17.5 16.0523 17.5 15.5C17.5 14.9477 17.0523 14.5 16.5 14.5C15.9477 14.5 15.5 14.9477 15.5 15.5C15.5 16.0523 15.9477 16.5 16.5 16.5Z" fill="#141522" />
                                        <path d="M12.5 11.5C12.5 12.0523 12.0523 12.5 11.5 12.5C10.9477 12.5 10.5 12.0523 10.5 11.5C10.5 10.9477 10.9477 10.5 11.5 10.5C12.0523 10.5 12.5 10.9477 12.5 11.5Z" fill="#141522" />
                                        <path d="M12.5 15.5C12.5 16.0523 12.0523 16.5 11.5 16.5C10.9477 16.5 10.5 16.0523 10.5 15.5C10.5 14.9477 10.9477 14.5 11.5 14.5C12.0523 14.5 12.5 14.9477 12.5 15.5Z" fill="#141522" />
                                        <path d="M6.5 12.5C7.05229 12.5 7.5 12.0523 7.5 11.5C7.5 10.9477 7.05229 10.5 6.5 10.5C5.94772 10.5 5.5 10.9477 5.5 11.5C5.5 12.0523 5.94772 12.5 6.5 12.5Z" fill="#141522" />
                                        <path d="M6.5 16.5C7.05229 16.5 7.5 16.0523 7.5 15.5C7.5 14.9477 7.05229 14.5 6.5 14.5C5.94772 14.5 5.5 14.9477 5.5 15.5C5.5 16.0523 5.94772 16.5 6.5 16.5Z" fill="#141522" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0.25C6.91421 0.25 7.25 0.585786 7.25 1V1.76272C7.912 1.74999 8.64133 1.74999 9.44346 1.75H13.5564C14.3586 1.74999 15.088 1.74999 15.75 1.76272V1C15.75 0.585786 16.0858 0.25 16.5 0.25C16.9142 0.25 17.25 0.585786 17.25 1V1.82709C17.5099 1.84691 17.7561 1.87182 17.989 1.90313C19.1614 2.06076 20.1104 2.39288 20.8588 3.14124C21.6071 3.88961 21.9392 4.83855 22.0969 6.01098C22.25 7.15018 22.25 8.6058 22.25 10.4435V12.5564C22.25 14.3941 22.25 15.8498 22.0969 16.989C21.9392 18.1614 21.6071 19.1104 20.8588 19.8588C20.1104 20.6071 19.1614 20.9392 17.989 21.0969C16.8498 21.25 15.3942 21.25 13.5565 21.25H9.44359C7.60585 21.25 6.15018 21.25 5.01098 21.0969C3.83856 20.9392 2.88961 20.6071 2.14124 19.8588C1.39288 19.1104 1.06076 18.1614 0.903135 16.989C0.749972 15.8498 0.749985 14.3942 0.75 12.5564V10.4436C0.749985 8.60582 0.749972 7.15019 0.903135 6.01098C1.06076 4.83855 1.39288 3.88961 2.14124 3.14124C2.88961 2.39288 3.83856 2.06076 5.01098 1.90313C5.2439 1.87182 5.49006 1.84691 5.75 1.82709V1C5.75 0.585786 6.08579 0.25 6.5 0.25ZM5.21085 3.38976C4.20476 3.52502 3.62511 3.77869 3.2019 4.2019C2.77869 4.62511 2.52502 5.20476 2.38976 6.21085C2.36685 6.38123 2.3477 6.56061 2.33168 6.75H20.6683C20.6523 6.56061 20.6331 6.38124 20.6102 6.21085C20.475 5.20476 20.2213 4.62511 19.7981 4.2019C19.3749 3.77869 18.7952 3.52502 17.7892 3.38976C16.7615 3.25159 15.4068 3.25 13.5 3.25H9.5C7.59318 3.25 6.23851 3.25159 5.21085 3.38976ZM2.25 10.5C2.25 9.64599 2.25032 8.90273 2.26309 8.25H20.7369C20.7497 8.90273 20.75 9.64599 20.75 10.5V12.5C20.75 14.4068 20.7484 15.7615 20.6102 16.7892C20.475 17.7952 20.2213 18.3749 19.7981 18.7981C19.3749 19.2213 18.7952 19.475 17.7892 19.6102C16.7615 19.7484 15.4068 19.75 13.5 19.75H9.5C7.59318 19.75 6.23851 19.7484 5.21085 19.6102C4.20476 19.475 3.62511 19.2213 3.2019 18.7981C2.77869 18.3749 2.52502 17.7952 2.38976 16.7892C2.25159 15.7615 2.25 14.4068 2.25 12.5V10.5Z" fill="#141522" />
                                      </svg>

                                      <div className="flex flex-col justify-center">
                                        <div className="self-start text-gray-900">
                                          {t("LessonDuration")}
                                        </div>
                                        <div className="font-medium text-gray text-nowrap">
                                          {course.lesson_duration} {t("minute")}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                                      <svg width="21" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5 12.5C17.0523 12.5 17.5 12.0523 17.5 11.5C17.5 10.9477 17.0523 10.5 16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5C15.5 12.0523 15.9477 12.5 16.5 12.5Z" fill="#141522" />
                                        <path d="M16.5 16.5C17.0523 16.5 17.5 16.0523 17.5 15.5C17.5 14.9477 17.0523 14.5 16.5 14.5C15.9477 14.5 15.5 14.9477 15.5 15.5C15.5 16.0523 15.9477 16.5 16.5 16.5Z" fill="#141522" />
                                        <path d="M12.5 11.5C12.5 12.0523 12.0523 12.5 11.5 12.5C10.9477 12.5 10.5 12.0523 10.5 11.5C10.5 10.9477 10.9477 10.5 11.5 10.5C12.0523 10.5 12.5 10.9477 12.5 11.5Z" fill="#141522" />
                                        <path d="M12.5 15.5C12.5 16.0523 12.0523 16.5 11.5 16.5C10.9477 16.5 10.5 16.0523 10.5 15.5C10.5 14.9477 10.9477 14.5 11.5 14.5C12.0523 14.5 12.5 14.9477 12.5 15.5Z" fill="#141522" />
                                        <path d="M6.5 12.5C7.05229 12.5 7.5 12.0523 7.5 11.5C7.5 10.9477 7.05229 10.5 6.5 10.5C5.94772 10.5 5.5 10.9477 5.5 11.5C5.5 12.0523 5.94772 12.5 6.5 12.5Z" fill="#141522" />
                                        <path d="M6.5 16.5C7.05229 16.5 7.5 16.0523 7.5 15.5C7.5 14.9477 7.05229 14.5 6.5 14.5C5.94772 14.5 5.5 14.9477 5.5 15.5C5.5 16.0523 5.94772 16.5 6.5 16.5Z" fill="#141522" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0.25C6.91421 0.25 7.25 0.585786 7.25 1V1.76272C7.912 1.74999 8.64133 1.74999 9.44346 1.75H13.5564C14.3586 1.74999 15.088 1.74999 15.75 1.76272V1C15.75 0.585786 16.0858 0.25 16.5 0.25C16.9142 0.25 17.25 0.585786 17.25 1V1.82709C17.5099 1.84691 17.7561 1.87182 17.989 1.90313C19.1614 2.06076 20.1104 2.39288 20.8588 3.14124C21.6071 3.88961 21.9392 4.83855 22.0969 6.01098C22.25 7.15018 22.25 8.6058 22.25 10.4435V12.5564C22.25 14.3941 22.25 15.8498 22.0969 16.989C21.9392 18.1614 21.6071 19.1104 20.8588 19.8588C20.1104 20.6071 19.1614 20.9392 17.989 21.0969C16.8498 21.25 15.3942 21.25 13.5565 21.25H9.44359C7.60585 21.25 6.15018 21.25 5.01098 21.0969C3.83856 20.9392 2.88961 20.6071 2.14124 19.8588C1.39288 19.1104 1.06076 18.1614 0.903135 16.989C0.749972 15.8498 0.749985 14.3942 0.75 12.5564V10.4436C0.749985 8.60582 0.749972 7.15019 0.903135 6.01098C1.06076 4.83855 1.39288 3.88961 2.14124 3.14124C2.88961 2.39288 3.83856 2.06076 5.01098 1.90313C5.2439 1.87182 5.49006 1.84691 5.75 1.82709V1C5.75 0.585786 6.08579 0.25 6.5 0.25ZM5.21085 3.38976C4.20476 3.52502 3.62511 3.77869 3.2019 4.2019C2.77869 4.62511 2.52502 5.20476 2.38976 6.21085C2.36685 6.38123 2.3477 6.56061 2.33168 6.75H20.6683C20.6523 6.56061 20.6331 6.38124 20.6102 6.21085C20.475 5.20476 20.2213 4.62511 19.7981 4.2019C19.3749 3.77869 18.7952 3.52502 17.7892 3.38976C16.7615 3.25159 15.4068 3.25 13.5 3.25H9.5C7.59318 3.25 6.23851 3.25159 5.21085 3.38976ZM2.25 10.5C2.25 9.64599 2.25032 8.90273 2.26309 8.25H20.7369C20.7497 8.90273 20.75 9.64599 20.75 10.5V12.5C20.75 14.4068 20.7484 15.7615 20.6102 16.7892C20.475 17.7952 20.2213 18.3749 19.7981 18.7981C19.3749 19.2213 18.7952 19.475 17.7892 19.6102C16.7615 19.7484 15.4068 19.75 13.5 19.75H9.5C7.59318 19.75 6.23851 19.7484 5.21085 19.6102C4.20476 19.475 3.62511 19.2213 3.2019 18.7981C2.77869 18.3749 2.52502 17.7952 2.38976 16.7892C2.25159 15.7615 2.25 14.4068 2.25 12.5V10.5Z" fill="#141522" />
                                      </svg>

                                      <div className="flex flex-col justify-center">
                                        <div className="self-start text-gray-900">
                                          {t("LessonsWeekly")}
                                        </div>
                                        <div className="font-medium text-gray text-nowrap">
                                          {course.lessons_per_week}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2.5 mt-3.5 max-md:flex-wrap">
                                    {loadingStates.get(course.courses_id) ? <Spinner /> :
                                      <>
                                        <Link href={`/${language}/language-schools/${schoolsId}/${branchsId}/${course.courses_id}`}
                                          className="flex-1 justify-center text-center px-10 py-2 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300"
                                          onClick={() => setLoadingStates((prev) => new Map(prev).set(course.courses_id, true))}>
                                          {t("BrowseTheCourse")}{" "}
                                        </Link>
                                        <div className="flex justify-center items-center px-4 py-2.5 rounded-2xl border border-gray border-solid cursor-pointer hover:border-primary" onClick={() => {
                                          if (tokenMainSite && user.id) {
                                            console.log("login");
                                            if (course.is_favorite) {
                                              unFavorite(course.id);
                                            } else if (!course.is_favorite) {
                                              favorite(course.id);
                                            }
                                          } else {
                                            toast.error(e("messageError"));
                                          }

                                        }}>
                                          {course.is_favorite ? <svg width="20" height="17" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M0.916016 7.54014C0.916016 13.4162 5.77282 16.5474 9.32811 19.3501C10.5827 20.3391 11.791 21.2703 12.9993 21.2703C14.2077 21.2703 15.416 20.3391 16.6706 19.3501C20.2259 16.5474 25.0827 13.4162 25.0827 7.54014C25.0827 1.6641 18.4367 -2.50308 12.9993 3.14608C7.56204 -2.50308 0.916016 1.6641 0.916016 7.54014Z" fill="#FF0000" />
                                          </svg> : <svg width="20" height="17" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.916016 7.54014C0.916016 13.4162 5.77282 16.5474 9.32811 19.3501C10.5827 20.3391 11.791 21.2703 12.9993 21.2703C14.2077 21.2703 15.416 20.3391 16.6706 19.3501C20.2259 16.5474 25.0827 13.4162 25.0827 7.54014C25.0827 1.6641 18.4367 -2.50308 12.9993 3.14608C7.56204 -2.50308 0.916016 1.6641 0.916016 7.54014Z" fill="#CFCFCF" />
                                          </svg>}
                                        </div>
                                      </>
                                    }
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </> : <SearchNotFound head="Courses" />}

                    </div>
                  </div>
                </div>
                {courses?.courses?.data?.length > 0 && <div className="px-10 pt-5">
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    disableNext={!hasMoreData}
                    numberOfPages={courses?.courses?.pages}
                  />
                </div>}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses
