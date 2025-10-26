import React from "react";
import { useTranslations } from "next-intl";
function Spinner() {
          const t = useTranslations("Spinner");

    return (
      <button
        type="button"
        className="items-center justify-center flex gap-2 rounded-3xl bg-white text-primary px-5 py-2.5 text-sm tx-start font-medium shadow border border-primary transition ease-in-out delay-150 w-full text-nowrap"
        disabled
      >
        {t("massage")}
        <svg
          className="animate-ping h-3 w-3 mr-1 rounded-full bg-primary"
          viewBox="0 0 24 24"
        ></svg>
      </button>
    );
}

export default Spinner;