import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  addSong,
  deleteSong,
  editSong,
  fetchSongs,
  fetchSongsFailure,
  fetchSongsSuccess,
} from "./userSlice.js";

import {
  addSongApi,
  deleteSongApi,
  editSongApi,
  fetchSongsApi,
} from "../Api/Api.js";

export function* fetchSongsSaga() {
  try {
    const response = yield call(fetchSongsApi);
    console.log(response);
    yield put(fetchSongsSuccess(response));
  } catch (error) {
    yield put(fetchSongsFailure());
  }
}

export function* addSongSaga(action) {
  try {
    yield call(addSongApi, action.payload);
    yield put(fetchSongs());
  } catch (error) {
    console.error("Add song failed", error);
  }
}
export function* editSongSaga(action) {
  try {
    const { song, id } = action.payload;
    yield call(editSongApi, song, id);
    yield put(fetchSongs());
  } catch (error) {
    console.error("Add song failed", error);
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
    takeLatest(fetchSongs.type, fetchSongsSaga),
    takeLatest(addSong.type, addSongSaga),
    takeLatest(editSong.type, editSongSaga),
    takeLatest(deleteSong.type, deleteSongSaga),
  ]);
}
