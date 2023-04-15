import * as Yup from 'yup';
import { i18n } from '../../../../assets/i18next/i18n';

export const signInValidationSchema = Yup.object({
  username: Yup.string()
    .required(i18n.t('validation.required'))
    .email(i18n.t('validation.wrongEmail')),
  password: Yup.string()
    .required(i18n.t('validation.required'))
    .min(8, i18n.t('validation.minPassword'))
});
