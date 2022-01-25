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
    deleteTask: (state, action) => {
      const filter = state.filter((task) => task.id !== action.payload);
      return filter;
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
