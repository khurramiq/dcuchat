import React, { useEffect, useState } from "react";
import CommentInfo from "../commentInfo";
import { useDispatch } from "react-redux";
import LevelThreeComment from "../levelThreeComment";

const LevelTwoComment = ({
  parentId,
  getLevel2Comments,
  createLevel3Comment,
  _comment,
  getLevel3Comments,
  courseOrLessonId,
  replyComment,
  setReplyComment,
  allowCommentReply,
}) => {
  const dispatch = useDispatch();
  const [level2Coments, setLevel2Coments] = useState([]);

  useEffect(() => {
    if (parentId !== null) {
      dispatch(getLevel2Comments(parentId, courseOrLessonId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId, courseOrLessonId]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < _comment.levelTwoComments.length; i++) {
      if (_comment.levelTwoComments[i].parentCommentId === parentId) {
        temp.push(_comment.levelTwoComments[i]);
      }
    }
    setLevel2Coments(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_comment.levelTwoComments]);

  const saveComment = (comment) => {
    dispatch(createLevel3Comment(comment));
  };

  return (
    <>
      {level2Coments.length > 0 && level2Coments
        ? level2Coments.map((comment, i) => (
            <div className="level-two-comment-wrapper">
              <CommentInfo
                reply={true}
                comment={comment}
                i={i}
                saveComment={saveComment}
                replyComment={replyComment}
                setReplyComment={setReplyComment}
                allowCommentReply={allowCommentReply}
              />
              <LevelThreeComment
                parentId={comment._id}
                getLevel3Comments={getLevel3Comments}
                courseOrLessonId={courseOrLessonId}
                _comment={_comment}
              />
            </div>
          ))
        : null}
    </>
  );
};

export default LevelTwoComment;
