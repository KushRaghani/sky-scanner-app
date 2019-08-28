const config = {
  port: process.env.PORT || 4000,
  rapidApiDetails: {
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "178239085fmshb8f49db2ffac6e8p14c164jsn6b4a771e837f"
  },
  flightApiUrl: {
    browseQuotes:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0"
  },
  currency: {
    symbol: "$",
    value: "USD"
  },
  country: {
    name: "US",
    languageCode: "en-US"
  }
};

export default config;
