import { configureStore } from "@reduxjs/toolkit";
import songDetailsReducer from "./songDetailsSlice";
import songsReducer from "./songsSlice"

const store = configureStore({
  reducer: {
    songs:songsReducer,
    songDetails: songDetailsReducer,
  },
});

export default store;
