import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../types";

export const loginUser = createAsyncThunk("users/loginUser", async (payload) => {
  const res = await axios.post("/api/users/login", payload, {
    withCredentials: true,
  });

  return res.data;
});

interface State {
  data: User | null;
  error: Error | null | any;
  isLoading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  isLoading: false,
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default loginUserSlice.reducer;
