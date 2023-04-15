import React, { FC, useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import { Button, Form, FormControlProps, FormText, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

interface PasswordInputProps extends FormControlProps {
  label?: string;
  name: string;
  size?: 'sm' | 'lg';
  required?: boolean;
  formText?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ label, formText, required, type, ...props }) => {
  const [field, meta] = useField(props.name);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <Form.Group controlId={field.name}>
      {label && (
        <>
          <Form.Label>{label}</Form.Label>
          {required && <span className="text-danger">*</span>}
        </>
      )}
      <InputGroup>
        <Form.Control
          {...field}
          {...props}
          type={!isPasswordShown ? 'password' : 'text'}
          isInvalid={!!(meta.touched && meta.error)}
          autoComplete="off"
        />

        <Button
          variant="outline-secondary"
          onClick={() => setIsPasswordShown(!isPasswordShown)}
          className="rounded-end">
          {isPasswordShown ? <Eye /> : <EyeSlash />}
        </Button>

        {formText && <FormText>{formText}</FormText>}

        <ErrorMessage name={field.name}>
          {(errorMessage) => (
            <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
          )}
        </ErrorMessage>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInput;
