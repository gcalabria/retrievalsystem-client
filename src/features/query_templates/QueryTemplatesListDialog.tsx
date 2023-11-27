import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { QueryTemplatesDialogProps } from './QueryTemplatesDialog';
import QueryTemplatesList from './QueryTemplatesList';

export default function QueryTemplatesListDialog(
  props: QueryTemplatesDialogProps,
) {
  const { isOpen, onClose: handleClose } = props;

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
      <DialogTitle>Query Templates</DialogTitle>
      <DialogContent>
        <QueryTemplatesList onClose={handleClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
