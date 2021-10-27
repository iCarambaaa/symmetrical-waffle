import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "", category: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  POSTNewBlogPost = async (e) => {
    e.preventDefault(e);
    try {
      const response = await fetch(
        "https://express-server-w1.herokuapp.com/posts",
        {
          method: "POST",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(response);
      } else {
        console.log(this.state);

        console.log(`wow... that wasn't supposed to happen... Error`);
        alert(`Woops we lost your data in the void .. try refreshing`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  componentDidUpdate = async (e) => {};
  handleChange(value) {
    this.setState({ text: value, category: value, title: value });
  }

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5">
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              type="text"
              onChange={(e) => this.handleChange(e)}
              value={this.state.title}
            />

            <div controlId="blog-category" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                size="lg"
                as="select"
                type="dropdown"
                onChange={(e) => this.handleChange(e)}
                value={this.state.category}
              >
                <option>Blockchain</option>
                <option>AI</option>
                <option>Space</option>
                <option>Literature</option>
                <option>Biology</option>
              </Form.Control>
            </div>
            <div controlId="blog-content" className="mt-3">
              <Form.Label>Blog Content</Form.Label>
              <ReactQuill
                value={this.state.text}
                onChange={this.handleChange}
                className="new-blog-content"
              />
            </div>
            <div className="d-flex mt-3 justify-content-end">
              <Button
                type="reset"
                size="lg"
                variant="outline-dark"
                // onClick={this.setState({ text: "", title: "", category: "" })}
              >
                Reset
              </Button>
              <Button
                type="submit"
                size="lg"
                variant="dark"
                style={{ marginLeft: "1em" }}
                onClick={(e) => this.POSTNewBlogPost(e)}
              >
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
