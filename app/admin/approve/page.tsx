'use client'

import StoreInfo from "@/components/admin/Storeinfo"
import Loading from "@/components/Loading"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface Store {
    id: string;
    userId: string;
    name: string;
    description: string;
    username: string;
    address: string;
    status: string;
    isActive: boolean;
    logo: string;
    email: string;
    contact: string;
    createdAt: string; // ISO Date String
    updatedAt: string; // ISO Date String
    user: any;
}

export default function AdminApprove() {

    const [stores, setStores] = useState<Store[]>([])
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true)


    const fetchStores = async () => {
        const token = await getToken()
        const { data } = await axios.get("/api/admin/approve-store", {
            headers: { Authorization: `Bearer ${token}` }
        })

        setStores(Object.values(data.allRequest))

        setLoading(false)
    }

    const handleApprove = async (storeId: string, status: string) => {
        const token = await getToken()
        const { data } = await axios.post("/api/admin/approve-store", { storeId, status }, {
            headers: { Authorization: `Bearer ${token}` }
        })

        toast.success(data.message)
        setStores(prev => prev.filter(s => s.id !== storeId))
        setLoading(false)
    }


    useEffect(() => {
        fetchStores()
    }, [])

    return !loading ? (
        <div className="text-slate-500 mb-28">
            <h1 className="text-2xl">Approve <span className="text-slate-800 font-medium">Stores</span></h1>

            {stores.length ? (
                <div className="flex flex-col gap-4 mt-4">
                    {stores.map((store) => (
                        <div key={store.id} className="bg-white border rounded-lg shadow-sm p-6 flex max-md:flex-col gap-4 md:items-end max-w-4xl" >
                            {/* Store Info */}
                            <StoreInfo store={store} />

                            {/* Actions */}
                            <div className="flex gap-3 pt-2 flex-wrap">
                                <button onClick={() => toast.promise(handleApprove(store.id, 'approved'), { loading: "approving" })} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm" >
                                    Approve
                                </button>
                                <button onClick={() => toast.promise(handleApprove(store.id, 'rejected'), { loading: 'rejecting' })} className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 text-sm" >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}

                </div>) : (
                <div className="flex items-center justify-center h-80">
                    <h1 className="text-3xl text-slate-400 font-medium">No Application Pending</h1>
                </div>
            )}
        </div>
    ) : <Loading />
}