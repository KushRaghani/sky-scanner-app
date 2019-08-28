import { checkValidDate } from "../util/dateUtil";

const quotesValidator = data => {
  let errors = [];

  if (!data.source) {
    errors.push("Source field is required");
  }

  if (!data.destination) {
    errors.push("Destination field is required");
  }
  if (!data.date) {
    errors.push("Departure Date is required");
  } else if (!checkValidDate(data.date)) {
    errors.push("Departure Date is not valid");
  }

  return {
    errors,
    isValid: !errors.length
  };
};

export default quotesValidator;
