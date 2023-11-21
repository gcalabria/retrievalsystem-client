import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function LandingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 8,
      }}
    >
      <Typography sx={{ mb: 8 }} variant="h2">
        RETRIEVALSYSTEM
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Button variant="outlined" component={RouterLink} to="/login">
          Login
        </Button>
        <Button variant="outlined" component={RouterLink} to="/register">
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage;
