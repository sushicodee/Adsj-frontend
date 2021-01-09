import React from 'react';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './../copyright/Copyright';
import { axiosApi } from './../../axios/axiosApi';
import { Snackbar } from './../../utils/notification/Snackbar';
import { Form, Formik } from 'formik';
import CustomTextField from '../common/textField/CustomTextField';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface IProps {
  history: any;
}

interface IDataState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IState {
  data: IDataState;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: '128px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: '4px',
      backgroundColor: 'white',
    },
    form: {
      width: '100%',
      marginTop: '4px',
    },
    submit: {
      margin: '8px 0 4px',
    },
    submitting: {},
  })
);

const SignupComponent: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const initialState = {
    username: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/(?=.*[A-Z])/, 'At least one Uppercase is Required')
      .matches(/(?=.*[!@#$%^&*])/, 'At least one Special is Required')
      .min(3, 'username too Short')
      .required('Please Enter a username'),
    email: Yup.string()
      .lowercase()
      .required('Please Enter an Email')
      .email('Please Enter a Valid Email'),
    password: Yup.string().required('Please Enter a Password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), 'Passwords do not match'])
      .required('Please Retype your Password'),
  });
  const handleSubmit = (data: IDataState) => {
    const { history } = props;
    axiosApi
      .post('/auth/register', data, {}, true)
      .then((data: any) => {
        Snackbar.showSuccess(data.username + 'User Registered Successfully');
        setTimeout(() => {
          history.push(`/login`);
        }, 1000);
      })
      .catch((err) => {
        Snackbar.handleError(err);
      })
      .finally(() => {});
  };
  return (
    <Container component='main' maxWidth='xs' className='container'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Formik
          initialValues={initialState}
          validationSchema={signupSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            handleSubmit(data);
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleChange, errors }) => {
            const submitButtonClass = isSubmitting
              ? classes.submitting
              : classes.submit;
            return (
              <Form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField
                      variant='outlined'
                      required
                      fullWidth
                      id='username'
                      label='Username'
                      name='username'
                      placeholder='Please enter a username'
                      autoComplete='username'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      variant='outlined'
                      required
                      fullWidth
                      placeholder='Please enter an email'
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      variant='outlined'
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      placeholder='Enter a Strong Password'
                      autoComplete='current-password'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      variant='outlined'
                      required
                      fullWidth
                      name='confirmPassword'
                      label='Confirm Password'
                      type='password'
                      id='confirmPassword'
                      placeholder='Please Re-type your password'
                      autoComplete='current-password'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value='allowExtraEmails' color='primary' />
                      }
                      label='I want to receive inspiration, marketing promotions and updates via email.'
                    />
                  </Grid>
                </Grid>
                {isSubmitting ? (
                  <Button
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={submitButtonClass}
                    disabled={isSubmitting}
                  >
                    Signing up...
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={submitButtonClass}
                  >
                    Sign Up
                  </Button>
                )}
                <Grid container justify='flex-end'>
                  <Grid item xs={12}>
                    <Link to='/login'>Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignupComponent;
