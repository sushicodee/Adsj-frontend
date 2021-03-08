import { Grid } from '@material-ui/core';
import { IBlog } from 'interfaces/blog';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBLog, updateBlog } from 'redux/actions/blog/blogAction';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';

interface Iprops {
  blog: any;
}

const BlogOptions: React.FC<Iprops> = (props) => {
  const dispatch = useDispatch();
  const { blog } = props;
  const handleEdit = (data: Partial<IBlog>) => {
    dispatch(updateBlog(data.id, data));
  };

  const handleDelete = (data) => {
    dispatch(deleteBLog(data));
  };

  return (
    <Grid container justify='flex-end'>
      <Grid item>
        <EditModal handleEdit={handleEdit} blog={blog} />
      </Grid>
      <Grid item>
        <DeleteModal handleDelete={handleDelete} blog={blog} />
      </Grid>
    </Grid>
  );
};

export default BlogOptions;
