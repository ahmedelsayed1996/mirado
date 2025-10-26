import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import useCurrentLang from "../_hooks/useCurrentLang";

function NewHero() {
  const n = useTranslations("newHome");
  const language = useCurrentLang();

  const user = useSelector((state: any) => state.displayUser);



  return (
    <div className="flex overflow-hidden relative flex-col h-[40rem] md:h-[60rem]">
      <Image
        src="/images/hero section.webp"
        alt="Hero Section"
        fill={true}
        className="object-cover absolute inset-0 size-full"
        priority
      />
      <div className="flex relative flex-col items-start px-5 md:px-12 lg:px-20 xl:px-28 md:pt-96 md:pb-52 w-full max-md:px-5 max-md:pt-12 max-md:max-w-full">
        <div className="flex flex-col w-full max-md:mb-2.5">
          <div className="flex flex-col w-full text-xl leading-[40px] font-bold text-white max-md:max-w-full ">
            <div className=" max-md:max-w-full capitalize">{n("WelcomeToEduxa")}</div>
            <div className="mt-2 text-4xl leading-[50px] max-md:max-w-full max-md:text-2xl max-md:leading-[40px]">
              {n("FirstHomeParagaph")}
            </div>
            <div className="mt-2 font-medium md:leading-8 max-md:max-w-full hidden md:block">
              {n("SecHomeParagaph")}
            </div>
          </div>
          {user?.id ? (
            ""
          ) : (
            <div className="flex gap-2 justify-start items-center mt-8 max-w-full font-bold text-base tracking-wide whitespace-nowrap">
              <Link
                href={`/${language}/register`}
                className={`flex overflow-hidden  justify-center items-center  px-11 py-2 rounded-[64px]  text-white bg-primary border-primary`}
              >
                {n("RegisterBtn")}
              </Link>
              <Link
                href={`/${language}/login`}
                className={`flex overflow-hidden  justify-center items-center  px-11 py-2 border border-solid rounded-[64px]  text-amber-500 border-amber-500`}
              >
                {n("LoginBtn")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewHero
