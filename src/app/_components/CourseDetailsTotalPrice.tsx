"use client"
import { useTranslations } from "next-intl";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLang from "../_hooks/useCurrentLang";
import { currencies } from "../_lib/currencies";
import { getTotalPriceINS } from "../reduxTool-kit/slices/calcTotalPriceINSSlice";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import { AppDispatch } from "../store";
import AvailableOfficesINS from "./AvailableOfficesINS";
import Poppup from "./Poppup";

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
type pro = {
   dataOfcourse: any,
}
interface PopPupData {
   title: string;
   prev: string;
   url: string;
   urlTwo: string;
   button: string;
}

export default function CourseDetailsTotalPrice({ dataOfcourse }: pro) {
   const { course } = dataOfcourse
   // console.log("drawerDeposit", drawerDeposit);
   // console.log("branch", branch);
   const t = useTranslations("PopupPayment");
   const tr = useTranslations("instDetails");
   const tu = useTranslations("UniversityDetails");
   const a = useTranslations("Poppup");

   const language = useCurrentLang();
   const { tokenMainSite } = parseCookies();
   const dispatch = useDispatch<AppDispatch>();

   // Selector
   const InfoForOrder = useSelector((state: any) => state.totalPriceINS);
   const totalPriceUNI = useSelector((state: any) => state.totalPriceUNI);
   const order = useSelector((state: any) => state.orderInsSlice)
   // console.log(InfoForOrder);
   // console.log(order);

   // State 
   // const [openDrawer, setOpenDrawer] = useState(false)
   const [startDate, setStartDate] = useState("")
   const [courseType, setCourseType] = useState("")
   const [airportReception, setAirportReception] = useState("")
   const [accommodation, setAccommodation] = useState<Accommodation>()
   const [numberOfWeeks, setNumberOfWeeks] = useState<number>(1);
   const [maxWeeks, setMaxWeeks] = useState(1);
   const [numberOfWeeksResidence, setNumberOfWeeksResidence] = useState<string>("");
   const [showApplyCupon, setShowApplyCupon] = useState<boolean>(true)
   const [coupons, setCoupons] = useState<string>("");
   const [healthInsurance, setHealthInsurance] = useState<boolean>(false);
   const [selected, setSelected] = useState<boolean>(false);
   const [checkedDeposit, setCheckedDeposit] = useState<boolean>(false)
   const [validCoupon, setValidCoupon] = useState<boolean>(false);
   const [offerValid, setOfferValid] = useState<boolean>(false);
   const [depositPayment, setDepositPayment] = useState(0);
   const [convertTotalPrice, setConvertTotalPrice] = useState<Record<string, any>>({});
   const [selectedCurrency, setSelectedCurrency] = useState<string>("");
   const [totalPrice, setTotalPrice] = useState(0);
   // const [checkChangeTotal, setCheckChangeTotal] = useState<number>()
   const user = useSelector((state: any) => state.displayUser);
   const userData = useSelector((state: any) => state.user);
   const [error, setError] = useState(false);
   const [agreed, setAgreed] = useState(false);
   const [showPopPup, setShowPopPup] = useState(false);
   const [openPopup, setOpenPopup] = useState(false);

   const [availableOffices, setAvailableOffices] = useState([]);
   const [objPopPup, setObjPopPup] = useState<PopPupData>({
      title: "",
      url: "",
      urlTwo: "",
      button: "",
      prev: "",
   });

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
         accommodationFees: 0
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
      },
      healthInsurance: 0
   });


   // functions
   const changeCurrency = async (value: string) => {
      setSelectedCurrency(value);
      if (!value) {
         return;
      }
      let checkChangeTotal;
      if (checkedDeposit) {
         checkChangeTotal = InfoForOrder.course.deposit + getAllPrice.instituteFees
         // console.log(checkChangeTotal);
      } else {
         checkChangeTotal = getAllPrice.totals.totalWithTransferFees
         // console.log(checkChangeTotal);
      }

      try {
         const response = await fetch(
            // `${process.env.NEXT_PUBLIC_SERVER_URL}/currency/convert?amount=${getAllPrice.totals.totalWithTransferFees}&fromCurrency=${getAllPrice.totals?.currency?.toLowerCase()}&toCurrency=${value.toLowerCase()}`,
            `${process.env.NEXT_PUBLIC_SERVER_URL}/currency/convert?amount=${checkChangeTotal}&fromCurrency=${getAllPrice.totals?.currency?.toLowerCase() || "usd"}&toCurrency=${value.toLowerCase()}`,
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
         // console.log(result);
         setConvertTotalPrice(result);
      } catch (error) {
         console.error(error);
      } finally {
      }
   };


   const displayTotalPriceINS = async () => {
      // console.log("startDate", startDate);
      // console.log(airportReception);

      try {
         if (airportReception) {
            var airportCost = JSON.parse(airportReception).cost;
         } else {
            airportCost = 0;
         }

         const raw = JSON.stringify({
            "courseId": course.id,
            "numberOfWeeks": parseInt(InfoForOrder?.course?.staticCostForCourse?.weeks ? InfoForOrder?.course?.staticCostForCourse?.weeks : numberOfWeeks),
            "airportReception": airportCost,
            "healthInsurance": healthInsurance ? InfoForOrder.branch?.healthInsurance : 0,
            "costDuration": accommodation?.costDuration || 0,
            "accommodationFees": accommodation?.accommodationFees || 0,
            "numberOfWeeks_for_residence": numberOfWeeksResidence ? +numberOfWeeksResidence : 1,
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
         // console.log("Data", result);

         setGetAllPrice(result);
         setValidCoupon(result.eduxaFees?.withCoupon !== result.eduxaFees?.original);
      } catch (error) {
         console.error(error);
      }
   }

   const handleAccommodation = (e: any) => {
      setAccommodation(JSON.parse(e));
   }

   const handleCouponApply = () => {
      if (coupons) {
         displayTotalPriceINS()
      }
   }

   const getAllOffices = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/offices`, {
            method: 'GET',
            headers: {
               "Accept-Language": language,
               Authorization: `Bearer ${tokenMainSite}`,
            },
         })
         const result = await res.json();
         setAvailableOffices(result);

      } catch (error) {
         console.error(error);
      }
   }


   const handelQouteInstitute = () => {

      setOpenPopup(true)
      const rowOrder = {
         userId: user.id,
         instituteBranchId: InfoForOrder?.branch?.id,
         courseId: course.id,
         coursePrice: getAllPrice.course?.finalPrice.toString(),
         booksFees: getAllPrice.books?.totalBooksFees.toString(),
         instituteFees: getAllPrice.instituteFees.toString(),
         residencePrice: getAllPrice.residence.totalPrice.toString(),
         totalPrice: getAllPrice.totals.totalWithTransferFees,
         transfer_fees: getAllPrice?.totals?.transferFees,
         eduxa_fees: getAllPrice.eduxaFees.withCoupon,
         convertedPrice: convertTotalPrice?.convertedAmount ? `${convertTotalPrice?.convertedAmount} ${selectedCurrency}` : "",
         startDate: startDate,
         typeOfCourse: InfoForOrder?.course?.typeOfCourse,
         numberOfWeeks: numberOfWeeks,
         numberOfWeeks_for_residence: numberOfWeeksResidence,
         airportReception: airportReception,
         residence: accommodation || null,
         healthInsurance,
         deposit: checkedDeposit,
         coupon: getAllPrice.eduxaFees?.couponPercentage !== 0 ? coupons : ""
      }

      localStorage.setItem("orderInstitute", JSON.stringify(rowOrder))
   }

   const createQoute = (e: any) => {
      e.preventDefault()
      if (agreed) {
         setError(false)
         if (user.id) {
             
            if (userData.phone_number) {
               handelQouteInstitute()
            } else {
               setShowPopPup(true)
               setObjPopPup({
                  title: a("massage2"),
                  prev: a("prev1"),
                  url: "profile",
                  urlTwo: "",
                  button: a("button2"),
               })
            }
         } else {
            setShowPopPup(true)
            setObjPopPup({
               title: a("massage"),
               prev: a("prev"),
               url: "login",
               urlTwo: "register",
               button: a("button"),
            })
         }
      } else {
         setError(true)
      }
   }

   const handleClose = () => {
      setOpenPopup(false);
   };

   useEffect(() => {
      getAllOffices();
   }, [])

   useEffect(() => {
      displayTotalPriceINS().then(() => changeCurrency(selectedCurrency));
   }, [numberOfWeeks, airportReception, numberOfWeeksResidence, accommodation, healthInsurance, checkedDeposit]);

   useEffect(() => {
      setGetAllPrice((prev) => ({ ...prev, totalPrice }));
   }, [totalPrice]);

   useEffect(() => {
      dispatch(getTotalPriceINS({ locale: language, courseId: course.id }))
   }, [dispatch, language, course.id])


   useEffect(() => {
      if (InfoForOrder?.course?.costPerWeekForCourse) {
         const maxWeekValue = Math.max(
            ...InfoForOrder?.course?.costPerWeekForCourse?.map((item: any) =>
               parseInt(item.maxWeeks)
            )
         );
         setMaxWeeks(maxWeekValue);
      }
   }, [InfoForOrder?.course?.costPerWeekForCourse]);


   useEffect(() => {
      if (tokenMainSite) {
         dispatch(getUser({ tokenMainSite, locale: language }));
      }
   }, [dispatch, language, tokenMainSite])

   return (
      <>
         {showPopPup && (
            <div className="bg-gray opacity-1">
               <Poppup
                  obj={objPopPup}
                  onClose={() => {
                     setShowPopPup(false);
                  }}
               />
            </div>
         )}
         <aside className="flex flex-col w-[40%] max-md:w-full bg-white rounded-3xl border border-solid border-zinc-100 p-6">
            <form onSubmit={(e) => createQoute(e)}>
               {/* Heading */}
               <div className="flex items-center justify-between py-1">
                  <span className="font-bold text-[clamp(0.75rem,1.56vw,3rem)]">{tr("totalReservation")}</span>
                  {/* <span className="font-bold text-[clamp(0.96rem,1.17vw,1.69rem)] text-[#F89A21]">{checkedDeposit ? getAllPrice.totals.totalWithTransferFees : Math.ceil(InfoForOrder?.course?.staticCostForInstitute + InfoForOrder?.course?.deposit)} {getAllPrice.totals.currency.toUpperCase()}</span> */}
               </div>

               <div className="border-y border-[#eee] pt-6 pb-4 flex flex-col gap-3">
                  {/* Course Name*/}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="course" className="">{(t("Course"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm text-nowrap overflow-hidden text-ellipsis ">
                        <div className="w-full bg-transparent  cursor-pointer">{InfoForOrder?.course?.name}</div>
                     </div>
                  </div>
                  {/* Course Duration */}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="courseType" className="">{(t("courseDuration"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select name="courseType" id="courseType" className="bg-transparent w-full focus:outline-none"
                           onChange={(e: any) => { setNumberOfWeeks(e.target.value) }}
                           required
                        >
                           <option value="" disabled selected>{t("courseDuration")}</option>
                           {InfoForOrder?.course?.costPerWeekForCourse.length > 0 && maxWeeks > 0 ? (
                              Array.from({ length: maxWeeks }, (_, i) => (
                                 <option key={i + 1} value={i + 1}>
                                    {i + 1} {" "}
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
                  {/* Start Date */}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="startDate" className="">{(t("startDate"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm" >
                        <select name="startDate" id="startDate" className="bg-transparent w-full focus:outline-none"
                           onChange={(e) => setStartDate(e.target.value)}
                           value={startDate}
                           required
                        >
                           <option value="" selected>{t("selectDate")}</option>
                           {InfoForOrder?.course
                              ?.startDates.map((date: string, index: number) => {
                                 const currentDay = new Date(date)
                                 const day = String(currentDay.getDate()).padStart(2, "0")
                                 const month = String(currentDay.getMonth() + 1).padStart(2, "0");
                                 const year = currentDay.getFullYear();
                                 return <option key={index} value={date}>{`${day}-${month}-${year}`}</option>
                              })}
                        </select>
                     </div>
                  </div>
                  {/* Available Accommodation Options */}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="courseType" className="">{(t("accommodation"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select onChange={(e: any) => {
                           handleAccommodation(e.target.value);
                        }}
                           // value={accommodation?.accommodationName || ""}
                           value={accommodation ? JSON.stringify(accommodation) : ""}
                           name="courseType" id="courseType" className="bg-transparent w-full focus:outline-none">
                           <option value="" >{t("accommodation")}</option>
                           {InfoForOrder?.branch?.residence?.map((acc: Accommodation, index: number) => {
                              return <option key={index} value={JSON.stringify(acc)}>
                                 {`${acc.accommodationName}-${acc.roomCategory}-${acc.accommodationFees} ${InfoForOrder.branch.currency}`}
                              </option>
                           })}
                        </select>
                     </div>
                  </div>
                  {/* Duration Of Stay */}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="courseType" className="">{(t("durationStay"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select name="courseType" id="courseType" className="bg-transparent w-full focus:outline-none"
                           onChange={(e) => { setNumberOfWeeksResidence(e.target.value); }}
                           required
                           value={numberOfWeeksResidence}>
                           <option value="" disabled selected>{t("durationStay")}</option>
                           {Array.from({ length: numberOfWeeks }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                 {i + 1} {t("weeks")}
                              </option>
                           ))}
                        </select>
                     </div>
                  </div>
                  {/* Currencies */}
                  {/* <div className="flex flex-col gap-2">
                     <label htmlFor="choose" className="">{(tu("choose"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select name="chooseCurrency" id="choose" className="bg-transparent w-full focus:outline-none"
                           value={
                              selectedCurrency || totalPriceUNI?.currency
                           }
                           onChange={(eve: any) =>
                              changeCurrency(eve.target.value)
                           }
                        >
                           <option disabled selected>
                              {tu("chooseBtn")}
                           </option>
                           {currencies?.map(
                              (currency: any, index: number) => (
                                 <option key={index} value={currency?.name}>
                                    {currency?.name} ({currency.symbol})
                                 </option>
                              )
                           )}
                        </select>
                     </div>
                  </div> */}
                  {/* courseType  */}
                  {/* <div className="flex flex-col gap-2">
                     <label htmlFor="courseType" className="">{(t("courseType"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select name="courseType" id="courseType" className="bg-transparent w-full focus:outline-none"
                           value={courseType}
                           onChange={(e) => {
                              setCourseType(e.target.value);
                           }}
                        >
                           <option value={InfoForOrder?.course?.typeOfCourse} selected disabled>{InfoForOrder?.course?.typeOfCourse}</option>
                        </select>
                     </div>
                  </div> */}
                  {/* Airport Pick-Up */}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="courseType" className="">{(t("selectAirport"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select name="courseType" id="courseType" className="bg-transparent w-full focus:outline-none"
                           value={airportReception}
                           onChange={(e) => {
                              const airport = e.target.value
                              setAirportReception(airport);
                           }}
                        >
                           <option value="" >
                              {tu("chooseBtn")}
                           </option>
                           {InfoForOrder.branch?.airportReception?.map((date: any, index: number) => {
                              return <option key={index} value={JSON.stringify(date)}>{date.airportName}-{date.serviceType}</option>
                           })}
                        </select>
                     </div>
                  </div>
                  {/* Available Accommodation Options */}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="courseType" className="">{(t("accommodation"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select onChange={(e: any) => {
                           setAccommodation(JSON.parse(e.target.value));
                        }}
                           value={accommodation ? JSON.stringify(accommodation) : ""}
                           name="courseType" id="courseType" className="bg-transparent w-full focus:outline-none">
                           <option value="" >{t("accommodation")}</option>
                           {InfoForOrder?.branch?.residence.map((acc: Accommodation, index: number) => {
                              return <option key={index} value={JSON.stringify(acc)}>
                                 {`${acc.accommodationName}-${acc.roomCategory}-${acc.accommodationFees} ${InfoForOrder.branch.currency}`}
                              </option>
                           })}
                        </select>
                     </div>
                  </div>
                  {/* Airport Pick-Up */}
                  <div className="flex flex-col gap-2">
                     <label htmlFor="courseType" className="">{(t("selectAirport"))}</label>
                     <div className="bg-[#fafafa] border border-[#eee] rounded-3xl py-3 px-4 shadow-sm">
                        <select name="courseType" id="courseType" className="bg-transparent w-full focus:outline-none"
                           value={airportReception}
                           onChange={(e) => {
                              const airport = e.target.value
                              setAirportReception(airport);
                           }}
                        >
                           <option value="" >
                              {tu("chooseBtn")}
                           </option>
                           {InfoForOrder.branch?.airportReception?.map((date: any, index: number) => {
                              return <option key={index} value={JSON.stringify(date)}>{date.airportName}-{date.serviceType}</option>
                           })}
                        </select>
                     </div>
                  </div>
                  {/* Health Insurance */}
                  <div className="flex  gap-10 justify-between items-start px-5 py-3 rounded-lg  bg-[#FAFAFA] shadow-sm cursor-pointer"
                     onClick={(e) => { setHealthInsurance(!healthInsurance) }}>
                     <div className="flex flex-col justify-center my-auto w-[203px]">
                        <div className="text-base font-semibold text-black cursor-pointer">
                           {t("healthInsurance")} |   <span className="font-bold">{getAllPrice.healthInsurance} {getAllPrice.totals.currency.toUpperCase()}</span>

                        </div>
                        <div className="mt-1 text-sm text-zinc-500 capitalize">
                           {/* {t("healthInsuranceComment")} */}
                        </div>
                     </div>

                     {healthInsurance ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#F89A21" xmlns="http://www.w3.org/2000/svg">
                           <path d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2Z" fill="#F89A21" />
                           <path fillRule="evenodd" clipRule="evenodd" d="M14.662 6.27936C15.1127 6.72997 15.1127 7.46056 14.662 7.91117L9.37358 13.1997C9.1572 13.4161 8.86371 13.5376 8.55769 13.5376C8.25167 13.5376 7.95819 13.4161 7.7418 13.1997L5.33795 10.7958C4.88735 10.3452 4.88735 9.61462 5.33795 9.16401C5.78856 8.7134 6.51913 8.7134 6.96974 9.16401L8.55769 10.752L13.0303 6.27936C13.4809 5.82875 14.2114 5.82875 14.662 6.27936Z" fill="white" />
                        </svg>
                     ) : (
                        <div
                           onClick={() => setSelected(!selected)}
                           className="cursor-pointer"
                        >
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="#DADCE0" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2Z" fill="#DADCE0" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M14.662 6.27936C15.1127 6.72997 15.1127 7.46056 14.662 7.91117L9.37358 13.1997C9.1572 13.4161 8.86371 13.5376 8.55769 13.5376C8.25167 13.5376 7.95819 13.4161 7.7418 13.1997L5.33795 10.7958C4.88735 10.3452 4.88735 9.61462 5.33795 9.16401C5.78856 8.7134 6.51913 8.7134 6.96974 9.16401L8.55769 10.752L13.0303 6.27936C13.4809 5.82875 14.2114 5.82875 14.662 6.27936Z" fill="white" />
                           </svg>
                        </div>
                     )}
                  </div>
                  {/* coupon */}
                  {/* <div className="bg-[#FAFAFA] rounded-xl p-4 ">
                     <div className="flex gap-1  items-center">
                        svg icon
                        <input onChange={(e: any) => { setCoupons(e.target.value), e.target.value == "" ? setShowApplyCupon(true) : setShowApplyCupon(false) }} id="cupon" type="text" placeholder="Enter Discount code" className="text-sm tracking-wide  placeholder:text-[#A5A5A5] border-b border-b-[#eee] bg-transparent w-full px-3 focus:outline-none" />
                        <label onClick={handleCouponApply} htmlFor="cupon" className={`${showApplyCupon ? "text-[#A5A5A5] opacity-50" : "text-[#1B1B1B] cursor-pointer  opacity-100"} `} >Apply</label>
                     </div>
                  </div>
                  {coupons ?
                     getAllPrice?.eduxaFees?.couponPercentage > 0 ? (
                        <>
                           <p className="text-[#07C37B] flex items-center gap-1">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <g clip-path="url(#clip0_5194_16860)">
                                    <path d="M8.04297 0C3.62497 0 0.0429688 3.582 0.0429688 8C0.0429688 12.418 3.62497 16 8.04297 16C12.461 16 16.043 12.418 16.043 8C16.043 3.582 12.461 0 8.04297 0ZM11.749 5.787L7.91697 11.644C7.91597 11.645 7.91397 11.646 7.91397 11.647C7.89397 11.677 7.88297 11.711 7.85797 11.739C7.82297 11.777 7.77797 11.797 7.73797 11.826C7.72797 11.833 7.71797 11.841 7.70697 11.848C7.64497 11.887 7.58097 11.913 7.51097 11.93C7.48797 11.936 7.46697 11.942 7.44297 11.946C7.38727 11.9537 7.33083 11.9543 7.27497 11.948C7.23551 11.9455 7.19635 11.9395 7.15797 11.93C7.11836 11.9181 7.07988 11.9027 7.04297 11.884C7.01097 11.869 6.97697 11.865 6.94697 11.846C6.92497 11.832 6.91297 11.81 6.89397 11.793C6.88597 11.786 6.87597 11.784 6.86797 11.777L4.63697 9.714C4.50473 9.58702 4.42758 9.41323 4.42211 9.22998C4.41663 9.04672 4.48327 8.86864 4.6077 8.73399C4.73213 8.59935 4.90441 8.51889 5.08753 8.50992C5.27064 8.50095 5.44997 8.56417 5.58697 8.686L7.20197 10.18L10.577 5.021C10.6785 4.86558 10.8377 4.75688 11.0194 4.71881C11.2011 4.68074 11.3906 4.71642 11.546 4.818C11.7014 4.91958 11.8101 5.07873 11.8482 5.26046C11.8862 5.44218 11.8505 5.63158 11.749 5.787Z" fill="#07C37B" />
                                 </g>
                                 <defs>
                                    <clipPath id="clip0_5194_16860">
                                       <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                 </defs>
                              </svg>
                              {t("validCoupon")}
                           </p>
                        </>) : (
                        <>
                           <p className="text-[#C30734] flex items-center gap-1">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M7.9987 1.33203C4.33203 1.33203 1.33203 4.33203 1.33203 7.9987C1.33203 11.6654 4.33203 14.6654 7.9987 14.6654C11.6654 14.6654 14.6654 11.6654 14.6654 7.9987C14.6654 4.33203 11.6654 1.33203 7.9987 1.33203ZM10.4654 9.53203C10.732 9.7987 10.732 10.1987 10.4654 10.4654C10.1987 10.732 9.7987 10.732 9.53203 10.4654L7.9987 8.93203L6.46536 10.4654C6.1987 10.732 5.7987 10.732 5.53203 10.4654C5.26536 10.1987 5.26536 9.7987 5.53203 9.53203L7.06536 7.9987L5.53203 6.46536C5.26536 6.1987 5.26536 5.7987 5.53203 5.53203C5.7987 5.26536 6.1987 5.26536 6.46536 5.53203L7.9987 7.06536L9.53203 5.53203C9.7987 5.26536 10.1987 5.26536 10.4654 5.53203C10.732 5.7987 10.732 6.1987 10.4654 6.46536L8.93203 7.9987L10.4654 9.53203Z" fill="#C30734" />
                              </svg>
                              {t("InValidCoupon")}
                           </p>
                        </>
                     ) : ""} */}
               </div >

               {/* Deposit Payment */}
               <div className="bg-[#FAFAFA] my-4 p-4 rounded-lg" >
                  <h2 className="flex items-center gap-1 mb-3 ">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 8.75H4C3.27082 8.74947 2.57165 8.45957 2.05604 7.94396C1.54043 7.42835 1.25053 6.72918 1.25 6C1.25316 5.27163 1.5439 4.57399 2.05895 4.05895C2.57399 3.5439 3.27163 3.25316 4 3.25H10C10.1989 3.25 10.3897 3.32902 10.5303 3.46967C10.671 3.61032 10.75 3.80109 10.75 4C10.75 4.19891 10.671 4.38968 10.5303 4.53033C10.3897 4.67098 10.1989 4.75 10 4.75H4C3.83755 4.74864 3.67649 4.78009 3.52648 4.84246C3.37647 4.90484 3.2406 4.99686 3.127 5.113C3.00722 5.2275 2.91201 5.36519 2.8472 5.51769C2.78238 5.67019 2.74931 5.8343 2.75 6C2.75053 6.33136 2.88239 6.64899 3.1167 6.8833C3.35101 7.11761 3.66864 7.24947 4 7.25H6C6.19891 7.25 6.38968 7.32902 6.53033 7.46967C6.67098 7.61032 6.75 7.80109 6.75 8C6.75 8.19891 6.67098 8.38968 6.53033 8.53033C6.38968 8.67098 6.19891 8.75 6 8.75ZM18 4.75H15.14C14.9411 4.75 14.7503 4.67098 14.6097 4.53033C14.469 4.38968 14.39 4.19891 14.39 4C14.39 3.80109 14.469 3.61032 14.6097 3.46967C14.7503 3.32902 14.9411 3.25 15.14 3.25H18C18.1989 3.25 18.3897 3.32902 18.5303 3.46967C18.671 3.61032 18.75 3.80109 18.75 4C18.75 4.19891 18.671 4.38968 18.5303 4.53033C18.3897 4.67098 18.1989 4.75 18 4.75Z" fill="#365D8D" />
                        <path d="M17.9993 8.74845H5.99934C5.8511 8.74832 5.70622 8.70426 5.58301 8.62184C5.45979 8.53942 5.36377 8.42234 5.30705 8.28537C5.25034 8.14841 5.23549 7.99771 5.26438 7.85231C5.29326 7.70691 5.36458 7.57334 5.46934 7.46845L10.7993 2.13745C11.0816 1.855 11.4221 1.63746 11.797 1.49999C12.172 1.36252 12.5723 1.30842 12.9703 1.34145C13.3683 1.37448 13.7543 1.49384 14.1014 1.69124C14.4485 1.88864 14.7485 2.15932 14.9803 2.48445L18.6093 7.56245C18.6894 7.67456 18.7371 7.80658 18.7471 7.944C18.7571 8.08143 18.7291 8.21895 18.666 8.34149C18.603 8.46402 18.5075 8.56682 18.3899 8.63861C18.2722 8.7104 18.1371 8.7484 17.9993 8.74845ZM7.81034 7.24845H16.5423L13.7613 3.35545C13.6558 3.20792 13.5194 3.08513 13.3616 2.99562C13.2038 2.9061 13.0285 2.85199 12.8477 2.83705C12.6669 2.82211 12.485 2.8467 12.3147 2.90911C12.1444 2.97152 11.9897 3.07025 11.8613 3.19845L7.81034 7.24845Z" fill="#F89A21" />
                        <path d="M21 17.75H16C15.8011 17.75 15.6103 17.671 15.4697 17.5303C15.329 17.3897 15.25 17.1989 15.25 17V13C15.25 12.8011 15.329 12.6103 15.4697 12.4697C15.6103 12.329 15.8011 12.25 16 12.25H21C21.464 12.2505 21.9088 12.4351 22.2369 12.7631C22.5649 13.0912 22.7495 13.536 22.75 14V16C22.7495 16.464 22.5649 16.9088 22.2369 17.2369C21.9088 17.5649 21.464 17.7495 21 17.75ZM16.75 16.25H21C21.0663 16.25 21.1299 16.2237 21.1768 16.1768C21.2237 16.1299 21.25 16.0663 21.25 16V14C21.25 13.9337 21.2237 13.8701 21.1768 13.8232C21.1299 13.7763 21.0663 13.75 21 13.75H16.75V16.25Z" fill="#365D8D" />
                        <path d="M18 22.75H4C3.27082 22.7495 2.57165 22.4596 2.05604 21.944C1.54043 21.4283 1.25053 20.7292 1.25 20V6C1.25 5.80109 1.32902 5.61032 1.46967 5.46967C1.61032 5.32902 1.80109 5.25 2 5.25C2.19891 5.25 2.38968 5.32902 2.53033 5.46967C2.67098 5.61032 2.75 5.80109 2.75 6V20C2.75053 20.3314 2.88239 20.649 3.1167 20.8833C3.35101 21.1176 3.66864 21.2495 4 21.25H18C18.3314 21.2495 18.649 21.1176 18.8833 20.8833C19.1176 20.649 19.2495 20.3314 19.25 20V19C19.25 18.8011 19.329 18.6103 19.4697 18.4697C19.6103 18.329 19.8011 18.25 20 18.25C20.1989 18.25 20.3897 18.329 20.5303 18.4697C20.671 18.6103 20.75 18.8011 20.75 19V20C20.7495 20.7292 20.4596 21.4283 19.944 21.944C19.4283 22.4596 18.7292 22.7495 18 22.75Z" fill="#365D8D" />
                        <path d="M20 13.75C19.8011 13.75 19.6103 13.671 19.4697 13.5303C19.329 13.3897 19.25 13.1989 19.25 13V9C19.25 8.9337 19.2237 8.87011 19.1768 8.82322C19.1299 8.77634 19.0663 8.75 19 8.75H4C3.80109 8.75 3.61032 8.67098 3.46967 8.53033C3.32902 8.38968 3.25 8.19891 3.25 8C3.25 7.80109 3.32902 7.61032 3.46967 7.46967C3.61032 7.32902 3.80109 7.25 4 7.25H19C19.464 7.25053 19.9088 7.43507 20.2369 7.76315C20.5649 8.09122 20.7495 8.53603 20.75 9V13C20.75 13.1989 20.671 13.3897 20.5303 13.5303C20.3897 13.671 20.1989 13.75 20 13.75Z" fill="#365D8D" />
                     </svg>
                     <span className="w-full">{t("DepositPayment")}</span>
                  </h2>
                  <div className="flex justify-between items-center gap-3">
                     <div onClick={() => setCheckedDeposit(false)} className="flex items-center gap-1 cursor-pointer">
                        {checkedDeposit ?
                           <>
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M16 4.5C22.3513 4.5 27.5 9.64873 27.5 16C27.5 22.3513 22.3513 27.5 16 27.5C9.64873 27.5 4.5 22.3513 4.5 16C4.5 9.64873 9.64873 4.5 16 4.5Z" stroke="#6C737F" />
                              </svg>
                           </> :
                           <>
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M16 4.5C22.3513 4.5 27.5 9.64873 27.5 16C27.5 22.3513 22.3513 27.5 16 27.5C9.64873 27.5 4.5 22.3513 4.5 16C4.5 9.64873 9.64873 4.5 16 4.5Z" stroke="#F89A21" />
                                 <circle cx="16" cy="16" r="7.5" fill="#F89A21" />
                              </svg>
                           </>}

                        <p className="text-[#1F2A37] tracking-wide line-clamp-1 ">{t("fullPrice")}</p>
                     </div>
                     <div onClick={() => { setCheckedDeposit(true), setDepositPayment(InfoForOrder.course.deposit + InfoForOrder.course.staticCostForInstitute) }} className="flex items-center gap-1 cursor-pointer">
                        {checkedDeposit ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M16 4.5C22.3513 4.5 27.5 9.64873 27.5 16C27.5 22.3513 22.3513 27.5 16 27.5C9.64873 27.5 4.5 22.3513 4.5 16C4.5 9.64873 9.64873 4.5 16 4.5Z" stroke="#F89A21" />
                           <circle cx="16" cy="16" r="7.5" fill="#F89A21" />
                        </svg> : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M16 4.5C22.3513 4.5 27.5 9.64873 27.5 16C27.5 22.3513 22.3513 27.5 16 27.5C9.64873 27.5 4.5 22.3513 4.5 16C4.5 9.64873 9.64873 4.5 16 4.5Z" stroke="#6C737F" />
                        </svg>}
                        <p className="text-[#1F2A37] tracking-wide line-clamp-1 ">{t("depositPayment")}</p>
                     </div>
                  </div>
               </div >


               {/* Price Details */}
               <h3 className="border-s-4 border-[#F89A21] text-[18px] px-2 my-4" > {tr("priceDetails")}</h3 >
               <div className="flex flex-col gap-1 border-t border-t-[#eee]">
                  {/* Institute Registration Fees */}
                  <div className="flex justify-between items-center py-2">
                     <span>{t("instituteFees")}</span>
                     <span className="font-bold">{Math.round(getAllPrice.instituteFees)} {getAllPrice.totals.currency?.toUpperCase()}</span>
                  </div>
                  {/* Eduxa Registration Fees */}
                  <div className=" py-2">
                     <div className="flex justify-between items-center py-2">
                        <span className="line-through ">{t("eduxaFees")}</span>
                        <span className="font-bold line-through">{`${Math.ceil(InfoForOrder?.course?.registerationFeesForEduxa)}`} USD</span>
                     </div>
                     <p className="text-[#CAA313] flex items-center gap-1 text-sm w-auto">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M6.00521 0.164062C2.79104 0.164062 0.171875 2.78323 0.171875 5.9974C0.171875 9.21156 2.79104 11.8307 6.00521 11.8307C9.21937 11.8307 11.8385 9.21156 11.8385 5.9974C11.8385 2.78323 9.21937 0.164062 6.00521 0.164062ZM5.56771 3.66406C5.56771 3.4249 5.76604 3.22656 6.00521 3.22656C6.24437 3.22656 6.44271 3.4249 6.44271 3.66406V6.58073C6.44271 6.8199 6.24437 7.01823 6.00521 7.01823C5.76604 7.01823 5.56771 6.8199 5.56771 6.58073V3.66406ZM6.54187 8.5524C6.51271 8.62823 6.47187 8.68656 6.41937 8.7449C6.36104 8.7974 6.29687 8.83823 6.22687 8.8674C6.15687 8.89656 6.08104 8.91406 6.00521 8.91406C5.92937 8.91406 5.85354 8.89656 5.78354 8.8674C5.71354 8.83823 5.64937 8.7974 5.59104 8.7449C5.53854 8.68656 5.49771 8.62823 5.46854 8.5524C5.43937 8.4824 5.42187 8.40656 5.42187 8.33073C5.42187 8.2549 5.43937 8.17906 5.46854 8.10906C5.49771 8.03906 5.53854 7.9749 5.59104 7.91656C5.64937 7.86406 5.71354 7.82323 5.78354 7.79406C5.92354 7.73573 6.08687 7.73573 6.22687 7.79406C6.29687 7.82323 6.36104 7.86406 6.41937 7.91656C6.47187 7.9749 6.51271 8.03906 6.54187 8.10906C6.57104 8.17906 6.58854 8.2549 6.58854 8.33073C6.58854 8.40656 6.57104 8.4824 6.54187 8.5524Z" fill="#CAA313" />
                        </svg>{tu("commentEduxa")}</p>
                  </div>
                  {/* Course Cost */}
                  <div>
                     <div className="flex justify-between items-center py-2">
                        <span className={`${getAllPrice.course.isOfferValid ? "line-through " : ""}`}>{t("courseCost")}</span>
                        <span className={`${getAllPrice.course.isOfferValid ? "line-through font-medium" : "font-bold"}`}>{getAllPrice.course.originalPrice} {getAllPrice.totals.currency.toUpperCase()}</span>
                     </div>
                     {getAllPrice?.course?.isOfferValid ?
                        <>
                           <div className="flex flex-wrap gap-10 justify-between items-center mt-1 w-full text-start max-md:max-w-full">
                              <div className="self-stretch my-auto text-sm font-medium text-zinc-500">
                                 {t("discount")}
                              </div>
                              <div className="self-stretch my-auto text-base text-black">
                                 {getAllPrice.course?.offer} %
                              </div>
                           </div>
                           <div className="flex flex-wrap gap-10 justify-between items-start mt-4 w-full text-base text-start text-black max-md:max-w-full">
                              <div className="font-medium">
                                 {t("courseCostDiscount")}
                              </div>
                              <div className="font-bold">
                                 {getAllPrice.course?.finalPrice}{" "}
                                 {getAllPrice.totals.currency?.toUpperCase()}</div>
                           </div>
                        </> : ""
                     }
                  </div>
                  {/* Airport Cost */}
                  <div className="flex justify-between items-center py-2">
                     <span className="">{t("airportCost")}</span>
                     <span className="font-bold">{getAllPrice.airport?.reception}{" "}{getAllPrice.totals.currency?.toUpperCase()}</span>
                  </div>
                  {/* Accommodation Cost */}
                  <div className="flex justify-between items-center py-2">
                     <span className="">{t("residenceCost")}</span>
                     <span className="font-bold">{getAllPrice.residence.accommodationFees} {getAllPrice.totals.currency.toUpperCase()}</span>
                  </div>
                  {/* Health Insurance */}
                  <div className="flex justify-between items-center py-2">
                     <span className="">{t("healthInsurance")}</span>
                     <span className="font-bold">{getAllPrice.healthInsurance} {getAllPrice.totals.currency.toUpperCase()}</span>
                  </div>
                  {/* Book Fees */}
                  <div className="flex justify-between items-center py-2">
                     <span className="">{t("bookFees")}</span>
                     <span className="font-bold">{getAllPrice.books.booksFeeswihoutDiscount} {getAllPrice.totals.currency.toUpperCase()}</span>
                  </div>
                  {InfoForOrder?.course?.booksFeesComment !== "" ?
                     <p className="text-[#CAA313] flex items-center gap-1 text-sm w-auto">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M6.00521 0.164062C2.79104 0.164062 0.171875 2.78323 0.171875 5.9974C0.171875 9.21156 2.79104 11.8307 6.00521 11.8307C9.21937 11.8307 11.8385 9.21156 11.8385 5.9974C11.8385 2.78323 9.21937 0.164062 6.00521 0.164062ZM5.56771 3.66406C5.56771 3.4249 5.76604 3.22656 6.00521 3.22656C6.24437 3.22656 6.44271 3.4249 6.44271 3.66406V6.58073C6.44271 6.8199 6.24437 7.01823 6.00521 7.01823C5.76604 7.01823 5.56771 6.8199 5.56771 6.58073V3.66406ZM6.54187 8.5524C6.51271 8.62823 6.47187 8.68656 6.41937 8.7449C6.36104 8.7974 6.29687 8.83823 6.22687 8.8674C6.15687 8.89656 6.08104 8.91406 6.00521 8.91406C5.92937 8.91406 5.85354 8.89656 5.78354 8.8674C5.71354 8.83823 5.64937 8.7974 5.59104 8.7449C5.53854 8.68656 5.49771 8.62823 5.46854 8.5524C5.43937 8.4824 5.42187 8.40656 5.42187 8.33073C5.42187 8.2549 5.43937 8.17906 5.46854 8.10906C5.49771 8.03906 5.53854 7.9749 5.59104 7.91656C5.64937 7.86406 5.71354 7.82323 5.78354 7.79406C5.92354 7.73573 6.08687 7.73573 6.22687 7.79406C6.29687 7.82323 6.36104 7.86406 6.41937 7.91656C6.47187 7.9749 6.51271 8.03906 6.54187 8.10906C6.57104 8.17906 6.58854 8.2549 6.58854 8.33073C6.58854 8.40656 6.57104 8.4824 6.54187 8.5524Z" fill="#CAA313" />
                        </svg>
                        {InfoForOrder?.course?.booksFeesComment}
                     </p>
                     : ""}
                  {/* Discount */}
                  {getAllPrice.books.discount === 0 ? "" :
                     <div className="flex justify-between items-center py-2">
                        <span className="">{t("discount")}</span>
                        <span className="font-bold">
                           {`${getAllPrice.books.discount} %`}
                        </span>
                     </div>}
                  {/* Book Fees After Discount */}
                  {getAllPrice.books.discount === 0 ? "" :
                     <div className="flex justify-between items-center py-2">
                        <span className="">{t("bookFeesDiscount")}</span>
                        <span className="font-bold">{getAllPrice.books.totalBooksFees} {getAllPrice.totals.currency.toUpperCase()}</span>
                     </div>
                  }
                  {/* Bank Transfer Fees */}
                  {/* <div className="flex justify-between items-center py-2">
                     <span className="">{t("bankFees")}</span>
                     <span className="font-bold">{getAllPrice.totals.transferFees} {getAllPrice.totals.currency.toUpperCase()}</span>
                  </div> */}
                  {/* Total Price */}
                  <div className="flex flex-col gap-1  bg-[#FAFAFa] border border-[#eee] rounded-md px-2 py-4 my-6">
                     <div className="flex justify-between items-center">
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{t("totalPrice")}</span>
                        <span className="font-bold  text-nowrap"> {checkedDeposit ? Math.ceil(InfoForOrder.course.deposit + getAllPrice.instituteFees) : getAllPrice.totals.totalWithTransferFees} {getAllPrice.totals.currency.toUpperCase()} </span>
                     </div>

                     {selectedCurrency ? <div className="flex justify-between items-center">
                        <span className="text-nowrap overflow-hidden whitespace-nowrap">{tu("totalPriceTwo")}</span>
                        <span className="text-nowrap overflow-hidden whitespace-nowrap">{Math.ceil(convertTotalPrice.convertedAmount)} {selectedCurrency}</span>
                     </div> : null}
                  </div>
                  {/* Checkbox Agreed  */}
                  <div className="flex gap-1 items-center">
                     <input className=" w-4 h-4 border border-zinc-300 rounded accent-amber-500 text-white" type="checkbox" name="agree" id="agree" checked={agreed} onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (e.target.checked) setError(false);
                     }} />
                     <label htmlFor="agree" >
                        {tu("agree")} <Link target="_blank" href={`/${language}/refund-policy`} className="text-[#2A73FF] underline">{tu("agree2")}</Link>
                     </label>
                  </div>
                  {error && <p className="mt-1 text-red-500 text-xs">
                     {tu("agree")} {tu("agree2")}
                  </p>}

               </div>

               <button
                  className="bg-[#365D8D] w-full py-4 rounded-full text-center text-white mt-3 md:mt-6"> {tu("createQuote")}
               </button>
               {/* </div> */}
            </form>

            {openPopup && <AvailableOfficesINS onClose={handleClose} />}
         </aside >
      </>


   )
}



