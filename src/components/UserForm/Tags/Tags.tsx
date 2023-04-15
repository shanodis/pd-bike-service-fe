import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, ColProps, Row } from 'react-bootstrap';
import TextInput from '../../Inputs/TextInput/TextInput';
import { formColProps } from "../../../consts/formColProps";

interface TagsProps {
  readonlyMode?: boolean;
  customFormColProps?: ColProps;
}

const Tags: FC<TagsProps> = ({ readonlyMode , customFormColProps }) => {
  const { t } = useTranslation();
  return (
    <Row as='section'>
      <Col
        {...formColProps}
        {...customFormColProps}
        className='mt-4'
      >
        <TextInput
          name='tags'
          type='text'
          label={t('addNewCustomer.tags')}
          readOnly={readonlyMode}
        />
      </Col>
    </Row>
  );
};

export default Tags;
