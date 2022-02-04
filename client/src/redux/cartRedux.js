import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
		weight: 0,
		shipping: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			if (state.products.filter(el => el._id === action.payload._id).length !== 0) {
				const index = state.products.findIndex(el => el._id === action.payload._id);
				// console.log(index)
				state.products[index].quantity += action.payload.quantity;
				state.products[index].priceQty += action.payload.priceQty;
				state.products[index].weight += action.payload.weight;
			} else {
				state.products.push(action.payload)
			}
			state.quantity += action.payload.quantity;
			state.total += action.payload.priceQty;
			state.weight += action.payload.weight;
		},
		delProduct: (state, action) => {
			if (state.products.length <= 1) {
				state.products = []
				state.quantity = 0;
				state.total = 0;
				state.weight = 0;
			} else {
				state.products = state.products.filter(el => el._id !== action.payload._id)
				state.quantity -= action.payload.quantity;
				state.total -= action.payload.priceQty;
				state.weight -= action.payload.weight;
			}
		},
		moreProduct: (state, action) => {
			const index = state.products.findIndex(el => el._id === action.payload._id);
			state.products[index].quantity += 1;
			state.products[index].priceQty += action.payload.price;
			state.products[index].priceQty = +state.products[index].priceQty.toFixed(2);
			state.products[index].weight += action.payload.weight;
			state.quantity += 1;
			state.total += action.payload.price;
			state.total = +state.total.toFixed(2);
			state.weight += action.payload.weight;
		},
		lessProduct: (state, action) => {
			const index = state.products.findIndex(el => el._id === action.payload._id);
			state.products[index].quantity -= 1;
			state.products[index].priceQty -= action.payload.price;
			state.products[index].priceQty = +state.products[index].priceQty.toFixed(2);
			state.products[index].weight -= action.payload.weight;
			state.quantity -= 1;
			state.total -= action.payload.price;
			state.total = +state.total.toFixed(2);
			state.weight -= action.payload.weight;
			if (state.weight < 0) state.weight = 0;
			if (state.total < 0) state.total = 0;
			if (state.products[index].priceQty < 0) state.products[index].priceQty = 0;
		},
		delCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
			state.weight = 0;
		},
		setShipping: (state, action) => {
			state.shipping = action.payload.shipping;
		}
	},
})

export const { addProduct, moreProduct, lessProduct, delProduct, delCart, setShipping } = cartSlice.actions;
export default cartSlice.reducer;
