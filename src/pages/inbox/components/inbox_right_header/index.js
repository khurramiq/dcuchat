import { Grid } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import CurrentUserInfo from "./components/current_user_info";
import "./style.css";

const InboxRightHeader = ({ chatOppositUser, onlineUsers, searchedUser }) => {
  const isUserOnline = (userId) => {
    for (let i = 0; i < onlineUsers.length; i++) {
      if (userId === onlineUsers[i].userId) {
        return true;
      }
    }
    return false;
  };
  return (
    <div className="inbox-right-header-wrapper">
      <Grid container xs={12}>
        <Grid item xs={12} sm={4} className="current-user-info-wrapper">
          <CurrentUserInfo
            imgUrl=""
            name={
              searchedUser
                ? searchedUser.firstName + " " + searchedUser.lastName
                : chatOppositUser?.firstName + " " + chatOppositUser?.lastName
            }
            online={
              searchedUser
                ? isUserOnline(searchedUser?._id)
                : isUserOnline(chatOppositUser?._id)
            }
          />
        </Grid>
        <Grid item xs={12} sm={8} className="admin-chat-link"></Grid>
      </Grid>
    </div>
  );
};

export default InboxRightHeader;
