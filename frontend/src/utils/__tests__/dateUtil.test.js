import { isSameMonth, isSameDay, getDaysOfWeek } from "../../utils/dateUtil";

describe("Date Util", () => {
  test("checks getDaysOfWeek", () => {
    expect(getDaysOfWeek()).toEqual([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]);
  });

  test("checks isSameDay", () => {
    expect(isSameDay(new Date(), new Date())).toBe(true);
  });

  test("checks isSameMonth", () => {
    expect(isSameMonth(new Date(), new Date())).toBe(true);
  });
});
