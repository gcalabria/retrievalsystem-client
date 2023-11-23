import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from './UserProvider';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const user = useUser();

  if (user === undefined) {
    return null;
  } else if (user) {
    return children;
  } else {
    const url = location.pathname + location.search + location.hash;
    return <Navigate to="/login" state={{ next: url }} />;
  }
}
