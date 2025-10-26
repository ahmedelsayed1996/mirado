"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import BannerSection from "@/app/_components/BannerSection";
import BlogsCart from "@/app/_components/BlogsCart";
import useCurrentLang from "@/app/_hooks/useCurrentLang";

type Blog = {
  id: number;
  title: string;
  content: string;
  photo?: string | null;
  tags?: string[];
  views?: number;
  created_at?: string;
};

export default function Blogs() {
  const t = useTranslations("Blogs");
  const language = useCurrentLang();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", language || "en");
    myHeaders.append("Authorization", "Bearer <token>"); // ← replace

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?published=true&limit=6`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data?.data || []))
      .catch((err) => console.error("Blogs fetch error:", err))
      .finally(() => setLoading(false));
  }, [language]);

  return (
    <>
      <BannerSection
        head={t("BlogsLabel")}
        breadcrumb={t("head")}
        urlImage="/images/2.png"
      />

      <div className="bg-secondColor px-4 sm:px-8 lg:px-20 pt-5">
        <div className="mt-8 w-full">
          {/* One flex container that wraps, centered last row */}
          <div className="flex flex-wrap gap-6 items-stretch w-full justify-start">
            {loading && [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex-none basis-full justify-between md:basis-1/2 lg:basis-1/3 min-w-60 bg-white rounded-2xl border border-gray/40 shadow-[0px_4px_54px_rgba(0,0,0,0.05)] p-5 animate-pulse"
              >
                <div className="h-40 rounded-xl bg-gray-200" />
                <div className="mt-4 h-5 w-2/3 bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-full bg-gray-100 rounded" />
                <div className="mt-2 h-4 w-5/6 bg-gray-100 rounded" />
                <div className="mt-4 h-10 w-full bg-gray-200 rounded-[64px]" />
              </div>
            ))}

            {!loading && blogs.length === 0 && (
              <p className="text-gray-500">No blogs found.</p>
            )}

            {!loading && blogs.map((blog) => (
              <BlogsCart key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
