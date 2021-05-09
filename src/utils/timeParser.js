export const timeParser = (time) => {
  // time is in minutes
  // convert to 00:00

  const parsedTime = parseInt(time);
  const timeFormat = parsedTime > 9 ? `${time}:00` : `0${time}:00`;

  return timeFormat;
};

export default timeParser;
