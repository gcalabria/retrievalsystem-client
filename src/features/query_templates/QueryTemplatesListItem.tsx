import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  IQueryTemplate,
  useDeleteQueryTemplateMutation,
} from '../../redux/api/queryTemplatesApi';
import { selectCurrentQuery, setQuery } from '../../redux/slices/querySlice';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { showSnackbar } from '../../redux/slices/snackbarSlice';

interface QueryTemplatesListItemProps {
  template: IQueryTemplate;
  isLast: boolean;
  onClose: () => void;
}

export default function QueryTemplatesListItem(
  props: QueryTemplatesListItemProps,
) {
  const { template, isLast, onClose: closeDialog } = props;
  const {
    id,
    name,
    database,
    model,
    index,
    language,
    mode,
    text,
    code,
    equation,
    url,
  } = template;
  const dispatch = useDispatch();
  const [deleteQuery] = useDeleteQueryTemplateMutation();
  const query = useSelector(selectCurrentQuery);

  const handleChooseTemplate = () => {
    const newQuery: Partial<IQueryTemplate> = {
      database,
      model,
      index,
      language,
      mode,
    };

    if (mode === 'default') {
      newQuery.text = text;
    } else if (mode === 'separated') {
      newQuery.code = code;
      newQuery.equation = equation;
    } else if (mode === 'url') {
      newQuery.url = url;
    } else {
      console.error('TODO');
    }

    dispatch(setQuery({ ...query, ...newQuery }));
    closeDialog();
  };

  const handleDelete = async () => {
    try {
      await deleteQuery(id).unwrap();
      dispatch(
        showSnackbar({
          text: 'Query template deleted.',
          type: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          text: 'Oops! Something went wrong when trying to delete the query template.',
          type: 'error',
        }),
      );
    }
  };

  return (
    <>
      <ListItem
        key={id}
        alignItems="flex-start"
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton onClick={handleChooseTemplate}>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
      {!isLast && <Divider />}
    </>
  );
}
