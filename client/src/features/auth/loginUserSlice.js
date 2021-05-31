import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload) => {
    const { data } = await axios.post("/users/login", payload);
    return data;
  }
);

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    data: "",
    status: null,
    error: null,
  },
  extraReducers: {
    [loginUser.pending](state) {
      state.status = "loading";
    },
    [loginUser.fulfilled](state, action) {
      state.data = action.payload;
      state.error = null;
      state.status = "success";
    },
    [loginUser.rejected](state, action) {
      state.data = null;
      state.status = action.payload;
      state.status = "failed";
    },
  },
});

export default loginUserSlice.reducer;
