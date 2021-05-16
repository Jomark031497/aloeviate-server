import { v4 } from "uuid";

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: v4(),
          name: action.payload.name,
          duration: action.payload.duration,
          isCompleted: false,
          elapsedTime: 0,
        },
      ];

    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.payload.id);

    case "COMPLETE_TASK":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          task.isCompleted = true;
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

    default:
      return state;
  }
};

export default taskReducer;
