import { LoadingButton } from '@mui/lab';
import { useLazyFetchConfigsQuery } from '../redux/api/configsApi';
import { Box } from '@mui/material';
import { useRefreshTokensMutation } from '../redux/api/authApi';
import {
  selectCurrentToken,
  selectCurrentUser,
} from '../redux/slices/authSlice';
import { showSnackbar } from '../redux/slices/snackbarSlice';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
  const [
    fetchConfigs,
    { data: configs, isFetching, isLoading, isError, isSuccess },
  ] = useLazyFetchConfigsQuery();

  const [refresh] = useRefreshTokensMutation();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleFetchConfigs = () => {
    fetchConfigs();
  };

  const handleRefreshTokens = async () => {
    if (token) {
      try {
        await refresh(token);
        dispatch(showSnackbar({ text: 'Tokens refreshed', type: 'success' }));
      } catch (error) {
        dispatch(
          showSnackbar({ text: 'Error refreshing tokens', type: 'error' }),
        );
      }
    } else {
      dispatch(showSnackbar({ text: 'No token found', type: 'error' }));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        Welcome to your page, {user?.email}. Your id is: {user?.id}
      </Box>

      <LoadingButton onClick={handleFetchConfigs} loading={isLoading}>
        Fetch
      </LoadingButton>

      <Box>
        <p>isFetching: {isFetching}</p>
        <p>isLoading: {isLoading}</p>
        <p>isError: {isError}</p>
        <p>isSuccess: {isSuccess}</p>
      </Box>
      {configs && (
        <Box>
          <p>db_path: {configs.db_path}</p>
          <p>db_content_attribute_name: {configs.db_content_attribute_name}</p>
          <p>db_table_name: {configs.db_table_name}</p>
          <p>
            allowed_search_modes: {JSON.stringify(configs.allowed_search_modes)}
          </p>
        </Box>
      )}

      <LoadingButton onClick={handleRefreshTokens}>RefreshTokens</LoadingButton>
    </Box>
  );
}

export default HomePage;
