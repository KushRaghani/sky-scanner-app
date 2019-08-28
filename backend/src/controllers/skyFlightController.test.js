import {
  middleTier,
  getPartialMonths,
  getQuotes,
  extractFinalQuotes
} from "./skyFlightController";

describe("skyFlightController", () => {
  test("exports of skyFlightController to be defined", () => {
    expect(middleTier.getPlaces).toBeDefined();
    expect(middleTier.getFlightPrices).toBeDefined();
    expect(getPartialMonths).toBeDefined();
    expect(getQuotes).toBeDefined();
    expect(extractFinalQuotes).toBeDefined();
  });
});
