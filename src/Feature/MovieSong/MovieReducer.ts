import { createSlice } from "@reduxjs/toolkit";
import { reset } from "./CreateActtion";
const movieSlice = createSlice({
  name: "movie",
  initialState: [] as string[],
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
export default movieSlice.reducer;
export const movieAction = movieSlice.actions;
