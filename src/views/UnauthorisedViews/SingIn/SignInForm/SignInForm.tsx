import React from 'react';
import { Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import TextInput from '../../../../components/Inputs/TextInput/TextInput';
import PasswordInput from '../../../../components/Inputs/PasswordInput/PasswordInput';
import SubmitButton from "../../../../components/SubmitButton/SubmitButton";

const SignInForm = () => {
  const { t } = useTranslation();

  return (
    <Form noValidate>
      <Row>
        <Col className='mb-4'>
          <TextInput
            name='username'
            type='email'
            label='E-mail'
            className='mb-4'
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <PasswordInput
            name='password'
            type='password'
            label={t('signIn.password')}
          />

          <SubmitButton
            variant='primary-lighter'
            className='mt-5 float-end'
          >
            {t('signIn.signIn')}
          </SubmitButton>
        </Col>
      </Row>
    </Form>
  );
};

export default SignInForm;
