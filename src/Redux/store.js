import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songDetailsReducer from "./songDetailsSlice";
import songsReducer from "./songsSlice";
import rootSaga from "./saga";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs:songsReducer,
    songDetails: songDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
