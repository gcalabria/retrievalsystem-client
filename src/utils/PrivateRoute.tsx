import { useLocation, Navigate } from 'react-router-dom';
import { userApi } from '../redux/api/userApi';
import FullScreenLoader from '../layout/FullScreenLoader';

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
    return <FullScreenLoader />;
  }

  if (user) {
    return children;
  }

  const url = location.pathname + location.search + location.hash;
  return <Navigate to="/login" state={{ next: url }} />;
}
