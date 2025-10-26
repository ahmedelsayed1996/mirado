import React from 'react'

function BioHead({ button, headLine, summary, bg }: any) {
    return (
        <div className={`flex flex-col items-center tracking-tight leading-7 ${bg} pt-24 pb-16 capitalize`}>
            <div className="justify-center px-8 py-1.5 font-medium text-primary whitespace-nowrap border border-primary border-solid rounded-[80px] max-md:px-5  text-base md:text-xl">
                {button}
            </div>
            <div className="self-stretch mt-3 w-full text-2xl md:text-4xl font-semibold  text-center text-gray-900 max-md:max-w-full tracking-normal">
                {headLine}
            </div>
            <div className="mt-6 leading-7 text-center text-zinc-500 text-base md:text-xl">
                {summary}
            </div>
        </div>
    )
}

export default BioHead
