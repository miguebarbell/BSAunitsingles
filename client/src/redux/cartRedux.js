import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			// state.quantity += 1;
			state.quantity += action.payload.quantity;
			// specify which product, its send ...product (unpacked), could be _id
			state.total += action.payload.priceQty;
			state.products.push(action.payload);
		},
	},
})

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
