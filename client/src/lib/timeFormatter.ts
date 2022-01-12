export const minsToTimeFormat = (value: string) => {
  // 600 -> 10:00
  const parsedValue = parseInt(value);

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
