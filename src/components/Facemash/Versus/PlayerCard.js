import React, { Component } from "react";

const styles = {
  playerCard: {
    border: "3px solid #fff",
    borderRadius: "5px",
    height: "80vh",
    width: "100%",
    position: "relative",
    cursor: "pointer",
    textAlign: "center"
  },
  playerCardHover: {
    border: "3px solid #00afff"
  },
  photo: {
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  anonymous: {
    fontSize: "200px",
    paddingTop: "20%",
    textAlign: "center",
    content: "?"
  },
  photoTitle: {
    background: "rgba(34, 34, 34, 0.8)",
    color: "#fff",
    padding: "15px 0",
    position: "absolute",
    left: 0,
    bottom: 0,
    fontSize: "20px",
    width: "100%",
    textAlign: "center"
  }
};

class PlayerCard extends Component {
  state = {};
  getPlayerData = ({ photo, person }) => {
    return (
      <React.Fragment>
        {photo ? (
          <div
            style={Object.assign({}, styles.photo, {
              backgroundImage: "url(" + photo + ")"
            })}
          />
        ) : (
          <div style={styles.anonymous}>?</div>
        )}
        <span style={styles.photoTitle}>{person}</span>
      </React.Fragment>
    );
  };

  hoverOn = stateName => {
    this.setState({ [stateName]: true });
  };

  hoverOff = stateName => {
    this.setState({ [stateName]: false });
  };

  render() {
    const { player, hoverNameState, handlePhotoClick, cssClasses } = this.props;

    return (
      <div
        id={player.id}
        style={
          this.state[hoverNameState]
            ? Object.assign({}, styles.playerCard, styles.playerCardHover)
            : styles.playerCard
        }
        className={cssClasses}
        onClick={handlePhotoClick}
        onMouseEnter={() => this.hoverOn(hoverNameState)}
        onMouseLeave={() => this.hoverOff(hoverNameState)}
      >
        {this.getPlayerData(player)}
      </div>
    );
  }
}

export default PlayerCard;
