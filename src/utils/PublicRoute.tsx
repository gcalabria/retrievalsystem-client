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
    // If user is undefined, then the app is not ready to provide user information yet.
    // Thus, we return null to prevent the app from rendering anything.
    // As soon as the user var is set to null or an object, we can render the app.
    return null;
  } else if (user) {
    // Here the app tried to get the user information and succeed.
    // Thus, the public route should not be accessible.
    return <Navigate to="/" />;
  } else {
    // Here the app tried to get the user information but failed.
    // Thus, the public route should be accessible.
    return children;
  }
}
