import { Button, Container, Grid, Typography } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { axiosApi } from '../../axios/axiosApi';
import { useForm } from '../../utils/hooks/useForm';
import { Snackbar } from '../../utils/notification/Snackbar';

interface Iprops {
  history: any;
  match: any;
  location: any;
}

const Activation: React.FC<Iprops> = (props) => {
  const { match, history } = props;
  const token = match.params.token || false;
  const { values, setValues, onSubmit }: any = useForm(handleSubmit, {
    username: '',
    token: '',
    show: true,
  });

  useEffect(() => {
    const isValidToken = () => {
      try {
        jwtDecode(token);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (!isValidToken()) {
      return;
    }
    const { username } = jwtDecode(token);
    setValues({ ...values, username, token });
    return () => {
      setValues();
    };
  }, [token, setValues, values]);

  async function handleSubmit() {
    try {
      const data: any = await axiosApi.post(
        '/auth/activation',
        values,
        {},
        false
      );
      setValues({ ...values, show: false });
      Snackbar.showSuccess(data.message);
      setTimeout(() => {
        history.push('/login');
      }, 1000);
    } catch (err) {
      Snackbar.handleError(err.data);
    }
  }
  return (
    token &&
    values.show && (
      <Container>
        <form noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1'>
                Welcome, <b>{values.username}</b>
              </Typography>
              <Button variant='contained' color='primary' type='submit'>
                Activate
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify='flex-end'>
          <Grid item xs={12}>
            <Typography>Or Sign up again</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              color='secondary'
              variant='contained'
              onClick={() => history.push('/signup')}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  );
};

export default Activation;
