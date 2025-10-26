"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLang from "../_hooks/useCurrentLang";
import { getTotalPriceINS } from "../reduxTool-kit/slices/calcTotalPriceINSSlice";
import { AppDispatch } from "../store";
import Loader from "./Loader";

interface SelectCurrencyProps {
  onClose: () => void; // الدالة لإغلاق المكون
  onPayment: () => void; // الدالة لإغلاق المكون
  // onCurrencySelect: (currency: string) => void; // الدالة للتعامل مع العملة المختارة
  // currencySelected: any;
}
interface Accommodation {
  costDuration: number;
  accommodationFees: number;
  accommodationName: string;
  bookingCycle: string;
  ageLimit?: number;
  distance?: string;
  minimumBooking?: string;
  roomCategory?: string;
  facilities?: string;
  foodValue?: string;
}

// function DepositPayment({ onClose, onCurrencySelect, currencySelected, onPayment }: SelectCurrencyProps) {
function DepositPayment({ onClose, onPayment }: SelectCurrencyProps) {
  const [CountryOfResidence, setCountryOfResidence] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const [coupons, setCoupons] = useState<string>("");
  const [CountryOfNationality, setCountryOfNationality] = useState<string>("");
  const [numberOfWeeksResidence, setNumberOfWeeksResidence] = useState<string>("");
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [validCoupon, setValidCoupon] = useState<boolean>(false);
  const [accommodation, setAccommodation] = useState<boolean>(false);
  const [healthInsurance, setHealthInsurance] = useState<boolean>(false);
  const [offerValid, setOfferValid] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<boolean>(false);
  const [airportReception, setAirportReception] = useState("");
  const t = useTranslations("PopupPayment");
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const language = useCurrentLang();
  const { tokenMainSite } = parseCookies();
  const { locale, schoolsId, branchsId, courses } = params;
  const [data, setData] = useState<object>({});
  const [totalPrice, setTotalPrice] = useState(0);
  // const [currentDay , setCurrentDay] =useState<>(new Date())
  const [getAllPrice, setGetAllPrice] = useState({
    totalPriceWithTransferFees: 0,
    instituteFees: 0,
    booksFees: 0,
    coursePrice: 0,
    eduxaFees: {
      couponPercentage: 0,
      original: "",
      withCoupon: "",
    },
    residencePrice: 0,
    transferFees: 0,
    course: {
      originalPrice: 0,
      offer: 0,
      finalPrice: 0,
      offer_end_date: "",
      isOfferValid: null
    },
    residence: {
      totalPrice: 0,
    },
    airport: {
      reception: 0
    },
    books: {
      booksFeeswihoutDiscount: 0,
      discount: 0,
      totalBooksFees: 0
    },
    totals: {
      transferFees: 0,
      totalWithTransferFees: 0,
      currency: "",
    }
  });

  const InfoForOrder = useSelector((state: any) => state.totalPriceINS);
  const user = useSelector((state: any) => state.displayUser);
  const [maxWeeks, setMaxWeeks] = useState(1);
  const [numberOfWeeks, setNumberOfWeeks] = useState<number>(1);
  // console.log("InfoForOrder", InfoForOrder?.course?.costPerWeekForCourse[0]?.maxWeeks);
  // console.log("InfoForOrder", InfoForOrder?.course?.staticCostForCourse[0]?.weeks);
  // console.log("InfoForOrder1", InfoForOrder?.course?.staticCostForCourse[0]?.weeks);
  // console.log("InfoForOrder2", InfoForOrder?.course?.costPerWeekForCourse[0]?.maxWeeks);
  // console.log("InfoForOrder3", numberOfWeeks);

  const isFutureDate = (dateString: string): boolean => {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    return inputDate >= today;
  };


  const handleCreateOrder = (eve: any) => {

    eve.preventDefault();
    // console.log("Add order data one", getAllPrice);
    // console.log("Add order data two", numberOfWeeks);

    const order = {
      "InfoForOrder": InfoForOrder,
      "userId": user.id,
      "totalPrice": getAllPrice,
      "startDate": startDate,
      "typeOfCourse": InfoForOrder.course?.typeOfCourse,
      "airportReception": airportReception,
      "numberOfWeeks": InfoForOrder?.course?.staticCostForCourse?.weeks ?
        InfoForOrder?.course?.staticCostForCourse?.weeks : numberOfWeeks,
      "residence": selectedAccommodation,
      "healthInsurance": healthInsurance,
      "deposit": deposit,
      "numberOfWeeksResidence": numberOfWeeksResidence || "",
      "coupon": getAllPrice.eduxaFees?.couponPercentage !== 0 ? coupons : ""
    }

    localStorage.setItem("orderINS", JSON.stringify(order));
    onPayment();

  }

  const setAccommodationValue = (acc: any) => {
    setSelectedAccommodation(acc);
    console.log("AccommodationValue", acc);
    setAccommodation(false);
    // displayTotalPriceINS(acc, airportReception || "");
  }

  const handleAccommodation = () => {
    setAccommodation(!accommodation);
  }

  const displayTotalPriceINS = async () => {
    console.log("startDate", startDate);

    try {
      if (airportReception) {
        var airportCost = JSON.parse(airportReception).cost;
      } else {
        airportCost = 0;
      }

      const raw = JSON.stringify({
        "courseId": +courses,
        // "numberOfWeeks": InfoForOrder?.course?.staticCostForCourse[0]?.weeks || InfoForOrder?.course?.costPerWeekForCourse[0]?.maxWeeks || null,
        "numberOfWeeks": parseInt(InfoForOrder?.course?.staticCostForCourse?.weeks ? InfoForOrder?.course?.staticCostForCourse?.weeks : numberOfWeeks),
        "airportReception": airportCost,
        "healthInsurance": healthInsurance ? InfoForOrder.branch?.healthInsurance : 0,
        "costDuration": selectedAccommodation?.costDuration || 0,
        "accommodationFees": selectedAccommodation?.accommodationFees || 0,
        // "numberOfWeeks_for_residence": InfoForOrder?.course?.costPerWeekForCourse[0].maxWeeks ? InfoForOrder?.course?.costPerWeekForCourse[0].maxWeeks : InfoForOrder?.course?.staticCostForCourse[0].maxWeeks
        "numberOfWeeks_for_residence": numberOfWeeksResidence ? numberOfWeeksResidence : 1,
        // "coupon": "MO1"
        "coupon": coupons
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institute-orders/total-price`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`,
        },
        body: raw
      })
      const result = await res.json();

      setGetAllPrice(result);
      setValidCoupon(getAllPrice.eduxaFees?.withCoupon !== getAllPrice.eduxaFees?.original);
      // CheckIsOfferValid();
      isFutureDate(result?.course?.offer_end_date)
      // console.log("Data", result);
      setOfferValid(isFutureDate(result?.course?.offer_end_date))
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    displayTotalPriceINS();
  }, [startDate, airportReception, numberOfWeeks, numberOfWeeksResidence, selectedAccommodation, healthInsurance]);

  useEffect(() => {
    setGetAllPrice((prev) => ({ ...prev, totalPrice }));
  }, [totalPrice]);

  useEffect(() => {

    dispatch(getTotalPriceINS({ locale, courseId: courses }));

    // displayTotalPriceINS();
  }, [dispatch, locale, courses]);


  useEffect(() => {
    // console.log("order", Object.entries(InfoForOrder).length !== 0);

    if (InfoForOrder?.course?.costPerWeekForCourse) {
      // if (Object.entries(InfoForOrder).length !== 0 ) {
      const maxWeekValue = Math.max(
        ...InfoForOrder?.course?.costPerWeekForCourse?.map((item: any) =>
          parseInt(item.maxWeeks)
        )
      );
      setMaxWeeks(maxWeekValue);
    }
  }, [InfoForOrder?.course?.costPerWeekForCourse]);

  return (
    <>
      {InfoForOrder.course?.id ? <div className="flex justify-center self-center items-center bg-opacity-80    max-md:px-5  ">
        <div className="flex flex-col justify-center self-stretch px-12 py-8 my-auto  rounded-2xl border border-gray border-solid  min-w-[240px] w-[1057px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col justify-center self-stretch px-12 py-12 my-auto bg-white rounded-2xl border border-gray border-solid shadow-2xl w-auto max-md:px-5">
            <div className="flex flex-col w-full max-md:max-w-full">
              <div className="flex flex-row w-full text-xl font-medium leading-none text-start text-zinc-600 max-md:max-w-full items-center justify-between">
                <div className="text-2xl font-semibold text-gray-900 capitalize">
                  {t("createQuote")}
                </div>  <button
                  onClick={onClose}
                  className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
                >
                  <p className="font-bold">{"X"}</p>
                </button>

              </div>
            </div>

            <form onSubmit={handleCreateOrder}>

              <div className="flex  flex-col">
                <div className="flex flex-col flex-1 gap-5 pt-6 shrink justify-center w-full text-start max-md:max-w-full">
                  <div className="flex flex-wrap gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">
                    {/* Start Date */}
                    <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                      <label className="block text-sm font-bold  text-gray-700">
                        {t("startDate")}
                      </label>
                      <div className=" relative mt-1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca424731f857c16511d3be958107ce238413bb7b60a4b3e84b4edeb0ae98f414?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="absolute start top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                          alt="calender"
                        />
                        <select
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value)
                            // displayTotalPriceINS(selectedAccommodation || "", airportReception || "");
                          }}
                          required
                          className="block w-full py-2 ps-7 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                        >
                          <option value="" selected >Choose</option>
                          {InfoForOrder && InfoForOrder.course?.startDates?.map((date: any, index: number) => {
                            return (
                              <option key={index} value={date}>{date.slice(0, 10)}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                    {/* courseType */}
                    <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                      <label className="block text-sm font-bold  text-gray-700">
                        {t("courseType")}
                      </label>
                      <div className="relative mt-1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0556204cef77f48b9f674513224cffe1f4128c6f18a38bc0368b239e22420c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="absolute start top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                          alt="Course Type"
                        />
                        <select
                          value={CountryOfResidence}
                          onChange={(e) => {
                            setCountryOfResidence(e.target.value);
                            // displayTotalPriceINS(selectedAccommodation || "", airportReception || "");
                          }}
                          className="block w-full py-2 ps-7 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                        >
                          <option value="" disabled>
                            {InfoForOrder.course?.typeOfCourse}
                          </option>

                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex  flex-col">
                <div className="flex flex-col flex-1 gap-5 pt-6 shrink justify-center w-full text-start max-md:max-w-full">
                  <div className="flex flex-wrap gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">
                    {/* select Airport */}
                    <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                      <label className="block text-sm font-bold text-gray-700">
                        {t("selectAirport")}
                      </label>

                      <div className="relative mt-1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5329e9b920f77c780c874c96ce061591b88935648515054ac85f60ce77042652?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="absolute start-3 top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                          alt="Airport"
                        />
                        <select
                          value={airportReception}
                          onChange={(e) => {
                            const selectedAirport = e.target.value;
                            setAirportReception(selectedAirport);
                            // displayTotalPriceINS(selectedAccommodation || "", selectedAirport);
                          }}
                          className="block w-full py-2 pl-10 pr-12  bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                        >
                          <option value="" disabled>
                            {t("selectAirport")}
                          </option>
                          {/* {InfoForOrder && InfoForOrder.branch?.airportReception?.map((date: any, index: number) => {
                            return (
                              <option key={index} value={JSON.stringify(date)}>{date.name} - {date.type} - {date.price} {InfoForOrder.branch?.currency}</option>
                            )
                          })} */}
                          {InfoForOrder && InfoForOrder.branch?.airportReception?.map((date: any, index: number) => {
                            return (
                              <option key={index} value={JSON.stringify(date)}>{date.airportName}-{date.serviceType}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                    {/* Course duration */}
                    <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                      <label className="block text-sm font-bold text-gray-700">
                        {t("courseDuration")}
                      </label>
                      <div className="relative mt-1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/648df21947b4e5d25819d77ab3769b9b57d555f6505192577a7344de4f92299e?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="absolute start top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                          alt="course"
                        />
                        {/* <select
                          value={numberOfWeeks}
                          onChange={(e) => setNumberOfWeeks(e.target.value)}
                          className="block w-full py-2 ps-7  bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                        >
                          <option value="" disabled>
                            Enter the course duration (in weeks)
                          </option>
                          {InfoForOrder?.course?.costPerWeekForCourse.length == 0 && maxWeeks > 0 ? <>

                            {[...Array(maxWeeks).keys()].map(week => (
                              <option key={week + 1} value={week + 1}>
                                {week + 1} weeks
                              </option>
                            ))}
                          </> :
                            <option value={InfoForOrder?.course?.staticCostForCourse?.weeks}>
                              {InfoForOrder?.course?.staticCostForCourse?.weeks}
                            </option>
                          }
                        </select> */}
                        <select

                          onChange={(e: any) => {
                            setNumberOfWeeks(e.target.value)
                            // displayTotalPriceINS(selectedAccommodation || "", airportReception || "");
                          }}
                          className="block w-full py-2 ps-7 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                          required
                        >
                          <option value="" >
                            {t("courseDuration2")}

                          </option>
                          {InfoForOrder?.course?.costPerWeekForCourse.length > 0 && maxWeeks > 0 ? (
                            Array.from({ length: maxWeeks }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                                {t("weeks")}
                              </option>
                            ))
                          ) : (
                            <>
                              {InfoForOrder?.course?.staticCostForCourse?.map((ele: any, index: number) => (
                                <option value={ele.weeks} key={index}>
                                  {ele.weeks}
                                  {t("weeks")}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration Of Stay */}
              <div className="flex  flex-col">
                <div className="flex flex-col flex-1 gap-5 pt-6 shrink justify-center w-full text-start max-md:max-w-full">
                  <div className="flex flex-wrap gap-10 items-center mt-7 w-full font-medium text-start max-md:max-w-full">
                    <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                      <label className="block text-sm font-bold text-gray-700">
                        {t("durationStay")}
                      </label>
                      <div className="relative mt-1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cedddaff5f436a6c84029c21d6d305e7bece6cfafe5f769f4755304d5f2fe796?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="absolute start top-1/2 transform -translate-y-1/2 w-6 aspect-square pointer-events-none"
                          alt="svg"
                        />
                        <select
                          value={numberOfWeeksResidence}
                          onChange={(e) => {
                            setNumberOfWeeksResidence(e.target.value);
                            // displayTotalPriceINS(selectedAccommodation || "", airportReception || "");
                          }}
                          className="block w-full py-2 ps-7   bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                        >
                          <option value="" disabled>
                            {t("enterDate")}
                          </option>
                          {Array.from({ length: numberOfWeeks }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} {t("weeks")}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* ----------------------------------------------------------------country of residence---------------------------------------- */}

                    <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                      <div className="flex-1 shrink gap-0.5 self-stretch w-full block text-sm font-bold text-gray-700 max-md:max-w-full">
                        <span> {t("discountCoupon")}</span>
                      </div>
                      <div className="flex gap-2.5 items-center px-5 bg-zinc-50 py-3.5 mt-2.5 w-full text-sm rounded-md border border-solid border-zinc-100 min-h-[50px] text-zinc-500 max-md:max-w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d646f18392e0d61f687b4c0c5bc847047be4bc619910347307d472a6076031a1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[22px]"
                          alt="User Icon"
                        />
                        <input
                          type="text"
                          className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full focus:outline-none"
                          // value={coupons}
                          onChange={(e) => setCoupons(e.target.value)}
                          placeholder={t("enterCoupon")}
                        />
                        <button
                          onClick={() => coupons && displayTotalPriceINS()}
                          type="button"
                          className=" font-bold text-center p-2 px-1  border border-primary border-solid  text-primary bg-white rounded-xl max-md:px-5  hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 "
                        >
                          {t("activation")}
                        </button>
                      </div>
                      {coupons ? (
                        getAllPrice.eduxaFees?.couponPercentage !== 0 ? (
                          <span className="flex items-center gap-1 ms-4 pt-1 text-green-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="12" fill="#2ED85B" />
                              <path d="M19.148 8.46054L10.148 17.4605C10.0958 17.5128 10.0338 17.5543 9.96547 17.5826C9.89719 17.6109 9.82399 17.6255 9.75007 17.6255C9.67615 17.6255 9.60295 17.6109 9.53466 17.5826C9.46638 17.5543 9.40434 17.5128 9.3521 17.4605L5.4146 13.523C5.30905 13.4175 5.24976 13.2743 5.24976 13.1251C5.24976 12.9758 5.30905 12.8326 5.4146 12.7271C5.52015 12.6216 5.6633 12.5623 5.81257 12.5623C5.96184 12.5623 6.10499 12.6216 6.21054 12.7271L9.75007 16.2673L18.3521 7.6646C18.4576 7.55905 18.6008 7.49976 18.7501 7.49976C18.8993 7.49976 19.0425 7.55905 19.148 7.6646C19.2536 7.77015 19.3129 7.9133 19.3129 8.06257C19.3129 8.21184 19.2536 8.35499 19.148 8.46054Z" fill="white" />
                            </svg>
                            Coupon Applied
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 ms-4 pt-1 text-red-500">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 0L22.3923 18H1.6077L12 0Z" fill="#DB1515" />
                              <path d="M12.25 7.77273L12.1648 14.0455H11.1761L11.0909 7.77273H12.25ZM11.6705 16.5682C11.4602 16.5682 11.2798 16.4929 11.1293 16.3423C10.9787 16.1918 10.9034 16.0114 10.9034 15.8011C10.9034 15.5909 10.9787 15.4105 11.1293 15.2599C11.2798 15.1094 11.4602 15.0341 11.6705 15.0341C11.8807 15.0341 12.0611 15.1094 12.2116 15.2599C12.3622 15.4105 12.4375 15.5909 12.4375 15.8011C12.4375 15.9403 12.402 16.0682 12.331 16.1847C12.2628 16.3011 12.1705 16.3949 12.054 16.4659C11.9403 16.5341 11.8125 16.5682 11.6705 16.5682Z" fill="white" />
                            </svg>
                            Incorrect Coupon
                          </span>
                        )
                      ) : null}



                    </div>
                  </div>
                </div>
              </div>

              {/* selectedAccommodation */}
              <div className="flex flex-wrap pt-6 gap-10 items-start text-start max-w-[957px]">
                <div className="flex flex-1 shrink justify-between items-center px-5 py-3 rounded-lg border border-dashed basis-0 bg-zinc-50 border-zinc-100 min-h-[77px] min-w-[240px] max-md:max-w-full">
                  {!selectedAccommodation &&
                    <div className="flex flex-1 shrink gap-10 justify-between items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                      <div onClick={handleAccommodation} className="flex flex-col justify-center self-stretch my-auto min-w-[240px] w-[264px]">
                        <div className="text-base font-semibold text-black cursor-pointer">
                          {t("accommodation")}
                        </div>
                        <div className="mt-1 text-sm text-zinc-500">
                          {t("accommodationOptions")}
                        </div>
                      </div>
                      <svg onClick={handleAccommodation} className="cursor-pointer" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.25033 23.3346H15.7503C21.167 23.3346 23.3337 21.168 23.3337 15.7513V9.2513C23.3337 3.83464 21.167 1.66797 15.7503 1.66797H9.25033C3.83366 1.66797 1.66699 3.83464 1.66699 9.2513V15.7513C1.66699 21.168 3.83366 23.3346 9.25033 23.3346Z" stroke="#A7A7A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.5 11L13.25 14.25L10 11" stroke="#A7A7A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {accommodation ? <div
                        className="absolute z-10 mt-40 w-auto rounded-md border-gray-100 bg-white shadow-lg"
                        role="menu"
                        x-show="isActive"
                      >
                        <div className="p-2 ">
                          {InfoForOrder?.branch?.residence && InfoForOrder.branch?.residence?.map((item: any, index: number) => {
                            return (
                              <div key={index} className="flex justify-start items-center">
                                <div
                                  onClick={() => {
                                    setAccommodationValue(item);
                                    setSelectedAccommodation(item);
                                  }}
                                  className=" rounded-lg px-1 pe-2 py-2 text-sm text-gray-500 hover:bg-gray hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.55556 18H18.4444C20.4081 18 22 16.4081 22 14.4444V12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12V13.2C18 13.6418 17.6418 14 17.2 14H6.8C6.35817 14 6 13.6418 6 13.2V12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12V14.4444C2 16.4081 3.59188 18 5.55556 18Z" stroke="#1C274C" strokeWidth="1.5" />
                                    <path d="M20 10C20 9.07069 20 8.60603 19.9231 8.21964C19.6075 6.63288 18.3671 5.39249 16.7804 5.07686C16.394 5 15.9293 5 15 5H9C8.07069 5 7.60603 5 7.21964 5.07686C5.63288 5.39249 4.39249 6.63288 4.07686 8.21964C4 8.60603 4 9.07069 4 10" stroke="#1C274C" strokeWidth="1.5" />
                                    <path d="M20 19V18M4 19V18" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>

                                  {item?.accommodationName} - {item.roomCategory} - {item?.accommodationFees}{InfoForOrder.branch?.currency}
                                </div>
                              </div>
                            )
                          })}

                        </div>
                      </div> : ""}
                    </div>}
                  {selectedAccommodation && <div className="flex flex-1 shrink gap-5 justify-between items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="flex flex-col justify-center self-stretch my-auto ">
                      <div className="text-base font-semibold text-primary cursor-pointer">
                        {selectedAccommodation.accommodationName} - {selectedAccommodation.roomCategory}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        <strong>{selectedAccommodation.bookingCycle}:</strong> {selectedAccommodation.costDuration}  -  <strong>{t("registrationFees")}:</strong> {selectedAccommodation.accommodationFees}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        <strong>{t("age")}:</strong> {selectedAccommodation.ageLimit} - <strong>{t("distance")}:</strong> {selectedAccommodation.distance}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        <strong>{t("specialDiet")}:</strong> {selectedAccommodation.foodValue} - <strong>{t("facilities")}:</strong> {selectedAccommodation.facilities}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        <strong>{t("roomCategory")}:</strong> {selectedAccommodation.roomCategory} - <strong>{t("minimumBooking")}:</strong> {selectedAccommodation.minimumBooking}
                      </div>
                    </div>
                    <svg onClick={() => setAccommodation(true)} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 2.40234H9C4 2.40234 2 4.40234 2 9.40234V15.4023C2 20.4023 4 22.4023 9 22.4023H15C20 22.4023 22 20.4023 22 15.4023V13.4023" stroke="#1E4C83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16.0409 3.42357L8.16086 11.3036C7.86086 11.6036 7.56086 12.1936 7.50086 12.6236L7.07086 15.6336C6.91086 16.7236 7.68086 17.4836 8.77086 17.3336L11.7809 16.9036C12.2009 16.8436 12.7909 16.5436 13.1009 16.2436L20.9809 8.36357C22.3409 7.00357 22.9809 5.42357 20.9809 3.42357C18.9809 1.42357 17.4009 2.06357 16.0409 3.42357Z" stroke="#1E4C83" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.9102 4.55469C15.5802 6.94469 17.4502 8.81469 19.8502 9.49469" stroke="#1E4C83" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {accommodation ? <div
                      className="absolute z-10 mt-40 w-auto rounded-md border-gray-100 bg-white shadow-lg"
                      role="menu"
                      x-show="isActive"
                    >
                      <div className="p-2 ">
                        {InfoForOrder && InfoForOrder.branch?.residence?.map((item: any, index: number) => {
                          return (
                            <div key={index} className="flex justify-start items-center">
                              <div
                                onClick={() => {
                                  setAccommodationValue(item);
                                  setSelectedAccommodation(item);
                                  // displayTotalPriceINS(selectedAccommodation || "", airportReception || "");
                                }}
                                className=" rounded-lg px-1 pe-2 py-2 text-sm text-gray-500 hover:bg-gray hover:text-gray-700 flex items-center gap-1"
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.55556 18H18.4444C20.4081 18 22 16.4081 22 14.4444V12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12V13.2C18 13.6418 17.6418 14 17.2 14H6.8C6.35817 14 6 13.6418 6 13.2V12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12V14.4444C2 16.4081 3.59188 18 5.55556 18Z" stroke="#1C274C" strokeWidth="1.5" />
                                  <path d="M20 10C20 9.07069 20 8.60603 19.9231 8.21964C19.6075 6.63288 18.3671 5.39249 16.7804 5.07686C16.394 5 15.9293 5 15 5H9C8.07069 5 7.60603 5 7.21964 5.07686C5.63288 5.39249 4.39249 6.63288 4.07686 8.21964C4 8.60603 4 9.07069 4 10" stroke="#1C274C" strokeWidth="1.5" />
                                  <path d="M20 19V18M4 19V18" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>

                                {item?.accommodationName} - {item?.costDuration} $
                              </div>
                            </div>
                          )
                        })}

                      </div>
                    </div> : ""}

                  </div>}



                </div>
                {/* healthInsurance */}
                <div className="flex flex-1 shrink gap-10 justify-between items-center px-5 py-3 rounded-lg border border-dashed basis-0 bg-zinc-50 border-zinc-100 min-h-[77px] min-w-[240px] max-md:max-w-full cursor-pointer" onClick={(e) => {
                  setHealthInsurance(!healthInsurance)
                  // displayTotalPriceINS(selectedAccommodation || "", airportReception || "");
                }}>
                  <div className="flex flex-col justify-center self-stretch my-auto w-[203px]">
                    <div className="text-base font-semibold text-black cursor-pointer">
                      {t("healthInsurance")}
                    </div>
                    <div className="mt-1 text-sm text-zinc-500 capitalize">
                      {t("healthInsuranceComment")}
                    </div>
                  </div>
                  {/*________________________________ الزرار بتاع علامة الصح _________________________________ */}

                  {healthInsurance ? (
                    <svg
                      onClick={() => setSelected(!selected)}
                      className="cursor-pointer"
                      width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_dd_1313_62508)">
                        <rect x="1.5" y="1.19922" width="24" height="24" rx="12" fill="#1E4C83" />
                        <path d="M7.125 12.8242L11.625 17.3242L19.875 9.07422" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <filter id="filter0_dd_1313_62508" x="0.5" y="0.199219" width="26" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1313_62508" />
                          <feOffset />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.352941 0 0 0 0 0.533333 0 0 0 0 0.74902 0 0 0 1 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1313_62508" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                          <feBlend mode="normal" in2="effect1_dropShadow_1313_62508" result="effect2_dropShadow_1313_62508" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1313_62508" result="shape" />
                        </filter>
                      </defs>
                    </svg>
                  ) : (
                    <div
                      onClick={() => setSelected(!selected)}
                      className="cursor-pointer"
                    >
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1.19922"
                          width="25"
                          height="25"
                          rx="12.5"
                          fill="#F6F6F6"
                          stroke="#DADCE0"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              {/* deposit */}
              <div className={`flex overflow-hidden flex-col justify-center self-stretch p-6 mt-6 text-base font-medium text-start text-gray-900 border-[#D9D9D9]
              
          ${!deposit ? " bg-zinc-50 border border-dashed" :
                  " bg-white border border-soild"}
                rounded-xl   max-w-[957px] max-md:px-5 cursor-pointer`}
                onClick={() => setDeposit(false)}>

                <div className="flex flex-wrap  gap-3.5 items-start w-full max-md:max-w-full ">
                  <div className="flex flex-wrap flex-1 shrink gap-2.5 items-center basis-0 min-w-[240px] max-md:max-w-full">
                    {!deposit ?
                      <svg width="24" height="25" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1313_62508)">
                          <rect x="1.5" y="1.19922" width="24" height="24" rx="12" fill="#1E4C83" />
                          <path d="M7.125 12.8242L11.625 17.3242L19.875 9.07422" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                          <filter id="filter0_dd_1313_62508" x="0.5" y="0.199219" width="26" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1313_62508" />
                            <feOffset />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.352941 0 0 0 0 0.533333 0 0 0 0 0.74902 0 0 0 1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1313_62508" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow_1313_62508" result="effect2_dropShadow_1313_62508" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1313_62508" result="shape" />
                          </filter>
                        </defs>
                      </svg>
                      : <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1313_62164)">
                          <rect x="1.5" y="1.90234" width="24" height="24" rx="12" fill="#EEEFF0" />
                        </g>
                        <defs>
                          <filter id="filter0_dd_1313_62164" x="0.5" y="0.902344" width="26" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1313_62164" />
                            <feOffset />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.27451 0 0 0 0 0.308497 0 0 0 0 0.376471 0 0 0 0.16 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1313_62164" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow_1313_62164" result="effect2_dropShadow_1313_62164" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1313_62164" result="shape" />
                          </filter>
                        </defs>
                      </svg>
                    }


                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.91634 2.03125H5.99967C3.24967 2.03125 2.33301 3.67208 2.33301 5.69792V6.61458V19.4479C2.33301 20.2088 3.19467 20.6396 3.79967 20.1812L5.36717 19.0079C5.73384 18.7329 6.24717 18.7696 6.57717 19.0996L8.09884 20.6304C8.45634 20.9879 9.04301 20.9879 9.40051 20.6304L10.9405 19.0904C11.2613 18.7696 11.7747 18.7329 12.1322 19.0079L13.6997 20.1812C14.3047 20.6304 15.1663 20.1996 15.1663 19.4479V3.86458C15.1663 2.85625 15.9913 2.03125 16.9997 2.03125H6.91634ZM10.8122 12.8021H6.68717C6.31134 12.8021 5.99967 12.4904 5.99967 12.1146C5.99967 11.7388 6.31134 11.4271 6.68717 11.4271H10.8122C11.188 11.4271 11.4997 11.7388 11.4997 12.1146C11.4997 12.4904 11.188 12.8021 10.8122 12.8021ZM11.4997 9.13542H5.99967C5.62384 9.13542 5.31217 8.82375 5.31217 8.44792C5.31217 8.07208 5.62384 7.76042 5.99967 7.76042H11.4997C11.8755 7.76042 12.1872 8.07208 12.1872 8.44792C12.1872 8.82375 11.8755 9.13542 11.4997 9.13542Z" fill="#1F4A80" />
                      <path d="M17.0095 2.03125V3.40625C17.6145 3.40625 18.192 3.65375 18.6137 4.06625C19.0537 4.51542 19.292 5.09292 19.292 5.69792V7.91625C19.292 8.59458 18.9895 8.90625 18.302 8.90625H16.542V3.87375C16.542 3.61708 16.7528 3.40625 17.0095 3.40625V2.03125ZM17.0095 2.03125C15.992 2.03125 15.167 2.85625 15.167 3.87375V10.2813H18.302C19.7503 10.2813 20.667 9.36458 20.667 7.91625V5.69792C20.667 4.68958 20.2545 3.77292 19.5945 3.10375C18.9253 2.44375 18.0178 2.04042 17.0095 2.03125C17.0095 2.03125 17.0187 2.03125 17.0095 2.03125Z" fill="#1F4A80" />
                    </svg>

                    <div className="self-stretch my-auto capitalize">
                      {t("fullPrice")}
                    </div>
                  </div>
                </div>

                {!deposit ? <>
                  <div className="mt-3.5 w-full min-h-0 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full" />
                  <div className="flex flex-col mt-3.5 w-full leading-tight max-md:max-w-full">

                    {/* Institute Registration Fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">{t("instituteFees")}  </div>
                      <div className="font-bold">
                        {/* {InfoForOrder?.course?.staticCostForInstitute ? "900" : "9600"} */}
                        {InfoForOrder?.course?.staticCostForInstitute ? InfoForOrder?.course?.staticCostForInstitute : getAllPrice.instituteFees}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>
                    {/* Eduxa Registration Fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("eduxaFees")}
                      </div>
                      <div className={`font-bold ${getAllPrice.eduxaFees?.withCoupon !== getAllPrice.eduxaFees?.original ? "line-through" : ""}`}>
                        {getAllPrice.eduxaFees?.original}
                        {" "}{InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>
                    {getAllPrice.eduxaFees?.withCoupon !== getAllPrice.eduxaFees?.original ?
                      <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                        <div className="font-medium">
                          {t("eduxaFeesAfterCoupon")}
                        </div>
                        <div className="font-bold">
                          {getAllPrice.eduxaFees?.withCoupon}
                          {" "}{InfoForOrder?.branch?.currency?.toUpperCase()}
                        </div>
                      </div> : ""
                    }


                    {/* Course fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("courseCost")}
                      </div>
                      {/* add check offer end date or no */}
                      <div className={`${!getAllPrice.course?.isOfferValid ? "font-bold" : "font-light line-through"}`}>
                        {getAllPrice.course?.originalPrice}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>
                    {!getAllPrice.course?.isOfferValid ? "" : <>
                      <div className="flex flex-wrap gap-10 justify-between items-center mt-1 w-full text-start max-md:max-w-full">
                        <div className="self-stretch my-auto text-sm font-medium text-zinc-500">
                          {t("discount")}
                        </div>
                        <div className="self-stretch my-auto text-base text-black">
                          {getAllPrice.course?.offer} %
                          {/* {InfoForOrder?.branch?.currency?.toUpperCase()} */}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                        <div className="font-medium">
                          {t("courseCostDiscount")}
                        </div>
                        <div className="font-bold">
                          {/* {InfoForOrder?.course?.registerationFeesForEduxa} */}
                          {getAllPrice.course?.finalPrice}{" "}
                          {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                      </div>
                    </>}

                    {/* Airport Cost */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium"> {t("airportCost")} </div>
                      <div className="font-bold">{getAllPrice.airport?.reception}{" "}{InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>

                    {/* Residence Cost */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">{t("residenceCost")}</div>
                      <div className="font-bold">
                        {getAllPrice.residence?.totalPrice}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>

                    {/* Health Insurance */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">{t("healthInsurance")}</div>
                      <div className="font-bold">
                        {healthInsurance && InfoForOrder?.branch?.healthInsurance || 0}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>

                    {/* Book Fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("bookFees")}
                        <br />
                        <span className="text-xs text-red-600 capitalize">{InfoForOrder?.course?.booksFeesComment}</span>
                      </div>
                      <div className="font-bold">
                        {getAllPrice.books?.booksFeeswihoutDiscount}{" "}{InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>
                    {getAllPrice.books?.discount === 0 ? "" : <>
                      <div className="flex flex-wrap gap-10 justify-between items-center mt-1 w-full text-start max-md:max-w-full">
                        <div className="self-stretch my-auto text-sm font-medium text-zinc-500">
                          {t("discount")}
                        </div>
                        <div className="self-stretch my-auto text-base text-black">
                          {getAllPrice.books?.discount} %
                          {/* {InfoForOrder?.branch?.currency?.toUpperCase()} */}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                        <div className="font-medium">
                          {t("bookFeesDiscount")}
                        </div>
                        <div className="font-bold">
                          {/* {InfoForOrder?.course?.registerationFeesForEduxa} */}
                          {getAllPrice.books?.totalBooksFees}{" "}
                          {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                      </div>
                    </>}

                    {/* Bank transfer fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("bankFees")}
                        <br />
                        <span className="text-xs text-red-600 capitalize">{t("bankFeesComment")}</span>
                      </div>
                      <div className="font-bold">
                        {Math.ceil(getAllPrice.totals?.transferFees)}{" "}{InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>

                    <div className="mt-4 w-full border border-dashed border-zinc-300  max-md:max-w-full" />
                    <div className="flex flex-col gap-4 justify-center p-5 mt-4 w-full text-base text-start text-black bg-white rounded-xl border border-zinc-300 border-solid max-md:max-w-full">
                      <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
                        <div className="font-medium capitalize">
                          {t("totalPrice")}
                        </div>
                        <div className="font-bold">
                          {Math.ceil(getAllPrice.totals?.totalWithTransferFees)}{" "}
                          {getAllPrice.totals?.currency?.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div></> : ""}

              </div>
              {/* ---------------------------------------------- */}

              <div className={`flex overflow-hidden flex-col self-stretch p-6 mt-6  rounded-xl  border-[#D9D9D9] ${deposit ? " bg-zinc-50 border border-dashed" :
                " bg-white border border-soild"}   max-w-[957px] max-md:px-5 cursor-pointer`}
                onClick={() => setDeposit(true)}>
                <div className="flex flex-wrap gap-3.5 items-start  w-full text-base font-medium text-start text-gray-900 max-md:max-w-full">
                  <div className="flex flex-wrap flex-1 shrink gap-2.5 items-center basis-0 min-w-[240px] max-md:max-w-full">
                    {deposit ?
                      <svg width="24" height="25" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1313_62508)">
                          <rect x="1.5" y="1.19922" width="24" height="24" rx="12" fill="#1E4C83" />
                          <path d="M7.125 12.8242L11.625 17.3242L19.875 9.07422" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                          <filter id="filter0_dd_1313_62508" x="0.5" y="0.199219" width="26" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1313_62508" />
                            <feOffset />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.352941 0 0 0 0 0.533333 0 0 0 0 0.74902 0 0 0 1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1313_62508" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow_1313_62508" result="effect2_dropShadow_1313_62508" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1313_62508" result="shape" />
                          </filter>
                        </defs>
                      </svg>
                      : <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1313_62164)">
                          <rect x="1.5" y="1.90234" width="24" height="24" rx="12" fill="#EEEFF0" />
                        </g>
                        <defs>
                          <filter id="filter0_dd_1313_62164" x="0.5" y="0.902344" width="26" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1313_62164" />
                            <feOffset />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.27451 0 0 0 0 0.308497 0 0 0 0 0.376471 0 0 0 0.16 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1313_62164" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow_1313_62164" result="effect2_dropShadow_1313_62164" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1313_62164" result="shape" />
                          </filter>
                        </defs>
                      </svg>
                    }
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.91634 2.03125H5.99967C3.24967 2.03125 2.33301 3.67208 2.33301 5.69792V6.61458V19.4479C2.33301 20.2088 3.19467 20.6396 3.79967 20.1812L5.36717 19.0079C5.73384 18.7329 6.24717 18.7696 6.57717 19.0996L8.09884 20.6304C8.45634 20.9879 9.04301 20.9879 9.40051 20.6304L10.9405 19.0904C11.2613 18.7696 11.7747 18.7329 12.1322 19.0079L13.6997 20.1812C14.3047 20.6304 15.1663 20.1996 15.1663 19.4479V3.86458C15.1663 2.85625 15.9913 2.03125 16.9997 2.03125H6.91634ZM10.8122 12.8021H6.68717C6.31134 12.8021 5.99967 12.4904 5.99967 12.1146C5.99967 11.7388 6.31134 11.4271 6.68717 11.4271H10.8122C11.188 11.4271 11.4997 11.7388 11.4997 12.1146C11.4997 12.4904 11.188 12.8021 10.8122 12.8021ZM11.4997 9.13542H5.99967C5.62384 9.13542 5.31217 8.82375 5.31217 8.44792C5.31217 8.07208 5.62384 7.76042 5.99967 7.76042H11.4997C11.8755 7.76042 12.1872 8.07208 12.1872 8.44792C12.1872 8.82375 11.8755 9.13542 11.4997 9.13542Z" fill="#1F4A80" />
                      <path d="M17.0095 2.03125V3.40625C17.6145 3.40625 18.192 3.65375 18.6137 4.06625C19.0537 4.51542 19.292 5.09292 19.292 5.69792V7.91625C19.292 8.59458 18.9895 8.90625 18.302 8.90625H16.542V3.87375C16.542 3.61708 16.7528 3.40625 17.0095 3.40625V2.03125ZM17.0095 2.03125C15.992 2.03125 15.167 2.85625 15.167 3.87375V10.2813H18.302C19.7503 10.2813 20.667 9.36458 20.667 7.91625V5.69792C20.667 4.68958 20.2545 3.77292 19.5945 3.10375C18.9253 2.44375 18.0178 2.04042 17.0095 2.03125C17.0095 2.03125 17.0187 2.03125 17.0095 2.03125Z" fill="#1F4A80" />
                    </svg>

                    <div className="self-stretch my-auto">
                      {t("depositPayment")}
                    </div>
                  </div>
                </div>
                {deposit ? <>
                  <div className="mt-3.5 w-full min-h-0 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full" />
                  <div className="flex flex-col mt-3.5 w-full leading-tight max-md:max-w-full">
                    {/* Institute Registration Fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">{t("instituteFees")} </div>
                      <div className="font-bold">
                        {/* {InfoForOrder?.course?.staticCostForInstitute ? "900" : "9600"} */}
                        {InfoForOrder?.course?.staticCostForInstitute ? InfoForOrder?.course?.staticCostForInstitute : getAllPrice.instituteFees}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>
                    {/* Eduxa Registration Fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("eduxaFees")}
                      </div>
                      <div className="font-bold">{InfoForOrder?.course?.registerationFeesForEduxa} {" "}{InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>
                    {/* Course fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("courseCost")}
                      </div>
                      <div className={`${getAllPrice.course?.offer === 0 ? "font-bold" : "font-light line-through"}`}>
                        {/* {InfoForOrder?.course?.registerationFeesForEduxa} */}
                        {getAllPrice.course?.originalPrice}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>
                    {getAllPrice.course?.offer === 0 ? "" : <>
                      <div className="flex flex-wrap gap-10 justify-between items-center mt-1 w-full text-start max-md:max-w-full">
                        <div className="self-stretch my-auto text-sm font-medium text-zinc-500">
                          {t("discount")}
                        </div>
                        <div className="self-stretch my-auto text-base text-black">
                          {getAllPrice.course?.offer} %
                          {/* {InfoForOrder?.branch?.currency?.toUpperCase()} */}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                        <div className="font-medium">
                          {t("courseCostDiscount")}
                        </div>
                        <div className="font-bold">
                          {/* {InfoForOrder?.course?.registerationFeesForEduxa} */}
                          {getAllPrice.course?.finalPrice}{" "}
                          {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                      </div>
                    </>}

                    {/* Airport Cost */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium"> {t("airportCost")}</div>
                      <div className="font-bold">{getAllPrice.airport?.reception}{" "} {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>

                    {/* Residence Cost */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">{t("residenceCost")} </div>
                      <div className="font-bold">
                        {getAllPrice.residence?.totalPrice}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>

                    {/* Health Insurance */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">{t("healthInsurance")} </div>
                      <div className="font-bold">
                        {healthInsurance && InfoForOrder?.branch?.healthInsurance || 0}{" "}
                        {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                    </div>

                    {/* Book Fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("bookFees")}
                        <br />
                        <span className="text-xs text-red-600 capitalize">{InfoForOrder?.course?.booksFeesComment}</span>
                      </div>
                      <div className="font-bold">
                        {getAllPrice.books?.booksFeeswihoutDiscount}{" "}{InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>
                    {getAllPrice.books?.discount === 0 ? "" : <>
                      <div className="flex flex-wrap gap-10 justify-between items-center mt-1 w-full text-start max-md:max-w-full">
                        <div className="self-stretch my-auto text-sm font-medium text-zinc-500">
                          {t("discount")}
                        </div>
                        <div className="self-stretch my-auto text-base text-black">
                          {getAllPrice.books?.discount} %
                          {/* {InfoForOrder?.branch?.currency?.toUpperCase()} */}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                        <div className="font-medium">
                          {t("bookFees")}
                        </div>
                        <div className="font-bold">
                          {/* {InfoForOrder?.course?.registerationFeesForEduxa} */}
                          {getAllPrice.books?.totalBooksFees}{" "}
                          {InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                      </div>
                    </>}

                    {/* Bank transfer fees */}
                    <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                      <div className="font-medium">
                        {t("bankFees")}
                        <br />
                        <span className="text-xs text-red-600 capitalize"> {t("bankFeesComment")} </span>
                      </div>
                      <div className="font-bold">
                        {Math.ceil(getAllPrice.totals?.transferFees)} {InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 justify-between items-center mt-4 w-full text-start max-md:max-w-full">
                      <div className=" w-full border border-dashed border-zinc-300  max-md:max-w-full" />
                      <div className="flex flex-wrap  justify-between items-start  w-full text-base text-start text-black max-md:max-w-full">
                        <div className="flex gap-1.5 items-center font-medium whitespace-nowrap min-w-[240px] w-[354px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d156466192ac8eb4d4b8047e8a33d6a7ff30638ab778102d86e4e9c9525af1c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                            alt="point"
                          />
                          <div className="font-bold self-stretch my-auto">
                            {t("deposit")}
                          </div>
                        </div>
                        <div className="font-bold">
                          {t("payDeposit")} ({InfoForOrder?.course?.deposit} {InfoForOrder?.branch?.currency?.toUpperCase()}) +  {t("registration")}  {InfoForOrder?.course?.registerationFeesForEduxa}{" "}{InfoForOrder?.branch?.currency?.toUpperCase()}
                        </div>
                      </div>
                      <div className="self-stretch my-auto text-sm font-medium text-zinc-500 capitalize">
                        {t("payDepositComment")}{" "}
                      </div>
                      {/* <div className="self-stretch my-auto text-base text-black">
                        {((+getAllPrice.totalPriceWithTransferFees) - (InfoForOrder?.course?.registerationFeesForEduxa + InfoForOrder?.course?.deposit))} {InfoForOrder?.branch?.currency?.toUpperCase()}
                      </div> */}
                    </div>
                    <div className="mt-4 w-full border border-dashed border-zinc-300  max-md:max-w-full" />
                    <div className="flex flex-col gap-4 justify-center p-5 mt-4 w-full text-base text-start text-black bg-white rounded-xl border border-zinc-300 border-solid max-md:max-w-full">
                      <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
                        <div className="font-medium">
                          {t("totalPrice")}
                        </div>
                        <div className="font-bold">{(InfoForOrder?.course?.registerationFeesForEduxa + InfoForOrder?.course?.deposit)}{" "}{InfoForOrder?.branch?.currency?.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                </> : ""}

              </div>

              <div className="flex gap-2.5 items-center self-start  mt-5 text-sm font-medium leading-tight text-primary">
                <div className="flex shrink-0 self-stretch my-auto">
                  <input
                    required
                    id="refund"
                    type="checkbox"
                    className="w-[22px] h-[22px] border border-gray-300 rounded-full bg-neutral-100 cursor-pointer"
                  />
                </div>
                <label className="self-stretch my-auto" htmlFor="refund">
                  <span className=" text-black ">{t("readAgree")} </span>{" "}
                  <Link href={`/${locale}/refund-policy`} className="underline text-primary">
                    {t("refundTerms")}
                  </Link>{" "}
                </label>
              </div>

              <div className="flex flex-1 shrink gap-2.5 mt-6 items-center justify-start self-end my-auto w-[226px] basis-0 min-w-[240px] max-md:max-w-full">
                <button
                  // onClick={getAllDataForCreateOrder}
                  className="   text-center p-4 justify-end  whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
                >
                  {t("create")}
                </button>
              </div>
            </form>
          </div >
        </div >
      </div > : <Loader />
      }
    </>

  );

}

export default DepositPayment;
