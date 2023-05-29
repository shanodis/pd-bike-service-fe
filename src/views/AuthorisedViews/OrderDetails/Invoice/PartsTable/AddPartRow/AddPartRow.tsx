import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import TextInput from '../../../../../../components/Inputs/TextInput/TextInput';
import { addRowColProps } from '../../../../../../consts/addRowColProps';
import SubmitButton from '../../../../../../components/SubmitButton/SubmitButton';

interface AddPartRowInterface {
  onCancel?: () => void;
}

const AddPartRow: React.FC<AddPartRowInterface> = ({ onCancel }) => (
  <Row className="mt-1">
    <Col {...addRowColProps}>
      <TextInput name="orderCode" type="string" />
    </Col>
    <Col {...addRowColProps}>
      <TextInput name="orderName" type="text" />
    </Col>
    <Col {...addRowColProps}>
      <TextInput name="orderPrice" type="number" />
    </Col>
    <Col className="buttonWrapper" md={3} sm={12}>
      <SubmitButton
        hideChildrenOnLoad
        variant="success"
        className="rounded-circle btn-circle"
        type="submit">
        <CheckLg />
      </SubmitButton>
      <Button variant="danger" className="rounded-circle btn-circle " onClick={onCancel}>
        <XLg />
      </Button>
    </Col>
  </Row>
);

export default AddPartRow;
