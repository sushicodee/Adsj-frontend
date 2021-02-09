import {
  Button,
  Container,
  createStyles,
  CssBaseline,
  Grid,
  Input,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { addBlog } from 'redux/actions/blog/blogAction';
import { useForm } from 'utils/hooks/useForm';
import CustomTextField from 'components/common/textField/CustomTextField';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import FileUploadButton from 'components/common/fileUploadButton/FileUploadButton';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: '64px',
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
    form: {
      width: '100%',
      marginTop: '4px',
    },
    submit: {
      margin: '8px 0 4px',
    },
    submitting: {},
    button: {
      fontFamily: 'Montserrat',
    },
  })
);

interface IProps {}

const BlogFormCard: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const blogSchema = Yup.object().shape({
    title: Yup.string().lowercase().required('Please Enter a title'),
    description: Yup.string(),
  });

  const initialState = {
    title: '',
    description: '',
  };

  function handleSubmit(data: any) {
    if (image) {
      const formData = [...data, image];
    }
    // if (image) {
    // } else {
    //   dispatch(addBlog(data));
    // }
  }
  const [image, setimage] = useState();

  const handleChange = (e) => {
    const { files } = e.target;
    if (files.length) {
      setimage(files);
    }
  };
  return (
    <Container component='main' maxWidth='lg' className={`${classes.paper}`}>
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          initialValues={initialState}
          validationSchema={blogSchema}
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
              <>
                <FileUploadButton
                  name={'image'}
                  label={'Upload a Photo'}
                  value={image}
                  //   error={data._id ? errors['newimage'] : errors[field.key]}
                  //   props={field.props}
                  handlechange={handleChange}
                />
                <Form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomTextField
                        variant='outlined'
                        required
                        fullWidth
                        id='title'
                        label='Title'
                        name='title'
                        placeholder='Please enter a title'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        variant='outlined'
                        required
                        fullWidth
                        name='description'
                        label='Description'
                        type='description'
                        id='description'
                        placeholder='Enter a description'
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
                      posting...
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
                      Post
                    </Button>
                  )}
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default BlogFormCard;
