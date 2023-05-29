import React, { FC } from 'react';
import { useInitAxios } from '../hooks/useInitAxios';
import { useCurrentUser } from '../contexts/UserContext';
import ScreenPending from '../components/ScreenPending/ScreenPending';
import UnauthorisedViews from './UnauthorisedViews/UnauthorisedViews';
import AuthorisedViews from './AuthorisedViews/AuthorisedViews';
import ErrorOverlay from '../components/ErrorOverlay/ErrorOverlay';

const Views: FC = () => {
  const errorCode = useInitAxios();
  const { isPending, currentUser } = useCurrentUser();

  if (isPending) {
    return <ScreenPending />;
  }

  if (errorCode) {
    return <ErrorOverlay errorCode={errorCode} />;
  }

  if (currentUser) {
    return <AuthorisedViews />;
  }

  return <UnauthorisedViews />;
};

export default Views;
