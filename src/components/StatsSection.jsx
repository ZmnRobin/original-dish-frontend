import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { backendUrl } from "../lib/const";

const StatsSection = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    recipeCount: 0,
    feedbackCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/getCounts`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container className="my-5 py-5 bg-light rounded">
      <Row>
        <Col md={4} className="text-center mb-4 mb-md-0">
          <h3 className="text-dark">Total Recipes</h3>
          <div className="display-4 text-primary">
            <CountUp end={stats.recipeCount} duration={5} />
          </div>
        </Col>
        <Col md={4} className="text-center mb-4 mb-md-0">
          <h3 className="text-dark">Total Users</h3>
          <div className="display-4 text-primary">
            <CountUp end={stats.userCount} duration={5} />
          </div>
        </Col>
        <Col md={4} className="text-center">
          <h3 className="text-dark">Total Feedback</h3>
          <div className="display-4 text-primary">
            <CountUp end={stats.feedbackCount} duration={5} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StatsSection;
