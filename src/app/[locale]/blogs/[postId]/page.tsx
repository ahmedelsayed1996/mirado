"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import BannerSection from "@/app/_components/BannerSection";

type Blog = {
  id: number;
  title: string;
  content: string; // HTML string
  photo?: string | null; // might be "null" (string)
  tags?: string[];
  views?: number;
  created_at?: string;
  published?: boolean;
};
 
function buildPhotoUrl(photo?: string | null): string {
  if (!photo || photo === "null") return "/images/institut.png";
  const base =
    (process.env.NEXT_PUBLIC_BASE_PHOTO_URL ||
      process.env.NEXT_PUBLIC_SERVER_URL ||
      "").replace(/\/+$/, "");
  return `${base}/${(photo)}`;
}

export default function BlogDetailsPage() {
  const params = useParams() as Record<string, string | string[]>;
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const t = useTranslations("Blogs");
  const t1 = useTranslations("institutesCard");
  const n = useTranslations("newHome");
  const language = useCurrentLang();

  useEffect(() => {
    if (!postId) return;
    const ctrl = new AbortController();

    const headers = new Headers();
    headers.append("Accept-Language", language || "en");

    if (process.env.NEXT_PUBLIC_API_TOKEN) {
      headers.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`);
    }

    const base = (process.env.NEXT_PUBLIC_SERVER_URL || "").replace(/\/+$/, "");
    setLoading(true);
    setErr(null);

    fetch(`${base}/blogs/${postId}`, {
      method: "GET",
      headers,
      signal: ctrl.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setBlog(json ?? null);
        console.log(json);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setErr(String(e));
      })
      .finally(() => setLoading(false));
  }, [postId, language]);
  const createdAt = useMemo(() => {
    if (!blog?.created_at) return "";
    try {
      // You can localize this further if you like
      return new Intl.DateTimeFormat(language || "en", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(blog.created_at));
    } catch {
      return blog.created_at;
    }
  }, [blog?.created_at, language]);

  if (loading) {
    return (
      <div className="p-5">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="h-10 w-3/4 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="h-72 w-full bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );
  }
  if (err || !blog) {
    return (
      <div className="p-5">
        <p className="text-red-600 font-medium">
          {err ? `Failed to load blog: ${err}` : "Blog not found."}
        </p>
        <Link href="/blogs" className="text-primary underline mt-2 inline-block">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  const cover = buildPhotoUrl(blog.photo);

  return (<>
    <BannerSection
      head={t("BlogsLabel")}
      breadcrumb={t("head")}
      urlImage="/images/2.png"
    />


    <div className="flex flex-col items-end p-5">
      <div className="flex flex-col md:p-5 w-full max-md:max-w-full">
        {/* Breadcrumbs */}
        {/* <div className="flex gap-1.5 items-center w-full text-xs font-medium text-start max-md:max-w-full">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm text-gray-600">
              <li aria-hidden>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66667 14.1682H13.3333M9.18141 2.30492L3.52949 6.70086C3.15168 6.99471 2.96278 7.14163 2.82669 7.32563C2.70614 7.48862 2.61633 7.67224 2.56169 7.86746C2.5 8.08785 2.5 8.32717 2.5 8.8058V14.8349C2.5 15.7683 2.5 16.235 2.68166 16.5916C2.84144 16.9052 3.09641 17.1601 3.41002 17.3199C3.76654 17.5016 4.23325 17.5016 5.16667 17.5016H14.8333C15.7668 17.5016 16.2335 17.5016 16.59 17.3199C16.9036 17.1601 17.1586 16.9052 17.3183 16.5916C17.5 16.235 17.5 15.7683 17.5 14.8349V8.8058C17.5 8.32717 17.5 8.08785 17.4383 7.86746C17.3837 7.67224 17.2939 7.48862 17.1733 7.32563C17.0372 6.99471 16.8483 6.99471 16.4705 6.70086L10.8186 2.30492C10.5258 2.07721 10.3794 1.96335 10.2178 1.91959C10.0752 1.88097 9.92484 1.88097 9.78221 1.91959C9.62057 1.96335 9.47418 2.07721 9.18141 2.30492Z"
                    stroke="#1E4C83"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
              <li>
                <Link href="/" className="block text-primary hover:text-gray-500">
                  Home
                </Link>
              </li>
              <li className="rtl:rotate-180" aria-hidden>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <Link href={`/${language}/blogs`} locale={false} className="block text-primary hover:text-gray-500">
                  Blogs
                </Link>

              </li>
              <li className="rtl:rotate-180" aria-hidden>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li className="text-gray-800">Blog Details</li>
            </ol>
          </nav>
        </div> */}
        <div className="flex flex-col w-full text-blue-900 min-h-[176px] max-md:max-w-full">

          {/* Title */}
          <div className="ps-3.5 text-3xl font-extrabold mt-5 border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
            {blog.title?.trim() || "Untitled"}
          </div>
          <div className="text-base tracking-normal leading-7   text-black mt-3"
            dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 150) || "<p></p>" }}
          >


          </div>

          {/* Meta */}
          <div className=" flex mt-3 text-sm text-gray-500">
            <div className='flex gap-1 inline-block me-3'>
              <div>
                <img src="/icons/clock-yello.svg" alt="calendar icon" width={28}
                  height={14} />
              </div>
              <span className='text-nowrap text-sm'> {createdAt}</span>
            </div>
            <div className='flex gap-1 inline-block'>
              <div>
                <img src="/icons/eye-bold.svg" alt="views icon" width={24}
                  height={14} />
              </div>
              <span className='text-nowrap text-sm'> {blog.views} {t1("viewsLable1")}</span>
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="flex flex-col mt-5">
          <div className="relative w-full">
            <Image
              src={cover}
              alt="Post photo"
              width={800}
              height={500} // Reduced height (adjust as needed)
              className="w-full h-[80vh] object-contain" // Changed to object-contain and reduced height
              priority
            />
          </div>
        </div>

        {/* Tags */}
        <div className="ps-4 md:ps-8 lg:ps-12 flex flex-col justify-center mt-14 w-full">
          {/* Title */}
          <div className="flex items-center border-b-[3px] border-b-amber-500 w-fit pb-1">
            <img
              src="/icons/Status indicator.svg"
              width={16}
              height={16}
              alt="tag icon"
              className="me-2"
            />
            <h2 className="text-lg font-bold text-start">{t("Tag")}</h2>
          </div>

          {/* Tags */}
          <div className="mt-6">
            {blog.tags?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
                {blog.tags.map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-gray-200 shadow-sm text-sm font-semibold text-[#085D3A]"
                  >
                    <img
                      src="/icons/Status indicator.svg"
                      width={14}
                      height={14}
                      alt="tag icon"
                    />
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">{t("NoTags")}</p>
            )}
          </div>
        </div>


        {/* Content   */}
        <div className="w-full ps-4 md:ps-8 lg:ps-12 mt-14 max-md:max-w-full">
          <div className="flex border-solid border-b-[3px] border-b-amber-500   w-fit">
            <img src="/icons/Leading Icon.svg" width={13} height={24} alt="tag icon" />
            <h2 className="text-lg font-bold font-semibold text-start m-3 ">{t("content")}</h2>
          </div>
          {/* Title */}
          <div className="ps-3.5 text-3xl font-normal mt-5 border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
            {blog.title?.trim() || "Untitled"}
          </div>
          <article className="prose max-w-none mt-8 text-gray-900 leading-8 w-full">
            <div
              className="
      w-full max-w-full
      break-words                 /* wrap long words */
      [overflow-wrap:anywhere]    /* force wrap if needed */
      [word-break:break-word]     /* improve wrapping in some browsers */
      [hyphens:auto]              /* hyphenate long words where possible */
      [&_p]:m-0 [&_p]:        /* tidy paragraph spacing */
      [&_img]:max-w-full [&_img]:h-auto
      [&_table]:w-full overflow-x-auto
      [&_pre]:whitespace-pre-wrap [&_code]:break-words
    "
              dangerouslySetInnerHTML={{ __html: blog.content || "<p></p>" }}
            />
          </article>

          <hr className="my-10 w-full border-t border-gray-300" />
        </div>





      </div>
    </div>
  </>
  );
}
