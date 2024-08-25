/* eslint-disable */

import { all, call, put, takeLatest } from "redux-saga/effects";
import {
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
} from "./userSlice.js";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "./authorizationSlice.js";
import {
  loginUserApi,
  registerUserApi,
  logoutUserApi,
  fetchSongsApi,
  editSongApi,
  addSongApi,
  deleteSongApi,
} from "../Api/Api";

function* registerUserSaga(action) {
  try {
    const userData = yield call(
      registerUserApi,
      action.payload.username,
      action.payload.password
    );

    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }

    yield put(registerSuccess(userData));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* loginUserSaga(action) {
  try {
    const userData = yield call(
      loginUserApi,
      action.payload.username,
      action.payload.password
    );
    yield put(loginSuccess(userData));
    console.log("Token stored and login successful");
    yield put(fetchSongs());
  } catch (error) {
    console.log("login error" + error.message);
    yield put(loginFailure("Username or Password is Invalid!"));
  }
}

function* logoutUserSaga() {
  try {
    yield call(logoutUserApi);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

export function* fetchSongsSaga() {
  try {
    const response = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(response));
  } catch (error) {
    yield put(fetchSongsFailure());
  }
}

export function* addSongSaga(action) {
  try {
    const response = yield call(addSongApi, action.payload);
    yield put(fetchSongs());
    console.log("Response: ",response);
    yield put(addSongSuccess(response));
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}
export function* editSongSaga(action) {
  try {
    const { song, id } = action.payload;
    const response = yield call(editSongApi, song, id);
    yield put(editSongSuccess(response))
    yield put(fetchSongs());
  } catch (error) {
     yield put(editSongFailure(error.message));
  }
}

export function* deleteSongSaga(action) {
  try {
    yield call(deleteSongApi, action.payload);
    yield put(fetchSongs());
  } catch (error) {
    console.error("Delete song failed", error);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(registerRequest.type, registerUserSaga),
    takeLatest(loginRequest.type, loginUserSaga),
    takeLatest(logoutRequest.type, logoutUserSaga),
    takeLatest(fetchSongs.type, fetchSongsSaga),
    takeLatest(addSong.type, addSongSaga),
    takeLatest(editSong.type, editSongSaga),
    takeLatest(deleteSong.type, deleteSongSaga),
  ]);
}
