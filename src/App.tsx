import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import HomePage from './features/HomePage';
import ResultsPage from './features/search/ResultsPage';
import MainLayout from './layout/MainLayout';
import LandingPage from './features/LandingPage';
import RegistrationPage from './features/auth/RegistrationPage';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import SearchPage from './features/search/SearchPage';
import AppSnackbar from './utils/AppSnackbar';

function App() {
  return (
    <Box
      sx={{
        display: 'block',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="home" element={<HomePage />} />
                  <Route path="search" element={<SearchPage />} />
                  <Route path="results" element={<ResultsPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
      <AppSnackbar />
    </Box>
  );
}

export default App;
