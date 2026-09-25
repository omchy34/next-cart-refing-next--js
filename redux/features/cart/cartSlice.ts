import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    total: number
    cartItems: Record<string, number>
}

interface CartActionPayload {
    productId: string
}

const initialState: CartState = {
    total: 0,
    cartItems: {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartActionPayload>) => {
            const { productId } = action.payload

            if (state.cartItems[productId]) {
                state.cartItems[productId]++
            } else {
                state.cartItems[productId] = 1
            }
            state.total += 1
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload
            if (state.cartItems[productId]) {
                state.cartItems[productId]--
                state.total -= 1
            }
            if (state.cartItems[productId] === 0) {
                delete state.cartItems[productId]
            }
        },
        deleteFromCart: (state, action: PayloadAction<CartActionPayload>) => {
            const { productId } = action.payload
            state.total -= state.cartItems[productId] ? state.cartItems[productId] : 0

            delete state.cartItems[productId]

        },
        clearCart: (state, action: PayloadAction<CartActionPayload>) => {
            state.cartItems = {},
                state.total = 0
        },
    },

})
export const { addToCart, removeFromCart, clearCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer