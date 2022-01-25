import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Task } from "../../../types";

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: v4(),
        name: action.payload.name,
      };
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
