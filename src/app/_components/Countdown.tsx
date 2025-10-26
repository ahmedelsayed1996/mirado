"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  // مدة العرض
  const targetDate = new Date("2025-09-30T23:59:59").getTime();
  const t = useTranslations("Countdown");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-[#F89A21] text-white text-center py-0 shadow-lg sticky top-0 z-10 h-11">
      {isExpired ? (
        <p className="text-sm md:text-base font-semibold">{t("expired")}</p>
      ) : (
        <div className="flex flex-row justify-center gap-2 xl:gap-40 pt-px md:pt-1 items-center">
          <p className="text-sm md:text-base font-semibold w-1/2">{t("head")}
            <span> </span>
          </p>
          <div className="flex justify-center gap-2 md:gap-4 text-lg font-bold w-2/3">
            <div
              className=" bg-white text-blue-700 rounded-lg  shadow flex items-center justify-center  w-8 h-8  sm:w-12sm:h-10 text-sm md:text-base md:w-12 md:h-8 ">
              {timeLeft.days}

              {t("days")}
            </div>
            <div
              className="bg-white text-blue-700  rounded-lg shadow flex items-center justify-center w-8 h-8  sm:w-12 sm:h-10 text-sm md:text-base md:w-12 md:h-8 ">
              {timeLeft.hours}

              {t("hours")}
            </div>
            <div
              className="bg-white text-blue-700  rounded-lg shadow flex items-center justify-center w-8 h-8 sm:w-12 sm:h-10 text-sm md:text-base md:w-12 md:h-8 ">
              {timeLeft.minutes}

              {t("minutes")}
            </div>
            <div
              className="bg-white text-blue-700  rounded-lg shadow flex items-center justify-center w-8 h-8 sm:w-12 sm:h-10 text-sm md:text-base md:w-12 md:h-8 "
            >
              {timeLeft.seconds}

              {t("seconds")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
