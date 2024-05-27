import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { backendUrl } from "../lib/const";
import Loader from "../components/loader/Loader";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import ConfirmModal from "../components/ConfirmModal";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const { user, signInWithGoogle } = useContext(UserContext);
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/recipes`, {
        params: {
          search: searchTerm,
          category: categoryFilter,
          country: countryFilter,
          page,
          limit: 10,
        },
      });
      if (page === 1) {
        setRecipes(response.data.recipes);
      } else {
        setRecipes((prevRecipes) => [...prevRecipes, ...response.data.recipes]);
      }
      setHasMore(response.data.recipes.length > 0);
      setLoading(false);
    } catch (error) {
      alert("Error fetching recipes!");
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (triggerSearch) {
      fetchRecipes();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  useEffect(() => {
    fetchRecipes();
  }, [categoryFilter, countryFilter, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setTriggerSearch(true);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleViewRecipe = async (recipeId) => {
    if (!user) {
      signInWithGoogle();
    } else {
      try {
        const response = await api.get(
          `/recipes/recipeViewPermission/${recipeId}`
        );
        if (response.data.canView) {
          navigate(`/recipes/${recipeId}`);
        } else {
          if (user.coins < 10) {
            setModalMessage(
              "You don't have enough coins to view this recipe. Please purchase some coins."
            );
            setConfirmAction(() => () => navigate("/purchaseCoin"));
          } else {
            setModalMessage(
              "You need to spend 10 coins to view this recipe. Click OK to proceed."
            );
            setConfirmAction(() => () => navigate(`/recipes/${recipeId}`));
          }
          setShowConfirmModal(true);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }
  };

  if (loading && page === 1) return <Loader />;

  return (
    <Container className="my-3">
      <h3 className="mb-4">Recipes</h3>
      <Form onSubmit={handleSearch}>
        <Row className="mb-3 align-items-center">
          <Col md={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by recipe name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Filter by category</option>
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
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={countryFilter}
              onChange={(e) => {
                setCountryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Filter by country</option>
              <option value="Indian">Indian</option>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="American">American</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
      <Row>
        {recipes.length === 0 && (
          <h3 className="text-danger">No recipes found!</h3>
        )}
        {recipes.map((recipe) => (
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
                      onClick={() => {
                        handleViewRecipe(recipe._id);
                      }}
                      variant="warning"
                    >
                      View Recipe
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      {hasMore && (
        <div className="text-center">
          <Button onClick={loadMore} variant="secondary" disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          if (confirmAction) confirmAction();
        }}
        message={modalMessage}
      />
    </Container>
  );
};

export default Recipes;
