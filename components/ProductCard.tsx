'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RatingStars from './RatingStars'

interface RatingItem {
    rating: number;
}
interface Product {
    id: string | number;
    name: string;
    price: number;
    images: string[];
    rating: RatingItem[];
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const ratings = product.rating ?? []
    const average = ratings.length
        ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
        : 0

    return (
        <Link href={`/product/${product.id}`} className='group block'>
            <div className='relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100'>
                <Image
                    fill
                    sizes='(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 90vw'
                    className='object-contain p-8 transition duration-300 group-hover:scale-110 sm:p-10'
                    src={product.images[0]}
                    alt={product.name}
                />
            </div>

            <div className='flex items-start justify-between gap-3 px-1 pt-3'>
                <div className='min-w-0'>
                    <p className='line-clamp-2 text-sm font-medium text-slate-800'>{product.name}</p>
                    <div className='mt-1 flex items-center gap-1.5'>
                        <RatingStars value={average} size={13} />
                        {ratings.length > 0 && (
                            <span className='text-xs text-slate-400'>({ratings.length})</span>
                        )}
                    </div>
                </div>
                <p className='shrink-0 text-sm font-semibold text-slate-900'>{currency}{product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard