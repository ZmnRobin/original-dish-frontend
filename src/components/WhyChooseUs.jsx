// src/components/WhyChooseUs.js
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import why from "../images/why.jpg";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Image src={why} alt="Why Choose Us" fluid rounded />
        </Col>
        <Col md={6}>
          <h2 className="mb-4">Why Choose Us?</h2>
          <p className="text-muted">
            At OriginalDish, we believe that cooking should be a delightful
            experience. Our platform offers a vast collection of recipes from
            around the world, each curated with detailed instructions and
            high-quality images. Whether you are a novice or an experienced
            chef, you will find recipes that cater to your skill level and
            taste. Join our community and start your culinary adventure with us
            today!
          </p>
          <p className="text-muted">
            Our user-friendly interface and advanced search features make it
            easy to find the perfect recipe for any occasion. We also offer
            personalized recommendations based on your preferences and dietary
            needs. Additionally, our active community of food enthusiasts is
            always sharing tips, reviews, and photos to inspire your next meal.
            With OriginalDish, you'll never run out of ideas for delicious
            dishes to try.
          </p>
          <Link to="/recipes" className="btn btn-warning">
            See recipes
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default WhyChooseUs;
