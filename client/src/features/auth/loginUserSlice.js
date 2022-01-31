import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("users/loginUser", async (payload) => {
  const res = await axios.post("/api/auth/login", payload, {
    withCredentials: true,
  });

  return res.data;
});

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    data: "",
    status: null,
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [loginUser.rejected]: (state, action) => {
      state.data = action.payload;
      state.status = "failed";
    },
  },
});

export default loginUserSlice.reducer;
