import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  RootStore,
  AppDispatch,
  movieAction,
  songAction,
  reset,
} from "../store";
export function useMovieSong() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
  const dispatch = useAppDispatch();
  const { addMovie, removeMovie } = useMemo(
    () => bindActionCreators(movieAction, dispatch),
    [dispatch]
  );
  const { addSong, removeSong } = useMemo(
    () => bindActionCreators(songAction, dispatch),
    [dispatch]
  );
  const movies = useAppSelector((state) => state.movies);
  const songs = useAppSelector((state) => state.songs);
  const resetAll = () => dispatch(reset());

  return {
    movies,
    songs,
    addMovie,
    removeMovie,
    addSong,
    removeSong,
    resetAll,
  };
}
