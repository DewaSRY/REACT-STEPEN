import { createSlice } from "@reduxjs/toolkit";
import { carsAction } from "./Car.Slice";

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
    builder.addCase(carsAction.addCar, (state) => {
      state.name = "";
      state.cost = 0;
    });
  },
});
export const formAction = formSlice.actions;
export const formReducer = formSlice.reducer;
