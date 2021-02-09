import React from 'react';
import { Formik } from 'formik';
import './Contact.scss';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import CustomTextField from '../../common/textField/CustomTextField';
import * as Yup from 'yup';
import timelineImage from 'assets/portfolio/timeline.jpg';
import { axiosApi } from 'axios/axiosApi';
import { ToastContainer } from 'react-toastify';
import { Snackbar } from 'utils/notification/Snackbar';
interface IFormState {
  email: string;
  subject: string;
  message: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10),
  },
  image: {
    width: '100%',
  },
}));
const Contact: React.FC = () => {
  const classes = useStyles();
  const initialState: IFormState = { email: '', subject: '', message: '' };
  const contactSchema = Yup.object({
    email: Yup.string()
      .email('Invalid Email Format')
      .required('Please Enter your email'),
    subject: Yup.string(),
    message: Yup.string()
      .min(10, 'Message should be at least 10 characters long')
      .required('Please write a Message'),
  });

  const handleSubmit = (data) => {
    axiosApi
      .post('/email', data)
      .then((data: any) => {
        Snackbar.showSuccess(data.message);
      })
      .catch((err) => {
        Snackbar.handleError(err);
      });
  };
  return (
    <Grid item xs={12} md={6} className={classes.root}>
      <img src={timelineImage} className={classes.image} />
      <Typography variant='h3'>Reach out to me ?</Typography>
      <Formik
        initialValues={initialState}
        validationSchema={contactSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(data);
          setSubmitting(false);
        }}
      >
        {({
          values,
          isSubmitting,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className={`contact-form card`}>
            <CustomTextField name='email' label='email' placeholder='email' />
            <CustomTextField
              name='subject'
              label='subject'
              placeholder='subject'
            />
            <CustomTextField
              rows={4}
              multiline={true}
              name='message'
              label='message'
              placeholder='message'
              color='primary'
            />
            <Button
              disabled={isSubmitting}
              variant='contained'
              color='primary'
              type='submit'
            >
              Send Email
            </Button>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default Contact;
