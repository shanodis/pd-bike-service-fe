import { Form, Formik } from 'formik';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BikesAccordion from './BikesAccordion/BikesAccordion';
import TextInput from '../../../../components/Inputs/TextInput/TextInput';
import { useRegisteredBikes } from '../../../../contexts/RegisteredBikesContext';
import { useCustomer } from '../../../../contexts/CustomerContext';

const initialValues = {
  bike: ''
};

const RegisteredBikes = () => {
  const { setPhrase, loading: loadingBikes } = useRegisteredBikes();
  const { loading } = useCustomer();
  const { t } = useTranslation();
  return (
    <Container className="registered-bikes">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" className="mt-5" />
        </div>
      ) : (
        <>
          <Row className="mt-5">
            <Col>
              <Formik initialValues={initialValues} onSubmit={(values) => setPhrase(values.bike)}>
                {(formik) => (
                  <Form>
                    <Row>
                      <Col sm={4}>
                        <TextInput
                          name="bike"
                          type="text"
                          placeholder={t('registeredBikes.searchForBike')}
                          onChange={() => formik.submitForm()}
                        />
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>

          <Row className="mt-5">
            {loadingBikes ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" className="mt-5 " />
              </div>
            ) : (
              <BikesAccordion />
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default RegisteredBikes;
