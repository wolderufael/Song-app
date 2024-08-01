import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  artist: "",
  album: "",
  genre: "",
  id:""
};

const songDetailsSlice = createSlice({
  name: "songDetails",
  initialState,
  reducers: {
    setSongDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSongDetails } = songDetailsSlice.actions;

export default songDetailsSlice.reducer;
