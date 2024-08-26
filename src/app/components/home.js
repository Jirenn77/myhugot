import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import Post from './post';
import axios from 'axios';


const Home = ({ userId, onLogout }) => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [category, setCategory] = useState('work'); // Default category
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost/hugotlines/api/api.php');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async () => {
    if (!postText.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("action", "addPost");
      formData.append("user_id", userId);
      formData.append("content", postText.trim());
      const response = await axios.post('http://localhost/hugotlines/api/post.php', formData);

      const result = await response.data;
      if (result.success) {
        const newPost = {
          post_id: result.post_id,
          user_id: result.user_id,
          first_name: result.first_name,
          last_name: result.last_name,
          content: postText.trim(),
          created_at: new Date().toISOString(),
          comments: [],
          category: category // Add category here
        };
        setPosts([newPost, ...posts]);
        setPostText('');
        setCategory('work'); // Reset category to default
      } else {
        console.error("Failed to add post:", result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const addComment = async (postId, commentText) => {
    if (!commentText.trim()) {
      alert("Comment content cannot be empty!");
      return;
    }

    try {
      const response = await fetch('http://localhost/hugotlines/api/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addComment',
          post_id: postId,
          user_id: userId,
          comment_text: commentText.trim(),
        })
      });

      const data = await response.json();
      if (data.success) {
        const updatedPosts = posts.map((post) =>
          post.post_id === postId
            ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  comment_id: data.comment_id,
                  comment_text: commentText.trim(),
                  created_at: new Date().toISOString(),
                  comment_first_name: data.comment_first_name,
                  comment_last_name: data.comment_last_name,
                },
              ],
            }
            : post
        );
        setPosts(updatedPosts);
      } else {
        console.error('Failed to add comment:', data.message);
      }
    } catch (error) {
      console.error("An error occurred while adding the comment:", error);
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleShowCategoryModal = () => setShowCategoryModal(true);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const handleSelectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    handleCloseCategoryModal();
  };

  return (
    <div className="relative bg-dark text-light min-h-screen">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 flex justify-between items-center p-4 border-b bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="flex-grow flex justify-center">
          <h2 className="text-3xl font-semibold">My Hugotline App</h2>
        </div>
        <Button variant="outline-light" onClick={handleLogout} className="btn-">
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <Container className="pt-20 mt-4">
        {/* Post Input */}
        <Card className="mb-6 shadow-lg border-none rounded-lg bg-dark">
          <Card.Body className="p-6">
            <Form.Group controlId="postText">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="What's on your mind?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="mb-4 border-0 bg-secondary text-light"
              />
            </Form.Group>
            {/* Category Button */}
            <Form.Group controlId="categorySelect" className="d-grid gap-2">
              <Button
                variant="outline-light"
                className="w-full text-left border-0 bg-secondary text-light"
                size="lg"
                onClick={handleShowCategoryModal}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button><br></br>
            </Form.Group>
            {/* Centered Post Button */}
            <div className=" d-grid gap-2">
              <Button
                variant="primary"
                className="d-grid gap-2 mb-5"
                size="lg"
                onClick={addPost}
              >
                Post
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Posts List */}
        <Row>
          <Col>
            {posts.map(post => (
              <Post key={post.post_id} post={post} addComment={addComment} />
            ))}
          </Col>
        </Row>

        {/* Category Selection Modal */}
        <Modal show={showCategoryModal} onHide={handleCloseCategoryModal} className="bg-dark text-light">
          <Modal.Header className="bg-dark text-light" closeButton>
            <Modal.Title>Select Category</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-light">
            <div className="d-flex flex-column gap-2">
              <Button
                variant="outline-light"
                className="w-full bg-dark text-light"
                onClick={() => handleSelectCategory('work')}
              >
                Work
              </Button>
              <Button
                variant="outline-light"
                className="w-full bg-dark text-light"
                onClick={() => handleSelectCategory('love')}
              >
                Love
              </Button>
              <Button
                variant="outline-light"
                className="w-full bg-dark text-light"
                onClick={() => handleSelectCategory('life')}
              >
                Life
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Home;
