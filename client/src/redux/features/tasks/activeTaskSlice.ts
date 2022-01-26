import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../../types";

const initialState: Task | null = null;

const activeTaskSlice = createSlice({
  name: "activeTask",
  initialState,
  reducers: {
    setActiveTask: (state, action) => {
      state = action.payload;
    },
    removeActiveTask: (state) => {
      state = null;
    },
  },
});

export const { setActiveTask, removeActiveTask } = activeTaskSlice.actions;

export default activeTaskSlice.reducer;
