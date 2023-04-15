import React from 'react';
import { Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import TextInput from '../../../../components/Inputs/TextInput/TextInput';
import PhoneInput from '../../../../components/Inputs/PhoneInput/PhoneInput';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';

const RegisterForm = () => {
  const { t } = useTranslation();

  return (
    <Form noValidate>
      <Row>
        <Col className='mb-4'>
          <TextInput
            name='firstName'
            label={t('register.firstName')}
            required
          />
        </Col>
      </Row>

      <Row>
        <Col className='mb-4'>
          <TextInput
            name='lastName'
            label={t('register.lastName')}
            required
          />
        </Col>
      </Row>

      <Row>
        <Col className='mb-4'>
          <TextInput
            name='email'
            label='E-mail'
            required
          />
        </Col>
      </Row>

      <Row>
        <Col className='mb-4'>
          <PhoneInput
            name='phoneNumber'
            prefixName='phoneNumberPrefix'
            required
            label={t('register.phoneNumber')}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <SubmitButton
            variant='primary-lighter'
            className='mt-5 float-end'
          >
            {t('register.signUp')}
          </SubmitButton>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;
