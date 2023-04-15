import { ErrorMessage, useField, useFormikContext } from 'formik';
import React from 'react';
import { Form, FormSelectProps } from 'react-bootstrap';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import ReadonlyField from '../ReadonlyField/ReadonlyField';
import InputLabel from '../InputLabel/InputLabel';
import { SelectOptionModel } from '../../../interfaces/SelectOption/SelectOptionModel';

interface SelectInterface extends FormSelectProps {
  label?: string;
  valueName: string;
  labelName: string;
  options: SelectOptionModel[];
  disabled?: boolean;
  readonly?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: (e?: any) => void;
  setSubmit?: boolean;
}

const SelectInput: React.FC<SelectInterface> = ({
  readonly,
  onChange,
  disabled,
  valueName,
  labelName,
  label,
  options,
  placeholder,
  setSubmit = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(valueName);
  const [labelField, , labelHelpers] = useField(labelName);
  const { handleSubmit } = useFormikContext();
  const { t } = useTranslation();
  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption.id);
    labelHelpers.setValue(selectedOption.name);
    helpers.setTouched(false);
    onChange && onChange(selectedOption.id);
    setSubmit && handleSubmit();
  };
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: meta.touched && meta.error ? '1px solid #dc3545!important' : null
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      cursor: 'pointer'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      cursor: 'pointer'
    })
  };
  const findSavedOption = () => {
    const foundObject = options.find((value) => value.id === field.value);
    return foundObject?.name;
  };
  return (
    <>
      {!readonly ? (
        <Form.Group>
          <InputLabel label={label} />
          <Select
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            isDisabled={disabled}
            placeholder={placeholder}
            isSearchable={false}
            value={
              field.value || labelField.value ? { id: field?.value, name: labelField?.value } : null
            }
            classNamePrefix="rs"
            name={field.name}
            className="rs__value-container"
            styles={customStyles}
            onBlur={() => {
              helpers.setTouched(true);
            }}
            onChange={(option) => {
              handleChange(option);
            }}
            options={options}
            noOptionsMessage={() => t('select.noOptionsMessage')}
          />
          <ErrorMessage name={field.name}>
            {(err) => (
              <div className="mt-1 text-danger" style={{ fontSize: '14px' }}>
                {err}
              </div>
            )}
          </ErrorMessage>
        </Form.Group>
      ) : (
        <ReadonlyField value={findSavedOption()} label={label} />
      )}
    </>
  );
};

export default SelectInput;
