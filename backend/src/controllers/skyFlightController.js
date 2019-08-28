import { formatDate, getFutureDate } from "../util/dateUtil";
import mailServer from "../service/mailServer";
import logger from "../service/logger";
import skyApi from "../api/skyApi";
import quotesValidator from "../validators/quotes";

export const middleTier = {
  // Middle tier layer for getting Airport data from API layer
  getPlaces: async function() {
    try {
      const placesData = await skyApi.getPlaces();
      return placesData;
    } catch (err) {
      logger.error("Error in Getting Airport Data:", err);
      mailServer.triggerEmail("Error in Getting Airport Data", err);
      throw err;
    }
  },
  // Middle tier layer for getting Price data from API layer
  getFlightPrices: async function({ source, destination, date }) {
    try {
      const { errors, isValid } = quotesValidator({
        source,
        destination,
        date
      });
      if (!isValid) {
        return { errors };
      }
      const currentDate = new Date(date);
      const futureDate = getFutureDate(currentDate, 30);
      // As Rapid API only supports single partial month as the input (YYYY-MM), we
      // call the API twice to get data for 2 months and collate that accordingly
      // tp get data for 30 days
      const partialMonths = getPartialMonths({ currentDate, futureDate });

      const browseQuotesData = await getQuotes({
        source,
        destination,
        partialMonths
      });
      return extractFinalQuotes(
        browseQuotesData,
        currentDate.getTime(),
        futureDate.getTime()
      );
    } catch (err) {
      logger.error("Error in Getting Flight Prices:", err);
      mailServer.triggerEmail("Error in Getting Flight Prices", err);
      throw err;
    }
  }
};
// Compute if 2 or 1 month data is required
export const getPartialMonths = ({ currentDate, futureDate }) => {
  let partialMonths = [];
  if (currentDate.getMonth() != futureDate.getMonth()) {
    partialMonths = [formatDate(currentDate), formatDate(futureDate)];
  } else {
    partialMonths = [formatDate(currentDate)];
  }
  return partialMonths;
};

// Get combined prices/quotes for 2 months/1 month (in case user is checking on 1st of the month)
export const getQuotes = async ({ source, destination, partialMonths }) => {
  const finalPricesData = [];
  const combinedQuotes = await Promise.all(
    partialMonths.map(partialMonth =>
      skyApi.getFlightPrices({ source, destination, date: partialMonth })
    )
  );
  combinedQuotes.forEach(item => {
    finalPricesData.push(item);
  });
  return finalPricesData;
};

// Process the data to pass it onto the frontend
// Format: [{date:price}]
export const extractFinalQuotes = (data, lowerDate, higherDate) => {
  const quotes = {};
  data.forEach(item => {
    item.Quotes.forEach(item1 => {
      let currDate = new Date(item1.OutboundLeg.DepartureDate);
      if (currDate.getTime() >= lowerDate && currDate.getTime() <= higherDate) {
        quotes[item1.OutboundLeg.DepartureDate.toString()] = item1.MinPrice;
      }
    });
  });
  return quotes;
};
