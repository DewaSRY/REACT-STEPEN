import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface carData {
  name: string;
  cost: number;
}
type carsData = carData & {
  id: string;
};
const initialState = {
  searchTerm: "",
  data: [] as carsData[],
};
const carSlice = createSlice({
  name: "car",
  initialState: initialState,
  reducers: {
    changeSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    addCar(state, action: PayloadAction<carData>) {
      const { name, cost } = action.payload;
      state.data.push({
        name,
        cost,
        id: nanoid(),
      });
    },
    removeCar(state, action) {
      const { id } = action.payload;
      state.data = state.data.filter((car) => {
        return car.id !== id;
      });
    },
  },
});
export const { changeSearchTerm, addCar, removeCar } = carSlice.actions;
export const carReducer = carSlice.reducer;
