const formatDate = date => {
  return `${date.getFullYear()}-${
    date.getMonth + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
  }`;
};

const checkValidDate = date => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false;
  let dt = new Date(date);
  const dateNumber = dt.getTime();
  if (!dateNumber && dateNumber !== 0) return false;
  return dt.toISOString().slice(0, 10) === date;
};

const getFutureDate = (date, days) => {
  return new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000);
};

export { formatDate, checkValidDate, getFutureDate };
