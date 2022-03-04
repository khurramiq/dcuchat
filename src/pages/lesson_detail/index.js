/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
// import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getChapterByTitle } from "../../redux/actions/chapterActions";
import {
  getLessonsByChapterTitle,
  // getLessonsByChapterId,
  getLessonByTitle,
} from "../../redux/actions/lessonActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  createLessonComment,
  getAllLessonComments,
  getLevel2LessonComments,
  getLevel3LessonComments,
  createLevel2LessonComment,
  createLevel3LessonComment,
} from "../../redux/actions/lessonCommentActions";
import { getCourseByTitle } from "../../redux/actions/courseActions";
// import { getAllChaptersByCourseTitle } from "../../redux/actions/chapterActions";
import "./style.css";
// import LessonDetailQuestions from "./components/lesson_detail_questions";
// import LessonDetailAnswers from "./components/lesson_detail_answers";
import LessonDetailRightSideAccordion from "./components/lesson_detail_rightside_accordion";
import { baseUrl } from "../../utils/api";
import CommentComponent from "../../components/commentComponent";
// import VideoPlayer from "../../components/VideoPlayer";
import DetailArea from "./components/detail_area";

// const Tab1 = lazy(() => import("../my_learning/components/tab1"));

const LessonDetail = () => {
  // let history = useHistory();
  const dispatch = useDispatch();
  const _course = useSelector((state) => state.course);
  // const _chapter = useSelector((state) => state.chapter);
  const _lesson = useSelector((state) => state.lesson);
  const _ad = useSelector((state) => state.ad);
  // const _User = useSelector((state) => state.User);
  const _lessonComment = useSelector((state) => state.lessonComment);
  const [adsLeft, setAdsLeft] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [adsRight, setAdsRight] = useState([]);
  const [courseId, setCourseId] = useState(null);
  let { courseTitle, chapterTitle, lessonTitle } = useParams();
  useEffect(() => {
    dispatch(getChapterByTitle(chapterTitle));
    dispatch(getLessonByTitle(lessonTitle));
    dispatch(getCourseByTitle(courseTitle));
    dispatch(getLessonsByChapterTitle(chapterTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTitle, chapterTitle, lessonTitle]);

  let course = _course.courseByTitle;
  // let chapter = _chapter.chapterByTitle;
  let lesson = _lesson.lessonByTitle;

  useEffect(() => {
    setCourseId(course._id);
  }, [course]);

  var settings = {
    // dots: true,
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
    lesson: lesson._id,
    comment: "",
    parentCommentId: null,
    likes: 0,
    disLikes: 0,
    status: "underReview",
  });

  const [replyComment, setReplyComment] = useState({
    lesson: lesson._id,
    comment: "",
    parentCommentId: "",
    likes: 0,
    disLikes: 0,
    status: "underReview",
  });
  const resetLevelOneComent = () => {
    setComment({
      lesson: lesson._id,
      comment: "",
      parentCommentId: null,
      likes: 0,
      disLikes: 0,
      status: "underReview",
    });
  };

  return (
    <>
      <Grid container xs={12} style={{ width: "100%", overflowX: "hidden" }}>
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
        <Grid item xs={12} sm={6} style={{ paddingTop: "10px" }}>
          <div className="my-wrapper">            
            <DetailArea tab={0} type="lesson-detail" />
          </div>
          <div style={{ marginTop: "10px" }}>
            <CommentComponent
              websiteRCourseRLessonTitle={lessonTitle}
              createComment={createLessonComment}
              getAllComments={getAllLessonComments}
              comment={comment}
              setComment={setComment}
              resetLevelOneComent={resetLevelOneComent}
              totalComments={_lessonComment.totalComentCount}
              _comment={_lessonComment}
              createLevel2Comment={createLevel2LessonComment}
              replyComment={replyComment}
              setReplyComment={setReplyComment}
              getLevel2Comments={getLevel2LessonComments}
              createLevel3Comment={createLevel3LessonComment}
              getLevel3Comments={getLevel3LessonComments}
              courseOrLessonId={lesson._id}
              commentLevel="course"
              course={courseId}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <LessonDetailRightSideAccordion
            courseTitle={courseTitle}
            courseId={course._id}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LessonDetail;
