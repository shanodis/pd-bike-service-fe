import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Formik, Form } from 'formik';
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { PlusLg, X } from 'react-bootstrap-icons';
import { Button, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import ProfilePlaceholder from '../../../../assets/img/person-circle.svg';
import { ChangeProfilePictureValidationSchema } from '../../../../validation/validation';
import ChoosePictureButton from '../ChoosePictureButton/ChoosePictureButton';
import SubmitButton from '../../../SubmitButton/SubmitButton';
import ConfirmModal from '../../../ConfrimModal/ConfirmModal';

interface SetPictureModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowPreviousModal: Dispatch<SetStateAction<boolean>>;
  pictureSrc?: string;
  urlToPost: string;
  urlToDelete: string;
  urlToUpdate: string;
  reloadData: () => void;
  isPictureOfBike?: boolean;
}

interface SetPictureModalFormikValues {
  picture: File | null;
}

const formikValues: SetPictureModalFormikValues = {
  picture: null
};

const SetPictureModal: FC<SetPictureModalProps> = ({
  showModal,
  setShowModal,
  isPictureOfBike,
  pictureSrc,
  reloadData,
  urlToPost,
  urlToDelete,
  urlToUpdate,
  setShowPreviousModal
}) => {
  const handleHideModal = () => setShowModal(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useTranslation();
  const handleHideDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const setParentModalOpacity = () =>
    showDeleteModal ? { opacity: 0.2, zIndex: 200 } : { opacity: 0, zIndex: -1 };

  const handleDelete = async () => {
    try {
      await Axios.delete(urlToDelete);
      reloadData();
    } catch (e) {
      toast.error(t('fileModalErrors.delete'));
    } finally {
      handleHideDeleteModal();
      setShowPreviousModal((prevState) => !prevState);
    }
  };

  const unpackPicture = (picture: File) => URL.createObjectURL(picture);

  const getPictureSrcPath = (picture: File | null) => {
    if (picture) {
      return unpackPicture(picture);
    }
    return pictureSrc;
  };

  const isPictureLoaded = isPictureOfBike
    ? Boolean(pictureSrc)
    : Boolean(pictureSrc) && pictureSrc !== ProfilePlaceholder;

  const deleteIconStyle = isPictureOfBike ? { left: '78%', top: '3%' } : { left: '82%', top: '3%' };

  const shouldHidePlaceholder = (values: SetPictureModalFormikValues) =>
    !!(values.picture || isPictureLoaded);

  const handleSubmit = async (values: SetPictureModalFormikValues) => {
    const formData = new FormData();
    const file = values.picture ? values.picture : 'empty-file';
    const headers = { 'content-type': 'multipart/form-data' };

    formData.append('file', file);
    try {
      if (isPictureLoaded) {
        await Axios.put(urlToUpdate, formData, { headers });
      } else {
        await Axios.post(urlToPost, formData, { headers });
      }
      reloadData();
    } catch (e) {
      toast.error(t('fileModalErrors.uploadFile'));
    } finally {
      setShowModal(false);
    }
  };

  return (
    <Modal
      centered
      onHide={handleHideModal}
      show={showModal}
      size="lg"
      contentClassName="rounded-0 border-0">
      <Modal.Body as={Container} className="position-relative">
        <Formik<SetPictureModalFormikValues>
          initialValues={formikValues}
          onSubmit={handleSubmit}
          validationSchema={ChangeProfilePictureValidationSchema}>
          {({ values }) => (
            <Form>
              <div className="modal-overlay" style={setParentModalOpacity()} />

              <Row className="m-auto mt-4 justify-content-center justify-content-md-start">
                <Col xs="auto">
                  <Container className="position-relative">
                    <div className="image-wrapper">
                      {isPictureOfBike ? (
                        <>
                          <Image
                            src={getPictureSrcPath(values.picture)}
                            width="220px"
                            height="220px"
                            style={{ objectFit: 'cover' }}
                            className={`${!isPictureLoaded && !values.picture && 'd-none'}`}
                          />

                          <div
                            className={`border-0 modal-placeholder rounded-0 ${
                              shouldHidePlaceholder(values) && 'd-none'
                            }`}>
                            <PlusLg />
                          </div>
                        </>
                      ) : (
                        <Image
                          src={getPictureSrcPath(values.picture) || ProfilePlaceholder}
                          width="220px"
                          height="220px"
                          style={{ objectFit: 'cover' }}
                          roundedCircle
                        />
                      )}
                    </div>

                    {isPictureLoaded && (
                      <Button
                        variant="danger"
                        className="rounded-circle position-absolute d-flex fs-4 p-0 text-white shadow-none btn-focus-off"
                        style={deleteIconStyle}
                        onClick={handleShowDeleteModal}>
                        <X />
                      </Button>
                    )}
                  </Container>
                </Col>

                <Col xs="auto" className="ms-0 ms-md-4 mt-4">
                  <ChoosePictureButton name="picture" />
                </Col>
              </Row>

              <section className="d-flex justify-content-center justify-content-md-end p-3">
                <div className="me-3">
                  <Button variant="secondary-light" className="fw-bold" onClick={handleHideModal}>
                    {t('customerSettings.cancel')}
                  </Button>
                </div>

                <div>
                  <SubmitButton
                    variant="success-lighter"
                    className="text-white fw-bold"
                    type="submit">
                    {t('customerSettings.saveChanges')}
                  </SubmitButton>
                </div>
              </section>

              <ConfirmModal
                backButtonLabel={t('customerSettings.backBtn')}
                confirmButtonLabel={t('customerSettings.confirmDeleteBtn')}
                showModal={showDeleteModal}
                handleHide={handleHideDeleteModal}
                handleConfirm={handleDelete}
                modalHeader={t('customerSettings.confirmDelete')}>
                <div className="mt-5 w-100" />
              </ConfirmModal>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SetPictureModal;
