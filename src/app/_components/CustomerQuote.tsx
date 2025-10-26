import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useParams, useRouter } from 'next/navigation';
import CompleteYourData from "./CompleteYourData";
import { useTranslations } from "next-intl";
import { currencies } from "../_lib/currencies";
import Spinner from "./Spinner";

interface SelectCurrencyProps {
  onClose: () => void; // الدالة لإغلاق المكون
  onPayment: () => void; // الدالة لإغلاق المكون
  currencySelected: any
}


function CustomerQuote({ onClose, onPayment, currencySelected }: SelectCurrencyProps) {
  const [selectedOption, setSelectedOption] = useState<string>(currencySelected);
  const [convertTotalPrice, setConvertTotalPrice] = useState<Record<string, any>>({});
  const [currency, setCurrency] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();

  const { locale, universityId, programId } = params;
  const totalPriceUNI = useSelector((state: any) => state.totalPriceUNI);
  const user = useSelector((state: any) => state.user);
  // console.log("totalPriceUNI", totalPriceUNI);
  // console.log(currencySelected);
  const t = useTranslations("Popup");


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log("Currncy Selected", event.target.value);
  };
  const handleSubmit = (eve: any) => {
    eve.preventDefault();
    // console.log("totalPriceUNI", totalPriceUNI);
    // console.log("totalPriceUNI", Math.ceil(totalPriceUNI.totalEduxaFee).toString());

    const order = {
      "userId": user.id,
      "universityId": universityId,
      "programId": programId,
      "totalPriceUNI": totalPriceUNI.totalPriceWithTransferFees,
      "totalEduxaFee": Math.ceil(totalPriceUNI.totalEduxaFee).toString(),
      "transferFees": Math.ceil(totalPriceUNI.transferFees).toString(),
      "convertedPrice": convertTotalPrice?.convertedAmount ? `${convertTotalPrice?.convertedAmount} ${currencySelected}` : "",
    }
    localStorage.setItem("orderUNI", JSON.stringify(order));
    onPayment();
  }

  const convertToLocalCurrency = async () => {
    // /currency/convert?amount=500&fromCurrency=usd&toCurrency=egp
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/currency/convert?amount=${totalPriceUNI.totalPriceWithTransferFees}&fromCurrency=${totalPriceUNI?.currency?.toLowerCase()}&toCurrency=${selectedOption.toLowerCase()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      // console.log("Convert Price to local Currency" , selectedOption);

      setConvertTotalPrice(result);

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }
 
  useEffect(() => {
    if (currencySelected) {
      convertToLocalCurrency();
      // getCurrency();
    }
  }, [currencySelected, selectedOption])

  return (
    <>
      {/* <CompleteYourData /> */}
      <div className="flex justify-center self-center items-center   bg-secondColor bg-opacity-80 px-1.5 md:px-5  ">
        {totalPriceUNI.totalPriceWithTransferFees ? <div className="flex flex-col justify-center self-stretch px-2 md:px-12 py-8 my-36  bg-secondColor rounded-2xl border border-gray border-solid shadow-2xl w-[750px]  max-md:max-w-full">
          <div className="flex gap-10 justify-between items-center w-full h-[50px] max-md:max-w-full">
            <div className="self-stretch my-auto text-lg md:text-2xl font-semibold text-center text-gray-900">
              {t("createQuote")}
            </div>
            <button
              onClick={onClose}
              className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid hover:bg-primary hover:text-gray cursor-pointer"
            >
              <p className="font-bold">{"X"}</p>
            </button>

          </div>
          <form onSubmit={handleSubmit}>


            <div className="flex flex-col justify-center mt-6 w-full text-start max-md:max-w-full">
              <div className="flex overflow-hidden flex-col p-6 w-full rounded-xl border border-blue-900 border-dashed bg-blue-900 bg-opacity-0 max-md:px-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-3 w-full max-md:max-w-full justify-start">
                  <div className="flex gap-2.5 justify-center items-center h-full text-base pt-2 font-medium text-gray-900 ">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.91634 2.23438H5.99967C3.24967 2.23438 2.33301 3.87521 2.33301 5.90104V6.81771V19.651C2.33301 20.4119 3.19467 20.8427 3.79967 20.3844L5.36717 19.211C5.73384 18.936 6.24717 18.9727 6.57717 19.3027L8.09884 20.8335C8.45634 21.191 9.04301 21.191 9.40051 20.8335L10.9405 19.2935C11.2613 18.9727 11.7747 18.936 12.1322 19.211L13.6997 20.3844C14.3047 20.8335 15.1663 20.4027 15.1663 19.651V4.06771C15.1663 3.05937 15.9913 2.23438 16.9997 2.23438H6.91634ZM10.8122 13.0052H6.68717C6.31134 13.0052 5.99967 12.6935 5.99967 12.3177C5.99967 11.9419 6.31134 11.6302 6.68717 11.6302H10.8122C11.188 11.6302 11.4997 11.9419 11.4997 12.3177C11.4997 12.6935 11.188 13.0052 10.8122 13.0052ZM11.4997 9.33854H5.99967C5.62384 9.33854 5.31217 9.02688 5.31217 8.65104C5.31217 8.27521 5.62384 7.96354 5.99967 7.96354H11.4997C11.8755 7.96354 12.1872 8.27521 12.1872 8.65104C12.1872 9.02688 11.8755 9.33854 11.4997 9.33854Z" fill="#1F4A80" />
                      <path d="M17.0095 2.23438V3.60938C17.6145 3.60938 18.192 3.85687 18.6137 4.26937C19.0537 4.71854 19.292 5.29604 19.292 5.90104V8.11938C19.292 8.79771 18.9895 9.10938 18.302 9.10938H16.542V4.07688C16.542 3.82021 16.7528 3.60938 17.0095 3.60938V2.23438ZM17.0095 2.23438C15.992 2.23438 15.167 3.05938 15.167 4.07688V10.4844H18.302C19.7503 10.4844 20.667 9.56771 20.667 8.11938V5.90104C20.667 4.89271 20.2545 3.97604 19.5945 3.30688C18.9253 2.64688 18.0178 2.24354 17.0095 2.23438C17.0095 2.23438 17.0187 2.23438 17.0095 2.23438Z" fill="#1F4A80" />
                    </svg>

                    <div className="self-stretch my-auto"> {t("priceDetails")} </div>
                  </div>
                  {currencySelected && <div className="">
                    <select
                      id="options"
                      value={selectedOption}
                      onChange={handleSelectChange}
                      className="p-1 border rounded-md shadow-sm border-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={currencySelected}> {currencySelected.toUpperCase()} </option>
                      {/* {currency && Object.entries(currency).map(([key, value]) => (
                        <option key={key} value={key}> {value} ({key}) </option>
                      ))} */}
                      {currencies && currencies.map((currency: any, index: number) => (<option key={currency.name} value={currency.name}> {currency.name} </option>))}
                    </select>
                  </div>}


                </div>
                <div className="mt-3.5 w-full min-h-0 border border-solid bg-neutral-100 border-neutral-200 max-md:max-w-full" />
                <div className="flex flex-col mt-3.5 w-full text-base leading-tight text-black max-md:max-w-full">
                  <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
                    <div className="font-medium">
                      {t("eduxaFees")}
                    </div>
                    <div className="font-bold">{Math.round(totalPriceUNI.totalEduxaFee)} {totalPriceUNI.currency}</div>
                  </div>
                  <div className="flex md:gap-10 justify-between items-start mt-4 w-full max-md:max-w-full">
                    <div className="font-medium">{t("universityFees")} </div>
                    <div className="font-bold">{Math.round(totalPriceUNI.totalUniversityPrice)} {totalPriceUNI.currency}</div>
                  </div>
                  <div className="flex md:gap-5 justify-between mt-4 w-full max-md:max-w-full">
                    <div className="font-medium">{t("bankFees")} <br />
                      <span className="text-xs  text-red-600">{t("comment")}
                      </span>
                    </div>
                    <div className="font-bold text-nowrap">{Math.round(totalPriceUNI.transferFees)} {totalPriceUNI.currency}</div>
                  </div>
                  <div className="mt-3.5 w-full min-h-0 border border-solid bg-neutral-100 border-neutral-200 max-md:max-w-full" />
                  <div className="flex flex-col gap-4 justify-center p-5 mt-4 w-full bg-white rounded-xl border border-neutral-200  max-md:max-w-full">
                    <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
                      <div className="font-medium">
                        {t("totalPrice")}  <br />
                        <span className="text-xs  text-red-600 capitalize">{t("totalAmount")}
                        </span>
                      </div>
                      <div className="font-bold">{Math.round(totalPriceUNI.totalPriceWithTransferFees)} {totalPriceUNI.currency}</div>
                    </div>
                  </div>
                  {currencySelected && <div className="flex flex-col gap-4 justify-center p-5 mt-4 w-full bg-white rounded-xl border border-neutral-200  max-md:max-w-full">
                    <div className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
                      <div className="font-medium">
                        {t("totalPriceLocal")} <br />
                        <span className="text-xs  text-red-600 capitalize"> {t("totalAmount")}
                        </span>
                      </div>
                      {isLoading ? <div>
                        <Spinner />
                      </div> :
                        <div className="font-bold">{convertTotalPrice &&
                          Math.round(convertTotalPrice.convertedAmount)} {selectedOption.toUpperCase()}
                        </div>
                      }
                    </div>
                  </div>}

                </div>
              </div>
              <div className="flex gap-2.5 items-center self-start mt-5 text-sm font-medium leading-tight text-primary">
                <div className="flex shrink-0 self-stretch my-auto gap-2 items-center">
                  <input
                    id="termsAndCondition"
                    type="checkbox"
                    className="w-[22px] h-[22px] border border-gray-300 rounded-full bg-neutral-100 cursor-pointer"
                    required
                  />
                  <label htmlFor="termsAndCondition"><span className="text-gray-900">{t("mustRead")}</span>{" "}
                    <Link href={`/${locale}/refund-policy`} className="underline text-primary">
                      {t("refundTerms")}
                    </Link></label>
                </div>
                {/* <div className="self-stretch my-auto">
                <span className="text-gray-900">Must read and agree to</span>{" "}
                <a href="#" className="underline text-primary">
                  Refund Terms
                </a>{" "}
              </div> */}
              </div>
            </div>
            <div className="flex gap-6 items-center mt-6  text-base  w-[226px] text-white">
              <div className="flex flex-1 shrink gap-2.5 items-center self-stretch my-auto  basis-0">
                <button
                  className="flex-1 justify-center text-center p-4 whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
                >
                  {t("next")}
                </button>
              </div>
            </div>
          </form>
        </div> : <Loader />}
      </div>

    </>

  );
}

export default CustomerQuote;
