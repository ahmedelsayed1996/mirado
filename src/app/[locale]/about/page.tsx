//"use client"
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SwiperSliderLogo from "@/app/_components/SwiperSliderLogo";
import BannerSection from "@/app/_components/BannerSection";
import Counter from "@/app/_components/Counter"; 

import DistinguishesEduxaAbout2 from "@/app/_components/DistinguishesEduxaAbout2";
import Newsletter from "@/app/_components/Newsletter";
import Contact from "@/app/_components/Contact";
import DistinguishesEduxa from "@/app/_components/DistinguishesEduxa";

export const metadata = {
  title: "عن Eduxa | خبرة في التقديم على الدراسة بالخارج منذ سنوات",
  description: "تعرف على فريق Eduxa ورؤيتنا في مساعدة الطلاب في تحقيق حلم الدراسة في الخارج بخطوات واضحة وخدمات موثوقة."
}

function AboutUs() {
  const t = useTranslations("whoWeAre1");
  const x = useTranslations("whoWeAre2");
  const f = useTranslations("home");
  const n = useTranslations("newHome");
  const w = useTranslations("whatWeDo");
  //const language = useCurrentLang();





  return (
    <>

      <BannerSection
        head={t("head")}
        breadcrumb={t("head")}
        urlImage="/images/2.png"
      />

      {/* success visa */}
      <section className="bg-neutral-50 py-8    ">
        <div className="w-full px-5 lg:px-16 xl:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">

            <article className="md:order-1">
              <p className="font-bold text-[32px] leading-[160%] text-zinc-700  [color:#1B1B1B]">
                <span className="block">{t("paragraph1")}</span>
                <span className="block"> {t("paragraph2")}</span>
              </p>
            </article>
            <article className="md:order-2 md:text-start">
              <p className="   font-normal  text-[18px] sm:text-[20px]  leading-[160%] text-zinc-700 text-start  [color:#A5A5A5] ">
                <span className="block">{t("paragraph3")}</span>
                <span className="block">{t("paragraph4")}</span>
              </p>
            </article>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="relative w-full md:w-[100%]  md:h-[450px] aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="/images/visa-success.png"
                alt="visa-success"
                fill
                sizes="(min-width:768px)  "
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/*  counters */}
      <section className="bg-neutral-50 py-8">
        <div className="w-full  8 rounded-3xl   grid grid-cols-1
         sm:grid-cols-3 text-center  ">

          <div className="flex flex-col items-center justify-center h-[100px] md:h-[170px]  border-[1px] border-solid border-[rgba(128,128,128,0.1)]">
            <div className="flex items-baseline justify-center font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900">
              <Counter end={10} suffix="K" />
              <span>+</span>
            </div>
            <div className="text-sm sm:text-base tracking-wide leading-6 text-zinc-800">
              {f("counter1")}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-[100px] md:h-[170px] border-[1px] border-solid border-[rgba(128,128,128,0.1)]">
            <div className="flex items-baseline justify-center font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900">
              <Counter end={900} />
              <span>+</span>
            </div>
            <div className="text-sm sm:text-base tracking-wide leading-6 text-zinc-800">
              {f("counter2")}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-[100px] md:h-[170px] border-[1px] border-solid border-[rgba(128,128,128,0.1)]">
            <div className="flex items-baseline justify-center font-bold text-4xl sm:text-5xl lg:text-6xl text-zinc-900">
              <Counter end={100} suffix="K" />
              <span>+</span>
            </div>
            <div className="text-sm sm:text-base tracking-wide leading-6 text-zinc-800">
              {f("counter4")}
            </div>
          </div>

        </div>
      </section>
      {/* <Slider /> */}
      <div className=" pb-10 bg-neutral-50">
        <div className="flex flex-col items-center px-0 pb-0.5 mx-auto my-0 w-full  ">
          <div className="relative mb-5 h-[23px] w-[624px] max-md:mx-auto max-md:mt-0 max-md:mb-5 max-md:w-[90%] max-sm:w-[95%]">
            <div className="absolute top-3.5 h-px bg-zinc-300 w-[624px] max-md:w-full" />
            <div className="absolute top-0 px-2.5 py-0 text-lg tracking-wide text-center bg-[#FAFAFA] h-[23px] left-[100px] text-primary w-[424px] max-md:w-4/5 max-md:left-[10%] max-sm:text-base max-sm:left-[5%] max-sm:w-[90%]">
              {n("CenterLine")}
            </div>
          </div>
        </div>
        <SwiperSliderLogo />
      </div>
      {/*  what we do */}
      <section className="py-12  bg-neutral-50 ">
        {/* match page width */}
        <div className="w-full  px-5 lg:px-16 xl:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            {/* LEFT: title + paragraph */}
            <div>
              <h2
                className="font-bold text-xl sm:text-xl md:text-2xl leading text-start 
               border-s-[4px] border-[#365D8D] border-solid ps-2">
                <span className="block">{w("label")}</span>
              </h2>

              <p className="mt-4 text-sm md:text-base lg:text-lg  leading-[160%] text-start">
                {w("paragraph")}
              </p>

              <p className="mt-4 text-sm md:text-base lg:text-lg leading-[160%] text-start">
                {w("massage")}
              </p>
            </div>
            {/* RIGHT: image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/what-about.png"
                alt="Visa success"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/*  our story*/}
      <section className="py-12 bg-neutral-50">
        <div className="px-5 lg:px-16 xl:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">

            {/* Image: bottom on mobile, left on md+ */}
            <div className="order-2 md:order-1">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/what-about2.png"
                  alt="Visa success"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text: top on mobile, right on md+ */}
            <div className="order-1 md:order-2">
              <h2 className="font-bold text-sm md:text-2xl lg:text-lg  leading-[1.4] text-start border-s-4 border-[#365D8D] ps-2">
                <span className="block">{x("card3")}</span>
              </h2>
              <p className="mt-4 text-sm md:text-base lg:text-lg  leading-[1.8] text-start">
                {x("info3")}
              </p>
            </div>

          </div>
        </div>
      </section>


      {/*      mission vision */}
      <section className="py-12 bg-neutral-50"  >
        <div className="px-5 lg:px-16 xl:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
            <h3 className="font-bold text-xl sm:text-2xl  leading-[160%] text-zinc-900 text-start border-s-[4px] border-[#365D8D] border-solid ps-2">
              {x("label")}
            </h3>

            <div className="text-start">
              <p className="   text-xl sm:text-2xl  leading-[160%] text-zinc-900">
                {x("head")}
              </p>
              <p className="mt-1 font-normal sm:text-lg text-sm leading-[160%] [color:#333333]">
                {x("massage")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5   overflow-hidden">

            <div className="  bg-white rounded-lg p-5">
              <div className="flex flex-col items-start gap-3">
                <Image src="/images/Mission.png" alt="logo" width={140} height={140} />
                <div className="font-bold text-lg sm:text-xl md:text-2xl leading-[1.4] leading-[160%]  ">
                  {x("card2")}
                </div>
                <p className="font-normal sm:text-lg text-sm   [color:#333333]">
                  {x("info2")}
                </p>
              </div>
            </div>

            <div className=" bg-white rounded-lg p-5">
              <div className="flex flex-col items-start gap-3">
                <Image src="/images/vision.png" alt="logo" width={140} height={140} />
                <div className="font-bold text-lg sm:text-xl md:text-2xl leading-[1.4] leading-[160%]  ">
                  {x("card1")}
                </div>
                <p className="font-normal sm:text-lg text-sm    [color:#333333]">
                  {x("inf1")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-neutral-50">

        {/* ما الذي يميز Eduxa؟ */}
        <DistinguishesEduxa />
        <DistinguishesEduxaAbout2 />
        {/* newsletter Section */}
        <Newsletter />
        {/* Contact us */}
        <Contact />
      </div>

    </>
  );
}

export default AboutUs;
