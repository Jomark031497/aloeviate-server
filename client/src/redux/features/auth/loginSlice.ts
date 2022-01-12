import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../types";

export const login = createAsyncThunk("auth/login", async (payload: User, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/login", payload, { withCredentials: true });
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

interface StateTypes {
  data: User | null;
  isLoading: boolean;
  error: any;
}

const initialState: StateTypes = {
  data: null,
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setCurrentUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
