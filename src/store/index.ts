import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { albumsApi, photoApi } from "./api";
import {
  songsReducer,
  moviesReducer,
  songAction,
  movieAction,
} from "./Store-Slice/Movie.Song.slice";
import {
  carReducer,
  formReducer,
  carsAction,
  formAction,
  usersReducers,
} from "./Store-Slice";
import { reset } from "./Store-Action";
const store = configureStore({
  reducer: {
    songs: songsReducer,
    movies: moviesReducer,
    cars: carReducer,
    form: formReducer,
    users: usersReducers,
    albums: albumsApi.reducer,
    photos: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photoApi.middleware);
  },
});
setupListeners(store.dispatch);
//TEMP
// window.store = store;
export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
export { store, reset, songAction, movieAction, carsAction, formAction };
export * from "./thunk";
export * from "./api";
