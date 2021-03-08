import {
  Button,
  CircularProgress,
  Container,
  createStyles,
  CssBaseline,
  FormControl,
  FormLabel,
  Grid,
  Input,
  makeStyles,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { addBlog, setUploadProgress } from 'redux/actions/blog/blogAction';
import CustomTextField from 'components/common/textField/CustomTextField';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import FileUploadButton from 'components/common/fileUploadButton/FileUploadButton';
import CustomCheckBox from 'components/common/CustomCheckBox/CustomCheckBox';
import LinearProgressWithLabel from 'components/common/LinearProgress/LinearProgressWithLabel';
import { DatePicker } from '@material-ui/pickers';
import DateFnsHelper from 'utils/datefns/DateHelper';
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
    startDate: {
      marginRight: theme.spacing(1),
    },
    endDate: {},
    submitting: {},
    button: {
      fontFamily: 'Montserrat',
    },
  })
);

interface IProps {
  title: string;
}

const BlogFormCard: React.FC<IProps> = ({ title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const DATE_FORMAT = 'dd/MM/yyyy';

  const blogSchema = Yup.object().shape({
    title: Yup.string().lowercase().required('Please Enter a title'),
    description: Yup.string(),
    startDate: Yup.date().nullable(),
    endDate: Yup.date()
      .nullable()
      .min(
        Yup.ref('startDate'),
        ({ min }) =>
          `Date needs to be after ${DateFnsHelper.handleFormatDate(
            min,
            DATE_FORMAT
          )}!!`
      ),
  });

  const initialState = {
    title: '',
    description: '',
    isFeatured: false,
    isMainFeatured: false,
    startDate: new Date(),
    endDate: null,
  };
  const [uploadProgress, setuploadProgress] = useState<number>(0);

  const handleUploadProgress = (val) => {
    setuploadProgress(val);
    if (val === 100) {
      setTimeout(() => {
        setUploadProgress(0);
      }, 500);
    }
  };

  function handleSubmit(data: any) {
    if (!image) {
      dispatch(addBlog(data));
    } else {
      dispatch(addBlog(data, image, setuploadProgress));
    }
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
          {({ isSubmitting, isValid, values, setFieldValue, errors }) => {
            const submitButtonClass = isSubmitting
              ? classes.submitting
              : classes.submit;
            return (
              <>
                <Typography variant='h4' align='center'>
                  {title}
                </Typography>
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
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel>Featuring </FormLabel>
                        <RadioGroup row>
                          <CustomCheckBox
                            id='isFeatured'
                            type='checkbox'
                            label='Featured'
                            name='isFeatured'
                          />
                          <CustomCheckBox
                            type='checkbox'
                            id='isMainFeatured'
                            name='isMainFeatured'
                            label='MainFeatured'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.startDate}>
                      <Field
                        component={DatePicker}
                        label='Start Date'
                        name='startDate'
                        format={DATE_FORMAT}
                        onChange={(date: Date) =>
                          setFieldValue('startDate', date)
                        }
                        value={values.startDate}
                      />
                      <Field
                        component={DatePicker}
                        label='End Date'
                        name='endDate'
                        format={DATE_FORMAT}
                        onChange={(date: Date) =>
                          setFieldValue('endDate', date)
                        }
                        value={values.startDate}
                        error={!!errors['endDate']}
                        helperText={errors['endDate']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FileUploadButton
                        name={'image'}
                        label={'Upload a Photo'}
                        value={image}
                        //   error={data._id ? errors['newimage'] : errors[field.key]}
                        //   props={field.props}
                        handlechange={handleChange}
                      />
                      {uploadProgress !== 0 && (
                        <LinearProgressWithLabel value={uploadProgress} />
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {isSubmitting ? (
                        <Button
                          fullWidth
                          variant='contained'
                          color='secondary'
                          className={`${submitButtonClass} ${classes.submit} ${classes.button}`}
                          disabled={isSubmitting}
                        >
                          <CircularProgress
                            color='secondary'
                            variant='determinate'
                          />
                        </Button>
                      ) : (
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='primary'
                          className={`${submitButtonClass} ${classes.submit}${classes.button}`}
                          disabled={!isValid}
                        >
                          POST
                        </Button>
                      )}
                    </Grid>
                  </Grid>

                  <pre>{JSON.stringify(values)}</pre>
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
