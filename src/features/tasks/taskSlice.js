import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    value: [{ id: v4(), name: "Mys First Task", duration: "15:00" }],
  },

  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
