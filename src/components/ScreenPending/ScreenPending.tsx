import React from 'react';
import { Spinner } from 'react-bootstrap';

const ScreenPending = () => (
  <div className='d-flex justify-content-center align-items-center vh-100 vw-100'>
    <Spinner
      animation='border'
      role='status'
      variant='primary'
      className='pending-spinner'
    />
  </div>
);

export default ScreenPending;
