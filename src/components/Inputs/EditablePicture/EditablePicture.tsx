import React, { FC, useState } from 'react';
import { PencilFill } from 'react-bootstrap-icons';
import { Button, Container, Image } from 'react-bootstrap';
import SetPictureModal from './SetPictureModal/SetPictureModal';
import BikePicture from './BikePicture/BikePicture';

interface EditablePictureProps {
  isBikePicture?: boolean;
  containerClass?: string;
  editPencilButtonClass?: string;
  addPictureButtonClass?: string;
  photoWrapperClass?: string;
  src?: string;
  reloadData: () => void;
  urlToPost: string;
  urlToDelete: string;
  urlToUpdate: string;
}

const EditablePicture: FC<EditablePictureProps> = ({
  containerClass,
  isBikePicture,
  editPencilButtonClass,
  addPictureButtonClass,
  src,
  photoWrapperClass,
  reloadData,
  urlToPost,
  urlToDelete,
  urlToUpdate,
}) => {
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  return (
    <Container className={containerClass}>
      {isBikePicture ? (
        <BikePicture
          setShowProfilePictureModal={setShowProfilePictureModal}
          addPictureButtonClass={addPictureButtonClass!}
          bikePicture={src}
          photoWrapperClass={photoWrapperClass}
        />
      ) : (
        <div className={photoWrapperClass}>
          <Image
            className={photoWrapperClass}
            style={{ objectFit: 'cover', width: '320px', height: '320px' }}
            src={src}
            roundedCircle
          />
        </div>
      )}

      <Button
        variant='info'
        className={`rounded-circle p-2 d-flex text-white shadow-none position-absolute ${editPencilButtonClass}`}
        onClick={() => setShowProfilePictureModal(true)}
      >
        <PencilFill />
      </Button>

      <SetPictureModal
        showModal={showProfilePictureModal}
        setShowModal={setShowProfilePictureModal}
        setShowPreviousModal={setShowProfilePictureModal}
        pictureSrc={src}
        urlToPost={urlToPost}
        urlToDelete={urlToDelete}
        urlToUpdate={urlToUpdate}
        reloadData={reloadData}
        isPictureOfBike={isBikePicture}
      />
    </Container>
  );
};

export default EditablePicture;
