import { LoadingButton } from '@mui/lab';
import { useFetchConfigsMutation } from '../api/authApi';

function HomePage() {
  const [fetchConfigs, { isLoading: fetchingConfigs }] =
    useFetchConfigsMutation();

  const handleFetchConfigs = async () => {
    try {
      const configs = await fetchConfigs();
      console.log(configs);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <LoadingButton onClick={handleFetchConfigs} loading={fetchingConfigs}>
        Fetch
      </LoadingButton>
    </div>
  );
}

export default HomePage;
