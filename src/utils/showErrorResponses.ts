import { toast } from 'react-toastify';
import { i18n } from "../assets/i18next/i18n";

export const showErrorResponses = (e: any) => {
  const responseMessage = e?.response?.data?.message;
  const defaultErrorMessage = responseMessage === 'No message available' && i18n.t('contextErrors.error');
  toast.error(defaultErrorMessage || responseMessage);
};
