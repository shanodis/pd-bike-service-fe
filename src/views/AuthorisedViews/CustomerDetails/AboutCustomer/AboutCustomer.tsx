import { Formik } from 'formik';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import AboutCustomerForm from './AboutCustomerForm/AboutCustomerForm';
import { useCustomer } from '../../../../contexts/CustomerContext';
import { CustomerRequest } from '../../../../interfaces/Customer/CustomerRequest';
import { showErrorResponses } from '../../../../utils/showErrorResponses';
import {
  AddClientFormValidationSchema,
  AddClientFormWithInvoiceFormValidationSchema
} from '../../../../validation/validation';
import ConfirmModal from '../../../../components/ConfrimModal/ConfirmModal';

const AboutCustomer = () => {
  const { customerId }: { customerId: string } = useParams();
  const { customerData, fetchCustomerData } = useCustomer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();
  const [switchToEditMode, setSwitchToEditMode] = useState(false);
  const { t } = useTranslation();

  const handleUpdateUserData = async (values: CustomerRequest) => {
    try {
      await Axios.put(`/users/${customerId}`, values);
      await fetchCustomerData();
      setSwitchToEditMode(false);
      toast.success(t('customerDetails.editionSuccessToast'));
    } catch (e) {
      showErrorResponses(e);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await Axios.delete(`/users/${customerId}`);
      setShowDeleteModal(false);
      history.replace('/');
      history.push('/customers');
      toast.success(t('customerDetails.deleteCustomerSuccess'));
    } catch (e) {
      toast.error(t('customerDetails.deleteCustomerFail'));
    }
  };

  return (
    <Container>
      {!customerData ? (
        <Spinner animation="border" variant="primary" className="mt-5" />
      ) : (
        <Formik
          enableReinitialize
          initialValues={customerData}
          onSubmit={handleUpdateUserData}
          validationSchema={
            customerData.addInvoice
              ? AddClientFormWithInvoiceFormValidationSchema
              : AddClientFormValidationSchema
          }>
          <AboutCustomerForm
            switchToEditMode={switchToEditMode}
            setSwitchToEditMode={setSwitchToEditMode}
            setShowDeleteModal={setShowDeleteModal}
          />
        </Formik>
      )}

      <ConfirmModal
        backButtonLabel={t('customerDetails.backButton')}
        confirmButtonLabel={t('customerDetails.deleteButton')}
        showModal={showDeleteModal}
        modalHeader={t('customerDetails.deleteConfirmModalHeader')}
        handleConfirm={handleDeleteUser}
        handleHide={() => setShowDeleteModal(false)}>
        <div className="mt-5" />
      </ConfirmModal>
    </Container>
  );
};

export default AboutCustomer;
