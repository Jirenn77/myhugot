'use client';
import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card, Modal } from 'react-bootstrap';

const Signup = ({ onSignupSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.firstName) {
      setError('Please enter your first name.');
      return;
    }
    if (currentStep === 2 && (!formData.email || !formData.phone)) {
      setError('Please enter your email and phone number.');
      return;
    }
    if (currentStep === 3 && (formData.password !== formData.confirmPassword)) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost/hugotlines/api/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setSuccess('Signup successful! You can now log in.');
        setError('');
        onSignupSuccess();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form>
          {currentStep === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  placeholder="Enter your middle name"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
            </>
          )}
          {currentStep === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
            </>
          )}
          {currentStep === 3 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-2"
                  style={{ borderRadius: '0.5rem', backgroundColor: '#ecf0f1', borderColor: '#bdc3c7' }}
                />
              </Form.Group>
            </>
          )}
          <div className="d-flex justify-content-between mt-4">
            {currentStep > 1 && (
              <Button
                variant="secondary"
                onClick={handlePreviousStep}
                style={{ borderRadius: '0.5rem', backgroundColor: '#bdc3c7', borderColor: '#bdc3c7' }}
              >
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                variant="primary"
                onClick={handleNextStep}
                style={{ borderRadius: '0.5rem', backgroundColor: '#2980b9', borderColor: '#2980b9' }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSignup}
                style={{ borderRadius: '0.5rem', backgroundColor: '#2980b9', borderColor: '#2980b9' }}
              >
                Sign Up
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;