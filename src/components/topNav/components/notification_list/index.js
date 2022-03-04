import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import NotificationItem from "../notification_item";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const NotificationList = ({setOpen}) => {
  const classes = useStyles();
  const _User = useSelector((state) => state.User);

  return (
    <List className={classes.root}>
      {_User?.profile?.notifications
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((notification, i) => (
          <NotificationItem
            imgUrl="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png"
            title={notification.title}
            dateTime={notification.date}
            key={i}
            notification={notification}
            setOpen={setOpen}
            isRead={notification.count}
          />
        ))}
    </List>
  );
};
export default NotificationList;
