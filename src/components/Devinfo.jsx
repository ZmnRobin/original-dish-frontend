import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import profileImage from "../images/robin.jpg";

export default function Devinfo() {
  return (
    <Container className="my-5 py-3 bg-light rounded">
      <h5 className="text-center">Developer Information</h5>
      <Row>
        <Col md={4} className="text-center">
          <Image
            src={profileImage}
            alt="Profile"
            rounded
            className="mb-3"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
        <Col md={4}>
          <h2 className="fw-bold">Rokonuzzaman Robin</h2>
          <div>Green University of Bangladesh</div>
          <div>Department of Computer Science and Engineering</div>
          <div>Skills:</div>
          <ul>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React.js</li>
            <li>Next.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>Tailwind CSS</li>
          </ul>
        </Col>
        <Col md={4}>
          <div className="fw-bold">Contact Information</div>
          <div>Email : rokonuzzaman.gub@gmail.com</div>
          <div>Phone : +88018 1259 3091</div>
          <div>Address : Mirpur, Dhaka, Bangladesh</div>
        </Col>
      </Row>
    </Container>
  );
}
