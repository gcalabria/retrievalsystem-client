import { Snackbar, Alert } from '@mui/material';
import { selectSnackbar, hideSnackbar } from '../redux/slices/snackbarSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AppSnackbar() {
  // const { flashMessage, visible, hideFlash } = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      autoHideDuration={6000}
      open={snackbar.visible}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={snackbar.type}>
        {snackbar.text}
      </Alert>
    </Snackbar>
  );
}
