"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import useCurrentLang from '../_hooks/useCurrentLang';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

function NewFooter() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const t = useTranslations("footer");
  const language = useCurrentLang();
  const currentYear = new Date().getFullYear();


  const handleClickLang = () => {
    setShowLanguage(!showLanguage);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const raw = JSON.stringify({
    email: email,
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
      body: raw,
    });

    if (!response.ok) {
      const errorData = await response.json();
      setLoading(false);
      throw new Error(errorData.message || "Failed to subscribe");
    }

    const postsData = await response.json();
    setLoading(false);
    console.log(postsData);
    toast.success(t("SubscribedSuccessfully"));
    setEmail("");
  } catch (err: any) {
    setLoading(false);
    console.log(err.message);
    toast.error(err.message || "Failed to subscribe");
  }
};

  return (
    <div className="flex flex-col items-center px-5 lg:px-20 xl:px-28 pt-3 lg:pt-12 pb-7 w-full text-white bg-primary">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between pb-6 w-full border-b border-solid border-b-white  max-md:items-center flex-col lg:flex-row gap-2 max-sm:items-center"
      >
        <div className="flex lg:w-1/2 flex-col gap-3">
          <span className="text-base font-medium tracking-wide">
            {t("newsletter")}
          </span>
          <span className="text-2xl font-bold">{t("newsletterP")}</span>
        </div>

        <div className="flex lg:w-1/2 gap-5 items-center flex-row max-sm:gap-3">
          <div className="flex-1 md:flex-shrink">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@example.com"
              className="px-5 py-2 md:py-3 lg:py-4 text-base font-medium bg-white  rounded-[47px] text-neutral-700 outline-none w-full"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-28 md:w-44 text-base font-medium text-white bg-amber-500 hover:bg-amber-600 py-2 md:py-3 lg:py-4 rounded-[91px] transition-all duration-300"
          >
            {loading ? `${t("Sending")}` : `${t("Button")}`}
          </button>
        </div>
      </form>
      <div className="flex justify-between px-0 py-8 w-full max-md:flex-col max-md:gap-6 max-md:items-center max-sm:flex-col max-sm:gap-3 max-sm:items-center">
        <div className="flex flex-col gap-6 w-3/5 max-md:w-full max-sm:w-full">
          <Link
            href={`/${language}`}
            className="md:flex md:items-center md:gap-12 cursor-pointer"
          >
            <Image
              src="/logo-secoundry.svg"
              alt="logo"
              width={90}
              height={80}
            />
          </Link>
          <span className="text-base font-medium leading-normal text-justify">
            {t("paragraph")}
          </span>
        </div>
        <div className="flex flex-col gap-2.5 w-[30%] max-md:w-full max-sm:w-full">
          <span className="text-xl font-bold -ms-1">{t("UsefulLinks")}</span>
          <ul className="p-0 ms-5 list-disc">
            <li className=" text-base font-medium leading-7 text-white hover:text-amber-500 transition-colors duration-300  hover:translate-x-2">
              <Link href={`/${language}`}>{t("home")} </Link>
            </li>
            <li className="text-base font-medium leading-7 text-white hover:text-amber-500 transition-colors duration-300  hover:translate-x-2">
              <Link href={`/${language}/university`}>{t("Universities")} </Link>
            </li>
            <li className="text-base font-medium leading-7 text-white hover:text-amber-500 transition-colors duration-300  hover:translate-x-2">
              <Link href={`/${language}/language-schools`}>{t("institutes")} </Link>
            </li>
            <li className="text-base font-medium leading-7 text-white hover:text-amber-500 transition-colors duration-300  hover:translate-x-2">
              <Link href={`/${language}/about`}> {t("whoWeAre")}</Link>
            </li>
            <li className="text-base font-medium leading-7 text-white hover:text-amber-500 transition-colors duration-300  hover:translate-x-2">
              <Link href={`/${language}/contact`}>{t("contact")} </Link>
            </li>
            <li className="text-base font-medium leading-7 text-white hover:text-amber-500 transition-colors duration-300  hover:translate-x-2">
              <Link href={`/${language}/faq`}>{t("Faq")} </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center pt-6 w-full border-t border-solid border-t-white flex-col gap-2 lg:flex-row max-md:gap-6 max-md:items-center  max-sm:gap-3 max-sm:items-center text-sm md:text-base">
        {/* first section */}
        <div className="">
          <span className=" cursor-pointer transition hover:opacity-75">
            {t("rightsSave")} {currentYear}
          </span>
        </div>
        {/* second section */}
        <div className="flex justify-between">
          <Link
            href={`/${language}/privacy-policy`}
            className=" transition hover:opacity-75 border-e-[1px] px-3"
          >
            {t("privacyPolicy")}
          </Link>

          <Link
            href={`/${language}/terms-and-conditions`}
            className=" transition hover:opacity-75 border-e-[1px] px-3 "
          >
            {t("termsConditions")}
          </Link>
          <Link
            href={`/${language}/refund-policy`}
            className=" transition hover:opacity-75 px-3"
          >
            {t("refundPolicy")}
          </Link>
        </div>
        {/* third section */}
        <div className="flex items-center gap-5 justify-end">
          <div className="flex justify-center items-center p-1 w-8 h-8 bg-white rounded">
            <div>
              <Link href="https://www.facebook.com/eduxa.study/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.3715 18.627 0 12 0ZM15.102 11.9985L13.1355 12L13.134 19.2H10.4355V12H8.6355V9.519L10.4355 9.5175L10.4325 8.0565C10.4325 6.0315 10.9815 4.8 13.365 4.8H15.351V7.2825H14.109C13.1805 7.2825 13.1355 7.629 13.1355 8.2755L13.1325 9.5175H15.3645L15.102 11.9985Z" fill="#365D8D" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center p-1 w-8 h-8 bg-white rounded">
            <div>
              <Link href="https://www.linkedin.com/company/eduxa/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9966 0.480469C5.63416 0.480469 0.476562 5.63807 0.476562 12.0005C0.476562 18.3629 5.63416 23.5205 11.9966 23.5205C18.359 23.5205 23.5166 18.3629 23.5166 12.0005C23.5166 5.63807 18.359 0.480469 11.9966 0.480469ZM9.17656 16.7753H6.84376V9.26807H9.17656V16.7753ZM7.99576 8.34647C7.25896 8.34647 6.78256 7.82447 6.78256 7.17887C6.78256 6.52007 7.27336 6.01367 8.02576 6.01367C8.77816 6.01367 9.23896 6.52007 9.25336 7.17887C9.25336 7.82447 8.77816 8.34647 7.99576 8.34647ZM17.6966 16.7753H15.3638V12.6149C15.3638 11.6465 15.0254 10.9889 14.1818 10.9889C13.5374 10.9889 13.1546 11.4341 12.9854 11.8625C12.923 12.0149 12.9074 12.2309 12.9074 12.4457V16.7741H10.5734V11.6621C10.5734 10.7249 10.5434 9.94127 10.5122 9.26687H12.539L12.6458 10.3097H12.6926C12.9998 9.82007 13.7522 9.09767 15.011 9.09767C16.5458 9.09767 17.6966 10.1261 17.6966 12.3365V16.7753Z" fill="#365D8D" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center p-1 w-8 h-8 bg-white rounded">
            <div>
              <Link href="https://x.com/eduxaedu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12C24 12.3242 23.9875 12.6421 23.9564 12.96C23.7257 15.8774 22.4353 18.5143 20.4779 20.4779C18.3023 22.6535 15.3039 24 12 24C11.1086 24 10.2421 23.9003 9.41299 23.7132C8.82701 23.5886 8.26597 23.4203 7.7174 23.2083C3.21662 21.4753 0 17.093 0 12C0 8.70234 1.35273 5.69766 3.52208 3.52208C5.69766 1.34649 8.6961 0 12 0C15.3039 0 18.3023 1.34649 20.4779 3.52208C21.8369 4.88727 22.8779 6.57662 23.4639 8.45922C23.7195 9.28831 23.8878 10.1486 23.9564 11.04C23.9626 11.1023 23.9688 11.1709 23.9688 11.2332C23.9938 11.4888 24 11.7382 24 12Z" fill="#365D8D" />
                  <path d="M23.9991 11.9994C23.9991 12.3236 23.9866 12.6415 23.9555 12.9594C23.7248 15.8768 22.4344 18.5137 20.477 20.4774C18.3014 22.653 15.303 23.9994 11.9991 23.9994C11.1077 23.9994 10.2412 23.8997 9.41209 23.7127L5.05469 19.1496L10.4095 12.9345L5.13573 5.26074H9.70508L13.6199 9.20048L17.0048 5.26074H18.8999L23.7685 10.4722C23.8433 10.7215 23.9118 10.9771 23.9679 11.2327C23.9929 11.4883 23.9991 11.7376 23.9991 11.9994Z" fill="#365D8D" />
                  <path d="M19.2506 19.1492H14.6812L11.2526 14.156L6.95757 19.1492H5.0625L10.4111 12.9341L5.14354 5.2666H9.71289L12.9544 9.98556L17.0126 5.2666H18.9077L13.796 11.2074L19.2568 19.1492H19.2506ZM14.9804 18.5819H18.1783L13.0791 11.1637L17.6734 5.82141H17.2682L12.8983 10.9019L9.40744 5.82141H6.20951L11.1217 12.9653L6.29055 18.5819H6.69575L11.3025 13.2271L14.9804 18.5819ZM17.6796 18.3201H15.2235L6.69575 6.12686H9.15185L17.6796 18.3201ZM15.5165 17.7591H16.595L8.85886 6.69413H7.78042L15.5165 17.7591Z" fill="white" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center p-1 w-8 h-8 bg-white rounded">
            <div>
              <Link href="https://www.instagram.com/eduxa.study/">
                <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 16C32 16.4322 31.9834 16.8561 31.9418 17.28C31.6343 21.1699 29.9138 24.6857 27.3039 27.3039C24.4031 30.2047 20.4052 32 16 32C14.8114 32 13.6561 31.867 12.5506 31.6177C11.7694 31.4514 11.0213 31.227 10.2899 30.9444C4.28883 28.6338 0 22.7906 0 16C0 11.6031 1.80364 7.59688 4.6961 4.6961C7.59688 1.79532 11.5948 0 16 0C20.4052 0 24.4031 1.79532 27.3039 4.6961C29.1158 6.51636 30.5039 8.76883 31.2852 11.279C31.626 12.3844 31.8504 13.5314 31.9418 14.72C31.9501 14.8031 31.9584 14.8945 31.9584 14.9777C31.9917 15.3184 32 15.6509 32 16Z" fill="#365D8D" />
                  <path d="M32.0001 16.0006C32.0001 16.4328 31.9834 16.8567 31.9419 17.2806C31.6344 21.1704 29.9138 24.6863 27.304 27.3045C24.4032 30.2052 20.4053 32.0006 16.0001 32.0006C14.8115 32.0006 13.6562 31.8676 12.5507 31.6182L6.74084 25.5341L13.8806 17.2473L6.8489 7.01562H12.9414L18.1611 12.2686L22.6744 7.01562H25.2011L31.6925 13.9642C31.7923 14.2967 31.8837 14.6374 31.9585 14.9782C31.9918 15.319 32.0001 15.6515 32.0001 16.0006Z" fill="#365D8D" />
                  <g clipPath="url(#clip0_345_766)">
                    <path d="M12.9206 16.2755C12.9206 14.5721 14.3011 13.1908 16.0046 13.1908C17.708 13.1908 19.0892 14.5721 19.0892 16.2755C19.0892 17.9789 17.708 19.3602 16.0046 19.3602C14.3011 19.3602 12.9206 17.9789 12.9206 16.2755ZM11.2531 16.2755C11.2531 18.8998 13.3803 21.027 16.0046 21.027C18.6288 21.027 20.756 18.8998 20.756 16.2755C20.756 13.6512 18.6288 11.524 16.0046 11.524C13.3803 11.524 11.2531 13.6512 11.2531 16.2755ZM19.8337 11.3356C19.8337 11.9485 20.3307 12.4463 20.9444 12.4463C21.5573 12.4463 22.0551 11.9485 22.0551 11.3356C22.0551 10.7227 21.558 10.2257 20.9444 10.2257C20.3307 10.2257 19.8337 10.7227 19.8337 11.3356ZM12.2658 23.8075C11.3637 23.7664 10.8734 23.6161 10.5475 23.4891C10.1155 23.3209 9.80751 23.1206 9.48312 22.7969C9.15948 22.4733 8.95842 22.1653 8.79099 21.7333C8.66393 21.4074 8.51369 20.9171 8.47258 20.0149C8.42773 19.0395 8.41876 18.7465 8.41876 16.2755C8.41876 13.8044 8.42848 13.5122 8.47258 12.536C8.51369 11.6339 8.66467 11.1443 8.79099 10.8177C8.95916 10.3856 9.15948 10.0777 9.48312 9.75331C9.80676 9.42967 10.1147 9.2286 10.5475 9.06118C10.8734 8.93411 11.3637 8.78388 12.2658 8.74277C13.2413 8.69792 13.5343 8.68895 16.0046 8.68895C18.4756 8.68895 18.7678 8.69867 19.744 8.74277C20.6462 8.78388 21.1357 8.93486 21.4624 9.06118C21.8944 9.2286 22.2023 9.42967 22.5267 9.75331C22.8504 10.077 23.0507 10.3856 23.2189 10.8177C23.3459 11.1436 23.4962 11.6339 23.5373 12.536C23.5821 13.5122 23.5911 13.8044 23.5911 16.2755C23.5911 18.7458 23.5821 19.0388 23.5373 20.0149C23.4962 20.9171 23.3452 21.4074 23.2189 21.7333C23.0507 22.1653 22.8504 22.4733 22.5267 22.7969C22.2031 23.1206 21.8944 23.3209 21.4624 23.4891C21.1365 23.6161 20.6462 23.7664 19.744 23.8075C18.7686 23.8523 18.4756 23.8613 16.0046 23.8613C13.5343 23.8613 13.2413 23.8523 12.2658 23.8075ZM12.1896 7.07821C11.2045 7.12306 10.5318 7.27928 9.94355 7.50799C9.33513 7.74418 8.81939 8.0611 8.30441 8.57534C7.79017 9.08958 7.47325 9.60532 7.23706 10.2145C7.00834 10.8027 6.85213 11.4754 6.80728 12.4605C6.76168 13.4472 6.75122 13.7626 6.75122 16.2755C6.75122 18.7884 6.76168 19.1038 6.80728 20.0904C6.85213 21.0756 7.00834 21.7483 7.23706 22.3365C7.47325 22.9449 7.78942 23.4614 8.30441 23.9756C8.81865 24.4899 9.33438 24.806 9.94355 25.043C10.5325 25.2717 11.2045 25.4279 12.1896 25.4728C13.177 25.5176 13.4917 25.5288 16.0046 25.5288C18.5182 25.5288 18.8329 25.5184 19.8195 25.4728C20.8046 25.4279 21.4773 25.2717 22.0656 25.043C22.674 24.806 23.1897 24.4899 23.7047 23.9756C24.2189 23.4614 24.5351 22.9449 24.772 22.3365C25.0008 21.7483 25.1577 21.0756 25.2018 20.0904C25.2467 19.1031 25.2571 18.7884 25.2571 16.2755C25.2571 13.7626 25.2467 13.4472 25.2018 12.4605C25.157 11.4754 25.0008 10.8027 24.772 10.2145C24.5351 9.60606 24.2189 9.09033 23.7047 8.57534C23.1905 8.0611 22.674 7.74418 22.0663 7.50799C21.4773 7.27928 20.8046 7.12231 19.8202 7.07821C18.8336 7.03337 18.5182 7.02216 16.0053 7.02216C13.4917 7.02216 13.177 7.03262 12.1896 7.07821Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_345_766">
                      <rect width="18.5067" height="18.5067" fill="white" transform="translate(6.75122 7.02344)" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
          <div className="w-px bg-white h-[34px]" />
          <div
            x-data="{ isActive: false }"
            className="items-center  relative"
          >
            <div
              x-data="{ isActive: false }"
              className="items-center relative"
            >
              {/* popup language */}
              <div className="inline-flex items-center overflow-hidden rounded-md  bg-white">
                <button
                  onClick={handleClickLang}
                  className=" text-black bg-secondColor hover:bg-gray-50 hover:text-gray-700 flex justify-center items-center py-1 px-1"
                >
                  {language === "en" ? <Image
                    src="/images/uk.png"
                    // src="/images/us.svg"
                    alt="EN flag"
                    width={32}
                    height={32}
                    className="rounded-l md:mx-2"
                  /> : <Image
                    src="https://api.eduxa.com/upload/ar.png"
                    alt="AR flag"
                    width={32}
                    height={32}
                    className="rounded-full md:mx-2"
                  />}
                  {language === "en" ? "English" : "Arabic"}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="absolute -top-[108px] mt-2 w-24 rounded-md border-gray-100 bg-white shadow-lg z-50"
                role="menu"
                x-show="isActive"
              >
                {showLanguage ? (
                  <div className="p-2 ">
                    <div className="flex justify-start items-center">
                      <Link
                        href={`/ar/${window.location.pathname.slice(4)}`}
                        className="rounded-lg px-1 pe-2 py-2 text-sm text-black hover:bg-gray flex items-center"
                      >
                        <Image
                          src="https://api.eduxa.com/upload/ar.png"
                          alt="AR flag"
                          width={32}
                          height={32}
                          className="rounded-full mx-2"
                        />
                        AR
                      </Link>
                    </div>
                    <div className="flex justify-start items-center">
                      <Link
                        href={`/en/${window.location.pathname.slice(4)}`}
                        className="  rounded-lg px-1 pe-2 py-2 text-sm text-black hover:bg-gray flex items-center"
                      >
                        <Image
                          src="/images/uk.png"
                          alt="EN flag"
                          width={32}
                          height={32}
                          className="rounded-full mx-2"
                        />
                        EN
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFooter
