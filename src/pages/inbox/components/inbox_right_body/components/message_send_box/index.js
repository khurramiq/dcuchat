import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Grid } from "@material-ui/core";
import Picker from "emoji-picker-react";
import "./style.css";

const MessageSendBox = ({
  handleMessageChange,
  handleEmojiChange,
  newMessage,
  handleMessageSend,
  showEmojis,
  setShowEmojis,
  clear_M_notifications
}) => {
  // eslint-disable-next-line no-unused-vars
  // const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    handleEmojiChange(emojiObject?.emoji);
  };
  return (
    <div className="message-send-box-wrapper">
      <Grid container xs={12}>
        <Grid item xs={9} sm={10} className="message-send-box-left">
          <input
            type="text"
            name="message"
            className="send-message-text-field"
            placeholder="Write your message..."
            autocomplete="off"
            value={newMessage}
            onChange={(e) => handleMessageChange(e.target.value)}
            onFocus={()=>clear_M_notifications()}
          />
        </Grid>
        <Grid item xs={3} sm={2} className="message-send-box-right">
          <SentimentSatisfiedIcon
            onClick={() => setShowEmojis(!showEmojis)}
            className="emoji-icon"
          />
          &nbsp;&nbsp;&nbsp;
          <IconButton
            aria-label="send"
            style={{ backgroundColor: "#328cc1", color: "#fff" }}
            onClick={() => handleMessageSend()}
          >
            <ArrowForwardIcon />
          </IconButton>
          {showEmojis ? (
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{
                position: "absolute",
                bottom: "72px",
                left: "2px",
              }}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default MessageSendBox;
