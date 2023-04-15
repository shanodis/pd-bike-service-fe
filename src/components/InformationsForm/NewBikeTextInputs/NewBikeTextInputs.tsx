import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, ColProps, Row } from 'react-bootstrap';
import TextInput from '../../Inputs/TextInput/TextInput';
import SelectInput from '../../Inputs/SelectInput/SelectInput';
import { formColProps } from "../../../consts/formColProps";

interface NewBikeTextInputsProps {
  customColProps?: ColProps;
}

const generateYearsOfProduction = (startDate: number) => {
  const currentYear = new Date().getFullYear();
  const size = currentYear - startDate + 1;
  const options = Array(size).fill(null);

  return options.map((value, index) => (
    { id: (startDate + index).toString(), name: String(startDate + index) }
  ));
};

const NewBikeTextInputs: FC<NewBikeTextInputsProps> = ({ customColProps }) => {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col
          className={`${!customColProps && 'mt-4'}`}
          {...formColProps}
          {...customColProps}
        >
          <TextInput
            name='bikeName'
            label={t('servicePanel.bikeName')}
            type='text'
            required
          />
        </Col>
      </Row>

      <Row>
        <Col
          className='mt-4'
          {...formColProps}
          {...customColProps}
        >
          <TextInput
            name='bikeMake'
            label={t('servicePanel.bikeMake')}
            type='text'
          />
        </Col>
      </Row>

      <Row>
        <Col
          className='mt-4'
          {...formColProps}
          {...customColProps}
        >
          <TextInput
            name='bikeModel'
            label={t('servicePanel.bikeModel')}
            type='text'
          />
        </Col>
      </Row>

      <Row>
        <Col
          className='mt-4'
          {...formColProps}
          {...customColProps}
        >
          <TextInput
            name='serialNumber'
            label={t('editBike.serialNumber')}
            type='text'
          />
        </Col>
      </Row>

      <Row>
        <Col
          className='mt-4'
          {...formColProps}
          {...customColProps}
        >
          <SelectInput
            label={t('editBike.yearOfProduction')}
            valueName='yearOfProduction'
            labelName='labelYearOfProduction'
            placeholder={t('select.select')}
            options={generateYearsOfProduction(1995)}
          />
        </Col>
      </Row>
    </>
  );
}

export default NewBikeTextInputs;
