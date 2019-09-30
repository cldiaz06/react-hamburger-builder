import React from "react";
import classes from "./Navigationitems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationitems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active={true}>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default navigationitems;
