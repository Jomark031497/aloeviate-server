import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, User } from "../../../types";

export const loginUser = createAsyncThunk("users/loginUser", async (payload: User, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/login", payload);
    console.log(data);
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

const initialState: AuthState = {
  data: null,
  error: null,
  isLoading: false,
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.data = action.payload;
    },
    logoutUser: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { currentUser, logoutUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
