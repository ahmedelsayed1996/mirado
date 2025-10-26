import { useTranslations } from "next-intl";
import { parseCookies } from "nookies";
import { useState } from "react";
// import { FaStar, FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import useCurrentLang from "../_hooks/useCurrentLang";
import Spinner from "./Spinner";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { getAllRequests } from "../reduxTool-kit/slices/requestsSlice";
type PopUpRatingProps = {
  closeRate: () => void;
  ID: number;
  URL: string;
  TheKey: any;
};

const PopUpRating: React.FC<PopUpRatingProps> = ({
  closeRate,
  ID,
  URL,
  TheKey,
}) => {
  const tr = useTranslations("popUpRate");
  const [rating, setRating] = useState<number>();
  const [feedback, setFeedBack] = useState("");
  const [loading, setLoading] = useState(false);
  const language = useCurrentLang();
  const { tokenMainSite } = parseCookies();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmitRate = async () => {
    if (feedback === "" || rating === null) {
      language == "ar"
        ? toast.error("يجب ان تسجل التقييم")
        : toast.error("You must register the evaluation.");
      return;
    }

    const bodyRequest = JSON.stringify({
      number_of_stars: rating,
      review: feedback,
      [TheKey]: ID,
    });

    const myHeader = new Headers();
    myHeader.append("Accept-Language", language);
    myHeader.append("Content-Type", "application/json");
    myHeader.append("Authorization", `Bearer ${tokenMainSite}`);

    let requestOptions: RequestInit = {
      method: "POST",
      headers: myHeader,
      body: bodyRequest,
    };

    try {
      const theResualt = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${URL}`,
        requestOptions
      );
      const lastResualt = await theResualt.json();
      setLoading(false);
      setRating(0);
      setFeedBack("");
      dispatch(getAllRequests({ language }));
      closeRate();

      if (theResualt.ok == false) {
        console.log(lastResualt.message);
        // toast.error(lastResualt.message);
        throw new Error(lastResualt.message);
      }
      toast.success(tr("success"));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="flex fixed top-0 left-0 justify-center items-center bg-black bg-opacity-50 size-full z-30">
        <div className="flex flex-col p-6  mx-3 max-w-full bg-white rounded-2xl border border-gray border-solid shadow-2xl w-[700px] lg:w-[786px] max-md:px-5 max-md:mt-10 ">
          <div
            className="flex z-10 justify-center items-center px-5 w-14  max-md:px-5 cursor-pointer self-end"
            onClick={closeRate}
          >
            <p className="font-medium text-[#A5A5A5]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.00017 6.82674L1.79975 11.0272C1.68447 11.1424 1.54725 11.1997 1.38808 11.199C1.22878 11.1982 1.0901 11.1388 0.972043 11.0207C0.858293 10.9026 0.802529 10.7664 0.804751 10.6119C0.806835 10.4576 0.864752 10.3236 0.978502 10.2099L5.17246 5.99903L0.978502 1.7882C0.870029 1.67986 0.814474 1.54715 0.811835 1.39007C0.809196 1.23299 0.864752 1.09542 0.978502 0.977362C1.09225 0.859307 1.22739 0.798543 1.38392 0.795071C1.54045 0.791598 1.67906 0.84889 1.79975 0.966946L6.00017 5.17132L10.2045 0.966946C10.3172 0.854307 10.4531 0.798335 10.6123 0.799029C10.7716 0.799862 10.9116 0.859307 11.0323 0.977362C11.1434 1.09542 11.1978 1.23167 11.1956 1.38611C11.1935 1.54042 11.1356 1.67445 11.0218 1.7882L6.82788 5.99903L11.0218 10.2099C11.1303 10.3182 11.1859 10.4509 11.1885 10.608C11.1911 10.7651 11.1356 10.9026 11.0218 11.0207C10.9081 11.1388 10.7729 11.1995 10.6164 11.203C10.4599 11.2065 10.3226 11.1478 10.2045 11.0272L6.00017 6.82674Z" fill="#A5A5A5" />
              </svg>

            </p>
          </div>

          {/* Icon FeedBack */}
          <div className="flex flex-col items-center justify-center w-auto">
            <svg
              width="200"
              height="200"
              viewBox="0 0 136 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M114.406 14.7656H21.5938C14.6039 14.7656 8.9375 20.432 8.9375 27.4219V84.375C8.9375 91.3648 14.6039 97.0312 21.5938 97.0312H53.3858L66.1733 119.18C66.9852 120.586 69.015 120.586 69.8269 119.18L82.6144 97.0312H114.406C121.396 97.0312 127.063 91.3648 127.063 84.375V27.4219C127.063 20.432 121.396 14.7656 114.406 14.7656Z"
                fill="#FFB300"
              />
              <path
                d="M42.2992 38.5394L47.4229 48.9211L58.8798 50.5858C60.0039 50.749 60.4527 52.1305 59.6393 52.9234L51.3491 61.0044L53.3062 72.4149C53.4981 73.5345 52.323 74.3882 51.3177 73.8596L41.0703 68.4722L30.823 73.8596C29.8174 74.3882 28.6425 73.5343 28.8345 72.4149L30.7915 61.0044L22.5013 52.9234C21.6879 52.1305 22.1368 50.749 23.2609 50.5858L34.7177 48.9211L39.8414 38.5394C40.3441 37.5207 41.7964 37.5207 42.2992 38.5394ZM93.7022 38.5394L88.5785 48.9211L77.1216 50.5858C75.9976 50.749 75.5487 52.1305 76.3621 52.9234L84.6523 61.0044L82.6952 72.4149C82.5033 73.5345 83.6784 74.3882 84.6837 73.8596L94.9311 68.4722L105.178 73.8596C106.184 74.3882 107.359 73.5343 107.167 72.4149L105.21 61.0044L113.5 52.9234C114.314 52.1305 113.865 50.749 112.741 50.5858L101.284 48.9211L96.16 38.5394C95.6574 37.5207 94.205 37.5207 93.7022 38.5394Z"
                fill="#ECEFF1"
              />
            </svg>
            <p className="text-[#1B1B1B] text-[clamp(1rem,2.01vw,4rem)] font-bold py-3">
              {tr("paragraph")}
            </p>
          </div>

          {/* Rate */}
          {/* <div className="flex justify-center gap-2 py-4">
            {[...Array(5)].map((star: unknown, index: number) => {
              const currentRate = index + 1;
              return (
                <label
                  key={index}
                  className="bg-[#FAFAFA] p-2 rounded-md border  border-slate-200"
                >
                  <input
                    type="radio"
                    value={currentRate}
                    onClick={() => setRating(currentRate)}
                    className="hidden"
                  />

                  <FaStar
                    size={30}
                    color={
                      typeof rating === "number" && rating >= currentRate
                        ? "#FDB022"
                        : "#F0F0F0"
                    }
                  />
                </label>
              );
            })}
          </div> */}
          <div className="flex justify-center gap-2 py-4">
            {[...Array(5)].map((_, index: number) => {
              const currentRate = index + 1;
              const isActive = typeof rating === "number" && rating >= currentRate;

              return (
                <label
                  key={index}
                  className="bg-[#FAFAFA] p-2 rounded-md border border-slate-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={currentRate}
                    onClick={() => setRating(currentRate)}
                    className="hidden"
                  />

                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill={isActive ? "#FDB022" : "#F0F0F0"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L14.9457 8.72015L22.1803 9.52021L16.5901 14.2798L18.4913 21.4798L12 17.52L5.50865 21.4798L7.4099 14.2798L1.81966 9.52021L9.0543 8.72015L12 2Z" />
                  </svg>
                </label>
              );
            })}
          </div>

          {/* FeedBack */}
          <div>
            <textarea
              name="feedback"
              id="feedback"
              cols={25}
              rows={4}
              value={feedback}
              onChange={(e) => setFeedBack(e.target.value)}
              className="border w-full rounded-md my-3 py-3 px-2"
              placeholder="Your feedback.."
            ></textarea>
          </div>

          {/* Btn */}
          <div className=" flex justify-center gap-2">
            <button
              className="capitalize py-2  border-[#D6D6D6] border-[2px] text-[#666666] rounded-full w-full"
              onClick={closeRate}
            >
              {tr("Cancel")}
            </button>
            <button
              className="capitalize bg-[#365D8D] text-white py-2  rounded-full w-full"
              onClick={handleSubmitRate}
            >
              {!loading && tr("Send")}
              {loading && <Spinner />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpRating;
