//app/(public)/shop/page.tsx
'use client'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MoveLeftIcon, SearchXIcon } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { dummyProducts } from '@/app/asset/asset'

const GRID = 'grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4'

function ShopContent() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')?.trim() || ''

    const products = dummyProducts

    const filteredProducts = search
        ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products

    return (
        <section className="min-h-[70vh] w-full bg-linear-to-b from-white to-slate-50">
            <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-12">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        {search && (
                            <Link
                                href="/shop"
                                className="group mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 active:scale-95"
                            >
                                <MoveLeftIcon size={16} className="transition-transform group-hover:-translate-x-1" />
                                All products
                            </Link>
                        )}
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            {search ? (
                                <>Results for <span className="text-indigo-600">“{search}”</span></>
                            ) : (
                                <>All <span className="text-indigo-600">Products</span></>
                            )}
                        </h1>
                    </div>

                    <p className="text-sm text-slate-500 sm:text-base">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </p>
                </div>

                {/* Grid or empty state */}
                {filteredProducts.length > 0 ? (
                    <div className={`mt-8 sm:mt-10 ${GRID}`}>
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
                        <div className="grid size-14 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                            <SearchXIcon size={24} />
                        </div>
                        <h2 className="mt-5 text-xl font-semibold text-slate-800">No products found</h2>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            We couldn’t find anything matching “{search}”. Try a different keyword or browse everything.
                        </p>
                        <Link
                            href="/shop"
                            className="mt-6 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition active:scale-95"
                        >
                            View all products
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

function ShopSkeleton() {
    return (
        <section className="min-h-[70vh] w-full bg-linear-to-b from-white to-slate-50">
            <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
                <div className="h-10 w-56 animate-pulse rounded-lg bg-slate-200" />
                <div className={`mt-10 ${GRID}`}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-200/70" />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function Shop() {
    return (
        <Suspense fallback={<ShopSkeleton />}>
            <ShopContent />
        </Suspense>
    )
}