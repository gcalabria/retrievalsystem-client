/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import CreateQueryTemplatesDialog from './CreateQueryTemplatesDialog';
import QueryTemplatesListDialog from './QueryTemplatesListDialog';

export interface QueryTemplatesDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function QueryTemplatesDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<
    'list' | 'create' | undefined
  >(undefined);

  const handleOpenListDialog = () => {
    setCurrentDialog('list');
    setIsOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setCurrentDialog('create');
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="outlined">
        <Button name="list" onClick={handleOpenListDialog}>
          Templates
        </Button>
        <Button name="create" size="small" onClick={handleOpenCreateDialog}>
          <AddIcon />
        </Button>
      </ButtonGroup>
      {currentDialog === 'create' && (
        <CreateQueryTemplatesDialog isOpen={isOpen} onClose={handleClose} />
      )}
      {currentDialog === 'list' && (
        <QueryTemplatesListDialog isOpen={isOpen} onClose={handleClose} />
      )}
    </>
  );
}
