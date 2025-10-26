import Link from 'next/link'
import React from 'react'
import useCurrentLang from '../_hooks/useCurrentLang';
import { useTranslations } from 'next-intl';

export default function Button({ url }: { url: string }) {
    const language = useCurrentLang();
    const t = useTranslations("Universities");
    return (
        <Link
            className="inline-block rounded border border-primary px-12 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none transition-all duration-300 "
            href={`${language}/${url}`}
        >
            {t("viewallButton")}
        </Link>
    )
}
