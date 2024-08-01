import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state, action) => {
      return action.payload;
    },
    addSong: (state, action) => {
      state.push(action.payload);
    },
    deleteSong: (state, action) => {
      return state.filter((song) => song._id !== action.payload);
    },
  },
});

export const { fetchSongs,addSong,deleteSong } = songsSlice.actions;

export default songsSlice.reducer;
