/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory, useParams } from "react-router-dom";
import { getCourseByTitle } from "../../redux/actions/courseActions";
import { getAllChaptersByCourseTitle } from "../../redux/actions/chapterActions";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl, fbaseUrl } from "../../utils/api";
import {
  createCourseComment,
  getAllCourseComments,
  getLevel2CourseComments,
  getLevel3CourseComments,
  createLevel2CourseComment,
  createLevel3CourseComment,
} from "../../redux/actions/courseCommentActions";
import {
  enrollToCourse,
  updateRecentCourse,
} from "../../redux/actions/userActions";

import "./style.css";
import CourseContentChapter from "./components/course_content_chapter";
import CourseSharing from "./components/course_sharing";
import CommentComponent from "../../components/commentComponent";
import { convertFromRaw, Editor, EditorState } from "draft-js";

const CourseDetail = () => {
  let { courseTitle } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const _ad = useSelector((state) => state.ad);
  const [adsLeft, setAdsLeft] = useState([]);
  const [adsRight, setAdsRight] = useState([]);
  const _course = useSelector((state) => state.course);
  const _chapter = useSelector((state) => state.chapter);
  const _User = useSelector((state) => state.User);
  const _courseComment = useSelector((state) => state.courseComment);
  const [courseCompletedLessons, setCourseCompletedLessons] = useState([]);
  const [recentLesson, setRecentLesson] = useState(null);
  const [updateAccess, setUpdateAccess] = useState(false);
  const [startedLearning, setStartedLearning] = useState(new Date());
  const [courseAccessType, setCourseAccessType] = useState("automatic");

  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  useEffect(() => {
    let primaryAdsArray = [];
    let secondryAdsArray = [];
    for (let i = 0; i < _ad.data.length; i++) {
      if (_ad.data[i].adPosition === "primary") {
        primaryAdsArray.push(_ad.data[i]);
      } else {
        secondryAdsArray.push(_ad.data[i]);
      }
    }
    setAdsLeft(primaryAdsArray);
    setAdsRight(secondryAdsArray);
  }, [_ad.data]);

  const [comment, setComment] = useState({
    course: _course.courseByTitle._id,
    comment: "",
    parentCommentId: null,
    likes: 0,
    disLikes: 0,
    status: "underReview",
  });

  const [replyComment, setReplyComment] = useState({
    course: _course.courseByTitle._id,
    comment: "",
    parentCommentId: "",
    likes: 0,
    disLikes: 0,
    status: "underReview",
  });
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    dispatch(getAllChaptersByCourseTitle(courseTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCourseByTitle(courseTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTitle]);

  useEffect(() => {
    for (let i = 0; i < _User.profile.coursesEnrolled?.length; i++) {
      if (
        _course.courseByTitle._id ===
        _User.profile?.coursesEnrolled[i]?.course?.course
      ) {
        setCourseCompletedLessons(
          _User.profile?.coursesEnrolled[i]?.course.lessonsCompleted
        );
        setRecentLesson(_User.profile?.coursesEnrolled[i]?.course.recentLesson);
        setUpdateAccess(_User.profile?.coursesEnrolled[i]?.course.updateAccess);
        setCourseAccessType(_course.courseByTitle.courseAccess);
        setStartedLearning(
          _User.profile?.coursesEnrolled[i]?.course.startedLearning
        );
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_course.courseByTitle]);

  const resetLevelOneComent = () => {
    setComment({
      course: _course.courseByTitle._id,
      comment: "",
      parentCommentId: null,
      likes: 0,
      disLikes: 0,
      status: "underReview",
    });
  };

  const showDescription = () => {
    if (_course.courseByTitle.description) {
      let contentState;
      let editorState;
      contentState = convertFromRaw(
        JSON.parse(_course.courseByTitle.description)
      );
      editorState = EditorState.createWithContent(contentState);
      return <Editor editorState={editorState} readOnly={true} />;
    }
  };

  const isCourseEnrolled = (courseId) => {
    for (let i = 0; i < _User.profile.coursesEnrolled?.length; i++) {
      if (courseId === _User.profile?.coursesEnrolled[i]?.course?.course) {
        return true;
      }
    }
    return false;
  };

  const enrollToTheCourse = () => {
    dispatch(enrollToCourse({ course: _course.courseByTitle._id }));
  };

  const learn_Now = () => {
    dispatch(updateRecentCourse({ course: _course.courseByTitle._id }));
    history.push("/my-learning");
  };

  const shouldStudentEnroll = () => {
    if (_course.courseByTitle.courseAccess === "Closed") {
      return false;
    } else {
      return true;
    }
  };

  const shouldStudentLearn = () => {
    if (_course.courseByTitle.courseAccess === "Manual") {
      if (updateAccess) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden"}}>
      {_course.loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span>
            <CircularProgress />
          </span>
        </div>
      ) : (
        <>
          <Grid container xs={12}>
            <Grid item xs={12} sm={3}>
            <Slider {...settings}>
            {adsLeft.map((item, i) => (
              <div className="courses_page_side_image_wrapper" key={i}>
                <a href={item.adPageURL} target="_blank">
                  <img
                    src={
                      item.url !== ""
                        ? `${baseUrl}/public/advertisements/${item.adPosition}/${item.url}`
                        : null
                    }
                    className="course_card_img"
                    alt={item.title}
                  />
                </a>
                <h1 className="ad_title">{item.title}</h1>
              </div>
            ))}
          </Slider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="course_detail_middlearea_wrapper">
                {!shouldStudentLearn() ? (
                  <h2>
                    * You will be able to access the lessons when the teacher
                    allows you to learn. You will receive notification as soon
                    as the teacher allows you to start learning *
                  </h2>
                ) : null}
                <h2 className="course_detail_title">
                  {_course.courseByTitle.title}
                </h2>
                <p className="course_detail_teacher_name">
                  By: [{" "}
                  {_course.courseByTitle.teachers
                    ? _course.courseByTitle.teachers.map(
                        (teacher) => teacher.name + ", "
                      )
                    : null}
                  ]
                </p>
                {showDescription()}
                {isCourseEnrolled(_course.courseByTitle._id) ? (
                  <Button
                    variant="outlined"
                    style={
                      shouldStudentLearn()
                        ? { color: "#ff8c00", borderColor: "#ff8c00" }
                        : null
                    }
                    onClick={() => learn_Now()}
                    disabled={shouldStudentLearn() ? false : true}
                  >
                    Learn Now
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    style={
                      shouldStudentEnroll()
                        ? {
                            color: "#fff",
                            borderColor: "#ff8c00",
                            backgroundColor: "#ff8c00",
                          }
                        : null
                    }
                    onClick={() => enrollToTheCourse()}
                    disabled={shouldStudentEnroll() ? false : true}
                  >
                    Enroll Now
                  </Button>
                )}
                <h2 className="course_detail_content_heading">
                  Here is course content:{" "}
                </h2>
                {!_chapter.loading ? (
                  _chapter.chByTitle.map((item, i) => (
                    <CourseContentChapter
                      chapter={item}
                      chapterIndex={i}
                      isCourseEnrolled={isCourseEnrolled(
                        _course.courseByTitle._id
                      )}
                      courseCompletedLessons={courseCompletedLessons}
                      updateAccess={updateAccess}
                      courseAccessType={courseAccessType}
                      startedLearning={startedLearning}
                      recentLesson={recentLesson}
                    />
                  ))
                ) : (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <span>
                      <CircularProgress />
                    </span>
                  </div>
                )}
                <Grid container xs={12}>
                  <Grid item xs={12} sm={12}>
                      <CourseSharing shareUrl={`${fbaseUrl}/courses/${courseTitle}`}/>
                  </Grid>
                </Grid>
                <div>
                  <CommentComponent
                    websiteRCourseRLessonTitle={_course.courseByTitle.title}
                    createComment={createCourseComment}
                    getAllComments={getAllCourseComments}
                    comment={comment}
                    setComment={setComment}
                    resetLevelOneComent={resetLevelOneComent}
                    totalComments={_courseComment.totalComentCount}
                    _comment={_courseComment}
                    createLevel2Comment={createLevel2CourseComment}
                    replyComment={replyComment}
                    setReplyComment={setReplyComment}
                    getLevel2Comments={getLevel2CourseComments}
                    createLevel3Comment={createLevel3CourseComment}
                    getLevel3Comments={getLevel3CourseComments}
                    courseOrLessonId={_course.courseByTitle._id}
                    commentLevel="course"
                    course={_course.courseByTitle}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
            <Slider {...settings}>
            {adsRight.map((item, i) => (
              <div className="courses_page_side_image_wrapper" key={i}>
                <a href={item.adPageURL} target="_blank">
                  <img
                    src={
                      item.url !== ""
                        ? `${baseUrl}/public/advertisements/${item.adPosition}/${item.url}`
                        : null
                    }
                    className="course_card_img"
                    alt={item.title}
                  />
                </a>
                <h1 className="ad_title">{item.title}</h1>
              </div>
            ))}
          </Slider>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
