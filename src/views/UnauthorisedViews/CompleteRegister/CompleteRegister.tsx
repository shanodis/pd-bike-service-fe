import { Formik } from 'formik';
import React from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Container, Image } from 'react-bootstrap';
import serviceLogo from '../../../assets/img/serviceLogo.svg';
import LanguagePicker from '../../../components/LanguagePicker/LanguagePicker';
import { completeRegisterValidationSchema } from './completeRegisterValidationSchema/completeRegisterValidationSchema';
import CompleteRegisterForm from './CompleteRegisterForm/CompleteRegisterForm';
import { CompleteRegisterRequest } from '../../../interfaces/CompleteRegister/CompleteRegisterRequest';
import { useRoute } from '../../../hooks/useRoute';
import { useHistory } from 'react-router-dom';

interface SearchModel {
  userId: string;
  token: string;
}

const formikValues: CompleteRegisterRequest = {
  newPassword: '',
  newPasswordConfirm: ''
};

const CompleteRegister = () => {
  const { t } = useTranslation();
  const { getSearch } = useRoute();
  const { userId } = getSearch<SearchModel>();

  const history = useHistory();

  // const config = useMemo(() => ({ params: { token } }), [token]);

  const handleSubmit = async (values: CompleteRegisterRequest) => {
    try {
      await Axios.patch(`/auth/${userId}/password`, values);
      toast.success(t('signUp.successToastSignUp'));
      history.push('/');
    } catch (e: any) {
      const message = e?.response?.data?.message;
      const errors = e?.response?.data?.errors;
      message && toast.error(t('signUp.passwordErrorToast'));
      errors?.newPassword && toast.error(t('signUp.passwordErrorToast'));
      errors?.newPasswordConfirm && toast.error(t('signUp.reEnterPasswordErrorToast'));
    }
  };

  return (
    <>
      <Image src={serviceLogo} alt="logo" className="mt-4 ms-5 float-sm-none" />

      <LanguagePicker />

      <Container>
        <Formik
          initialValues={formikValues}
          onSubmit={handleSubmit}
          validationSchema={completeRegisterValidationSchema}>
          <CompleteRegisterForm />
        </Formik>
      </Container>
    </>
  );
};

export default CompleteRegister;
