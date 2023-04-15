import * as Yup from 'yup';
import { i18n } from '../../../../assets/i18next/i18n';

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t('validation.required')),
  lastName: Yup.string().required(i18n.t('validation.required')),
  email: Yup.string()
    .email(i18n.t('validation.wrongEmail'))
    .required(i18n.t('validation.required')),
  phoneNumber: Yup.string()
    .required(i18n.t('validation.required'))
    .min(9, i18n.t('validation.wrongNumber'))
});
