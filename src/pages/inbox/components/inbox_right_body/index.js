import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import MessageLeft from "./components/left_message";
// import MessageRight from "./components/message_right";
import MessageSendBox from "./components/message_send_box";
import ShowMessages from "./components/show_messages";
import "./style.css";

const InboxRightBody = ({
  messages,
  handleSubmit,
  newMessage,
  setNewMessage,
  searchedUser,
  handleNewConversationMessage,
  clearNotifications,
  currentChat,
  totalMNotifications,
}) => {
  const _User = useSelector((state) => state.User);
  const [showEmojis, setShowEmojis] = useState(false);
  const scrollRef = useRef();

  const handleMessageChange = (v) => {    
    setNewMessage(v);
    setShowEmojis(false);
  };
  
  const clear_M_notifications = () => {
    if (totalMNotifications!==0) {
      clearNotifications(currentChat?._id, _User.profile._id,totalMNotifications);
    }
  }

  const handleEmojiChange = (v) => {
    setNewMessage(newMessage + v);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSend = () => {
    setShowEmojis(false);
    handleSubmit();
  };

  const handleNewMessageSend = () => {
    setShowEmojis(false);
    handleNewConversationMessage();
  };

  return (
    <div className="inbox-right-body-wrapper">
      <div className="messages-area">
        <ShowMessages
          messages={messages}
          scrollRef={scrollRef}
          user={_User.profile}
        />
      </div>
      <MessageSendBox
        handleMessageChange={handleMessageChange}
        handleEmojiChange={handleEmojiChange}
        newMessage={newMessage}
        handleMessageSend={
          searchedUser ? handleNewMessageSend : handleMessageSend
        }
        clear_M_notifications={clear_M_notifications}
        showEmojis={showEmojis}
        setShowEmojis={setShowEmojis}
      />
    </div>
  );
};

export default InboxRightBody;
