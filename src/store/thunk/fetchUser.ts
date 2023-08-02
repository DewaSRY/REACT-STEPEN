import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUser = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3001/users");
  await pause(2000);
  return response.data;
});
//test the loading on the screan
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
