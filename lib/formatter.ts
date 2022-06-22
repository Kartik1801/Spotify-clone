import formatDuration from "format-duration";

export const formatTime = (timeInSec = 0) => {
  return formatDuration(timeInSec * 1000);
};

export const formatDate = (date: Date) => {
  date = new Date(date);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
