import React from 'react';
import { userApi } from '../redux/api/userApi';
// import { CircularProgress } from '@mui/material';

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;

  const { isLoading } = userApi.endpoints.fetchUser.useQuery(undefined, {
    skip: !isAuthenticated,
  });

  if (isLoading) {
    return <div>Middleware is fetching data</div>;
  }

  return children;
};

export default AuthMiddleware;
