import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import airportData from "../../../mocks/airportData";
import SkySelectAirport from "../SkySelectAirport";

function loadSkySelectAirport(args) {
  const defaultProps = {
    optionsData: [],
    name: "",
    onChangeOfAirport: () => {},
    selectedAirport: ""
  };

  const props = { ...defaultProps, ...args };
  return <SkySelectAirport {...props} />;
}
describe("SkySelectAirport", () => {
  // Enyzme tests
  test("renders select on load with no optionsData", () => {
    const wrapper = shallow(loadSkySelectAirport());
    expect(wrapper.find("select").length).toBe(1);
    expect(wrapper.find("option").length).toBe(1);
    expect(wrapper.find("option").text()).toBe("Select Airport");
  });

  test("renders select and option with mock optionsData", () => {
    const wrapper = shallow(
      loadSkySelectAirport({ optionsData: airportData.source })
    );
    expect(wrapper.find("select").length).toBe(1);
    expect(wrapper.find("option").length).toBe(3);
  });

  test("renders select and option with mock optionsData", () => {
    const wrapper = shallow(
      loadSkySelectAirport({ optionsData: airportData.source })
    );
    expect(wrapper.find("select").length).toBe(1);
    expect(wrapper.find("option").length).toBe(3);
  });

  // Snapshot testing
  test("snapshot with default data", () => {
    const tree = renderer.create(loadSkySelectAirport());
    expect(tree).toMatchSnapshot();
  });
});
