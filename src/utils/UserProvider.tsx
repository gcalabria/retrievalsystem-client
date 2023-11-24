/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect } from 'react';
import { IUser, useLazyFetchUserQuery } from '../redux/api/userApi';

type UsercontextType = { user: IUser } | null;

const UserContext = createContext<UsercontextType>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [fetchUser] = useLazyFetchUserQuery();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('accessToken') !== null;

    (async () => {
      if (isAuthenticated) {
        try {
          const user = await fetchUser().unwrap();
          setUser(user);
        } catch (err) {
          console.log(err);
        }
      } else {
        setUser(null);
      }
    })();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
