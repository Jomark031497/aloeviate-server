import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ userId, taskId }) => {
    const res = await axios.delete(`/api/users/task/${userId}?task=${taskId}`);

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
