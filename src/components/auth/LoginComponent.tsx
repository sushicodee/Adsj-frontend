import React, { useEffect, useContext } from 'react';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './../copyright/Copyright';
import { axiosApi } from './../../axios/axiosApi';
import { Snackbar } from './../../utils/notification/Snackbar';
import { Form, Formik } from 'formik';
import CustomTextField from '../common/textField/CustomTextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { authenticate, isAuth } from '../../helpers/auth';
import { data } from './data';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import loginImage from 'assets/auth/login.jpg';
import { AuthContext } from 'context/authContext';

interface IDataState {
  username: string;
  password: string;
}

interface IProps {
  match: any;
  location: any;
  history: any;
  routes: any;
}

interface IAuthProps {
  img: string;
  name: string;
  href: string;
  color: string;
  history: any;
}

interface IState {
  data: IDataState;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      backgroundImage: `url(${loginImage})`,
      minHeight: '100%',
      minWidth: '100%',
      height: 'auto',
      width: '100%',
      position: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      top: 0,
      left: 0,
    },
    paper: {
      marginTop: '64px',
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: '4px',
      backgroundColor: 'black',
    },
    form: {
      width: '100%',
      marginTop: '4px',
    },
    submit: {
      margin: '8px 0 4px',
    },
    submitting: {},
    oauthTitle: {
      marginTop: '10px',
      marginBottom: '10px',
      textAlign: 'center',
    },
    googleButton: {
      fontSize: '12px',
      backgroundColor: data[1].color,
      color: 'white',
      '&:hover': {
        background: data[1].hoverColor,
      },
    },
    facebookButton: {
      fontSize: '12px',
      backgroundColor: data[0].hoverColor,
      color: 'white',
      '&:hover': {
        background: data[0].hoverColor,
      },
    },
    copyright: {
      marginBottom: '20px',
    },
    button: {
      fontFamily: 'Montserrat',
    },
  })
);

const LoginComponent: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const { history } = props;
  const initialState = {
    username: '',
    password: '',
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string().lowercase().required('Please Enter username/email'),
    password: Yup.string()
      .required('Please Enter your Password')
      .matches(/(?=.*[A-Z])/, 'At least one Uppercase is Required')
      .matches(/(?=.*[!@#$%^&*])/, 'At least one Special is Required'),
  });

  const handleAuthStateChange = (data: any) => {
    authenticate(data, () => {
      isAuth() && isAuth?.role === 'admin'
        ? history.push('/blogs')
        : history.push('/blogs');
    });
  };

  const responseGoogle = (response: any) => {
    sendGoogleToken(response.tokenId);
  };
  const sendGoogleToken = (idToken: string) => {
    axiosApi
      .post('/auth/googleLogin', { idToken }, {}, false)
      .then((data: any) => {
        Snackbar.showSuccess(data.message);
        handleAuthStateChange(data);
        login(data);
        setTimeout(() => {
          data.user.role === 'user'
            ? history.push(`/blogs`)
            : history.push('/blogs');
        }, 1000);
      })
      .catch((err) => {
        Snackbar.handleError(err);
      });
  };

  const responseFacebook = (response: any) => {
    sendFacebookToken(response.userID, response.accessToken);
  };

  const sendFacebookToken = (userID: string, accessTokens: string) => {
    axiosApi
      .post('/auth/facebookLogin', { userID, accessTokens }, {}, false)
      .then((data: any) => {
        Snackbar.showSuccess(data.message);
        handleAuthStateChange(data);
        login(data);
      })
      .catch((err) => {
        Snackbar.handleError(err);
      });
  };
  const handleSubmit = (data: IDataState) => {
    axiosApi
      .post('/auth/login', data, {}, true)
      .then((data: any) => {
        handleAuthStateChange(data);
        Snackbar.showSuccess(data.message);
        login(data);
        setTimeout(() => {
          data.user.role === 'user'
            ? history.push(`/blogs`)
            : history.push('/blogs');
        }, 1000);
      })
      .catch((err) => {
        if (err.errors) {
          err.errors.forEach((message: string) => {
            Snackbar.handleError({ message });
          });
        } else {
          Snackbar.handleError(err.data);
        }
      })
      .finally(() => {});
  };

  return (
    <>
      <div className={classes.background} />
      <Container
        component='main'
        maxWidth='xs'
        className={`${classes.paper}  glass-dark`}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            ADSJ Sign In
          </Typography>
          <Formik
            initialValues={initialState}
            validationSchema={loginSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(data);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid, touched }) => {
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
                      className={`${submitButtonClass} ${classes.submit} ${classes.button}`}
                      disabled={isSubmitting}
                    >
                      Signing in...
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      className={`${submitButtonClass} ${classes.submit}${classes.button}`}
                      disabled={!isValid || !touched}
                    >
                      Sign In
                    </Button>
                  )}
                  <Grid container justify='flex-end'>
                    <Grid item xs={12} className={classes.oauthTitle}>
                      <Typography variant='subtitle1'>
                        Or Sign in with Google or Facebook?
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      {' '}
                      <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_ID}`}
                        buttonText='Login'
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={(renderProps) => {
                          return (
                            <Button
                              fullWidth
                              className={
                                classes.googleButton +
                                ' ' +
                                classes.submit +
                                ' ' +
                                classes.button
                              }
                              startIcon={
                                <img
                                  src={`${data[1].img}`}
                                  height='25px'
                                  width='25px'
                                  alt={`${data[1].name}`}
                                />
                              }
                              color='secondary'
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                            >
                              Sign in with Google
                            </Button>
                          );
                        }}
                      />
                    </Grid>
                    <Grid item sm={2} />
                    <Grid item xs={12} sm={5}>
                      <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_OAUTH_ID}`}
                        autoLoad={false}
                        callback={responseFacebook}
                        render={(renderProps: any) => {
                          return (
                            <Button
                              fullWidth
                              className={
                                classes.facebookButton +
                                ' ' +
                                classes.submit +
                                ' ' +
                                classes.button
                              }
                              startIcon={
                                <img
                                  src={`${data[0].img}`}
                                  height='25px'
                                  width='25px'
                                  alt={`${data[0].name}`}
                                />
                              }
                              color='secondary'
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                            >
                              Sign in with Facebook
                            </Button>
                          );
                        }}
                      />
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Box mt={5} className={classes.copyright}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default LoginComponent;
