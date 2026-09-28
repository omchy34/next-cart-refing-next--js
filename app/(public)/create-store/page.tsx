'use client'
import { useEffect, useState, ChangeEvent, FormEvent } from "react"
import Image from "next/image"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

interface StoreInfo {
    name: string
    username: string
    description: string
    email: string
    contact: string
    address: string
    image: File | string
}

export default function CreateStore() {

    const { user } = useUser();
    const router = useRouter();
    const { getToken, isLoaded, isSignedIn } = useAuth();

    const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false)
    const [status, setStatus] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<string>("")
    const [previewUrl, setPreviewUrl] = useState<string>('')

    const [submitting, setSubmitting] = useState<boolean>(false)

    const [storeInfo, setStoreInfo] = useState<StoreInfo>({
        name: "",
        username: "",
        description: "",
        email: "",
        contact: "",
        address: "",
        image: ""
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value })
    }

    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setStoreInfo({ ...storeInfo, image: file })
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    // Revoke the object URL when it changes/unmounts so we don't leak memory
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    const fetchSellerStatus = async (): Promise<void> => {
        try {
            const token = await getToken();
            if (!token) return; // token nahi hai to request mat bhejo

            const { data } = await axios.get('/api/store/create', {
                headers: { Authorization: `Bearer ${token}` },
            })

            toast.error(data.status) 

            if (["approved", "pending", "rejected"].includes(data.status)) {
                setStatus(data.status)
                setAlreadySubmitted(true)

                switch (data.status) {
                    case "approved":
                        setMessage("Your store has been approved, you can now add products to your store from dashboard")
                        setTimeout(() => router.push("/store"), 5000)
                        break
                    case "pending":
                        setMessage("Your store request is pending, please wait for admin to approve your store")
                        break
                    case "rejected":
                        setMessage("Your store request has been rejected, contact the admin for more details")
                        break
                }
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (!user) {
            toast.error("Please login to continue.")
            return
        }

        if (!(storeInfo.image instanceof File)) {
            toast.error("Please upload a store logo.")
            return
        }

        setSubmitting(true)
        const toastId = toast.loading("Submitting your store...")

        try {
            const token = await getToken();
            const formData = new FormData();

            formData.append("name", storeInfo.name)
            formData.append("username", storeInfo.username)
            formData.append("description", storeInfo.description)
            formData.append("email", storeInfo.email)
            formData.append("contact", storeInfo.contact)
            formData.append("address", storeInfo.address)
            formData.append("image", storeInfo.image)

            const { data } = await axios.post('/api/store/create', formData,
                { headers: { Authorization: `Bearer ${token}` } }
            )
           
            toast.success(data.message, { id: toastId })
        } catch (err: any) {
            toast.error(err?.response?.data?.error || err.message, { id: toastId })
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        if (!isLoaded) return
        if (isSignedIn) fetchSellerStatus()
        else setLoading(false)
    }, [isLoaded, isSignedIn])


    if (!user) {
        return (
            <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-500">
                <h1 className="text-center"> please login to continue </h1>
            </div>
        )
    }

    return !loading ? (
        <>
            {!alreadySubmitted ? (
                <div className="mx-6 min-h-[70vh] my-16">
                    <form onSubmit={onSubmitHandler} className="max-w-7xl mx-auto flex flex-col items-start gap-3 text-slate-600">
                        {/* Title */}
                        <div>
                            <h1 className="text-3xl text-violet-700">Add Your <span className="text-slate-900 font-medium">Store</span></h1>
                            <p className="max-w-lg text-slate-500">To become a seller on GoCart, submit your store details for review. Your store will be activated after admin verification.</p>
                        </div>

                        <label className="mt-10 cursor-pointer">
                            <span className="text-slate-700">Store Logo</span>
                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    className="rounded-lg mt-2 h-16 w-auto"
                                    alt=""
                                    width={150}
                                    height={100}
                                />
                            ) : (
                                <div className="rounded-lg mt-2 h-16 w-16 bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                                    Upload
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={onImageChangeHandler} hidden />
                        </label>

                        <p className="text-slate-700">Username</p>
                        <input name="username" onChange={onChangeHandler} value={storeInfo.username} type="text" placeholder="Enter your store username" className="border border-slate-300 outline-violet-500 w-full max-w-lg p-2 rounded placeholder:text-slate-400" />

                        <p className="text-slate-700">Name</p>
                        <input name="name" onChange={onChangeHandler} value={storeInfo.name} type="text" placeholder="Enter your store name" className="border border-slate-300 outline-violet-500 w-full max-w-lg p-2 rounded placeholder:text-slate-400" />

                        <p className="text-slate-700">Description</p>
                        <textarea name="description" onChange={onChangeHandler} value={storeInfo.description} rows={5} placeholder="Enter your store description" className="border border-slate-300 outline-violet-500 w-full max-w-lg p-2 rounded resize-none placeholder:text-slate-400" />

                        <p className="text-slate-700">Email</p>
                        <input name="email" onChange={onChangeHandler} value={storeInfo.email} type="email" placeholder="Enter your store email" className="border border-slate-300 outline-violet-500 w-full max-w-lg p-2 rounded placeholder:text-slate-400" />

                        <p className="text-slate-700">Contact Number</p>
                        <input name="contact" onChange={onChangeHandler} value={storeInfo.contact} type="text" placeholder="Enter your store contact number" className="border border-slate-300 outline-violet-500 w-full max-w-lg p-2 rounded placeholder:text-slate-400" />

                        <p className="text-slate-700">Address</p>
                        <textarea name="address" onChange={onChangeHandler} value={storeInfo.address} rows={5} placeholder="Enter your store address" className="border border-slate-300 outline-violet-500 w-full max-w-lg p-2 rounded resize-none placeholder:text-slate-400" />

                        <button disabled={submitting} className="bg-violet-700 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-violet-800 transition disabled:opacity-60">
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="min-h-[80vh] flex flex-col items-center justify-center">
                    <p className="sm:text-2xl lg:text-3xl mx-5 font-semibold text-slate-600 text-center max-w-2xl">{message}</p>
                    {status === "approved" && <p className="mt-5 text-slate-400">redirecting to dashboard in <span className="font-semibold">5 seconds</span></p>}
                </div>
            )}
        </>
    ) : (<Loading />)
}