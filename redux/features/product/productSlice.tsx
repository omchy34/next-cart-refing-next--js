import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyProducts, Product} from "../../../app/asset/asset"

const productSlice = createSlice({
    name: "product",
    initialState: {
        list: dummyProducts,
    },

    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            state.list = action.payload
        },
        clearProduct: (state) => {
            state.list = []
        }
    }

})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer