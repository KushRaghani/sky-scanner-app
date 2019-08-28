import React from "react";
import ReactDOM from "react-dom";
import SkyLoader from "../SkyLoader";
describe("SkyLoader", () => {
  test("renders SkyLoader", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SkyLoader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
