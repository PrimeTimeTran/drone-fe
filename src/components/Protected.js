import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ({ component: Component, ...props }) {
  if (props.user) {
    return <Route {...props} render={() => <Component {...props} />} />;
  } else {
    return <Redirect to="/" />;
  }
}
