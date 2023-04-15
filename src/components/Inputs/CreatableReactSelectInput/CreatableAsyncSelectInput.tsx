import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { ErrorMessage, useField } from 'formik';
import { Form } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import ReadonlyField from '../ReadonlyField/ReadonlyField';
import { SelectOptionModel } from "../../../interfaces/SelectOption/SelectOptionModel";

interface AsyncSelectInput {
  valueName: string,
  labelName: string,
  label?: string
  placeholder?: string
  required?: boolean
  loadOptions?: ((
    inputValue: string,
    callback: (options: ReadonlyArray<SelectOptionModel>) => void,
  ) => Promise<ReadonlyArray<SelectOptionModel>> | void) | undefined;
  isDisabled?: boolean;
  onChange?: (option: SelectOptionModel | null) => void
  readonly?: boolean;
}

const CreatableAsyncSelectInput: React.FC<AsyncSelectInput> = ({
                                                                 valueName,
                                                                 labelName,
                                                                 label,
                                                                 placeholder = '',
                                                                 loadOptions, required,
                                                                 isDisabled,
                                                                 onChange,
                                                                 readonly,
                                                               }) => {
  const [field, , helpers] = useField(valueName);
  const [labelField, meta, labelHelpers] = useField(labelName);
  const { t } = useTranslation()

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption.id);
    labelHelpers.setValue(selectedOption.name);
    labelHelpers.setTouched(false)
  };
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: meta.touched && meta.error ? '1px solid #dc3545!important' : null,
    }),
    menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
  };
  return (
    <>
      {!readonly ? (
        <Form.Group>
          {label &&
          <Form.Label>
            {label}
            {required && <span className='text-danger'>*</span>}
          </Form.Label>}
          <AsyncCreatableSelect
            isDisabled={isDisabled}
            getOptionLabel={(option) => (option.name)}
            getOptionValue={(option) => (option.id)}
            getNewOptionData={(newLabel, optionLabel) => ({ id: '', name: optionLabel })}
            onCreateOption={(inputValue) => handleChange({ id: '', name: `${inputValue}` })}
            formatCreateLabel={(x) => `${t('select.create')} "${x}"`}
            loadingMessage={()=>t('select.loading')}
            name={field.name}
            loadOptions={loadOptions}
            value={field.value || labelField.value ? { id: field.value, name: labelField.value } : null}
            classNamePrefix='crs'
            styles={customStyles}
            placeholder={placeholder}
            defaultOptions={true}
            onChange={(option) => {
              handleChange(option);
              onChange?.(option as SelectOptionModel);
            }}
            onBlur={() => {
              labelHelpers.setTouched(true)
            }}
            maxMenuHeight={170}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#F8D7DA',
                primary: '#F8D7DA',
              },
            })}
          />
          <ErrorMessage name={labelField.name}>{(err) =>
            <div className='mt-1 text-danger' style={{ fontSize: '0.875em' }}>
              {(err)}
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

export default CreatableAsyncSelectInput;
