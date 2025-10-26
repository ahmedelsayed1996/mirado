import React from "react";
import Link from "next/link";
import useCurrentLang from "../_hooks/useCurrentLang";
function DoYouWantDelete() {
  const language  = useCurrentLang();
  return (
    <div className="flex justify-center self-center items-center   bg-secondColor bg-opacity-80 max-md:px-5  ">
      <div className="flex overflow-hidden gap-2.5 justify-center self-center items-center px-96 py-64 bg-gray-50 bg-opacity-80 max-md:px-5 max-md:py-24">
        <div className="flex relative flex-col justify-center self-center px-8   bg-white rounded-2xl border border-gray border-solid shadow-2xl min-h-[600px] min-w-[240px] w-[781px] max-md:px-5">
          <button
            onClick={() => window.close()}
            className="flex z-10 justify-center items-center px-5 w-14 h-14 bg-slate-50 rounded-xl border border-gray border-solid max-md:px-5 hover:bg-primary hover:text-gray cursor-pointer"
          >
            <p className="font-bold">{"X"}</p>
          </button>

          <div className="flex z-0 flex-col w-full max-md:max-w-full">
            <div className="flex flex-col justify-center px-5 w-full rounded-xl max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex gap-2.5 justify-center items-center self-center px-2.5 bg-red-100	opacity-1.5  bg-gray-50 aspect-square min-h-[214px] rounded-[60px] w-[214px]">
                  {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/34db0987c31af22b7736e15be291560000124ab4a68db91b198dd6b44326cb6e?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                    className="flex items-center justify-center mx-2 my-auto  aspect-square w-20 h-20"
                  /> */}
                </div>
                <div className=" text-4xl pt-6 font-medium text-center text-gray-900 max-md:max-w-full">
                  Do you want to delete that file?{" "}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------------------- */}
            <div className="flex flex-wrap gap-5  justify-center mt-10 w-full text-base tracking-normal leading-none max-md:max-w-full">
              <Link
                href={`/${language}/login`}
                className="flex-1 justify-center text-center font-bold text-xl p-5 whitespace-nowrap  border border-gray border-solid rounded-2xl text-primary bg-white rounded-xl max-md:px-5 border-primary hover:border hover:border-primary hover:text-white hover:bg-primary transition-all duration-300 w-52 mx-auto"
              >
                Yes
              </Link>

              <Link
                href={`/${language}/language-schools`}
                className="flex-1 justify-center text-center p-5 font-bold text-xl  whitespace-nowrap  text-white bg-primary rounded-xl max-md:px-5 hover:border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-52 mx-auto"
              >
                NO{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoYouWantDelete;
