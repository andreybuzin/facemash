import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import PlayerCard from "./PlayerCard";
import Panel from "./Panel";

const API_URL = process.env.REACT_APP_API_URL;
const styles = {
  versusZone: {
    backgroundColor: "#222",
    color: "#fff",
    maxWidth: "1400px",
    minWidth: "1200px"
  }
};

class Versus extends Component {
  state = {
    redirect: false,
    players: [],
    player1: {
      id: null,
      person: "",
      photo: ""
    },
    player2: {
      id: null,
      person: "",
      photo: ""
    }
  };

  constructor(props) {
    super(props);
    const { facemashId } = this.props;
    this.getPhotos(facemashId);
    this.getPlayers(facemashId);
  }

  getPhotos = facemashId => {
    const data = new FormData();
    data.append("facemash_id", facemashId);
    fetch(API_URL + "/photo/get-photos", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          player1: {
            id: data["id1"],
            person: data["person1"],
            photo:
              data["link1"] !== ""
                ? API_URL + "/uploads/photos/" + data["link1"]
                : ""
          },
          player2: {
            id: data["id2"],
            person: data["person2"],
            photo:
              data["link2"] !== ""
                ? API_URL + "/uploads/photos/" + data["link2"]
                : ""
          }
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  getPlayers = facemashId => {
    const data = new FormData();
    data.append("facemash_id", facemashId);
    fetch(API_URL + "/photo/get-rating", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ players: [] });
        this.setState({ players: data });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  handlePhotoClick = e => {
    const winnerId = e.currentTarget.id;
    const { player1, player2 } = this.state;
    const { facemashId } = this.props;

    const data = new FormData();
    data.append("winner_id", winnerId);
    data.append("photo1_id", player1.id);
    data.append("photo2_id", player2.id);
    data.append("facemash_id", facemashId);
    fetch(API_URL + "/versus/set-new-like", {
      method: "post",
      body: data
    })
      .then(() => {
        this.getPlayers(facemashId);
        this.getPhotos(facemashId);
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  handleClearVotes = () => {
    const { facemashId } = this.props;
    this.setState({
      player1: {
        id: null,
        person: "",
        photo: ""
      },
      player2: {
        id: null,
        person: "",
        photo: ""
      }
    });
    var data = new FormData();
    data.append("facemash_id", facemashId);
    fetch(API_URL + "/versus/clear-votes", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(() => {
        this.getPlayers(facemashId);
        this.getPhotos(facemashId);
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };

  redirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { players, player1, player2, redirect } = this.state;
    const { facemashId } = this.props;

    return redirect ? (
      <Redirect to="/" />
    ) : (
      <Container style={styles.versusZone}>
        <Row>
          <Col sm={5} xs={5}>
            <PlayerCard
              player={player1}
              hoverStateName="hoverPhoto1"
              handlePhotoClick={this.handlePhotoClick}
              cssClasses="float-right player-card"
            />
          </Col>
          <Col sm={2} xs={2} style={styles.ratingCol}>
            <Panel
              players={players}
              currentPair={[player1, player2]}
              facemashId={facemashId}
              handleClearVotes={this.handleClearVotes}
              redirect={this.redirect}
            />
          </Col>
          <Col sm={5} xs={5}>
            <PlayerCard
              player={player2}
              hoverStateName="hoverPhoto2"
              handlePhotoClick={this.handlePhotoClick}
              cssClasses="float-left"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Versus;
