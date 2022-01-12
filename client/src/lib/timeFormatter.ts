export const minsToTimeFormat = (value: number) => {
  // 600 -> 10:00

  let mins = Math.floor(value / 60);
  let secs = Math.floor(value / 60 / 60);

  //const hoursFormatted = hours > 9 ? `${hours}` : `0${hours}`;
  const minutesFormatted = mins > 9 ? `${mins}` : `0${mins}`;
  const secondsFormatted = secs > 9 ? `${secs}` : `0${secs}`;

  return `${minutesFormatted}:${secondsFormatted}`;
};
