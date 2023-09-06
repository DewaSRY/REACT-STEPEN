import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createRandomName } from "../../data";

//test the loading on the screen
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
const name = createRandomName();
const randomIdx = Math.round(Math.random() * 100);
const userId = name + "-" + randomIdx;
export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3001/users", {
    name: name,
    id: userId,
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
  async (id: string) => {
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
