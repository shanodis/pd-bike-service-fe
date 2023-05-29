import React, { useState } from 'react';
import { Alert, Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useFetchData } from '../../../hooks/useFetchData';
import { CustomerRequest } from '../../../interfaces/Customer/CustomerRequest';
import { useCurrentUser } from '../../../contexts/UserContext';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import EditablePicture from '../../../components/Inputs/EditablePicture/EditablePicture';
import UserForm from '../../../components/UserForm/UserForm';
import {
  AddClientFormValidationSchema,
  AddClientFormWithInvoiceFormValidationSchema
} from '../../../validation/validation';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import { formColProps } from '../../../consts/formColProps';
import { showErrorResponses } from '../../../utils/showErrorResponses';
import { polandId } from '../../../consts/polandId';
import Checkbox from '../../../components/Inputs/Checkbox/Checkbox';

const customFormColProps = {
  xs: 12,
  sm: formColProps.sm + 8,
  md: formColProps.md + 3,
  lg: formColProps.lg + 3
};

const userDataMapper = (data: CustomerRequest) => ({
  ...data,
  addInvoice: !!data.companyName,
  countryId: data.countryId ? data.countryId : polandId
});

const UserSettings = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userData] = useFetchData<CustomerRequest>(`/users/${userId}/details`, {
    dataMapper: userDataMapper
  });
  const { fetchUserData, fetchPicture, userPhoto } = useCurrentUser();
  const [qrCodeSrc, setQrCodeSrc] = useState('');

  const urlToUploadPhotos = `/users/${userId}/avatar`;

  const handleUpdateUserData = async ({ addInvoice, ...values }: CustomerRequest) => {
    try {
      const dataWithoutInvoice = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        phoneNumberPrefix: values.phoneNumberPrefix,
        note: values.note,
        isUsing2FA: values.isUsing2FA
      };
      const postValues = addInvoice ? values : dataWithoutInvoice;

      await Axios.put(`/users/${userId}`, postValues);
      await fetchUserData();
      toast.success(t('customerSettings.editionSuccessToast'));
    } catch (e) {
      showErrorResponses(e);
    }
  };

  const handle2FAEnableSubmit = async (values: { isUsing2FA: boolean }) => {
    const { data } = await Axios.patch<{ qrUrl: string; isUsing2FA: boolean }>(
      '/users/toggle2FA',
      values
    );
    const { qrUrl, isUsing2FA } = data;
    setQrCodeSrc(isUsing2FA ? qrUrl : '');
  };

  const settingsBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/settings', name: t('breadcrumbs.settings') }
  ];

  return (
    <Container>
      <Breadcrumbs items={settingsBreadcrumbs} />
      <div className="mt-5" />
      {!userData ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          <Row className="justify-content-center justify-content-xl-between">
            <Col xs="auto" className="ps-auto ps-sm-0">
              <EditablePicture
                src={userPhoto}
                containerClass="position-relative ps-1"
                editPencilButtonClass="main-edit-button"
                addPictureButtonClass="main-empty-photo-placeholder"
                photoWrapperClass="main-photo"
                reloadData={fetchPicture}
                urlToPost={urlToUploadPhotos}
                urlToUpdate={urlToUploadPhotos}
                urlToDelete={urlToUploadPhotos}
              />
            </Col>

            <Col xs={12} lg={6} xl={7} xxl={8}>
              <Formik
                initialValues={userData}
                enableReinitialize
                onSubmit={handleUpdateUserData}
                validationSchema={
                  userData.addInvoice
                    ? AddClientFormWithInvoiceFormValidationSchema
                    : AddClientFormValidationSchema
                }>
                <Form>
                  <UserForm
                    hideNoteInput
                    disableMailInput
                    hideCheckboxInput
                    customFormColProps={customFormColProps}
                  />

                  <section className="mt-5 mb-3 text-end">
                    <Button
                      variant="secondary-light-2"
                      className="me-3 shadow-none fw-bold"
                      onClick={() => navigate('/')}>
                      {t('customerSettings.cancel')}
                    </Button>

                    <SubmitButton variant="success" type="submit" className="fw-bold">
                      {t('customerSettings.save')}
                    </SubmitButton>
                  </section>
                </Form>
              </Formik>
            </Col>
          </Row>

          <Row>
            <Col xs={12} lg={6} xl={7} xxl={8}>
              <Formik
                initialValues={{ isUsing2FA: Boolean(userData.isUsing2FA) }}
                enableReinitialize
                onSubmit={handle2FAEnableSubmit}>
                {({ submitForm, values }) => (
                  <Form>
                    <Row>
                      <Col {...customFormColProps} className="mt-4">
                        <Checkbox
                          name="isUsing2FA"
                          label={t('customerSettings.enable2FA')}
                          id="enable2FA-checkbox"
                          onChange={submitForm}
                        />
                      </Col>
                    </Row>

                    {values.isUsing2FA && (
                      <Row>
                        <Col {...customFormColProps} className="mt-4">
                          <Button
                            onClick={() => handle2FAEnableSubmit({ isUsing2FA: true })}
                            variant="success"
                            className="fw-bold"
                          >
                            {t('customerSettings.generateQrCode')}
                          </Button>
                        </Col>
                      </Row>
                    )}

                    {qrCodeSrc && values.isUsing2FA && (
                      <Row>
                        <Col xs="auto" className="mt-4">
                          <Alert variant="warning">{t('customerSettings.2FAalert')}</Alert>
                          <Image src={qrCodeSrc} alt="2FA Qr code" />
                        </Col>
                      </Row>
                    )}
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default UserSettings;
