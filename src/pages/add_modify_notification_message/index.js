import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UpdateNotificationItem from "./components/update_notification_item";
import {
  getNotificationMessages,
  updateNotificationMessages,
} from "../../redux/actions/notificationActions";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

const AddModifyNotificationMessage = () => {
  const _notification = useSelector((state) => state.notification);
  const [notificationMessages, setNotificationMessages] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotificationMessages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (_notification.notificationMessages) {
      setNotificationMessages(_notification.notificationMessages);
    }
  }, [_notification.notificationMessages]);

  const handleChangePasswordResetNotificationText = (v) => {
    setNotificationMessages({
      ...notificationMessages,
      passwordResetNotification: {
        ...notificationMessages.passwordResetNotification,
        text: v,
      },
    });
  };

  const handleUpdatePasswordResetNotificationState = () => {
    let data = {
      ...notificationMessages,
      passwordResetNotification: {
        ...notificationMessages.passwordResetNotification,
        state: !notificationMessages.passwordResetNotification.state,
      },
    };
    dispatch(updateNotificationMessages(data));
  };

  const handleChangeCourseCompletionNotificationText = (v) => {
    setNotificationMessages({
      ...notificationMessages,
      courseCompletionNotification: {
        ...notificationMessages.courseCompletionNotification,
        text: v,
      },
    });
  };
  const handleUpdateCourseCompletionNotificationState = () => {
    let data = {
      ...notificationMessages,
      courseCompletionNotification: {
        ...notificationMessages.courseCompletionNotification,
        state: !notificationMessages.courseCompletionNotification.state,
      },
    };
    dispatch(updateNotificationMessages(data));
  };
    
  const handleChangeCourseResetNotificationText = (v) => {
    setNotificationMessages({
      ...notificationMessages,
      courseResetNotification: {
        ...notificationMessages.courseResetNotification,
        text: v,
      },
    });
  };

  const handleUpdateCourseResetNotificationState = () => {
    let data = {
      ...notificationMessages,
      courseResetNotification: {
        ...notificationMessages.courseResetNotification,
        state: !notificationMessages.courseResetNotification.state,
      },
    };
    dispatch(updateNotificationMessages(data));
  };

  const updateTextForNotification = () => {
    dispatch(updateNotificationMessages(notificationMessages));
  };

  return (
    <div className="AddModifyNotification-wrapper">
      <Grid container xs={12}>
        <Grid item xs={12} sm={4}>
          <h1 className="addModifyNotificationMessage-heading">Messages</h1>
          <p className="addModifyNotificationMessage-text">
            Add/Modify Notification Messages to be sent to students
          </p>
        </Grid>
        <Grid item xs={12} sm={7}>
          <UpdateNotificationItem
            title="Password Reset Message"
            description="This notification message will be sent to a student who resets password"
            placeholder="Enter notification message for password reset"
            notification={notificationMessages?.passwordResetNotification}
            handleTextChange={handleChangePasswordResetNotificationText}
            handleStateChange={handleUpdatePasswordResetNotificationState}
            updateText={updateTextForNotification}
            />
          <UpdateNotificationItem
            title="Course Completion Message"
            description="Default message to be sent"
            placeholder="Enter notification message for course completion"
            notification={notificationMessages?.courseCompletionNotification}
            handleStateChange={handleUpdateCourseCompletionNotificationState}
            handleTextChange={handleChangeCourseCompletionNotificationText}
            updateText={updateTextForNotification}
            />
          <UpdateNotificationItem
            title="Course Reset Message"
            description="This notification message will be sent to a student when course is reset by Admin/Teacher"
            placeholder="Enter notification for password reset"
            notification={notificationMessages?.courseResetNotification}
            handleStateChange={handleUpdateCourseResetNotificationState}
            handleTextChange={handleChangeCourseResetNotificationText}
            updateText={updateTextForNotification}
            />
        </Grid>
        <Grid item xs={12} sm={1}></Grid>
      </Grid>
    </div>
  );
};

export default AddModifyNotificationMessage;
