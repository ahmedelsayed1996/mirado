import { useTranslations } from "next-intl";
import Image from "next/image"

function ResultNotFound() {

    const d = useTranslations('UniversityDetails');

    return (
        <div className='flex items-center flex-col py-10'>
            <div>
                <Image src="/images/searchNotFound.webp" width={1000} height={300} alt="Page Not Found" />
            </div>
            <h1 className="text-5xl font-bold">{d("searchNotFound")}</h1>
        </div>
    )
}

export default ResultNotFound;
