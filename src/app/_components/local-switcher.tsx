'use client'
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useTransition } from 'react'

function LocalSwitcher() {
    const router = useRouter();
    const localeActive = useLocale();
    const [isPending, startTransition] = useTransition();

    const changeLanguage = (eve: ChangeEvent<HTMLSelectElement>) => {
        const currentLanguage = eve.target.value
        // console.log(eve.target.value);
        startTransition(()=>{
            router.replace(`/${currentLanguage}`)
        })
    }
    return (
        <label className="border-2 rounded">
            <p className="sr-only">Change Language</p>
            <select 
            defaultValue={localeActive}
             name="" id="" 
             className="bg-transparent py-2"
             onChange={changeLanguage} 
             disabled={isPending} >
                <option value="ar">AR</option>
                <option value="en">EN</option>
            </select>
        </label>
    )
}

export default LocalSwitcher
