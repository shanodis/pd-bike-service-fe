import React, { FC } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import brokenBike from '../../assets/img/brokenBike.svg';
import { useCurrentUser } from '../../contexts/UserContext';

interface ErrorOverlayProps {
  errorCode: number;
}

const ErrorOverlay: FC<ErrorOverlayProps> = ({ errorCode }) => {
  const { t } = useTranslation();
  const { onLogOut } = useCurrentUser();
  return (
    <Container className="text-center">
      <Row>
        <Col className="mt-5">
          <Image src={brokenBike} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="mt-1 mb-4 text-primary-lighter" style={{ fontSize: '6rem' }}>
            {errorCode === 404 ? '404' : '403'}
          </h1>
          <p className="h2 fw-normal">
            {errorCode === 404 ? t('errorOverlay.pageNotFound') : t('errorOverlay.forbidden')}
          </p>
          <Button variant="primary-lighter mt-3 fw-bold" as="a" href="/" onClick={onLogOut}>
            {t('errorOverlay.backToDashboard')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorOverlay;
