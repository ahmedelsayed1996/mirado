import React from 'react'

function Loader() {
    return (
        <div className=" flex items-center justify-center h-screen">
           
            <div className="grid gap-3">
                <div className="flex items-center justify-center">
                    <svg className="animate-spin border-primary"
                        xmlns="http://www.w3.org/2000/svg" width="56" height="56"
                        viewBox="0 0 56 56" fill="none">
                        <circle cx="28" cy="28" r="26" stroke="#1e4c83"
                            strokeWidth="4" strokeDasharray="12 12" />
                    </svg>
                </div>
                <span
                    className="text-black text-sm font-normal leading-snug">Loading...</span>
            </div>
        </div>


    )
}

export default Loader
