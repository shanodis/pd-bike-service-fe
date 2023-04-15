import { object, string, mixed } from 'yup';
import { i18n } from '../assets/i18next/i18n';

const AddClientFormValidation = {
  firstName: string().required(i18n.t('validation.required')),
  lastName: string().required(i18n.t('validation.required')),
  email: string().email(i18n.t('validation.wrongEmail')).required(i18n.t('validation.required')),
  phoneNumber: string()
    .required(i18n.t('validation.required'))
    .min(9, i18n.t('validation.wrongNumber')),
  note: string().nullable().max(1000, i18n.t('validation.tooManyCharacters'))
};

export const AddClientFormValidationSchema = object().shape({
  ...AddClientFormValidation
});

export const AddEmployeeFormValidationSchema = object().shape({
  ...AddClientFormValidation
});

export const AddClientFormWithInvoiceFormValidationSchema = object().shape({
  ...AddClientFormValidation,

  companyName: string().when('addInvoice', {
    is: true,
    then: () => string().required(i18n.t('validation.required'))
  }),
  taxNumber: string().when('addInvoice', {
    is: true,
    then: () => string().required(i18n.t('validation.required'))
  }),
  postCode: string().when('addInvoice', {
    is: true,
    then: () => string().required(i18n.t('validation.required'))
  }),
  city: string().when('addInvoice', {
    is: true,
    then: () => string().required(i18n.t('validation.required'))
  }),
  streetName: string().when('addInvoice', {
    is: true,
    then: () => string().required(i18n.t('validation.required'))
  })
});

export const AddOrderInformationsValidationSchema = object().shape({
  bikeName: string().when('formChange', {
    is: 'newBike',
    then: () => string().required(i18n.t('validation.required'))
  }),
  bikeId: string().when('formChange', {
    is: 'customerBike',
    then: () => string().required(i18n.t('validation.selectChoose'))
  }),
  note: string().required(i18n.t('validation.required')),
  userId: string().required(i18n.t('validation.required'))
});

export const ChangeProfilePictureValidationSchema = object().shape({
  picture: mixed()
    .test('required', i18n.t('validation.fileRequired'), (value: any) => value)
    .test('fileType', i18n.t('validation.fileTypeInvalid'), (value: any) => {
      const validTypes = ['image/jpeg', 'image/gif', 'image/png'];
      return value && validTypes.includes(value.type);
    })
    .test('fileSize', i18n.t('validation.fileTooBig'), (value: any) => {
      const fileSize = value && value.size / 1024;
      return fileSize <= 800;
    })
});

export const EditBikeValidationSchema = object().shape({
  bikeName: string().required(i18n.t('validation.required'))
});
