import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

interface InputLabelProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputLabel: FC<InputLabelProps> = ({ label, required, disabled }) => {
  const changeColorWhenDisabled = disabled ? 'text-secondary-light' : '';
  return (
    <>
      {label && (
        <div className={changeColorWhenDisabled}>
          <Form.Label>{label}</Form.Label>
          {required && !disabled && <span>*</span>}
        </div>
      )}
    </>
  );
};

export default InputLabel;