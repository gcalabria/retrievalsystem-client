import { useEffect, useState } from 'react';
import {
  IQueryTemplate,
  defaultQueryTemplate,
  useCreateQueryTemplateMutation,
} from '../../redux/api/queryTemplatesApi';
import { useFetchFolderStructureQuery } from '../../redux/api/folderStructureApi';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { QueryTemplatesDialogProps } from './QueryTemplatesDialog';

export default function CreateQueryTemplatesDialog(
  props: QueryTemplatesDialogProps,
) {
  const { isOpen, onClose: handleClose } = props;
  const [createQueryTemplate, { isLoading: creatingQueryTemplate }] =
    useCreateQueryTemplateMutation();

  const [databases, setDatabases] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [indexes, setIndexes] = useState<string[]>([]);

  // TODO: make naming consisteng: initialQueryTemplate vs emptyQueryTemplate vs defaultQueryTemplate
  const [form, setForm] = useState<IQueryTemplate>(defaultQueryTemplate);
  const { data: folderStructure, isLoading: fetchingFolderStructure } =
    useFetchFolderStructureQuery();

  // TODO: this code is duplicated in SearchBar.tsx
  useEffect(() => {
    setDatabases(folderStructure ? Object.keys(folderStructure) : []);
    // filter models
    if (folderStructure && form.database && folderStructure[form.database]) {
      setModels(Object.keys(folderStructure[form.database]));
    } else {
      setModels([]);
    }
    // filter indexes
    if (
      folderStructure &&
      folderStructure[form.database] &&
      folderStructure[form.database][form.model]
    ) {
      setIndexes(folderStructure[form.database][form.model]);
    } else {
      setIndexes([]);
    }
  }, [form, folderStructure]);

  const handleCreate = async () => {
    const newQueryTemplate = {
      name: form.name,
      text: form.text, // TODO: choose text or code & equation or url according to mode
      database: form.database,
      model: form.model,
      index: form.index,
      language: form.language,
      mode: form.mode,
    };
    try {
      await createQueryTemplate(newQueryTemplate);
      setForm(defaultQueryTemplate);
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  };

  let content;

  if (creatingQueryTemplate || fetchingFolderStructure) {
    content = (
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else {
    content = (
      <Stack component="form" spacing={2}>
        <TextField
          label="Name"
          name="name"
          variant="filled"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          label="Database"
          name="database"
          variant="filled"
          fullWidth
          select
          SelectProps={{
            native: true,
          }}
          value={form.database}
          onChange={handleChange}
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
          variant="filled"
          fullWidth
          select
          SelectProps={{
            native: true,
          }}
          value={form.model}
          onChange={handleChange}
        >
          <option value="" />
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </TextField>

        <TextField
          label="Indexes"
          name="index"
          variant="filled"
          fullWidth
          select
          SelectProps={{
            native: true,
          }}
          value={form.index}
          onChange={handleChange}
        >
          <option value="" />
          {indexes.map((idx) => (
            <option key={idx} value={idx}>
              {idx}
            </option>
          ))}
        </TextField>

        <FormControl component="fieldset">
          <FormLabel component="legend">Search mode:</FormLabel>
          <RadioGroup
            row
            defaultValue="default"
            onChange={handleChange}
            aria-label="search mode"
            name="mode"
            sx={{ justifyContent: 'space-evenly' }}
          >
            <FormControlLabel
              value="default"
              control={<Radio />}
              label="Default"
            />
            <FormControlLabel
              value="separated"
              control={<Radio />}
              label="Separated"
            />
            <FormControlLabel value="url" control={<Radio />} label="URL" />
          </RadioGroup>
        </FormControl>

        {form.mode === 'default' && (
          <TextField
            label="Text"
            name="text"
            variant="filled"
            fullWidth
            value={form.text}
            onChange={handleChange}
          />
        )}
      </Stack>
    );
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
      <DialogTitle>Create Query Template</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
