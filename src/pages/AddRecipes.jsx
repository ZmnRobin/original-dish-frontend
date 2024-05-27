import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import {imgbbUrl } from "../lib/const";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const AddRecipes = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState("");
  const [youtubeVideoCode, setYoutubeVideoCode] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(imgbbUrl, formData);
      setImage(response.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    const newRecipe = {
      name,
      image,
      details,
      youtubeVideoCode,
      country,
      category,
      creatorEmail: user?.email,
      watchCount: 0,
      purchased_by: [],
    };

    api
      .post("/recipes", newRecipe)
      .then(() => {
        setLoading(false);
        navigate("/recipes");
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong! Failed to add recipe!");
        console.error("Error adding recipe:", error);
      });
  };

  return (
    <>
      <Container className="my-3">
        <h3 className="mb-4">Add Recipe</h3>
        <div className="p-4 shadow-sm rounded bg-white">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                placeholder="Enter recipe name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Recipe Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} required />
            </Form.Group>
            <Form.Group controlId="formDetails" className="mb-3">
              <Form.Label>Recipe Details</Form.Label>
              <Form.Control
                placeholder="Enter recipe details"
                as="textarea"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYoutube" className="mb-3">
              <Form.Label>Embedded YouTube Video Code</Form.Label>
              <Form.Control
                placeholder="Enter YouTube video url code"
                type="text"
                value={youtubeVideoCode}
                onChange={(e) => setYoutubeVideoCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCountry" className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Select Country</option>
                <option value="Indian">Indian</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Chinese">Chinese</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="American">American</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="beverage">Beverage</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="side-dish">Side Dish</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="seafood">Seafood</option>
                <option value="rice-dishes">Rice Dishes</option>
                <option value="biryani">Biryani</option>
                <option value="curry">Curry</option>
                <option value="bread">Bread (Roti, Naan, Paratha)</option>
                <option value="street-food">Street Food</option>
                <option value="sweets-mithai">Sweets & Mithai</option>
                <option value="festival-special-occasion">
                  Festival & Special Occasion
                </option>
              </Form.Control>
            </Form.Group>
            <Row className="justify-content-end">
              <Col xs="auto">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Adding Recipe..." : "Add Recipe"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default AddRecipes;
