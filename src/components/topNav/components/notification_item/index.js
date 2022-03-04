import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { clearNotification } from "../../../../redux/actions/userActions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userConstants } from "../../../../redux/constants";
const { SELECTED_NOTIFICATION } = userConstants;

const NotificationItem = ({
  imgUrl,
  title,
  dateTime,
  notification,
  setOpen,
  isRead,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const _User = useSelector((state) => state.User);
  const clearNotificationFromDb = () => {
    dispatch(
      clearNotification({
        userId: _User.profile._id,
        notificationId: notification._id,
      })
    );
    dispatch({ type: SELECTED_NOTIFICATION, payload: notification });
    setOpen(false);
    history.push("/notification-detail");
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        onClick={() => clearNotificationFromDb()}
        style={{ cursor: "pointer" }}
      >
        <ListItemAvatar>
          <Avatar alt={"ali"} src={imgUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <>{`${moment(dateTime).format("MMMM Do YYYY, h:mm:ss a")}`}</>
          }
        />
        {isRead ? <span className="isRead" /> : null}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default NotificationItem;
