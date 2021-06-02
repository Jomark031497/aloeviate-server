export const timeFormatter = (secs) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs / 60) % 60);
  const seconds = secs % 60;

  //
  // 00:00:00

  const hoursFormatted = hours > 9 ? `${hours}` : `0${hours}`;
  const minutesFormatted = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const secondsFormatted = seconds > 9 ? `${seconds}` : `0${seconds}`;

  if (hours <= 0) {
    return `${minutesFormatted}:${secondsFormatted}`;
  } else {
    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
  }
};

export default timeFormatter;
