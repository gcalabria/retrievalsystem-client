import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { folderStructureApi } from '../api/folderStructureApi';

interface IQueryState {
  database: string;
  model: string;
  index: string;
  text: string;
  mode: string;
  language: string;
}

const initialState: IQueryState = {
  database: '',
  model: '',
  index: '',
  text: '',
  mode: '',
  language: 'english',
};

const slice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<IQueryState>) => {
      Object.assign(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      folderStructureApi.endpoints.fetchFolderStructure.matchFulfilled,
      (state, { payload: folderStructure }) => {
        state.database = Object.keys(folderStructure)[0];
        state.model = Object.keys(folderStructure[state.database])[0];
        state.index = folderStructure[state.database][state.model][0];
      },
    );
  },
});

export const { setQuery } = slice.actions;

export default slice.reducer;

export const selectCurrentQuery = (state: RootState) => state.query;
