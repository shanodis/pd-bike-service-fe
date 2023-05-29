import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useFormikContext } from 'formik';
import TextInput from '../../../../components/Inputs/TextInput/TextInput';

const FiltersForm: React.FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, handleChange } = useFormikContext();

  return (
    <Form className="mb-2">
      <TextInput
        type="text"
        placeholder={t('userTable.searchPlaceholder')}
        name="phrase"
        className="search-form-style"
        onChange={(e) => {
          handleSubmit();
          handleChange(e);
        }}
      />
    </Form>
  );
};
export default FiltersForm;
