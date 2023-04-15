import React, { Dispatch, FC, SetStateAction } from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import { Button, Image } from 'react-bootstrap';

interface BikePictureProps {
  setShowProfilePictureModal: Dispatch<SetStateAction<boolean>>;
  addPictureButtonClass: string;
  bikePicture?: string;
  photoWrapperClass?: string;
}

const BikePicture: FC<BikePictureProps> = ({
  setShowProfilePictureModal,
  addPictureButtonClass,
  bikePicture,
  photoWrapperClass
}) => {
  if (bikePicture) {
    return (
      <div className={photoWrapperClass}>
        <Image style={{ objectFit: 'cover' }} className={photoWrapperClass} src={bikePicture} />
      </div>
    );
  }

  return (
    <Button
      onClick={() => setShowProfilePictureModal(true)}
      className={`border-0 ${addPictureButtonClass} rounded-0`}
      variant="secondary-light">
      <PlusLg />
    </Button>
  );
};

export default BikePicture;
