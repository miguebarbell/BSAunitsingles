import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "parts",
    initialState: {
        products: [],
    },
    reducers: {
        refresh: (state) => {

        }
    }
})

export default productsSlice.reducer;