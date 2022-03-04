import React, { useEffect, useState } from "react";
import CommentInfo from "../commentInfo";
import { useDispatch } from "react-redux";

const LevelThreeComment = ({
  parentId,
  getLevel3Comments,
  _comment,
  courseOrLessonId,
}) => {
  const dispatch = useDispatch();
  const [level3Coments, setLevel3Coments] = useState([]);

  useEffect(() => {
    if (parentId !== null) {
      dispatch(getLevel3Comments(parentId, courseOrLessonId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < _comment.levelThreeComments.length; i++) {
      if (_comment.levelThreeComments[i].parentCommentId === parentId) {
        temp.push(_comment.levelThreeComments[i]);
      }
    }
    setLevel3Coments(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_comment.levelThreeComments]);

  return (
    <>
      {level3Coments.length > 0 && level3Coments
        ? level3Coments.map((comment, i) => (
            <div className="level-three-comment-wrapper">
              <CommentInfo reply={false} comment={comment} i={i} />
            </div>
          ))
        : null}
    </>
  );
};

export default LevelThreeComment;
