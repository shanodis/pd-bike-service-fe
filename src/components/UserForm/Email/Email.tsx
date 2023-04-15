import React, { FC } from 'react';
import { Col, ColProps, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TextInput from '../../Inputs/TextInput/TextInput';
import { formColProps } from '../../../consts/formColProps';

interface EmailProps {
  readonlyMode?: boolean;
  disabled?: boolean;
  customFormColProps?: ColProps;
}

const Email: FC<EmailProps> = ({ readonlyMode, disabled, customFormColProps }) => {
  const { t } = useTranslation();
  return (
    <Row as="section">
      <Col {...formColProps} {...customFormColProps} className="mt-4">
        <TextInput
          name="email"
          type="email"
          label={t('addNewCustomer.email')}
          required
          readOnly={readonlyMode}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

export default Email;
