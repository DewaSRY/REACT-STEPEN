import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createRandomName } from "../../data";
export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3001/users", {
    name: createRandomName(),
  });
  return response.data;
});
