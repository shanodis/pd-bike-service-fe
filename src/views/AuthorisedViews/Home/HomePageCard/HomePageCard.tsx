import React, { FC } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { LinkButton } from '../useHomepageCards/useHomepageCards';
import { useHistory } from 'react-router-dom';

interface HomePageCardProps {
  header: string;
  image: string;
  primaryButton: LinkButton;
  secondaryButton?: LinkButton;
}

const HomePageCard: FC<HomePageCardProps> = ({ header, image, primaryButton, secondaryButton }) => {
  const history = useHistory();

  return (
    <Card bg="secondary-light-2" className="homepage-card">
      <Card.Title className="homepage-card-title">{header}</Card.Title>

      <Card.Img className="homepage-card-img" variant="top" src={image} />

      <Card.Body className="px-0 pb-0 mt-4">
        <ButtonGroup vertical className="w-100">
          {primaryButton.visible && (
            <Button
              onClick={() => history.push(primaryButton.route)}
              variant="primary-lighter"
              className="homepage-card-btn">
              <b>{primaryButton.title}</b>
            </Button>
          )}

          {secondaryButton && secondaryButton.visible && (
            <Button
              onClick={() => history.push(secondaryButton.route)}
              variant="primary-dark"
              className="homepage-card-btn">
              <b>{secondaryButton.title}</b>
            </Button>
          )}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default HomePageCard;
