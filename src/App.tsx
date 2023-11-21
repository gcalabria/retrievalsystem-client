import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { PrivateOutlet } from './utils/PrivateOutlet';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import MainLayout from './layout/MainLayout';

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PrivateOutlet />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="results" element={<ResultsPage />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
