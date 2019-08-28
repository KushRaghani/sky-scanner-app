import skyApi from "./skyApi";
import flightPricesData from "../mocks/flightPricesData.json";
jest.mock("./skyApi");

describe("skyApi", () => {
  beforeEach(() => {
    skyApi.getFlightPrices.mockClear();
  });

  test("exports of skyApi to be defined", () => {
    expect(skyApi.getFlightPrices).toBeDefined();
  });

  test("getFlightPrices returns expected data", () => {
    skyApi.getFlightPrices.mockResolvedValue(flightPricesData);
    const flightPrices = skyApi.getFlightPrices();
    expect(flightPricesData).toEqual(flightPricesData);
  });
});
