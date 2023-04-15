import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HomePageCard from "./HomePageCard/HomePageCard";
import OrderTable from "./OrderTable/OrderTable";
import { useHomepageCards } from "./useHomepageCards/useHomepageCards";

const Home = () => {
  const homepageCards = useHomepageCards();

  return (
    <Container as='main'>
      <Row className='mt-5 mb-5 gap-5 justify-content-center justify-content-md-start'>
        {homepageCards.filter((card) => card.visible).map((card) => (
          <Col
            xs={12} sm={6} md={4} lg={3} xl={2}
            key={card.header}
            className='homepage-card-col'
          >
            <HomePageCard {...card} />
          </Col>
        ))}
      </Row>

      <Row className='mt-5 table-decorators'>
        <Col>
          <OrderTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
