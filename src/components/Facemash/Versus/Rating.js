import React, { Component } from "react";
import { AutoSizer, List } from "react-virtualized";

import WinnerModal from "./WinnerModal";

const API_URL = process.env.REACT_APP_API_URL;
const styles = {
  row: {
    paddingTop: "5px"
  },
  winnerRow: {
    background: "#359B67",
    marginBottom: "5px",
    borderRadius: "25px"
  },
  avatar: {
    display: "inline-block",
    position: "absolute",
    backgroundSize: "cover",
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    left: 0
  },
  name: {
    paddingTop: "10px",
    paddingLeft: "60px"
  },
  rank: {
    position: "absolute",
    color: "#fff",
    textAlign: "center",
    borderRadius: "50%",
    background: "darkred",
    padding: "0px 7px",
    opacity: "0.9",
    bottom: "5px"
  },
  autosizer: {
    height: "50vh"
  }
};

class Rating extends Component {
  state = {
    openModal: false
  };

  getPlayers = facemashId => {
    const data = new FormData();
    data.append("facemash_id", facemashId);
    fetch(API_URL + "/photo/get-rating", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(data => this.setState({ players: data }))
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  hasPhotos = () => {
    if (
      this.props.currentPair[0].id !== 0 ||
      this.props.currentPair[1].id !== 0
    ) {
      return true;
    }
    this.setState({
      openModal: true
    });
    return false;
  };

  generateAvatarCss = filename => {
    return {
      backgroundImage: "url(" + API_URL + "/uploads/photos/" + filename + ")"
    };
  };

  rowRenderer = ({ key, index, style }) => {
    const { players } = this.props;
    return (
      <div
        key={key}
        style={Object.assign(
          {},
          style,
          index === 0 && !this.hasPhotos() ? styles.winnerRow : {}
        )}
      >
        <div
          style={Object.assign(
            {},
            styles.avatar,
            this.generateAvatarCss(players[index].link)
          )}
        />
        <div style={styles.rank}>{players[index].rank}</div>
        <div style={styles.name}>{players[index].person}</div>
      </div>
    );
  };

  handleModalOpening = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  render() {
    return (
      <React.Fragment>
        <AutoSizer style={styles.autosizer}>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={this.props.players.length}
              rowHeight={60}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
        {this.state.openModal && (
          <WinnerModal
            name={this.props.players[0].person}
            photoCss={this.generateAvatarCss(this.props.players[0].link)}
            isOpen={this.state.openModal}
            handleModalOpening={this.handleModalOpening}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Rating;
