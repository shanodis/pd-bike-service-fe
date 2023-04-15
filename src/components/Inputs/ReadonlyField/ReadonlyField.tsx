import React, { FC, ReactNode } from 'react';

interface ReadonlyFieldProps {
  label?: string;
  value?: string | number;
  disabled?: boolean;
  children?: ReactNode;
}

const ReadonlyField: FC<ReadonlyFieldProps> = ({ value, label, disabled, children }) => {
  const textVariant = disabled ? 'text-secondary' : 'text-dark';
  return (
    <section style={{ width: '95%' }} className={`${textVariant} text-break`}>
      {label}
      <div className="w-100 p-1" />
      <span className="fw-bold">{children || `${value || '-'}`}</span>
    </section>
  );
};

export default ReadonlyField;
