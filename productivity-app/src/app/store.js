import { configureStore } from "@reduxjs/toolkit";
import addTaskReducer from "../features/tasks/addTaskSlice";
import getTasksReducer from "../features/tasks/getTasksSlice";

export default configureStore({
  reducer: {
    getTasks: getTasksReducer,
    addTask: addTaskReducer,
  },
});
