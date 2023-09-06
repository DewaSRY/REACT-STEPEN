import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    searchTerms: "",
    data: [] as {
      name: string;
      price: number;
      id: number;
    }[],
  },
  reducers: {
    addCar(state, action: PayloadAction<{ name: string; price: number }>) {
      const { name, price } = action.payload;
      state.data.push({
        name,
        price,
        id: Math.ceil(Math.random() * 100),
      });
    },
    removeCar(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.data = state.data.filter((car) => car.id !== id);
    },
    changeSearchTerms(state, action: PayloadAction<string>) {
      state.searchTerms = action.payload;
    },
  },
});

export const carAction = carsSlice.actions;
export default carsSlice.reducer;
