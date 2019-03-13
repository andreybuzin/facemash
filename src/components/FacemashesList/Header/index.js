import React, { Component } from "react";
import { Col, Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const styles = {
  nameInput: {
    borderRadius: 0
  }
};

class Header extends Component {
  state = {
    name: "",
    redirect: false,
    id: 0
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name.trim()) {
      let data = new FormData();
      data.append("facemash-name", this.state.name);
      fetch(API_URL + "/facemash/create-facemash", {
        method: "post",
        body: data
      })
        .then(response => response.json())
        .then(id =>
          this.setState({
            id: id,
            redirect: true
          })
        );
    }
  };
  render() {
    const { id, redirect } = this.state;
    return redirect ? (
      <Redirect to={"/facemash/" + id} />
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col md={{ span: 4, offset: 3 }} xs={6}>
            <input
              type="text"
              placeholder="Название битвы"
              className="form-control"
              style={styles.nameInput}
              onChange={this.handleNameChange}
            />
          </Col>
          <Col md={2} xs={6}>
            <Button variant="success" type="submit">
              Добавить
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default Header;
