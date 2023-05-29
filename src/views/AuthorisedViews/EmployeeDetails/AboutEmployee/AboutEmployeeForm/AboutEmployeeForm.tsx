import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form } from 'formik';
import { useTranslation } from 'react-i18next';
import UserForm from '../../../../../components/UserForm/UserForm';
import SubmitButton from '../../../../../components/SubmitButton/SubmitButton';

interface AboutEmployeeFormProps {
  switchToEditMode: boolean;
  setSwitchToEditMode: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

const AboutEmployeeForm: FC<AboutEmployeeFormProps> = ({
  switchToEditMode,
  setSwitchToEditMode,
  setShowDeleteModal
}) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    setTimeout(() => {
      setSwitchToEditMode(false);
    });
  };

  return (
    <Form>
      {!switchToEditMode ? (
        <Row className="justify-content-center justify-content-lg-end ">
          <Col className="text-center text-sm-end">
            <Button
              onClick={() => setSwitchToEditMode(true)}
              className="mt-5 mb-sm-0 bg-primary-lighter border-primary-lighter">
              {t('employeeDetails.editButton')}
            </Button>
          </Col>
        </Row>
      ) : (
        <div className="mt-5" />
      )}
      <UserForm readonlyMode={!switchToEditMode} disableMailInput hideInvoice hideCheckboxInput />

      <Row className="mt-5 mb-3 justify-content-between">
        <Col xs={4} sm={5} md={7} lg={9} className="text-start">
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            {t('employeeDetails.deleteButton')}
          </Button>
        </Col>

        {switchToEditMode && (
          <>
            <Col xs={5} sm={5} md={3} lg={2} className="text-end">
              <Button variant="secondary-light" onClick={handleCancel} type="reset">
                {t('employeeDetails.cancelButton')}
              </Button>
            </Col>

            <Col xs={3} sm={2} md={2} lg={1} className="text-end">
              <SubmitButton variant="success-lighter" className="text-white" type="submit">
                {t('employeeDetails.saveButton')}
              </SubmitButton>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default AboutEmployeeForm;
