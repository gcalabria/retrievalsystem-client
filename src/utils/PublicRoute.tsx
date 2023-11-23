import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/authSlice';

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector(selectCurrentUser);

  if (user === undefined) {
    return null;
  } else if (user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
