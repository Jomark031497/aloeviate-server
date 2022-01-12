import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import addTask from "./features/tasks/addTaskSlice";

// combine all reducers into 1
const rootReducer = combineReducers({ addTask });

// create the store and add the reducer functions
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
