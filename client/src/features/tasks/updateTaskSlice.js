import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (payload) => {
    const res = await axios.put(
      `/api/users/task/${payload.userId}?task=${payload.taskId}`,
      payload.task
    );

    return res.data;
  }
);

export const updateTaskSlice = createSlice({
  name: "updateTask",
  initialState: {
    data: "",
    status: null,
  },
  extraReducers: {
    [updateTask.pending](state) {
      state.status = "loading";
    },
    [updateTask.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [updateTask.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default updateTaskSlice.reducer;
