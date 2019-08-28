import React from "react";
import ReactDOM from "react-dom";
import SkyApp from "./SkyApp";

test("renders SkyApp", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SkyApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
