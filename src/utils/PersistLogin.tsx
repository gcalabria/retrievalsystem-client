/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import usePersist from '../hooks/usePersist';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useRefreshTokensMutation } from '../redux/api/authApi';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/slices/authSlice';

export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false); // for react 18 strict mode

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshTokensMutation();

  useEffect(() => {
    // The following code is to handle react 18 Strict Mode
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh(localStorage.getItem('accessToken')!);
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log('no persist');
    return <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log('loading');
    content = <CircularProgress />;
  } else if (isError) {
    //persist: yes, token: no
    content = (
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          p: 4,
          textAlign: 'center',
          width: 400, // TODO: check if there a better way of defining the width
        }}
        elevation={3}
      >
        <Typography variant="h3" component="h3">
          Oops! Something went wrong
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body1" component="p">
            Try logging in again.
          </Typography>
        </Box>
      </Paper>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log('success');
    return <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    return <Outlet />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {content}
    </Box>
  );
}
