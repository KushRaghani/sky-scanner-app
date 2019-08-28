import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SkyCalendarDays from "../SkyCalendarDays";

function loadSkyCalendarDays(args) {
  const defaultProps = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    data: {},
    onDateClick: () => {}
  };

  const props = { ...defaultProps, ...args };
  return <SkyCalendarDays {...props} />;
}
describe("SkyCalendarDays", () => {
  // Enyzme tests
  test("renders SkyCalendarDays", () => {
    const wrapper = shallow(loadSkyCalendarDays());
    expect(wrapper.find(".main").length).toBe(1);
    expect(wrapper.find(".calendar-row").length).toBe(5);
    expect(wrapper.find(".calendar-date").length).toBe(35);
  });

  // Snapshot testing
  test("snapshot with current Date and current month", () => {
    const tree = renderer.create(loadSkyCalendarDays());
    expect(tree).toMatchSnapshot();
  });
});
