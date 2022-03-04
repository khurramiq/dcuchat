import React from "react";
// import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { baseUrl } from "../../../../../../utils/api";
// import { Typography } from "@material-ui/core";
import "./style.css";

const ChatListItem = ({ user }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        className="chat-list-item"
        style={{ backgroundColor: "#fff" }}
      >
        <span class="logged-out avotor-dot">●</span>
        <ListItemAvatar>
          <Avatar
            alt={user?.firstName}
            src={`${baseUrl}/public/${user.profilePic}`}
          />
          {/* <span class="logged-out">●</span> */}
        </ListItemAvatar>
        <ListItemText
          primary={user?.firstName + " " + user?.lastName}
          style={{ paddingTop: "15px" }}
        />
      </ListItem>
    </>
  );
};

export default ChatListItem;
