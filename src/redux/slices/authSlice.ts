import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Tokens } from '../api/authApi';
import { RootState } from '../store';
import { User } from '../api/userApi';

type AuthState = {
  user: User | null;
  tokens: Tokens;
};

export const defaultTokens: Tokens = {
  access_token: '',
  refresh_token: '',
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    tokens: defaultTokens,
  } as AuthState,
  reducers: {
    setTokens: (state, { payload: tokens }: PayloadAction<Tokens>) => {
      state.tokens = tokens;
    },
    setUser: (state, { payload: user }: PayloadAction<User | null>) => {
      state.user = user;
    },
  },
});

export const { setUser, setTokens } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentTokens = (state: RootState) => state.auth.tokens;
