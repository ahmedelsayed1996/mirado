import BannerSection from "@/app/_components/BannerSection";
import Contact from "@/app/_components/Contact";
import { useTranslations } from "next-intl";


export const metadata = {
  title: "اتصل بـ Eduxa | استشارة دراسية مجانية للدراسة بالخارج",
  description: "هل تبحث عن قبول جامعي أو معهد لغة؟ تواصل معنا الآن واحصل على استشارة مجانية مع أحد مستشارينا التعليميين."
}

export default function ContactUsPage() {
  const ContactTR = useTranslations("contactUs");
  return (
    <>
      <BannerSection
        head={ContactTR("headingBanner")}
        breadcrumb={ContactTR("breadcrumb2")}
        urlImage="/images/ContactUsBanner.png"
      />
      <div className="pt-20 bg-neutral-50">

        <Contact />
      </div>
    </>
  );
}



