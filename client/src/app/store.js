import { configureStore } from "@reduxjs/toolkit";
import addTaskReducer from "../features/tasks/addTaskSlice";
import getTasksReducer from "../features/tasks/getTasksSlice";
import deleteTaskReducer from "../features/tasks/deleteTaskSlice";
import updateTaskReducer from "../features/tasks/updateTaskSlice";

export default configureStore({
  reducer: {
    getTasks: getTasksReducer,
    addTask: addTaskReducer,
    deleteTask: deleteTaskReducer,
    updateTask: updateTaskReducer,
  },
});
