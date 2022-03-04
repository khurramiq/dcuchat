import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import LikeList from "../pages/likeList";
import ContactUs from "../pages/contact_us";
import AboutUs from "../pages/about_us";
import Inbox from "../pages/inbox";
import NotFound from "../pages/not_found/NotFound";
import "./style.css";

const Private = ({ onlineUsers, arrivalMessage, socket }) => {
  return (
    <div className="private-routes-wrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/like-list" component={LikeList} />
        <Route
          exact
          path="/inbox"
          render={(props) => (
            <Inbox
              onlineUsers={onlineUsers}
              arrivalMessage={arrivalMessage}
              socket={socket}
            />
          )}
        />

        <Route
          exact
          path="/contact_us"
          render={(props) => <ContactUs socket={socket} />}
        />
        <Route exact path="/about_us" component={AboutUs} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Private;
