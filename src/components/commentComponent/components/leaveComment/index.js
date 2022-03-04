import React from "react";
import { Button, TextareaAutosize } from "@material-ui/core";

const LeaveComent = ({ comment, handleField, saveComment }) => {
  return (
    <div>
      <h1 className="leave-coment-text">Leave Your Comment:</h1>
      <TextareaAutosize
        aria-label="minimum height"
        name="comment"
        value={comment.comment}
        onChange={handleField}
        rowsMin={10}
        style={{ width: "100%" }}
      />
      <div className="leave-comment-actions-wrapper">
        <Button
          variant="outlined"
          size="small"
          className="my_btn"
          style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          onClick={() => saveComment(comment)}
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default LeaveComent;
