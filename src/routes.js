import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import FacemashesList from "./components/FacemashesList";
import Facemash from "./components/Facemash";

const routes = (
  <Router>
    <Switch>
      <Route path={"/"} exact component={FacemashesList} />
      <Route path={"/facemash/:facemashId"} component={Facemash} />
    </Switch>
  </Router>
);

export default routes;
