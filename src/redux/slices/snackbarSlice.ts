import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { AlertColor } from '@mui/material';

type SnackbarState = {
  visible: boolean;
  text: string;
  type: AlertColor;
};

const slice = createSlice({
  name: 'snackbar',
  initialState: {} as SnackbarState,
  reducers: {
    showSnackbar: (
      state,
      { payload }: PayloadAction<{ text: string; type: AlertColor }>,
    ) => {
      state.text = payload.text;
      state.type = payload.type;
      state.visible = true;
    },
    hideSnackbar: (state) => {
      state.visible = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = slice.actions;

export default slice.reducer;

export const selectSnackbar = (state: RootState) => state.snackbar;
