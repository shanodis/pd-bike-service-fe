import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// @ts-ignore
import serviceLogo from '../../../assets/img/serviceLogo.svg';

const CheckEmail = () => {
  const { t } = useTranslation();
  return (
    <Container className="w-100">
      <Row>
        <Col>
          <Image src={serviceLogo} className="mt-5 ms-5 mb-5" />
          <h1 className="text-center mt-5 m-5 pt-5">{t('register.success')}</h1>
          <h2 className="text-center mt-5 m-5">{t('register.checkEmail')}</h2>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button className="mt-5 m-5" as={Link as any} to="/">
            {t('register.returnSignInButton')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckEmail;
