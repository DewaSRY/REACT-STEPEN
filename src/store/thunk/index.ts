import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createRandomName } from "../../data";

//test the loading on the screan
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3001/users", {
    name: createRandomName(),
  });
  return response.data;
});
export const fetchUser = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3001/users");
  await pause(1000);
  return response.data;
});

export const removeUser = createAsyncThunk(
  "users/remove",
  async (id: number) => {
    const response = await axios.delete(
      `http://localhost:3001/users/${id}    `
    );
    return response.data;
  }
);
export const UserThunkAction = {
  addUser,
  fetchUser,
  removeUser,
};
