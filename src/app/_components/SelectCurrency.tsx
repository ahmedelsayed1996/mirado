import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { currencies } from "../_lib/currencies";
import { useTranslations } from "next-intl";

interface SelectCurrencyProps {
  onClose: () => void; // الدالة لإغلاق المكون
  onCurrencySelect: (currency: string) => void; // الدالة للتعامل مع العملة المختارة
}

function SelectCurrency({ onClose, onCurrencySelect }: SelectCurrencyProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currency, setCurrency] = useState<object>(currencies);
  const t = useTranslations("Popup");


  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.target.value;
    console.log("selectedCurrency", selectedCurrency.toLowerCase());
    setSelectedOption(selectedCurrency.toLowerCase());
    onCurrencySelect(selectedCurrency.toLowerCase());
  };

  // const getCurrency = async () => {
  //   try {
  //     const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json");

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await res.json();
  //     // console.log(data);
  //     setCurrency(data);

  //   } catch (error) {
  //     console.log(error);

  //   }
  // }
  useEffect(() => {
    // getCurrency();
  }, [])

  return (
    <div className="flex justify-center items-center px-16  bg-secondColor bg-opacity-80 max-md:px-5  ">
      <div className=" flex flex-col justify-center p-8 my-36 max-w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl w-[550px] max-md:px-5 max-md:mt-10  ">
        <button
          className="flex flex-row self-end z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
          onClick={onClose}
        >
          <p className="font-bold">{"X"}</p>
        </button>

        <div className="mt-4 block text-lg font-medium text-gray-700   ">
          <label
            htmlFor="options"
            className="block text-lg font-medium text-gray-700  "
          >
            {t("ChooseCurrency")}:
          </label>
          <select
            id="options"
            required
            value={selectedOption}
            onChange={handleSelectChange}
            // className="mt-2 p-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-slate-100 cursor-pointer"
            className="mt-1.5 text-slate-500 focus:outline-none w-12 overflow-hidden text-ellipsis"
            style={{ width: "100px" }}
          >
            <option value="" disabled>
              {t("ChooseLocalCurrency")}
            </option>
            {currencies?.map((currency: any, index: number) => (
              <option key={index} value={currency?.name}>
                {currency?.name} ({currency.symbol})
              </option>
            ))}
            {/* {Object.entries(currency).map(([key, value]) => (
              <option key={key} value={key}>
                {value} ({key})
              </option>
            ))} */}
            {/* {currencies && currencies.map((key, index) => (
              <option key={index} value={key.name}>{key.symbol} {key.name} </option>
            ))} */}
          </select>
        </div>

        {/* {selectedOption && <button
          className="flex flex-row self-end justify-center items-center px-5 my-5 w-20 h-12 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer "
          
        >
          <p className="font-bold">Next</p>
        </button>} */}


      </div>
    </div>
  );
}

export default SelectCurrency