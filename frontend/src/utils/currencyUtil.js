import config from "../config/config";
const currencyUtil = amount => {
  return new Intl.NumberFormat(config.currency.language, {
    style: "currency",
    currency: config.currency.value
  }).format(amount);
};

export default currencyUtil;
