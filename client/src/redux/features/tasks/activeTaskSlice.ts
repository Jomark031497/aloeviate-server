import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../../types";

interface StateProps {
  data: Task | null;
}

const initialState: StateProps = {
  data: null,
};

const activeTaskSlice = createSlice({
  name: "activeTask",
  initialState,
  reducers: {
    setActiveTask: (state, action) => {
      state.data = action.payload;
    },
    removeActiveTask: (state) => {
      state.data = null;
    },
    updateElapsed: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setActiveTask, removeActiveTask, updateElapsed } = activeTaskSlice.actions;

export default activeTaskSlice.reducer;
