import { configureStore } from "@reduxjs/toolkit";
import addTaskReducer from "../features/tasks/addTaskSlice";
import getTasksReducer from "../features/tasks/getTasksSlice";
import deleteTaskReducer from "../features/tasks/deleteTaskSlice";
import updateTaskReducer from "../features/tasks/updateTaskSlice";
import registerUserReducer from "../features/auth/registerUserSlice";
import loginUserReducer from "../features/auth/loginUserSlice";
import currentUserReducer from "../features/auth/currentUserSlice";

export default configureStore({
  reducer: {
    getTasks: getTasksReducer,
    addTask: addTaskReducer,
    deleteTask: deleteTaskReducer,
    updateTask: updateTaskReducer,
    registerUser: registerUserReducer,
    loginUser: loginUserReducer,
    currentUser: currentUserReducer,
  },
});
