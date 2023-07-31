// Created new div in index.js with id=loader for first Loader {fullscreen}
// Spinner img is loader for everything else {based on component screen}

import React from "react";
import loaderImage from "../../asets/loader.gif";
import ReactDOM from "react-dom";
import "./Loader.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImage} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={loaderImage} alt="Loading..." />
    </div>
  );
};
export default Loader;
