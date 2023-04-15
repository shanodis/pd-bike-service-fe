import React, { FC } from 'react';
import { ToggleButton, ToggleButtonProps } from 'react-bootstrap';
import { useField } from 'formik';

interface RadioButtonProps extends ToggleButtonProps {
  name: string;
}

const RadioButton: FC<RadioButtonProps> = ({ children, ...props }) => {
  const [field] = useField(props.name);
  return (
    <ToggleButton {...field} {...props} style={{ opacity: 1 }}>
      {children}
    </ToggleButton>
  );
};

export default RadioButton;
