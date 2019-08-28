import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import wait from "waait";
import { act } from "react-dom/test-utils";

import SkyFlightBooking from "../SkyFlightBooking";
import SkyApi from "../../api/skyApi";
jest.mock("../../api/skyApi");
import airportData from "../../mocks/airportData.json";
import flightPricesData from "../../mocks/flightPricesData.json";

function renderSkyFlightBooking() {
  return <SkyFlightBooking />;
}

describe("SkyFlightBooking", () => {
  // Enzyme Tests
  beforeEach(() => {
    SkyApi.getPlaces.mockClear();
    SkyApi.getFlightPrices.mockClear();
  });

  test("Should get flight data", async () => {
    SkyApi.getPlaces.mockResolvedValue(airportData);
    SkyApi.getFlightPrices.mockResolvedValue(flightPricesData);
    const wrapper = mount(renderSkyFlightBooking());
    await wait(1000);
    act(() => {wrapper.update();});
    wrapper.find("SkyFlightSearch").prop("onSelectChangeSource")({
      target: { value: "KUL-sky" }
    });
    act(() => {wrapper.update();});
    wrapper.find("SkyFlightSearch").prop("onSelectChangeDest")({
      target: { value: "SIN-sky" }
    });
    act(() => {wrapper.update();});
    await wait(1000);
    wrapper.find("SkyFlightSearch").prop("getData")({
      preventDefault: () => {}
    });
    await wait(1000);
    act(() => {wrapper.update();});
    await wait(1000);
    expect(wrapper.find("SkyFlightResults").length).toBe(1);
    expect(wrapper.find("SkyFlightResults").props()).toEqual({
      data: flightPricesData
    });
  });

  test("Should show the data, when retrieved", async () => {
    SkyApi.getPlaces.mockResolvedValue(airportData);
    const wrapper = mount(renderSkyFlightBooking());
    await wait(1000);
    act(() => {wrapper.update();});
    expect(wrapper.find("SkyFlightSearch").length).toBe(1);

    expect(wrapper.find("SkyFlightSearch").props()).toEqual({
      onClear: expect.any(Function),
      source: "",
      destination: "",
      onSelectChangeSource: expect.any(Function),
      onSelectChangeDest: expect.any(Function),
      getData: expect.any(Function),
      sourceAirportData: expect.any(Array),
      destinationAirportData: expect.any(Array),
      searchFormClasses: "searchFlights",
      errors: {}
    });
  });
});

// Snapshot testing
test("snapshot", () => {
  const tree = renderer.create(renderSkyFlightBooking());
  expect(tree).toMatchSnapshot();
});
