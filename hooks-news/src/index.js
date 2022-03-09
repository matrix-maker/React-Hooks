import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const container = document.getElementById("root");
if (module.hot) {
  module.hot.accept();
}
const root = ReactDOM.createRoot(container);
root.render(<App name="Saeloun blog" />);
