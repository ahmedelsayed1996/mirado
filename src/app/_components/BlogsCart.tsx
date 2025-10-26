
"use client";
import Image from 'next/image';
import React from 'react'
import { useTranslations } from "next-intl";
import Link from 'next/link';
import useCurrentLang from '../_hooks/useCurrentLang';
type Blog = {
  id: number;
  title: string;
  content: string;
  photo?: string | null;
  tags?: string[];
  views?: number;
  created_at?: string;
};

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, ""); // removes all tags
}
function BlogsCart({ blog }: { blog: Blog }) {
  console.log(blog.content);
  const t = useTranslations("BlogsCard");
  const language=useCurrentLang()  
   
  const photoUrl =
    blog.photo && blog.photo !== "null"
      ? `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${blog.photo.replace(/^\/?/, "")}`
      : "/images/institut.png";

const plainContent = stripHtml(blog.content);
  console.log(blog);
  return (
    <div className="flex flex-col justify-between flex-none basis-full md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] min-w-[240px] p-5 bg-white rounded-2xl border border-gray border-solid shadow-[0px_4px_54px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="relative inline-block h-[250px]">
          <Image
            loading="lazy"
            src={photoUrl}
           fill 
            alt="posts image"
            className="rounded-xl"
          />

          {blog.tags && blog.tags.length > 0 && (
            <div className="absolute top-2 start-4 flex flex-wrap gap-2">
              {blog.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-white px-2 py-1 rounded font-bold text-xs text-emerald-800"
                >
                  <svg
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="5" cy="5.5" r="5" fill="#085D3A" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-10 justify-between items-start mt-3.5 w-full text-sm leading-6 text-right text-zinc-500 max-md:max-w-full">
        <div className="flex gap-2.5 items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3.92969C15.3515 3.92969 18.5878 5.8975 20.8281 9.41797C21.2659 10.1052 21.4999 11.0391 21.5 11.998C21.5 12.9573 21.2661 13.8887 20.8291 14.5703L20.8281 14.5713C19.7039 16.335 18.3361 17.7078 16.8281 18.6436C15.3201 19.5693 13.6799 20.0596 12 20.0596C8.64787 20.0596 5.41172 18.1007 3.17188 14.5713L3.01758 14.3018C2.67958 13.65 2.50006 12.8327 2.5 11.9951C2.5 11.0376 2.73395 10.1055 3.17188 9.41797C4.29649 7.65362 5.66424 6.2795 7.17285 5.34375C8.68046 4.41861 10.3207 3.92969 12 3.92969ZM12 7.45996C9.48305 7.45996 7.45996 9.49466 7.45996 12C7.46013 14.5052 9.48316 16.54 12 16.54C14.5168 16.54 16.5399 14.5052 16.54 12C16.54 9.49466 14.5169 7.45996 12 7.45996Z"
              stroke="#F89A21"
            />
            <path
              d="M11.998 9.63965C13.2919 9.63965 14.3584 10.7061 14.3584 12C14.3582 13.2914 13.2941 14.3496 11.998 14.3496C10.7045 14.3494 9.64863 13.2936 9.64844 12C9.64844 10.6951 10.7055 9.63986 11.998 9.63965Z"
              stroke="#F89A21"
            />
          </svg>

          <div className=" my-auto">{blog.views ?? 0} {t("viewsLable")}  </div>
        </div>
        <div className="flex gap-2.5 items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7695 3.41699C22.7715 3.41711 28.4061 8.65696 28.4062 15C28.4062 21.3432 22.7716 26.5839 15.7695 26.584C8.76731 26.584 3.13281 21.3433 3.13281 15C3.133 8.65689 8.76743 3.41699 15.7695 3.41699ZM15.2832 8.18066C14.5087 8.18069 13.7979 8.77689 13.7979 9.58691V14.541C13.7979 15.7331 14.5542 17.0219 15.6035 17.7031L15.8174 17.8311L19.8896 20.0664V20.0654C20.1356 20.2106 20.3933 20.2607 20.6299 20.2607C21.1158 20.2607 21.6109 20.0376 21.8994 19.5898L21.9004 19.5908C21.9023 19.5879 21.9043 19.585 21.9062 19.582L21.9053 19.5811C22.3615 18.8832 22.0872 18.0116 21.3818 17.6309H21.3828L17.3105 15.3955L17.3057 15.3926L17.2236 15.3379C17.1361 15.2679 17.0329 15.1538 16.9414 15.0059C16.8179 14.806 16.7686 14.6297 16.7686 14.541V9.58691C16.7685 8.77688 16.0578 8.18066 15.2832 8.18066Z"
              fill="#F89A21"
              stroke="#F89A21"
            />
          </svg>
          {blog.created_at && (
            <div className="flex gap-2.5 items-center">
              <span className="text-zinc-500">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>
          )}

        </div>
      </div>
      <div className="mt-3.5 text-xl font-bold text-start text-gray-900 line-clamp-2">
  {blog.title}
</div>

      <div className="mt-3.5 text-base tracking-wide text-start text-zinc-500 max-md:max-w-full line-clamp-3">
        {blog.content.length > 100 ? plainContent :plainContent}
      </div>
      <div className="flex relative justify-center items-center gap-2.5 mt-3.5 w-full text-xl text-white  max-md:max-w-full">
        <Link href={`/${language}/blogs/${blog.id}`} locale={false}
          prefetch={true}
          className="flex items-center justify-center gap-2.5 px-2 py-2.5 bg-primary rounded-3xl size-full max-md:px-5 max-md:max-w-full text-center text-base"
        >
          <span>{t("blogsButton1")}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 12H20.33"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

      </div>
    </div>
  );
}

export default BlogsCart
