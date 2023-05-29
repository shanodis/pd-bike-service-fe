import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import Axios from 'axios';
import { useFormikContext } from 'formik';
import { showErrorResponses } from '../../../../../../utils/showErrorResponses';
import { addRowColProps } from '../../../../../../consts/addRowColProps';
import TextInput from '../../../../../../components/Inputs/TextInput/TextInput';
import SubmitButton from '../../../../../../components/SubmitButton/SubmitButton';
import CreatableAsyncSelectInput from '../../../../../../components/Inputs/CreatableReactSelectInput/CreatableAsyncSelectInput';
import { ServiceResponse } from '../../../../../../interfaces/Service/ServiceResponse';
import { getSelectFetchDataParams } from '../../../../../../utils/getSelectFetchDataParams';

interface AddServiceRowInterface {
  onCancel?: () => void;
}

const loadOptions = async (inputValue: string) => {
  const config = {
    params: {
      ...getSelectFetchDataParams('serviceName'),
      phrase: inputValue
    }
  };

  try {
    const { data } = await Axios.get<{ content: ServiceResponse[] }>(
      '/dictionaries/services',
      config
    );
    return data.content.map((item) => ({ ...item, id: item.serviceId, name: item.serviceName }));
  } catch (e) {
    showErrorResponses(e);
    return [];
  }
};

const AddServiceRow: React.FC<AddServiceRowInterface> = ({ onCancel }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <Row className="mt-1">
      <Col {...addRowColProps} md={6}>
        <CreatableAsyncSelectInput
          onChange={(e) => setFieldValue('orderPrice', e?.servicePrice)}
          loadOptions={loadOptions}
          valueName="serviceName"
          labelName="serviceLabel"
        />
      </Col>
      <Col {...addRowColProps}>
        <TextInput name="orderPrice" type="number" />
      </Col>
      <Col className="buttonWrapper">
        <SubmitButton
          hideChildrenOnLoad
          variant="success"
          className="btn-circle rounded-circle"
          type="submit">
          <CheckLg />
        </SubmitButton>
        <Button variant="danger" className="btn-circle rounded-circle" onClick={onCancel}>
          <XLg />
        </Button>
      </Col>
    </Row>
  );
};

export default AddServiceRow;
