import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import './assets/scss/index.scss';
import { i18n } from './assets/i18next/i18n';
import UserContext from './contexts/UserContext';
import Views from './views/Views';
import { toastProps } from './consts/toastProps';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <UserContext>
      <BrowserRouter>
        <Views />
        <ToastContainer {...toastProps} />
      </BrowserRouter>
    </UserContext>
  </I18nextProvider>
);

export default App;
