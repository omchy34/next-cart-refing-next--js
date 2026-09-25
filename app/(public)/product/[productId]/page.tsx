//app/(public)/product/[productId]/page.tsx
'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ChevronRightIcon, PackageSearchIcon } from "lucide-react";
import { Product as ProductType } from "@/app/asset/asset";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Product() {

    const params = useParams();
    const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;

    const products = useSelector((state: RootState) => state.product.list);

    const product = useMemo<ProductType | undefined>(
        () => products.find((p) => p.id === productId),
        [products, productId]
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    return (
        <section className="min-h-[70vh] w-full bg-linear-to-b from-white to-slate-50">
            <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">

                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="mb-6 mt-6 sm:mb-8 sm:mt-8">
                    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
                        <li>
                            <Link href="/" className="transition hover:text-indigo-600">Home</Link>
                        </li>
                        <ChevronRightIcon size={14} className="text-slate-300" />
                        <li>
                            <Link href="/shop" className="transition hover:text-indigo-600">Shop</Link>
                        </li>
                        {product && (
                            <>
                                <ChevronRightIcon size={14} className="text-slate-300" />
                                <li className="capitalize">{product.category}</li>
                                <ChevronRightIcon size={14} className="hidden text-slate-300 sm:block" />
                                <li className="hidden max-w-[16rem] truncate font-medium text-slate-800 sm:block" aria-current="page">
                                    {product.name}
                                </li>
                            </>
                        )}
                    </ol>
                </nav>

                {product ? (
                    <div className="space-y-10 sm:space-y-14">
                        <ProductDetails product={product} />
                        <ProductDescription product={product} />
                    </div>
                ) : products.length === 0 ? (
                    <ProductSkeleton />
                ) : (
                    <NotFound />
                )}
            </div>
        </section>
    );
}

function ProductSkeleton() {
    return (
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="aspect-square w-full animate-pulse rounded-3xl bg-slate-200/70" />
            <div className="space-y-4">
                <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="h-9 w-3/4 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-6 w-1/3 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-24 w-full animate-pulse rounded-xl bg-slate-200/70" />
                <div className="h-12 w-full animate-pulse rounded-full bg-slate-200 sm:w-64" />
            </div>
        </div>
    );
}

function NotFound() {
    return (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                <PackageSearchIcon size={24} />
            </div>
            <h1 className="mt-5 text-xl font-semibold text-slate-800">Product not found</h1>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
                This product may have been removed or the link is incorrect.
            </p>
            <Link
                href="/shop"
                className="mt-6 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition active:scale-95"
            >
                Browse all products
            </Link>
        </div>
    );
}