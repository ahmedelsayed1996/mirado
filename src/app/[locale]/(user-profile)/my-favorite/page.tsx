"use client"
import Loader from "@/app/_components/Loader";
import RequestTableCourse from "@/app/_components/RequestTableCourse";
import RequestTableProgram from "@/app/_components/RequestTableProgram";
import useCurrentLang from "@/app/_hooks/useCurrentLang";
import NotFound from '@/app/_components/NotFound';
import { AppDispatch } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavorites } from "@/app/reduxTool-kit/slices/favoritesSlice";
import ProtectedRoute from "@/app/_components/ProtectedRoute";
import FavoriteTableProgram from "@/app/_components/FavoriteTableProgram";
import FavoriteTableCourse from "@/app/_components/FavoriteTableCourse";
import { useTranslations } from "next-intl";

export default function MyFavorite() {
    const dispatch = useDispatch<AppDispatch>();
    const language = useCurrentLang();
    const [activeButton, setActiveButton] = useState<string>("program");
    // const requests = useSelector((state: any) => state.request);
    const favorites = useSelector((state: any) => state.favorites)
    // console.log("favorites", favorites);
    const t = useTranslations("Profile");

    useEffect(() => {
        dispatch(getAllFavorites({ language }))
    }, [dispatch])

    return (
        <ProtectedRoute >
            <div className="flex overflow-hidden flex-col bg-zinc-100">
                <div className="flex overflow-hidden flex-col items-center self-center pb-5 my-8 w-full bg-white rounded-lg border border-solid border-zinc-100 max-w-[1199px] max-md:max-w-full">
                    <div className="flex overflow-hidden flex-col justify-center items-start self-stretch px-6 py-3 w-full text-sm font-medium tracking-wide border-b border-solid border-b-zinc-100 text-zinc-900 max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-2 items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4404 3.59961C19.2317 3.59984 21.4999 5.87347 21.5 8.68945C21.5 9.6831 21.3616 10.61 21.1162 11.4775L21.0039 11.8457L21.0029 11.8486C20.2487 14.2353 18.7033 16.1591 17.0352 17.5928C15.5737 18.8488 14.0403 19.7102 12.915 20.166L12.459 20.3359L12.4531 20.3379C12.3532 20.3731 12.189 20.3994 12 20.3994C11.858 20.3994 11.7301 20.3846 11.6328 20.3623L11.5469 20.3379L11.541 20.3359L11.085 20.166C9.9597 19.7102 8.42634 18.8488 6.96484 17.5928C5.40096 16.2487 3.94481 14.4742 3.14746 12.291L2.99707 11.8486L2.99609 11.8457L2.88379 11.4775C2.63838 10.61 2.5 9.68311 2.5 8.68945C2.50008 5.87347 4.76829 3.59984 7.55957 3.59961C9.20459 3.59961 10.6795 4.3992 11.5996 5.62891L12 6.16406L12.4004 5.62891C13.3205 4.3992 14.7954 3.59961 16.4404 3.59961Z" fill="#365D8D" stroke="#365D8D" />
                            </svg>

                            <div className="self-stretch my-auto text-zinc-900">
                            {t("nav5")}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-5 justify-between mt-4 w-full max-w-[1150px] max-md:max-w-full">
                        <div className="flex relative items-start">
                            <div className="flex items-center my-auto">
                                <div
                                    onClick={() => setActiveButton("program")}
                                    className={`flex gap-1 justify-center items-center p-4 my-auto cursor-pointer ${activeButton === "program" ? "border-b-2 border-amber-500" : ""} `} >
                                    <div className={`flex items-center gap-1 my-auto text-sm ${activeButton === "program" ? "font-bold text-zinc-900" : "text-neutral-400 font-medium"}  tracking-wide whitespace-nowrap `}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.7935 0.333984H4.20683C1.78016 0.333984 0.333496 1.78065 0.333496 4.20732V9.78732C0.333496 12.2207 1.78016 13.6673 4.20683 13.6673H9.78683C12.2135 13.6673 13.6602 12.2207 13.6602 9.79399V4.20732C13.6668 1.78065 12.2202 0.333984 9.7935 0.333984ZM9.50016 9.50065H4.50016C4.22683 9.50065 4.00016 9.27398 4.00016 9.00065C4.00016 8.72732 4.22683 8.50065 4.50016 8.50065H9.50016C9.7735 8.50065 10.0002 8.72732 10.0002 9.00065C10.0002 9.27398 9.7735 9.50065 9.50016 9.50065ZM9.50016 5.50065H4.50016C4.22683 5.50065 4.00016 5.27398 4.00016 5.00065C4.00016 4.72732 4.22683 4.50065 4.50016 4.50065H9.50016C9.7735 4.50065 10.0002 4.72732 10.0002 5.00065C10.0002 5.27398 9.7735 5.50065 9.50016 5.50065Z" fill={activeButton === "program" ? "#F89A21" : "#A5A5A5"} />
                                        </svg>

                                        {t("requests")}
                                    </div>
                                </div>
                                <div
                                    onClick={() => setActiveButton("course")}
                                    className={`flex gap-1 justify-center items-center p-4 my-auto cursor-pointer ${activeButton === "course" ? "border-b-2 border-amber-500" : ""} `} >
                                    <div className={`flex items-center gap-1 my-auto text-sm ${activeButton === "course" ? "font-bold text-zinc-900" : "text-neutral-400 font-medium"}  tracking-wide whitespace-nowrap `}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.667 6.79398H11.7403C10.1603 6.79398 8.87366 5.50732 8.87366 3.92732V2.00065C8.87366 1.63398 8.57366 1.33398 8.20699 1.33398H5.38033C3.32699 1.33398 1.66699 2.66732 1.66699 5.04732V10.954C1.66699 13.334 3.32699 14.6673 5.38033 14.6673H10.6203C12.6737 14.6673 14.3337 13.334 14.3337 10.954V7.46065C14.3337 7.09398 14.0337 6.79398 13.667 6.79398Z" fill={activeButton === "course" ? "#F89A21" : "#A5A5A5"} />
                                            <path d="M10.5338 1.47365C10.2604 1.20032 9.78711 1.38699 9.78711 1.76699V4.09365C9.78711 5.06699 10.6138 5.87365 11.6204 5.87365C12.2538 5.88032 13.1338 5.88032 13.8871 5.88032C14.2671 5.88032 14.4671 5.43365 14.2004 5.16699C13.2404 4.20032 11.5204 2.46032 10.5338 1.47365Z" fill={activeButton === "course" ? "#F89A21" : "#A5A5A5"} />
                                        </svg>

                                        {t("requests11")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {favorites.loading ? <Loader /> : <>
                        {activeButton === "program" ?
                            favorites.favorites?.Favorite_Programs?.length > 0 ?
                                (<FavoriteTableProgram headers={[
                                    t("requests20"),
                                    t("requests21"),
                                    t("requests22"),
                                    t("requests8"),
                                    t("favorite6"),
                                    t("requests23"),
                                ]} data={favorites.favorites?.Favorite_Programs} />) :
                                <NotFound
                                    head="You have not added Programs to your favorites."
                                    summary="Your Favorites list is currently empty. Browse the courses and language programmes we offer, and add the ones you are interested in here for easy access later."
                                    button="Add your Program"
                                    link="university" />

                            : favorites.favorites?.Favorite_Courses?.length > 0 ?
                                (<FavoriteTableCourse headers={[
                                    t("requests31"),
                                    t("favorite3"),
                                    t("requests22"),
                                    t("requests8"),
                                    t("favorite6"),
                                    t("requests23"),
                                ]} data={favorites.favorites?.Favorite_Courses} />) :
                                <NotFound
                                    head="You have not added Course to your favorites."
                                    summary="Your Favorites list is currently empty. Browse the courses and language programmes we offer, and add the ones you are interested in here for easy access later."
                                    button="Add your Course"
                                    link="language-schools" />
                        }
                    </>}

                </div>
            </div>
        </ProtectedRoute>
    )
}
