import { useTranslations } from 'next-intl';
import Counter from './Counter';

const FillStar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.10404 0.999957C6.24269 0.722666 6.46606 0.584019 6.77416 0.584019C7.08226 0.584019 7.30564 0.722666 7.44428 0.999957L8.94628 4.05017L12.32 4.55853C12.6281 4.58934 12.8284 4.7511 12.9208 5.04379C13.0132 5.33649 12.9516 5.59067 12.7359 5.80635L10.2865 8.18643L10.8642 11.5601C10.9104 11.8528 10.8103 12.0878 10.5638 12.2649C10.3173 12.4421 10.0632 12.4613 9.80126 12.3227L6.77416 10.7514L3.74706 12.3227C3.48518 12.4768 3.23099 12.4613 2.98451 12.2765C2.73803 12.0916 2.6379 11.8528 2.68411 11.5601L3.2618 8.18643L0.812392 5.80635C0.596721 5.59067 0.535101 5.33649 0.627531 5.04379C0.719962 4.7511 0.920228 4.58934 1.22833 4.55853L4.60205 4.05017L6.10404 0.999957Z"
      fill="#FFCC00"
    />
  </svg>
);
const SolidStar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.2106 4.55853C12.5187 4.58934 12.719 4.7511 12.8114 5.04379C12.9039 5.33649 12.8422 5.59067 12.6266 5.80635L10.1771 8.18643L10.7548 11.5601C10.8011 11.8528 10.7009 12.0878 10.4544 12.2649C10.208 12.4421 9.95378 12.4613 9.69189 12.3227L6.66479 10.7514L3.63769 12.3227C3.3758 12.4768 3.12162 12.4613 2.87514 12.2765C2.62865 12.0916 2.52852 11.8528 2.57474 11.5601L3.15243 8.18643L0.703017 5.80635C0.487346 5.59067 0.425726 5.33649 0.518156 5.04379C0.610587 4.7511 0.810853 4.58934 1.11895 4.55853L4.49267 4.05017L5.99467 0.999957C6.13331 0.722666 6.35669 0.584019 6.66479 0.584019C6.97289 0.584019 7.19626 0.722666 7.33491 0.999957L8.83691 4.05017L12.2106 4.55853ZM8.99866 7.7936L11.3094 5.52905L8.09746 5.0669L6.66479 2.15534L5.23211 5.0669L2.02015 5.52905L4.33092 7.7936L3.79944 11.0056L6.66479 9.48046L9.53014 11.0056L8.99866 7.7936Z"
      fill="#FFCC00"
    />
  </svg>
);
function StudentsFeedback() {
  const f = useTranslations("StudentsFeedback");
  return (
    <section className="flex flex-col gap-8 items-center px-5 md:px-10 lg:px-24 xl:px-28 py-20 w-full bg-white ">
      <div className="flex flex-col gap-4 items-center w-full ">
        <div className="py-0 pr-1 ps-3.5 text-xl font-bold border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
          {f("head")}
        </div>
        <div className="w-full text-3xl font-bold text-center text-zinc-900 max-sm:text-2xl">
          {f("title")}
        </div>
      </div>

      <div className="flex gap-4 lg:gap-8 justify-center flex-col lg:flex-row">
        <div className="flex flex-col flex-1 gap-8 p-5 bg-white rounded-3xl border border-solid border-gray max-sm:p-5 max-sm:w-full">
          <div className="flex gap-5 items-start">
            <div className="h-[82px] w-[82px] bg-slate-500 flex justify-center items-center text-5xl text-white rounded-lg">
              <span>F</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="text-xl font-bold text-slate-900 line-clamp-1">
                {f("H1")}
              </div>
              {/*  <div className="text-base tracking-wide text-neutral-400">
                    {f("T1")} 
                  </div>*/}
              <div className="flex gap-0.5">
                <div className="flex gap-0.5">
                  <FillStar />
                  <FillStar />
                  <FillStar />
                  <FillStar />
                  <FillStar />
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg tracking-wide text-zinc-900 line-clamp-5">
            {f("P1")}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-8 p-5 bg-white rounded-3xl border border-solid border-gray max-sm:p-5 max-sm:w-full">
          <div className="flex gap-5 items-start">
            <div className="h-[82px] w-[82px] bg-emerald-800 flex justify-center items-center text-5xl text-white rounded-lg">
              <span>B</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="text-xl font-bold text-slate-900 line-clamp-1">
                {f("H2")}
              </div>
              {/* <div className="text-base tracking-wide text-neutral-400">
                     {f("T2")} 
                  </div>*/}
              <div className="flex gap-0.5">
                <div className="flex gap-0.5">
                  <FillStar />
                  <FillStar />
                  <FillStar />
                  <FillStar />
                  <FillStar />
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg tracking-wide text-zinc-900 line-clamp-5">
            {f("P2")}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-8 p-5 bg-white rounded-3xl border border-solid border-gray max-sm:p-5 max-sm:w-full">
          <div className="flex gap-5 items-start">
            <div className="h-[82px] w-[82px] bg-sky-800 flex justify-center items-center text-5xl text-white rounded-lg">
              <span>H</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="text-xl font-bold text-slate-900 line-clamp-1">
                {f("H3")}
              </div>
              {/*<div className="text-base tracking-wide text-neutral-400">
                     {f("T3")} 
                  </div>*/}
              <div className="flex gap-0.5">
                <div className="flex gap-0.5">
                  <FillStar />
                  <FillStar />
                  <FillStar />
                  <FillStar />
                  <FillStar />
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg tracking-wide text-zinc-900 line-clamp-5">
            {f("P3")}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 lg:gap-10 justify-between items-center  px-3 py-8 md:px-10 md:py-16 rounded-3xl border border-solid bg-neutral-50 border-zinc-100 w-full">
        <div className="flex flex-col gap-1 items-center ">
          <div className="flex items-center text-6xl font-bold  text-zinc-900 max-sm:text-4xl">
            <Counter end={10} suffix="K" />
            <div>+</div>
          </div>
          <div className="text-base tracking-wide leading-6 text-center text-zinc-800 ">
            {f("Students")}
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center ">
          <div className="flex items-center text-6xl font-bold  text-zinc-900 max-sm:text-4xl">
            <Counter end={900} />
            <div>+</div>
          </div>
          <div className="text-base tracking-wide leading-6 text-center text-zinc-800 ">
            {f("Universities")}
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center ">
          <div className="flex items-center text-6xl font-bold  text-zinc-900 max-sm:text-4xl">
            <Counter end={1500} />
            <div>+</div>
          </div>
          <div className="text-base tracking-wide leading-6 text-center text-zinc-800 ">
            {f("LanguageSchools")}
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center ">
          <div className="flex items-center text-6xl font-bold  text-zinc-900 max-sm:text-4xl">
            <Counter end={100} suffix="K" />
            <div>+</div>
          </div>
          <div className="text-base tracking-wide leading-6 text-center text-zinc-800 ">
            {f("Programs")}
          </div>
        </div>
      </div>
    </section >
  )
}

export default StudentsFeedback
