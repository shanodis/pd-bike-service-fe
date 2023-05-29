import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useBikePhotos } from '../../../../../contexts/BikePhotosContext';
import EditablePicture from '../../../../../components/Inputs/EditablePicture/EditablePicture';

enum Photos {
  First,
  Second,
  Third,
  Fourth
}

const BikePhotos = () => {
  const { bikePhotos, fetchBikePhotos } = useBikePhotos();
  const arePhotosEmpty = (index: number) => (bikePhotos && bikePhotos[index]?.fileUrl) || '';
  const { bikeId }: { bikeId: string } = useParams();

  const smallPicturesProps = {
    containerClass: 'p-0 position-relative',
    editPencilButtonClass: 'edit-button',
    addPictureButtonClass: 'empty-photo-placeholder',
    photoWrapperClass: 'photo',
    isBikePicture: true,
    idToPost: bikeId,
    reloadData: fetchBikePhotos
  };

  if (bikePhotos) {
    return (
      <>
        <Row>
          <Col xs="auto">
            <EditablePicture
              src={arePhotosEmpty(Photos.First)}
              containerClass="mb-5 mb-sm-4 position-relative p-0"
              editPencilButtonClass="main-edit-button"
              addPictureButtonClass="main-empty-photo-placeholder"
              photoWrapperClass="main-photo"
              isBikePicture
              urlToPost={`/bikes/${bikeId}/files/1`}
              urlToDelete={`/bikes/${bikeId}/files/${bikePhotos[Photos.First]?.fileId}`}
              urlToUpdate={`/bikes/${bikeId}/files/${bikePhotos[Photos.First]?.fileId}`}
              reloadData={fetchBikePhotos}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="auto">
            <EditablePicture
              src={arePhotosEmpty(Photos.Second)}
              urlToPost={`/bikes/${bikeId}/files/2`}
              urlToDelete={`/bikes/${bikeId}/files/${bikePhotos[Photos.Second]?.fileId}`}
              urlToUpdate={`/bikes/${bikeId}/files/${bikePhotos[Photos.Second]?.fileId}`}
              {...smallPicturesProps}
            />
          </Col>

          <Col xs="auto">
            <EditablePicture
              src={arePhotosEmpty(Photos.Third)}
              urlToPost={`/bikes/${bikeId}/files/3`}
              urlToDelete={`/bikes/${bikeId}/files/${bikePhotos[Photos.Third]?.fileId}`}
              urlToUpdate={`/bikes/${bikeId}/files/${bikePhotos[Photos.Third]?.fileId}`}
              {...smallPicturesProps}
            />
          </Col>

          <Col xs="auto">
            <EditablePicture
              src={arePhotosEmpty(Photos.Fourth)}
              urlToPost={`/bikes/${bikeId}/files/4`}
              urlToDelete={`/bikes/${bikeId}/files/${bikePhotos[Photos.Fourth]?.fileId}`}
              urlToUpdate={`/bikes/${bikeId}/files/${bikePhotos[Photos.Fourth]?.fileId}`}
              {...smallPicturesProps}
            />
          </Col>
        </Row>
      </>
    );
  }

  return <Spinner className="mt-3" animation="border" variant="primary" />;
};

export default BikePhotos;
