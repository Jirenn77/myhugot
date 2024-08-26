import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, Row, Col } from 'react-bootstrap';

const Login = ({ onLogin, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost/hugotlines/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
  
      if (data.success) {
        onLogin(data.user_id);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('username', data.username);
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-h-screen bg-dark text-light">
      <Container fluid className="p-0">
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={5}>
            <Card className="shadow-lg border-0 rounded-lg bg-dark text-light">
              <Card.Body className="p-5">
                <h1 className="text-center mb-4">Login</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="p-3 bg-secondary text-light border-0"
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="p-3 bg-secondary text-light border-0"
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="w-100 p-3 mb-3"
                    onClick={handleLogin}
                    style={{ borderRadius: '0.5rem', backgroundColor: '#007bff', borderColor: '#007bff' }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    className="w-100 p-3 mb-5"
                    onClick={onSignup}
                    style={{ borderRadius: '0.5rem', borderColor: '#007bff' }}
                  >
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
