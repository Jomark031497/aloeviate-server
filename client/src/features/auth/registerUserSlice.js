import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("users/registerUser", async (payload) => {
  const res = await axios.post("/api/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
});

export const registerUserSlice = createSlice({
  name: "registerUser",
  initialState: {
    data: "",
    status: null,
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = "pending";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default registerUserSlice.reducer;
