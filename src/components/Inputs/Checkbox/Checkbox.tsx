import React, { FC } from 'react';
import { Form, FormCheckProps } from 'react-bootstrap';
import { useField } from 'formik';
import InputLabel from '../InputLabel/InputLabel';

interface CheckboxProps extends FormCheckProps {
  name: string;
  label: string;
}

const Checkbox: FC<CheckboxProps> = ({ name, className, type = 'checkbox', ...props }) => {
  const [field, meta] = useField(name);
  console.log(field);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    props.onChange?.(e);
  };

  return (
    <Form.Group className={className}>
      <InputLabel required={props.required} label={props.label} className="mb-2" />
      <Form.Check
        {...field}
        {...props}
        type={type}
        checked={field.value}
        onChange={handleChange}
        label={field.value ? 'Yes' : 'No'}
        id={`${name}-checkbox`}
        className="ms-1"
        isInvalid={!!(meta.touched && meta.error)}
        autoComplete="off"
      />
    </Form.Group>
  );
};

export default Checkbox;
