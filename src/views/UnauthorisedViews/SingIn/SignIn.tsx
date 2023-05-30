import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { Col, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { signInValidationSchema } from './signInValidationSchema/signInValidationSchema';
import serviceLogo from '../../../assets/img/serviceLogo.svg';
import { useCurrentUser } from '../../../contexts/UserContext';
import LanguagePicker from '../../../components/LanguagePicker/LanguagePicker';
import SignInForm from './SignInForm/SignInForm';
import { SignInRequest } from '../../../interfaces/SignIn/SignInRequest';
import { appendUrlSearchParams } from '../../../utils/appendUrlSearchParams';
import { VerificationCodeValidationSchema } from '../../../validation/validation';
import TextInput from '../../../components/Inputs/TextInput/TextInput';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';

const initialValues: SignInRequest = {
  username: '',
  password: ''
};

const SignIn = () => {
  const { fetchUserData, setIsPending } = useCurrentUser();
  const { t } = useTranslation();
  const history = useHistory();
  const [signInRequestCache, setSignInRequestCache] = useState<SignInRequest>();

  const handleSignIn = async (values: SignInRequest) => {
    Axios.defaults.baseURL = 'http://localhost:8080';
    const loginParams = appendUrlSearchParams(values);
    try {
      const { headers } = await Axios.post('/login', loginParams);
      setIsPending(true);

      const accessToken = headers.authorization;
      Axios.defaults.headers.common.Authorization = accessToken;
      localStorage.setItem('JWT_USER_TOKEN', accessToken);

      const refreshToken = headers['authorization-refresh'];
      Axios.defaults.headers.common['authorization-refresh'] = refreshToken;
      localStorage.setItem('JWT_REFRESH_TOKEN', refreshToken);

      Axios.defaults.baseURL = 'http://localhost:8080/api/v1';

      history.push('/');

      await fetchUserData();
    } catch (e: any) {
      Axios.defaults.baseURL = 'http://localhost:8080/api/v1';

      if (e?.response?.data?.exception === 'Invalid 2FA code' && !signInRequestCache) {
        setSignInRequestCache(values);
      } else if (signInRequestCache) {
        toast.error(t('signIn.invalidVerificationCode'));
      } else {
        toast.error(t('signIn.wrongEmailOrPassword'));
      }
    }
  };

  return (
    <div className="sign-in d-flex vh-100">
      <div className="col-left">
        <Image src={serviceLogo} alt="logo" className="mt-4 ms-5" />

        <LanguagePicker />

        <div className="form">
          <p className="h1 pb-5">{t('signIn.signIn')}</p>

          {!signInRequestCache ? (
            <Formik
              initialValues={initialValues}
              onSubmit={handleSignIn}
              validationSchema={signInValidationSchema}>
              <SignInForm />
            </Formik>
          ) : (
            <Formik
              enableReinitialize
              initialValues={{ ...signInRequestCache, verificationCode: '' }}
              onSubmit={handleSignIn}
              validationSchema={VerificationCodeValidationSchema}>
              <Form noValidate autoComplete="off">
                <Row>
                  <Col>
                    <TextInput
                      name="verificationCode"
                      label={t('signIn.verificationCode')}
                      required
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <SubmitButton variant="primary-lighter" className="mt-5 float-end">
                      {t('signIn.signIn')}
                    </SubmitButton>
                  </Col>
                </Row>
              </Form>
            </Formik>
          )}

          <div className="mt-4">
            {t('register.noAccount')}

            <Link to="/register">
              <span className="link-info text-info text-decoration-underline">
                {t('register.signUp')}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-right vh-100 d-none d-md-block">
        <div className="image-login vh-100" />
      </div>
    </div>
  );
};

export default SignIn;
