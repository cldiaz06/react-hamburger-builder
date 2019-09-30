import React from "react";
import reactLogo from "../../assets/images/favicon.ico";
import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={reactLogo} alt="React Logo" />
  </div>
);

export default logo;
