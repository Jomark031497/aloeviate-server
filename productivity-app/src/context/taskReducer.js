import { v4 } from "uuid";

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      return "non";
    }

    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.payload.id);

    case "COMPLETE_TASK":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          task.isCompleted = true;
          task.elapsedTime = 0;
        }
        return task;
      });

    case "RESET_TASK":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          task.isCompleted = false;
        }
        return task;
      });

    case "UPDATE_ELAPSED":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          task.elapsedTime = action.payload.elapsedTime;
        }
        return task;
      });

    default:
      return state;
  }
};

export default taskReducer;
