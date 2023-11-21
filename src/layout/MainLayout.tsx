import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

function MainLayout() {
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
