"use client"
import React, { useState } from 'react'
import useCurrentLang from '../_hooks/useCurrentLang';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { useTranslations } from 'next-intl';
import { parseCookies } from 'nookies';

function ChangePassword() {
    const language = useCurrentLang();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const t = useTranslations("Setting");
      const { tokenMainSite } = parseCookies();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!oldPassword) newErrors.oldPassword = 'Old password is required';
        if (!newPassword) newErrors.newPassword = 'New password is required';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
        if (newPassword && confirmPassword && newPassword !== confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log({ oldPassword, newPassword });
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/change-password`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenMainSite}`,
                        "Accept-Language": language,
                    },
                    body: JSON.stringify({
                        "old_password": oldPassword,
                        "new_password": newPassword
                    }),
                });

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.message);
                }

                const result = await response.json();
                setNewPassword('');
                setOldPassword('');

                toast.success(result.message);
                // router.push(`/${language}/verify-mail`);
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col  w-[71%] max-md:w-full">
            <div className="flex overflow-hidden flex-col grow pb-6 w-full tracking-wide bg-white rounded-lg border border-solid border-zinc-100 max-md:mt-9 max-md:max-w-full">
                <div className="flex overflow-hidden flex-col justify-center items-start px-6 py-3 w-full text-sm font-bold whitespace-nowrap border-b border-solid border-b-zinc-100 text-slate-600 max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-2 items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1.75C14.9113 1.75 16.4218 2.66912 17.2344 3.8252C18.0724 5.01757 18.25 6.57122 18.25 8V9.5459C18.0886 9.53321 17.9219 9.52206 17.75 9.51465V8C17.75 6.40247 17.5302 4.9344 16.6436 3.87305C15.7398 2.7913 14.2487 2.25 12 2.25C9.75134 2.25 8.26022 2.7913 7.35645 3.87305C6.46981 4.9344 6.25 6.40247 6.25 8V9.51465C6.07808 9.52206 5.91142 9.53321 5.75 9.5459V8C5.75 6.57122 5.92759 5.01757 6.76562 3.8252C7.57816 2.66912 9.08867 1.75 12 1.75Z" stroke="#365D8D" />
                            <path d="M17.2412 10.5L17.6396 10.5107C17.8969 10.5208 18.137 10.5359 18.3604 10.5576L18.6826 10.5957L18.6895 10.5967C19.8929 10.743 20.5308 11.0933 20.9102 11.6836C21.3189 12.3199 21.5 13.3361 21.5 15V17C21.5 19.0036 21.2375 20.0555 20.6465 20.6465C20.0555 21.2375 19.0036 21.5 17 21.5H7C4.99643 21.5 3.94451 21.2375 3.35352 20.6465C2.76252 20.0555 2.5 19.0036 2.5 17V15C2.5 13.3361 2.68114 12.3199 3.08984 11.6836C3.42173 11.1671 3.95144 10.8343 4.88477 10.6611L5.31055 10.5967L5.31738 10.5957C5.62757 10.5534 5.97463 10.5258 6.36035 10.5107L6.75879 10.5H17.2412ZM8.98145 14.8604C8.58751 14.5229 8.02914 14.4088 7.52832 14.5801L7.44043 14.6133C7.23748 14.6913 7.08578 14.8003 6.95508 14.918L6.93555 14.9355L6.91797 14.9551C6.79153 15.0956 6.69064 15.2538 6.61816 15.4277C6.54689 15.5988 6.5 15.7942 6.5 16C6.5 16.3963 6.66487 16.7772 6.92676 17.0537L6.94043 17.0684L6.95508 17.082C7.08297 17.1971 7.2313 17.3032 7.42773 17.3809V17.3818C7.43057 17.383 7.43367 17.3836 7.43652 17.3848C7.43787 17.3853 7.43908 17.3862 7.44043 17.3867V17.3857C7.60859 17.4542 7.79909 17.5 8 17.5C8.39627 17.5 8.77717 17.3351 9.05371 17.0732L9.07324 17.0537C9.33513 16.7772 9.5 16.3963 9.5 16C9.5 15.7942 9.45311 15.5988 9.38184 15.4277C9.30936 15.2538 9.20847 15.0956 9.08203 14.9551L9.07324 14.9453L9.06348 14.9365L8.98145 14.8604ZM12.9473 14.834C12.405 14.4072 11.5874 14.4028 11.0479 14.8369L10.9365 14.9365L10.9268 14.9463C10.6667 15.2209 10.5 15.5912 10.5 16C10.5 16.2058 10.5469 16.4012 10.6182 16.5723C10.6906 16.7462 10.7915 16.9044 10.918 17.0449L10.9316 17.0596L10.9463 17.0732C11.2209 17.3333 11.5912 17.5 12 17.5C12.3963 17.5 12.7772 17.3351 13.0537 17.0732L13.0684 17.0596L13.082 17.0449C13.2085 16.9044 13.3094 16.7462 13.3818 16.5723C13.4531 16.4012 13.5 16.2058 13.5 16C13.5 15.6423 13.3722 15.3141 13.166 15.0537L13.0732 14.9463L13.0664 14.9385L13.0586 14.9316L12.9473 14.834ZM16.9521 14.8369C16.3742 14.3719 15.4772 14.4101 14.9414 14.9316L14.9336 14.9385L14.9268 14.9463C14.6667 15.2209 14.5 15.5912 14.5 16C14.5 16.3577 14.6278 16.6859 14.834 16.9463L14.9268 17.0537L14.9463 17.0732C15.2228 17.3351 15.6037 17.5 16 17.5C16.3963 17.5 16.7772 17.3351 17.0537 17.0732L17.0732 17.0537C17.3351 16.7772 17.5 16.3963 17.5 16C17.5 15.8973 17.4832 15.7893 17.4746 15.7295H17.4756L17.4736 15.7178L17.4316 15.5518L17.3672 15.3965C17.3326 15.3112 17.287 15.2206 17.2207 15.1377H17.2197C17.1748 15.0735 17.1335 15.0187 17.1006 14.9775L17.083 14.9561L17.0635 14.9365L16.9521 14.8369Z" fill="#365D8D" stroke="#365D8D" />
                        </svg>
                        <div className="self-stretch my-auto text-slate-600">
                            {t("head3")}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-6 mt-7 w-full max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-col px-6 mt-7 w-full max-md:px-5 max-md:max-w-full">
                        {/* Old Password */}
                        <div className="flex flex-col w-full max-md:max-w-full">
                            <label className="flex flex-wrap gap-1 items-center text-base font-medium text-zinc-900">
                              {t("lable1")} <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="mt-2 px-4 py-3 w-full text-sm bg-white rounded border border-gray border-solid text-zinc-600"
                                placeholder={t("lable2")}
                            />
                            {errors.oldPassword && (
                                <p className="text-sm text-rose-500 mt-1">{errors.oldPassword}</p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-5 mt-7">
                            <div className="flex flex-col flex-1">
                                <label className="flex gap-1 items-center text-base font-medium text-zinc-900">
                                   {t("lable3")} <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-2 px-4 py-3 w-full text-sm bg-white rounded border border-gray border-solid text-zinc-600"
                                    placeholder={t("lable4")}
                                />
                                {errors.newPassword && (
                                    <p className="text-sm text-rose-500 mt-1">{errors.newPassword}</p>
                                )}
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="flex gap-1 items-center text-base font-medium text-zinc-900">
                                    {t("lable5")} <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-2 px-4 py-3 w-full text-sm bg-white rounded border border-gray border-solid text-zinc-600"
                                    placeholder={t("lable6")}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-rose-500 mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2 items-center self-end mt-8 text-base font-medium tracking-wide whitespace-nowrap max-md:max-w-full">
                            <div className="flex gap-1 justify-center items-center px-4 py-0 border border-zinc-300 min-h-[48px] rounded-[64px] text-stone-500 w-[230px] cursor-pointer">
                              {t("lable8")}  
                            </div>
                            {isLoading ? <Spinner /> :
                                <button
                                    type="submit"
                                    className="flex gap-1 justify-center items-center px-4 py-0 text-white border bg-primary border-primary min-h-[48px] rounded-[64px] w-[230px]"
                                >
                                  {t("lable7")}
                                </button>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ChangePassword
