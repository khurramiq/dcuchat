import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import { format } from "timeago.js";

const MessageLeft = ({ imgUrl, message, datetime }) => {
  return (
    <div className="left-message-wrapper">
      <div className="left-message">
        <p className="message">{message}</p>
        <Avatar alt="man" src={imgUrl} className="avator" />
        <span className="date-time">{format(datetime)}</span>
      </div>
    </div>
  );
};

export default MessageLeft;
