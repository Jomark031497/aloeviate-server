import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../../types";

interface StateType {
  data: Task | null;
  isLoading: boolean;
  error: any;
}

const initialState: StateType = {
  data: null,
  isLoading: false,
  error: null,
};

export const activeTaskSlice = createSlice({
  name: "activeTask",
  initialState,
  reducers: {
    setActiveTask: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateActiveTask: (state, action) => {
      state.data!.duration = action.payload.duration;
      state.data!.elapsed = action.payload.elapsed;
      state.data!.isCompleted = action.payload.isCompleted;
    },
  },
});

export const { setActiveTask, updateActiveTask } = activeTaskSlice.actions;

export default activeTaskSlice.reducer;
