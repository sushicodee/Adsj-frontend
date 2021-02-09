import React from "react";
import RouteWithsubRoutesHoc from "./RouteWithSubRoutesHoc";
import LoginComponent from "../components/auth/LoginComponent";
import SignupComponent from "../components/auth/SignupComponent";
import Activation from "../components/auth/Activation";
import PasswordReset from "components/auth/PasswordReset";
import ForgotPassword from "components/auth/ForgotPassword";
import Blogs from "components/pages/blogs/Blogs";
import Admin from "components/pages/admin/Admin";
import SingleBlog from "components/pages/blogs/SingleBlog";
import Portfolio from "components/pages/portfolio/Portfolio";

function Routes() {
  const routes = [
    {
      path: "/",
      exact: true,
      component: Portfolio,
    },
    {
      path: "/admin",
      exact: true,
      component: Admin,
      admin:true
    },
    {
      path: "/portfolio",
      exact: true,
      component: Portfolio,
    },
    {
      path: "/login",
      component: LoginComponent,
    },
    {
      path: "/signup",
      component: SignupComponent,
      exact: true,
    },
    {
      path: "/blogs",
      component: Blogs,
      exact: true,
    },
    {
      path: "/blogs/:id",
      component: SingleBlog,
      exact: true,
    },
    {
      path: "/users/activate/:token",
      component: Activation,
      exact: true,
    },
    {
      path: "/users/resetPassword",
      component: PasswordReset,
      exact: true,
    },
    {
      path: "/users/forgotPassword/:token",
      component: ForgotPassword,
      exact: true,
    },
  ];
  return (
    <>
      {routes.map((route) => (
        <RouteWithsubRoutesHoc key={route.path} {...route} allRoutes = {Object.values(routes).map(val => val.path)}  />
        ))}
    </>
  );
}

export default Routes;
