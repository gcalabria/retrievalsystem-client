import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSignOutMutation } from '../redux/api/authApi';
import { LoadingButton } from '@mui/lab';
import QueryTemplatesDialog from '../features/query_templates/QueryTemplatesDialog';

function MainLayout() {
  const navigate = useNavigate();
  const [signOut, { isLoading }] = useSignOutMutation();

  const handleLogout = async () => {
    signOut();
    navigate('/');
  };

  return (
    <>
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        sx={{ bgcolor: 'background.paper' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RETRIEVALSYSTEM
          </Typography>
          <Box sx={{ mx: 2 }}>
            <Button component={RouterLink} to="/home">
              Home
            </Button>
            <Button component={RouterLink} to="results">
              Results
            </Button>
            <Button component={RouterLink} to="search">
              Search
            </Button>
          </Box>
          <QueryTemplatesDialog />
          <Box sx={{ mx: 2 }}>
            <LoadingButton onClick={handleLogout} loading={isLoading}>
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
