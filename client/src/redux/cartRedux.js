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
			if (state.products.filter(el => el._id === action.payload._id).length !== 0) {
				const index = state.products.findIndex(el => el._id === action.payload._id);
				console.log(index)
				state.products[index].quantity += action.payload.quantity
				state.products[index].priceQty += action.payload.priceQty
			} else {
				state.products.push(action.payload)
			}
			state.quantity += action.payload.quantity;
			state.total += action.payload.priceQty;
		},
		delProduct: (state, action) => {
			if (state.products.length <= 1) {
				state.products = []
				state.quantity = 0;
				state.total = 0;
			} else {
				state.products = state.products.filter(el => el._id !== action.payload._id)
				state.quantity -= action.payload.quantity;
				state.total -= action.payload.priceQty;
			}
		},
		moreProduct: (state, action) => {
			const index = state.products.findIndex(el => el._id === action.payload._id);
			state.products[index].quantity += 1;
			state.products[index].priceQty += action.payload.price;
			state.quantity += 1;
			state.total += action.payload.price;
			},
		lessProduct: (state, action) => {
			const index = state.products.findIndex(el => el._id === action.payload._id);
			state.products[index].quantity -= 1;
			state.products[index].priceQty -= action.payload.price;
			state.quantity -= 1;
			state.total -= action.payload.price;
			if (state.total < 0) state.total = 0;
			if (state.products[index].priceQty < 0) state.products[index].priceQty = 0;
		},
		delCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		}
	},
})

export const { addProduct, moreProduct, lessProduct, delProduct, delCart } = cartSlice.actions;
export default cartSlice.reducer;
