import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};

export default {
  init() {
    ReactDOM.render(<Index />, document.getElementById("horus_configurator"));
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  }
};
