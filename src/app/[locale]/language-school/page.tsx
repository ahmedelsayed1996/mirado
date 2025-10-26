// import { getLanguage } from '../../../../getLanguage';
import FilterINS from "@/app/_components/FilterINS";
import SearchINS from "@/app/_components/SearchINS";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const metadata = {
  title: "دورات لغة إنجليزية في الخارج بأسعار ممتازة | Eduxa",
  description:
    "احجز مقعدك في أفضل معاهد اللغة حول العالم – في بريطانيا، أمريكا، كندا، أيرلندا، وأستراليا. خيارات مرنة ودعم تأشيرات شامل.",
};

function LanguageSchools({ params }: { params: { lang: string } }) {
  const t = useTranslations("languageSchool");
  const f = useTranslations("filtration");

  return (
    <div className="flex flex-col justify-center items-center bg-secondColor w-full">
      <div className="flex flex-col items-start self-center pl-20 mt-5 w-full text-start text-primary max-w-[1300px] max-md:pl-5 max-md:max-w-full ">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </li>
            <li>
              {/* <Link href={`/${params.lang}/`} className="block transition hover:text-gray"> {lang.languageSchool.breadhome} </Link> */}
              <Link href={`/`} className="block transition hover:text-gray">
                {" "}
                {t("breadhome")}
              </Link>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <Link href="#" className="block transition hover:text-gray">
                {/* {lang.languageSchool.head}  */}
                {t("head")}
              </Link>
            </li>
          </ol>
        </nav>
        <div className="mt-5 text-2xl md:text-4xl font-bold"> {t("head")}</div>
      </div>

      <div className="flex flex-col w-full py-8 px-3 bg-white rounded-3xl shadow-2xl   mt-10">
        <div className="text-2xl md:text-4xl font-medium tracking-tight text-center text-black capitalize md:leading-[54px] max-md:max-w-full">
          {t("subHead")}
        </div>
        <div className="mt-4 text-sm md:text-base text-center capitalize text-slate-500 max-md:max-w-full">
          {t("subHeadTwo")}
        </div>
        <SearchINS />

        <FilterINS />
        <div className="flex gap-5 justify-between pr-20 mt-8 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full"></div>
      </div>
    </div>
  );
}

export default LanguageSchools;
