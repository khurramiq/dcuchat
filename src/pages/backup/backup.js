import React, { useState, useEffect, lazy } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useHistory, useParams } from "react-router-dom";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getChapterByTitle } from "../../redux/actions/chapterActions";
import {
  getLessonsByChapterTitle,
  getLessonsByChapterId,
  getLessonByTitle,
} from "../../redux/actions/lessonActions";
import {
  createLessonComment,
  getAllLessonComments,
  getLevel2LessonComments,
  getLevel3LessonComments,
  createLevel2LessonComment,
  createLevel3LessonComment,
} from "../../redux/actions/lessonCommentActions";
import { getCourseByTitle } from "../../redux/actions/courseActions";
import { getAllChaptersByCourseTitle } from "../../redux/actions/chapterActions";
import "./style.css";
import LessonDetailQuestions from "./components/lesson_detail_questions";
import LessonDetailAnswers from "./components/lesson_detail_answers";
import LessonDetailRightSideAccordion from "./components/lesson_detail_rightside_accordion";
import { baseUrl } from "../../utils/api";
import CommentComponent from "../../components/commentComponent";
import VideoPlayer from "../../components/VideoPlayer";

const Tab1 = lazy(() => import("./components/tab1"));

const LessonDetail = () => {
  let history = useHistory();
  let { courseTitle, chapterTitle, lessonTitle } = useParams();
  const dispatch = useDispatch();
  const _lesson = useSelector((state) => state.lesson);
  const _course = useSelector((state) => state.course);
  const _chapter = useSelector((state) => state.chapter);
  const _quiz = useSelector((state) => state.quiz);
  const _lessonComment = useSelector((state) => state.lessonComment);
  const [lessons, setLessons] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [index, setIndex] = useState(0);
  const [chapterChanged, setChapterChanged] = useState(false);
  const [nextChapterTitle, setNextChapterTitle] = useState("");
  const [lessonIndex, setLessonIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [showAnswers, setShowAnswers] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  useEffect(() => {
    dispatch(getChapterByTitle(chapterTitle));
    dispatch(getLessonByTitle(lessonTitle));
    dispatch(getCourseByTitle(courseTitle));
    dispatch(getLessonsByChapterTitle(chapterTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTitle, chapterTitle, lessonTitle]);

  let course = _course.courseByTitle;
  let chapter = _chapter.chapterByTitle;
  let lesson = _lesson.lessonByTitle;

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

  useEffect(() => {
    dispatch(getLessonsByChapterId(chapter._id));
    dispatch(getAllChaptersByCourseTitle(courseTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chapterChanged) {
      history.push(
        `/courses/${courseTitle}/chapters/${nextChapterTitle}/lessons/${nextlesson()}`
      );
      setShowAnswers(false);
      setShowQuestions(true);
      setChapterChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterChanged]);

  const lessonsByChapter = (allLessons, lessonsArrayInChapter) => {
    let temp = [];
    if (allLessons.length > 0 && lessonsArrayInChapter.length > 0) {
      for (let i = 0; i < allLessons.length; i++) {
        for (let j = 0; j < lessonsArrayInChapter.length; j++) {
          if (allLessons[i]._id === lessonsArrayInChapter[j].lesson) {
            temp.push(allLessons[i]);
          }
        }
      }
    }
    return temp;
  };

  useEffect(() => {
    if (chapter.lessons) {
      setLessons(lessonsByChapter(_lesson.data, chapter.lessons));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson.data, chapter.lessons]);

  const quizesByLesson = (allQuizes, quizesArray) => {
    let temp = [];
    if (allQuizes.length > 0 && quizesArray.length > 0) {
      for (let i = 0; i < allQuizes.length; i++) {
        for (let j = 0; j < quizesArray.length; j++) {
          if (allQuizes[i]._id === quizesArray[j].quiz) {
            temp.push(allQuizes[i]);
          }
        }
      }
    }
    return temp;
  };

  useEffect(() => {
    if (lesson.quizes) {
      if (lesson.quizes.length > 0) {
        setQuizes(quizesByLesson(_quiz.data, lesson.quizes));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_quiz.data, lesson.quizes]);

  for (let i = 0; i < _course.data.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (_course.data[i].title == courseTitle) {
      course = _course.data[i];
    }
  }

  for (let i = 0; i < _lesson.data.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (_lesson.data[i].lessonTitle == lessonTitle) {
      lesson = _lesson.data[i];
    }
  }

  const handleNextQuestion = () => {
    setIndex(index + 1);
  };

  const handleBackQuestion = () => {
    setIndex(index - 1);
  };

  const handleShowAnswers = () => {
    setIndex(0);
    setShowAnswers(true);
    setShowQuestions(false);
  };

  const handleShowQuestions = (lesson_Index) => {
    setIndex(0);
    setLessonIndex(lesson_Index);
    setShowAnswers(false);
    setShowQuestions(true);
  };

  const lessonNumber = () => {
    if (lessons.length > 0) {
      for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].lessonTitle === lessonTitle) {
          return i;
        }
      }
    }
  };

  const chapterNumber = () => {
    if (_chapter.chByTitle.length > 0) {
      for (let i = 0; i < _chapter.chByTitle.length; i++) {
        if (chapterTitle === _chapter.chByTitle[i].title) {
          return i + 1;
        }
      }
    }
  };

  const previousChapter = () => {
    if (_chapter.chByTitle.length > 0) {
      for (let i = 0; i < _chapter.chByTitle.length; i++) {
        if (_chapter.chByTitle[i].title === chapterTitle) {
          setNextChapterTitle(_chapter.chByTitle[i - 1].title);
          return _chapter.chByTitle[i - 1];
        }
      }
    }
  };

  const handleBackLesson = () => {
    if (lessonIndex - 1 === -1 && chapterNumber() > 1) {
      setLessons(lessonsByChapter(_lesson.data, previousChapter().lessons));
      setLessonIndex(previousChapter().lessons.length - 1);
      setChapterChanged(true);
    } else {
      setLessonIndex(lessonNumber() - 1);
      history.push(
        `/courses/${courseTitle}/chapters/${chapterTitle}/lessons/${
          lessons[lessonNumber() - 1].lessonTitle
        }`
      );
      setShowAnswers(false);
      setShowQuestions(true);
    }
  };

  const nextChapter = () => {
    if (lessonIndex + 1 === lessons.length) {
      for (let i = 0; i < _chapter.chByTitle.length; i++) {
        if (_chapter.chByTitle[i].title === chapterTitle) {
          setNextChapterTitle(_chapter.chByTitle[i + 1].title);
          return _chapter.chByTitle[i + 1];
        }
      }
    } else {
      return chapterTitle;
    }
  };

  const nextlesson = () => {
    if (chapterChanged) {
      return lessons[lessonIndex].lessonTitle;
    } else {
      return lessons[lessonNumber() + 1].lessonTitle;
    }
  };

  const handleNextLesson = () => {
    if (lessonIndex + 1 === lessons.length) {
      setLessons(lessonsByChapter(_lesson.data, nextChapter().lessons));
      setLessonIndex(0);
      setChapterChanged(true);
    } else {
      setLessonIndex(lessonNumber() + 1);
      history.push(
        `/courses/${courseTitle}/chapters/${nextChapter()}/lessons/${nextlesson()}`
      );
      setShowAnswers(false);
      setShowQuestions(true);
    }
  };

  const showContentTexts = () => {
    let contentState1, contentState2, contentState3, contentState4;
    let editorState1, editorState2, editorState3, editorState4;
    let output = [];
    if (lesson?.lessonContent1?.text) {
      if (lesson.lessonContent1?.richText !== "") {
        contentState1 = convertFromRaw(
          JSON.parse(lesson.lessonContent1?.richText)
        );
        editorState1 = EditorState.createWithContent(contentState1);
        output.push(<Editor editorState={editorState1} readOnly={true} />);
      }
    } else if (lesson?.lessonContent1?.videoUrl !== "") {
      output.push(
        <VideoPlayer
          url={`${baseUrl}/public/videos/${lesson.lessonContent1?.videoUrl}`}
        />
      );
    }
    if (lesson?.lessonContent2?.text) {
      if (lesson.lessonContent2?.richText !== "") {
        contentState2 = convertFromRaw(
          JSON.parse(lesson.lessonContent2?.richText)
        );
        editorState2 = EditorState.createWithContent(contentState2);
        output.push(<Editor editorState={editorState2} readOnly={true} />);
      }
    } else if (lesson?.lessonContent2?.videoUrl !== "") {
      output.push(
        <VideoPlayer
          url={`${baseUrl}/public/videos/${lesson?.lessonContent2?.videoUrl}`}
        />
      );
    }
    if (lesson?.lessonContent3?.text) {
      if (lesson.lessonContent3?.richText !== "") {
        contentState3 = convertFromRaw(
          JSON.parse(lesson.lessonContent3?.richText)
        );
        editorState3 = EditorState.createWithContent(contentState3);
        output.push(<Editor editorState={editorState3} readOnly={true} />);
      }
    } else if (lesson?.lessonContent3?.videoUrl !== "") {
      output.push(
        <VideoPlayer
          url={`${baseUrl}/public/videos/${lesson?.lessonContent3?.videoUrl}`}
        />
      );
    }
    if (lesson?.lessonContent4?.text) {
      if (lesson.lessonContent2?.richText !== "") {
        contentState4 = convertFromRaw(
          JSON.parse(lesson?.lessonContent4?.richText)
        );
        editorState4 = EditorState.createWithContent(contentState4);
        output.push(<Editor editorState={editorState4} readOnly={true} />);
      }
    } else if (lesson?.lessonContent4?.videoUrl !== "") {
      output.push(
        <VideoPlayer
          url={`${baseUrl}/public/videos/${lesson?.lessonContent4?.videoUrl}`}
        />
      );
    }
    return output;
  };

  return (
    <>
      <Grid container xs={12}>
        <Grid item xs={12} sm={3}>
          <div className="lesson_detail_side_image_wrapper">
            <img
              src={`${baseUrl}/public/${course.featuredImage}`}
              className="lesson_detail_side_img"
              alt="cyril"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {true ? (
            <div className="lesson_detail_middlearea_wrapper">
              <h2 className="lesson_detail_title">
                Lesson {lessonNumber() + 1}: {lessonTitle}
              </h2>
              <h3 className="chapter_detail_title">
                Chapter {chapterNumber()}: {chapterTitle}{" "}
                <span>by keith Smith, John Doe</span>
              </h3>
              {showContentTexts()}
              {showQuestions && (
                <LessonDetailQuestions
                  index={index}
                  lesson={lesson}
                  handleBackQuestion={handleBackQuestion}
                  handleNextQuestion={handleNextQuestion}
                  handleShowAnswers={handleShowAnswers}
                />
              )}
              {showAnswers && <LessonDetailAnswers quizQuestions={quizes} />}
              <Grid container xs={12} sm={12}>
                <Grid item xs={6} sm={6}>
                  {(lessonNumber() > 0 || chapterNumber() > 1) && (
                    <Button
                      variant="outlined"
                      style={{ color: "#1976D2", borderColor: "#1976D2" }}
                      onClick={() => handleBackLesson()}
                    >
                      Previous Lesson
                    </Button>
                  )}
                </Grid>
                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                  {!(
                    chapterNumber() === _chapter.chByTitle.length &&
                    lessonIndex + 1 === lessons.length
                  ) && (
                    <Button
                      variant="outlined"
                      style={{ color: "#1976D2", borderColor: "#1976D2" }}
                      onClick={() => handleNextLesson()}
                    >
                      Next Lesson
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>
                <CircularProgress />
              </span>
            </div>
          )}
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
              commentLevel="lesson"
              course={null}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <LessonDetailRightSideAccordion
            courseTitle={courseTitle}
            handleShowQuestions={handleShowQuestions}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LessonDetail;
