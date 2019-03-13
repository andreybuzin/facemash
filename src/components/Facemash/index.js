import React from "react";

import Header from "./Header";
import Versus from "./Versus";

const Facemash = props => {
  const { facemashId } = props.match.params;
  return (
    <div>
      <Header facemashId={facemashId} />
      <Versus facemashId={facemashId} />
    </div>
  );
};

export default Facemash;
