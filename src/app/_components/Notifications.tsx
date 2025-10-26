import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import NoNotifications from './NoNotifications';
import { useTranslations } from 'next-intl';
import { parseCookies } from 'nookies';


interface NotificationResponse {
  meta?: {
    total: number;
  };
  notifications: any[];

}
function Notifications({ currentUser }: any) {
  const [getNotification, setGetNotification] = useState<NotificationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations("Profile");
  const { tokenMainSite } = parseCookies();

  const notification = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications?userId=${currentUser.id}&page=1&pageSize=1000`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${tokenMainSite}`
        },
      })
      const result = await res.json();
      setGetNotification(result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  // function timeElapsed(createdAt: any) {
  //   // تحويل `created_at` إلى تاريخ
  //   const createdAtDate = new Date(createdAt);
  //   const now = new Date();

  //   // حساب الفرق بالدقائق
  //   const diffInMs = now - createdAtDate;
  //   const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  //   if (diffInMinutes < 1) {
  //     return "just now";
  //   } else if (diffInMinutes < 60) {
  //     return `${diffInMinutes} Min ago`;
  //   } else {
  //     const diffInHours = Math.floor(diffInMinutes / 60);
  //     if (diffInHours < 24) {
  //       return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  //     } else {
  //       const diffInDays = Math.floor(diffInHours / 24);
  //       return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  //     }
  //   }
  // }
  function timeElapsed(createdAt: any) {
    // تحويل `created_at` إلى تاريخ
    const createdAtDate = new Date(createdAt).getTime();
    const now = new Date().getTime();

    // حساب الفرق بالدقائق
    const diffInMs = now - createdAtDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} Min ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
      }
    }
  }

  useEffect(() => {
    notification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex overflow-hidden flex-col self-start p-2 md:p-4 md:pt-8 md:pb-4 bg-white rounded-3xl border border-gray border-solid  w-full md:w-4/6 md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full text-lg font-bold text-zinc-500 max-md:max-w-full">
        <div className="flex flex-col w-full text-lg font-bold text-start text-blue-900 whitespace-nowrap max-md:max-w-full">
          <div className="flex  gap-2.5 items-center w-full max-md:max-w-full">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="35" height="35" rx="17.5" fill="#1E4C83" />
              <path d="M18 16.1959C17.8707 16.1959 17.7589 16.0841 17.7589 15.9548V12.9023C17.7589 12.7731 17.8707 12.6613 18 12.6613C18.1293 12.6613 18.2411 12.7731 18.2411 12.9023V15.9548C18.2411 16.0894 18.1332 16.1959 18 16.1959Z" fill="white" stroke="white" strokeWidth="0.892857" />
              <path d="M11.1948 24.1034L11.1929 24.1027C10.477 23.8667 9.95482 23.3635 9.73068 22.7508C9.50556 22.1355 9.5747 21.4138 9.96048 20.7682L11.1244 18.8253L11.125 18.8244C11.2804 18.5634 11.4149 18.2135 11.5104 17.8732C11.6058 17.5333 11.6737 17.1622 11.6737 16.8542V14.9292C11.6737 11.4266 14.5171 8.58315 18.0198 8.58315C21.5224 8.58315 24.3658 11.4266 24.3658 14.9292V16.8542C24.3658 17.1579 24.4339 17.529 24.529 17.8693C24.6243 18.2101 24.7587 18.5628 24.9146 18.8244L24.9151 18.8253L26.0793 20.7686L26.0799 20.7696C26.4394 21.3663 26.5019 22.0775 26.2628 22.7329C26.0265 23.3811 25.5073 23.8799 24.8438 24.1037L24.8432 24.1039C22.646 24.8483 20.3387 25.2078 18.0198 25.2078C15.702 25.2078 13.394 24.8394 11.1948 24.1034ZM11.5426 19.0788L11.5426 19.0788L11.5405 19.0823L10.3777 21.0324C10.3775 21.0328 10.3772 21.0332 10.377 21.0336C10.0821 21.522 9.9921 22.0858 10.1859 22.6026C10.38 23.1203 10.8116 23.4776 11.3519 23.6577L11.3522 23.6578C15.6599 25.0906 20.3965 25.0907 24.7043 23.6583C25.2264 23.4878 25.6327 23.0961 25.8178 22.5821C26.0139 22.0632 25.9479 21.5019 25.6735 21.0366L25.6719 21.034L24.5077 19.0906L24.5077 19.0906L24.5061 19.0879C24.165 18.5275 23.8929 17.5357 23.8929 16.8726L23.8929 14.9476L23.8929 14.9462C23.8829 11.704 21.2554 9.07446 18.0198 9.07446C14.7849 9.07446 12.1558 11.7035 12.1558 14.9384V16.8634C12.1558 17.5265 11.8837 18.5183 11.5426 19.0788Z" fill="white" stroke="white" strokeWidth="0.892857" />
              <path d="M17.9998 27.5436C17.139 27.5436 16.2896 27.1885 15.6754 26.5743C15.168 26.0669 14.8374 25.3988 14.7378 24.6964H15.225C15.3206 25.2765 15.5994 25.8177 16.0158 26.234C16.5375 26.7557 17.2552 27.0614 17.9998 27.0614C19.3961 27.0614 20.5606 26.0339 20.7757 24.6964H21.2632C21.0446 26.302 19.6643 27.5436 17.9998 27.5436Z" fill="white" stroke="white" strokeWidth="0.892857" />
            </svg>

            <div className="flex-1 text-base md:text-lg shrink self-stretch my-auto basis-0 max-md:max-w-full capitalize">
            {t("nav6")} {" "}
              <span className=" text-zinc-500">
                ({t("notifications")} {getNotification?.meta?.total ?? 0} {t("nav6")}.)
              </span>
            </div>
          </div>
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/24eb0d2eb07f7bbdcf196c6c052c8b34d8930b610da27a97d3fe815b1d92c12f?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
            className="object-contain mt-4 w-full aspect-[1000] max-md:max-w-full"
          /> */}
        </div>
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f22b93a4bf317b8d1dc73520c79ffba9e57486590aa40c0017e3606d8ebfee6?placeholderIfAbsent=true&apiKey=0ca6123f87c44837b7a8fe7bc7c2fec6"
          className="object-contain mt-4 w-full aspect-[1000] max-md:max-w-full"
        /> */}
      </div>
      {isLoading ? <Loader /> :
        <div className="flex flex-col mt-8 w-full max-md:max-w-full">
          {getNotification?.notifications?.length !== 0 ? <>
            {getNotification?.notifications && getNotification?.notifications.map((notification: any, index: number) => {
              return (
                <div key={index} className="flex overflow-hidden  gap-10 items-center py-5 pr-6 pl-5 text-start rounded-lg border border-solid bg-stone-50 border-zinc-100 mb-2">
                  <div className="flex gap-2 my-auto min-w-[240px] max-md:max-w-full">
                    {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f1d868bd62d4f079e1c039bda1472d97f65dc4bc10f71cb13726c693892634c?placeholderIfAbsent=true&apiKey=e969867fc0a145258ec2d2dcaf1c3295"
                  className="object-contain shrink-0 my-auto aspect-square w-[50px]"
                /> */}
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.90666 19.9518C7.75041 19.7539 6.615 19.4831 5.49 19.1081L8.90666 19.9518ZM8.90666 19.9518C8.96396 19.9622 9.02126 19.9701 9.07855 19.9779C9.13584 19.9857 9.19313 19.9935 9.25041 20.0039L8.90666 19.9518ZM5.57054 13.3693L5.57057 13.3693L5.57319 13.3649C5.72512 13.1053 5.8575 12.7522 5.95166 12.4102C6.04572 12.0685 6.11351 11.6949 6.11351 11.3893V9.45182C6.11351 5.91845 8.98537 3.05416 12.5219 3.04408C16.0454 3.04442 18.9186 5.91689 18.9186 9.45182V11.3997C18.9186 11.7055 18.9864 12.0794 19.0822 12.4222C19.1777 12.7642 19.3133 13.1191 19.4726 13.3808C19.4729 13.3812 19.4731 13.3817 19.4734 13.3822L20.6479 15.3361C20.6481 15.3364 20.6483 15.3368 20.6485 15.3371C21.0074 15.9417 21.0754 16.6541 20.8324 17.3054C20.5875 17.9517 20.0735 18.4572 19.4002 18.6848C18.2964 19.0527 17.1639 19.3382 16.0233 19.5215L16.0233 19.5214L16.0143 19.523C15.8963 19.5445 15.8014 19.5614 15.71 19.5697L15.6934 19.5712L15.677 19.574C15.5035 19.6029 15.3281 19.6225 15.1386 19.6435L15.1386 19.6434L15.1276 19.6449C14.9111 19.6744 14.6826 19.6944 14.4409 19.7154L14.4409 19.7154L14.4366 19.7158C13.8053 19.7769 13.1634 19.8075 12.5212 19.8075C11.8684 19.8075 11.2159 19.7769 10.574 19.7157L10.574 19.7156L10.5646 19.7149C10.2954 19.695 10.0362 19.6651 9.77663 19.6252L9.77664 19.6251L9.76775 19.6239C9.61392 19.6034 9.46258 19.5832 9.32144 19.5631C9.25744 19.5517 9.19518 19.5432 9.14264 19.536L9.13886 19.5355C9.07999 19.5275 9.03248 19.521 8.98653 19.5126L8.98198 19.5118C7.84471 19.3171 6.73166 19.0514 5.63118 18.6845L5.62798 18.6835C4.91723 18.4525 4.38996 17.943 4.15871 17.3178L4.158 17.3159C3.93068 16.7097 4.00607 15.9863 4.39451 15.3259L5.57054 13.3693ZM12.49 12.117C13.1741 12.117 13.7281 11.563 13.7281 10.8789V7.64974C13.7281 6.96568 13.1741 6.41164 12.49 6.41164C11.8059 6.41164 11.2519 6.96568 11.2519 7.64974V10.8789C11.2519 11.563 11.8059 12.117 12.49 12.117Z" fill="#1E4C83" stroke="#1E4C83" strokeWidth="0.892857" />
                      <path d="M10.3458 21.8439C10.4562 21.8563 10.5682 21.8677 10.6807 21.8771C11.2847 21.9301 11.9018 21.9621 12.5208 21.9621C13.1301 21.9621 13.7372 21.93 14.3314 21.877L14.3314 21.877L14.334 21.8767C14.3905 21.8713 14.4533 21.8663 14.5195 21.861C14.563 21.8575 14.6079 21.8539 14.6535 21.85C14.1623 22.5082 13.379 22.9338 12.5 22.9338C11.7941 22.9338 11.0989 22.6468 10.6129 22.1431L10.6052 22.1351L10.597 22.1274C10.5064 22.0425 10.4223 21.947 10.3458 21.8439Z" fill="#1E4C83" stroke="#1E4C83" strokeWidth="0.892857" />
                    </svg>

                    <div className="flex flex-col justify-center min-w-[240px] w-[596px] max-md:max-w-full">
                      <div className="text-base font-bold text-black max-md:max-w-full">
                        {notification.title}
                      </div>
                      <div className="self-start mt-1.5 text-sm text-slate-500 max-md:max-w-full">
                        {notification.message}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center  my-auto">
                    <div className="overflow-hidden gap-2.5 self-center px-2.5 py-1.5 text-xs font-medium text-white whitespace-nowrap bg-green-400 border border-green-400 border-solid rounded-[11111px]">
                    {t("notifications1")}
                    </div>
                    <div className="mt-3.5 text-xs text-slate-500 text-nowrap">{timeElapsed(notification.created_at)}</div>
                  </div>
                </div>
              )
            })}
          </> : <NoNotifications />}





        </div>}

    </div>
  );
}

export default Notifications