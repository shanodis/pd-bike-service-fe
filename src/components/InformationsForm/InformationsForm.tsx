import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useFormikContext } from 'formik';
import { Col, Row, ToggleButtonGroup } from 'react-bootstrap';
import Axios from 'axios';
import NewBikeTextInputs from './NewBikeTextInputs/NewBikeTextInputs';
import TextInput from '../Inputs/TextInput/TextInput';
import SelectInput from '../Inputs/SelectInput/SelectInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import useRole from '../../hooks/useRole';
import { Roles } from '../../enums/Roles';
import { SelectOptionModel } from '../../interfaces/SelectOption/SelectOptionModel';
import { OrderRequest } from '../../interfaces/Order/OrderRequest';
import { formColProps } from '../../consts/formColProps';
import { useFetchData } from '../../hooks/useFetchData';
import AsyncSelectInput from '../Inputs/AsyncSelectInput/AsyncSelectInput';
import { showErrorResponses } from '../../utils/showErrorResponses';
import { getSelectFetchDataParams } from '../../utils/getSelectFetchDataParams';
import { CustomerListResponse } from '../../interfaces/Customer/CustomerListResponse';
import RadioButton from '../Inputs/RadioButton/RadioButton';

interface InformationsFormProps {
  readonly?: boolean;
}

const customerBikeMapper = (data: { content: SelectOptionModel[] }) =>
  data.content.map((item) => ({ id: item.id, name: item.name }));

const loadAsyncSelectOptions = async (phrase: string) => {
  try {
    const { data } = await Axios.get<{ content: CustomerListResponse[] }>('/users/customers/page', {
      params: {
        phrase,
        ...getSelectFetchDataParams('lastName')
      }
    });

    return data?.content.map((item) => {
      const connectedFullName = `${item.lastName} ${item.firstName}`;
      return {
        id: item.userId,
        name: [connectedFullName, item.phoneNumber].filter(Boolean).join(', ')
      };
    });
  } catch (e) {
    showErrorResponses(e);
    return [];
  }
};

const InformationsForm: FC<InformationsFormProps> = ({ readonly }) => {
  const { values, handleChange, setFieldValue } = useFormikContext<OrderRequest>();
  const { formChange, userId } = values || {};
  const { t } = useTranslation();
  const hasRole = useRole();

  const customerBikeParams = useMemo(
    () => ({
      ...getSelectFetchDataParams('bikeName'),
      userId: userId || ''
    }),
    [userId]
  );

  const [customerBikes] = useFetchData<SelectOptionModel[]>('/dictionaries/bikes', {
    dataMapper: customerBikeMapper,
    params: customerBikeParams
  });

  const radioBgChange = (currentFormChangeState: string) => {
    const checkedBackground = readonly ? 'secondary' : 'primary-lighter';
    return formChange === currentFormChangeState ? checkedBackground : 'outline-secondary';
  };

  const radioFontChange = (currentFormChangeState: string) =>
    formChange === currentFormChangeState
      ? 'fw-bold'
      : 'fw-normal bg-white text-secondary border-secondary-light';

  return (
    <Form>
      <Row>
        <Col {...formColProps}>
          <AsyncSelectInput
            valueName="userId"
            labelName="userName"
            label={t('servicePanel.customer')}
            placeholder={t('servicePanel.asyncSelectPlaceholder')}
            loadOptions={(load) => loadAsyncSelectOptions(load)}
            onChange={() => {
              setFieldValue('bikeId', '');
              setFieldValue('labelBikeName', '');
            }}
            readonly={readonly}
            required
          />
        </Col>
      </Row>

      <Row>
        <Col className="mt-4">
          <ToggleButtonGroup type="radio" name="formChange" defaultValue="customerBike">
            <RadioButton
              name="formChange"
              id="customerBikeFormRadio"
              value="customerBike"
              variant={radioBgChange('customerBike')}
              onChange={handleChange}
              disabled={readonly}
              className={radioFontChange('customerBike')}>
              {t('servicePanel.customerBikeRadio')}
            </RadioButton>

            <RadioButton
              name="formChange"
              id="newBikeFormRadio"
              value="newBike"
              variant={radioBgChange('newBike')}
              onChange={handleChange}
              disabled={readonly}
              className={radioFontChange('newBike')}>
              {t('servicePanel.newBikeRadio')}
            </RadioButton>
          </ToggleButtonGroup>
        </Col>
      </Row>

      {formChange === 'customerBike' ? (
        <Row>
          <Col {...formColProps} className="mt-4">
            {readonly && t('servicePanel.bikeName')}
            <SelectInput
              valueName="bikeId"
              labelName="labelBikeName"
              options={customerBikes || []}
              placeholder={t('servicePanel.selectPlaceholder')}
              readonly={readonly}
            />
          </Col>
        </Row>
      ) : (
        <NewBikeTextInputs />
      )}

      {!hasRole(Roles.Customer) && (
        <Row>
          <Col className="mt-4">
            <TextInput
              name="note"
              label={t('servicePanel.note')}
              as="textarea"
              rows={10}
              required
              maxLength={1000}
              readOnly={readonly}
            />
          </Col>
        </Row>
      )}

      <Row className="text-end">
        <Col className="mt-5">
          {!readonly && (
            <SubmitButton
              variant="success-lighter"
              type="submit"
              className="ms-3 text-white fw-bold">
              {t('servicePanel.nextStepButton')}
            </SubmitButton>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default InformationsForm;
