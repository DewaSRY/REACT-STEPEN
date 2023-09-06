import { configureStore } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import carReducer, { carAction } from "./CarForm/car.slice";
import formReducer, { formAction } from "./CarForm/Form.slice";
import MovieReducer, { movieAction } from "./MovieSong/MovieReducer";
import SongReducer, { songAction } from "./MovieSong/SongReducer";
import { reset } from "./MovieSong/CreateActtion";
import userReducer from "./ApiAsync/userReducer";
import { UserThunkAction } from "./ApiAsync/userThunk";
import albumsApi from "./ApiAsync/albumsApi";
import photoApi from "./ApiAsync/photoAPI";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useMemo } from "react";
export const store = configureStore({
  reducer: {
    songs: SongReducer,
    movies: MovieReducer,
    cars: carReducer,
    form: formReducer,
    users: userReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photoApi.middleware);
  },
});
setupListeners(store.dispatch);
type RootStore = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useSelectors: TypedUseSelectorHook<RootStore> = useSelector;
export function useReducerDispatch() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const actionThunk = useMemo(
    () => bindActionCreators(UserThunkAction, dispatch),
    [dispatch]
  );
  const movieSongRest = () => dispatch(reset());
  return {
    ...bindActionCreators(carAction, dispatch),
    ...bindActionCreators(formAction, dispatch),
    ...bindActionCreators(movieAction, dispatch),
    ...bindActionCreators(songAction, dispatch),
    ...actionThunk,
    movieSongRest,
  };
}
export { albumsApi as albumsQuery, photoApi as photoQuery };
export default store;
