import React, { Component } from "react";
import { Button } from "react-bootstrap";

import AddPersonModal from "./AddPersonModal";

const styles = {
  add: {
    marginTop: "7px"
  }
};

class AddPersonButton extends Component {
  state = {
    isOpen: false
  };

  handleModalOpening = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      this.reloadPage
    );
  };

  reloadPage = () => {
    if (this.state.isOpen === false) {
      window.location.reload();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={this.handleModalOpening}
          variant="secondary"
          style={styles.add}
        >
          добавить фото
        </Button>
        <AddPersonModal
          isOpen={this.state.isOpen}
          facemashId={this.props.facemashId}
          handleModalOpening={this.handleModalOpening}
        />
      </React.Fragment>
    );
  }
}

export default AddPersonButton;
