/// <reference types="vite-plugin-svgr/client" /> // For SVG imports

import { Box, Stack, Typography } from '@mui/material';
import SelmaLogo from '../../assets/SELMA-Logo_code.svg?react';
import { useTheme } from '@mui/material/styles';
import SearchForm from './SearchForm';

function SearchPage() {
  const theme = useTheme();
  const logoTheme = theme.palette.mode === 'light' ? 'dark-logo' : 'light-logo';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          mb: 6,
        }}
      >
        <SelmaLogo className={logoTheme} height="12rem" width="12rem" />
        <Typography
          variant="h2"
          sx={{
            color: 'text.primary',
            fontWeight: 800,
          }}
        >
          SELMA
        </Typography>
      </Stack>

      <SearchForm />
    </Box>
  );
}

export default SearchPage;
