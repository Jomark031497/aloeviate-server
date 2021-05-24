import { configureStore } from "@reduxjs/toolkit";
import addTaskReducer from "../features/tasks/addTaskSlice";
import getTasksReducer from "../features/tasks/getTasksSlice";
import deleteTaskReducer from "../features/tasks/deleteTaskSlice";

export default configureStore({
  reducer: {
    getTasks: getTasksReducer,
    addTask: addTaskReducer,
    deleteTask: deleteTaskReducer,
  },
});
