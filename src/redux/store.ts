import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import activeTaskSlice from "./features/tasks/activeTaskSlice";
import tasksReducer from "./features/tasks/taskSlice";

const rootReducer = combineReducers({ tasks: tasksReducer, activeTask: activeTaskSlice });

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
