
"use client";
import { useTranslations } from "next-intl";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useCurrentLang from "../_hooks/useCurrentLang";
import { AppDispatch } from "../store";
import NewPaymentUNI from "./NewPaymentUNI";
import Spinner from "./Spinner";

interface SelectCurrencyProps {
  onClose: () => void; // الدالة لإغلاق المكون
}

function AvailableOffices({ onClose }: SelectCurrencyProps) {

  const language = useCurrentLang();
  const dispatch = useDispatch<AppDispatch>();
  const { tokenMainSite } = parseCookies();
  const t = useTranslations('Popup');

  const [availableOffices, setAvailableOffices] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [oderId, setOderId] = useState<any>({});
  const [createQuote, setCreateQuote] = useState<string>("stepTwo");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

  const totalPriceUNI = useSelector((state: any) => state.totalPriceUNI);

  const getAllOffices = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/offices`, {
        method: 'GET',
        headers: {
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`
        },
      })
      const result = await res.json();
      setAvailableOffices(result);

    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (eve: any) => {
    setIsLoading(true);
    eve.preventDefault();
    const selectedOffice = eve.target.office.value;
    const data: any = localStorage.getItem("orderUNI");
    const order = JSON.parse(data);
    const { convertedPrice, programId, totalPriceUNI, universityId, userId, transferFees, totalEduxaFee } = order;



    try {
      const data = JSON.stringify({
        "user_id": parseInt(userId),
        "university_id": parseInt(universityId),
        "program_id": parseInt(programId),
        "office_id": parseInt(selectedOffice),
        "total_price": totalPriceUNI,
        "converted_price": convertedPrice ? convertedPrice : "",
        "eduxa_fees": totalEduxaFee,
        "transfer_fees": transferFees
      })
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/university-orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenMainSite}`,
        },
        body: data,
      })
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }
      const result = await res.json();
      setCreateQuote("stepThree");
      // setPaymentDone(true);
      // orderId(result.id);
      setOderId(result?.id);
      // onOfficeSelect(result.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }


  }
  useEffect(() => {
    getAllOffices();
  }, [])

  return (
    <div className="flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-50 size-full z-30">
      <div className="bg-white rounded-3xl md:w-[665px] p-3 md:p-0">
        <div
          className="relative shrink-0 bg-white rounded-3xl"
        >
          <form onSubmit={handleSubmit}>
            <div className="box-border flex justify-between items-center px-6 py-5 w-full border-b border-solid border-b-zinc-100 h-[70px] max-md:px-5 max-md:py-4 max-md:h-auto max-sm:px-4 max-sm:py-3">
              <div className="flex gap-2 items-center max-sm:gap-1.5">
                <div
                  className="flex justify-center items-center h-[22px] w-[22px]"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.1663 7.15901V14.8407C20.1663 17.7832 17.783 20.1665 14.8405 20.1665H7.15884C4.21634 20.1665 1.83301 17.7832 1.83301 14.8407V7.15901C1.83301 4.87651 2.76801 3.21734 4.42717 2.41068C5.03217 2.11734 5.72884 2.57568 5.72884 3.24484V11.3848C5.72884 12.4757 6.15051 13.3465 6.91134 13.7865C7.68134 14.2173 8.65301 14.1257 9.64301 13.5298L10.8347 12.8148C10.908 12.7782 11.0913 12.7782 11.1463 12.8057L12.3563 13.5298C13.0163 13.924 13.5847 14.0523 14.043 14.0523C14.5197 14.0523 14.8863 13.9057 15.1063 13.7773C15.8488 13.3465 16.2705 12.4757 16.2705 11.3848V3.24484C16.2705 2.57568 16.9763 2.11734 17.5722 2.41068C19.2313 3.21734 20.1663 4.87651 20.1663 7.15901Z" fill="#F89A21" />
                    <path d="M13.9795 1.83398C14.4837 1.83398 14.8962 2.24648 14.8962 2.75065V11.3857C14.8962 11.9723 14.722 12.4123 14.4195 12.5865C14.1078 12.7698 13.6128 12.6782 13.0628 12.3482L11.8528 11.624C11.3853 11.3398 10.6153 11.3398 10.1478 11.624L8.93783 12.3482C8.38783 12.6782 7.89283 12.7607 7.58116 12.5865C7.27866 12.4123 7.10449 11.9723 7.10449 11.3857V2.75065C7.10449 2.24648 7.51699 1.83398 8.02116 1.83398H13.9795Z" fill="#F89A21" />
                  </svg>

                </div>
                <div
                  className="text-base font-medium tracking-wide  max-sm:text-sm"
                >
                  {t("createQuote")}
                </div>
              </div>
              <div className="cursor-pointer" onClick={onClose}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.00017 6.82674L1.79975 11.0272C1.68447 11.1424 1.54725 11.1997 1.38808 11.199C1.22878 11.1982 1.0901 11.1388 0.972043 11.0207C0.858293 10.9026 0.802529 10.7664 0.804751 10.6119C0.806835 10.4576 0.864752 10.3236 0.978502 10.2099L5.17246 5.99903L0.978502 1.7882C0.870029 1.67986 0.814474 1.54715 0.811835 1.39007C0.809196 1.23299 0.864752 1.09542 0.978502 0.977362C1.09225 0.859307 1.22739 0.798543 1.38392 0.795071C1.54045 0.791598 1.67906 0.84889 1.79975 0.966946L6.00017 5.17132L10.2045 0.966946C10.3172 0.854307 10.4531 0.798335 10.6123 0.799029C10.7716 0.799862 10.9116 0.859307 11.0323 0.977362C11.1434 1.09542 11.1978 1.23167 11.1956 1.38611C11.1935 1.54042 11.1356 1.67445 11.0218 1.7882L6.82788 5.99903L11.0218 10.2099C11.1303 10.3182 11.1859 10.4509 11.1885 10.608C11.1911 10.7651 11.1356 10.9026 11.0218 11.0207C10.9081 11.1388 10.7729 11.1995 10.6164 11.203C10.4599 11.2065 10.3226 11.1478 10.2045 11.0272L6.00017 6.82674Z" fill="#A5A5A5" />
                </svg>

              </div>
            </div>

            {createQuote === "stepOne" ?
              <>
                <div className="rounded-lg border border-solid border-zinc-100 md:m-6">
                  <div
                    className="m-3 pt-px pl-3.5 text-lg font-medium tracking-wide border-solid border-l-[5px] border-l-amber-500 flex-[1_0_0] h-[50px] "
                  >
                    {t("paymentMethod")}
                  </div>
                  <hr className="px-5 text-gray mx-4" />
                  <section className="flex p-3">
                    <label className="flex flex-col bg-secondColor opacity-50 rounded-lg w-1/2 p-3 m-2" >
                      <div className="text-end"><input type="radio" name="pay" disabled /></div>
                      <div className="flex justify-center "><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M68.3333 16.666H11.6667C7.98477 16.666 5 19.6508 5 23.3327V56.666C5 60.3479 7.98477 63.3327 11.6667 63.3327H68.3333C72.0152 63.3327 75 60.3479 75 56.666V23.3327C75 19.6508 72.0152 16.666 68.3333 16.666Z" fill="#365D8D" />
                        <path d="M20.3307 23.334H12.9974C12.261 23.334 11.6641 23.9309 11.6641 24.6673V32.0007C11.6641 32.737 12.261 33.334 12.9974 33.334H20.3307C21.0671 33.334 21.6641 32.737 21.6641 32.0007V24.6673C21.6641 23.9309 21.0671 23.334 20.3307 23.334Z" fill="#F89A21" />
                        <path d="M31.6667 58.334H28.3333C27.8913 58.334 27.4674 58.1584 27.1548 57.8458C26.8423 57.5333 26.6667 57.1093 26.6667 56.6673C26.6667 56.2253 26.8423 55.8014 27.1548 55.4888C27.4674 55.1762 27.8913 55.0007 28.3333 55.0007H31.6667C32.1087 55.0007 32.5326 55.1762 32.8452 55.4888C33.1577 55.8014 33.3333 56.2253 33.3333 56.6673C33.3333 57.1093 33.1577 57.5333 32.8452 57.8458C32.5326 58.1584 32.1087 58.334 31.6667 58.334ZM41.6667 58.334H38.3333C37.8913 58.334 37.4674 58.1584 37.1548 57.8458C36.8423 57.5333 36.6667 57.1093 36.6667 56.6673C36.6667 56.2253 36.8423 55.8014 37.1548 55.4888C37.4674 55.1762 37.8913 55.0007 38.3333 55.0007H41.6667C42.1087 55.0007 42.5326 55.1762 42.8452 55.4888C43.1577 55.8014 43.3333 56.2253 43.3333 56.6673C43.3333 57.1093 43.1577 57.5333 42.8452 57.8458C42.5326 58.1584 42.1087 58.334 41.6667 58.334ZM18.3333 41.6673H11.6667C11.2246 41.6673 10.8007 41.4917 10.4882 41.1792C10.1756 40.8666 10 40.4427 10 40.0007C10 39.5586 10.1756 39.1347 10.4882 38.8221C10.8007 38.5096 11.2246 38.334 11.6667 38.334H18.3333C18.7754 38.334 19.1993 38.5096 19.5118 38.8221C19.8244 39.1347 20 39.5586 20 40.0007C20 40.4427 19.8244 40.8666 19.5118 41.1792C19.1993 41.4917 18.7754 41.6673 18.3333 41.6673ZM31.6667 41.6673H25C24.558 41.6673 24.134 41.4917 23.8215 41.1792C23.5089 40.8666 23.3333 40.4427 23.3333 40.0007C23.3333 39.5586 23.5089 39.1347 23.8215 38.8221C24.134 38.5096 24.558 38.334 25 38.334H31.6667C32.1087 38.334 32.5326 38.5096 32.8452 38.8221C33.1577 39.1347 33.3333 39.5586 33.3333 40.0007C33.3333 40.4427 33.1577 40.8666 32.8452 41.1792C32.5326 41.4917 32.1087 41.6673 31.6667 41.6673ZM45 41.6673H38.3333C37.8913 41.6673 37.4674 41.4917 37.1548 41.1792C36.8423 40.8666 36.6667 40.4427 36.6667 40.0007C36.6667 39.5586 36.8423 39.1347 37.1548 38.8221C37.4674 38.5096 37.8913 38.334 38.3333 38.334H45C45.442 38.334 45.866 38.5096 46.1785 38.8221C46.4911 39.1347 46.6667 39.5586 46.6667 40.0007C46.6667 40.4427 46.4911 40.8666 46.1785 41.1792C45.866 41.4917 45.442 41.6673 45 41.6673ZM58.3333 41.6673H51.6667C51.2246 41.6673 50.8007 41.4917 50.4882 41.1792C50.1756 40.8666 50 40.4427 50 40.0007C50 39.5586 50.1756 39.1347 50.4882 38.8221C50.8007 38.5096 51.2246 38.334 51.6667 38.334H58.3333C58.7754 38.334 59.1993 38.5096 59.5118 38.8221C59.8244 39.1347 60 39.5586 60 40.0007C60 40.4427 59.8244 40.8666 59.5118 41.1792C59.1993 41.4917 58.7754 41.6673 58.3333 41.6673Z" fill="#F89A21" />
                        <path d="M66.9974 50H52.9974C52.261 50 51.6641 50.597 51.6641 51.3333V55.3333C51.6641 56.0697 52.261 56.6667 52.9974 56.6667H66.9974C67.7338 56.6667 68.3307 56.0697 68.3307 55.3333V51.3333C68.3307 50.597 67.7338 50 66.9974 50Z" fill="#F89A21" />
                      </svg>
                      </div>
                      <div className="text-center">{t("payByCard")}</div>
                    </label>
                    <label htmlFor="officePlace"
                      className={`flex flex-col rounded-lg w-1/2 p-3 m-2 cursor-pointer transition-colors accent-[#F89A21]
                  ${selected === "officePlace" ? "bg-[#f89b211f] border border-[#F89A21]" : "bg-secondColor"}`}
                    >
                      <div className="text-end">
                        <input
                          type="radio"
                          name="pay"
                          id="officePlace"
                          value="officePlace"
                          onChange={(e) => {
                            setSelected(e.target.value);
                            setError("");
                          }}
                          // className="hidden"
                          required
                        />
                      </div>
                      <div className="flex justify-center"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M78.75 33.125V78.125H61.25V28.125H73.75C75.0749 28.129 76.3443 28.657 77.2812 29.5938C78.218 30.5307 78.746 31.8001 78.75 33.125Z" fill="#DBDAD9" />
                        <path d="M23.75 8.125H56.25C57.5761 8.125 58.8479 8.65178 59.7855 9.58947C60.7232 10.5271 61.25 11.7989 61.25 13.125V78.125H18.75V13.125C18.75 11.7989 19.2768 10.5271 20.2145 9.58947C21.1521 8.65178 22.4239 8.125 23.75 8.125Z" fill="#365D8D" />
                        <path d="M53.75 8.125H26.25V3.125C26.25 2.46196 26.5134 1.82607 26.9822 1.35723C27.4511 0.888392 28.087 0.625 28.75 0.625H51.25C51.913 0.625 52.5489 0.888392 53.0178 1.35723C53.4866 1.82607 53.75 2.46196 53.75 3.125V8.125ZM18.75 28.125V78.125H1.25V33.125C1.25396 31.8001 1.78201 30.5307 2.71884 29.5938C3.65566 28.657 4.92513 28.129 6.25 28.125H18.75ZM51.25 63.125V78.125H28.75V63.125C28.754 61.8001 29.282 60.5307 30.2188 59.5938C31.1557 58.657 32.4251 58.129 33.75 58.125H46.25C47.5749 58.129 48.8443 58.657 49.7812 59.5938C50.718 60.5307 51.246 61.8001 51.25 63.125Z" fill="#DBDAD9" />
                        <path d="M40 54.0137C39.6685 54.0137 39.3505 53.882 39.1161 53.6476C38.8817 53.4131 38.75 53.0952 38.75 52.7637V42.7637C38.75 42.4322 38.8817 42.1142 39.1161 41.8798C39.3505 41.6454 39.6685 41.5137 40 41.5137C40.3315 41.5137 40.6495 41.6454 40.8839 41.8798C41.1183 42.1142 41.25 42.4322 41.25 42.7637V52.7637C41.25 53.0952 41.1183 53.4131 40.8839 53.6476C40.6495 53.882 40.3315 54.0137 40 54.0137Z" fill="white" />
                        <path d="M41.25 58.125H38.75V78.125H41.25V58.125Z" fill="#AEB0B3" />
                        <path d="M39.9975 54.0125C39.8332 54.0128 39.6705 53.9807 39.5186 53.9181C39.3668 53.8555 39.2287 53.7635 39.1125 53.6475L35.5775 50.1125C35.3498 49.8768 35.2238 49.561 35.2266 49.2333C35.2295 48.9055 35.3609 48.592 35.5927 48.3603C35.8244 48.1285 36.138 47.997 36.4657 47.9942C36.7934 47.9913 37.1092 48.1173 37.345 48.345L39.9975 51L42.65 48.3475C42.8857 48.1198 43.2015 47.9938 43.5292 47.9967C43.8569 47.9995 44.1705 48.131 44.4022 48.3628C44.634 48.5945 44.7654 48.908 44.7683 49.2358C44.7711 49.5635 44.6451 49.8793 44.4174 50.115L40.8825 53.65C40.6472 53.8834 40.3288 54.0138 39.9975 54.0125Z" fill="white" />
                        <path d="M13.75 70.625V78.125H6.25V70.625C6.25 69.962 6.51339 69.3261 6.98223 68.8572C7.45107 68.3884 8.08696 68.125 8.75 68.125H11.25C11.913 68.125 12.5489 68.3884 13.0178 68.8572C13.4866 69.3261 13.75 69.962 13.75 70.625ZM73.75 70.625V78.125H66.25V70.625C66.25 69.962 66.5134 69.3261 66.9822 68.8572C67.4511 68.3884 68.087 68.125 68.75 68.125H71.25C71.913 68.125 72.5489 68.3884 73.0178 68.8572C73.4866 69.3261 73.75 69.962 73.75 70.625ZM11.25 49.375H8.75C8.41848 49.375 8.10054 49.2433 7.86612 49.0089C7.6317 48.7745 7.5 48.4565 7.5 48.125C7.5 47.7935 7.6317 47.4755 7.86612 47.2411C8.10054 47.0067 8.41848 46.875 8.75 46.875H11.25C11.5815 46.875 11.8995 47.0067 12.1339 47.2411C12.3683 47.4755 12.5 47.7935 12.5 48.125C12.5 48.4565 12.3683 48.7745 12.1339 49.0089C11.8995 49.2433 11.5815 49.375 11.25 49.375ZM11.25 59.375H8.75C8.41848 59.375 8.10054 59.2433 7.86612 59.0089C7.6317 58.7745 7.5 58.4565 7.5 58.125C7.5 57.7935 7.6317 57.4755 7.86612 57.2411C8.10054 57.0067 8.41848 56.875 8.75 56.875H11.25C11.5815 56.875 11.8995 57.0067 12.1339 57.2411C12.3683 57.4755 12.5 57.7935 12.5 58.125C12.5 58.4565 12.3683 58.7745 12.1339 59.0089C11.8995 59.2433 11.5815 59.375 11.25 59.375ZM71.25 39.375H68.75C68.4185 39.375 68.1005 39.2433 67.8661 39.0089C67.6317 38.7745 67.5 38.4565 67.5 38.125C67.5 37.7935 67.6317 37.4755 67.8661 37.2411C68.1005 37.0067 68.4185 36.875 68.75 36.875H71.25C71.5815 36.875 71.8995 37.0067 72.1339 37.2411C72.3683 37.4755 72.5 37.7935 72.5 38.125C72.5 38.4565 72.3683 38.7745 72.1339 39.0089C71.8995 39.2433 71.5815 39.375 71.25 39.375ZM71.25 49.375H68.75C68.4185 49.375 68.1005 49.2433 67.8661 49.0089C67.6317 48.7745 67.5 48.4565 67.5 48.125C67.5 47.7935 67.6317 47.4755 67.8661 47.2411C68.1005 47.0067 68.4185 46.875 68.75 46.875H71.25C71.5815 46.875 71.8995 47.0067 72.1339 47.2411C72.3683 47.4755 72.5 47.7935 72.5 48.125C72.5 48.4565 72.3683 48.7745 72.1339 49.0089C71.8995 49.2433 71.5815 49.375 71.25 49.375ZM71.25 59.375H68.75C68.4185 59.375 68.1005 59.2433 67.8661 59.0089C67.6317 58.7745 67.5 58.4565 67.5 58.125C67.5 57.7935 67.6317 57.4755 67.8661 57.2411C68.1005 57.0067 68.4185 56.875 68.75 56.875H71.25C71.5815 56.875 71.8995 57.0067 72.1339 57.2411C72.3683 57.4755 72.5 57.7935 72.5 58.125C72.5 58.4565 72.3683 58.7745 72.1339 59.0089C71.8995 59.2433 71.5815 59.375 71.25 59.375ZM11.25 39.375H8.75C8.41848 39.375 8.10054 39.2433 7.86612 39.0089C7.6317 38.7745 7.5 38.4565 7.5 38.125C7.5 37.7935 7.6317 37.4755 7.86612 37.2411C8.10054 37.0067 8.41848 36.875 8.75 36.875H11.25C11.5815 36.875 11.8995 37.0067 12.1339 37.2411C12.3683 37.4755 12.5 37.7935 12.5 38.125C12.5 38.4565 12.3683 38.7745 12.1339 39.0089C11.8995 39.2433 11.5815 39.375 11.25 39.375Z" fill="#365D8D" />
                        <path d="M39.9766 45.2363C48.9512 45.2363 56.2266 37.961 56.2266 28.9863C56.2266 20.0117 48.9512 12.7363 39.9766 12.7363C31.0019 12.7363 23.7266 20.0117 23.7266 28.9863C23.7266 37.961 31.0019 45.2363 39.9766 45.2363Z" fill="#F89A21" />
                        <path d="M41.25 27.2363H38.75C38.087 27.2363 37.4511 26.9729 36.9822 26.5041C36.5134 26.0353 36.25 25.3994 36.25 24.7363C36.25 24.0733 36.5134 23.4374 36.9822 22.9686C37.4511 22.4997 38.087 22.2363 38.75 22.2363H41.25C41.913 22.2363 42.5489 22.4997 43.0178 22.9686C43.4866 23.4374 43.75 24.0733 43.75 24.7363C43.75 25.0678 43.8817 25.3858 44.1161 25.6202C44.3505 25.8546 44.6685 25.9863 45 25.9863C45.3315 25.9863 45.6495 25.8546 45.8839 25.6202C46.1183 25.3858 46.25 25.0678 46.25 24.7363C46.25 23.4102 45.7232 22.1385 44.7855 21.2008C43.8479 20.2631 42.5761 19.7363 41.25 19.7363V18.4863C41.25 18.1548 41.1183 17.8369 40.8839 17.6024C40.6495 17.368 40.3315 17.2363 40 17.2363C39.6685 17.2363 39.3505 17.368 39.1161 17.6024C38.8817 17.8369 38.75 18.1548 38.75 18.4863V19.7363C37.4239 19.7363 36.1521 20.2631 35.2145 21.2008C34.2768 22.1385 33.75 23.4102 33.75 24.7363C33.75 26.0624 34.2768 27.3342 35.2145 28.2719C36.1521 29.2095 37.4239 29.7363 38.75 29.7363H41.25C41.913 29.7363 42.5489 29.9997 43.0178 30.4686C43.4866 30.9374 43.75 31.5733 43.75 32.2363C43.75 32.8994 43.4866 33.5353 43.0178 34.0041C42.5489 34.4729 41.913 34.7363 41.25 34.7363H38.75C38.087 34.7363 37.4511 34.4729 36.9822 34.0041C36.5134 33.5353 36.25 32.8994 36.25 32.2363C36.25 31.9048 36.1183 31.5869 35.8839 31.3524C35.6495 31.118 35.3315 30.9863 35 30.9863C34.6685 30.9863 34.3505 31.118 34.1161 31.3524C33.8817 31.5869 33.75 31.9048 33.75 32.2363C33.75 33.5624 34.2768 34.8342 35.2145 35.7719C36.1521 36.7095 37.4239 37.2363 38.75 37.2363V38.4863C38.75 38.8178 38.8817 39.1358 39.1161 39.3702C39.3505 39.6046 39.6685 39.7363 40 39.7363C40.3315 39.7363 40.6495 39.6046 40.8839 39.3702C41.1183 39.1358 41.25 38.8178 41.25 38.4863V37.2363C42.5761 37.2363 43.8479 36.7095 44.7855 35.7719C45.7232 34.8342 46.25 33.5624 46.25 32.2363C46.25 30.9102 45.7232 29.6385 44.7855 28.7008C43.8479 27.7631 42.5761 27.2363 41.25 27.2363Z" fill="#C8A271" />
                      </svg>
                      </div>
                      <div className="text-center">{t("payByOffice")}</div>
                    </label>
                  </section>
                  {error && <div className="text-red-500 flex gap-1 items-center py-2 text-sm md:text-base px-2"><div><svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.99935 0.167969C2.78518 0.167969 0.166016 2.78714 0.166016 6.0013C0.166016 9.21547 2.78518 11.8346 5.99935 11.8346C9.21352 11.8346 11.8327 9.21547 11.8327 6.0013C11.8327 2.78714 9.21352 0.167969 5.99935 0.167969ZM5.56185 3.66797C5.56185 3.4288 5.76018 3.23047 5.99935 3.23047C6.23852 3.23047 6.43685 3.4288 6.43685 3.66797V6.58464C6.43685 6.8238 6.23852 7.02214 5.99935 7.02214C5.76018 7.02214 5.56185 6.8238 5.56185 6.58464V3.66797ZM6.53602 8.5563C6.50685 8.63213 6.46602 8.69047 6.41352 8.7488C6.35518 8.8013 6.29102 8.84214 6.22102 8.8713C6.15102 8.90047 6.07518 8.91797 5.99935 8.91797C5.92352 8.91797 5.84768 8.90047 5.77768 8.8713C5.70768 8.84214 5.64352 8.8013 5.58518 8.7488C5.53268 8.69047 5.49185 8.63213 5.46268 8.5563C5.43352 8.4863 5.41602 8.41047 5.41602 8.33464C5.41602 8.2588 5.43352 8.18297 5.46268 8.11297C5.49185 8.04297 5.53268 7.9788 5.58518 7.92047C5.64352 7.86797 5.70768 7.82714 5.77768 7.79797C5.91768 7.73964 6.08102 7.73964 6.22102 7.79797C6.29102 7.82714 6.35518 7.86797 6.41352 7.92047C6.46602 7.9788 6.50685 8.04297 6.53602 8.11297C6.56518 8.18297 6.58268 8.2588 6.58268 8.33464C6.58268 8.41047 6.56518 8.4863 6.53602 8.5563Z" fill="#CA1313" />
                  </svg>
                  </div> {error}</div>}
                </div>
                <div className="flex justify-end gap-2 p-6">
                  <div
                    className="flex gap-1 justify-center items-center px-4 py-0 w-40 h-12 border border-solid cursor-pointer border-primary rounded-[64px] max-sm:w-full"
                    onClick={onClose}
                  >
                    {t("cancel")}
                  </div>
                  <button
                    onClick={() => {
                      if (selected === "officePlace") {
                        setCreateQuote("stepTwo");
                        setError("");
                      } else {
                        setError(t("errorMessage"));
                      }
                    }}
                    type="button"
                    className="flex gap-1 justify-center items-center px-4 py-0 w-40 h-12 border border-solid cursor-pointer bg-primary border-primary rounded-[64px] max-sm:w-full text-base font-medium tracking-wide text-white"
                  >
                    {t("next")}
                  </button>
                </div>
              </> : createQuote === "stepTwo" ? <div className="relative shrink-0 mx-auto py-5 bg-white rounded-3xl max-md:mx-auto max-md:my-0 max-md:w-full max-sm:m-0 max-sm:w-full max-sm:rounded-xl">
                <div className="relative mx-6 mt-4 mb-0 rounded-lg border border-solid border-zinc-100">
                  <div className="box-border flex justify-start items-center p-4 w-full border-b border-solid border-b-zinc-100">
                    <div
                      className="pt-px pe-0 pb-0.5 ps-3.5 w-full text-lg font-medium tracking-wide border-solid border-l-[5px] border-l-amber-500 h-[37px] text-zinc-900 max-sm:text-base">
                      {t("payByOffice")}
                    </div>
                  </div>
                  <div className="flex flex-wrap flex-col md:flex-row gap-4 p-2 md:p-4 max-sm:gap-4">
                    {availableOffices?.map((office) => (
                      <label htmlFor={office.id} key={office.id} className="flex flex-col gap-2 justify-center items-center p-2 md:p-4 rounded-lg border border-secondColor hover:border-amber-500 border-solid bg-secondColor hover:bg-amber-500 hover:bg-opacity-10 md:w-[calc(50%_-_8px)] cursor-pointer accent-amber-400">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <div className="flex gap-1 justify-between items-center w-full max-sm:gap-4">
                            <div className="flex gap-1 items-center">
                              <div
                                className="flex justify-center items-center w-4 h-4"
                              >
                                <div>
                                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7467 4.63268C11.0467 1.55268 8.36006 0.166016 6.00006 0.166016C6.00006 0.166016 6.00006 0.166016 5.9934 0.166016C3.64006 0.166016 0.94673 1.54602 0.24673 4.62602C-0.53327 8.06602 1.5734 10.9793 3.48006 12.8127C4.18673 13.4927 5.0934 13.8327 6.00006 13.8327C6.90673 13.8327 7.8134 13.4927 8.5134 12.8127C10.4201 10.9793 12.5267 8.07268 11.7467 4.63268ZM6.00006 7.97268C4.84006 7.97268 3.90006 7.03268 3.90006 5.87268C3.90006 4.71268 4.84006 3.77268 6.00006 3.77268C7.16006 3.77268 8.10006 4.71268 8.10006 5.87268C8.10006 7.03268 7.16006 7.97268 6.00006 7.97268Z" fill="#F89A21" />
                                  </svg>
                                </div>
                              </div>
                              <div
                                className="text-xs font-medium tracking-wide text-zinc-900">
                                {office.name}
                              </div>
                            </div>

                            <div className="text-end">
                              <input
                                type="radio"
                                name="office"
                                id={office.id}
                                value={office.id}
                                onChange={(e) => {
                                  setError("");
                                }}
                                className="accent-amber-500"
                                required
                              />
                            </div>
                          </div>
                          <div
                            className="w-full text-xs font-medium tracking-wide text-zinc-900"
                          >{office.address}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 justify-end mt-6 mx-6">
                  {isLoading ? <Spinner /> : <>
                    {/* <div
                      onClick={() => {
                        setCreateQuote("stepOne");
                        setSelected("");
                      }}
                      className="gap-1 px-4 py-2 w-40 text-center text-base font-medium tracking-wide border border-solid border-primary rounded-[64px] text-primary cursor-pointer"
                    >
                      {t("back")}
                    </div> */}
                    <button
                      className="gap-1 px-4 py-2 w-40 text-center text-base font-medium tracking-wide text-white border border-solid bg-primary border-primary rounded-[64px]"
                    >
                      {t("submit")}

                    </button>
                  </>}
                </div>
              </div> : ""}
          </form>

          {createQuote === "stepThree" ?
            <NewPaymentUNI orderId={oderId} /> : ""}
        </div>
      </div>
    </div>
  );
}

export default AvailableOffices;
