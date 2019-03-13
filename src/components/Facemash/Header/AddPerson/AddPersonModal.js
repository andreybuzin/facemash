import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import AddPersonForm from "./AddPersonForm";

class AddPersonModal extends Component {
  render() {
    const { isOpen, handleModalOpening, facemashId } = this.props;

    return (
      <Modal show={isOpen} onHide={handleModalOpening}>
        <Modal.Header closeButton>
          <Modal.Title>Новый участник:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPersonForm
            handleModalOpening={handleModalOpening}
            facemashId={facemashId}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddPersonModal;
