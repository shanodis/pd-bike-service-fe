import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, ColProps, Row } from 'react-bootstrap';
import TextInput from '../../Inputs/TextInput/TextInput';
import SelectInput from '../../Inputs/SelectInput/SelectInput';
import { CountryResponse } from "../../../interfaces/Countries/CountryResponse";
import { useFetchData } from "../../../hooks/useFetchData";
import { SelectOptionModel } from "../../../interfaces/SelectOption/SelectOptionModel";
import { formColProps } from "../../../consts/formColProps";
import { getSelectFetchDataParams } from "../../../utils/getSelectFetchDataParams";
import { i18n } from "../../../assets/i18next/i18n";

export interface InvoiceFormProps {
  readonlyMode?: boolean;
  customFormColProps?: ColProps;
}

const countryTranslations = [
  i18n.t('addNewCustomer.countryEngland'),
  i18n.t('addNewCustomer.countryPoland'),
  i18n.t('addNewCustomer.countryZSRR'),
];

const countryMapper = (data: { content: CountryResponse[] }) =>
  data.content.map((item, index) => ({ id: item.countryId, name: countryTranslations[index] }));

const InvoiceForm: FC<InvoiceFormProps> = ({ readonlyMode, customFormColProps }) => {
  const params = useMemo(() => ({ ...getSelectFetchDataParams('countryName') }), []);

  const [countries] = useFetchData<SelectOptionModel[]>(
    '/dictionaries/countries',
    { dataMapper: countryMapper, params },
  );

  const { t } = useTranslation();

  return (
    <>
      <Row as='section'>
        <Col
          {...formColProps}
          {...customFormColProps}
          className='mt-4'
        >
          <TextInput
            name='companyName'
            type='text'
            label={t('addNewCustomer.companyName')}
            readOnly={readonlyMode}
            required
          />
        </Col>
      </Row>

      <Row as='section'>
        <Col
          {...formColProps}
          {...customFormColProps}
          className='mt-4'
        >
          <TextInput
            name='taxNumber'
            type='text'
            label={t('addNewCustomer.taxNumber')}
            readOnly={readonlyMode}
            required
          />
        </Col>
      </Row>

      <Row as='section'>
        <Col
          {...formColProps}
          {...customFormColProps}
          className='mt-4'
        >
          <SelectInput
            valueName='countryId'
            labelName='countryName'
            options={countries || []}
            label={t('addNewCustomer.country')}
            readonly={readonlyMode}
          />
        </Col>
      </Row>

      <Row as='section'>
        <Col
          {...formColProps}
          {...customFormColProps}
          className='mt-4'
        >
          <TextInput
            name='postCode'
            type='text'
            label={t('addNewCustomer.postCode')}
            readOnly={readonlyMode}
            required
          />
        </Col>
      </Row>

      <Row as='section'>
        <Col
          {...formColProps}
          className='mt-4'
        >
          <TextInput
            name='city'
            type='text'
            label={t('addNewCustomer.city')}
            readOnly={readonlyMode}
            required
          />
        </Col>
      </Row>

      <Row as='section'>
        <Col
          {...formColProps}
          className='mt-4'
        >
          <TextInput
            name='streetName'
            type='text'
            label={t('addNewCustomer.streetName')}
            readOnly={readonlyMode}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InvoiceForm;
