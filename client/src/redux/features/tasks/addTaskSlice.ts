import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../../types";

interface StateTypes {
  data: Task | null;
  isLoading: boolean;
  error: any | null;
}

const initialState: StateTypes = {
  data: null,
  isLoading: false,
  error: null,
};

export const addTask = createAsyncThunk("tasks/addTask", async (payload: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/tasks", payload, { withCredentials: true });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addTaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default addTaskSlice.reducer;
