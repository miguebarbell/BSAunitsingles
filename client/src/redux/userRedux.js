import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: false,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = false;
      state.isFetching = false;
    },
    resetLogin: (state) => {
      state.error = false;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut, resetLogin } = userSlice.actions;
export default userSlice.reducer;