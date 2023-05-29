import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { useOrder } from '../../../../contexts/OrderContext';
import InformationsForm from '../../../../components/InformationsForm/InformationsForm';

const Informations = () => {
  const { informations } = useOrder();
  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <Formik enableReinitialize initialValues={informations.data} onSubmit={() => undefined}>
            <InformationsForm readonly />
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Informations;
