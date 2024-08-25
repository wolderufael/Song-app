import { createSlice } from "@reduxjs/toolkit";
/*eslint-disable*/
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    username: null,
    message: null,
    error: null,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.message = action.payload.message;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    registerRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.token = action.payload;
      state.message = action.payload.message;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
