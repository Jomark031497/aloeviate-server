export const timeFormatter = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const minutesFormatted = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const secondsFormatted = seconds > 9 ? `${seconds}` : `0${seconds}`;
  return `${minutesFormatted}:${secondsFormatted}`;
};

export const timeToSecs = (timeString) => {
  const minutes = parseInt(timeString.slice(0, 2)) * 60;
  const seconds = parseInt(timeString.slice(3, 5));

  return minutes + seconds;
};

export const updateCountdown = (time) => time--;
