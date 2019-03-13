import React, { Component } from "react";
import { Modal } from "react-bootstrap";

const styles = {
  photo: {
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  winnerCard: {
    border: 0,
    height: "60vh",
    width: "100%",
    position: "relative",
    cursor: "pointer",
    textAlign: "center"
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
  },
  modalBody: {
    padding: 0
  },
  modalTitle: {
    margin: "0 auto"
  },
  close: {
    paddingLeft: 0,
    marginLeft: 0
  }
};

class ModalWinnerPhoto extends Component {
  render() {
    const { handleModalOpening, photoCss, isOpen, name } = this.props;
    return (
      <Modal show={isOpen} onHide={handleModalOpening}>
        <Modal.Header>
          <Modal.Title style={styles.modalTitle}>Победитель</Modal.Title>
          <button
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            style={styles.close}
            onClick={handleModalOpening}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <div style={styles.winnerCard} onClick={handleModalOpening}>
            <div style={Object.assign({}, styles.photo, photoCss)} />
            <span style={styles.photoTitle}>{name}</span>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalWinnerPhoto;
