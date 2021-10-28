import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default class Footer extends Component {
  render() {
    return (
      <footer style={{ paddingTop: 50, paddingBottom: 50 }}>
        <Container>
          <p>{`${new Date().getFullYear()} - © Strive School | Developed for homework projects.`}</p>
          <Button
            href="
            https://express-server-w1.herokuapp.com/files/authorsCSV
            "
            className="blog-navbar-add-button bg-dark"
            size="sm
            "
          >
            Download Author List as CSV
          </Button>
        </Container>
      </footer>
    );
  }
}
