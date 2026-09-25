'use client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

interface PageTitleProps {
    heading: string;
    text?: string;
    path?: string;
    linkText?: string;
}

const PageTitle = ({ heading, text, path = "/", linkText }: PageTitleProps) => {
    return (
        <div className="my-6 sm:my-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{heading}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                {text && <p className="text-sm text-slate-500 sm:text-base">{text}</p>}
                {linkText && (
                    <Link
                        href={path}
                        className="group flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                    >
                        {linkText}
                        <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default PageTitle