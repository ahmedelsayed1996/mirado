"use client"
import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import ProductUNI from './ProductUNI';
import SearchNotFound from './SearchNotFound';
import { useTranslations } from 'next-intl';
import ProductListUNI from './ProductListUNI';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversities } from '../reduxTool-kit/slices/universitiesSlice';
import useCurrentLang from '../_hooks/useCurrentLang';
import { AppDispatch } from '../store';

const FilterUNI: React.FC = () => {

  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [card, setCard] = useState<boolean>(true);
  const [recommend, setRecommended] = useState<string>('all');
  const [rating, setRating] = useState<string>("");
  const [numberOfStars, setNumberOfStars] = useState<string>("");
  const t = useTranslations('languageSchool');
  const f = useTranslations("filtration");
  const s = useTranslations("Filters");
  const language = useCurrentLang();
  const dispatch = useDispatch<AppDispatch>();
  const universities = useSelector((state: any) => state.universities);
  const user = useSelector((state: any) => state.displayUser);

  const FillStar = () => (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8748 6.03453C15.8229 5.87486 15.6849 5.7585 15.5188 5.73439L10.8524 5.05629L8.76551 0.827841C8.69125 0.677315 8.53793 0.582031 8.37009 0.582031C8.20222 0.582031 8.04893 0.677315 7.97464 0.827841L5.88762 5.05629L1.22132 5.73439C1.05525 5.7585 0.917216 5.87486 0.865355 6.0345C0.813465 6.19417 0.856741 6.36942 0.976955 6.48658L4.35344 9.77798L3.55647 14.4255C3.52807 14.591 3.5961 14.7582 3.7319 14.8569C3.80872 14.9127 3.89971 14.9411 3.99114 14.9411C4.06135 14.9411 4.13179 14.9243 4.19629 14.8904L8.37006 12.6961L12.5437 14.8904C12.6923 14.9685 12.8723 14.9555 13.0081 14.8568C13.1439 14.7582 13.2119 14.5909 13.1836 14.4255L12.3863 9.77798L15.7632 6.48655C15.8834 6.36942 15.9267 6.19417 15.8748 6.03453Z" fill="#FFC62A" />
    </svg>
  )
  const SolidStar = () => (
    <svg width="16" height="16" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.7673 6.03453C15.7155 5.87486 15.5775 5.7585 15.4114 5.73439L10.745 5.05629L8.65809 0.827841C8.58383 0.677315 8.43051 0.582031 8.26267 0.582031C8.0948 0.582031 7.94151 0.677315 7.86721 0.827841L5.7802 5.05629L1.1139 5.73439C0.947825 5.7585 0.809794 5.87486 0.757933 6.0345C0.706043 6.19417 0.749319 6.36942 0.869534 6.48658L4.24601 9.77798L3.44905 14.4255C3.42065 14.591 3.48868 14.7582 3.62448 14.8569C3.7013 14.9127 3.79229 14.9411 3.88372 14.9411C3.95393 14.9411 4.02437 14.9243 4.08887 14.8904L8.26264 12.6961L12.4362 14.8904C12.5848 14.9685 12.7649 14.9555 12.9007 14.8568C13.0365 14.7582 13.1045 14.5909 13.0761 14.4255L12.2789 9.77798L15.6558 6.48655C15.776 6.36942 15.8193 6.19417 15.7673 6.03453Z" fill="#D6D6D6" />
    </svg>
  )

  const showCard = () => {
    setCard(false)
    setShowFilter(false);
  }
  const showList = () => {
    setCard(true);
    setShowFilter(true);
  }

  const toggleFilter = () => {
    if (window.innerWidth <= 1024) {
      // للشاشات الصغيرة (التابلت)
      if (card) {
        setShowFilter(!showFilter);
      }
    } else {
      // للشاشات الكبيرة
      setShowFilter(!showFilter);
    }
  };


  const filterByRatingAndRecommended = () => {
    if (recommend != "all") {
      dispatch(getAllUniversities({ language, recommended: recommend, limt: "20", userId: user.id, rating: rating }));
    }
    if (rating) {
      dispatch(getAllUniversities({ language, recommended: recommend, limt: "20", userId: user.id, rating: rating }));
    }
  }

  const getNumberOfStars = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/university-reviews/ratings/summary`, {
        method: 'GET',
      });

      const result = await res.json();
      setNumberOfStars(result.count);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    filterByRatingAndRecommended();
  }, [rating, recommend]);

  useEffect(() => {
    getNumberOfStars();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between py-1 mt-8 w-full text-start max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-xl font-medium leading-6 text-primary">
          <span> {f("filterResults")} </span>
          (<span className="text-primary text-base">{universities?.universities?.total}</span>)
        </div>
        <div className="flex gap-2.5 max-md:flex-wrap">
          <div className="flex gap-0 justify-center p-1.5 text-sm font-medium bg-stone-50 rounded-[111px]">
            <button
              onClick={showList}
              className={`flex flex-1 gap-1.5 justify-center px-2 py-3 ${card
                ? "bg-amber-500 text-white "
                : "text-zinc-500 bg-transparent"
                } rounded-[111px]`}
            >
              <Image
                src="/icons/grid.svg"
                width={20}
                height={20}
                alt="grid"
              />
              <div> {f("cards")} </div>
            </button>
            <button
              onClick={showCard}
              className={`flex flex-1 gap-1.5 justify-center px-2 py-3 ${!card
                ? "bg-amber-500 text-white "
                : "text-zinc-500 bg-transparent"
                } rounded-[111px]`}
            >
              <Image
                src="/icons/ListBullets.svg"
                width={20}
                height={20}
                alt="list"
              />
              <div> {f("list")} </div>
            </button>
          </div>
          <button
            onClick={toggleFilter}
            className={`flex gap-1 justify-center px-2 py-3 my-auto text-sm leading-5 bg-white rounded-lg border border-solid border-zinc-100 text-zinc-500 focus:bg-amber-500 focus:text-white cursor-pointer ${showFilter ? "active" : ""
              }`}
          >
            <div>
              {showFilter ? `${f("hideFilter")}` : `${f("showFilter")}`}
            </div>
          </button>
        </div>
      </div>
      {/* <SearchNotFound head="Language Schools" /> */}
      <div
        className={`flex mt-8 ${showFilter ? "flex-row" : "flex-col"
          } max-md:flex-col max-md:max-w-full`}
      >
        {showFilter && (
          <div className="flex flex-col w-5/12 lg:w-3/12 max-md:w-full max-md:mb-5">
            <div className="flex flex-col justify-center px-5 pt-5 pb-9 mx-auto w-full bg-white rounded-xl border border-gray border-solid shadow-2xl">
              <div className="text-xl font-medium leading-6 text-start text-black">
                {s("head")}
              </div>
              <div className="shrink-0 mt-5 h-px bg-gray border border-gray border-solid" />
              <div className="space-y-4">
                <details
                  className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor my-5 px-4  py-2 text-gray-900">
                    <h2 className="font-medium"> {s("dropDown")} </h2>

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
                              id="option1"
                              value=""
                              onChange={(e) => {
                                setRecommended(e.target.value);
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-checked:border-0 peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">{s("all")}</strong>
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
                              id="option2"
                              value="true"
                              onChange={(e) => {
                                setRecommended(e.target.value);
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div>
                            <strong className="font-medium text-gray-900">{s("dropDown")}</strong>
                          </div>
                        </div>
                        <div>
                          {/* <span>100</span> */}
                        </div>
                      </label>

                    </div>
                  </fieldset>
                </details>
              </div>
              <div className="space-y-4 ">
                <details
                  className="border-dashed border-b-2 pb-6 border-[#D9D9D9] group [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-secondColor my-5 px-4  py-2 text-gray-900 ">
                    <h2 className="font-medium">
                      {s("dropDown1")}

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
                        htmlFor="option4"
                        className="flex cursor-pointer justify-between px-1"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option4"
                              value={5}
                              onChange={(e) => {
                                setRating(e.target.value);
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                          </div>
                        </div>
                        <div>
                            <span>{numberOfStars["5"]}</span>
                        </div>
                      </label>
                      <label
                        htmlFor="option5"
                        className="flex cursor-pointer justify-between px-1"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option5"
                              value={4}
                              onChange={(e) => {
                                setRating(e.target.value);
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                          </div>
                        </div>
                        <span>{numberOfStars["4"]}</span>
                      </label>
                      <label
                        htmlFor="option6"
                        className="flex cursor-pointer justify-between px-1"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option6"
                              value={3}
                              onChange={(e) => {
                                setRating(e.target.value);
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                          </div>
                        </div>
                        <span>{numberOfStars["3"]}</span>
                      </label>
                      <label
                        htmlFor="option7"
                        className="flex cursor-pointer justify-between px-1"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center">
                            &#8203;
                            <input
                              type="radio"
                              name="rating"
                              className="hidden peer"
                              id="option7"
                              value={2}
                              onChange={(e) => {
                                setRating(e.target.value);
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                          </div>
                        </div>
                        <span>{numberOfStars["2"]}</span>
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
                              value={1}
                              onChange={(e) => {
                                setRating(e.target.value);
                              }}
                            />
                            <span className="w-4 h-4 rounded border border-gray peer-checked:bg-primary peer-focus:outline-none"></span>
                          </div>
                          <div className='flex gap-1'>
                            <strong className="font-medium text-gray-900">
                              <FillStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                            <strong className="font-medium text-gray-900">
                              <SolidStar />
                            </strong>
                          </div>
                        </div>
                        <span>{numberOfStars["1"]}</span>
                      </label>
                    </div>
                  </fieldset>
                </details>
              </div>
            </div>
          </div>
        )}
        <div className={`flex flex-col transition-all duration-300 ${showFilter ? "w-7/12 lg:w-9/12" : "w-full"
          } max-md:w-full`} >
          <div className="transition-all duration-300 flex flex-col max-md:mt-10 ">
            <div className="">
              {card ? (
                <ProductUNI
                  props={20}
                  recommended=""
                />
              ) : (
                <ProductListUNI
                  props={20}
                  recommended="" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default FilterUNI