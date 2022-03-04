import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Inbox from "../pages/inbox";
import ContactUs from "../pages/contact_us";
import AboutUs from "../pages/about_us";
const Login = lazy(() => import("../pages/loginPage"));
const NotFound = lazy(() => import("../pages/not_found/NotFound"));
const Register = lazy(() => import("../pages/registrationPage"));

const PublicRoutes = ({ socket }) => {
  return (
    <div className="private-routes-wrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/inbox" component={Inbox} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/contact_us" component={ContactUs} />
        <Route exact path="/about_us" component={AboutUs} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default PublicRoutes;
