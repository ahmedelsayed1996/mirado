import Image from "next/image";
import React from "react";

function Testimonial() {
  return (
    <div className="flex justify-center overflow-x-auto relative gap-5 mt-14 mb-5 max-md:flex-wrap max-md:mt-10">

      <div className="flex flex-col justify-center pt-3.5 pb-5 bg-[#28568D] rounded-2xl  shadow-2xl  max-w-[359px]">
        <div className="flex flex-col items-start px-5 w-full">
          <div className="flex gap-5 justify-between self-stretch text-7xl font-semibold tracking-tighter whitespace-nowrap text-slate-500">
            <Image
              loading="lazy"
              src="/images/customer.png"
              alt="review custom"
              width={70}
              height={53}
            />
            <div className="">
              <Image
                src="/icons/quotations.svg"
                alt="quotations"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="mt-4 text-xl font-medium  text-white">
          Rasco Jamal
          </div>
          <div className="flex gap-2.5 text-base  text-[#A0C2EB]">
            <Image
              src="/icons/graduation.svg"
              width={20}
              height={20}
              alt="graduation"
            />
            <div>Educated at the University of Ulster</div>
          </div>
        </div>
        <div className="flex flex-col px-5 mt-4 w-full">
          <div className="text-lg tracking-wide  text-[#A0C2EB]  text-ellipsis">
          This text is an example of text that can be replaced in the same space, this text was generated from the text generator application.
          </div>
          <div className="flex gap-1.5 self-end mt-4">
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center pt-3.5 pb-5 bg-[#28568D] rounded-2xl  shadow-2xl  max-w-[359px]">
        <div className="flex flex-col items-start px-5 w-full">
          <div className="flex gap-5 justify-between self-stretch text-7xl font-semibold tracking-tighter whitespace-nowrap text-slate-500">
            <Image
              loading="lazy"
              src="/images/customer.png"
              alt="review custom"
              width={70}
              height={53}
            />
            <div className="">
              <Image
                src="/icons/quotations.svg"
                alt="quotations"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="mt-4 text-xl font-medium  text-white">
          Rasco Jamal
          </div>
          <div className="flex gap-2.5 text-base  text-[#A0C2EB]">
            <Image
              src="/icons/graduation.svg"
              width={20}
              height={20}
              alt="graduation"
            />
            <div>Educated at the University of Ulster</div>
          </div>
        </div>
        <div className="flex flex-col px-5 mt-4 w-full">
          <div className="text-base tracking-wide  text-[#A0C2EB]  text-ellipsis">
          This text is an example of text that can be replaced in the same space, this text was generated from the text generator application.
          </div>
          <div className="flex gap-1.5 self-end mt-4">
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center pt-3.5 pb-5 bg-[#28568D] rounded-2xl  shadow-2xl  max-w-[359px]">
        <div className="flex flex-col items-start px-5 w-full">
          <div className="flex gap-5 justify-between self-stretch text-7xl font-semibold tracking-tighter whitespace-nowrap text-slate-500">
            <Image
              loading="lazy"
              src="/images/customer.png"
              alt="review custom"
              width={70}
              height={53}
            />
            <div className="">
              <Image
                src="/icons/quotations.svg"
                alt="quotations"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="mt-4 text-xl font-medium  text-white">
          Rasco Jamal
          </div>
          <div className="flex gap-2.5 text-base  text-[#A0C2EB]">
            <Image
              src="/icons/graduation.svg"
              width={20}
              height={20}
              alt="graduation"
            />
            <div>Educated at the University of Ulster</div>
          </div>
        </div>
        <div className="flex flex-col px-5 mt-4 w-full">
          <div className="text-base tracking-wide  text-[#A0C2EB]  text-ellipsis">
          This text is an example of text that can be replaced in the same space, this text was generated from the text generator application.
          </div>
          <div className="flex gap-1.5 self-end mt-4">
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-center pt-3.5 pb-5 bg-[#28568D] rounded-2xl  shadow-2xl  max-w-[359px]">
        <div className="flex flex-col items-start px-5 w-full">
          <div className="flex gap-5 justify-between self-stretch text-7xl font-semibold tracking-tighter whitespace-nowrap text-slate-500">
            <Image
              loading="lazy"
              src="/images/customer.png"
              alt="review custom"
              width={70}
              height={53}
            />
            <div className="">
              <Image
                src="/icons/quotations.svg"
                alt="quotations"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="mt-4 text-xl font-medium  text-white">
            راسكو جمال
          </div>
          <div className="flex gap-2.5 text-base  text-[#A0C2EB]">
            <Image
              src="/icons/graduation.svg"
              width={20}
              height={20}
              alt="graduation"
            />
            <div>متعلم في جامعة أولستر</div>
          </div>
        </div>
        <div className="flex flex-col px-5 mt-4 w-full">
          <div className="text-base tracking-wide  text-[#A0C2EB]  text-ellipsis">
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النالنصوص التطبيق.
          </div>
          <div className="flex gap-1.5 self-end mt-4">
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
            <Image
              src="/icons/fill-star.svg"
              width={20}
              height={20}
              alt="star"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Testimonial;
