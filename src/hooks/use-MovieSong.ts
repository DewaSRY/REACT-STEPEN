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
  const { addMovie, removeMovie } = bindActionCreators(movieAction, dispatch);
  const { addSong, removeSong } = bindActionCreators(songAction, dispatch);
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
