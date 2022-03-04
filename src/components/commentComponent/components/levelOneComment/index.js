import React from "react";
import CommentInfo from "../commentInfo";
import LevelTwoComment from "../levelTwoComment";
import { useDispatch } from "react-redux";

const LevelOneComment = ({
  level1Coments,
  createLevel2Comment,
  replyComment,
  setReplyComment,
  getLevel2Comments,
  createLevel3Comment,
  _comment,
  getLevel3Comments,
  courseOrLessonId,
  allowCommentReply,
}) => {
  const dispatch = useDispatch();
  const saveComment = (comment) => {
    dispatch(createLevel2Comment(comment));
  };
  return (
    <div className="level-one-comment-wrapper">
      {level1Coments.length > 0
        ? level1Coments.map((comment, i) => (
            <>
              <CommentInfo
                reply={true}
                comment={comment}
                i={i}
                saveComment={saveComment}
                replyComment={replyComment}
                setReplyComment={setReplyComment}
                allowCommentReply={allowCommentReply}
              />
              <LevelTwoComment
                parentId={comment._id}
                getLevel2Comments={getLevel2Comments}
                courseOrLessonId={courseOrLessonId}
                createLevel3Comment={createLevel3Comment}
                _comment={_comment}
                getLevel3Comments={getLevel3Comments}
                replyComment={replyComment}
                setReplyComment={setReplyComment}
                allowCommentReply={allowCommentReply}
              />
            </>
          ))
        : null}
    </div>
  );
};

export default LevelOneComment;
