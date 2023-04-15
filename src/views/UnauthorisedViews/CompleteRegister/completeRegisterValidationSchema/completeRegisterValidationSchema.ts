import * as Yup from 'yup';
import { i18n } from '../../../../assets/i18next/i18n';

export const completeRegisterValidationSchema = Yup.object({
  newPassword: Yup.string()
    .required(i18n.t('validation.required'))
    .min(8, i18n.t('validation.minPassword')),

  newPasswordConfirm: Yup.string()
    .required(i18n.t('validation.required'))
    .min(8, i18n.t('validation.minPassword'))
    .oneOf([Yup.ref('newPassword'), null as any], 'Passwords must match')
});
