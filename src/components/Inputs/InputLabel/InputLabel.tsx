import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';

interface InputLabelProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const InputLabel: FC<InputLabelProps> = ({ label, required, disabled, className }) => {
  const changeColorWhenDisabled = classNames(disabled && 'text-secondary-light', className);
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
