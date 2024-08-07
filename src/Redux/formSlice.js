// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  editMode: false,
};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    toggleFormMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
});

export const { setFormData, toggleFormMode } = formSlice.actions;
export default formSlice.reducer;
