import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { getAllPosts } from "../reduxTool-kit/slices/postsSlice";
import Loader from "./Loader";
import useCleanPath from "../_hooks/useCleanPath";
import timeAgo from '../_lib/publishTime';


function Posts({ props }: any) {
  const t = useTranslations("BlogsCard");
  const language = useCurrentLang();
  const { cleanPath } = useCleanPath();
  // const [posts, setPosts] = useState();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: any) => state.posts);
  useEffect(() => {
    dispatch(getAllPosts({ limit: props, language, }))
  }, [])
  console.log("posts", posts);

  return (
    <div className="flex gap-5 max-md:flex-col max-md:gap-0 ">
      {/* {posts?.loading ? <Loader /> : <>
        {posts?.data?.posts?.data?.map((post: any) => (
          <div key={post?.id} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow py-2 w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl max-md:mt-6 max-md:max-w-full">
              <div className="flex flex-col px-2 text-start max-md:max-w-full ">
                <div className="flex overflow-hidden relative flex-col py-2.5 pr-5 pl-3.5 min-h-[224px] max-md:pr-5 max-md:max-w-full z-0">
                  <Image
                    loading="lazy"
                    src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(post.photo)}`}
                    // width={500}
                    // height={500}
                    fill={true}
                    alt="posts image"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex gap-4 justify-between mt-3.5 w-full text-sm leading-6 text-zinc-500 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1.5 items-center">
                    <svg width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12.5" r="10" stroke="#6C7278" strokeWidth="1.5" />
                      <path d="M12 8.5V12.5L14.5 15" stroke="#6C7278" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <div>
                      <span className="text-zinc-500 text-sm"> 
                        {timeAgo(post.created_at)}
                        </span>{" "}
                    </div>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <svg width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.27489 15.7957C2.42496 14.6915 2 14.1394 2 12.5C2 10.8606 2.42496 10.3085 3.27489 9.20433C4.97196 6.99956 7.81811 4.5 12 4.5C16.1819 4.5 19.028 6.99956 20.7251 9.20433C21.575 10.3085 22 10.8606 22 12.5C22 14.1394 21.575 14.6915 20.7251 15.7957C19.028 18.0004 16.1819 20.5 12 20.5C7.81811 20.5 4.97196 18.0004 3.27489 15.7957Z" stroke="#6C7278" strokeWidth="1.5" />
                      <path d="M15 12.5C15 14.1569 13.6569 15.5 12 15.5C10.3431 15.5 9 14.1569 9 12.5C9 10.8431 10.3431 9.5 12 9.5C13.6569 9.5 15 10.8431 15 12.5Z" stroke="#6C7278" strokeWidth="1.5" />
                    </svg>

                    <div>10K {t("viewsLable")}</div>
                  </div>
                </div>
                <div className=" mt-3.5 text-lg font-medium text-gray-900">
                  Top 10 Universities in Egypt
                </div>
              </div>
              <div className="mt-3.5 mx-2 lg:mx-5 text-sm md:text-base tracking-wide  text-ellipsis text-zinc-500 max-md:mr-2.5 max-md:max-w-full line-clamp-4 text-justify">
                The University of Windsor is a public research university located in Windsor, Ontario, Canada. It is Canada&apos;s southernmost university. It has approximately
              </div>

              <Link href={`/${language}/blogs/1`} className="flex justify-center items-center px-5 py-2 mx-5 mt-3.5 text-sm lg:text-xl  text-white bg-primary rounded-xl max-md:px-5  border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
                <span>
                  {t("blogsButton1")}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </>} */}

      {/* <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow py-2 w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl max-md:mt-6 max-md:max-w-full">
          <div className="flex flex-col px-2 text-start max-md:max-w-full ">
            <div className="relative">
              <Image
                loading="lazy"
                src="/images/institut.png"
                width={500}
                height={500}
                // fill={true}
                alt="posts image"
                className="rounded-xl"
              />
            </div>
            <div className="flex gap-4 justify-between mt-3.5 w-full text-sm leading-6 text-zinc-500 max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1.5 items-center">
                <svg width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12.5" r="10" stroke="#6C7278" strokeWidth="1.5" />
                  <path d="M12 8.5V12.5L14.5 15" stroke="#6C7278" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div>
                  <span className="text-zinc-500 text-sm"> {t("historyLable")}</span>{" "}
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <svg width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.27489 15.7957C2.42496 14.6915 2 14.1394 2 12.5C2 10.8606 2.42496 10.3085 3.27489 9.20433C4.97196 6.99956 7.81811 4.5 12 4.5C16.1819 4.5 19.028 6.99956 20.7251 9.20433C21.575 10.3085 22 10.8606 22 12.5C22 14.1394 21.575 14.6915 20.7251 15.7957C19.028 18.0004 16.1819 20.5 12 20.5C7.81811 20.5 4.97196 18.0004 3.27489 15.7957Z" stroke="#6C7278" strokeWidth="1.5" />
                  <path d="M15 12.5C15 14.1569 13.6569 15.5 12 15.5C10.3431 15.5 9 14.1569 9 12.5C9 10.8431 10.3431 9.5 12 9.5C13.6569 9.5 15 10.8431 15 12.5Z" stroke="#6C7278" strokeWidth="1.5" />
                </svg>

                <div>10K {t("viewsLable")}</div>
              </div>
            </div>
            <div className=" mt-3.5 text-lg font-medium text-gray-900">
              Top 10 Universities in Egypt
            </div>
          </div>
          <div className="mt-3.5 mx-2 lg:mx-5 text-sm md:text-base tracking-wide  text-ellipsis text-zinc-500 max-md:mr-2.5 max-md:max-w-full line-clamp-4 text-justify">
            The University of Windsor is a public research university located in Windsor, Ontario, Canada. It is Canada&apos;s southernmost university. It has approximately
          </div>

          <Link href={`/${language}/blogs/1`} className="flex justify-center items-center px-5 py-2 mx-5 mt-3.5 text-sm lg:text-xl  text-white bg-primary rounded-xl max-md:px-5  border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
            <span>
              {t("blogsButton1")}
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow py-2 w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl max-md:mt-6 max-md:max-w-full">
          <div className="flex flex-col px-2 text-start max-md:max-w-full ">
            <div className="relative">
              <Image
                loading="lazy"
                src="/images/institut.png"
                width={500}
                height={500}
                // fill={true}
                alt="posts image"
                className="rounded-xl"
              />
            </div>
            <div className="flex gap-4 justify-between mt-3.5 w-full text-sm leading-6 text-zinc-500 max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1.5 items-center">
                <svg width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12.5" r="10" stroke="#6C7278" strokeWidth="1.5" />
                  <path d="M12 8.5V12.5L14.5 15" stroke="#6C7278" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div>
                  <span className="text-zinc-500 text-sm"> {t("historyLable")}</span>{" "}
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <svg width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.27489 15.7957C2.42496 14.6915 2 14.1394 2 12.5C2 10.8606 2.42496 10.3085 3.27489 9.20433C4.97196 6.99956 7.81811 4.5 12 4.5C16.1819 4.5 19.028 6.99956 20.7251 9.20433C21.575 10.3085 22 10.8606 22 12.5C22 14.1394 21.575 14.6915 20.7251 15.7957C19.028 18.0004 16.1819 20.5 12 20.5C7.81811 20.5 4.97196 18.0004 3.27489 15.7957Z" stroke="#6C7278" strokeWidth="1.5" />
                  <path d="M15 12.5C15 14.1569 13.6569 15.5 12 15.5C10.3431 15.5 9 14.1569 9 12.5C9 10.8431 10.3431 9.5 12 9.5C13.6569 9.5 15 10.8431 15 12.5Z" stroke="#6C7278" strokeWidth="1.5" />
                </svg>

                <div>10K {t("viewsLable")}</div>
              </div>
            </div>
            <div className=" mt-3.5 text-lg font-medium text-gray-900">
              Top 10 Universities in Egypt
            </div>
          </div>
          <div className="mt-3.5 mx-2 lg:mx-5 text-sm md:text-base tracking-wide  text-ellipsis text-zinc-500 max-md:mr-2.5 max-md:max-w-full line-clamp-4 text-justify">
            The University of Windsor is a public research university located in Windsor, Ontario, Canada. It is Canada&apos;s southernmost university. It has approximately
          </div>

          <Link href={`/${language}/blogs/1`} className="flex justify-center items-center px-5 py-2 mx-5 mt-3.5 text-sm lg:text-xl  text-white bg-primary rounded-xl max-md:px-5  border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300">
            <span>
              {t("blogsButton1")}
            </span>
          </Link>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
