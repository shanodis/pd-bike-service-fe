import * as Yup from 'yup';
import { i18n } from '../../../../../assets/i18next/i18n';

export const partsTableValidation = Yup.object({
  orderCode: Yup.string().matches(/^[0-9]*$/, i18n.t('validation.mustBeNumber')),
  orderName: Yup.string().required(i18n.t('validation.required')),
  orderPrice: Yup.number()
    .required(i18n.t('validation.required'))
    .min(0, i18n.t('validation.mustBePositive'))
});
