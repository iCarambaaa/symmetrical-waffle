import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import Button from "react-bootstrap/Button";
// import posts from "../../data/posts.json";
import "./styles.css";

class Blog extends Component {
  state = {
    blog: {},
    loading: true,
    error: false,
  };
  id = this.props;

  fetchBlogPosts = async (id) => {
    console.log("here ID:", id);
    try {
      const response = await fetch(
        `https://express-server-w1.herokuapp.com/posts/` + id
      );
      if (response.ok) {
        const blogs = await response.json();
        console.log("here response:", blogs);
        this.setState({ blogs, loading: false });
        console.log("here state", this.state);
      }
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  componentDidMount() {
    console.log(this.state);
    const { id } = this.props.match.params;
    this.fetchBlogPosts(id);
    console.log(id);
  }

  render() {
    const { loading, blogs } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blogs.cover} fluid />
            <h1 className="blog-details-title">{blogs.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blogs.author} />
              </div>
              <div className="blog-details-info">
                <div>{blogs.createdAt}</div>
                <div>{`${blogs.readTime.value} ${blogs.readTime.unit} read`}</div>
                <div style={{ marginTop: 20 }}>
                  <Button
                    href={`https://express-server-w1.herokuapp.com/posts/${blogs.id}/downloadPDF`}
                    variant="dark"
                    className="mb-1"
                  >
                    Download as PDF
                  </Button>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blogs.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
