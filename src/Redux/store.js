import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "./songsSlice";
import formReducer from "./formSlice"
import rootSaga from "./saga";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs:songsReducer,
    formData: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
