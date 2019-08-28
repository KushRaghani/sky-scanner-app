import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SkyFlightSearch from "../SkyFlightSearch";

function loadSkyFlightSearch(args) {
  const defaultProps = {
    source: "SIN-sky",
    destination: "KUL-sky",
    onSelectChangeSource: () => {},
    onClear: () => {},
    onSelectChangeDest: () => {},
    onChangeOfAirport: () => {},
    getData: () => {},
    searchFormClasses: "",
    errors: {},
    airportData: { source: [], destination: [] },
    destinationAirportData: [],
    sourceAirportData: []
  };

  const props = { ...defaultProps, ...args };
  return <SkyFlightSearch {...props} />;
}
describe("SkyFlightSearch", () => {
  // Enyzme tests
  test("renders SkySelectAirport and button", () => {
    const wrapper = shallow(loadSkyFlightSearch());
    expect(wrapper.find("SkySelectAirport").length).toBe(2);
    expect(wrapper.find("button").length).toBe(2);
  });

  test('labels submit buttons as "Search" when not saving', () => {
    const wrapper = shallow(loadSkyFlightSearch());
    expect(
      wrapper
        .find("button")
        .at(0)
        .text()
    ).toBe("Search");
  });

  // Snapshot testing
  test("snapshot with dummy data", () => {
    const tree = renderer.create(loadSkyFlightSearch());
    expect(tree).toMatchSnapshot();
  });
});
