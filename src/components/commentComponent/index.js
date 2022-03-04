import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LevelOneComment from "./components/levelOneComment";
import Header from "./components/header";
import LeaveComent from "./components/leaveComment";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

const CommentComponent = ({
  websiteRCourseRLessonTitle,
  createComment,
  getAllComments,
  comment,
  setComment,
  resetLevelOneComent,
  totalComments,
  _comment,
  createLevel2Comment,
  getLevel2Comments,
  createLevel3Comment,
  getLevel3Comments,
  courseOrLessonId,
  commentLevel,
  course,
}) => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const [limit, setLimit] = useState(10);
  const [hasmore, setHasmore] = useState(true);
  const [level1Coments, setLevel1Coments] = useState([]);
  const [allowCommentReply, setAllowCommentReply] = useState(false);

  const handleField = ({ target }) => {
    setComment({ ...comment, [target.name]: target.value });
  };

  useEffect(() => {
    if (_User.profile.role === "admin") {
      setAllowCommentReply(true);
    } else if (commentLevel === "app") {
      if (_User.profile.role === "teacher") {
        setAllowCommentReply(true);
      } else if (_User.profile.coursesEnrolled.length > 0) {
        setAllowCommentReply(true);
      }
    } else if (commentLevel === "course") {
      if (_User.profile.role === "teacher") {
        for (let i = 0; i < course?.teachers?.length; i++) {
          if (course.teachers[i].name === _User.profile.name) {
            setAllowCommentReply(true);
            break;
          }
        }
      } else if (_User.profile.coursesEnrolled.length > 0) {
        for (let i = 0; i < _User.profile.coursesEnrolled.length; i++) {
          if (_User.profile.coursesEnrolled[i].course.course === course._id) {
            setAllowCommentReply(true);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentLevel, course]);

  useEffect(() => {
    dispatch(getAllComments(limit, courseOrLessonId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseOrLessonId]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < _comment.data.length; i++) {
      if (_comment.data[i].parentCommentId === null) {
        temp.push(_comment.data[i]);
      }
    }
    setLevel1Coments(temp);
    resetLevelOneComent();
    if (parseInt(_comment.totalComentCount) < limit + 10) {
      setHasmore(false);
    } else {
      setHasmore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_comment.data]);

  const fetchMoreData = () => {
    setLimit((prevLimit) => prevLimit + 10);
    dispatch(getAllComments(limit + 10, courseOrLessonId));
  };

  const saveComment = (comment) => {
    dispatch(createComment(comment));
  };
  return (
    <div className="comment-component-wrapper">
      {totalComments > 0 && (
        <Header
          totalComments={totalComments}
          title={websiteRCourseRLessonTitle}
        />
      )}

      <InfiniteScroll
        dataLength={_comment.data.length}
        next={() => fetchMoreData()}
        hasMore={hasmore}
        loader={<h4>Loading...</h4>}
      >
        {totalComments > 0 && (
          <LevelOneComment
            level1Coments={level1Coments}
            createLevel2Comment={createLevel2Comment}
            replyComment={comment}
            setReplyComment={setComment}
            courseOrLessonId={courseOrLessonId}
            getLevel2Comments={getLevel2Comments}
            createLevel3Comment={createLevel3Comment}
            _comment={_comment}
            getLevel3Comments={getLevel3Comments}
            allowCommentReply={allowCommentReply}
          />
        )}
      </InfiniteScroll>
      {totalComments > 0 && <hr />}
      {allowCommentReply ? (
        <LeaveComent
          comment={comment}
          handleField={handleField}
          saveComment={saveComment}
        />
      ) : null}
    </div>
  );
};

export default CommentComponent;
