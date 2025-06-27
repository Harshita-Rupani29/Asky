import React from "react";
import ReactDOM from "react-dom";
const BackDrop = (props) => {
  return ReactDOM.createPortal(
    <div className={`backdrop ${props.className}`} onClick={props.onClick} style={backdropStyle}>
      {props.children}
    </div>,
    document.getElementById("backdrop")
  );
};

export default BackDrop;



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