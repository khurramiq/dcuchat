/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import InboxLeftBody from "./components/inbox_left_body";
// import InboxLeftHeader from "./components/inbox_left_header";
import InboxRightBody from "./components/inbox_right_body";
import InboxRightHeader from "./components/inbox_right_header";
import { searchStudents, fetchAllUsers } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import "./style.css";
import { messageConstants } from "../../redux/constants";
const { MESSAGE_NOTIFICATION } = messageConstants;

const Inbox = ({ onlineUsers, arrivalMessage, socket }) => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const _message = useSelector((state) => state.message);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatOppositUser, setChatOppositUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentOpenChat, setCurrentOpenChat] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [totalMNotifications, setTotalMNotifications] = useState(0);
  const [searchText, setSearchText] = useState("");
  const scrollRef = useRef();
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    dispatch(fetchAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchedUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOppositUser]);

  const increaseNotification = (conversation, sender) => {
    setTotalMNotifications((prev) => prev + 1);
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

  const clearNotifications = async (conversationId, userId, n) => {
    const data = { conversationId, userId };
    const res = await axios.post(
      `${baseUrl}/api/conversations/clearConversation`,
      data
    );
    setCurrentChat(res.data);
    if (!_message.cMessageNotification) {
      dispatch({
        type: MESSAGE_NOTIFICATION,
        payload: n,
      });
    }
    setTotalMNotifications(0);
  };

  useEffect(() => {
    if (arrivalMessage) {
      // when receiver is open
      if (currentChat?.members.includes(arrivalMessage.sender)) {
        setCurrentChat({
          ...currentChat,
          recentMessage: {
            ...currentChat.recentMessage,
            sender: arrivalMessage.sender,
            text: arrivalMessage.text,
            messageCreatedAt: arrivalMessage.createdAt,
          },
          notifications: increaseNotification(currentChat, _User.profile._id),
        });
        setMessages((prev) => [...prev, arrivalMessage]);
      }
      // when receiver is not open
      else {
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
              notifications: increaseNotification(
                newArry[i],
                _User.profile._id
              ),
            };
            if (currentChat) {
              setConversations([
                currentChat,
                ...newArry.filter((c) => c._id !== currentChat._id),
              ]);
            } else {
              setConversations(newArry);
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalMessage]);

  useEffect(() => {
    if (!searchedUser) {
      const getConversations = async () => {
        try {
          const res = await axios.get(
            `${baseUrl}/api/conversations/` + _User.profile._id
          );
          if (currentChat) {
            setConversations([
              currentChat,
              ...res.data.filter((c) => c._id !== currentChat._id),
            ]);
          } else {
            setConversations(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User?.profile?._id, searchedUser, messages]);

  useEffect(() => {
    if (searchText.length > 0) {
      dispatch(searchStudents(searchText));
      setCurrentChat(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/messages/` + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();

    if (currentChat) {
      setConversations([
        currentChat,
        ...conversations.filter((c) => c._id !== currentChat._id),
      ]);
      setCurrentOpenChat(currentChat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  const handleNewConversationMessage = async () => {
    const message = {
      senderId: _User.profile._id,
      receiverId: searchedUser._id,
      text: newMessage,
    };

    socket.current.emit("sendMessage", {
      senderId: _User.profile._id,
      receiverId: searchedUser._id,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${baseUrl}/api/messages/new_conversation`,
        message
      );
      setMessages([...messages, res.data.message]);
      // setCurrentChat({
      //   ...res.data.conversation,
      //   recentMessage: {
      //     sender: res.data.message.sender,
      //     text: res.data.message.text,
      //     messageCreatedAt: res.data.message.createdAt,
      //   },
      // });
      setCurrentChat(res.data.conversation);
      setNewMessage("");
      setChatOppositUser(searchedUser);
      setSearchedUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const message = {
      sender: _User.profile._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== _User.profile._id
    );

    socket.current.emit("sendMessage", {
      senderId: _User.profile._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${baseUrl}/api/messages`, message);
      setMessages([...messages, res.data]);
      setCurrentChat({
        ...currentChat,
        recentMessage: {
          sender: res.data.sender,
          text: res.data.text,
          messageCreatedAt: res.data.createdAt,
        },
      });
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="inbox-main-wrapper"
      style={{ width: "100%", overflowX: "hidden" }}
    >
      <Grid container xs={12} className="inbox-wrapper">
        <Grid item xs={12} sm={3} className="inbox-left">
          {/* <InboxLeftHeader
            searchText={searchText}
            setSearchText={setSearchText}
          /> */}

          <InboxLeftBody
            searchText={searchText}
            setSearchedUser={setSearchedUser}
            setSearchText={setSearchText}
            conversations={conversations}
            setCurrentChat={setCurrentChat}
            setChatOppositUser={setChatOppositUser}
            currentOpenChat={currentOpenChat}
            onlineUsers={onlineUsers}
            clearNotifications={clearNotifications}
            setMessages={setMessages}
          />
        </Grid>
        <Grid item xs={12} sm={6} className="inbox-right">
          {currentChat || searchedUser ? (
            <>
              <InboxRightHeader
                chatOppositUser={chatOppositUser}
                onlineUsers={onlineUsers}
                searchedUser={searchedUser}
              />
              <InboxRightBody
                messages={messages}
                handleSubmit={handleSubmit}
                handleNewConversationMessage={handleNewConversationMessage}
                newMessage={newMessage}
                clearNotifications={clearNotifications}
                setNewMessage={setNewMessage}
                searchedUser={searchedUser}
                currentChat={currentChat}
                totalMNotifications={totalMNotifications}
              />
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          className="inbox-page-right-side-ad-wrapper"
        ></Grid>
      </Grid>
    </div>
  );
};

export default Inbox;
