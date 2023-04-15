import React, { FC } from 'react';
import { FormCheck, FormCheckProps } from 'react-bootstrap';
import { useField } from 'formik';

const Checkbox: FC<FormCheckProps> = ({ ...props }) => {
  const [field] = useField(props.name!);
  return (
    <FormCheck
      {...props}
      type='checkbox'
      checked={field.value}
    >
      {props.label}
    </FormCheck>
  );
};

export default Checkbox;