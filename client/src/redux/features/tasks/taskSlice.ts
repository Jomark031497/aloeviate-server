import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Task } from "../../../types";

const initialState: Task[] = [
  {
    id: v4(),
    name: "first task",
    duration: 30,
    isCompleted: false,
    elapsed: 0,
  },
  {
    id: v4(),
    name: "second task",
    duration: 30,
    isCompleted: false,
    elapsed: 0,
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
    completeTask: (state, action) => {
      state.map((task) => {
        if (task.id === action.payload) {
          task.isCompleted = true;
        }
        return task;
      });
    },
    resetTask: (state, action) => {
      state.map((task) => {
        if (task.id === action.payload) {
          task.isCompleted = false;
        }
        return task;
      });
    },
  },
});

export const { addTask, deleteTask, completeTask, resetTask } = taskSlice.actions;

export default taskSlice.reducer;
