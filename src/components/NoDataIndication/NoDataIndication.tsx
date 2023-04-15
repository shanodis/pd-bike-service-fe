import React from 'react';
import { Image } from "react-bootstrap";
import book from "../../assets/img/book.svg";

const NoDataIndication = ({ text }: { text: string }) => (
  <div className='mt-5'>
    <Image src={book} alt={text}/>
    <p className='fs-5 fw-normal mt-3'>{text}</p>
  </div>
);

export default NoDataIndication;
