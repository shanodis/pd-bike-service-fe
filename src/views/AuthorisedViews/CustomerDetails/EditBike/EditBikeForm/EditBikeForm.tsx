import React, { Dispatch, FC, SetStateAction } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import NewBikeTextInputs from '../../../../../components/InformationsForm/NewBikeTextInputs/NewBikeTextInputs';
import ConfirmModal from '../../../../../components/ConfrimModal/ConfirmModal';
import { showErrorResponses } from '../../../../../utils/showErrorResponses';
import { formColProps } from '../../../../../consts/formColProps';

const customFormColProps = {
  xs: 12,
  sm: formColProps.sm + 3,
  md: formColProps.md + 3,
  lg: formColProps.lg + 3
};

interface EditBikeFormProps {
  showBikeDeleteModal: boolean;
  setShowBikeDeleteModal: Dispatch<SetStateAction<boolean>>;
}

const EditBikeForm: FC<EditBikeFormProps> = ({ showBikeDeleteModal, setShowBikeDeleteModal }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { bikeId }: { bikeId: string } = useParams();

  const handleHideModal = () => setShowBikeDeleteModal(false);

  const handleDelete = async () => {
    try {
      await Axios.delete(`/bikes/${bikeId}`);
      toast.success(t('editBike.successDelete'));
      history.replace('/');
      history.push('/');
    } catch (e) {
      showErrorResponses(e);
    } finally {
      setShowBikeDeleteModal(false);
    }
  };

  return (
    <>
      <NewBikeTextInputs customColProps={customFormColProps} />

      <ConfirmModal
        modalHeader={t('editBike.modalHeader')}
        backButtonLabel={t('editBike.back')}
        confirmButtonLabel={t('editBike.delete')}
        showModal={showBikeDeleteModal}
        handleHide={handleHideModal}
        handleConfirm={handleDelete}>
        <div className="mt-5 w-100" />
      </ConfirmModal>
    </>
  );
};

export default EditBikeForm;
