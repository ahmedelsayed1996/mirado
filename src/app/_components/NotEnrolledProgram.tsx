import React from 'react'
import Link from "next/link";
import Image from "next/image";
import useCurrentLang from '../_hooks/useCurrentLang';

function NotEnrolledProgram() {
  const language = useCurrentLang();
  return (
    <div className="flex justify-center items-center px-16  bg-secondColor bg-opacity-80 max-md:px-5  ">
      <div className="flex flex-col justify-center p-8 my-36 max-w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl w-[550px] max-md:px-5 max-md:mt-10  ">
        <div className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-white rounded-xl border border-gray border-solid max-md:px-5 hover:bg-secondColor cursor-pointer">
          <p className="font-bold">{"X"}</p>
        </div>
        <div className="flex justify-center items-center self-center  p-2.5 -mt-2 max-w-full bg-gray opacity-1.5 rounded-[50px] w-[200px] h-[200px] max-md:px-5">
          <Image
            src="/icons/Danger Circle.svg"
            width={100}
            height={100}
            alt="Danger Circle"
          />
        </div>
        <div className="mt-4 text-4xl font-medium leading-[1.75] text-center text-gray-900 max-md:max-w-full">
          يجب أن تكون قد شاركت في برنامج من هذه الجامعة مسبقاً{" "}
        </div>
        <Link
          href={`/${language}/login`}
          className="flex-1 justify-center text-center py-2 mt-10 whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
        >
          تصفح البرامج الدراسية
        </Link>
      </div>
    </div>
  );
}

export default NotEnrolledProgram