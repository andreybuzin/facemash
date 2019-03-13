import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import "cropperjs/dist/cropper.css";

import ImageCrop from "../../ImageCrop/ImageCrop";

class AddPersonForm extends Component {
  state = {
    facemashId: this.props.facemashId,
    name: ""
    // submit: false
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  clearNameInput = () => {
    this.setState({
      name: ""
    });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.setState({
  //     submit: true
  //   });
  // };

  render() {
    const { facemashId, name } = this.state;
    return (
      // <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
      <Form>
        <Row className="form-group">
          <Col sm={12} xs={12}>
            <input
              type="text"
              value={name}
              onChange={this.handleNameChange}
              placeholder="Введите имя"
              className="form-control"
              name="name"
            />
          </Col>
        </Row>
        <ImageCrop
          handleModalOpening={this.props.handleModalOpening}
          name={name}
          facemashId={facemashId}
          clearNameInput={this.clearNameInput}
        />
      </Form>
      // </form>
    );
  }
}

export default AddPersonForm;
