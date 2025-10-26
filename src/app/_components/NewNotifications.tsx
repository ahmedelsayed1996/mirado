import { useTranslations } from 'next-intl';
import React from 'react'

function NewNotifications() {

    const t = useTranslations("Setting");

    return (
        <div className="flex flex-col w-[71%] max-md:w-full">
            <div className="flex overflow-hidden flex-col grow pb-6 w-full tracking-wide bg-white rounded-lg border border-solid border-zinc-100 max-md:mt-9 max-md:max-w-full">
                <div className="flex overflow-hidden flex-col justify-center items-start px-6 py-3 w-full text-sm font-bold whitespace-nowrap border-b border-solid border-b-zinc-100 text-slate-600 max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-2 items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9903 2.5C12.9108 2.5001 13.704 2.97412 14.1348 3.73633L14.212 3.87305L14.3546 3.94141C16.1781 4.81197 17.4405 6.67115 17.4405 8.82031V11.3496C17.4405 11.6164 17.4988 11.9419 17.5782 12.2354C17.638 12.4563 17.7168 12.6872 17.8087 12.8877L17.9053 13.0771L17.9122 13.0879L18.9122 14.748L18.9131 14.75C19.2234 15.2591 19.2776 15.8582 19.0723 16.4033C18.89 16.8871 18.5394 17.2677 18.085 17.4766L17.8839 17.5547L17.8809 17.5557C15.994 18.1879 14.0075 18.5 12.0196 18.5C10.156 18.5 8.29464 18.2259 6.51569 17.6631L6.16119 17.5469L6.16022 17.5459L5.93658 17.458C5.50806 17.2634 5.1846 16.9584 5.00104 16.5967L4.92096 16.4111L4.91901 16.4072L4.85944 16.209C4.74691 15.7403 4.8281 15.2335 5.11725 14.748L5.11823 14.749L6.12799 13.0791L6.1319 13.0723C6.2675 12.8398 6.3813 12.5284 6.461 12.2354C6.5406 11.9426 6.59967 11.6165 6.59967 11.3496V8.82031C6.59967 6.83191 7.68468 5.0887 9.29401 4.14551L9.62311 3.96777L9.7608 3.89844L9.836 3.76367C10.2689 2.98954 11.084 2.5 11.9903 2.5Z" fill="#365D8D" stroke="#365D8D" />
                            <path d="M10.2464 20.627V20.6279C10.8282 20.679 11.4229 20.71 12.0198 20.71C12.4604 20.71 12.8998 20.6924 13.3333 20.6621L13.764 20.6279H13.7679C13.8102 20.6239 13.8569 20.6192 13.9066 20.6152C13.4454 21.1563 12.7619 21.4999 12.0003 21.5C11.3414 21.5 10.6922 21.2318 10.2396 20.7627L10.222 20.7451L10.1302 20.6523C10.1183 20.6395 10.1076 20.6255 10.096 20.6123C10.146 20.6172 10.1961 20.6227 10.2464 20.627Z" stroke="#365D8D" />
                        </svg>
                        <div className="self-stretch my-auto text-slate-600">
                           {t("head2")}
                        </div>
                    </div>
                </div>
                <h3 className='ps-5 pt-5'>{t("lable")}</h3>
                {/* <div className="flex flex-col self-center mt-6 max-w-full text-xs w-[865px]">
                    <div className="flex overflow-hidden flex-col items-center w-full border-b border-solid border-b-zinc-100 max-md:max-w-full">
                        <div className="self-stretch pb-2 w-full text-base font-semibold border-b border-solid border-b-zinc-100 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                            Email Notifications
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    New Message Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Notify you when they receive a new email.
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5778b86fc4a1ef35ddcd2fb12665e7fc6f4022c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain shrink-0 my-auto w-5 aspect-square"
                            />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between px-px py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Important Updates Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Alerts about important account or program updates.
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5778b86fc4a1ef35ddcd2fb12665e7fc6f4022c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain shrink-0 my-auto w-5 aspect-square"
                            />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between px-px py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Promotional or News Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Notifications about special offers or site news.
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5778b86fc4a1ef35ddcd2fb12665e7fc6f4022c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain shrink-0 my-auto w-5 aspect-square"
                            />
                        </div>
                    </div>
                    <div className="flex overflow-hidden flex-col items-center mt-4 w-full border-b border-solid border-b-zinc-100 max-md:max-w-full">
                        <div className="self-stretch pb-2 w-full text-base font-semibold border-b border-solid border-b-zinc-100 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                            Payment Notifications
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between px-px py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Successful Payment Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Notify you when a payment is successfully processed or a
                                    service is registered.
                                </div>
                            </div>
                            <div className="flex shrink-0 my-auto w-5 h-5 rounded-sm border border-gray-500 border-solid" />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Pending Payment Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Remind you about pending or overdue payments.
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5778b86fc4a1ef35ddcd2fb12665e7fc6f4022c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain shrink-0 my-auto w-5 aspect-square"
                            />
                        </div>
                    </div>
                    <div className="flex overflow-hidden flex-col items-center mt-4 w-full border-b border-solid border-b-zinc-100 max-md:max-w-full">
                        <div className="self-stretch pb-2 w-full text-base font-semibold border-b border-solid border-b-zinc-100 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                            Academic (Program) Notifications
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Application Acceptance Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Notify you when their university or program application
                                    is accepted.
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5778b86fc4a1ef35ddcd2fb12665e7fc6f4022c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain shrink-0 my-auto w-5 aspect-square"
                            />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Important Date Reminders
                                </div>
                                <div className="text-neutral-400">
                                    Alerts for registration deadlines or document submission
                                    dates
                                </div>
                            </div>
                            <div className="flex shrink-0 my-auto w-5 h-5 rounded-sm border border-gray-500 border-solid" />
                        </div>
                    </div>
                    <div className="flex overflow-hidden flex-col items-center mt-4 w-full border-b border-solid border-b-zinc-100 max-md:max-w-full">
                        <div className="self-stretch pb-2 w-full text-base font-semibold border-b border-solid border-b-zinc-100 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                            Account Privacy Notifications
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Password or Email Change Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Notify you when their account details (email or
                                    password) are changed.
                                </div>
                            </div>
                            <div className="flex shrink-0 my-auto w-5 h-5 rounded-sm border border-gray-500 border-solid" />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Suspicious Login Alerts
                                </div>
                                <div className="text-neutral-400">
                                    Alert you if there is any suspicious login attempt on
                                    their account.
                                </div>
                            </div>
                            <div className="flex shrink-0 my-auto w-5 h-5 rounded-sm border border-gray-500 border-solid" />
                        </div>
                    </div>
                    <div className="flex overflow-hidden flex-col items-center mt-4 w-full max-md:max-w-full">
                        <div className="self-stretch pb-2 w-full text-base font-semibold border-b border-solid border-b-zinc-100 text-zinc-900 max-md:pr-5 max-md:max-w-full">
                            Social Network or Activity Notifications
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full border-b border-solid border-b-zinc-100 w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    Content Interaction Notifications
                                </div>
                                <div className="text-neutral-400">
                                    Alert you when their posts or content get likes,
                                    comments, or shares.
                                </div>
                            </div>
                            <div className="flex shrink-0 my-auto w-5 h-5 rounded-sm border border-gray-500 border-solid" />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-between py-1 mt-3.5 max-w-full w-[834px]">
                            <div className="flex flex-col">
                                <div className="self-start font-medium text-zinc-900">
                                    New Event Notifications
                                </div>
                                <div className="text-neutral-400">
                                    Notify you about upcoming events, workshops, or new
                                    educational programs.
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5778b86fc4a1ef35ddcd2fb12665e7fc6f4022c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                                className="object-contain shrink-0 my-auto w-5 aspect-square"
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default NewNotifications
