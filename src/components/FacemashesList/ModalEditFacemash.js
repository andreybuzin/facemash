import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

class ModalEditFacemash extends Component {
  state = {
    name: this.props.name
  };

  handleNameChange = e => {
    this.setState({
      name: e.currentTarget.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { facemashId } = this.props;
    const { name } = this.state;
    const data = new FormData();
    data.append("facemash_id", facemashId);
    data.append("name", name);
    fetch(API_URL + "/facemash/edit-facemash", {
      method: "post",
      body: data
    }).then(response => {
      window.location.reload();
    });
  };

  render() {
    const { name, isOpen, handleOpeningModal } = this.props;

    return (
      <Modal show={isOpen} onHide={handleOpeningModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                onChange={this.handleNameChange}
                placeholder="Введите название битвы"
                defaultValue={name}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="success" type="submit">
                Изменить
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalEditFacemash;
