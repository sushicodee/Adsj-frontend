import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid, Icon, Typography } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      alignSelf: 'start',
    },
    input: {
      display: 'none',
    },
    imageContainer: {
      aspectRatio: '16:4',
      height: '250px',
    },
    image: {
      height: '100%',
    },
  })
);

type uploadProps = {
  name: string;
  label?: string;
  value?: string;
  multiple?: boolean;
  handlechange: (e: ChangeEvent<unknown>) => void;
  error?: string;
};

const FileUploadButton: React.FC<uploadProps> = ({
  name,
  label,
  value,
  multiple,
  handlechange,
  error,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const imageInputRef = useRef<HTMLInputElement>();
  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    handlechange(e);
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
      setImage('');
    }
  }, [image]);
  return (
    <div className={classes.root + ' ' + 'upload-button-wrapper'} key={name}>
      <input
        name={name}
        accept='image/*'
        className={classes.input}
        id='contained-button-file'
        multiple={multiple || false}
        type='file'
        onChange={handleImageChange}
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          <AttachFileIcon />
        </Button>
        {preview && (
          <Grid className={classes.imageContainer}>
            <img className={classes.image} src={preview}></img>
          </Grid>
        )}
      </label>
      <input
        accept='image/*'
        className={classes.input}
        id='icon-button-file'
        type='file'
      />
      <Typography className='photo-info' variant='caption'>
        {value
          ? typeof value === 'string'
            ? value.split('-')[1]
            : value[0].name
          : 'No Photo selected'}
      </Typography>
    </div>
  );
};
export default FileUploadButton;
