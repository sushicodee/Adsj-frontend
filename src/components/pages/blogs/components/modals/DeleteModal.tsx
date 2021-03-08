import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { IBlog } from 'interfaces/blog';
interface Iprops {
  blog: Partial<IBlog>;
  handleDelete: (id: string) => void;
}

const DeleteModal: React.FC<Iprops> = (props) => {
  const [open, setOpen] = React.useState(false);
  const { handleDelete, blog } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='card'>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle className='card' id='form-dialog-title'>
          Delete BLOG
        </DialogTitle>
        <DialogContent className='card'>
          <DialogContentText>
            Are you sure you want to delete this Blog ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='card'>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button
            onClick={() => [handleDelete(blog), handleClose()]}
            variant='contained'
            color='primary'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteModal;
