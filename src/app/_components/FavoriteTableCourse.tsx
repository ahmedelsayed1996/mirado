
import Link from "next/link";
import React, { useState } from "react";
import useCurrentLang from "../_hooks/useCurrentLang";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

type Props = {
    headers: string[];
    data: Record<string, any>[]; // البيانات تيجي كمصفوفة من objects
};

const FavoriteTableCourse: React.FC<Props> = ({ headers, data }) => {
    const language = useCurrentLang();
    const [favoritesCourse, setFavoritesCourse] = useState(data);
    const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
    const { tokenMainSite } = parseCookies();
    const t = useTranslations("courses");
    const p = useTranslations("Profile");

    const unFavorite = async (courseId: any) => {
        // console.log("courseId" , courseId);
        
        setLoadingStates((prev) => new Map(prev).set(courseId, true));
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/course`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": language,
                    Authorization: `Bearer ${tokenMainSite}`
                },
                body: JSON.stringify({
                    "courseId": courseId,
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message);
            }

            const result = await response.json();
            setFavoritesCourse((prev) => prev.filter((favorite: any) => favorite?.course?.id !== courseId))
            toast.success(t("removeSubscribe"));
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoadingStates((prev) => new Map(prev).set(courseId, false));
        }
    }

    return (
        <div className="overflow-auto w-full max-w-[1150px] mt-4">
            <table className="w-full  border-collapse">
                <thead>
                    <tr className="bg-primary text-white text-xs font-bold tracking-wide">
                        {headers.map((header, i) => (
                            <th key={i} className="py-2 px-4 text-start" >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    {favoritesCourse?.map((item: any, index: number) => {
                        return (
                            <tr
                                key={index}
                                className="text-xs border-b border-[#EEEEEE] hover:bg-gray transition"
                            >
                                <td className="py-2 px-4">
                                    {item?.course?.courses_translations[0].name}
                                </td>
                                <td className="py-2 px-4">
                                    {item?.course?.lesson_duration} {p("requests14")}
                                </td>
                                <td className="py-2 px-4">
                                    {item?.course?.min_cost} {item?.course?.institutes_branch?.currency}
                                </td>
                                <td className="py-2 px-4">
                                    {item?.course?.courses_translations[0].required_level}
                                </td>
                                <td className="py-2 px-4">
                                    {item?.course?.courses_translations[0].course_duration}
                                </td>
                                <td className="py-2 px-4">
                                    <div className="flex gap-2 justify-start">
                                        {loadingStates.get(item?.course?.id) ? <div className="flex shrink-0 self-stretch my-auto p-1 bg-white rounded border border-solid border-zinc-100 cursor-pointer">
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" /></svg>
                                        </div> : <div className="flex shrink-0 self-stretch my-auto p-1 bg-white rounded border border-solid border-zinc-100 cursor-pointer"
                                            onClick={() => unFavorite(item?.course?.id)}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.96 2.06641C9.75337 2.06641 8.67337 2.65307 8.00004 3.55307C7.32671 2.65307 6.24671 2.06641 5.04004 2.06641C2.99337 2.06641 1.33337 3.73307 1.33337 5.79307C1.33337 6.58641 1.46004 7.31974 1.68004 7.99974C2.73337 11.3331 5.98004 13.3264 7.58671 13.8731C7.81337 13.9531 8.18671 13.9531 8.41337 13.8731C10.02 13.3264 13.2667 11.3331 14.32 7.99974C14.54 7.31974 14.6667 6.58641 14.6667 5.79307C14.6667 3.73307 13.0067 2.06641 10.96 2.06641Z" fill="#F89A21" />
                                            </svg>
                                        </div>}
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};



export default FavoriteTableCourse;
