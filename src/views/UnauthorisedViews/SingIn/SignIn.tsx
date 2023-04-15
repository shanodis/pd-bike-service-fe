import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';
import Axios from "axios";
import { Facebook } from "react-bootstrap-icons";
import { signInValidationSchema } from './signInValidationSchema/signInValidationSchema';
import serviceLogo from '../../../assets/img/serviceLogo.svg';
import { useCurrentUser } from '../../../contexts/UserContext';
import LanguagePicker from '../../../components/LanguagePicker/LanguagePicker';
import SignInForm from './SignInForm/SignInForm';
import { SignInRequest } from '../../../interfaces/SignIn/SignInRequest';
import { appendUrlSearchParams } from '../../../utils/appendUrlSearchParams';
import { getSearchParams } from "../../../utils/getSearchParams";

const initialValues: SignInRequest = {
  username: '',
  password: '',
};

const oauth2AuthorizationFacebook = "http://localhost:8080/oauth2/authorization/google";

const SignIn = () => {
  const { fetchUserData, setIsPending } = useCurrentUser()
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {

      const { status } = getSearchParams<{ status: string }>();
      const statusNumber = Number.parseInt(status, 10);

      if (statusNumber) {
        if (statusNumber === 201)
          navigate("/check-email");

        else if (statusNumber === 200)
          window.location.search = '';

        else if (statusNumber === 401)
          toast.error(t('signIn.OAuth2Error'));
      }

    }, [t, navigate]
  );


  const handleSignIn = async (values: SignInRequest) => {
    Axios.defaults.baseURL = 'https://bike-service-be.herokuapp.com';
    const loginParams = appendUrlSearchParams(values);
    try {
      const { headers, request } = await Axios.post('/login', loginParams);
      setIsPending(true);

      const accessToken = headers.authorization;
      Axios.defaults.headers.common.Authorization = accessToken;
      localStorage.setItem("JWT_USER_TOKEN", accessToken);

      const refreshToken = headers['authorization-refresh'];
      Axios.defaults.headers['authorization-refresh'] = refreshToken;
      localStorage.setItem("JWT_REFRESH_TOKEN", refreshToken);

      Axios.defaults.baseURL = 'https://bike-service-be.herokuapp.com/api/v1';

      navigate('/');

      await fetchUserData();

    } catch (e) {
      Axios.defaults.baseURL = 'https://bike-service-be.herokuapp.com/api/v1'
      toast.error(t('signIn.wrongEmailOrPassword'));
    }

  }


  return (

    <div className='sign-in d-flex vh-100'>
      <div className='col-left'>
        <Image src={serviceLogo} alt="logo" className='mt-4 ms-5'/>

        <LanguagePicker/>

        <div className='form'>
          <p className='h1 pb-5'>{t('signIn.signIn')}</p>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSignIn}
            validationSchema={signInValidationSchema}
          >
            <SignInForm/>
          </Formik>


          <Button
            className="mt-2"
            variant="info"
          >
            <a
              href={oauth2AuthorizationFacebook}
              className="text-white text-decoration-none d-flex justify-content-center align-items-center gap-2"
            >
              {t('signIn.fb')}
              <Facebook size="1.8rem"/>
            </a>
          </Button>

          <div className='mt-4'>
            {t('register.noAccount')}

            <Link to="/register">
              <span className='link-info text-info text-decoration-underline'>
                {t('register.signUp')}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className='col-right vh-100 d-none d-md-block'>
        <div className='image-login vh-100'/>
      </div>
    </div>
  )
}

export default SignIn;
