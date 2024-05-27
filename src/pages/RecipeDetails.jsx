import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Loader from "../components/loader/Loader";
import api from "../lib/api";
import { UserContext } from "../context/UserContext";
import {FaThumbsUp,FaThumbsDown } from "react-icons/fa";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user, updateUser } = useContext(UserContext);
  const [recipe, setRecipe] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.post(`/recipes/${id}/view`);
        setRecipe(response.data);
        const suggestionsResponse = await api.get("/recipes/suggestedRecipe", {
          params: {
            category: response.data.category,
            country: response.data.country,
          },
        });
        setSuggestions(suggestionsResponse.data);
        if (user && response.data.creatorEmail !== user.email) {
          await updateUser();
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, user, updateUser]);

  const handleToggleReaction = async (recipeId) => {
    try {
      const response = await api.post(`/recipes/${recipeId}/reaction`, {
        user: user.email,
        type: "like",
      });
      setRecipe(response.data);
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling reaction:", error);
    }
  };

  if (loading) return <Loader />;
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card className="mb-4">
              <Card.Body>
                <iframe
                  style={{
                    boxShadow: " 0 0 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${recipe?.youtubeVideoCode
                    ?.split("=")
                    .pop()}`}
                  title={recipe?.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <Card.Title className="mt-3">Recipe Video</Card.Title>
                <Button
                  variant={liked ? "danger" : "outline-danger"}
                  onClick={() => handleToggleReaction(recipe._id)}
                >
                  {liked ? <FaThumbsDown/> : <FaThumbsUp/>} {recipe?.reactions?.length || 0}
                </Button>
              </Card.Body>
            </Card>
            <Card.Body>
              <Card.Title>{recipe?.name}</Card.Title>
              <Card.Text>Country: {recipe?.country}</Card.Text>
              <Card.Text>Category: {recipe?.category}</Card.Text>
              <Card.Text>Created by: {recipe?.creatorEmail}</Card.Text>
              <Card.Text>Watch Count: {recipe?.watchCount}</Card.Text>
              <Card.Text>
                Purchased by: {recipe?.purchased_by.length} users
              </Card.Text>
            </Card.Body>
          </Card>
          <Row>
            <h5>You may also like</h5>
            {suggestions.map((recipe) => (
              <Col key={recipe._id} md={12} className="mb-4">
                <Card className="h-100">
                  <Row className="g-0">
                    <Col md={4}>
                      <div style={{ height: "100%", overflow: "hidden" }}>
                        <Card.Img
                          variant="top"
                          src={recipe.image}
                          alt={recipe.name}
                          style={{
                            height: "280px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text>Country: {recipe.country}</Card.Text>
                        <Card.Text>Category: {recipe.category}</Card.Text>
                        <Card.Text>Creator: {recipe.creatorEmail}</Card.Text>
                        <Card.Text>
                          Purchased by: {recipe.purchased_by.length} users
                        </Card.Text>
                        <Button
                          as={Link}
                          to={`/recipes/${recipe._id}`}
                          variant="warning"
                        >
                          View The Recipe
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Img variant="top" src={recipe?.image} alt={recipe?.name} />
              <Card.Title className="mt-3">Recipe Details</Card.Title>
              <Card.Text>{recipe?.details}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetails;
