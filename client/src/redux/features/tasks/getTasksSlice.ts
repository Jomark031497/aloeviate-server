import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../../types";

interface StateTypes {
  data: Task[] | null;
  isLoading: boolean;
  error: any;
}

export const getTasks = createAsyncThunk("tasks/getTasks", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/tasks", { withCredentials: true });
    return data;
  } catch (error: any) {
    rejectWithValue(error);
  }
});

const initialState: StateTypes = {
  data: null,
  isLoading: false,
  error: null,
};

export const getTasksSlice = createSlice({
  name: "getTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.data = null;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getTasksSlice.reducer;
