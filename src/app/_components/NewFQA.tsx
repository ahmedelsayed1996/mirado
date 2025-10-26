"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useState } from "react";
import { usePathname } from "next/navigation";


function NewFQA() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const t = useTranslations("commonQuest");

  const faqItems = [
    { title: t("qus1"), content: t("ans1") },
    { title: t("qus2"), content: t("ans2") },
    { title: t("qus3"), content: t("ans3") },
    { title: t("qus4"), content: t("ans4") },
    { title: t("qus5"), content: t("ans5") },
    { title: t("qus6"), content: t("ans6") },
    { title: t("qus7"), content: t("ans7") },
    { title: t("qus8"), content: t("ans8") },
    {
      title: t("qus9"), content: (
        <>
          <p>{t("ans9p1")}</p>
          <p>{t("ans9p2")}</p>
        </>
      )
    },
    { title: t("qus10"), content: t("ans10") },
  ];
  const c = useTranslations("CommonQuestion");
  const language = useCurrentLang();
  const pathName = usePathname();
  // console.log("pathName", pathName);
  // console.log("language", language);
  // console.log(pathName == `/${language}` ? "home" : "faq");

  const [pageOpen, setPageOpen] = useState<string>(pathName == `/${language}` ? "home" : "faq")

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    < section className="flex justify-between gap-10   px-10 lg:px-20 xl:px-28 py-12  max-sm:px-[25px] xl:py-16 my-0  max-md:flex-col  bg-neutral-50" >
      <div className="flex flex-col flex-1 gap-2  max-md:w-full ">
        <div className="flex w-full">
          <div className="py-0 ps-3.5 text-xl border-solid border-s-[5px] border-s-amber-500 text-zinc-900 max-sm:py-0 max-sm:pr-5 max-sm:pl-3.5">
            {c("head")}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-zinc-900 max-sm:text-2xl">
            {c("title")}
          </div>
          <div className="text-base font-medium tracking-normal leading-7 text-zinc-500 max-sm:w-full max-sm:text-sm">
            {c("p")}
          </div>
        </div>

        <Image src="/images/flag.webp" width={800} height={500} alt="flag" className="mt-9 h-[380px] w-[811px] " />
      </div >
      <div className="flex flex-col flex-1 gap-5 max-md:w-full">
        {(pageOpen === "home" ? faqItems.slice(0, 4) : faqItems).map((item, index) => {
          const isOpen = index === activeIndex;
          return (
            <div
              key={index}
              className={`overflow-hidden relative bg-white rounded-2xl border border-solid border-zinc-100 transition-all duration-300`}
            >
              <div className="absolute -top-5 right-2 rounded-3xl bg-slate-100 h-[101px] rotate-[-134deg] w-[52px]" />
              <div className="relative px-10 py-8 max-sm:p-5">
                <div className="text-base font-bold tracking-wide text-zinc-900 pr-16 line-clamp-2">
                  {item.title}
                </div>

                <div
                  className="flex absolute justify-center items-center px-0 pt-2 pb-1.5 bg-white rounded-3xl shadow-sm h-[42px] right-[30px] top-[25px] w-[42px] max-sm:right-[30px] cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  {isOpen ? (
                    // close
                    <svg width="13" height="28" viewBox="0 0 13 28" fill="none">
                      <path d="M1 14h11v1H1v-1z" fill="#0F172A" />
                    </svg>
                  ) : (
                    // open
                    <svg width="13" height="28" viewBox="0 0 13 28" fill="none">
                      <path d="M6 8v6H0v1h6v6h1v-6h6v-1H7V8H6z" fill="#0F172A" />
                    </svg>
                  )}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] mt-7" : "max-h-0"
                    }`}
                >
                  <div className="text-base tracking-wide leading-6 text-neutral-400 max-sm:w-full">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section >
  )
}

export default NewFQA
