import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import addTask from "./features/tasks/addTaskSlice";
import tasks from "./features/tasks/getTasksSlice";
import user from "./features/auth/loginUserSlice";
import updateTask from "./features/tasks/updateTaskSlice";
import activeTask from "./features/tasks/activeTaskSlice";

const rootReducer = combineReducers({ add: addTask, tasks, user, updateTask, activeTask });

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
