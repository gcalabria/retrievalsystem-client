import { useLocation, Navigate } from 'react-router-dom';
import { userApi } from '../redux/api/userApi';
import { Box, CircularProgress } from '@mui/material';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.fetchUser.useQuery(
    undefined,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    },
  );

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.fetchUser.useQueryState(undefined, {
    selectFromResult: ({ data }) => data!,
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return children;
  }

  const url = location.pathname + location.search + location.hash;
  return <Navigate to="/login" state={{ next: url }} />;
}
