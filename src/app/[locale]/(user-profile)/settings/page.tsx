"use client"
import ChangePassword from "@/app/_components/ChangePassword";
import LogOut from "@/app/_components/LogOut";
import NewNotifications from "@/app/_components/NewNotifications";
import ProtectedRoute from "@/app/_components/ProtectedRoute";
import { useTranslations } from "next-intl";
import { useState } from "react"

function Setting() {
  const t = useTranslations("Setting");
  const [activeButton, setActiveButton] = useState<string>("changePassword");
  const handleClose = () => {
    setActiveButton("changePassword");
  }
  return (
    <ProtectedRoute >
      <div className="flex overflow-hidden flex-col bg-zinc-100">
        <div className="self-center my-8 w-full max-w-[1325px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex overflow-hidden flex-col pb-96 w-full text-sm font-medium tracking-wide bg-white rounded-lg border border-solid border-zinc-100 text-zinc-900 max-md:pb-24 max-md:mt-9">
                <div className="overflow-hidden px-6 py-2.5 text-base whitespace-nowrap border-b border-solid border-b-zinc-100 text-zinc-900 max-md:px-5">
                  {t("head")}
                </div>
                <div className="flex flex-col mt-6">
                  {/* <div className={`flex overflow-hidden flex-col justify-center items-start px-5 py-3 w-full text-black border-b border-solid hover:bg-slate-600 hover:bg-opacity-10 border-b-zinc-100 hover:text-primary cursor-pointer ${activeButton === "notifications" ? "bg-slate-600 bg-opacity-10 text-primary font-bold" : ""}`} onClick={() => setActiveButton("notifications")}>
                    <div className="flex gap-2 items-center">
                      {activeButton === "notifications" ?
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9903 2.5C12.9108 2.5001 13.704 2.97412 14.1348 3.73633L14.212 3.87305L14.3546 3.94141C16.1781 4.81197 17.4405 6.67115 17.4405 8.82031V11.3496C17.4405 11.6164 17.4988 11.9419 17.5782 12.2354C17.638 12.4563 17.7168 12.6872 17.8087 12.8877L17.9053 13.0771L17.9122 13.0879L18.9122 14.748L18.9131 14.75C19.2234 15.2591 19.2776 15.8582 19.0723 16.4033C18.89 16.8871 18.5394 17.2677 18.085 17.4766L17.8839 17.5547L17.8809 17.5557C15.994 18.1879 14.0075 18.5 12.0196 18.5C10.156 18.5 8.29464 18.2259 6.51569 17.6631L6.16119 17.5469L6.16022 17.5459L5.93658 17.458C5.50806 17.2634 5.1846 16.9584 5.00104 16.5967L4.92096 16.4111L4.91901 16.4072L4.85944 16.209C4.74691 15.7403 4.8281 15.2335 5.11725 14.748L5.11823 14.749L6.12799 13.0791L6.1319 13.0723C6.2675 12.8398 6.3813 12.5284 6.461 12.2354C6.5406 11.9426 6.59967 11.6165 6.59967 11.3496V8.82031C6.59967 6.83191 7.68468 5.0887 9.29401 4.14551L9.62311 3.96777L9.7608 3.89844L9.836 3.76367C10.2689 2.98954 11.084 2.5 11.9903 2.5Z" fill="#365D8D" stroke="#365D8D" />
                          <path d="M10.2464 20.627V20.6279C10.8282 20.679 11.4229 20.71 12.0198 20.71C12.4604 20.71 12.8998 20.6924 13.3333 20.6621L13.764 20.6279H13.7679C13.8102 20.6239 13.8569 20.6192 13.9066 20.6152C13.4454 21.1563 12.7619 21.4999 12.0003 21.5C11.3414 21.5 10.6922 21.2318 10.2396 20.7627L10.222 20.7451L10.1302 20.6523C10.1183 20.6395 10.1076 20.6255 10.096 20.6123C10.146 20.6172 10.1961 20.6227 10.2464 20.627Z" stroke="#365D8D" />
                        </svg>
                        :
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6.43945V9.76945" stroke="#365D8D" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" />
                          <path d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z" stroke="#365D8D" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" />
                          <path d="M15.33 18.8203C15.33 20.6503 13.83 22.1503 12 22.1503C11.09 22.1503 10.25 21.7703 9.64998 21.1703C9.04998 20.5703 8.66998 19.7303 8.66998 18.8203" stroke="#365D8D" strokeWidth="1.5" stroke-miterlimit="10" />
                        </svg>}

                      <div className="self-stretch my-auto">
                        {t("head2")}
                      </div>
                    </div>
                  </div> */}
                  <div className={`flex overflow-hidden flex-col justify-center items-start px-5 py-3 w-full text-black border-b border-solid hover:bg-slate-600 hover:bg-opacity-10 border-b-zinc-100 hover:text-primary cursor-pointer ${activeButton === "changePassword" ? "bg-slate-600 bg-opacity-10 text-primary font-bold" : ""}`} onClick={() => setActiveButton("changePassword")}>
                    <div className="flex gap-2 items-center">
                      {activeButton === "changePassword" ?
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1.75C14.9113 1.75 16.4218 2.66912 17.2344 3.8252C18.0724 5.01757 18.25 6.57122 18.25 8V9.5459C18.0886 9.53321 17.9219 9.52206 17.75 9.51465V8C17.75 6.40247 17.5302 4.9344 16.6436 3.87305C15.7398 2.7913 14.2487 2.25 12 2.25C9.75134 2.25 8.26022 2.7913 7.35645 3.87305C6.46981 4.9344 6.25 6.40247 6.25 8V9.51465C6.07808 9.52206 5.91142 9.53321 5.75 9.5459V8C5.75 6.57122 5.92759 5.01757 6.76562 3.8252C7.57816 2.66912 9.08867 1.75 12 1.75Z" stroke="#365D8D" />
                          <path d="M17.2412 10.5L17.6396 10.5107C17.8969 10.5208 18.137 10.5359 18.3604 10.5576L18.6826 10.5957L18.6895 10.5967C19.8929 10.743 20.5308 11.0933 20.9102 11.6836C21.3189 12.3199 21.5 13.3361 21.5 15V17C21.5 19.0036 21.2375 20.0555 20.6465 20.6465C20.0555 21.2375 19.0036 21.5 17 21.5H7C4.99643 21.5 3.94451 21.2375 3.35352 20.6465C2.76252 20.0555 2.5 19.0036 2.5 17V15C2.5 13.3361 2.68114 12.3199 3.08984 11.6836C3.42173 11.1671 3.95144 10.8343 4.88477 10.6611L5.31055 10.5967L5.31738 10.5957C5.62757 10.5534 5.97463 10.5258 6.36035 10.5107L6.75879 10.5H17.2412ZM8.98145 14.8604C8.58751 14.5229 8.02914 14.4088 7.52832 14.5801L7.44043 14.6133C7.23748 14.6913 7.08578 14.8003 6.95508 14.918L6.93555 14.9355L6.91797 14.9551C6.79153 15.0956 6.69064 15.2538 6.61816 15.4277C6.54689 15.5988 6.5 15.7942 6.5 16C6.5 16.3963 6.66487 16.7772 6.92676 17.0537L6.94043 17.0684L6.95508 17.082C7.08297 17.1971 7.2313 17.3032 7.42773 17.3809V17.3818C7.43057 17.383 7.43367 17.3836 7.43652 17.3848C7.43787 17.3853 7.43908 17.3862 7.44043 17.3867V17.3857C7.60859 17.4542 7.79909 17.5 8 17.5C8.39627 17.5 8.77717 17.3351 9.05371 17.0732L9.07324 17.0537C9.33513 16.7772 9.5 16.3963 9.5 16C9.5 15.7942 9.45311 15.5988 9.38184 15.4277C9.30936 15.2538 9.20847 15.0956 9.08203 14.9551L9.07324 14.9453L9.06348 14.9365L8.98145 14.8604ZM12.9473 14.834C12.405 14.4072 11.5874 14.4028 11.0479 14.8369L10.9365 14.9365L10.9268 14.9463C10.6667 15.2209 10.5 15.5912 10.5 16C10.5 16.2058 10.5469 16.4012 10.6182 16.5723C10.6906 16.7462 10.7915 16.9044 10.918 17.0449L10.9316 17.0596L10.9463 17.0732C11.2209 17.3333 11.5912 17.5 12 17.5C12.3963 17.5 12.7772 17.3351 13.0537 17.0732L13.0684 17.0596L13.082 17.0449C13.2085 16.9044 13.3094 16.7462 13.3818 16.5723C13.4531 16.4012 13.5 16.2058 13.5 16C13.5 15.6423 13.3722 15.3141 13.166 15.0537L13.0732 14.9463L13.0664 14.9385L13.0586 14.9316L12.9473 14.834ZM16.9521 14.8369C16.3742 14.3719 15.4772 14.4101 14.9414 14.9316L14.9336 14.9385L14.9268 14.9463C14.6667 15.2209 14.5 15.5912 14.5 16C14.5 16.3577 14.6278 16.6859 14.834 16.9463L14.9268 17.0537L14.9463 17.0732C15.2228 17.3351 15.6037 17.5 16 17.5C16.3963 17.5 16.7772 17.3351 17.0537 17.0732L17.0732 17.0537C17.3351 16.7772 17.5 16.3963 17.5 16C17.5 15.8973 17.4832 15.7893 17.4746 15.7295H17.4756L17.4736 15.7178L17.4316 15.5518L17.3672 15.3965C17.3326 15.3112 17.287 15.2206 17.2207 15.1377H17.2197C17.1748 15.0735 17.1335 15.0187 17.1006 14.9775L17.083 14.9561L17.0635 14.9365L16.9521 14.8369Z" fill="#365D8D" stroke="#365D8D" />
                        </svg> :
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="#365D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#365D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9965 16H16.0054H15.9965Z" fill="#365D8D" />
                          <path d="M15.9965 16H16.0054" stroke="#365D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M11.9955 16H12.0045" stroke="#365D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.99451 16H8.00349" stroke="#365D8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>}

                      <div className="self-stretch my-auto">
                        {t("head3")}
                      </div>
                    </div>
                  </div>
                  {/* <div className={`flex overflow-hidden flex-col justify-center items-start px-5 py-3 w-full text-black border-b border-solid hover:bg-slate-600 hover:bg-opacity-10 border-b-zinc-100 hover:text-primary cursor-pointer ${activeButton === "deleteAccount" ? "bg-slate-600 bg-opacity-10 text-primary font-bold" : ""}`} onClick={() => setActiveButton("deleteAccount")}>
                    <div className="flex gap-2 items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="#365D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#365D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062" stroke="#365D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.33 16.5H13.66H10.33Z" fill="#365D8D" />
                        <path d="M10.33 16.5H13.66" stroke="#365D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.5 12.5H14.5" stroke="#365D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>

                      <div className="self-stretch my-auto">
                        {t("head4")}</div>
                    </div>
                  </div> */}
                </div>
                <div className="flex overflow-hidden flex-col justify-center items-start px-5 py-3 mt-8 w-full font-bold text-rose-700 border-b border-solid bg-rose-700 bg-opacity-10 border-b-zinc-100 cursor-pointer" onClick={() => setActiveButton("logOut")}>
                  <div className="flex gap-2 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.2002 2.5H16.7998C18.2944 2.5 19.4579 2.96466 20.2451 3.75293C20.983 4.49184 21.4354 5.56024 21.4854 6.92188L21.4902 7.19824V16.7998C21.4902 18.2943 21.0249 19.4575 20.2363 20.2461C19.4477 21.0347 18.2846 21.5 16.79 21.5H14.2002C12.7056 21.5 11.5425 21.0347 10.7539 20.2461C9.96528 19.4575 9.5 18.2944 9.5 16.7998V13.25H15.25C15.9361 13.25 16.5 12.6861 16.5 12C16.5 11.3139 15.9361 10.75 15.25 10.75H9.5V7.2002C9.5 5.70564 9.96528 4.54253 10.7539 3.75391C11.5425 2.96528 12.7056 2.5 14.2002 2.5Z" fill="#C30734" stroke="#C30734" />
                      <path d="M5.9234 8.47363C6.01814 8.37889 6.18218 8.37889 6.27692 8.47363L6.28864 8.48535C6.32098 8.51554 6.35005 8.57426 6.35016 8.64941C6.35016 8.6979 6.33713 8.74437 6.30914 8.78613L6.27692 8.82617L3.35309 11.75H8.49957V12.25H3.35309L6.27692 15.1738C6.35954 15.2569 6.3696 15.3924 6.30719 15.4883L6.27692 15.5264C6.19414 15.6091 6.05848 15.6195 5.96246 15.5576L5.9234 15.5264L2.57379 12.1768C2.49097 12.0939 2.48056 11.9583 2.54254 11.8623L2.57379 11.8232L5.9234 8.47363Z" stroke="#C30734" />
                    </svg>

                    <div className="self-stretch my-auto text-rose-700">
                      {t("head5")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {activeButton === "notifications" && <NewNotifications />}
            {activeButton === "changePassword" && <ChangePassword />}
            {activeButton === "logOut" && <LogOut onClose={handleClose} />}

          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Setting
