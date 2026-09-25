'use client'
import { Counter } from "@/components/Counter";
// import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { RootState } from "@/redux/store";
import { deleteFromCart } from "@/redux/features/cart/cartSlice";
import { Product } from "@/app/asset/asset";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

interface CartArrayItem extends Product {
    quantity: number;
}

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    const products = useSelector((state: RootState) => state.product.list)
    const dispatch = useDispatch()

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartArray, setCartArray] = useState<CartArrayItem[]>([])

    const createCartArray = () => {
        let total = 0;
        const array: CartArrayItem[] = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find((product: Product) => product.id === key)
            if (product) {
                array.push({
                    ...product,
                    quantity: value as number
                });
                total += product.price * (value as number);
            }
        }
        setCartArray(array);
        setTotalPrice(total);
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    const handleDeleteItemFromCart = (productId: string) => {
        dispatch(deleteFromCart({ productId }));
    }

    return Object.keys(cartItems).length > 0 ? (
        <div className="min-h-screen w-full bg-[#eef1f5] text-slate-800">
            <div className="mx-6">
                <div className="max-w-7xl mx-auto">
                    <PageTitle heading="My Cart" text="items in your cart" linkText="Add more" />

                    <div className="flex items-start justify-between gap-5 max-lg:flex-col">

                        <table className="w-full max-w-4xl text-slate-600 table-auto">
                            <thead>
                                <tr className="max-sm:text-sm">
                                    <th className="text-left">Product</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th className="max-md:hidden">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartArray.map((item) => (
                                    <tr key={item.id} className="space-x-2">
                                        <td className="flex gap-3 my-4">
                                            <div className="flex gap-3 items-center justify-center bg-[#eef1f5] size-18 rounded-md shadow-[inset_3px_3px_6px_#c7ccd3,inset_-3px_-3px_6px_#ffffff]">
                                                <Image src={item.images[0]} className="h-14 w-auto" alt="" width={45} height={45} />
                                            </div>
                                            <div>
                                                <p className="max-sm:text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-500">{item.category}</p>
                                                <p>{currency}{item.price}</p>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Counter productId={item.id} />
                                        </td>
                                        <td className="text-center">{currency}{(item.price * item.quantity).toLocaleString()}</td>
                                        <td className="text-center max-md:hidden">
                                            <button
                                                onClick={() => handleDeleteItemFromCart(item.id)}
                                                className="bg-[#eef1f5] text-red-500 p-2.5 rounded-full shadow-[3px_3px_6px_#c7ccd3,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#c7ccd3,inset_-2px_-2px_4px_#ffffff] transition-all duration-200"
                                            >
                                                <Trash2Icon size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <OrderSummary totalPrice={totalPrice} items={cartArray} /> */}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] w-full bg-[#eef1f5] flex items-center justify-center text-slate-400">
            <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
        </div>
    )
}