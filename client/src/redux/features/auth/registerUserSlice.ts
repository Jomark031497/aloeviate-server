import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../types";

export const registerUser = createAsyncThunk("users/registerUser", async (payload) => {
  const res = await axios.post("/api/users/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
});

interface State {
  data: User | null;
  error: Error | any;
  isLoading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  isLoading: false,
};

export const registerUserSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default registerUserSlice.reducer;
