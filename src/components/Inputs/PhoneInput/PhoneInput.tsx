import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { ErrorMessage, useField } from 'formik';
import { TelephonePrefixes } from '../../../consts/telephonePrefixes';
import InputLabel from '../InputLabel/InputLabel';
import NumberFormat from 'react-number-format';

interface PhoneInputProps {
  label: string;
  name: string;
  prefixName: string;
  required: boolean;
  readonly?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ label, prefixName, name, required, readonly }) => {
  const [field, meta, helpers] = useField(name);
  const [prefixField] = useField(prefixName);

  return (
    <>
      {!readonly ? (
        <Form.Group>
          <InputLabel label={label} required={required} />
          <InputGroup>
            <Form.Select className="phone-input" {...prefixField}>
              {TelephonePrefixes.map((prefix) => (
                <option key={prefix} value={prefix}>
                  {prefix}
                </option>
              ))}
            </Form.Select>
            <NumberFormat
              format="### ### ###"
              mask="_"
              isInvalid={!!(meta.touched && meta.error)}
              onValueChange={(values) => helpers.setValue(values.value)}
              {...field}
              onChange={() => undefined}
              customInput={Form.Control}
            />
            <ErrorMessage name={name}>
              {(err) => <Form.Control.Feedback type="invalid">{err}</Form.Control.Feedback>}
            </ErrorMessage>
          </InputGroup>
        </Form.Group>
      ) : (
        <>
          {label}
          <div className="w-100 p-1" />
          {prefixField.value}{' '}
          <NumberFormat format="### ### ###" value={field.value || '-'} displayType="text" />
        </>
      )}
    </>
  );
};

export default PhoneInput;
