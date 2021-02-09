import { AuthContext } from 'context/authContext';
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
function ProtectedRoutes({ component: Component, ...props }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/' />
      }
    ></Route>
  );
}
export default ProtectedRoutes;
