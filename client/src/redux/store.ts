import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import addTask from "./features/tasks/addTaskSlice";
import tasks from "./features/tasks/getTasksSlice";
import user from "./features/auth/loginSlice";
import updateTask from "./features/tasks/updateTaskSlice";
import activeTask from "./features/tasks/activeTaskSlice";
// combine all reducers into 1

const rootReducer = combineReducers({ add: addTask, tasks, user, updateTask, activeTask });

// export default configureStore({
//   reducer: {
//     addTask: addTaskReducer,
//     deleteTask: deleteTaskReducer,
//     updateTask: updateTaskReducer,
//     registerUser: registerUserReducer,
//     loginUser: loginUserReducer,
//     currentUser: currentUserReducer,
//   },
// });

// create the store and add the reducer functions
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
