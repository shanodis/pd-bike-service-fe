import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center m-5">
    <Spinner animation="border" variant="primary" className="mt-5 " />
  </div>
);

export default LoadingSpinner;
