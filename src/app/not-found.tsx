"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useCurrentLang from "@/app/_hooks/useCurrentLang";

function NotFound() {
    const language = useCurrentLang();
    return (

        <div className='flex items-center gap-20 flex-col'>
            <div className="flex gap-2 items-center self-start text-sm tracking-wide text-zinc-900 bg-slate-300 py-4 w-full ">
                <Link
                    href={`/${language}/`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-600 bg-opacity-10 ms-5 "
                >
                    <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.38057 13.1044C6.50724 13.1044 6.63391 13.0577 6.73391 12.9577C6.92724 12.7644 6.92724 12.4444 6.73391 12.251L3.04057 8.55769L6.73391 4.86436C6.92724 4.67103 6.92724 4.35103 6.73391 4.1577C6.54057 3.96436 6.22057 3.96436 6.02724 4.1577L1.98057 8.20436C1.78724 8.3977 1.78724 8.71769 1.98057 8.91103L6.02724 12.9577C6.12724 13.0577 6.25391 13.1044 6.38057 13.1044Z"
                            fill="#365D8D"
                        />
                        <path
                            d="M2.44667 9.05957H13.6667C13.94 9.05957 14.1667 8.8329 14.1667 8.55957C14.1667 8.28624 13.94 8.05957 13.6667 8.05957H2.44667C2.17334 8.05957 1.94667 8.28624 1.94667 8.55957C1.94667 8.8329 2.17334 9.05957 2.44667 9.05957Z"
                            fill="#365D8D"
                        />
                    </svg>
                </Link>
                <div className="self-stretch my-auto">Back To Home</div>
            </div>
            <div>

                <Image src="/images/404not-found.png" width={1400} height={400} alt="Page Not Found" className='h-[580px]' />
            </div>
        </div>


    )
}

export default NotFound
