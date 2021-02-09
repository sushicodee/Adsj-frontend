import { AuthContext } from 'context/authContext';
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
function AdminRoutes({ component: Component, ...props }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={(props) =>
        user.role === 'admin' ? <Component {...props} /> : <Redirect to='/' />
      }
    ></Route>
  );
}
export default AdminRoutes;
