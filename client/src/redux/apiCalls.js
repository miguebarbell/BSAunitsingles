
import {loginFailure, loginStart, loginSuccess} from "./userRedux";
import { publicRequest} from "../requestMethods";

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
		const res = await publicRequest.post("api/auth/register", user)
		dispatch(loginSuccess(res.data))
	} catch (e) {
		dispatch(loginFailure())
	}
}
