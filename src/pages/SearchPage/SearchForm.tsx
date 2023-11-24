/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useFetchFolderStructureQuery } from '../../redux/api/folderStructureApi';
// import AdvancedSearchDialog from './navbar/AdvancedSearchDialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const SearchFormSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  model: z.string().min(1, 'Model is required'),
  index: z.string().min(1, 'Index is required'),
  language: z.string().min(1, 'Language is required'),
  database: z.string().min(1, 'Database is required'),
  mode: z.string().min(1, 'Mode is required'),
});

type SearchFormData = z.infer<typeof SearchFormSchema>;

interface IQuery {
  mode: 'default' | 'advanced';
  text: string;
  database: string;
  model: string;
  index: string;
  language: string;
}

const initialQuery: IQuery = {
  mode: 'default',
  text: '',
  database: '',
  model: '',
  index: '',
  language: '',
};

export default function SearchForm() {
  const [query, setQuery] = useState<IQuery>(initialQuery);
  const { data: folderStructure } = useFetchFolderStructureQuery();
  const [models, setModels] = React.useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(SearchFormSchema),
  });

  const onSubmit = async (data: SearchFormData) => {
    console.error('TODO: handle error');
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      direction="row"
      component="form"
      role="search"
      justifyContent="center"
    >
      <TextField
        {...register('model')}
        select
        label="Model"
        SelectProps={{
          native: true,
        }}
        sx={{
          flexGrow: 1,
          minWidth: '192px',
          fieldset: {
            borderRadius: '4px 0 0 4px',
          },
        }}
      >
        <option value="" />
        {models.map((model) => (
          <option value={model} key={model}>
            {model}
          </option>
        ))}
      </TextField>
      <TextField
        label="Query"
        value={query.text}
        sx={{
          flexGrow: 5,
          '.MuiInputBase-root': {
            paddingRight: '8px',
          },
          fieldset: {
            borderRadius: '0 4px 4px 0',
            marginLeft: '-1px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          // endAdornment: (
          //   <InputAdornment position="end">
          //     <IconButton
          //       onClick={() => setIsDialogOpen(true)}
          //       aria-label="advanced search"
          //       size="large"
          //     >
          //       <TuneIcon />
          //     </IconButton>
          //   </InputAdornment>
          // ),
        }}
      />
      {/* <AdvancedSearchDialog
        errors={queryErrors}
        dataStructure={dataStructure}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      /> */}
    </Stack>
  );
}
