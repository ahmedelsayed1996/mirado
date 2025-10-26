import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import { useTranslations } from "next-intl";
import useCurrentLang from "../_hooks/useCurrentLang";
import { parseCookies } from "nookies";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
import Image from "next/image";

function NewStudentResults({ currentUser }: { currentUser: any }) {


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [idStudentResults, setIdStudentResults] = useState<number>();
    const [addNewCertificate, setAddNewStudentResults] = useState<boolean>(false);
    const [studentResults, setStudentResults] = useState<object[]>([]);
    const [filesPreview, setFilesPreview] = useState<any>("");
    const [selectedFile, setSelectedFile] = useState<any>();


    const dispatch = useDispatch<AppDispatch>();
    const { tokenMainSite } = parseCookies();
    const locale = useCurrentLang();
    const t = useTranslations("Profile");

    const [formData, setFormData] = useState({
        testTitle: '',
        date: '',
        testGrade: '',
        universityInstitute: '',
        files: ''
    });

    const handleInputChange = (e: any) => {
        // const { name, value } = e.target; // الحصول على name و value من الحقل
        // setFormData({
        //     ...formData,
        //     [name]: value // تحديث القيمة بناءً على name
        // });
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "files" && files && files.length > 0) {
            setFilesPreview(files[0].name);
            setSelectedFile(files[0]);
        }
    };
    const handleRemoveFile = () => {
        setFilesPreview("");
    };


    const handleDownloadDocx = async (docxPath: any) => {
        console.log(docxPath.slice(15));

        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quizzes/download/${docxPath.slice(15)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${tokenMainSite}`,
                }
            })

            if (!res.ok) {
                const result = await res.json();
                setIsLoading(false);
                throw new Error(result.message);
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = docxPath;
            a.style.display = "none";

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            window.URL.revokeObjectURL(url);

        } catch (error: any) {
            toast.error(error.message);

        } finally {
            setIsLoading(false)
        }
    }


    const handleDeleteStudentResult = (idStudentResults: number) => {
        setShowAlert(true);
        setIdStudentResults(idStudentResults);

    }

    const completeDeleteStudentResult = async () => {
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quizzes/${idStudentResults}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenMainSite}`
                },
            })

            if (!res.ok) {
                const result = await res.json();
                setIsLoading(false);
                throw new Error(result.message);
            }
            const response = await res.json();
            toast.success(t("test5"));
            setIsLoading(false);
            setShowAlert(false);
            setStudentResults((prevStudentResult: any[]) =>
                prevStudentResult.filter((certificate) => certificate.id !== idStudentResults)
            );
            dispatch(getUser({ tokenMainSite, locale }))
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.message)
        }
    }

    const handleSubmit = async (eve: any) => {
        eve.preventDefault();
        setIsLoading(true);
        const graduationDate = new Date(`${formData.date}T00:00:00Z`).toISOString();
        const formdata = new FormData();

        formdata.append("quizzeTitle", formData.testTitle);
        formdata.append("quizzeData", graduationDate);
        formdata.append("quizzeScore", formData.testGrade);
        formdata.append("Institute_or_university", formData.universityInstitute);
        if (selectedFile) {
            formdata.append(`files`, selectedFile);
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quizzes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokenMainSite}`
                },
                body: formdata
            })

            if (!res.ok) {
                const result = await res.json();
                setIsLoading(false);
                throw new Error(result.message);
            }

            const result = await res.json();
            toast.success(t("test6"));
            dispatch(getUser({ tokenMainSite, locale }))
            setIsLoading(false);
            setFormData((prev) => ({
                ...prev,
                testTitle: '',
                date: '',
                testGrade: '',
                universityInstitute: '',
                files: ''
            }))
            setFilesPreview("");
        } catch (error: any) {
            setIsLoading(false);
            console.error(error)
        }

    }

    useEffect(() => {
        if (currentUser) {
            setStudentResults(currentUser.Quizzes);
        }
    }, [currentUser])

    return (
        <div className="w-full bg-zinc-100 min-h-[screen]">
            {showAlert &&
                <div className="flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-50 size-full z-30">
                    <div className="bg-white rounded-3xl w-[665px]">
                        <div className="flex justify-between items-center px-6 py-3 border-b border-solid border-b-zinc-100">
                            <div className="text-2xl font-bold text-zinc-900">{t("test7")} </div>
                            <div className="cursor-pointer" onClick={() => setShowAlert(false)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0002 10.8287L5.79975 15.0291C5.68447 15.1444 5.54725 15.2017 5.38808 15.201C5.22878 15.2001 5.0901 15.1407 4.97204 15.0226C4.85829 14.9046 4.80253 14.7683 4.80475 14.6139C4.80683 14.4596 4.86475 14.3256 4.9785 14.2118L9.17246 10.001L4.9785 5.79015C4.87003 5.68182 4.81447 5.54911 4.81183 5.39202C4.8092 5.23494 4.86475 5.09737 4.9785 4.97932C5.09225 4.86126 5.22739 4.8005 5.38392 4.79702C5.54045 4.79355 5.67906 4.85084 5.79975 4.9689L10.0002 9.17327L14.2045 4.9689C14.3172 4.85626 14.4531 4.80029 14.6123 4.80098C14.7716 4.80182 14.9116 4.86126 15.0323 4.97932C15.1434 5.09737 15.1978 5.23362 15.1956 5.38807C15.1935 5.54237 15.1356 5.6764 15.0218 5.79015L10.8279 10.001L15.0218 14.2118C15.1303 14.3201 15.1859 14.4529 15.1885 14.6099C15.1911 14.767 15.1356 14.9046 15.0218 15.0226C14.9081 15.1407 14.7729 15.2015 14.6164 15.2049C14.4599 15.2084 14.3226 15.1498 14.2045 15.0291L10.0002 10.8287Z" fill="#A5A5A5" />
                                </svg>
                            </div>
                        </div>
                        <div className="px-6 py-5 text-xl font-semibold text-zinc-900">
                            {t("test8")}
                        </div>
                        <div className="flex gap-1.5 justify-end p-6">
                            <button onClick={() => setShowAlert(false)} className="h-12 text-base font-medium border border-solid cursor-pointer border-zinc-300 rounded-[64px] text-stone-500 w-[230px] max-sm:w-full">
                                {t("lable18")}
                            </button>
                            {isLoading ? <div> <Spinner /></div> :
                                <button onClick={completeDeleteStudentResult} className="w-40 h-12 text-base text-white bg-rose-700 cursor-pointer border-[none] rounded-[64px]">
                                    {t("docx5")}
                                </button>}
                        </div>
                    </div>
                </div>}

            {studentResults.length > 0 && <div className="flex flex-col gap-4 items-center mt-4 pb-4 bg-white rounded-lg border border-solid border-zinc-100">
                <div className="flex items-center self-stretch pt-4 pb-3.5 ps-6 border-b border-solid border-b-zinc-100 max-sm:px-4 max-sm:pt-4 max-sm:pb-3.5">
                    <div className="flex gap-2 justify-center items-center">
                        <div className="text-lg font-medium tracking-wide text-center text-zinc-900">
                            {t("test9")}
                        </div>
                        <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">{studentResults.length}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-start px-6 w-full">
                    {studentResults && studentResults.map((studentResult: any, index: number) => {
                        return (
                            <div key={index} className="flex flex-col gap-4 border-b border-solid border-b-zinc-100 w-full pb-4 ">
                                <div className="flex justify-between bg-[#FAFAFA] px-4 py-2 rounded">
                                    <div className="capitalize truncate">{studentResult.quizzeTitle}</div>
                                    <div className="bg-[#EAA5B4] p-2 rounded cursor-pointer" onClick={() => handleDeleteStudentResult(studentResult.id)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.66699 3.31301L5.81366 2.43967C5.92033 1.80634 6.00033 1.33301 7.12699 1.33301H8.87366C10.0003 1.33301 10.087 1.83301 10.187 2.44634L10.3337 3.31301" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.5669 6.09277L12.1336 12.8061C12.0603 13.8528 12.0003 14.6661 10.1403 14.6661H5.86026C4.00026 14.6661 3.94026 13.8528 3.86693 12.8061L3.43359 6.09277" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.88672 11H9.10672" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.33301 8.33301H9.66634" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-3">
                                    <div className="flex md:flex-col gap-3.5 items-start justify-between w-full md:w-1/2">
                                        <div className="self-stretch text-base font-medium tracking-wide text-zinc-800">
                                            {t("test")}
                                        </div>
                                        <div className="self-stretch text-base font-bold tracking-wide text-zinc-900">
                                            {studentResult.quizzeData.split("T")[0]}
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col gap-3.5 items-start justify-between w-full md:w-1/2">
                                        <div className="self-stretch text-base font-medium tracking-wide text-zinc-800">
                                            {t("test1")}
                                        </div>
                                        <div className="self-stretch text-base font-bold tracking-wide text-zinc-900 truncate">
                                            {studentResult.quizzeTitle}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-3">
                                    <div className="flex md:flex-col gap-3.5 items-start justify-between w-full md:w-1/2">
                                        <div className="self-stretch text-base font-medium tracking-wide text-zinc-800">
                                            {t("test2")}
                                        </div>
                                        <div className="self-stretch text-base font-bold tracking-wide text-zinc-900 truncate">
                                            {studentResult.quizzeScore}
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col gap-3.5 items-start justify-between w-full md:w-1/2">
                                        <div className="self-stretch text-base font-medium tracking-wide text-zinc-800">
                                            {t("certificate5")}
                                        </div>
                                        <div className="self-stretch text-base font-bold tracking-wide text-zinc-900 truncate">
                                            {studentResult.Institute_or_university}
                                        </div>
                                    </div>
                                </div>
                                {studentResult.files.length ?
                                    <div className="flex flex-col gap-3.5 items-start w-full md:w-1/2">
                                        <div className="self-stretch text-base font-medium tracking-wide text-zinc-800">
                                            {t("nav3")}
                                        </div>
                                        <div className="flex flex-col gap-4 items-start  rounded-lg ">
                                            <div className="flex gap-3.5 items-center  px-4 py-2.5 rounded border border-solid bg-neutral-50 border-zinc-300">
                                                <div>
                                                    <Image
                                                        src={`${studentResult.files[0]?.split(".")[1] === "pdf" ? "/images/pdf.png" :
                                                            studentResult.files[0]?.split(".")[1].toLowerCase() === "png" || studentResult.files[0]?.split(".")[1] === "webp" || studentResult.files[0]?.split(".")[1] === "jpeg" || studentResult.files[0]?.split(".")[1] === "jpg" || studentResult.files[0]?.split(".")[1] === "gif" || studentResult.files[0]?.split(".")[1] === "bmp" ||
                                                                studentResult.files[0]?.split(".")[1] === "svg" || studentResult.files[0]?.split(".")[1] === "tiff" ||
                                                                studentResult.files[0]?.split(".")[1] === "ico" || studentResult.files[0]?.split(".")[1] === "heic" ? "/images/png.png" :
                                                                studentResult.files[0]?.split(".")[1] === "pptx" ? "/images/ppt.png" :
                                                                    studentResult.files[0]?.split(".")[1] === "docx" ? "/images/doc.png" :
                                                                        studentResult.files[0]?.split(".")[1] === "xlsx" ? "/images/xls.png" : ""}`}
                                                        width={25} height={25} alt="" />
                                                </div>
                                                <div className="text-sm text-center text-black truncate">
                                                    {studentResult.files[0]?.slice(20)}.{studentResult.files[0]?.split(".")[1]}
                                                </div>
                                                <div className="flex cursor-pointer"
                                                    onClick={() => handleDownloadDocx(studentResult?.files[0])}>
                                                    <div className="flex justify-center items-center p-1 w-6 h-6">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : ""
                                }
                            </div>)
                    })}
                </div>
                <label className="flex gap-2 items-center self-start mt-6 tracking-wide cursor-pointer px-6" onClick={() => setAddNewStudentResults(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H16M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#365D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <div className="self-stretch my-auto text-primary">
                        {t("test10")}
                    </div>
                </label>
            </div>}

            {
                studentResults.length === 0 || addNewCertificate ? <div className="p-6 mx-auto mt-6 bg-white rounded-lg border border-solid border-zinc-100 ">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 mt-6 max-sm:grid-cols-1">
                            <div className="flex flex-col w-full ">
                                <label className="mb-1 font-medium text-zinc-900">{t("test")}</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border border-neutral-400 rounded uppercase"
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-full ">
                                <label className="mb-1 font-medium text-zinc-900">{t("test1")}</label>
                                <input
                                    type="text"
                                    name="testTitle"
                                    value={formData.testTitle}
                                    onChange={handleInputChange}
                                    placeholder={t("test4")}
                                    className="px-3 py-2 border border-neutral-400 rounded capitalize"
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-full ">
                                <label className="mb-1 font-medium text-zinc-900">{t("test2")}</label>
                                <input
                                    type="text"
                                    name="testGrade"
                                    value={formData.testGrade}
                                    onChange={handleInputChange}
                                    placeholder={t("certificate14")}
                                    className="px-3 py-2 border border-neutral-400 rounded capitalize"
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-full ">
                                <label className="mb-1 font-medium text-zinc-900">{t("certificate5")}</label>
                                <input
                                    type="text"
                                    name="universityInstitute"
                                    value={formData.universityInstitute}
                                    onChange={handleInputChange}
                                    placeholder={t("certificate13")}
                                    className="px-3 py-2 border border-neutral-400 rounded capitalize"
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex  items-center">
                                    <div className=" text-base tracking-wide leading-6 text-zinc-900">
                                        <span>{t("nav2")}</span>
                                        <span className="text-red-500">*</span>
                                    </div>
                                </div>
                                {!filesPreview ? (
                                    <label
                                        htmlFor="upload-certificate"
                                        className="flex gap-3 justify-start items-center px-2 py-1 bg-white rounded-lg border border-dashed border-primary max-sm:px-0 max-sm:py-4 w-full cursor-pointer"
                                    >
                                        <div className="flex shrink-0 justify-center items-center p-2.5 w-8 h-8 bg-slate-600 bg-opacity-10 rounded-full">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path
                                                    d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75"
                                                    stroke="#365D8D"
                                                    strokeWidth="0.875"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M9.91683 4.66667L7.00016 1.75L4.0835 4.66667"
                                                    stroke="#365D8D"
                                                    strokeWidth="0.875"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7 1.75V8.75"
                                                    stroke="#365D8D"
                                                    strokeWidth="0.875"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex gap-4 items-center max-sm:flex-col max-sm:gap-3 max-sm:text-center">
                                            <div className="text-sm tracking-wide leading-6 max-sm:text-center">
                                                <span className="text-primary">{t("certificate15")}{" "}</span>
                                                <span className="text-neutral-600">{t("certificate16")}</span> <br />
                                                <span className="text-neutral-600">
                                                    {t("certificate17")}
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                ) : (
                                    <div className="flex flex-col grow shrink self-stretch my-auto w-full">
                                        <div className="flex flex-col mt-1.5 w-full text-sm text-center rounded-lg max-md:max-w-full">
                                            <div className="flex flex-wrap gap-3.5 items-center px-4 py-2.5 w-full rounded border border-solid bg-neutral-50 border-zinc-300 max-md:max-w-full">
                                                <Image
                                                    src={`${filesPreview?.split(".")[1] === "pdf" ? "/images/pdf.png" :
                                                        filesPreview?.split(".")[1].toLowerCase() === "png" || filesPreview?.split(".")[1] === "webp" || filesPreview?.split(".")[1] === "jpeg" || filesPreview?.split(".")[1] === "jpg" || filesPreview?.split(".")[1] === "gif" || filesPreview?.split(".")[1] === "bmp" ||
                                                            filesPreview?.split(".")[1] === "svg" || filesPreview?.split(".")[1] === "tiff" ||
                                                            filesPreview?.split(".")[1] === "ico" || filesPreview?.split(".")[1] === "heic" ? "/images/png.png" :
                                                            filesPreview?.split(".")[1] === "pptx" ? "/images/ppt.png" :
                                                                filesPreview?.split(".")[1] === "docx" ? "/images/doc.png" :
                                                                    filesPreview?.split(".")[1] === "xlsx" ? "/images/xls.png" : ""}`}
                                                    width={25} height={25} alt="" />
                                                <div className="flex flex-col flex-1 shrink items-start self-stretch my-auto basis-0 min-w-[240px]">
                                                    <div className="text-black">
                                                        {filesPreview}
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 self-stretch my-auto w-6 h-6" />
                                                <svg
                                                    onClick={() => handleRemoveFile()} className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M5.6665 3.31301L5.81317 2.43967C5.91984 1.80634 5.99984 1.33301 7.1265 1.33301H8.87317C9.99984 1.33301 10.0865 1.83301 10.1865 2.44634L10.3332 3.31301" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12.5664 6.09277L12.1331 12.8061C12.0598 13.8528 11.9998 14.6661 10.1398 14.6661H5.85977C3.99977 14.6661 3.93977 13.8528 3.86644 12.8061L3.43311 6.09277" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6.88672 11H9.10672" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6.3335 8.33301H9.66683" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="files"
                                    value={formData.files}
                                    onChange={handleInputChange}
                                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    placeholder={t("certificate13")}
                                    className="hidden"
                                    id="upload-certificate"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end items-center mt-6 max-sm:flex-col max-sm:w-full">
                            <button className="h-12 text-base font-medium tracking-wide border border-solid border-zinc-300 rounded-[64px] text-stone-500 w-[230px] max-sm:w-full">
                                {t("lable18")}
                            </button>
                            {isLoading ? <div> <Spinner /> </div> :
                                <button className="h-12 text-base font-medium tracking-wide text-white border border-solid bg-primary border-primary rounded-[64px] w-[230px] max-sm:w-full">
                                    {t("lable17")}
                                </button>
                            }
                        </div>
                    </form>
                </div> : ""
            }
        </div >
    )
}

export default NewStudentResults
