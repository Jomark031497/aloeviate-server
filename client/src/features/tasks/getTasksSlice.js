import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasks = createAsyncThunk("tasks/getTasks", async ({ id }) => {
  const { data } = await axios.get(`/api/users/task/all/${id}`);
  return data;
});

export const getTasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTasks.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getTasks.rejected]: (state, action) => {
      state.status = "failed";
      state.data = [];
    },
  },
});

export default getTasksSlice.reducer;
