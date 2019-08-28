import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import SkyCalendarDayLabel from "../SkyCalendarDayLabel";

function loadSkyCalendarDayLabel() {
  return <SkyCalendarDayLabel />;
}
describe("SkyCalendarDayLabel", () => {
  // Enyzme tests
  test("renders SkyCalendarDayLabel", () => {
    const wrapper = shallow(loadSkyCalendarDayLabel());
    expect(wrapper.find(".block.block-center").length).toBe(7);
    expect(wrapper.find(".calendar-days.calendar-row").length).toBe(1);
    expect(
      wrapper
        .find(".block.block-center")
        .at(0)
        .text()
    ).toEqual("Sunday");
    expect(
      wrapper
        .find(".block.block-center")
        .at(1)
        .text()
    ).toEqual("Monday");
    expect(
      wrapper
        .find(".block.block-center")
        .at(2)
        .text()
    ).toEqual("Tuesday");
    expect(
      wrapper
        .find(".block.block-center")
        .at(3)
        .text()
    ).toEqual("Wednesday");
    expect(
      wrapper
        .find(".block.block-center")
        .at(4)
        .text()
    ).toEqual("Thursday");
    expect(
      wrapper
        .find(".block.block-center")
        .at(5)
        .text()
    ).toEqual("Friday");
    expect(
      wrapper
        .find(".block.block-center")
        .at(6)
        .text()
    ).toEqual("Saturday");
  });

  // Snapshot testing
  test("snapshot with no data", () => {
    const tree = renderer.create(loadSkyCalendarDayLabel());
    expect(tree).toMatchSnapshot();
  });
});
