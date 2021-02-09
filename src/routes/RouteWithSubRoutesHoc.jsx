import NotFound from "components/notFound/NotFound";
import React from "react";
import AdminRoutes from './AdminRoutes';
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
function RouteWithsubRoutesHoc({ path, exact,protectedRoute,admin, component: Component, routes ,allRoutes, ...props }) {
  const { path: routePath } = useRouteMatch();
  const location = useLocation()
  return (
    <Switch>
      {admin ?
        <AdminRoutes component ={Component} path = {path} exact = {exact} protectedRoute = {protectedRoute} routes = {routes} {...props}/>
        :
      <Route
        path={`${routePath !== "/" ? routePath : ""}${path}`}
        exact={exact}
        render={(props) => <Component style = {{marginTop:'64px'}} routes={routes} {...props} />}
      ></Route>
      }
      {!allRoutes.includes(location.pathname) ? <Route component = {NotFound}/>:null
      }
      {/* <Route  component = {NotFound}/> */}
    </Switch>
  );
}
export default RouteWithsubRoutesHoc;
