import React from "react";
import { shallow } from "enzyme";
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
});
