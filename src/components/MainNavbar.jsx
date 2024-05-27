import React, { useContext } from "react";
import { Container, Nav, Navbar, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { UserContext } from "../context/UserContext";

export default function MainNavbar() {
  const { user, setUser, updateUser, signInWithGoogle } =
    useContext(UserContext);

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#323232" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-light">
          The Original Dish
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-light">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/recipes" className="text-light">
              Recipes
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/addRecipes" className="text-light">
                  Add Recipes
                </Nav.Link>
                <Nav.Link className="text-light">
                  Coins :{" "}
                  <span
                    style={{
                      backgroundColor: "yellow",
                      color: "black",
                      padding: "5px",
                      borderRadius: "100%",
                    }}
                  >
                    {user.coins}
                  </span>{" "}
                </Nav.Link>
                <Nav.Link className="text-light">
                  <Image
                    src={user.photoURL}
                    roundedCircle
                    width="30"
                    height="30"
                  />
                </Nav.Link>
                <Button variant="outline-warning ms-3" onClick={logOut}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline-warning ms-3" onClick={signInWithGoogle}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
