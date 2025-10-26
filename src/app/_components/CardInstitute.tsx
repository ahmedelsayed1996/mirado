import Image from "next/image";

function CardInstitute() {
  return (
    <>
      <div className="bg-white rounded-2xl border border-[#eee]">
        {/* img */}
        <div>
          <Image
            src="/images/bannerUNI.png"
            alt="banner"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export default CardInstitute;
