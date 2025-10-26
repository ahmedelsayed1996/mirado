import React, { useState } from 'react'
import Link from "next/link";
import { useRef } from "react";
import { useDispatch } from 'react-redux';
import { parseCookies } from 'nookies';
import useCurrentLang from '../_hooks/useCurrentLang';
import { toast } from 'react-toastify';
import { getUser } from '../reduxTool-kit/slices/userSlice';
import Image from 'next/image';
import Spinner from './Spinner';
import { AppDispatch } from '../store';
import { useTranslations } from 'next-intl';
import useCleanPath from '../_hooks/useCleanPath';

function MyDocs({ currentUser }: any) {

  const fileInputRef = useRef(null);
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
    // throw new Error('Function not implemented.');
    setIsLoading(true);
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append(`files`, file);
    });
    console.log("files", files);

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
      throw new Error(result.message);
    }

    const result = await res.json();
    setAddFile(false);
    toast.success("Data Update Successfully");
    setIsLoading(false);
    dispatch(getUser({ tokenMainSite, locale }));
    setFilesPreview([]);
  }

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
    console.log(result);

    toast.success("Data Update Successfully");
    dispatch(getUser({ tokenMainSite, locale }));
    setAlert(false);
    setIsLoading(false);
  }

  const handleDeleteDoxc = async (id: string) => {
    setSelectedFile(id);
    setAlert(true);
  }

  // const cleanPath = (file: string) => {
  //   const match = file.match(/upload\/.*/);
  //   return match ? match[0] : file;
  // };

  return (
    <div className="flex overflow-hidden flex-col self-start p-2 md:p-4 lg:p-8 pb-4 bg-white rounded-3xl border border-gray border-solid  w-full md:w-4/6  max-md:max-w-full">
      {alert ?
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div role="alert" className="rounded-xl border border-gray bg-white p-4 mx-auto z-10">
            <div className="flex items-start gap-4">
              <span className="text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <strong className="block font-medium text-gray-900">My Documents Delete</strong>

                <p className="mt-1 text-sm text-gray-700">Are you sure to delete this Documents..?</p>

                <div className="mt-4 flex justify-center gap-2">
                  {isLoading ? <Spinner /> :
                    <button
                      onClick={ConfirmDeletedDocs}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-white hover:text-primary hover:border hover:border-primary"
                    >
                      <span className="text-sm "> Delete </span>
                    </button>
                  }

                  <button className="block rounded-lg px-4 py-2 text-primary border border-primary transition hover:bg-primary hover:text-white"
                    onClick={() => setAlert(false)}
                  >
                    <span className="text-sm">Cancel</span>
                  </button>
                </div>
              </div>

              <button className="text-gray-500 transition  hover:border hover:border-gray rounded"
                onClick={() => setAlert(false)}
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div> :
        <>
          <div className="flex flex-col w-full text-start max-md:max-w-full">
            <div className="flex  gap-2.5 items-center justify-between w-full max-md:max-w-full">
              <div className="flex gap-2">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="35" height="35" rx="17.5" fill="#1E4C83" />
                  <path d="M25 22.5C25 25.3284 25 26.7426 24.1213 27.6213C23.2426 28.5 21.8284 28.5 19 28.5H17C14.1716 28.5 12.7574 28.5 11.8787 27.6213C11 26.7426 11 25.3284 11 22.5V18.5M11 14.5C11 11.6716 11 10.2574 11.8787 9.37868C12.7574 8.5 14.1716 8.5 17 8.5H19C21.8284 8.5 23.2426 8.5 24.1213 9.37868C25 10.2574 25 11.6716 25 14.5V18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M11 10.5781C10.0249 10.674 9.36857 10.8908 8.87868 11.3807C8 12.2594 8 13.6736 8 16.502V20.502C8 23.3304 8 24.7446 8.87868 25.6233C9.36857 26.1132 10.0249 26.33 11 26.4259" stroke="white" strokeWidth="1.5" />
                  <path d="M25 10.5781C25.9751 10.674 26.6314 10.8908 27.1213 11.3807C28 12.2594 28 13.6736 28 16.502V20.502C28 23.3304 28 24.7446 27.1213 25.6233C26.6314 26.1132 25.9751 26.33 25 26.4259" stroke="white" strokeWidth="1.5" />
                  <path d="M15 19.5H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 15.5H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 23.5H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className=" my-auto text-base text-nowrap md:text-lg font-bold text-blue-900  max-md:max-w-full">
                  {t("nav1")}
                </div>
              </div>

              <div className="flex gap-2.5 justify-center items-center self-stretch text-sm font-medium text-white  rounded-md ">
                <div className="flex  gap-2.5 items-center self-stretch my-auto w-[200px] basis-0  max-md:max-w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center text-center p-2 md:p-4 whitespace-nowrap text-white bg-primary rounded-xl md:px-5  border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 md:w-80 mx-auto cursor-pointer"
                  >
                    <div className="font-bold lg:text-3xl mx-2 justify-center items-center">
                      +
                    </div>
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

          </div>
          <div className="flex relative px-6 pt-6 pb-16 mt-8 w-full text-base font-medium text-black bg-white rounded-3xl border border-solid border-zinc-100 min-h-[308px] max-md:px-5 max-md:max-w-full">
            {filesPreview.length > 0 ? (
              <div className="flex gap-7 overflow-x-auto whitespace-nowrap">
                {filesPreview.map((filePreview: any, index: number) => (
                  <div key={index} className="relative inline-block w-36 h-36">
                    {filePreview.type === 'image' ? (
                      <div className="w-36 h-36 flex items-center justify-center  rounded-full">
                        <Image
                          src={filePreview.url}
                          width={150}
                          height={150}
                          alt={`Document Preview ${index}`}
                          className="rounded-full object-contain  h-full cursor-pointer"
                          style={{ objectFit: 'cover' }}
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
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex gap-7 overflow-x-auto whitespace-nowrap">
                <div className="w-full h-36 flex items-center justify-center rounded-full ">
                  {currentUser.files && currentUser.files.map((file: any, index: number) => {
                    return (
                      <div key={index} className="relative mx-1 ">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(file)}`}
                          width={150}
                          height={150}
                          alt={`Document Preview ${index}`}
                          className="rounded-full object-contain h-full cursor-pointer mx-1"
                          style={{ objectFit: 'cover' }}
                          onClick={() => setSelectedImage(`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(file)}`)}
                        />
                        <button
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer my-2"
                          onClick={() => handleDeleteDoxc(file)}
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>

              </div>
            </div>
            {selectedImage && (
              <div
                className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                onClick={() => setSelectedImage(null)}
              >
                <Image
                  src={selectedImage}
                  width={800}
                  height={800}
                  alt="Large Document Preview"
                  className="rounded object-contain"
                  style={{ maxHeight: '90%', maxWidth: '90%' }}
                />


              </div>
            )}
          </div>
          {addFile && <>{isLoading ? <Spinner /> : <button
            onClick={handleSubmit}
            className="flex items-center mt-2 justify-center text-center p-3 whitespace-nowrap text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 w-80 mx-auto"
          >
            {t("lable19")}
          </button>}</>}
        </>}
    </div>
  );
}
export default MyDocs