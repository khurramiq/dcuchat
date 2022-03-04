import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import React from "react";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //   maxWidth: '50ch',
    padding: "0 10px",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const ChatList = ({ children }) => {
  const classes = useStyles();
  return (
    <List className={classes.root} id="chat-list-wrapper">
      {children}
    </List>
  );
};

export default ChatList;
