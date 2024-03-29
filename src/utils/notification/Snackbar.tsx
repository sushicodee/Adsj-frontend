import { toast } from 'react-toastify';

const showSuccess = (msg: string) => {
  toast.success(msg);
};
const showInfo = (msg: string) => {
  toast.info(msg);
};

const showWarning = (msg: string) => {
  toast.warn(msg);
};
const showError = (msg: string) => {
  toast.error(msg);
};
//handle error
const handleError = (error: Record<string, string>) => {
  let defaultMessage = 'something went wrong';
  if (error && error.message) {
    defaultMessage = error.message;
  }
  showError(defaultMessage);
};

export const Snackbar = {
  showSuccess,
  showWarning,
  showInfo,
  handleError,
};
