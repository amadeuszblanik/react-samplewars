type DATE = number | Date;

const makeNumber = (value: DATE) => {
  if (typeof value !== "number") {
    value = value.getTime();
  }
  return value;
};

const daysDiff = (dateA: DATE, dateB: DATE) => {
  return Math.round(Math.abs(makeNumber(dateB) - makeNumber(dateA)) / 86400000);
};

const hoursDiff = (dateA: DATE, dateB: DATE) => {
  return Math.round(Math.abs(makeNumber(dateB) - makeNumber(dateA)) / 3600000);
};

export { daysDiff, hoursDiff };
