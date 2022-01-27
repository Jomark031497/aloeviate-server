export const minsToTimeFormat = (value: number) => {
  // 600 -> 10:00
  const parsedValue = value;

  let hours = Math.floor(parsedValue / 3600);
  let mins = Math.floor((parsedValue / 60) % 60);
  let secs = Math.floor(parsedValue % 60);

  const hoursFormatted = hours > 9 ? `${hours}` : `0${hours}`;
  const minutesFormatted = mins > 9 ? `${mins}` : `0${mins}`;
  const secondsFormatted = secs > 9 ? `${secs}` : `0${secs}`;

  if (hours <= 0) {
    return `${minutesFormatted}:${secondsFormatted}`;
  } else {
    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
  }
};

export const timeFormatToSecs = (value: any) => {
  let hours;
  let minutes;
  let seconds;

  if (value.length >= 5) {
    hours = 0;
    minutes = parseInt(value.slice(0, 2)) * 60;
    seconds = parseInt(value.slice(3, 5));
  } else {
    hours = parseInt(value.slice(0, 2)) * 60 * 60;
    minutes = parseInt(value.slice(3, 5)) * 60;
    seconds = parseInt(value.slice(6, 8));
  }

  const total = hours + minutes + seconds;
  return total;
};
