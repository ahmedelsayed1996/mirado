"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import Spinner from "./Spinner";
import { parseCookies } from "nookies";


interface SelectCurrencyProps {
  onClose: () => void; // الدالة لإغلاق المكون
  payInOffice: () => void;
  onOfficeSelect: (officeId: any) => void;
}

function PayCreditCards({ onClose, payInOffice, onOfficeSelect }: SelectCurrencyProps) {

  const [chooseOffice, setChooseOffice] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const language = useCurrentLang();
  const dispatch = useDispatch<AppDispatch>();
  const [availableOffices, setAvailableOffices] = useState<any[]>([]);
  const { tokenMainSite } = parseCookies();
  const t = useTranslations("Popup");

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

  const handleSubmit = async (eve: any) => {
    eve.preventDefault();
    setIsLoading(true);
    const selectedOffice = eve.target.office.value;
    const data: any = localStorage.getItem("orderUNI");
    const order = JSON.parse(data);
    const { convertedPrice, programId, totalPriceUNI, universityId, userId, transferFees, totalEduxaFee } = order;

    try {
      const data = JSON.stringify({
        "user_id": parseInt(userId),
        // "user_id": null,
        "university_id": parseInt(universityId),
        "program_id": parseInt(programId),
        "office_id": parseInt(selectedOffice),
        "total_price": totalPriceUNI,
        "eduxa_fees": totalEduxaFee,
        "transfer_fees": transferFees,
        "converted_price": convertedPrice ? convertedPrice : ""
      })
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/university-orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`,
        },
        body: data,
      })
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }
      const result = await res.json();
      console.log("result for oder id", result);
      onOfficeSelect(result.id);
      toast.success("The Request Has Been Successfully Registered.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllOffices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="flex justify-center items-center  bg-secondColor bg-opacity-80 px-1.5 md:px-5  ">
      <div className="flex lg:block lg:w-[80%] overflow-hidden gap-2.5 justify-center items-center bg-gray-50 bg-opacity-80 md:px-5 py-10 md:py-24 ">
        <div className="flex flex-col justify-center self-stretch px-12 py-6 md:py-12 my-auto bg-white rounded-2xl border border-gray border-solid md:shadow-2xl  max-md:px-5">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="flex gap-2 flex-row w-full text-xl font-medium leading-none text-start text-zinc-600 max-md:max-w-full items-center justify-between">
              <div className="text-lg md:text-2xl font-semibold text-gray-900">
                {t("availableMeans")}
              </div>
              <button
                className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
                onClick={onClose}
              >
                <p className="font-bold">{"X"}</p>
              </button>
            </div>
            <div className="flex flex-col mt-8 w-full max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                {/* ----------------sec1----------------------- */}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-start pb-4 w-full max-md:max-w-full">
                    <div className="flex gap-1.5 items-start">
                      <div className="flex relative gap-4 items-start w-[18px]">
                        <input
                          required
                          type="radio"
                          id="paymentOffice"
                          name="paymentMethod"
                          className="appearance-none h-[18px] w-[18px] border border-primary rounded-full checked:bg-primary checked:border-primary"
                        />
                        <div className="flex absolute top-2/4 left-2/4 z-0 shrink-0 w-2 h-2 bg-white rounded-full -translate-x-2/4 -translate-y-2/4 pointer-events-none"></div>
                      </div>
                      <label htmlFor="paymentOffice" className="text-base tracking-wide leading-none text-center text-neutral-500">
                        {t("availableMeans")}
                      </label >
                    </div>
                    <div className="mt-4 text-sm tracking-wide leading-none text-center text-zinc-600 text-opacity-80">
                      {t("payOffice")}
                    </div>
                    <div className="flex justify-between items-center px-5 py-3 mt-7 w-full text-start rounded-lg border border-dashed bg-zinc-50 border-zinc-100 min-h-[77px] max-md:max-w-full">
                      <div className="flex flex-1 shrink gap-10 justify-between items-start self-start text-start my-auto w-full basis-0 min-w-[240px] max-md:max-w-full cursor-pointer" onClick={() => {
                        // getAllOffices();
                        if (availableOffices.length > 0) {
                          setChooseOffice(!chooseOffice);
                        }
                      }} >
                        <div className="flex flex-col justify-start self-start text-start my-auto ">
                          <div className="text-base font-medium text-gray-900">
                            {t("officeOptions")}
                          </div>
                          <div className="mt-1 text-sm text-zinc-500 capitalize">
                            {t("whichOffice")}
                          </div>
                        </div>
                        {chooseOffice ? <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.8337 16.2487L23.8337 9.7487C23.8337 4.33203 21.667 2.16536 16.2503 2.16536L9.75033 2.16536C4.33366 2.16536 2.16699 4.33203 2.16699 9.7487L2.16699 16.2487C2.16699 21.6654 4.33366 23.832 9.75033 23.832L16.2503 23.832C21.667 23.832 23.8337 21.6654 23.8337 16.2487Z" stroke="#A7A7A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16.8241 11.6359L12.9999 15.4492L9.17578 11.6359" stroke="#A7A7A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> :
                          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.7497 2.66536L10.2497 2.66536C4.83301 2.66536 2.66634 4.83203 2.66634 10.2487L2.66634 16.7487C2.66634 22.1654 4.83301 24.332 10.2497 24.332L16.7497 24.332C22.1663 24.332 24.333 22.1654 24.333 16.7487L24.333 10.2487C24.333 4.83203 22.1663 2.66536 16.7497 2.66536Z" stroke="#A7A7A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.1349 9.67588L15.9482 13.5001L12.1349 17.3242" stroke="#A7A7A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>}
                      </div>
                    </div>
                    {chooseOffice && <>
                      <div className="flex flex-col pt-12">
                        <div className="flex flex-wrap gap-5 items-start w-full text-start text-gray-900 ">
                          {availableOffices && availableOffices.map((office, index) => {
                            return (
                              <div key={index} className="flex flex-col flex-1 shrink justify-center px-5 py-4 rounded-lg  hover:bg-[#bad0eb]  border-dashed border  border-gray basis-0 bg-zinc-50 min-w-[100%]  cursor-pointer">
                                <label htmlFor={office.id} className="flex flex-wrap gap-5 items-center w-full  cursor-pointer">
                                  <input
                                    required
                                    id={office.id}
                                    value={office.id}
                                    type="radio"
                                    name="office"
                                    className="shrink-0 self-stretch my-auto w-6 h-6 border-gray-300 rounded-full cursor-pointer"
                                  />
                                  <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[100%]  cursor-pointer">
                                    <div className="self-start text-lg leading-none">
                                      {office.name}
                                    </div>
                                    <div className="flex flex-wrap gap-1 items-center mt-2.5 w-full text-base tracking-wide leading-none max-md:max-w-full">
                                      <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.75 9.14329C0.75 4.24427 4.65501 0.25 9.5 0.25C14.345 0.25 18.25 4.24427 18.25 9.14329C18.25 11.5084 17.576 14.0479 16.3844 16.2419C15.1944 18.4331 13.4556 20.3372 11.2805 21.3539C10.1506 21.882 8.84943 21.882 7.71949 21.3539C5.54437 20.3372 3.80562 18.4331 2.61556 16.2419C1.42403 14.0479 0.75 11.5084 0.75 9.14329ZM9.5 1.75C5.50843 1.75 2.25 5.04748 2.25 9.14329C2.25 11.2404 2.85263 13.5354 3.9337 15.526C5.01624 17.5192 6.54602 19.1496 8.35465 19.995C9.08205 20.335 9.91795 20.335 10.6454 19.995C12.454 19.1496 13.9838 17.5192 15.0663 15.526C16.1474 13.5354 16.75 11.2404 16.75 9.14329C16.75 5.04748 13.4916 1.75 9.5 1.75ZM9.5 6.75C8.25736 6.75 7.25 7.75736 7.25 9C7.25 10.2426 8.25736 11.25 9.5 11.25C10.7426 11.25 11.75 10.2426 11.75 9C11.75 7.75736 10.7426 6.75 9.5 6.75ZM5.75 9C5.75 6.92893 7.42893 5.25 9.5 5.25C11.5711 5.25 13.25 6.92893 13.25 9C13.25 11.0711 11.5711 12.75 9.5 12.75C7.42893 12.75 5.75 11.0711 5.75 9Z" fill="#141522" />
                                      </svg>
                                      <div className=" self-start shrink my-auto  ">
                                        {office.address}
                                      </div>

                                    </div>
                                  </div>

                                </label>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="flex  gap-6 items-center mt-6  text-base text-start md:w-[226px] text-white ">
                        <div className="flex  gap-2.5 items-center self-stretch my-auto w-[90px] md:w-[226px] basis-0  ">
                          <button
                            onClick={onClose}
                            className="flex-1 justify-center text-center p-4 whitespace-nowrap  border border-gray border-solid  text-primary bg-white rounded-xl max-md:px-5  hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-52 mx-auto"
                          >
                            {t("cancel")}
                          </button>
                        </div>
                        <div className="flex  gap-2.5 items-center self-stretch my-auto w-[90px] md:w-[226px] basis-0  ">
                          {isLoading ? <Spinner /> : <button
                            className="flex-1 justify-center text-center p-4   whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
                          >
                            {t("submit")}
                          </button>}

                        </div>
                      </div>
                    </>
                    }
                  </div>
                </form>
                {/* <hr className=" border-gray w-full " />
                  <div className="flex flex-wrap gap-10 justify-between items-start mt-7 w-full max-md:max-w-full">
                    <div className="flex flex-col items-start w-[204px]">
                      <div className="flex flex-col items-start w-full max-md:max-w-full">
                        <div className="flex gap-1.5 items-start">

                          <div className="flex relative gap-4 items-start w-[18px]">
                            <input
                              disabled
                              type="radio"
                              id="paymentOffice"
                              name="paymentMethod"
                              className="appearance-none h-[18px] w-[18px] border border-primary rounded-full checked:bg-primary checked:border-primary"
                            />
                            <div className="flex absolute top-2/4 left-2/4 z-0 shrink-0 w-2 h-2 bg-white rounded-full -translate-x-2/4 -translate-y-2/4 pointer-events-none"></div>
                          </div>
                          <div className="text-base tracking-wide leading-none text-center text-neutral-500">
                            Payment Credit Cards
                          </div>
                        </div>

                        <div className="mt-4 text-sm tracking-wide leading-none text-start text-red-600 text-opacity-80">
                          Under Construction
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5 items-start">
                      <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eea532ac1075799cb76a580a7be818805c9631fc58da2cd2136868101b8b0f7c?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                      className="object-contain shrink-0 aspect-square w-[26px]"
                    />
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/31ec17ba449298b1bafd264c343e8c098085dcf50b6c7b2e51c8c92dfc9c43f1?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                      className="object-contain shrink-0 aspect-square w-[26px]"
                    />
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9192f00b589a017a72e32e8102679b097f342c4f793bda9fa6708c0a86a7c04?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                      className="object-contain shrink-0 aspect-square w-[26px]"
                    /> 
                      <Image
                        width={25}
                        height={25}
                        alt="mastercard"
                        src="/images/mastercard.png"
                      />
                      <Image
                        width={25}
                        height={25}
                        alt="visa"
                        src="/images/visa.png"
                      />
                      <Image
                        width={25}
                        height={25}
                        alt="amercan"
                        src="/images/amercan.png"
                      />
                    </div>

                  </div> */}
                {/* الجزء الخاص بالكريدتت
                  <div className="flex flex-col max-w-[721px] pt-6 text-zinc-600">
                    <div className="flex flex-wrap gap-2 items-center px-4 py-3 w-full text-base leading-none text-right bg-white rounded border border-gray-200 border-solid min-h-[46px] max-md:max-w-full">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f30a3be235b7a720e115f61615669b4c34475a20039e5ee27abe46250a25ab19?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                        alt="Card Icon"
                      />
                      <input
                        type="number"
                        placeholder="رقم البطاقة"
                        className="flex-1 shrink self-stretch my-auto min-w-[240px] max-md:max-w-full px-2 py-1 text-right border-none outline-none"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4 items-start mt-3 w-full max-md:max-w-full">
                      <div className="flex flex-wrap flex-1 shrink gap-10 justify-between items-center px-4 py-3 text-base leading-none text-right bg-white rounded-lg border border-gray-200 border-solid basis-0 min-h-[46px] min-w-[240px] max-md:max-w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8ee7760386e6bbd6b8e31b7d37d53e22061254fe409fd113561059bf204c0a5?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                          alt="Expiry Icon"
                        />
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="self-stretch my-auto w-[196px] px-2 py-1 text-right border-none outline-none"
                        />
                      </div>

                      <div className="relative overflow-hidden flex items-center px-4 py-3 text-base leading-none whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid min-h-[46px] w-[184px]">
                        <input
                          type="text"
                          placeholder="CVV"
                          className="flex-1 shrink self-stretch my-auto px-2 py-1 text-start border-none outline-none pr-10"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/665633c1c2d753cc813badbde9acd72225fd699e96ba1f66d259b734cf6d4804?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                          className="absolute right-4 w-6 h-6"
                          alt="CVV Icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-4 justify-between items-center max-w-[721px]">
                    <div className=" shrink gap-2.5 items-center justify-start self-stretch pt-6 my-auto basis-0 min-w-[240px] max-md:max-w-full">
                      <Link
                        href={`/${window.location.pathname.slice(1, 3)}/#`}
                        className="flex-1 justify-center text-center p-2 whitespace-nowrap  border border-primary border-solid  text-primary bg-white rounded-xl max-md:px-5  hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-[100px] mx-auto"
                      >
                        تفعيل
                      </Link>
                    </div>
                    <div className="flex flex-col items-end self-stretch my-auto text-base min-w-[240px] text-zinc-600 w-[270px]">
                      <div>بطاقة الهدايا / رمز الخصم</div>
                      <div className="flex mt-1 max-w-full bg-white rounded border border-gray-200 border-solid min-h-[36px] w-[270px]">
                        <input
                          type="text"
                          placeholder="أدخل الرمز هنا"
                          className="flex-1 px-2 py-1 text-right bg-white border-none outline-none rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col pt-6 max-w-[721px]">
                    <div className="flex flex-col w-full max-md:max-w-full">
                      <div className="flex flex-col w-full max-md:max-w-full">
                        <div className="flex flex-col w-full max-md:max-w-full">
                          <div className="flex flex-col justify-center w-full text-base leading-none max-md:max-w-full">
                            <div className="flex flex-wrap gap-10 justify-between items-start py-3 w-full max-md:max-w-full">
                              <div className="text-zinc-600">$160.00</div>
                              <div className="text-zinc-500">المبلغ الاجمالي</div>
                            </div>
                          </div>
                          <div className="flex flex-col w-full text-base leading-none max-md:max-w-full">
                            <div className="flex w-full bg-gray-700 bg-opacity-10 min-h-[1px] max-md:max-w-full" />
                            <div className="flex flex-wrap gap-10 justify-between items-center py-3 w-full max-md:max-w-full">
                              <div className="self-stretch my-auto text-zinc-600">
                                $4.23
                              </div>
                              <div className="self-stretch my-auto text-zinc-500">
                                الرسوم (6.5%)
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-full max-md:max-w-full">
                            <div className="flex w-full bg-gray-700 bg-opacity-10 min-h-[1px] max-md:max-w-full" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-10 justify-between items-center py-3 w-full max-md:max-w-full">
                          <div className="self-stretch my-auto text-lg font-semibold leading-none text-indigo-500">
                            $164.23
                          </div>
                          <div className="self-stretch my-auto text-base leading-none text-zinc-500">
                            المبلغ الكلي
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                {/* <hr className="my-2 border-gray w-full" />

                  <div className="flex flex-wrap gap-10 justify-between items-start mt-7 w-full max-md:max-w-full">
                    <div className="flex flex-col items-start w-[204px]">
                      <div className="flex flex-col items-start w-full max-md:max-w-full">
                        <div className="flex gap-1.5 items-start">
                          <div className="flex relative gap-4 items-start w-[18px]">
                            <input
                              disabled
                              type="radio"
                              id="paymentOffice"
                              name="paymentMethod"
                              className="appearance-none h-[18px] w-[18px] border border-primary rounded-full checked:bg-primary checked:border-primary"
                            />
                            <div className="flex absolute top-2/4 left-2/4 z-0 shrink-0 w-2 h-2 bg-white rounded-full -translate-x-2/4 -translate-y-2/4 pointer-events-none"></div>
                          </div>
                          <div className="text-base tracking-wide leading-none text-center text-neutral-500">
                            Payment by PayPal
                          </div>


                        </div>
                        <div className="mt-4 text-sm tracking-wide leading-none text-start text-red-600 text-opacity-80">
                          Under Construction
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5 items-start">
                      <Image
                        width={25}
                        height={25}
                        alt="visa"
                        src="/images/visa.png"
                      />
                    </div>

                  </div> */}
              </div>
            </div>
          </div>
          {/* ----------------sec5----------------------- */}
          {/* <div className="flex gap-6 items-center mt-6  text-base text-start w-[80px] md:w-[226px] text-white max-md:max-w-full">
              <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto md:w-[226px] basis-0 ">
                <button
                  className="flex-1 justify-center text-center py-2 md:p-4   whitespace-nowrap  text-white bg-primary rounded-xl  border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
                >
                  Next
                </button>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
}

export default PayCreditCards;
