import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';

function useAuth() {
  const user = useSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
}

export default useAuth;
