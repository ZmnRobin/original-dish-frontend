import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import successImage from '../images/success.png'; // Add a relevant success image in your images directory

export default function Success() {
  const navigate = useNavigate();

  const handleGoToRecipes = () => {
    navigate('/recipes');
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{minHeight:"80vh"}}>
      <Row className="text-center mb-4">
        <Col>
          <img src={successImage} alt="Success" className="img-fluid" style={{ maxWidth: '200px' }} />
          <h1 className="mt-4">Payment Successful!</h1>
          <p className="lead">Thank you for your purchase. Your coins have been added to your account.</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant="primary" onClick={handleGoToRecipes}>
            Go to Recipes
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
