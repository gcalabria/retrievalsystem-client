import { Box, CircularProgress, Typography } from '@mui/material';
import { useFetchQueryTemplatesQuery } from '../../redux/api/queryTemplatesApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import QueryTemplatesListItem from './QueryTemplatesListItem';

interface QueryTemplatesListProps {
  onClose: () => void;
}

export default function QueryTemplatesList(props: QueryTemplatesListProps) {
  const { onClose } = props;
  const user = useSelector(selectCurrentUser);

  const { data, isLoading } = useFetchQueryTemplatesQuery({
    userId: user!.id,
    pagination: {
      offset: 0,
      limit: 50,
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data?.data) {
    return (
      <Box textAlign="center">
        <Typography variant="subtitle1">
          There are no query examples available, please create one.
        </Typography>
      </Box>
    );
  }

  const templates = data?.data;

  return (
    <>
      {templates.map((template, index) => (
        <QueryTemplatesListItem
          onClose={onClose}
          key={template.id}
          template={template}
          isLast={index === templates.length - 1}
        />
      ))}
    </>
  );
}
