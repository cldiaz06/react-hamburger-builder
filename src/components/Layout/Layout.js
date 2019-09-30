import React from "react";
import Aux from "../../hoc/Aux_JS";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = props => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content} style={{ height: props.height }}>
      {props.children}
    </main>
  </Aux>
);

export default layout;
