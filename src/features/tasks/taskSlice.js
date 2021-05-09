import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [{ id: v4(), name: "My First Task", duration: "15:00" }],
  reducers: {
    addTask: (state) => {},
  },
});

export const { increment, decrement, incrementByAmount } = taskSlice.actions;

export default taskSlice.reducer;
