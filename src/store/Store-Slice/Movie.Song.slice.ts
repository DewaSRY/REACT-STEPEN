import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../Store-Action";
const movieState = [] as string[];
const songState = [] as string[];

const moviesSlice = createSlice({
  name: "movie",
  initialState: movieState,
  reducers: {
    addMovie(state, action) {
      state.push(action.payload);
    },
    removeMovie(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, () => []);
  },
});
const songsSlice = createSlice({
  name: "song",
  initialState: songState,
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, () => []);
  },
});
export const songAction = songsSlice.actions;
export const movieAction = moviesSlice.actions;
export const songsReducer = songsSlice.reducer;
export const moviesReducer = moviesSlice.reducer;
