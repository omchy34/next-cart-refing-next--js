'use client'
import { ArrowRight, MessageSquareIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Product } from "@/app/asset/asset"
import RatingStars from "./RatingStars"

interface ProductDescriptionProps {
    product: Product;
}

const TABS = ['Description', 'Reviews'] as const

const ProductDescription = ({ product }: ProductDescriptionProps) => {

    const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>('Description')

    const ratings = product.rating ?? []
    const averageRating = ratings.length
        ? ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length
        : 0

    return (
        <div className="text-sm text-slate-600">

            {/* Tabs */}
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition sm:px-7 ${
                            tab === selectedTab
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        {tab}
                        {tab === 'Reviews' && ratings.length > 0 && (
                            <span className="ml-1.5 text-xs text-slate-400">({ratings.length})</span>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">

                {/* Description */}
                {selectedTab === "Description" && (
                    <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
                        {product.description}
                    </p>
                )}

                {/* Reviews */}
                {selectedTab === "Reviews" && (
                    ratings.length === 0 ? (
                        <div className="flex flex-col items-center py-10 text-center">
                            <div className="grid size-12 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                                <MessageSquareIcon size={22} />
                            </div>
                            <p className="mt-4 font-medium text-slate-800">No reviews yet</p>
                            <p className="mt-1 text-sm text-slate-500">Be the first to review this product.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-10">

                            {/* Summary */}
                            <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                                <p className="text-5xl font-semibold text-slate-900">{averageRating.toFixed(1)}</p>
                                <div>
                                    {/* <RatingStars value={averageRating} size={18} /> */}
                                    <p className="mt-1 text-sm text-slate-500">
                                        {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
                                    </p>
                                </div>
                            </div>

                            {/* List */}
                            <ul className="divide-y divide-slate-100">
                                {ratings.map((item, index) => (
                                    <li key={index} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                                        <Image
                                            src={item.user.image}
                                            alt={item.user.name}
                                            width={80}
                                            height={80}
                                            className="size-10 shrink-0 rounded-full object-cover"
                                        />
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <p className="font-medium text-slate-800">{item.user.name}</p>
                                                <RatingStars value={item.rating} size={14} />
                                            </div>
                                            <p className="mt-0.5 text-xs text-slate-400">
                                                {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <p className="mt-2 max-w-lg wrap-break-words text-sm leading-relaxed text-slate-600">
                                                {item.review}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                )}
            </div>

            {/* Store */}
            <div className="mt-6 flex w-full items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:w-fit sm:pr-8">
                <Image
                    src={product.store.logo}
                    alt={product.store.name}
                    width={88}
                    height={88}
                    className="size-12 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                    <p className="truncate font-medium text-slate-800">Product by {product.store.name}</p>
                    <Link
                        href={`/shop/${product.store.username}`}
                        className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition hover:gap-2.5"
                    >
                        View store <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription