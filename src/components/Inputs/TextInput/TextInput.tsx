import React, { FC } from 'react';
import { ErrorMessage, useField } from 'formik';
import { Form, FormControlProps } from 'react-bootstrap';
import InputLabel from '../InputLabel/InputLabel';
import ReadonlyField from '../ReadonlyField/ReadonlyField';

interface TextInputProps extends FormControlProps {
  name: string;
  label?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  onChange?: (e: any) => void;
  readOnly?: boolean;
  disabled?: boolean;
}

const TextInput: FC<TextInputProps> = ({ label, disabled, required, onChange, readOnly, ...props }) => {
  const [field, meta] = useField(props.name);

  const handleChange = (e: any) => {
    onChange?.(e);
    field.onChange(e);
  };

  const changeColorWhenDisabled = disabled ? 'border-secondary-light text-secondary-light' : null;

  return (
    <>
      {!readOnly ? (
        <Form.Group controlId={field.name}>
          <InputLabel
            label={label}
            required={required}
            disabled={disabled}
          />

          <Form.Control
            {...field}
            {...props}
            children={undefined}
            disabled={disabled}
            className={`bg-white ${changeColorWhenDisabled}`}
            onChange={handleChange}
            isInvalid={!!(meta.touched && meta.error)}
            autoComplete='off'
          />

          <ErrorMessage name={field.name}>
            {(errorMessage) =>
              <Form.Control.Feedback type='invalid'>
                {errorMessage}
              </Form.Control.Feedback>}
          </ErrorMessage>
        </Form.Group>
      ) : (
        <ReadonlyField
          value={field.value}
          label={label}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default TextInput;
