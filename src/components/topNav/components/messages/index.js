// import { InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { Search } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
// import Controls from "../../../../pages/my_students/components/controls/Controls";
import axios from "axios";
import { useDispatch } from "react-redux";

import "../style.css";
import MessageList from "../message_list";
import { baseUrl } from "../../../../utils/api";
import { useSelector } from "react-redux";
import { messageConstants } from "../../../../redux/constants";
const { CLEAR_MESSAGE_NOTIFICATION } = messageConstants;

// click outside start
function useOuterClick(callback) {
  const innerRef = useRef();
  const callbackRef = useRef();

  // set current callback in ref, before second useEffect uses it
  useEffect(() => { // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    // read most recent callback and innerRef dom node from refs
    function handleClick(e) {
      if (
        innerRef.current && 
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []); // no need for callback + innerRef dep
  
  return innerRef; // return ref; client can omit `useRef`
}
// click outside end

const Messages = ({ open, setOpen, onlineUsers, arrivalMessage, socket }) => {  
  // click outside start
  const innerRef = useOuterClick(e => {
    if (open) {      
      setOpen(false);
    }
  });
  // click outside end
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const _message = useSelector((state) => state.message);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/conversations/` + _User.profile._id
        );
        // if (currentChat) {
        //   setConversations([
        //     currentChat,
        //     ...res.data.filter((c) => c._id !== currentChat._id),
        //   ]);
        // } else {
        // }
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const clearNotification = (conversation, sender) => {
    if (conversation.notifications.senderNotifications.userId === sender) {
      return {
        senderNotifications: {
          count: 0,
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
          count: 0,
          userId: conversation.notifications.receiverNotifications.userId,
        },
      };
    }
  };

  useEffect(() => {
    if (_message.clearMessageNotification) {
      console.log(_message.clearMessageNotification);
      for (let i = 0; i < conversations.length; i++) {
        if (conversations[i]._id === _message.clearMessageNotification?._id) {
          let newArry = [...conversations];
          newArry[i] = {
            ...newArry[i],
            notifications: clearNotification(newArry[i], _User.profile._id),
          };
          setConversations(newArry);
        }
      }
      dispatch({ type: CLEAR_MESSAGE_NOTIFICATION, payload: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_message.clearMessageNotification]);

  return (
    <div
      ref={innerRef}
      className="messages-main-wrapper"
      style={!open ? { display: "none" } : { display: "block", zIndex: -1 }}
    >
      <div className="messages-dropdown-wrapper">
        <h1 className="notification-box-title">Inbox</h1>
        {/* <Controls.Input
          style={{ width: "80%", margin: "auto", marginBottom: "5px" }}
          label="Search for a username"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
            onChange={handleSearch}
        /> */}
        <MessageList
          conversations={conversations}
          setConversations={setConversations}
          onlineUsers={onlineUsers}
          arrivalMessage={arrivalMessage}
          socket={socket}
          setOpen={setOpen}
        />
        <p className="see-all-in-inbox">
          <Link to="/inbox">See All in Inbox</Link>
        </p>
      </div>
    </div>
  );
};

export default Messages;
