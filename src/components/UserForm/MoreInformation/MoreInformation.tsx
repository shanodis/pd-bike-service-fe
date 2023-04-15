import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import TextInput from '../../Inputs/TextInput/TextInput';

interface MoreInformationProps {
  readonlyMode?: boolean;
}

const MoreInformation: FC<MoreInformationProps> = ({ readonlyMode }) => {
  const { t } = useTranslation();
  return (
    <>
      <Row as='section'>
        <Col className='mt-4'>
          <TextInput
            name='note'
            type='text'
            label={t('addNewCustomer.moreInfo')}
            as='textarea'
            rows={10}
            readOnly={readonlyMode}
          />
        </Col>
      </Row>

      {!readonlyMode && (
        <Row>
          <Col className='mt-1'>
          <span className='text-secondary fst-italic'>
            {t('addNewCustomer.maxCharacters')}
          </span>
          </Col>
        </Row>
      )}
    </>
  );
};

export default MoreInformation;