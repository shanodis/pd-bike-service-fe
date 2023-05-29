import { Formik } from 'formik';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import AboutEmployeeForm from './AboutEmployeeForm/AboutEmployeeForm';
import { showErrorResponses } from '../../../../utils/showErrorResponses';
import { AddEmployeeFormValidationSchema } from '../../../../validation/validation';
import ConfirmModal from '../../../../components/ConfrimModal/ConfirmModal';
import { useEmployee } from '../../../../contexts/EmployeeContext';
import { EmployeeRequest } from '../../../../interfaces/Employee/EmployeeRequest';

const AboutEmployee = () => {
  const { employeeId }: { employeeId: string } = useParams();
  const { employeeData, fetchEmployeeData } = useEmployee();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();
  const [switchToEditMode, setSwitchToEditMode] = useState(false);
  const { t } = useTranslation();

  const handleUpdateUserData = async (values: EmployeeRequest) => {
    try {
      await Axios.put(`/users/${employeeId}`, values);
      await fetchEmployeeData();
      setSwitchToEditMode(false);
      toast.success(t('employeeDetails.editionSuccessToast'));
    } catch (e) {
      showErrorResponses(e);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await Axios.delete(`/users/${employeeId}`);
      setShowDeleteModal(false);
      history.replace('/');
      history.push('/employees');
      toast.success(t('employeeDetails.deleteEmployeeSuccess'));
    } catch (e) {
      showErrorResponses(e);
    }
  };

  return (
    <Container>
      {!employeeData ? (
        <Spinner animation="border" variant="primary" className="mt-5" />
      ) : (
        <Formik
          enableReinitialize
          initialValues={employeeData}
          onSubmit={handleUpdateUserData}
          validationSchema={AddEmployeeFormValidationSchema}>
          <AboutEmployeeForm
            switchToEditMode={switchToEditMode}
            setSwitchToEditMode={setSwitchToEditMode}
            setShowDeleteModal={setShowDeleteModal}
          />
        </Formik>
      )}

      <ConfirmModal
        backButtonLabel={t('employeeDetails.backButton')}
        confirmButtonLabel={t('employeeDetails.deleteButton')}
        showModal={showDeleteModal}
        modalHeader={t('employeeDetails.deleteConfirmModalHeader')}
        handleConfirm={handleDeleteUser}
        handleHide={() => setShowDeleteModal(false)}>
        <div className="mt-5" />
      </ConfirmModal>
    </Container>
  );
};

export default AboutEmployee;
