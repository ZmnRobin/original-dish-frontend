import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import person from "../images/person.jpg";
import person2 from "../images/person2.jpg";
import person3 from "../images/person3.jpg";

const successStories = [
  {
    id: 1,
    name: "John Doe",
    story: "I found the perfect recipe for my family gatherings!",
    image: person,
  },
  {
    id: 2,
    name: "Jenifer Smith",
    story: "The recipes here are amazing. I love cooking now!",
    image: person2,
  },
  {
    id: 3,
    name: "Alice Johnson",
    story: "This app has transformed my culinary skills.",
    image: person3,
  },
];

const SuccessSection = () => {
  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">Success Stories</h3>
      <Row>
        {successStories.map((story) => (
          <Col md={4} key={story.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={story.image} />
              <Card.Body>
                <Card.Title>{story.name}</Card.Title>
                <Card.Text>{story.story}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SuccessSection;
