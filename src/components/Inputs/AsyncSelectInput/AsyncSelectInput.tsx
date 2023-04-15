import React, { useState } from 'react';
import Select from 'react-select/async';
import { useTranslation } from "react-i18next";
import { ErrorMessage, useField } from 'formik';
import { Form, Image } from 'react-bootstrap';
import { components } from 'react-select';
import dropdownIndicator from '../../../assets/img/dropdownIndicator.svg';
import InputLabel from '../InputLabel/InputLabel';
import ReadonlyField from '../ReadonlyField/ReadonlyField';
import { SelectOptionModel } from "../../../interfaces/SelectOption/SelectOptionModel";

interface AsyncSelectInputProps {
  valueName: string;
  labelName: string;
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  loadOptions?: ((
    inputValue: string,
    callback: (options: ReadonlyArray<{ id: string; name: string; }>) => void,
  ) => Promise<ReadonlyArray<{ id: string; name: string; }>> | void) | undefined;
  isDisabled?: boolean;
  onChange?: (option: SelectOptionModel | null) => void;
  readonly?: boolean;
}

const AsyncSelectInput: React.FC<AsyncSelectInputProps> = ({
  valueName,
  labelName,
  label,
  placeholder,
  loadOptions,
  required,
  isDisabled,
  onChange,
  readonly,
  defaultValue,
}) => {
  const [field, meta, helpers] = useField(valueName);
  const [labelField, , labelHelpers] = useField(labelName);
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation()
  // TODO: move to separate component in this folder
  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <Image src={dropdownIndicator} />
    </components.DropdownIndicator>
  );

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption.id);
    labelHelpers.setValue(selectedOption.name);
    helpers.setTouched(false)
  };
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: meta.touched && meta.error ? '1px solid #dc3545!important' : null,
    }),
    menu: (provided: any) => ({
      ...provided,
      display: inputValue === '' ? 'none' : 'block',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      display: meta.touched && meta.error ? 'block' : 'none',
    }),
  };

  return (
    <>
      {!readonly ? (
        <Form.Group>
          <InputLabel
            label={label}
            required={required}
          />
          <Select
            getOptionLabel={(option) => (option.name)}
            getOptionValue={(option) => (option.id)}
            isDisabled={isDisabled}
            defaultValue={defaultValue}
            components={{ DropdownIndicator }}
            value={field.value || labelField.value ? { id: field.value, name: labelField.value } : null}
            classNamePrefix='rs'
            name={field.name}
            placeholder={placeholder}
            className='rs__value-container'
            styles={customStyles}
            loadOptions={loadOptions}
            onChange={(option) => {
              handleChange(option);
              onChange?.(option as SelectOptionModel);
            }}
            onInputChange={setInputValue}
            onBlur={() => {
              helpers.setTouched(true);
            }}
            noOptionsMessage={()=>t('select.noOptionsMessage')}
          />
          <ErrorMessage name={field.name}>{(err) =>
            <div className='mt-1 text-danger' style={{ fontSize: '14px' }}>
              {err}
            </div>}
          </ErrorMessage>
        </Form.Group>
      ) : (
        <ReadonlyField
          value={labelField.value}
          label={label}
        />
      )}
    </>
  );
};

export default AsyncSelectInput;
