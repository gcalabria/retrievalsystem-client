import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RETRIEVALSYSTEM
          </Typography>
          <Box>
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="results" color="inherit">
              Results
            </Button>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
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
