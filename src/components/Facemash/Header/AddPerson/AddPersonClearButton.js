import React from "react";
import { Button } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;
const styles = {
  clear: {
    marginTop: "7px"
  }
};

const handleClick = e => {
  const data = new FormData();
  data.append("facemash_id", e.currentTarget.id);
  fetch(API_URL + "/photo/clear-persons", {
    method: "post",
    body: data
  })
    .then(() => window.location.reload())
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
};

const AddPersonClearButton = props => {
  return (
    <Button
      id={props.facemashId}
      onClick={handleClick}
      variant="danger"
      style={styles.clear}
    >
      очистить
    </Button>
  );
};

export default AddPersonClearButton;
