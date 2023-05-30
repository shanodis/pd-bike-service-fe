import { ToastOptions } from 'react-toastify';

export const toastProps: ToastOptions & { limit: number } = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  limit: 1
};
