import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
import Loader from "../../loader";

export default class BlogList extends Component {
  state = {
    loading: true,
    error: false,
    blogs: [],
  };

  fetchBlogPosts = async () => {
    try {
      const response = await fetch(
        `https://express-server-w1.herokuapp.com/blogs`
      );
      if (response.ok) {
        const blogs = await response.json();
        this.setState({ blogs, loading: false });
      }
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  componentDidMount = () => {
    this.fetchBlogPosts();
  };

  render() {
    const { loading, error, blogs } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      if (error) {
        return <div>{error}</div>;
      } else {
        return (
          <Row>
            {posts.map((post) => (
              <Col md={4} style={{ marginBottom: 50 }}>
                <BlogItem key={post.title} {...post} />
              </Col>
            ))}
          </Row>
        );
      }
    }
  }
}
