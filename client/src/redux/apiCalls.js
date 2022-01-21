import {loginFailure, loginStart, loginSuccess} from "./userRedux";
import {publicRequest, userRequest} from "../requestMethods";

export const login = async (dispatch, user) => {
	dispatch(loginStart())
	try {
		const res = await publicRequest.post("api/auth/login", user)
		dispatch(loginSuccess(res.data))
	} catch (e) {
		dispatch(loginFailure())
	}
}

export const register = async (dispatch, user) => {
	try {
		// const res = await publicRequest.post("api/auth/register", user)
		await publicRequest.post("api/auth/register", user)
		// dispatch(loginSuccess(res.data))
		login(dispatch, user)
	} catch (e) {
		dispatch(loginFailure())
	}
}

export const pushOrder = async (order) => {
	// console.log(order)
	try {
		await publicRequest.post("api/orders", order)
		// await userRequest.post("api/orders", order)
	} catch(e) {
		console.log(e)}
}

export const getOrder = async (id, user) => {
	try {
		// console.log(user)
		return await userRequest.post(`api/orders/get/${id}`, user)
		// console.log(res)
	} catch (e) {
		console.log(e)
	}
}

export const getOrders = async () => {
	try {
		return await userRequest.get("api/orders/")
	} catch (err) {
		console.log(err)
	}
}

export const getProducts = async () => {
	try {
		return await publicRequest.get("api/products/")
	} catch (err) {
		console.log(err)
	}
}

export const findProduct = async (query) => {
	console.log("findProduct")
	console.log(query)
	try {
		console.log("trying")
		return await publicRequest.get(`/api/products/search/${query}`)
	} catch (err) {
		console.log(err)
	}
}
