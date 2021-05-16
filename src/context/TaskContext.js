import { createContext, useReducer } from "react";
import { v4 } from "uuid";
import taskReducer from "./taskReducer";

export const TaskContext = createContext();

const TaskContextProvider = (props) => {
  const [tasks, dispatch] = useReducer(taskReducer, [
    { id: v4(), name: "My First Task", duration: 30 },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
