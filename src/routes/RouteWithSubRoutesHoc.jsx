import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
function RouteWithsubRoutesHoc({ path, exact, component: Component, routes , ...rest }) {
  const { path: routePath } = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${routePath !== "/" ? routePath : ""}${path}`}
        exact={exact}
        render={(props) => <Component routes={routes} {...props} />}
      ></Route>
    </Switch>
  );
}
export default RouteWithsubRoutesHoc;
