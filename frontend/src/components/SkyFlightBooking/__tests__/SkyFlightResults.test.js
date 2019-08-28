import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SkyFlightResults from "../SkyFlightResults";

function loadSkyFlightResults(args) {
  const defaultProps = {
    data: {}
  };
  const props = { ...defaultProps, ...args };
  return shallow(<SkyFlightResults {...props} />);
}
describe("SkyFlightResults", () => {
  // Enyzme tests
  test("renders SkyFlightResults", () => {
    const wrapper = loadSkyFlightResults();
    expect(wrapper.find("SkyCalendar").length).toBe(1);
  });

  // Snapshot testing
  test("snapshot with no data", () => {
    const tree = renderer.create(loadSkyFlightResults());
    expect(tree).toMatchSnapshot();
  });
});
