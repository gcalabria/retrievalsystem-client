import {
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import { useState, useEffect } from 'react';
import { useFetchFolderStructureQuery } from '../../redux/api/folderStructureApi';
import { selectCurrentQuery, setQuery } from '../../redux/slices/querySlice';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const query = useSelector(selectCurrentQuery);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const {
    data: folderStructure,
    isLoading,
    isSuccess,
  } = useFetchFolderStructureQuery();
  const [databases, setDatabases] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [indexes, setIndexes] = useState<string[]>([]);
  const [languages] = useState<string[]>([]);

  useEffect(() => {
    setDatabases(folderStructure ? Object.keys(folderStructure) : []);
    // filter models
    if (folderStructure && query.database && folderStructure[query.database]) {
      setModels(Object.keys(folderStructure[query.database]));
    } else {
      setModels([]);
    }
    // filter indexes
    if (
      folderStructure &&
      folderStructure[query.database] &&
      folderStructure[query.database][query.model]
    ) {
      setIndexes(folderStructure[query.database][query.model]);
    } else {
      setIndexes([]);
    }
  }, [query, folderStructure]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log('lol');
    dispatch(setQuery({ ...query, [name]: value }));
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    navigate({
      pathname: '/results',
      search: createSearchParams({
        text: query.text,
        database: query.database,
        model: query.model,
        index: query.index,
        language: query.language,
        page: '1',
      }).toString(),
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  } else if (isSuccess) {
    return (
      <Stack
        direction="row"
        component="form"
        role="search"
        justifyContent="center"
        width="100%"
        onSubmit={handleSubmit}
      >
        <TextField
          select
          label="Model"
          name="model"
          value={query.model}
          onChange={handleChange}
          className="searchbar-model-select"
          SelectProps={{
            native: true,
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
          name="text"
          value={query.text}
          onChange={handleChange}
          className="searchbar-query-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsOpen(true)}
                  aria-label="advanced search"
                  size="large"
                >
                  <TuneIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          size="small"
          sx={{ ml: 1 }}
          onClick={handleSubmit}
        >
          Go!
        </Button>

        <Dialog
          maxWidth="sm"
          fullWidth
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <DialogTitle>Advanced Search Settings</DialogTitle>
          <DialogContent>
            <Stack sx={{ pt: 2 }} spacing={2}>
              <TextField
                label="Database"
                select
                name="database"
                value={query.database}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" />
                {databases.map((db) => (
                  <option key={db} value={db}>
                    {db}
                  </option>
                ))}
              </TextField>
              <TextField
                label="Model"
                name="model"
                value={query.model}
                onChange={handleChange}
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" />
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </TextField>
              <TextField
                label="Index"
                name="index"
                value={query.index}
                onChange={handleChange}
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" />
                {indexes.map((idx) => (
                  <option key={idx} value={idx}>
                    {idx}
                  </option>
                ))}
              </TextField>
              <TextField
                label="Language"
                disabled
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" />
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </TextField>

              <Button onClick={handleApply}>Apply</Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </Stack>
    );
  }

  return null;
}
