import { LoadingButton } from '@mui/lab';
import { useLazyFetchConfigsQuery } from '../redux/api/configsApi';
import { Box } from '@mui/material';

function HomePage() {
  const [
    fetchConfigs,
    { data: configs, isFetching, isLoading, isError, isSuccess },
  ] = useLazyFetchConfigsQuery();

  const handleFetchConfigs = () => {
    fetchConfigs();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
    </Box>
  );
}

export default HomePage;
