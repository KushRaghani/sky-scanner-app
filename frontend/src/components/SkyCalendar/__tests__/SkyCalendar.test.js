import React from "react";
import { shallow } from "enzyme";
import SkyCalendar from "../SkyCalendar";

function loadSkyCalendar(args) {
  const defaultProps = {
    data: {}
  };
  const props = { ...defaultProps, ...args };
  return <SkyCalendar {...props} />;
}
describe("SkyCalendar", () => {
  // Enyzme tests
  test("renders SkyCalendarHeader,  SkyCalendarDayLabel and SkyCalendarDays", () => {
    const wrapper = shallow(loadSkyCalendar());
    expect(wrapper.find("SkyCalendarHeader").length).toBe(1);
    expect(wrapper.find("SkyCalendarDayLabel").length).toBe(1);
    expect(wrapper.find("SkyCalendarDays").length).toBe(1);
    wrapper.find("SkyCalendarHeader").prop("prevMonth")();
    wrapper.find("SkyCalendarHeader").prop("nextMonth")();
    wrapper.find("SkyCalendarDays").prop("onDateClick")();
  });
});
