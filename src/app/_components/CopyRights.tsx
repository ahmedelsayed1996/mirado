import { useTranslations } from "next-intl";
import Link from "next/link"
import useCurrentLang from "../_hooks/useCurrentLang";

function CopyRights() {
     const f = useTranslations("footer");
     const language = useCurrentLang();
     const currentYear = new Date().getFullYear();
  return (
    <div className="col-span-6 sm:col-span-6 mt-9 mb-2 text-center">
                <span className="shrink-0 px-6 text-[#6C7278]">
                  {f("rightsSave")} {currentYear}
                  <Link
                    href={`/${language}/privacy-policy`}
                    className="text-primary mx-1"
                  >
                    {f("privacyPolicy")}
                  </Link> | <Link
                    href={`/${language}/terms-and-conditions`}
                    className="text-primary mx-1"
                  >
                    {f("termsConditions")}
                  </Link>

                </span>
              </div>
  )
}

export default CopyRights
