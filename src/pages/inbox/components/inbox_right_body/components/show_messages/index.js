import React from "react";
import MessageLeft from "../left_message";
import MessageRight from "../message_right";

const ShowMessages = ({ messages, scrollRef, user }) =>
  messages.map((m, i) =>
    m.sender === user._id ? (
      <div ref={scrollRef}>
        <MessageRight
          imgUrl={m.imgUrl}
          message={m.text}
          datetime={m.createdAt}
        />
      </div>
    ) : (
      <div ref={scrollRef}>
        <MessageLeft
          imgUrl={m.imgUrl}
          message={m.text}
          datetime={m.createdAt}
        />
      </div>
    )
  );

export default ShowMessages;
