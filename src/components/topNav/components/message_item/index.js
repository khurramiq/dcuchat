import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { baseUrl } from "../../../../utils/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const NotificationItem = ({
  conversation,
  onlineUsers,
  arrivalMessage,
  conversations,
  setConversations,
  setOpen,
}) => {
  const [user, setUser] = useState(null);
  const _User = useSelector((state) => state.User);

  let history = useHistory();

  useEffect(() => {
    const friendId = conversation?.members?.find(
      (m) => m !== _User.profile._id
    );

    const getUser = async () => {
      try {
        const res = await axios(`${baseUrl}/api/account/userById/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [_User.profile, conversation]);

  const increaseNotification = (conversation, sender) => {
    if (conversation.notifications.senderNotifications.userId === sender) {
      return {
        senderNotifications: {
          count: conversation.notifications.senderNotifications.count + 1,
          userId: conversation.notifications.senderNotifications.userId,
        },
        receiverNotifications: {
          count: conversation.notifications.receiverNotifications.count,
          userId: conversation.notifications.receiverNotifications.userId,
        },
      };
    } else {
      return {
        senderNotifications: {
          count: conversation.notifications.senderNotifications.count,
          userId: conversation.notifications.senderNotifications.userId,
        },
        receiverNotifications: {
          count: conversation.notifications.receiverNotifications.count + 1,
          userId: conversation.notifications.receiverNotifications.userId,
        },
      };
    }
  };

  useEffect(() => {
    if (arrivalMessage) {
      for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].members.includes(arrivalMessage.sender)) {
          let newArry = [...conversations];
          newArry[i] = {
            ...newArry[i],
            recentMessage: {
              ...newArry[i].recentMessage,
              sender: arrivalMessage.sender,
              text: arrivalMessage.text,
              messageCreatedAt: arrivalMessage.createdAt,
            },
            notifications: increaseNotification(newArry[i], _User.profile._id),
          };
          setConversations(newArry);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalMessage]);

  const isUserOnline = (userId) => {
    for (let i = 0; i < onlineUsers?.length; i++) {
      if (userId === onlineUsers[i]?.userId) {
        return true;
      }
    }
    return false;
  };

  const handleClick = () => {
    setOpen(false);
    history.push("/inbox");
  };

  const conv_Notifications = () => {
    if (
      conversation?.notifications?.senderNotifications?.userId ===
      _User.profile._id
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
        style={{ cursor: "pointer" }}
        onClick={() => handleClick()}
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
          <Avatar alt={user?.name} src={""} />
        </ListItemAvatar>
        <ListItemText
          primary={user?.name}
          // secondary={
          //   <>{`Me: ${message} ${moment(
          //     new Date(),
          //     "YYYYMMDD"
          //   ).fromNow()}`}</>
          // }
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {conversation?.recentMessage?.sender === _User.profile._id
                  ? "Me: "
                  : ""}
              </Typography>
              {conversation?.recentMessage?.text.length > 35
                ? conversation?.recentMessage?.text.substring(0, 35) + "..."
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
        <span>{}</span>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default NotificationItem;
