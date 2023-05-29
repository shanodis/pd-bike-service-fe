import React, { FC, HTMLAttributes } from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { Col, Collapse, ColProps, Row } from 'react-bootstrap';
import TextInput from '../Inputs/TextInput/TextInput';
import PhoneInput from '../Inputs/PhoneInput/PhoneInput';
import InvoiceForm from './InvoiceForm/InvoiceForm';
import MoreInformation from './MoreInformation/MoreInformation';
import Email from './Email/Email';
import { formColProps } from '../../consts/formColProps';
import Checkbox from '../Inputs/Checkbox/Checkbox';
import { CustomerRequest } from '../../interfaces/Customer/CustomerRequest';

interface AddClientFormProps extends HTMLAttributes<any> {
  hideMailInput?: boolean;
  hideNoteInput?: boolean;
  hideCheckboxInput?: boolean;
  readonlyMode?: boolean;
  disableMailInput?: boolean;
  hideInvoice?: boolean;
  customFormColProps?: ColProps;
}

const UserForm: FC<AddClientFormProps> = ({
  hideMailInput,
  hideInvoice,
  readonlyMode,
  hideNoteInput,
  disableMailInput,
  customFormColProps,
  hideCheckboxInput
}) => {
  const { t } = useTranslation();
  const { values, handleChange } = useFormikContext<CustomerRequest>();

  return (
    <>
      <Row>
        <Col {...formColProps} {...customFormColProps}>
          <TextInput
            name="firstName"
            type="text"
            label={t('addNewCustomer.firstName')}
            required
            readOnly={readonlyMode}
          />
        </Col>
      </Row>

      <Row>
        <Col {...formColProps} {...customFormColProps} className="mt-4">
          <TextInput
            name="lastName"
            type="text"
            label={t('addNewCustomer.lastName')}
            required
            readOnly={readonlyMode}
          />
        </Col>
      </Row>

      {!hideMailInput && (
        <Email
          customFormColProps={customFormColProps}
          disabled={disableMailInput}
          readonlyMode={readonlyMode}
        />
      )}

      <Row>
        <Col {...formColProps} {...customFormColProps} className="mt-4">
          <PhoneInput
            name="phoneNumber"
            prefixName="phoneNumberPrefix"
            label={t('addNewCustomer.phoneNumber')}
            required
            readonly={readonlyMode}
          />
        </Col>
      </Row>

      <Row>
        {!hideCheckboxInput && (
          <Col className="mt-4">
            <Checkbox
              name="addInvoice"
              label={t('customerDetails.withInvoiceCheckbox')}
              disabled={readonlyMode}
              onChange={handleChange}
              id="invoice-checkbox"
            />
          </Col>
        )}
        <Collapse in={values.addInvoice}>
          <div className="py-0">{!hideInvoice && <InvoiceForm readonlyMode={readonlyMode} />}</div>
        </Collapse>
      </Row>

      {!hideNoteInput && <MoreInformation readonlyMode={readonlyMode} />}
    </>
  );
};

export default UserForm;
