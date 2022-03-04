import React, { useState } from "react";
import { Button, Grid, TextareaAutosize } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import Avatar from "react-avatar";
import * as moment from "moment";

const CommentInfo = ({
  reply,
  comment,
  i,
  saveComment,
  replyComment,
  setReplyComment,
  allowCommentReply,
}) => {
  const [replyTextArea, setReplyTextArea] = useState(false);

  const handleField = ({ target }) => {
    setReplyComment({ ...replyComment, [target.name]: target.value });
  };

  const saveReply = () => {
    let newReplyComment;
    newReplyComment = {
      ...replyComment,
      parentCommentId: comment._id,
    };
    saveComment(newReplyComment);
    setReplyTextArea(false);
    setReplyComment({
      ...replyComment,
      comment: "",
    });
  };
  return (
    <div key={i}>
      <Grid container xs={12}>
        <Grid item xs={12} sm={1}>
          <Avatar name="John Doe" size="40" />
        </Grid>
        <Grid item xs={12} sm={10} style={{ paddingLeft: "10px" }}>
          <span>
            John Doe <small>says:</small>
          </span>
          <br />
          {/* <i>December 29, 2021 at 7:49pm</i> */}
          <i>
            {moment(comment.createdAt).format("MMMM")}.{" "}
            {moment(comment.createdAt).format("DD")},{" "}
            {moment(comment.createdAt).format("YYYY")} at{" "}
            {moment(comment.createdAt).format("hh:mm A")}
          </i>
        </Grid>
      </Grid>
      <p>{comment.comment}</p>
      <div className="like-dislike-wrapper">
        <span>
          <ThumbUpAltIcon style={{ color: "green", cursor: "pointer" }} />{" "}
          <span>0</span>{" "}
          <ThumbDownAltIcon style={{ color: "red", cursor: "pointer" }} />{" "}
          <span>0</span>&nbsp;&nbsp;
        </span>
        {reply && allowCommentReply ? (
          <Button
            variant="outlined"
            size="small"
            className="my_btn"
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
            onClick={() => setReplyTextArea(true)}
          >
            Reply
          </Button>
        ) : null}
      </div>
      {replyTextArea && (
        <>
          <TextareaAutosize
            aria-label="minimum height"
            name="comment"
            value={replyComment.comment}
            onChange={handleField}
            rowsMin={10}
            style={{ width: "100%", marginTop: "20px" }}
          />
          <div className="leave-comment-actions-wrapper">
            <Button
              variant="outlined"
              size="small"
              className="my_btn"
              style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
              onClick={() => saveReply()}
            >
              Post Reply
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="outlined"
              size="small"
              className="my_btn"
              style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
              onClick={() => setReplyTextArea(false)}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
      {reply && (
        <>
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default CommentInfo;
