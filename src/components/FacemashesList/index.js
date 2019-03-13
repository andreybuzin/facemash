import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AutoSizer, List } from "react-virtualized";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalEditFacemash from "./ModalEditFacemash";

const API_URL = process.env.REACT_APP_API_URL;
const styles = {
  list: {
    // padding: "10px 0",
    // background: "rgb(52, 58, 64)",
    // borderRadius: "10px"
  },
  item: {
    cursor: "pointer"
  },
  name: {
    padding: "10px",
    display: "inline-block",
    width: "100%",
    color: "#fff"
    // fontWeight: "bold"
  },
  row: {
    background: "#343a40",
    fontSize: "14px",
    borderBottom: "1px dotted #000",
    padding: "3px 0",
    left: "15px"
  },
  panel: {
    margin: "20px 0"
  },
  button: {
    margin: "0 3px"
  },
  control: {
    textAlign: "right",
    paddingRight: "15px"
  },
  autosizer: {
    // height: "50vh",
    // width: "90vh"
    height: "80vh",
    width: "100%"
  }
};

class FacemashesList extends React.Component {
  state = {
    facemashes: [],
    isOpenModal: false,
    currentFacemashId: 0,
    currentName: ""
  };

  constructor(props) {
    super(props);
    this.getFacemashes();
  }

  getFacemashes = () => {
    fetch(API_URL + "/facemash/get-facemashes")
      .then(response => response.json())
      .then(facemashes => this.setState({ facemashes }));
  };

  handleEdit = e => {
    this.setState({
      isOpenModal: true,
      currentFacemashId: e.currentTarget.id,
      currentName: e.currentTarget.name
    });
  };

  handleDelete = e => {
    const facemashes = this.state.facemashes;
    const id = e.currentTarget.id;
    const data = new FormData();
    data.append("facemash_id", id);
    fetch(API_URL + "/facemash/delete-facemash", {
      method: "post",
      body: data
    })
      .then(response => response.json())
      .then(() => {
        const newList = facemashes.filter(item => {
          return item.id !== Number(id);
        });
        this.setState({
          facemashes: newList
        });
      });
  };

  handleOpeningModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  };

  rowRenderer = ({ key, index, style }) => {
    const { facemashes } = this.state;

    return (
      <Row key={key} style={Object.assign({}, style, styles.row)}>
        <Col xs md={10}>
          <Link
            to={{
              pathname: "facemash/" + facemashes[index].id,
              query: { id: facemashes[index].id }
            }}
            style={styles.item}
          >
            <span style={styles.name}>{facemashes[index].name}</span>
          </Link>
        </Col>
        <Col xs md={2} style={styles.control} className="no-padding">
          <Button
            variant="info"
            onClick={this.handleEdit}
            id={facemashes[index].id}
            name={facemashes[index].name}
            style={styles.button}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="xs" fixedWidth />
          </Button>
          <Button
            id={facemashes[index].id}
            onClick={this.handleDelete}
            variant="danger"
            style={styles.button}
          >
            <FontAwesomeIcon icon={faTimes} size="xs" fixedWidth />
          </Button>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      facemashes,
      currentFacemashId,
      currentName,
      isOpenModal
    } = this.state;

    return (
      <Container>
        <Row style={styles.panel}>
          <Col lg={12} md={12} sm={12} xs={12} className="no-padding">
            <Header />
          </Col>
        </Row>
        <Row>
          <Col sm={12} xs={12}>
            <AutoSizer style={styles.autosizer}>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height}
                  rowCount={facemashes.length}
                  rowHeight={45}
                  rowRenderer={this.rowRenderer}
                  style={styles.list}
                />
              )}
            </AutoSizer>
          </Col>
        </Row>
        <ModalEditFacemash
          facemashId={currentFacemashId}
          name={currentName}
          isOpen={isOpenModal}
          handleOpeningModal={this.handleOpeningModal}
        />
      </Container>
    );
  }
}

export default FacemashesList;
