import React from "react";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";

import AddPersonButton from "./AddPerson/AddPersonButton";
import AddPersonClearButton from "./AddPerson/AddPersonClearButton";

const styles = {
  header: {
    minWidth: "1200px"
  },
  titleWrap: {
    padding: "0"
  },
  title: {
    color: "#7F8D92",
    paddingBottom: "20px",
    textAlign: "center"
  }
};

const Header = props => {
  const { facemashId } = props;

  return (
    <Container style={styles.header}>
      <Row>
        <Col style={styles.titleWrap} xs sm={{ span: 2, offset: 5 }}>
          <h1 style={styles.title}>Facemash</h1>
        </Col>
        <Col xs sm={5}>
          <ButtonGroup>
            <AddPersonButton facemashId={facemashId} />
            <AddPersonClearButton facemashId={facemashId} />
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
