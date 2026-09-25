//app/(public)/shop/[username]/page.tsx

'use client'
import ProductCard from "@/components/ProductCard"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MailIcon, MapPinIcon } from "lucide-react"
import Loading from "@/components/Loading"
import Image from "next/image"
import { dummyStoreData, dummyProducts, Product, StoreInfo } from "@/app/asset/asset"

export default function StoreShop() {

    const { username } = useParams()
    const [products, setProducts] = useState<Product[]>([])
    const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchStoreData = async () => {
        // username abhi use nahi ho raha kyunki fully dummy data hai —
        // real backend aane pe yahan username ke hisaab se fetch karna
        setStoreInfo(dummyStoreData)
        setProducts(dummyProducts)
        setLoading(false)
    }

    useEffect(() => {
        fetchStoreData()
    }, [])

    return !loading ? (
        <div className="min-h-[70vh] w-full bg-[#eef1f5]">
            <div className="mx-6">

                {/* Store Info Banner */}
                {storeInfo && (
                    <div className="max-w-7xl mx-auto bg-[#eef1f5] rounded-3xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 shadow-[6px_6px_14px_#c7ccd3,-6px_-6px_14px_#ffffff]">
                        <Image
                            src={storeInfo.logo}
                            alt={storeInfo.name}
                            className="size-32 sm:size-38 object-cover rounded-md shadow-[4px_4px_8px_#c7ccd3,-4px_-4px_8px_#ffffff]"
                            width={200}
                            height={200}
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-semibold text-slate-800">{storeInfo.name}</h1>
                            <p className="text-sm text-slate-600 mt-2 max-w-lg">{storeInfo.description}</p>
                            <div className="space-y-2 text-sm text-slate-500 mt-4">
                                <div className="flex items-center">
                                    <MapPinIcon className="w-4 h-4 text-slate-500 mr-2" />
                                    <span>{storeInfo.address}</span>
                                </div>
                                <div className="flex items-center">
                                    <MailIcon className="w-4 h-4 text-slate-500 mr-2" />
                                    <span>{storeInfo.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products */}
                <div className="max-w-7xl mx-auto mb-40">
                    <h1 className="text-2xl mt-12 text-slate-600">Shop <span className="text-slate-800 font-medium">Products</span></h1>
                    <div className="mt-5 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-[#eef1f5] rounded-2xl p-3 shadow-[5px_5px_10px_#c7ccd3,-5px_-5px_10px_#ffffff] hover:shadow-[inset_2px_2px_5px_#c7ccd3,inset_-2px_-2px_5px_#ffffff] transition-all duration-200"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : <Loading />
}