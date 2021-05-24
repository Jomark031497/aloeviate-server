import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (payload) => {
    const res = await axios.delete(`/tasks/${payload}`);

    return res.data;
  }
);

export const deleteTaskSlice = createSlice({
  name: "deleteTask",
  initialState: {
    data: "",
    status: null,
  },
  extraReducers: {
    [deleteTask.pending]: (state) => {
      state.status = "loading";
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [deleteTask.rejected]: (state, action) => {
      state.data = "";
      state.status = "failed";
    },
  },
});

export default deleteTaskSlice.reducer;
