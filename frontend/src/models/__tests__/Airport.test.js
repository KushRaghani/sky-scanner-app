import Airport from "../Airport";
import airportJson from "../../mocks/airportData.json";

describe("Airport model", () => {
  test("checks Airport model", () => {
    const {
      airportName,
      airportCode,
      isSource,
      isDestination,
      destinations
    } = airportJson.info[0];
    const airportMalaysia = new Airport(airportJson.info[0]);
    expect(airportMalaysia.airportName).toEqual(airportName);
    expect(airportMalaysia.airportCode).toEqual(airportCode);
    expect(airportMalaysia.isSource).toEqual(isSource);
    expect(airportMalaysia.isDestination).toEqual(isDestination);
    expect(airportMalaysia.destinations).toEqual(destinations);
    expect(airportMalaysia.hasFlight(destinations[0])).toBe(true);
  });
});
