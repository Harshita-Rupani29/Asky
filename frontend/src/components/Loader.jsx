import React from "react";
import ReactDOM from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";
import BackDrop from "./BackDrop";

const Loader = ({ color = "#ffffff"}) => {
  return (
    <div className="loader" style={loaderStyle}>
      <BackDrop>
        <ClipLoader
          color={color}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </BackDrop>
    </div>
  );
};



const loaderStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10000,
};

export default Loader;
