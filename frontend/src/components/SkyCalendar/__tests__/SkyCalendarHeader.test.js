import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SkyCalendarHeader from "../SkyCalendarHeader";

function loadSkyCalendarHeader(args) {
  const defaultProps = {
    currentMonth: new Date(),
    prevMonth: () => {},
    nextMonth: () => {}
  };

  const props = { ...defaultProps, ...args };
  return <SkyCalendarHeader {...props} />;
}
describe("SkyCalendarHeader", () => {
  // Enyzme tests
  test("renders SkyCalendarHeader", () => {
    const wrapper = shallow(loadSkyCalendarHeader());
    expect(wrapper.find(".block.block-start").length).toBe(1);
    expect(wrapper.find(".block.block-center").length).toBe(1);
    expect(wrapper.find(".block.block-end").length).toBe(1);
    expect(wrapper.find(".block.block-start").text()).toEqual("chevron_left");
    const date = new Date();
    const headerText =
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getFullYear();
    expect(wrapper.find(".block.block-center").text()).toEqual(headerText);
    expect(wrapper.find(".block.block-end").text()).toEqual("chevron_right");
  });

  // Snapshot testing
  test("snapshot with current month", () => {
    const tree = renderer.create(loadSkyCalendarHeader({currentMonth: new Date("09-10-2019")}));
    expect(tree).toMatchSnapshot();
  });
});
