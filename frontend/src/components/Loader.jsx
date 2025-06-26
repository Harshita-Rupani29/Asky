import React from "react";
import ReactDOM from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ color = "#ffffff", onClick }) => {
  const loader = (
    <div style={backdropStyle} onClick={onClick}>
      <div style={loaderStyle}>
        <ClipLoader
          color={color}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
        />
      </div>
    </div>
  );

  return ReactDOM.createPortal(loader, document.getElementById("backdrop"));
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const loaderStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10000,
};

export default Loader;
