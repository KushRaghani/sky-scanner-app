import currencyUtil from "../currencyUtil";

describe("Currency Util", () => {
  test("checks currecy formatter", () => {
    expect(currencyUtil(100)).toEqual("$100.00");
  });
});
