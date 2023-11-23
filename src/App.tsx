import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import MainLayout from './layout/MainLayout';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import UserProvider from './utils/UserProvider';

function App() {
  return (
    <Box
      sx={{
        display: 'block',
        height: '100vh',
        width: '100vw',
      }}
    >
      <UserProvider>
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
                    <Route path="results" element={<ResultsPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Route>
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </Box>
  );
}

export default App;
