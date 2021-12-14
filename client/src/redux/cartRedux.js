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
			// to the initial state

			// state.products = []
			// state.quantity = 0
			// state.total = 0
		},
		delProduct: (state, action) => {
			state.quantity -= action.payload.quantity;
			state.products = state.products.filter(el => el !== action.payload)
			state.total -= action.payload.priceQty;
		},
		moreProduct: (state, action) => {
			// state.quantity += action.payload.quantity;
			// sacar uno del carro
			state.quantity += 1;
			//sacar el precio del total
			state.total += action.payload.price;
			// sacar de la cantidad
			state.products = () => {
				let productRefreshed
				state.products.filter((el) => {
					return el !== action.payload
				})
			}

		}
	},
})

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
