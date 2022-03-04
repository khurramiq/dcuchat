import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import { format } from "timeago.js";
import { Grid } from "@material-ui/core";

const MessageRight = ({ imgUrl, message, datetime }) => {
  return (
    <Grid container xs={12}>
      <Grid item xs={6} sm={6}></Grid>
      <Grid item xs={6} sm={6}>
        <div className="right-message-wrapper">
          <div className="right-message">
            <p className="message">{message}</p>
            <Avatar alt="man" src={imgUrl} className="avator" />
            <span className="date-time">{format(datetime)}</span>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default MessageRight;
