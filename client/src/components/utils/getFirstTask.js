export const getFirstTask = (tasks) => {
  // check if there are tasks
  if (!tasks.length) return;

  // get all the incomplete tasks
  const filterIncompleteTasks = tasks.filter((task) => !task.isCompleted);

  // check if there are filtered tasks
  if (!filterIncompleteTasks.length) return;

  return filterIncompleteTasks[0];
};

export default getFirstTask;
