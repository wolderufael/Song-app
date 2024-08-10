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
      state.user.songs.push(action.payload);
    },
    editSong: (state, action) => {
      const index = state.user.songs.findIndex(
        (song) => song._id === action.payload.id
      );
      if (index !== -1) {
        state.user.songs[index] = action.payload;
      }
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
  editSong,
  deleteSong,
} = userSlice.actions;

export default userSlice.reducer;
// export const { userReducer } = userSlice.reducer;
