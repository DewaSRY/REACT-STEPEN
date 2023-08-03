import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { fetchUser, addUser, removeUser } from "../thunk";
type users = {
  name: string;
  id: number;
};
interface initialState {
  data: users[];
  isLoading: boolean;
  error: null | SerializedError;
}
const initialState: initialState = {
  data: [],
  isLoading: false,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    //get
    builder.addCase(fetchUser.pending, (state, action) => {
      const { requestStatus } = action.meta;
      state.isLoading = requestStatus === "pending";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //add
    builder.addCase(addUser.pending, (state, action) => {
      const { requestStatus } = action.meta;
      state.isLoading = requestStatus === "pending";
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //remove
    builder.addCase(removeUser.pending, (state, action) => {
      const { requestStatus } = action.meta;
      state.isLoading = requestStatus === "pending";
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      const id = action.meta.arg;
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== id);
      console.log(id);
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
export const usersReducers = usersSlice.reducer;
