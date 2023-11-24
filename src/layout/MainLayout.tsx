import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSignOutMutation } from '../redux/api/authApi';
import { LoadingButton } from '@mui/lab';

function MainLayout() {
  const navigate = useNavigate();
  const [signOut, { isLoading }] = useSignOutMutation();

  const handleLogout = async () => {
    signOut();
    navigate('/');
  };

  return (
    <>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RETRIEVALSYSTEM
          </Typography>
          <Box>
            <Button component={RouterLink} to="/home" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="results" color="inherit">
              Results
            </Button>
            <Button component={RouterLink} to="search" color="inherit">
              Search
            </Button>
            <LoadingButton
              onClick={handleLogout}
              loading={isLoading}
              color="inherit"
            >
              Logout
            </LoadingButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 8,
        }}
        component="main"
      >
        <Outlet />
      </Box>
    </>
  );
}

export default MainLayout;
