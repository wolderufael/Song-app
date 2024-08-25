/*eslint-disable*/
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      username: "",
      password: "",
      songs: [],
    },
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    fetchSongs: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action) => {
      state.user.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure: (state) => {
      state.loading = false;
    },
    addSong: (state, action) => {
      state.loading = true;
    },
    addSongSuccess: (state, action) => {
      state.user.songs.push(action.payload.song);
      state.error = null;
      state.message = action.payload.message;
    },
    addSongFailure: (state, action) => {
      state.message=null;
      state.error = action.payload;
      state.loading = false;
      
    },
    editSong: (state, action) => {
      state.loading = true;
    },
    editSongSuccess: (state, action) => {
      const index = state.user.songs.findIndex(
        (song) => song._id === action.payload.updatedSongId
      );
      if (index !== -1) {
        state.user.songs[index] = action.payload.updatedSong;
      }
      state.error = null;
      state.message = action.payload.message;
    },
    editSongFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSong: (state, action) => {
      state.user.songs = state.user.songs.filter(
        (song) => song._id !== action.payload
      );
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  addSongSuccess,
  addSongFailure,
  editSong,
  editSongSuccess,
  editSongFailure,
  deleteSong,
} = userSlice.actions;

export default userSlice.reducer;
// export const { userReducer } = userSlice.reducer;
