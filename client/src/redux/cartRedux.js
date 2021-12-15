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
			// state.products = []
			// state.quantity = 0
			// state.total = 0
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
			// to the initial state

			// state.products = []
			// state.quantity = 0
			// state.total = 0
		},
		delProduct: (state, action) => {
			// delete the quantity
			const index = state.products.findIndex(el => el._id === action.payload._id);
			// state.products = state.products.filter(el => el !== action.payload)
			if (state.products.length <= 1) {
				state.products = []
				state.quantity = 0;
				state.total = 0;
			} else {
				console.log(index)
				console.log(action.payload)
				// delete state.products[index];
				state.products = state.products.filter(el => el._id !== action.payload._id)
				// state.products = state.products.(el => el._id !== action.payload)
				state.quantity -= action.payload.quantity;
				state.total -= action.payload.priceQty;
			}

			// state.products = []
			// state.quantity = 0
			// state.total = 0
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
		}
	},
})

export const { addProduct, moreProduct, lessProduct, delProduct } = cartSlice.actions;
export default cartSlice.reducer;
