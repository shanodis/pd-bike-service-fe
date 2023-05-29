import React from 'react';
import { useTranslation } from 'react-i18next';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import serviceLogo from '../../../assets/img/serviceLogo.svg';
import LanguagePicker from '../../../components/LanguagePicker/LanguagePicker';
import { Roles } from '../../../enums/Roles';
import { registerValidationSchema } from './registerValidationSchema/registerValidationSchema';
import { RegisterRequest } from '../../../interfaces/Register/RegisterRequest';
import RegisterForm from './RegisterForm/RegisterForm';

const initialValues: RegisterRequest = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  phoneNumberPrefix: '+48',
  roleId: Roles.Customer
};

const Register = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleRegister = async (values: RegisterRequest) => {
    try {
      await Axios.post('/auth/register', values);
      history.push('check-email');
    } catch (e: any) {
      const email = e?.response?.data?.errors?.email;
      email && toast.error(t('addNewCustomer.emailAlreadyUsedToastError'));
    }
  };

  return (
    <div className="sign-in d-flex vh-100">
      <div className="col-left">
        <Image src={serviceLogo} alt="logo" className="mt-4 ms-5" />

        <LanguagePicker />

        <Container className="form">
          <p className="h1 pb-5">{t('register.signUp')}</p>

          <Formik
            initialValues={initialValues}
            onSubmit={handleRegister}
            validationSchema={registerValidationSchema}>
            <RegisterForm />
          </Formik>

          <div className="mt-4">
            {t('register.gotAccount')}

            <Link to="/">
              <span className="link-info text-info text-decoration-underline">
                {t('signIn.signIn')}
              </span>
            </Link>
          </div>
        </Container>
      </div>

      <div className="col-right vh-100 d-none d-md-block">
        <div className="image-register vh-100" />
      </div>
    </div>
  );
};

export default Register;
