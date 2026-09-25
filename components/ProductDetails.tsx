'use client'

import { CreditCardIcon, EarthIcon, TagIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Counter } from "./Counter";
import RatingStars from "./RatingStars";
import { Product } from "@/app/asset/asset";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/features/cart/cartSlice";

interface ProductDetailsProps {
    product: Product;
}

const perks = [
    { icon: EarthIcon, text: "Free shipping worldwide" },
    { icon: CreditCardIcon, text: "100% Secured Payment" },
    { icon: UserIcon, text: "Trusted by top brands" },
];

const ProductDetails = ({ product }: ProductDetailsProps) => {

    const dispatch = useDispatch()
    const router = useRouter()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)

    const productId = product.id;
    const inCart = !!cartItems[productId];
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [selected, setSelected] = useState(0);
    useEffect(() => setSelected(0), [productId]);

    const ratings = product.rating ?? [];
    const averageRating = ratings.length
        ? ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length
        : 0;

    const discount = product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    function addToCartHandler() {
        dispatch(addToCart({ productId }))
    }

    return (
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">

            {/* Gallery */}
            <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
                    {product.images[selected] && (
                        <Image
                            src={product.images[selected]}
                            alt={product.name}
                            fill
                            priority
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-contain p-8 sm:p-12"
                        />
                    )}
                    {discount > 0 && (
                        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
                            {discount}% OFF
                        </span>
                    )}
                </div>

                {product.images.length > 1 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelected(index)}
                                aria-label={`View image ${index + 1}`}
                                className={`relative size-16 shrink-0 overflow-hidden rounded-xl border bg-white transition sm:size-20 ${
                                    index === selected
                                        ? "border-indigo-500 ring-4 ring-indigo-100"
                                        : "border-slate-200 hover:border-indigo-300"
                                }`}
                            >
                                <Image src={image} alt="" fill sizes="80px" className="object-contain p-2" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
                {product.category && (
                    <span className="w-fit rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium capitalize text-indigo-600">
                        {product.category}
                    </span>
                )}

                <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    {product.name}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <RatingStars value={averageRating} />
                    <span>
                        {ratings.length > 0
                            ? `${averageRating.toFixed(1)} · ${ratings.length} ${ratings.length === 1 ? "Review" : "Reviews"}`
                            : "No reviews yet"}
                    </span>
                </div>

                <div className="mt-6 flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                        {currency}{product.price}
                    </span>
                    {discount > 0 && (
                        <span className="text-lg text-slate-400 line-through">{currency}{product.mrp}</span>
                    )}
                </div>

                {discount > 0 && (
                    <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-600">
                        <TagIcon size={14} />
                        Save {discount}% right now
                    </p>
                )}

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end">
                    {inCart && (
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-slate-800">Quantity</p>
                            <Counter productId={productId} />
                        </div>
                    )}

                    <button
                        onClick={() => (!inCart ? addToCartHandler() : router.push('/cart'))}
                        className="rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-10 py-3.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 active:scale-95 sm:min-w-44"
                    >
                        {!inCart ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>

                {/* Perks */}
                <ul className="mt-8 space-y-3 border-t border-slate-200 pt-6">
                    {perks.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-center gap-3 text-sm text-slate-600">
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                                <Icon size={16} />
                            </span>
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductDetails