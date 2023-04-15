import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CurrentUserResponse } from "../interfaces/CurrentUser/CurrentUserResponse";
// @ts-ignore
import profilePlaceholder from '../assets/img/person-circle.svg';
import { TokenModel } from '../interfaces/Token/TokenModel';
import { getSearchParams } from "../utils/getSearchParams";
import { showErrorResponses } from "../utils/showErrorResponses";

interface UserContextInterface {
  currentUser?: CurrentUserResponse;
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
  fetchUserData: () => Promise<void>
  fetchPicture: () => Promise<void>
  onLogOut: () => Promise<void>
  onClearUser: () => void;
  userPhoto: string;
}

const UserContext = createContext<UserContextInterface | undefined>( undefined );

export const useCurrentUser = () => useContext( UserContext )!

interface PropsInterface {
  children: ReactNode;
}

const CurrentUser: FC<PropsInterface> = ( { children } ) => {
  const [ currentUser, setCurrentUser ] = useState<CurrentUserResponse>();
  const [ userPhoto, setUserPhoto ] = useState<string>( '' );
  const [ isPending, setIsPending ] = useState( false );
  const { t } = useTranslation();

  const onClearUser = () => setCurrentUser( undefined );

  const fetchUserData = useCallback( async () => {
    const {
      accessToken: OAuth2AccessToken,
      refreshToken: OAuth2RefreshToken,
    } = getSearchParams<{ accessToken: string, refreshToken: string }>();

    if ( OAuth2AccessToken && OAuth2RefreshToken ) {
      localStorage.setItem( 'JWT_USER_TOKEN', OAuth2AccessToken );
      localStorage.setItem( "JWT_REFRESH_TOKEN", OAuth2RefreshToken );
      Axios.defaults.headers.common.Authorization = OAuth2AccessToken;
      Axios.defaults.headers[ 'authorization-refresh' ] = OAuth2RefreshToken;
    }

    setIsPending( true );

    const token = localStorage.getItem( 'JWT_USER_TOKEN' );
    if ( !token ) {
      setIsPending( false )
      return;
    }

    const { userId }: TokenModel = jwtDecode( token );

    try {
      const { data } = await Axios.get<CurrentUserResponse>( `/users/${ userId }` );
      setCurrentUser( data );
      setIsPending( false )
    } catch ( e ) {
      showErrorResponses( e );
    } finally {
      setIsPending( false )
    }
  }, [] );

  const fetchPicture = useCallback( async () => {
    const userId = currentUser?.userId || '';
    try {
      if ( userId ) {
        const { data } = await Axios.get<string>( `/users/${ userId }/avatar` );

        if ( data === "" )
          setUserPhoto( profilePlaceholder );
        else
          setUserPhoto( data );
      }
    } catch ( e ) {
      setUserPhoto( profilePlaceholder );
    }
  }, [ currentUser?.userId ] );

  useEffect( () => {
    fetchPicture().catch();
    fetchUserData().catch();
  }, [ fetchUserData, fetchPicture ] );

  const onLogOut = async () => {
    localStorage.removeItem( 'JWT_USER_TOKEN' );
    localStorage.removeItem( 'JWT_REFRESH_TOKEN' );
    setCurrentUser( undefined );
    delete Axios.defaults.headers.common.Authorization;
    toast.info( t( "signIn.signOut" ) )
    await fetchUserData();
  }

  const contextData = {
    currentUser,
    userPhoto,
    isPending,
    setIsPending,
    fetchUserData,
    fetchPicture,
    onLogOut,
    onClearUser,
  };

  return (
    <UserContext.Provider value={ contextData }>
      { children }
    </UserContext.Provider>
  );
}

export default CurrentUser;