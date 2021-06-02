export const timeToSecs = (timeString) => {
  let hours;
  let minutes;
  let seconds;

  if (timeString.length >= 5) {
    hours = 0;
    minutes = parseInt(timeString.slice(0, 2)) * 60;
    seconds = parseInt(timeString.slice(3, 5));
  } else {
    hours = parseInt(timeString.slice(0, 2)) * 60 * 60;
    minutes = parseInt(timeString.slice(3, 5)) * 60;
    seconds = parseInt(timeString.slice(6, 8));
  }

  const total = hours + minutes + seconds;
  return total;
};

export default timeToSecs;
