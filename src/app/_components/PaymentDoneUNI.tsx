import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { parseCookies } from "nookies";
import Spinner from "./Spinner";
import { useTranslations } from "next-intl";


interface SelectCurrencyProps {
  onClose: () => void; // الدالة لإغلاق المكون
  orderID: string; // الدالة لإغلاق المكون
}

function PaymentDoneUNI({ onClose, orderID }: SelectCurrencyProps) {
  const { tokenMainSite } = parseCookies();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Popup");
  
  const downloadInvoices = async (id: any) => {
    console.log("order ", id);
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bills/university/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenMainSite}`,
        }
      })
      const blob = await res.blob();
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);

    }
  }

  useEffect(() => { localStorage.removeItem("order") }, [])

  return (
    <div className="flex justify-center self-center items-center   bg-secondColor bg-opacity-80   ">
      <div className="flex overflow-hidden gap-2.5 justify-center self-center items-center md:px-10 lg:px-80 md:py-28 py-10 bg-gray-50 bg-opacity-80 max-md:px-2 ">
        <div className="flex relative flex-col justify-center self-center px-8 py-10  bg-white rounded-2xl border border-gray border-solid shadow-2xl md:min-h-[600px] min-w-[240px] w-[781px] max-md:px-5">

          <button
            onClick={onClose}
            className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
          >
            <p className="font-bold">{"X"}</p>
          </button>

          <div className="flex z-0 flex-col w-full max-md:max-w-full">
            <div className="flex flex-col justify-center px-5 w-full rounded-xl max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex gap-2.5 justify-center items-center self-center px-2.5 bg-slate-50	opacity-1.5  bg-gray-50 aspect-square md:min-h-[214px] rounded-[60px] md:w-[214px]">
                  {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4f1bfe91f892d115bf6a9832dff7ba3f2a517d988f0e2177bd736be28ca3729?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
                    className="object-contain self-stretch my-auto aspect-square w-[102px] "
                  /> */}
                  <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M85.5 43C85.5 66.4721 66.4721 85.5 43 85.5C19.5279 85.5 0.5 66.4721 0.5 43C0.5 19.5279 19.5279 0.5 43 0.5C66.4721 0.5 85.5 19.5279 85.5 43ZM60.1289 30.1211C61.3737 31.3659 61.3737 33.3841 60.1289 34.6289L38.8789 55.8789C37.6341 57.1237 35.6159 57.1237 34.3711 55.8789L25.8711 47.3789C24.6263 46.1341 24.6263 44.1159 25.8711 42.8711C27.1159 41.6263 29.1341 41.6263 30.3789 42.8711L36.625 49.1172L46.123 39.6191L55.6211 30.1211C56.8659 28.8763 58.8841 28.8763 60.1289 30.1211Z" fill="#28C76F" />
                  </svg>

                </div>
                <div className="text-2xl md:text-4xl font-medium text-center text-gray-900 max-md:max-w-full mt-3">
                  {t("paymentSuccessfully")}
                </div>
                <div className="mt-4 text-xs md:text-sm font-medium leading-loose text-center capitalize text-zinc-500 max-md:max-w-full">
                  {t("commentPaymentSuccessfully")}
                </div>
              </div>
            </div>
            {isLoading ? <Spinner /> : <button
              onClick={() => downloadInvoices(orderID)}
              className="flex justify-center items-center self-center gap-2 px-5 py-3.5 mt-5 max-w-full text-xs md:text-sm tracking-normal leading-none text-center bg-white rounded-xl border border-gray-200 border-solid min-h-[52px] text-zinc-500  border-gray   hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300  mx-auto"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5535 14.5061C10.4114 14.6615 10.2106 14.75 10 14.75C9.78943 14.75 9.58857 14.6615 9.44648 14.5061L5.44648 10.1311C5.16698 9.82538 5.18822 9.35098 5.49392 9.07148C5.79963 8.79198 6.27402 8.81322 6.55352 9.11892L9.25 12.0682V1C9.25 0.585787 9.58579 0.25 10 0.25C10.4142 0.25 10.75 0.585787 10.75 1V12.0682L13.4465 9.11892C13.726 8.81322 14.2004 8.79198 14.5061 9.07148C14.8118 9.35098 14.833 9.82537 14.5535 10.1311L10.5535 14.5061Z" fill="#6C7278" />
                <path d="M1.75 13C1.75 12.5858 1.41422 12.25 1 12.25C0.585788 12.25 0.250001 12.5858 0.250001 13V13.0549C0.24998 14.4225 0.249964 15.5248 0.366524 16.3918C0.487541 17.2919 0.746434 18.0497 1.34835 18.6516C1.95027 19.2536 2.70814 19.5125 3.60825 19.6335C4.47522 19.75 5.57754 19.75 6.94513 19.75H13.0549C14.4225 19.75 15.5248 19.75 16.3918 19.6335C17.2919 19.5125 18.0497 19.2536 18.6517 18.6516C19.2536 18.0497 19.5125 17.2919 19.6335 16.3918C19.75 15.5248 19.75 14.4225 19.75 13.0549V13C19.75 12.5858 19.4142 12.25 19 12.25C18.5858 12.25 18.25 12.5858 18.25 13C18.25 14.4354 18.2484 15.4365 18.1469 16.1919C18.0482 16.9257 17.8678 17.3142 17.591 17.591C17.3142 17.8678 16.9257 18.0482 16.1919 18.1469C15.4365 18.2484 14.4354 18.25 13 18.25H7C5.56459 18.25 4.56347 18.2484 3.80812 18.1469C3.07435 18.0482 2.68577 17.8678 2.40901 17.591C2.13225 17.3142 1.9518 16.9257 1.85315 16.1919C1.75159 15.4365 1.75 14.4354 1.75 13Z" fill="#6C7278" />
              </svg>
              {t("downloadReceipt")}
            </button>}

            {/* ------------------------------------------------------------------------------------------------- */}
            <div className="flex  gap-5 justify-center mt-7 w-full text-xs md:text-base tracking-normal leading-none max-md:max-w-full">
              <Link
                href={`/${window.location.pathname.slice(1, 3)}/profile`}
                className="flex-1 justify-center text-center p-5 whitespace-nowrap  border  border-solid rounded-xl text-primary bg-white max-md:px-5 border-primary hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 md:w-52 mx-auto"
              >
                {t("subscriptions")}
              </Link>

              <Link
                href={`/${window.location.pathname.slice(
                  1,
                  3
                )}/`}
                className="flex-1 justify-center text-center p-5  whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 md:w-52 mx-auto"
              >
                {t("browse")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDoneUNI;
