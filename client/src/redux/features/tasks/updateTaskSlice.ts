import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../../types";

export const updateTask = createAsyncThunk("task/updateTask", async (payload: Task | null, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`tasks/${payload!.id}`, payload, { withCredentials: true });

    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

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

export const updateTaskSlice = createSlice({
  name: "updateTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.data = null;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updateTaskSlice.reducer;
