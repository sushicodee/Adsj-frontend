import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
interface IProps {
  history: any;
  match: any;
}

interface IDataState {
  token: any;
  password: string;
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

const ForgotPassword: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { history, match } = props;
  const initialState = {
    token: match.params.token,
    password: '',
  };
  const [decodedToken, setDecodedToken] = useState({});

  const passwordForgotSchema = Yup.object().shape({
    password: Yup.string()
      .required('Please Enter a new Password')
      .matches(/(?=.*[A-Z])/, 'At least one Uppercase is Required')
      .matches(/(?=.*[!@#$%^&*])/, 'At least one Special is Required'),
  });

  const handleSubmit = (data: IDataState) => {
    axiosApi
      .post('/auth/password/reset', data, {}, true)
      .then((data: any) => {
        Snackbar.showSuccess(data.message);
        setTimeout(() => {
          history.push('/login');
        }, 1000);
      })
      .catch((err) => {
        if (err) {
          Snackbar.handleError(err);
        } else {
          Snackbar.handleError(err.data);
        }
      })
      .finally(() => {});
  };

  useEffect(() => {
    const { token } = match.params;
    if (token) {
      setDecodedToken(jwtDecode(token));
    }
  }, []);

  return (
    <Container component='main' maxWidth='xs' className='container'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          ADSJ Reset password for {decodedToken.email}
        </Typography>
        <Formik
          initialValues={initialState}
          validationSchema={passwordForgotSchema}
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
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      placeholder='Enter a Strong Password'
                      autoComplete='current-password'
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
                    Resetting passworrd...
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={submitButtonClass}
                  >
                    Reset Password
                  </Button>
                )}
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

export default ForgotPassword;
