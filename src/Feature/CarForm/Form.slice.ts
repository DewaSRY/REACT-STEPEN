import { createSlice } from "@reduxjs/toolkit";
import { carAction } from "./car.slice";

const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    cost: 0,
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeCost(state, action) {
      state.cost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(carAction.addCar, (state) => {
      state.name = "";
      state.cost = 0;
    });
  },
});
export const formAction = formSlice.actions;
export default formSlice.reducer;
