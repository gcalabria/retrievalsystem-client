import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../api/userApi';

type AuthState = {
  user: User | null;
  token: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setToken: (state, { payload: tokens }: PayloadAction<string>) => {
      state.token = tokens;
    },
    setUser: (state, { payload: user }: PayloadAction<User | null>) => {
      state.user = user;
    },
    resetTokens: (state) => {
      state.token = null;
    },
  },
});

export const { setUser, setToken, resetTokens } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
