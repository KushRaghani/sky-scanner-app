export const getMonthStart = date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
export const getMonthEnd = date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
export const getWeekStart = date => {
  const newDate = new Date(date.getTime());
  const day = newDate.getDay();
  if (day !== 0) newDate.setHours(-24 * day);
  return new Date(newDate);
};
export const getWeekEnd = date => {
  const newDate = new Date(date.getTime());
  const day = newDate.getDay();
  if (day !== 6) newDate.setHours(24 * (6 - day));
  return new Date(newDate);
};
export const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
export const isSameMonth = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
};
export const addDays = (date, days) => {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};
export const addMonths = (date, months) => {
  return new Date(date.getTime() + months * 30 * 24 * 60 * 60 * 1000);
};
export const subMonths = (date, months) => {
  return new Date(date.getTime() - months * 30 * 24 * 60 * 60 * 1000);
};
export const getDaysOfWeek = () => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
};
export const formatDate = (date, format) => {
  switch (format) {
    case "Month Year":
      return (
        date.toLocaleString("default", { month: "long" }) +
        " " +
        date.getFullYear()
      );
    case "Day":
      return date.getDate();
    case "YYYY-MM-DD":
      return `${date.getFullYear()}-${
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      }-${date.getDate()}`;
    default:
      return date;
  }
};
