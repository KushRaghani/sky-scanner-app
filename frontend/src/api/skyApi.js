import axios from "axios";
import config from "../config/config";

// Api layer to communicate with the server
const SkyApi = {
  // Get Airports, Source & Destination data
  getPlaces: async function() {
    const response = await axios.get(config.apiUrl + "/api/places");
    return response.data;
  },
  // Get Flight Prices for 30 days
  getFlightPrices: async function({ source, destination, departureDate }) {
    const response = await axios.get(
      `${config.apiUrl}/api/search?source=${source}&destination=${destination}&date=${departureDate}`
    );
    return response.data;
  }
};

export default SkyApi;
