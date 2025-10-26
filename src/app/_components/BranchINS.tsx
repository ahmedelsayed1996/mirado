import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranches } from "../reduxTool-kit/slices/branchesSlice";
import Pagination from "./Pagination";
import SearchNotFound from "./SearchNotFound";
import { AppDispatch } from "../store";
import useCurrentLang from "../_hooks/useCurrentLang";
import Loader from "./Loader";
import Spinner from "./Spinner";
import useCleanPath from "../_hooks/useCleanPath";


function BranchINS({ bg, limit }: { bg: string; limit: number }) {
  const [loadingStates, setLoadingStates] = useState(new Map<number, boolean>());
  const t = useTranslations("institutesCard");
  const { cleanPath } = useCleanPath();
  const branches = useSelector((state: any) => state.branches);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const language = useCurrentLang();
  const { locale, schoolsId } = params
  console.log("branches: ", branches);
  useEffect(() => {
    dispatch(getAllBranches({ locale, schoolsId, page: currentPage }));
  }, [currentPage, dispatch, locale, schoolsId]);

  const handlePageChange = (newPage: number) => {
    if (hasMoreData && newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({
        top: 200,
        left: 100,
        behavior: 'smooth'
      })
    }
  };

  // useEffect(() => {
  //   if (hasMoreData) {
  //     console.log("get new data");
  //     dispatch(getAllBranches({ locale, schoolsId, page: currentPage }));
  //     // dispatch(getAllUniversities({ page: currentPage, language, recommended: recommended, userId: user.id }));
  //   }
  // }, [currentPage]);


  return (
    <>
      {branches?.loading ? <Loader /> : <>

        {branches?.branches?.data?.length > 0 ? <div className={`flex flex-wrap gap-2 justify-center px-2 lg:px-10 bg-${bg}`}>
          {branches?.branches?.data?.map((branch: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col p-5 rounded-2xl border border-[#EBEBEB] border-solid shadow-xl bg-white w-[344px] justify-around"
              // style={{ width: 'calc(33.33% - 16px)' }}
              >
                <div className="flex overflow-hidden relative flex-col py-2.5 px-2.5  pl-3.5 min-h-[224px] max-md:pr-5 ">
                  {branch?.files?.length > 0 ? <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(branch.files[0])}`}
                    fill={true}
                    alt="Institute Branch"
                  /> : <Image
                    src="/images/institut.png"
                    fill={true}
                    alt="Institute Branch"
                  />}
                  {/* <Image src="/images/institut.png" fill={true} alt="all type" /> */}
                  {branch.offer ?
                    <div className="relative justify-center self-start px-2.5 py-2 text-base font-medium tracking-tight leading-6 text-center text-white bg-primary rounded-[111px] max-md:px-5">
                      {t("offerIcon")} {branch.offer}%
                    </div> : ""}
                </div>
                <div className="flex gap-4 justify-between mt-3.5 w-full text-sm leading-6 text-right text-zinc-500 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1">
                    {/* <Image
                  src="/images/stars.svg"
                  width={20}
                  height={20}
                  alt="stars"
                />
                <div>{t("viewsLable2")}</div> */}
                    {branch.recommend ? <>
                      <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.00366 3.88268C8.59929 2.37244 10.7366 2.37244 11.3323 3.88268L12.4043 6.60082C12.4337 6.67532 12.4927 6.73429 12.5672 6.76367L15.2853 7.83569C16.7955 8.43132 16.7955 10.5687 15.2853 11.1643L12.5672 12.2363C12.4927 12.2657 12.4337 12.3247 12.4043 12.3992L11.3323 15.1173C10.7366 16.6276 8.59929 16.6276 8.00366 15.1173L6.93164 12.3992C6.90226 12.3247 6.84329 12.2657 6.76879 12.2363L4.05064 11.1643C2.54041 10.5687 2.54041 8.43132 4.05065 7.83569L6.76879 6.76367C6.84329 6.73429 6.90226 6.67532 6.93164 6.60082L8.00366 3.88268ZM9.93688 4.43301C9.84064 4.18899 9.4953 4.189 9.39906 4.43301L8.32704 7.15115C8.14519 7.61224 7.78021 7.97722 7.31912 8.15907L4.60098 9.23109C4.35696 9.32733 4.35697 9.67267 4.60098 9.76891L7.31912 10.8409C7.78021 11.0228 8.14519 11.3878 8.32704 11.8488L9.39906 14.567C9.4953 14.811 9.84064 14.811 9.93688 14.567L11.0089 11.8488C11.1907 11.3878 11.5557 11.0228 12.0168 10.8409L14.735 9.76891C14.979 9.67267 14.979 9.32733 14.735 9.23109L12.0168 8.15907C11.5557 7.97722 11.1907 7.61224 11.0089 7.15116L9.93688 4.43301ZM16.4587 13.573C16.8915 12.4757 18.4444 12.4757 18.8772 13.573L19.6459 15.5221L21.595 16.2908C22.6923 16.7235 22.6923 18.2765 21.595 18.7092L19.6459 19.4779L18.8772 21.427C18.4444 22.5243 16.8915 22.5243 16.4587 21.427L15.69 19.4779L13.7409 18.7092C12.6436 18.2765 12.6436 16.7235 13.7409 16.2908L15.69 15.5221L16.4587 13.573ZM17.668 14.5953L17.0535 16.1533C16.9214 16.4883 16.6562 16.7534 16.3212 16.8856L14.7633 17.5L16.3212 18.1144C16.6562 18.2466 16.9214 18.5117 17.0535 18.8467L17.668 20.4047L18.2824 18.8467C18.4145 18.5117 18.6797 18.2466 19.0147 18.1144L20.5726 17.5L19.0147 16.8856C18.6797 16.7534 18.4145 16.4883 18.2824 16.1533L17.668 14.5953Z" fill="#6C7278" />
                      </svg>
                      <div> {t("viewsLable2")}</div>
                    </> : ""}
                  </div>
                  <div className="flex gap-1">
                    <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.60888 15.7957C2.75895 14.6915 2.33398 14.1394 2.33398 12.5C2.33398 10.8606 2.75895 10.3085 3.60888 9.20433C5.30595 6.99956 8.1521 4.5 12.334 4.5C16.5159 4.5 19.362 6.99956 21.0591 9.20433C21.909 10.3085 22.334 10.8606 22.334 12.5C22.334 14.1394 21.909 14.6915 21.0591 15.7957C19.362 18.0004 16.5159 20.5 12.334 20.5C8.1521 20.5 5.30595 18.0004 3.60888 15.7957Z" stroke="#6C7278" strokeWidth="1.5" />
                      <path d="M15.334 12.5C15.334 14.1569 13.9908 15.5 12.334 15.5C10.6771 15.5 9.33398 14.1569 9.33398 12.5C9.33398 10.8431 10.6771 9.5 12.334 9.5C13.9908 9.5 15.334 10.8431 15.334 12.5Z" stroke="#6C7278" strokeWidth="1.5" />
                    </svg>
                    <div>{branch.visites} {t("viewsLable1")}</div>
                  </div>
                </div>
                <div className="flex gap-4 mt-3.5 ">
                  <div className="flex justify-center items-center p-2.5 bg-white rounded-xl border border-gray border-solid h-[78px] w-[78px] relative">
                    <Image
                      src={!branch.logo ? "/images/university.png" : `${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${cleanPath(branch.logo)}`}
                      fill={true}
                      alt={branch.name}
                      className="rounded-xl p-1"
                    />
                  </div>
                  <div className="flex flex-col my-auto text-start">
                    <div className="text-xl font-medium text-gray-900 capitalize">
                      {branch.institute_name} ({branch.city_name})
                    </div>
                    <div className="flex gap-1 mt-3 text-base tracking-wide leading-6 text-zinc-500">
                      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.25 9.14329C0.25 4.24427 4.15501 0.25 9 0.25C13.845 0.25 17.75 4.24427 17.75 9.14329C17.75 11.5084 17.076 14.0479 15.8844 16.2419C14.6944 18.4331 12.9556 20.3372 10.7805 21.3539C9.65057 21.882 8.34943 21.882 7.21949 21.3539C5.04437 20.3372 3.30562 18.4331 2.11556 16.2419C0.924029 14.0479 0.25 11.5084 0.25 9.14329ZM9 1.75C5.00843 1.75 1.75 5.04748 1.75 9.14329C1.75 11.2404 2.35263 13.5354 3.4337 15.526C4.51624 17.5192 6.04602 19.1496 7.85465 19.995C8.58205 20.335 9.41795 20.335 10.1454 19.995C11.954 19.1496 13.4838 17.5192 14.5663 15.526C15.6474 13.5354 16.25 11.2404 16.25 9.14329C16.25 5.04748 12.9916 1.75 9 1.75ZM9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75ZM5.25 9C5.25 6.92893 6.92893 5.25 9 5.25C11.0711 5.25 12.75 6.92893 12.75 9C12.75 11.0711 11.0711 12.75 9 12.75C6.92893 12.75 5.25 11.0711 5.25 9Z" fill="#1E4C83" />
                      </svg>
                      <div className="flex-1 line-clamp-1"> {`
                      ${branch.country_name ? `${branch.country_name}` : ""}
                      ${branch.state_name ? ` - ${branch.state_name}` : ""}
                      ${branch.city_name ? ` - ${branch.city_name}` : ""}`}
                      </div>
                      {/* <div className="flex-1 line-clamp-1"> {branch.country_name} - {branch.state_name} - {branch.city_name}</div> */}
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 text-base tracking-wide text-start text-ellipsis text-zinc-500 max-md:max-w-full line-clamp-2">{branch.description}</div>
                <div className="flex gap-5 justify-center px-2 mt-3.5 text-sm leading-6 text-start ">
                  <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                    {/* <Image
                  src="/images/star.svg"
                  width={20}
                  height={20}
                  alt="all type"
                /> */}
                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.7309 3.01063L14.4909 6.53063C14.7309 7.02063 15.3709 7.49063 15.9109 7.58063L19.1009 8.11062C21.1409 8.45062 21.6209 9.93062 20.1509 11.3906L17.6709 13.8706C17.2509 14.2906 17.0209 15.1006 17.1509 15.6806L17.8609 18.7506C18.4209 21.1806 17.1309 22.1206 14.9809 20.8506L11.9909 19.0806C11.4509 18.7606 10.5609 18.7606 10.0109 19.0806L7.02089 20.8506C4.88089 22.1206 3.58089 21.1706 4.14089 18.7506L4.85089 15.6806C4.98089 15.1006 4.75089 14.2906 4.33089 13.8706L1.85089 11.3906C0.390886 9.93062 0.860886 8.45062 2.90089 8.11062L6.09089 7.58063C6.62089 7.49063 7.26089 7.02063 7.50089 6.53063L9.26089 3.01063C10.2209 1.10063 11.7809 1.10063 12.7309 3.01063Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex flex-col justify-center">
                      <div className="text-gray-900">{t("numberOfStart")}</div>
                      <div className="font-medium text-[#ACB5BB]">
                        {branch.rating ? branch.rating?.toFixed(1) : "N/A"}
                        {/* {t("stars")} */}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16.02 5.77261C17.2923 5.71011 18.25 6.75695 18.25 7.95154V13.4108C18.25 14.6716 17.2316 15.6365 16.0459 15.7249C15.5529 15.7617 15.0551 15.8216 14.678 15.9138C13.9402 16.094 12.9666 16.5647 12.357 16.8858C11.8214 17.1681 11.1786 17.1681 10.643 16.8858C10.0334 16.5647 9.05979 16.094 8.32199 15.9138C7.94487 15.8216 7.44708 15.7617 6.95414 15.7249C5.76836 15.6365 4.75 14.6716 4.75 13.4108V7.99649C4.75 6.77528 5.748 5.71817 7.04194 5.81291C7.56744 5.85139 8.17286 5.91879 8.67802 6.04222C9.59977 6.26744 10.6985 6.80646 11.3132 7.1291C11.4157 7.1829 11.5434 7.18078 11.6463 7.12125C12.2018 6.79984 13.1675 6.27873 13.9997 6.04804C14.6227 5.87535 15.3904 5.80353 16.02 5.77261ZM16.75 7.95154C16.75 7.53391 16.4314 7.2542 16.0935 7.2708C15.4907 7.30041 14.8582 7.36663 14.4003 7.49354C13.7696 7.66839 12.9487 8.1007 12.3975 8.41959C12.3493 8.44749 12.3001 8.47306 12.25 8.49628V15.2586C12.8591 14.9625 13.6393 14.6234 14.322 14.4566C14.8199 14.335 15.4149 14.2678 15.9343 14.2291C16.4097 14.1936 16.75 13.8157 16.75 13.4108V7.95154ZM10.616 8.45726C10.66 8.48035 10.7047 8.50154 10.75 8.52081V15.2586C10.1409 14.9625 9.36071 14.6234 8.67802 14.4566C8.18009 14.335 7.58508 14.2678 7.06568 14.2291C6.59031 14.1936 6.25 13.8157 6.25 13.4108V7.99649C6.25 7.56975 6.58277 7.28331 6.9324 7.30891C7.4319 7.34548 7.93898 7.40578 8.32199 7.49936C9.04804 7.67676 10.0035 8.13574 10.616 8.45726Z" fill="#141522" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.44358 0.75C7.60583 0.749985 6.15019 0.749973 5.01098 0.903136C3.83856 1.06076 2.88961 1.39288 2.14124 2.14124C1.39288 2.88961 1.06076 3.83856 0.903136 5.01098C0.749973 6.15019 0.749985 7.60582 0.75 9.44357V13.5564C0.749985 15.3942 0.749973 16.8498 0.903136 17.989C1.06076 19.1614 1.39288 20.1104 2.14124 20.8588C2.88961 21.6071 3.83856 21.9392 5.01098 22.0969C6.15018 22.25 7.6058 22.25 9.44354 22.25H13.5564C15.3942 22.25 16.8498 22.25 17.989 22.0969C19.1614 21.9392 20.1104 21.6071 20.8588 20.8588C21.6071 20.1104 21.9392 19.1614 22.0969 17.989C22.25 16.8498 22.25 15.3942 22.25 13.5565V9.44359C22.25 7.60585 22.25 6.15018 22.0969 5.01098C21.9392 3.83856 21.6071 2.88961 20.8588 2.14124C20.1104 1.39288 19.1614 1.06076 17.989 0.903136C16.8498 0.749973 15.3942 0.749985 13.5564 0.75H9.44358ZM3.2019 3.2019C3.62511 2.77869 4.20476 2.52503 5.21085 2.38976C6.23851 2.25159 7.59318 2.25 9.5 2.25H13.5C15.4068 2.25 16.7615 2.25159 17.7892 2.38976C18.7952 2.52503 19.3749 2.77869 19.7981 3.2019C20.2213 3.62511 20.475 4.20476 20.6102 5.21085C20.7484 6.23851 20.75 7.59318 20.75 9.5V13.5C20.75 15.4068 20.7484 16.7615 20.6102 17.7892C20.475 18.7952 20.2213 19.3749 19.7981 19.7981C19.3749 20.2213 18.7952 20.475 17.7892 20.6102C16.7615 20.7484 15.4068 20.75 13.5 20.75H9.5C7.59318 20.75 6.23851 20.7484 5.21085 20.6102C4.20476 20.475 3.62511 20.2213 3.2019 19.7981C2.77869 19.3749 2.52503 18.7952 2.38976 17.7892C2.25159 16.7615 2.25 15.4068 2.25 13.5V9.5C2.25 7.59318 2.25159 6.23851 2.38976 5.21085C2.52503 4.20476 2.77869 3.62511 3.2019 3.2019Z" fill="#141522" />
                    </svg>

                    <div className="flex flex-col justify-center">
                      <div className="text-gray-900">{t("cardFoterIns2")}</div>
                      <div className="font-medium text-[#ACB5BB]">{branch.number_of_courses}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 justify-center py-1.5 rounded-2xl items-center">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.66055 11.37C9.56055 11.36 9.44055 11.36 9.33055 11.37C6.95055 11.29 5.06055 9.34 5.06055 6.94C5.06055 4.49 7.04055 2.5 9.50055 2.5C11.9505 2.5 13.9405 4.49 13.9405 6.94C13.9305 9.34 12.0405 11.29 9.66055 11.37Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16.9093 4.5C18.8493 4.5 20.4093 6.07 20.4093 8C20.4093 9.89 18.9093 11.43 17.0393 11.5C16.9593 11.49 16.8693 11.49 16.7793 11.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.6607 15.06C2.2407 16.68 2.2407 19.32 4.6607 20.93C7.4107 22.77 11.9207 22.77 14.6707 20.93C17.0907 19.31 17.0907 16.67 14.6707 15.06C11.9307 13.23 7.4207 13.23 4.6607 15.06Z" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.8398 20.5C19.5598 20.35 20.2398 20.06 20.7998 19.63C22.3598 18.46 22.3598 16.53 20.7998 15.36C20.2498 14.94 19.5798 14.66 18.8698 14.5" stroke="black" strokeOpacity="0.88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <div className="flex flex-col justify-center">
                      <div className=" text-gray-900"> {t("cardFoterIns1")}</div>
                      <div className="font-medium text-[#ACB5BB]">{branch.min_age ? branch.min_age : "0"}</div>
                    </div>
                  </div>
                </div>
                {loadingStates.get(branch.id) ? <Spinner /> :
                  <div className="flex gap-2.5 mt-3.5 max-md:flex-wrap max-md:max-w-full">
                    <Link href={`/${language}/language-schools/${params.schoolsId}/${branch.id}`} className="flex-1 text-center px-10 py-2 text-white bg-primary rounded-xl max-md:px-5 border hover:border-primary hover:text-primary hover:bg-white transition-all duration-300"
                      onClick={() => setLoadingStates((prev) => new Map(prev).set(branch.id, true))}
                    >
                      {t("cardButtonins2")}{" "}
                    </Link>
                  </div>}
              </div>
            )
          })}
        </div> : <SearchNotFound head="Branches" />}
      </>}
      {branches?.branches?.data?.length > 0 && <div className="flex justify-center mt-5 px-28">
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          disableNext={!hasMoreData}
          numberOfPages={branches?.branches?.pages}
        />
      </div>}

    </>

  );
}

export default BranchINS;
