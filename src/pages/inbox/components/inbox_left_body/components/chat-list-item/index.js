import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { baseUrl } from "../../../../../../utils/api";
import "./style.css";

const ChatListItem = ({
  conversation,
  onlineUsers,
  currentUser,
  setChatOppositUser,
  recent,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation?.members?.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${baseUrl}/api/account/userById/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const isUserOnline = (userId) => {
    for (let i = 0; i < onlineUsers.length; i++) {
      if (userId === onlineUsers[i].userId) {
        return true;
      }
    }
    return false;
  };

  const conv_Notifications = () => {
    if (
      conversation?.notifications?.senderNotifications?.userId ===
      currentUser._id
    ) {
      return conversation?.notifications?.senderNotifications?.count;
    } else {
      return conversation?.notifications?.receiverNotifications?.count;
    }
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        className="chat-list-item"
        style={
          recent ? { backgroundColor: "#328cc1" } : { backgroundColor: "#fff" }
        }
        onClick={() => setChatOppositUser(user)}
      >
        <span
          class={
            isUserOnline(user?._id)
              ? "logged-in avotor-dot"
              : "logged-out avotor-dot"
          }
        >
          ●
        </span>
        <ListItemAvatar>
          <Avatar
            alt={user?.firstName}
            src={`${baseUrl}/public/${user?.profilePic}`}
          />
          {/* <span class="logged-out">●</span> */}
        </ListItemAvatar>
        <ListItemText
          primary={user?.firstName + " " + user?.lastName}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {conversation?.recentMessage?.sender === currentUser._id
                  ? "Me: "
                  : ""}
                &nbsp;
              </Typography>
              {conversation?.recentMessage?.text.length > 20
                ? conversation?.recentMessage?.text.substring(0, 20) + "..."
                : conversation?.recentMessage?.text}
              <br />
              <p style={{ padding: 0, margin: 0, textAlign: "right" }}>
                {format(conversation?.recentMessage?.messageCreatedAt)}{" "}
                {conv_Notifications() > 0 ? (
                  <span className="message-notification">
                    {conv_Notifications()}
                  </span>
                ) : null}
              </p>
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};

export default ChatListItem;
