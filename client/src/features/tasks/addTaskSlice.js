import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ userId, task }) => {
    const res = await axios.post(`/api/users/task/${userId}`, task, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  }
);

export const addTaskSlice = createSlice({
  name: "addTask",
  initialState: {
    data: "",
    status: null,
  },
  extraReducers: {
    [addTask.pending]: (state) => {
      state.status = "loading";
    },
    [addTask.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [addTask.rejected]: (state, action) => {
      state.data = "";
      state.status = action.payload;
    },
  },
});

export default addTaskSlice.reducer;
