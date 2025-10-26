import Image from "next/image"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import useCleanPath from "../_hooks/useCleanPath";
import { parseCookies } from "nookies";
import useCurrentLang from "../_hooks/useCurrentLang";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { getUser } from "../reduxTool-kit/slices/userSlice";
import Spinner from "./Spinner";

function NewMyDocs({ currentUser }: any) {

    const [files, setFiles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addFile, setAddFile] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [filesPreview, setFilesPreview] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { cleanPath } = useCleanPath();
    const { tokenMainSite } = parseCookies();
    const locale = useCurrentLang();
    const t = useTranslations("Profile");

    const handleSubmit = async () => {
        
        setIsLoading(true);
        const formData = new FormData();
        files.forEach((file: any) => {
            formData.append(`files`, file);
        });
         
       try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenMainSite}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        setIsLoading(false);
        setAddFile(false);
        throw new Error(result.message || t("fileUploadFailed", { message: "Unknown error" }));
      }

      const result = await res.json();
      setAddFile(false);
      toast.success(result.message || t("fileUploadSuccess"));
      setIsLoading(false);
      dispatch(getUser({ tokenMainSite, locale }));
      setFilesPreview([]);
    } catch (error: any) {
      toast.error(error.message || t("fileUploadFailed", { message: "Unknown error" }));
      setIsLoading(false);
    }
  };

    const handleFileChange = (e: any) => {
        setAddFile(true);
        const selectedFiles = Array.from(e.target.files);

        const previewUrls = selectedFiles.map((file: any) => {
            if (file.type.startsWith('image/')) {
                return { url: URL.createObjectURL(file), type: 'image' };
            } else if (file.type === 'application/pdf') {
                return { url: '', type: 'pdf' };
            }
            return { url: '', type: 'other' };
        });

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setFilesPreview((prevPreviews: any) => [...prevPreviews, ...previewUrls]);
    };

    const handleRemoveFile = (index: any) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setFilesPreview((prevPreviews: any) => prevPreviews.filter((_: any, i: any) => i !== index))
    };

    const ConfirmDeletedDocs = async () => {
        // console.log("ele", ele);
        if (!selectedFile) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append("deleted_files[0]", selectedFile);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${tokenMainSite}`,
            },
            body: formData,
        })
        if (!res.ok) {
            const result = await res.json();
            setIsLoading(false);
            throw new Error(result.message);
        }

        const result = await res.json();
        // console.log(result);

        toast.success(t("docx6"));
        dispatch(getUser({ tokenMainSite, locale }));
        setAlert(false);
        setIsLoading(false);
    }

    const handleDeleteDocs = async (id: string) => {
        setSelectedFile(id);
        setAlert(true);
    }

    const handleDownloadDocx = async (docxPath: any) => {
        console.log(docxPath.slice(13));

        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/download/${docxPath.slice(13)}`, {
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



    return (
        <div className="flex flex-col bg-zinc-100 min-h-[screen] my-5">
            {alert ?
                <div className="flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-50 size-full z-30">
                    <div className="bg-white rounded-3xl w-[665px]">
                        <div className="flex justify-between items-center px-6 py-3 border-b border-solid border-b-zinc-100">
                            <div className="text-2xl font-bold text-zinc-900">{t("docx3")}</div>
                            <div className="cursor-pointer" onClick={() => setAlert(false)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0002 10.8287L5.79975 15.0291C5.68447 15.1444 5.54725 15.2017 5.38808 15.201C5.22878 15.2001 5.0901 15.1407 4.97204 15.0226C4.85829 14.9046 4.80253 14.7683 4.80475 14.6139C4.80683 14.4596 4.86475 14.3256 4.9785 14.2118L9.17246 10.001L4.9785 5.79015C4.87003 5.68182 4.81447 5.54911 4.81183 5.39202C4.8092 5.23494 4.86475 5.09737 4.9785 4.97932C5.09225 4.86126 5.22739 4.8005 5.38392 4.79702C5.54045 4.79355 5.67906 4.85084 5.79975 4.9689L10.0002 9.17327L14.2045 4.9689C14.3172 4.85626 14.4531 4.80029 14.6123 4.80098C14.7716 4.80182 14.9116 4.86126 15.0323 4.97932C15.1434 5.09737 15.1978 5.23362 15.1956 5.38807C15.1935 5.54237 15.1356 5.6764 15.0218 5.79015L10.8279 10.001L15.0218 14.2118C15.1303 14.3201 15.1859 14.4529 15.1885 14.6099C15.1911 14.767 15.1356 14.9046 15.0218 15.0226C14.9081 15.1407 14.7729 15.2015 14.6164 15.2049C14.4599 15.2084 14.3226 15.1498 14.2045 15.0291L10.0002 10.8287Z" fill="#A5A5A5" />
                                </svg>
                            </div>
                        </div>
                        <div className="px-6 py-5 text-xl font-semibold text-zinc-900">
                            {t("docx4")}
                        </div>
                        <div className="flex gap-1.5 justify-end p-6">
                            <button onClick={() => setAlert(false)} className="h-12 text-base font-medium border border-solid cursor-pointer border-zinc-300 rounded-[64px] text-stone-500 w-[230px] max-sm:w-full">
                                {t("lable18")}
                            </button>
                            {isLoading ? <div> <Spinner /></div> :
                                <button onClick={ConfirmDeletedDocs} className="w-40 h-12 text-base text-white bg-rose-700 cursor-pointer border-[none] rounded-[64px]">
                                    {t("docx5")}
                                </button>}
                        </div>
                    </div>
                </div>
                : <>
                    <div className="flex overflow-hidden flex-col bg-zinc-100">
                        <div className="flex overflow-hidden flex-col self-center pb-40 mt-5 w-full bg-white rounded-lg border border-solid border-zinc-100 max-md:max-w-full">
                            {currentUser.files?.length === 0 && !addFile ?
                                <div className="flex flex-col gap-2 items-center pt-40">

                                    <Image src="/images/Write Content.png" width={200} height={200} alt="Write Content" />
                                    <div className="text-sm text-center text-zinc-800">
                                        {t("docx1")}
                                    </div>

                                    <div className="flex gap-2.5 justify-center items-center self-stretch text-sm font-medium text-white  rounded-md mt-4">
                                        <div className="flex  gap-2.5 items-center my-auto ">
                                            <label
                                                htmlFor="file-upload"
                                                className="flex items-center rounded-3xl gap-2 border border-primary px-12 py-3 text-sm font-medium  bg-primary text-white focus:outline-none transition-all duration-300 cursor-pointer"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 16.501C13.125 16.501 16.5 13.126 16.5 9.00098C16.5 4.87598 13.125 1.50098 9 1.50098C4.875 1.50098 1.5 4.87598 1.5 9.00098C1.5 13.126 4.875 16.501 9 16.501Z" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6 9.00098H12" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9 12.001V6.00098" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {t("nav10")}
                                            </label>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                : <>
                                    <div className="flex overflow-hidden flex-col justify-center items-start px-6 py-4 text-lg font-medium tracking-wide text-center border-b border-solid border-b-zinc-100 text-zinc-900 max-md:px-5 max-md:mr-0.5 max-md:max-w-full">
                                        <div className="flex gap-2 justify-center items-center">
                                            <div className="self-stretch my-auto text-zinc-900">
                                                {t("docx2")}
                                            </div>
                                            <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">{currentUser.files?.length}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col px-6 mt-6 mb-0 w-full max-md:px-5 max-md:mb-2.5 max-md:max-w-full">
                                        <div className="flex flex-wrap gap-6 items-center">
                                            {currentUser.files && currentUser.files.map((file: any, index: number) => {
                                                return (<div key={index} className="flex flex-col grow shrink self-stretch my-auto min-w-[240px] w-[451px] max-md:max-w-full">
                                                    <div className="flex flex-col mt-1.5 w-full text-sm text-center rounded-lg max-md:max-w-full">
                                                        <div className="flex flex-wrap gap-3.5 items-center px-4 py-2.5 w-full rounded border border-solid bg-neutral-50 border-zinc-300 max-md:max-w-full">
                                                            <Image
                                                                src={`${file.split(".")[1] === "pdf" ? "/images/pdf.png" :
                                                                    file.split(".")[1].toLowerCase() === "png" || file.split(".")[1] === "webp" || file.split(".")[1] === "jpeg" || file.split(".")[1] === "jpg" || file.split(".")[1] === "gif" || file.split(".")[1] === "bmp" ||
                                                                        file.split(".")[1] === "svg" || file.split(".")[1] === "tiff" ||
                                                                        file.split(".")[1] === "ico" || file.split(".")[1] === "heic" ? "/images/png.png" :
                                                                        file.split(".")[1] === "pptx" ? "/images/ppt.png" :
                                                                            file.split(".")[1] === "docx" ? "/images/doc.png" :
                                                                                file.split(".")[1] === "xlsx" ? "/images/xls.png" : ""}`}
                                                                width={25} height={25} alt="" />
                                                            <div className="flex flex-col flex-1 shrink items-start self-stretch my-auto basis-0 min-w-[240px]">
                                                                <div className="text-black" >{file.slice(13)}</div>
                                                                {/* <div className="mt-2 leading-none text-stone-500">
                                                                750.00kB
                                                            </div> */}
                                                            </div>
                                                            <div className="flex shrink-0 self-stretch my-auto w-6 h-6" />
                                                            <svg
                                                                onClick={() => handleDeleteDocs(file)} className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M5.6665 3.31301L5.81317 2.43967C5.91984 1.80634 5.99984 1.33301 7.1265 1.33301H8.87317C9.99984 1.33301 10.0865 1.83301 10.1865 2.44634L10.3332 3.31301" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12.5664 6.09277L12.1331 12.8061C12.0598 13.8528 11.9998 14.6661 10.1398 14.6661H5.85977C3.99977 14.6661 3.93977 13.8528 3.86644 12.8061L3.43311 6.09277" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M6.88672 11H9.10672" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M6.3335 8.33301H9.66683" stroke="#C30734" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <svg onClick={() => handleDownloadDocx(file)} className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>)
                                            })}
                                        </div>
                                        <input
                                            id="file-upload-2"
                                            type="file"
                                            className="hidden"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="file-upload-2" className="flex gap-2 items-center self-start mt-6 tracking-wide cursor-pointer">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12H16M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#365D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <div className="self-stretch my-auto text-primary">
                                                {t("nav10")}
                                            </div>
                                        </label>
                                        <div className="flex relative px-6 pt-6 pb-16 mt-8 w-full text-base font-medium text-black  rounded-3xl max-md:px-5 max-md:max-w-full">
                                            {filesPreview.length > 0 ? (
                                                <div className="flex gap-7 overflow-x-auto whitespace-nowrap">
                                                    {filesPreview.map((filePreview: any, index: number) => (
                                                        <div key={index} className="relative inline-block w-36 h-36">
                                                            {filePreview.type === 'image' ? (
                                                                <div className="w-36 h-36 flex items-center justify-center rounded-full">
                                                                    <Image
                                                                        src={filePreview.url}
                                                                        width={144}
                                                                        height={144}
                                                                        alt={`Document Preview ${index}`}
                                                                        className="w-full h-full rounded-full object-contain cursor-pointer"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="w-36 h-36 flex items-center justify-center border rounded-full bg-gray-200">
                                                                    <span className="text-lg font-bold">PDF</span>
                                                                </div>
                                                            )}

                                                            <button
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                                                                onClick={() => handleRemoveFile(index)}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : ""}
                                        </div>
                                        {addFile && <>{isLoading ? <Spinner /> : <button
                                            onClick={handleSubmit}
                                            className="flex items-center mt-2 justify-center text-center p-3 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-80 mx-auto"
                                        >
                                            {t("lable19")}
                                        </button>}</>}

                                    </div>
                                </>}
                        </div>

                    </div>

                </>}
        </div>
    )
}

export default NewMyDocs
