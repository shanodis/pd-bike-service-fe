import React from 'react';
import { Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Col, ColProps, Row } from 'react-bootstrap';
import PasswordInput from '../../../../components/Inputs/PasswordInput/PasswordInput';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';

const colProps: ColProps = {
  xs: 12,
  md: 6,
  lg: 4,
  className: 'mt-5'
};

const CompleteRegisterForm = () => {
  const { t } = useTranslation();

  return (
    <Form noValidate style={{ marginTop: '15vh' }}>
      <Row className="justify-content-center">
        <Col {...colProps}>
          <PasswordInput name="newPassword" label={t('signUp.newPassword')} required />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col {...colProps}>
          <PasswordInput
            name="newPasswordConfirm"
            label={t('signUp.reEnterNewPassword')}
            required
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col {...colProps}>
          <SubmitButton variant="primary-lighter" className="float-end">
            {t('signUp.submit')}
          </SubmitButton>
        </Col>
      </Row>
    </Form>
  );
};

export default CompleteRegisterForm;
