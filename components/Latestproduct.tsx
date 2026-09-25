'use client'
import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { dummyProducts } from '@/app/asset/asset'

const LatestProducts = () => {

    const displayQuantity = 4
    const products = dummyProducts

    const latest = products
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, displayQuantity)

    return (
        <section className='w-full bg-linear-to-b from-white to-slate-50'>
            <div className='mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20'>

                {/* Header */}
                <div className='flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                        <span className='inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium text-indigo-600'>
                            ✦ Fresh Arrivals
                        </span>
                        <h2 className='mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl'>
                            Latest Products
                        </h2>
                        <p className='mt-2 text-sm text-slate-500 sm:text-base'>
                            Showing {latest.length} of {products.length} products
                        </p>
                    </div>

                    <Link
                        href='/shop'
                        className='group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 active:scale-95'
                    >
                        View all products
                        <ArrowRightIcon size={16} className='transition-transform group-hover:translate-x-1' />
                    </Link>
                </div>

                {/* Product grid: 1 col -> 2 cols -> 4 cols */}
                <div className='mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:mt-12 sm:gap-6 lg:grid-cols-4'>
                    {latest.map((product) => (
                        <div
                            key={product.id}
                            className='rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10'
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LatestProducts