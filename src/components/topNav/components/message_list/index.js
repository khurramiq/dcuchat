import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MessageItem from "../message_item";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const NotificationList = ({
  conversations,
  onlineUsers,
  arrivalMessage,
  socket,
  setConversations,
  setOpen
}) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {conversations.map((c, i) => (
        <MessageItem
          conversation={c}
          onlineUsers={onlineUsers}
          arrivalMessage={arrivalMessage}
          socket={socket}
          conversations={conversations}
          setConversations={setConversations}
          setOpen={setOpen}
        />
      ))}
    </List>
  );
};
export default NotificationList;
