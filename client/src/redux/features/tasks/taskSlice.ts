import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Task } from "../../../types";

const initialState: Task[] = [
  {
    id: v4(),
    name: "first task",
    duration: 300,
    isCompleted: false,
  },
  {
    id: v4(),
    name: "second task",
    duration: 600,
    isCompleted: false,
  },
];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
