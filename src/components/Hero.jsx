import { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Button } from "react-bootstrap";

var heroData = [
  {
    id: 1,
    image: require("../images/banner2.jpg"),
  },
  {
    id: 2,
    image: require("../images/banner.jpg"),
  },
  {
    id: 3,
    image: require("../images/banner3.jpg"),
  },
];

function Hero() {
  const { user, signInWithGoogle } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    if (user) {
      navigate("/addRecipes");
    } else {
      signInWithGoogle();
    }
  };

  return (
    <section id="home" className="hero-block">
      <Carousel>
        {heroData.map((hero) => {
          return (
            <Carousel.Item key={hero.id}>
              <img
                className="d-block w-100 h-50"
                src={hero.image}
                alt={"slide " + hero.id}
              />
              <Carousel.Caption>
                <Link to="/recipes" className="btn btn-warning">
                  See recipes
                </Link>
                <Button onClick={handleAddRecipe} className="btn btn-warning ms-3">
                  Add recipes
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
}

export default Hero;
