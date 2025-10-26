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
import FQA from "@/app/_components/FQA";
import NewFQA from "@/app/_components/NewFQA";
export const metadata = {
  title: "عن Eduxa | خبرة في التقديم على الدراسة بالخارج منذ سنوات",
  description: "تعرف على فريق Eduxa ورؤيتنا في مساعدة الطلاب في تحقيق حلم الدراسة في الخارج بخطوات واضحة وخدمات موثوقة."
}

function FAQDetails() {
  const t = useTranslations("whoWeAre1");
  const x = useTranslations("whoWeAre2");
  const f = useTranslations("home");
  const n = useTranslations("newHome");
  const w = useTranslations("whatWeDo");
  //const language = useCurrentLang();





  return (
    <>

      <BannerSection
        head={t("label2")}
        breadcrumb={t("label2")}
        urlImage="/images/fqa-banner.png"
      />

      <NewFQA />
      {/* newsletter Section */}
      <Newsletter />
      {/* Contact us */}
      <Contact />

    </>
  );
}

export default FAQDetails;
