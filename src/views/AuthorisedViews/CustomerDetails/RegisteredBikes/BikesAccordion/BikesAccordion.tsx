import React from 'react';
import { Accordion } from 'react-bootstrap';
import BikeInfo from './BikeInfo/BikeInfo';
import { useRegisteredBikes } from '../../../../../contexts/RegisteredBikesContext';

const BikesAccordion = () => {
  const { bikesInfo } = useRegisteredBikes();
  return (
    <Accordion defaultActiveKey="0">
      {bikesInfo?.map((bike, index) => (
        <Accordion.Item key={bike.bikeId} eventKey={String(index)}>
          <Accordion.Header>{bike.bikeName}</Accordion.Header>
          <Accordion.Body>
            <BikeInfo bike={bike} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default BikesAccordion;
