import React, { FC, useMemo, useState } from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import FsLightbox from 'fslightbox-react';
import { Image } from 'react-bootstrap';
import { useFetchData } from '../../../../../../../hooks/useFetchData';
import { useRegisteredBikes } from '../../../../../../../contexts/RegisteredBikesContext';
import { BikeListResponse } from '../../../../../../../interfaces/Bike/BikeListResponse';

interface BikePhotosInterface {
  bikeId: string;
}

const BikePhotos: FC<BikePhotosInterface> = ({ bikeId }) => {
  const [toggler, setToggler] = useState(false);
  const [i, setI] = useState(0);

  const { bikesInfo } = useRegisteredBikes();

  const bikeInfo: BikeListResponse | object = useMemo(
    () => bikesInfo?.find((info) => info.bikeId == bikeId) || {},
    [bikesInfo]
  );

  const { bikePhotosUrls: photos } = bikeInfo as BikeListResponse;

  const photosLength = photos ? photos.length : 0;

  const lightBoxHandler = (ind: number) => {
    setToggler(!toggler);
    setI(ind);
  };

  return (
    <div className="img-cont">
      <div className={`${photosLength > 0 && 'd-none'} main-photo`}>
        <div className="main-empty-photo-placeholder bg-secondary-light">
          <PlusLg />
        </div>
      </div>
      {photos?.map((photo, index) =>
        index === 0 ? (
          <div key={photo?.fileId} className="main-photo">
            <Image
              src={photo?.fileUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onClick={() => lightBoxHandler(index)}
            />
          </div>
        ) : (
          <div key={photo?.fileId} className={`p${index} m-1`}>
            <Image
              src={photo?.fileUrl}
              fluid
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onClick={() => lightBoxHandler(index)}
            />
          </div>
        )
      )}
      <FsLightbox
        toggler={toggler}
        sources={photos?.map((item) => item.fileUrl)}
        sourceIndex={i}
        type="image"
      />
    </div>
  );
};

export default BikePhotos;
