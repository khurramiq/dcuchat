import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import "./style.css";

const CurrentUserInfo = ({ name, imgUrl, online }) => {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <span class={online ? "logged-in dot" : "logged-out dot"}>●</span>
        <ListItemAvatar>
          <Avatar alt={name} src={imgUrl} />
          {/* <span class="logged-out">●</span> */}
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              {online ? "Online" : null}
              <br />
            </React.Fragment>
          }
          className="current-user-info-text"
        />
      </ListItem>
    </div>
  );
};

export default CurrentUserInfo;
