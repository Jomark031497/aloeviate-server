export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.task];

    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.id);

    default:
      return state;
  }
};

export default taskReducer;
