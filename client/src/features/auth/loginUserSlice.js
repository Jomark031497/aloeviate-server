import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload) => {
    const res = await axios.post("/users/login", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }
);

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    data: "",
    status: null,
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "pending";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default loginUserSlice.reducer;
