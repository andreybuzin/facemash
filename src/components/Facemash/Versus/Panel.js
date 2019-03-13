import React from "react";
import { Button } from "react-bootstrap";

import Rating from "./Rating";

const styles = {
  ratingCol: {
    height: "80vh"
  },
  ratingWrap: {
    height: "60vh"
  },
  versusText: {
    fontSize: "55px",
    color: "#f00",
    textShadow: "1px 1px 2px black, 0 0 1em red",
    textAlign: "center"
  },
  bottomButton: {
    width: "100%",
    margin: "5px 0"
  }
};

function Panel(props) {
  const {
    players,
    currentPair,
    facemashId,
    handleClearVotes,
    redirect
  } = props;

  return (
    <React.Fragment>
      <div>
        <h1 style={styles.versusText}>VS</h1>
      </div>
      <div style={styles.ratingWrap}>
        <Rating
          players={players}
          currentPair={currentPair}
          facemashId={facemashId}
        />
      </div>
      <div>
        <Button
          onClick={handleClearVotes}
          variant="dark"
          style={styles.bottomButton}
        >
          Начать сначала
        </Button>
        <Button onClick={redirect} variant="dark" style={styles.bottomButton}>
          Выход
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Panel;
