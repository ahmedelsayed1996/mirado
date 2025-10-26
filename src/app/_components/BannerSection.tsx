import { useTranslations } from "next-intl";
import Image from "next/image";

function BannerSection({
  head,
  breadcrumb,
  urlImage,
}: {
  head: string;
  breadcrumb: string;
  urlImage: string;
}) {
  const u = useTranslations("Universities"); 
  return (
    <>
      <section className={`relative h-[200px] xl:h-[285px]`}>
        {/* Image */}
        <div>
          <Image
            src={urlImage}
            alt={`banner ${head}`}
            fill
            sizes="80vw"
            style={{
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </div>
        {/* Heading  */}
        <div className="flex justify-start items-center w-full py-2 px-3 md:px-7 rounded-lg translate-y-10 translate h-[140px] xl:h-[205px] ps-5 lg:ps-10 xl:ps-28">
        {/* <div className="py-2 px-3 md:px-7 rounded-lg w-fit translate-y-10 translate ms-5 lg:ms-10 xl:ms-28"> */}
        {/* <div className="bg-white py-2 px-3 md:px-7 rounded-lg text-black w-40 md:w-48 lg:w-72 translate-y-10 translate-x-9  "> */}
        {/* <div className="bg-white py-2 px-3 md:px-7 rounded-sm text-black absolute top-1/2 -translate-y-1/2 start-[65px] sm:start-[192px] "> */}
          <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] text-white font-extrabold -tracking-tighter text-balance">
            {head}
          </h1>
          {/* <p className="text-[clamp(.9rem,1.2vw,2rem)] font-medium bg-white py-2 px-3 md:px-7 rounded-sm ">
            <span className="text-zinc-800">{u("head")} / </span>
            <span className="text-neutral-400">{breadcrumb}</span>
          </p> */}
        </div>
      </section>
    </>
  );
}

export default BannerSection;
