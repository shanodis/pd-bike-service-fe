import React, { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BikePhotos from './BikePhotos/BikePhotos';
import { BikeListResponse } from '../../../../../../interfaces/Bike/BikeListResponse';

interface BikeInterface {
  bike: BikeListResponse;
}

const BikeInfo: FC<BikeInterface> = ({ bike }) => {
  const { t } = useTranslation();
  const { customerId }: { customerId: string } = useParams();

  return (
    <Row>
      <Col>
        <BikePhotos bikeId={bike.bikeId} />
      </Col>
      <Col className="mt-sm-5 mt-md-0 m-4" lg={8}>
        <Button
          variant="primary-bright"
          className=" mt-1 float-end text-white"
          as={Link as any}
          to={`/edit-bike/${customerId}/${bike.bikeId}`}>
          {t('customerDetails.editButton')}
        </Button>
        <p className="bike-info-margin">{t('registeredBikes.bikeName')}</p>
        <p className="fw-bolder ">{bike?.bikeName}</p>
        <p className="bike-info-margin">{t('registeredBikes.bikeProducer')}</p>
        <p className="fw-bolder">{bike.bikeMake ? bike.bikeMake : '-'}</p>
        <p className="bike-info-margin">{t('registeredBikes.bikeModel')}</p>
        <p className="fw-bolder">{bike.bikeModel ? bike.bikeModel : '-'}</p>
        <p className="bike-info-margin">{t('registeredBikes.serialNumber')}</p>
        <p className="fw-bolder">{bike?.serialNumber ? bike.serialNumber : '-'}</p>
        <p className="bike-info-margin">{t('registeredBikes.bikeYear')}</p>
        <p className="fw-bolder">{bike?.yearOfProduction ? bike.yearOfProduction : '-'}</p>
      </Col>
    </Row>
  );
};

export default BikeInfo;
