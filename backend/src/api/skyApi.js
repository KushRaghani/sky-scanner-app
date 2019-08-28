import fetch from "node-fetch";
import config from "../config/config";
import airportData from "../mocks/airportData.json";

// Api calls to get places and price data
const skyApi = {
  // This gets mock data as we only information for 3 airports (KUL, SIN, SFO)
  getPlaces: async function() {
    try {
      return await new Promise(resolve => {
        resolve(airportData);
      });
    } catch (error) {
      throw error;
    }
  },
  // This hits the rapid api servers for getting minPrice related data
  getFlightPrices: async function({ source, destination, date }) {
    try {
      const options = {
        method: "GET",
        headers: config.rapidApiDetails
      };
      const url = `${config.flightApiUrl.browseQuotes}/${config.country.name}/${config.currency.value}/${config.country.languageCode}/${source}/${destination}/${date}`;
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    }
  }
};

export default skyApi;
