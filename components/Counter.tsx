// components/Counter.tsx

import React from 'react'
import { RootState, AppDispatch } from "../redux/store"
import { addToCart, removeFromCart } from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";


export const Counter = ({ productId }:any) => {

    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart({ productId }))
    }
    return (
        <>

            {
                cartItems[productId] && (
                    <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
                        <button onClick={removeFromCartHandler} className="p-1 select-none">-</button>
                        <p className="p-1">{cartItems[productId]}</p>
                        <button onClick={addToCartHandler} className="p-1 select-none">+</button>
                    </div>

                )
            }


        </>


    )

}
