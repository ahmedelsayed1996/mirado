import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function HeadTittle({
  head,
  headLine,
  summary,
}: {
  head: string;
  headLine: string;
  summary: string;
}) {

  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations("newHome");

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    // check if text is cutting or no
    setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [summary]);

  return (
    <div className="flex items-center w-full max-md:max-w-full px-5 lg:px-10 xl:px-28 py-10 bg-neutral-50">
      <div className="flex flex-col self-stretch my-auto ">
        <div className="overflow-hidden px-3.5 max-w-full text-lg md:text-xl whitespace-nowrap border-amber-500 border-solid border-s-[5px] border-s-amber-500 text-zinc-900 ">
          {head}
        </div>
        <div className="flex flex-col mt-2 w-full max-md:max-w-full">
          <h2 className="text-xl md:text-3xl font-bold text-zinc-900 max-md:max-w-full">
            {headLine}
          </h2>
          <div
            ref={textRef}
            className={`mt-4 text-base font-medium tracking-normal lg:leading-7 text-zinc-500 transition-all duration-300 ${expanded ? "" : "line-clamp-2"
              }`}
          >
            {summary}
          </div>
          {isClamped && (
            <button
              onClick={() => setExpanded((s) => !s)}
              className="mt-1 text-blue-600 hover:underline text-sm self-start"
            >
              {expanded ? t("less") : t("more")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeadTittle;
