import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure,registerSuccess,registerFailure } = authSlice.actions;
export default authSlice.reducer;
