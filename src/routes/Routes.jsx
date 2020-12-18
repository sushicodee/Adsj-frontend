import React from "react";
import RouteWithsubRoutesHoc from "./RouteWithSubRoutesHoc";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import HomeComponent from "../components/pages/HomeComponent";
import LoginComponent from "../components/auth/LoginComponent";
import AuthComponent from "../components/auth/AuthComponent";
import LogoutComponent from "../components/auth/LogoutComponent";
import { AuthProvider } from "../context/authContext";
function Routes() {
  const routes = [
    {
      path: "/",
      exact: true,
      component: HomeComponent,
    },
    {
      path: "/login",
      component: LoginComponent,
    },
   
  ];
  return (
    <Router>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink
              className="nav-link nav-main"
              to={route.path}
              activeClassName="active"
            >
              {route.path === "/" ? "Home" : route.path.substr(1)}
            </NavLink>
          </li>
        ))}
      </ul>
      {routes.map((route) => (
      <AuthProvider>
        <RouteWithsubRoutesHoc {...route} key={route.path} />
      </AuthProvider>
      ))}
    </Router>
  );
}

export default Routes;
