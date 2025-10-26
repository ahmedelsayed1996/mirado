"use client"
import BannerSection from "@/app/_components/BannerSection";
import Spinner from "@/app/_components/Spinner";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
// import ToggleMap from "./ToggleMap";

const Contact = () => {


  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const ContactTR = useTranslations("contactUs");
  const currentLang = useCurrentLang();


  const handleContactForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors(null);
    console.log(currentLang);
    const DataForm = {
      name: fullName,
      email: email,
      phone_number: `${phoneNumber}`,
      country: country,
      message: message,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": currentLang,
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/contact-us`,
        {
          ...options,
          body: JSON.stringify(DataForm),
        }
      );

      const result = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        console.error("Server error:", result.message);
        setErrors(ContactTR("failed"));
        toast.error(ContactTR("failed"));
        return;
      }

      toast.success(ContactTR("success"));
      setFullName("");
      setEmail("");
      setCountry("");
      setPhoneNumber("");
      setMessage("");
    } catch (error) {
      setErrors(ContactTR("failed"));
      toast.error(ContactTR("failed"));
    }
  };

// 


  return (
    <section className="px-5 lg:px-16 xl:px-28 grid grid-cols-1   rounded-lg  pb-12 bg-neutral-50 ">
      <div className="wrapper-form px-2 py-14 lg:px-10 bg-white rounded-3xl  ">
        <span className="text-lg flex items-center text-[clam[(.8rem,2vw,3rem)]] gap-2">
          <svg
            width="25"
            height="30"
            viewBox="0 0 13 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_5122_5572)">
              <path
                d="M9.09529 14.0138C8.90034 14.0766 8.70182 14.1342 8.49819 14.1868C8.45991 14.9145 8.26139 15.482 7.90262 15.8918C7.49894 16.3517 6.92021 16.5808 6.16542 16.5808C5.41062 16.5808 4.83547 16.3542 4.4374 15.8995C4.13375 15.5525 3.94544 15.0835 3.87399 14.494C3.73926 14.4762 3.60861 14.4542 3.48205 14.4312C3.46674 14.4287 3.45143 14.4261 3.43714 14.4236C3.11817 14.3624 2.8186 14.2863 2.54302 14.1955C2.34807 14.1327 2.16536 14.0623 1.99593 13.9852C1.80353 13.8995 1.62849 13.8045 1.46926 13.702V13.8071C1.46926 15.3254 1.87039 16.4808 2.67111 17.2708C3.47184 18.0613 4.63644 18.4568 6.16593 18.4568C7.69542 18.4568 8.86359 18.0582 9.66942 17.2631C10.4752 16.4675 10.8789 15.3146 10.8789 13.8071V13.2126C10.391 13.5121 9.80517 13.7775 9.15347 13.9939C9.13407 14.0015 9.11366 14.0066 9.0958 14.0133L9.09529 14.0138ZM10.5533 7.6381C10.3354 7.42018 10.0461 7.3125 9.68473 7.3125C9.32341 7.3125 9.0366 7.42018 8.82379 7.6381C8.61251 7.85448 8.50584 8.14436 8.50584 8.50517V13.6111C8.56708 13.5943 8.6273 13.5764 8.68752 13.5575C8.91156 13.4871 9.12693 13.4116 9.33311 13.3284C9.38159 13.3105 9.42905 13.2911 9.47651 13.2707C10.0195 13.0441 10.4952 12.7762 10.8779 12.4828V8.50517C10.8779 8.14385 10.7692 7.85448 10.5523 7.6381H10.5533ZM2.30316 13.504C2.59252 13.6321 2.92067 13.7408 3.27791 13.827C3.28965 13.8296 3.30241 13.8336 3.31363 13.8362C3.43765 13.8658 3.56472 13.8913 3.69435 13.9143C3.74283 13.9235 3.79182 13.9321 3.84031 13.9398V8.50568C3.84031 8.14436 3.73517 7.85499 3.52236 7.63861C3.31108 7.42069 3.02427 7.31301 2.66295 7.31301C2.30163 7.31301 2.01226 7.42069 1.79435 7.63861C1.57796 7.85499 1.46875 8.14487 1.46875 8.50568V12.9921C1.58 13.0906 1.70708 13.1814 1.84691 13.2677C1.98675 13.3524 2.13883 13.4315 2.30316 13.5045V13.504Z"
                fill="url(#paint0_linear_5122_5572)"
              />
              <path
                d="M1.8125 5.41602C3.4854 6.2887 5.01642 7.61508 6.17388 9.0966C7.33133 7.61559 8.86235 6.28921 10.5353 5.41602C8.92615 5.64465 7.42881 6.27441 6.17388 7.22313C4.91844 6.2739 3.42161 5.64414 1.8125 5.41602Z"
                fill="url(#paint1_linear_5122_5572)"
              />
              <path
                opacity="0.7"
                d="M6.17188 9.0966C7.32933 7.61559 8.86035 6.28921 10.5332 5.41602C8.99763 6.06874 7.53193 6.96541 6.17188 8.23106V9.0966Z"
                fill="url(#paint2_radial_5122_5572)"
              />
              <path
                opacity="0.7"
                d="M6.17388 9.0966V8.23106C4.81382 6.96541 3.34812 6.06874 1.8125 5.41602C3.4854 6.2887 5.01642 7.61508 6.17388 9.0966Z"
                fill="url(#paint3_radial_5122_5572)"
              />
              <path
                d="M6.17035 2.9082C5.30379 2.9082 4.60156 3.61043 4.60156 4.47699C4.60156 5.34355 5.30379 6.04578 6.17035 6.04578C7.03691 6.04578 7.73914 5.34355 7.73914 4.47699C7.73914 3.61043 7.03691 2.9082 6.17035 2.9082Z"
                fill="url(#paint4_linear_5122_5572)"
              />
              <path
                d="M6.1719 3.21094C5.47273 3.21094 4.90625 3.77742 4.90625 4.47658C4.90625 5.17575 5.47273 4.07086 6.1719 4.07086C6.87106 4.07086 7.43754 5.17575 7.43754 4.47658C7.43754 3.77742 6.87106 3.21094 6.1719 3.21094Z"
                fill="url(#paint5_linear_5122_5572)"
              />
              <path
                d="M9.35618 1.63666L6.53858 0.102579C6.28749 -0.0341929 6.00732 -0.0341929 5.75623 0.102579L2.93864 1.63666C2.74267 1.74333 2.75185 2.02912 2.95395 2.12353L4.24154 2.72216L4.57836 1.7816V3.27282C4.95346 2.78544 5.52964 2.49965 6.14715 2.49965C6.76466 2.49965 7.34135 2.78544 7.71594 3.27282V1.7816L8.05276 2.72216L9.34035 2.12353C9.54245 2.02963 9.55164 1.74384 9.35567 1.63666H9.35618Z"
                fill="url(#paint6_radial_5122_5572)"
              />
              <path
                d="M12.3258 11.1492C12.3401 11.0819 12.3488 11.0155 12.3529 10.9476C12.3947 10.2663 11.9298 9.68046 11.1219 9.25586C11.3812 9.45132 11.5782 9.6723 11.7007 9.91471C11.8104 10.127 11.8609 10.3556 11.8461 10.5975C11.8441 10.6226 11.842 10.6481 11.8395 10.6736C11.8344 10.7149 11.8277 10.7558 11.8186 10.7966C11.7736 11.016 11.6762 11.2319 11.5323 11.4411C11.4516 11.5606 11.3552 11.6779 11.2449 11.7923C11.1546 11.8856 11.0541 11.978 10.9464 12.0678C10.5417 12.4036 10.0176 12.7098 9.40821 12.9645C9.36075 12.9844 9.31329 13.0033 9.26429 13.0222C9.05863 13.1049 8.84275 13.1809 8.61973 13.2508C8.23238 13.3728 7.82156 13.4748 7.39287 13.5545C7.19946 13.5912 7.00195 13.6228 6.80139 13.6494C6.59215 13.678 6.37985 13.6994 6.1655 13.7162C5.55769 13.7632 4.97743 13.7606 4.43647 13.7142C4.37472 13.7086 4.31297 13.703 4.25223 13.6963C4.03636 13.6734 3.82712 13.6438 3.62605 13.6075C3.49591 13.5846 3.36934 13.5585 3.24533 13.5295C3.23308 13.5264 3.22032 13.5233 3.20859 13.5203C2.85084 13.434 2.52371 13.3253 2.23486 13.1972C2.07053 13.1242 1.91742 13.0451 1.77759 12.9594C1.15344 12.5772 0.794163 12.076 0.806922 11.5024C0.806922 11.4855 0.806922 11.4687 0.808453 11.4513C0.814066 11.3651 0.827335 11.2783 0.848259 11.1931C0.850811 11.1819 0.853874 11.1717 0.856936 11.1605C0.865611 11.1263 0.875817 11.0931 0.888066 11.0589C0.950838 10.8777 1.04933 10.6991 1.17947 10.5251C0.827845 10.8614 0.590027 11.2217 0.494593 11.5907C0.471628 11.6825 0.456317 11.7749 0.451214 11.8683C0.450193 11.8836 0.450193 11.8999 0.449683 11.9158C0.442538 12.1898 0.518069 12.4475 0.664027 12.6848C0.905418 13.0783 1.34227 13.4167 1.92661 13.6785C2.09655 13.7555 2.27926 13.8265 2.4737 13.8892C2.74979 13.9796 3.04936 14.0556 3.36781 14.1163C3.3821 14.1194 3.39741 14.122 3.41272 14.1245C3.57858 14.1551 3.74955 14.1817 3.92562 14.2036C4.20222 14.2388 4.49158 14.2628 4.78962 14.2751C4.83862 14.2776 4.88761 14.2786 4.93711 14.2802H4.93813C5.35253 14.2924 5.7853 14.2827 6.23032 14.248C6.41506 14.2342 6.59725 14.2159 6.77791 14.1934C6.82691 14.1878 6.87488 14.1822 6.92336 14.1755C6.92897 14.1745 6.93561 14.174 6.94122 14.173C7.424 14.1082 7.89046 14.0173 8.33394 13.9056C8.57176 13.8448 8.80244 13.7785 9.02546 13.7065C9.04434 13.7004 9.06424 13.6943 9.08312 13.6872C9.81036 13.4463 10.4524 13.1441 10.9714 12.8027C11.0525 12.7486 11.1316 12.6945 11.2067 12.6384C11.5573 12.3802 11.8379 12.1015 12.0344 11.8116C12.1804 11.5953 12.2794 11.3728 12.3253 11.1482"
                fill="url(#paint7_radial_5122_5572)"
              />
              <path
                d="M21.9762 17.2945C21.9762 17.594 21.8599 17.8553 21.6277 18.0773C21.395 18.2998 21.1291 18.4106 20.8295 18.4106C20.5299 18.4106 20.2559 18.2815 20.039 18.0232L17.1249 14.458L14.1798 18.0232C13.9521 18.2815 13.6888 18.4106 13.3892 18.4106C13.0897 18.4106 12.8391 18.2998 12.6064 18.0773C12.3737 17.8553 12.2578 17.5945 12.2578 17.2945C12.2578 17.0362 12.3507 16.7984 12.537 16.5815L15.7144 12.7994L12.6452 9.12594C12.4487 8.89884 12.3507 8.66102 12.3507 8.41299C12.3507 8.11342 12.4671 7.85264 12.6993 7.63013C12.932 7.40813 13.1928 7.29688 13.4821 7.29688C13.7919 7.29688 14.0608 7.4311 14.288 7.70004L17.1244 11.1255L19.9298 7.70004C20.1569 7.43161 20.4258 7.29688 20.7356 7.29688C21.025 7.29688 21.2857 7.40813 21.5185 7.63013C21.7512 7.85264 21.867 8.11342 21.867 8.41299C21.867 8.67122 21.7741 8.90904 21.5879 9.12594L18.5187 12.7994L21.6808 16.5815C21.8767 16.8091 21.9752 17.0464 21.9752 17.2945H21.9762Z"
                fill="url(#paint8_linear_5122_5572)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_5122_5572"
                x1="9.07947"
                y1="6.745"
                x2="2.86147"
                y2="17.5152"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4C6E99" />
                <stop offset="1" stop-color="#1F4A80" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_5122_5572"
                x1="8.35456"
                y1="3.23533"
                x2="3.99319"
                y2="7.5967"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FBC27A" />
                <stop offset="1" stop-color="#F89A21" />
              </linearGradient>
              <radialGradient
                id="paint2_radial_5122_5572"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(3.12565 8.8598) scale(9.51582)"
              >
                <stop stop-color="white" />
                <stop offset="0.5" stop-color="#FBC27A" />
                <stop offset="1" stop-color="#F89A21" />
              </radialGradient>
              <radialGradient
                id="paint3_radial_5122_5572"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(5.36958 5.7855) scale(4.51754)"
              >
                <stop stop-color="white" />
                <stop offset="0.5" stop-color="#FBC27A" />
                <stop offset="1" stop-color="#F89A21" />
              </radialGradient>
              <linearGradient
                id="paint4_linear_5122_5572"
                x1="7.27932"
                y1="3.36802"
                x2="5.06087"
                y2="5.58647"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FBC27A" />
                <stop offset="1" stop-color="#F89A21" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_5122_5572"
                x1="6.1719"
                y1="1.23796"
                x2="6.1719"
                y2="4.92211"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FEEBD3" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
              <radialGradient
                id="paint6_radial_5122_5572"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(6.20788 -3.30956) scale(9.99962 9.99962)"
              >
                <stop stop-color="white" />
                <stop offset="0.03" stop-color="#EDF1F5" />
                <stop offset="0.12" stop-color="#B4C2D4" />
                <stop offset="0.2" stop-color="#879EBA" />
                <stop offset="0.28" stop-color="#6683A8" />
                <stop offset="0.34" stop-color="#53739D" />
                <stop offset="0.38" stop-color="#4C6E99" />
                <stop offset="0.67" stop-color="#1F4A80" />
              </radialGradient>
              <radialGradient
                id="paint7_radial_5122_5572"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(6.40281 11.7713) scale(4.56959)"
              >
                <stop stop-color="white" />
                <stop offset="0.5" stop-color="#FBC27A" />
                <stop offset="1" stop-color="#F89A21" />
              </radialGradient>
              <linearGradient
                id="paint8_linear_5122_5572"
                x1="20.534"
                y1="7.01568"
                x2="13.7424"
                y2="18.779"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4C6E99" />
                <stop offset="1" stop-color="#1F4A80" />
              </linearGradient>
              <clipPath id="clip0_5122_5572">
                <rect width="12.2941" height="19" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {ContactTR("breadcrumb2")}
        </span>

        <h2 className="text-[clamp(1rem,3vw,1.5rem)] font-bold my-7 capitalize">
          {ContactTR("subHeading")}
        </h2>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleContactForm}>
          {/* Full Name & Number Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[clamp(0.9rem,2vw,1rem)]"
              >
                {ContactTR("formaName")}
              </label>
              <input
                className="w-full border-2 border-zinc-300 outline-none rounded-md my-2 px-2 py-1 "
                type="text"
                placeholder={`${ContactTR("formaName")}`}
                id="fullName"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="PhoneNumber"
                className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[clamp(0.9rem,2vw,1rem)]"
              >
                {ContactTR("formPhone")}
              </label>
              <input
                className="w-full border-2 border-zinc-300 outline-none rounded-md my-2 px-2 py-1 "
                type="text"
                placeholder="+888-8667 3333"
                required
                name="phoneNumber"
                id="PhoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[clamp(0.9rem,2vw,1rem)]"
            >
              {ContactTR("formEmail")}
            </label>
            <input
              className="w-full border-2 border-zinc-300 outline-none rounded-md my-2 px-2 py-1 "
              type="email"
              placeholder="Example@Example.com"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Country */}
          <div>
            <label
              htmlFor="email"
              className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[clamp(0.9rem,2vw,1rem)]"
            >
              {ContactTR("formCountry")}
            </label>
            <input
              className="w-full border-2 border-zinc-300 outline-none rounded-md my-2 px-2 py-1 "
              type="text"
              placeholder={`${ContactTR("formCountry")}`}
              name="country"
              id="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          {/* Message */}
          <div>
            <label htmlFor="yourMessage">{ContactTR("formMessage")}</label>
            <textarea
              className="w-full border-2 border-zinc-300 outline-none rounded-md my-2 px-2 py-2 "
              name="yourMessage"
              id="yourMessage"
              placeholder={`${ContactTR("formMessage")}`}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {errors && (
            <p className="text-red-500 text-[clamp(.8rem,1.1vw,3rem)] font-semibold text-center capitalize">
              {errors}
            </p>
          )}

          {isLoading && <Spinner />}
          {!isLoading && (
            <button
              type="submit"
              className="bg-amber-500 text-white text-[clamp(.9rem,1vw,2rem)] py-2 px-2 md:px-4 w-fit rounded-full hover:bg-amber-600 transition-colors duration-300 "
            >
              {ContactTR("send")}
            </button>
          )}
        </form>
      </div>
      {/* toggel section */}
      {/* <ToggleMap/> */}
      {/* map section 
      <div className="wrapper-Maping px-2 bg-white ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.6299460873106!2d31.296567800000002!3d29.961321099999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458470c3c47b0d5%3A0x8d2348071bef6493!2sSindibad%20Study%20Abroad!5e0!3m2!1sen!2seg!4v1754222710688!5m2!1sen!2seg"
          width="100%"
          height="100%"
          className=" rounded-e-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps location of Holiday Inn & Suites Cairo Maadi"
        ></iframe>
      </div>
      */}
    </section>
  );
}

export default Contact
