import React from "react";
import ReactDOM from "react-dom";
import SkyHeader from "../SkyHeader";
describe("SkyHeader", () => {
  test("renders SkyHeader", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SkyHeader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
