import { createSlice } from "@reduxjs/toolkit";
import { reset } from "./CreateActtion";
const songsSlice = createSlice({
  name: "song",
  initialState: [] as string[],
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
export default songsSlice.reducer;
export const songAction = songsSlice.actions;
