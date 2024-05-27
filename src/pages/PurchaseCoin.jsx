import React, { useContext} from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import api from "../lib/api";
import { UserContext } from "../context/UserContext";
import PayImage from "../images/pay.png";
import {loadStripe} from '@stripe/stripe-js';
import Footer from "../components/Footer";
import { stripeKey } from "../lib/const";

const PurchaseCoins = () => {
  const { updateUser } = useContext(UserContext);

  const purchaseOptions = [
    { coins: 100, cost: 1, title: "Buy 100 coins for $1" },
    { coins: 500, cost: 5, title: "Buy 500 coins for $5" },
    { coins: 1000, cost: 10, title: "Buy 1000 coins for $10" },
  ];

  const makePayment = async (coins, cost) => {
    const stripe = await loadStripe(stripeKey);
    const response = await api.post("/auth/purchase-coin", { coins, cost });
    const session = response.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    await updateUser();
    if (result.error) {
      alert("Failed to make payment!");
      console.error("Error making payment:", result.error);
    }
  };

  return (
    <>
    <Container className="my-5">
      <h3 className="mb-4">Purchase Coins</h3>
      <Row>
        {purchaseOptions.map((option, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card style={{ width: "20rem" }}>
              <Card.Img
                variant="top"
                style={{ border: "1px solid gray" }}
                src={PayImage}
              />
              <Card.Body>
                <Card.Title>{option.title}</Card.Title>
                <Card.Text>
                  {option.coins} coins for ${option.cost}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => makePayment(option.coins, option.cost)}
                >
                  Purchase
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default PurchaseCoins;
