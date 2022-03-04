import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  getCourseById,
  getCourseByTitle,
  getCourseData,
} from "../../../../redux/actions/courseActions";
import {
  getChapterById,
  getChapterByTitle,
  getAllChaptersByCourseId,
} from "../../../../redux/actions/chapterActions";
import {
  getLessonById,
  getQuizzesByLessonId,
  getLessonByTitle,
  getLessonsByChapterId,
  getLessonsByChapterTitle,
} from "../../../../redux/actions/lessonActions";
import { getCurrentUser } from "../../../../redux/actions/userActions";
import VideoPlayer from "../../../../components/VideoPlayer";
import { baseUrl } from "../../../../utils/api";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import "./style.css";
import LessonDetailQuestions from "../../../lesson_detail/components/lesson_detail_questions";
import LessonDetailAnswers from "../../../lesson_detail/components/lesson_detail_answers";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { lessonConstants } from "../../../../redux/constants";
const { LASTQUIZ_ANSWER } = lessonConstants;

const DetailArea = () => {
  const dispatch = useDispatch();
  const _course = useSelector((state) => state.course);
  const _chapter = useSelector((state) => state.chapter);
  const _lesson = useSelector((state) => state.lesson);
  const _User = useSelector((state) => state.User);
  // const _quiz = useSelector((state) => state.quiz);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentLearningCourse, setCurrentLearningCourse] = useState({});
  const [currentLearningChapter, setCurrentLearningChapter] = useState({});
  const [currentLearningLesson, setCurrentLearningLesson] = useState({});
  const [chapterChanged, setChapterChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLessonQuizes, setCurrentLessonQuizes] = useState([]);
  const [currentChapterLessons, setCurrentChapterLessons] = useState([]);
  const [currentCourseChapters, setCurrentCourseChapters] = useState([]);
  const [completedLessonsOfCurrontCourse, setCompletedLessonsOfCurrontCourse] =
    useState([]);
  const [courseCompletedLessons, setCourseCompletedLessons] = useState([]);
  const [currentQuize, setCurrentQuize] = useState({});
  const [currentQuizeNo, setCurrentQuizeNo] = useState(-1);
  const [recentChapterId, setRecentChapterId] = useState("");
  const [recentLessonId, setRecentLessonId] = useState("");
  const [recentQuizId, setRecentQuizId] = useState("");
  const [lastLessonId, setLastLessonId] = useState("");
  const [lastChapterId, setLastChapterId] = useState("");
  const [changeLesson, setChangeLesson] = useState(false);
  const [nextQuizId, setNextQuizId] = useState("");
  const [nextLessonId, setNextLessonId] = useState("");
  const [nextChapterId, setNextChapterId] = useState("");
  const [quizAttemptType, setQuizAttemptType] = useState("");
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [allLessons, setAllLessons] = useState([]);
  const [adjuscentLastRecentLessonId, setAdjuscentLastRecentLessonId] =
    useState("");
  let { courseTitle, chapterTitle, lessonTitle } = useParams();
  let history = useHistory();

  useEffect(() => {
    dispatch(getChapterByTitle(chapterTitle));
    dispatch(getLessonByTitle(lessonTitle));
    dispatch(getCourseByTitle(courseTitle));
    dispatch(getCourseData(courseTitle));
    dispatch(getLessonsByChapterTitle(chapterTitle));
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTitle, chapterTitle, lessonTitle]);  

  useEffect(() => {
    setAllLessons(_course.courseData.lessons);
  }, [_course.courseData]);

  useEffect(() => {
    for (let i = 0; i < _User.profile.coursesEnrolled.length; i++) {
      if (
        _User.profile?.recentCourse ===
        _User.profile.coursesEnrolled[i].course.course
      ) {
        setRecentChapterId(
          _User.profile.coursesEnrolled[i].course.recentChapter
        );
        setRecentLessonId(_User.profile.coursesEnrolled[i].course.recentLesson);
        setRecentQuizId(_User.profile.coursesEnrolled[i].course.recentQuiz);
        setLastLessonId(_User.profile.coursesEnrolled[i].course.lastLesson);
        setLastChapterId(_User.profile.coursesEnrolled[i].course.lastChapter);
        setCourseCompleted(
          _User.profile.coursesEnrolled[i].course.courseCompleted
        );
        setCompletedLessonsOfCurrontCourse(
          _User.profile.coursesEnrolled[i].course.lessonsCompleted
        );
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.profile]);

  useEffect(() => {
    if (recentChapterId !== "" && recentLessonId !== "") {
      dispatch(getCourseById(_course.courseByTitle._id));
      dispatch(getLessonsByChapterId(_chapter.chapterByTitle._id));
      dispatch(getChapterById(_chapter.chapterByTitle._id));
      dispatch(getLessonById(_lesson.lessonByTitle._id));
      dispatch(getQuizzesByLessonId(_lesson.lessonByTitle._id));
      dispatch(getAllChaptersByCourseId(_course.courseByTitle._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    recentChapterId,
    recentLessonId,
    _course.courseByTitle,
    _chapter.chapterByTitle,
    _lesson.lessonByTitle,
  ]);

  useEffect(() => {
    setCurrentLearningCourse(_course.course_ById);
    setCurrentLearningChapter(_chapter.chapterById);
    setCurrentCourseChapters(_chapter.chaptersbycourseid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_course.course_ById, _chapter.chapterById, _chapter.chaptersbycourseid]);

  useEffect(() => {
    for (let i = 0; i < _User.profile.coursesEnrolled?.length; i++) {
      if (
        _course.courseByTitle._id ===
        _User.profile?.coursesEnrolled[i]?.course?.course
      ) {
        setCourseCompletedLessons(
          _User.profile?.coursesEnrolled[i]?.course.lessonsCompleted
        );
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_course.courseByTitle]);

  const isLessonCompleted = (lessonId) => {
    for (let i = 0; i < courseCompletedLessons.length; i++) {
      // check is lesson completed
      if (lessonId === courseCompletedLessons[i].lesson) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setCurrentLearningLesson(_lesson.lessonById);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson.lessonById]);

  useEffect(() => {
    setCurrentChapterLessons(_lesson.lessonsByChapterId);
    for (let i = 0; i < _lesson.lessonsByChapterId.length; i++) {
      // recent lesson position
      if (_lesson.lessonsByChapterId[i]._id === recentLessonId) {
        setAdjuscentLastRecentLessonId(_lesson.lessonsByChapterId[i - 1]?._id);
      }
    }
    if (chapterChanged) {
      history.push(
        `/courses/${courseTitle}/chapters/${currentLearningChapter.title}/lessons/${currentLearningLesson.lessonTitle}`
      );
      setChapterChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson.lessonsByChapterId]);

  const refreshCurrentUserProfile = () => {
    if (getNextLesson()) {
      history.push(
        `/courses/${courseTitle}/chapters/${
          currentLearningChapter.title
        }/lessons/${getNextLesson1().lessonTitle}`
      );
      setChapterChanged(false);
      dispatch(getCurrentUser());
    } else {
      if (getNextChapter()) {
        history.push(
          `/courses/${courseTitle}/chapters/${getNextChapter().title}/lessons/${
            getNextLesson1().lessonTitle
          }`
        );
        setCurrentLearningChapter(getNextChapter());
        dispatch(getLessonsByChapterId(getNextChapter()._id));
        dispatch(getLessonById(getNextChapter().lessons[0].lesson));
        dispatch(getQuizzesByLessonId(getNextChapter().lessons[0].lesson));
        dispatch(getCurrentUser());
      } else {
        dispatch(getCurrentUser());
      }
    }
  };
  const getNextLessonId = () => {
    for (let i = 0; i < currentChapterLessons?.length; i++) {
      // recent lesson position
      if (currentChapterLessons[i]._id === recentLessonId) {
        return currentChapterLessons[i + 1]?._id;
      }
    }
  };

  const getNextLesson = () => {
    for (let i = 0; i < currentChapterLessons?.length; i++) {
      // recent lesson position
      if (currentChapterLessons[i]._id === recentLessonId) {
        return currentChapterLessons[i + 1];
      }
    }
  };

  const getNextLesson1 = () => {
    for (let i = 0; i < allLessons?.length; i++) {
      // recent lesson position
      if (allLessons[i]._id === recentLessonId) {
        return allLessons[i + 1];
      }
    }
  };

  const getNextChapterId = () => {
    for (let i = 0; i < currentCourseChapters?.length; i++) {
      if (currentCourseChapters[i]._id === recentChapterId) {
        return currentCourseChapters[i + 1]?._id;
      }
    }
  };

  const getNextChapter = () => {
    for (let i = 0; i < currentCourseChapters?.length; i++) {
      if (currentCourseChapters[i]._id === recentChapterId) {
        return currentCourseChapters[i + 1];
      }
    }
  };

  const showPreviousButton = () => {
    // if there is any completed lesson
    if (completedLessonsOfCurrontCourse?.length > 0) {
      // if first lesson of the current chapter
      if (currentLearningLesson._id === currentChapterLessons[0]?._id) {
        // if first chapter of the current course
        if (currentLearningChapter._id === currentCourseChapters[0]?._id) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const showNextButton = () => {
    // if there is any completed lesson
    if (completedLessonsOfCurrontCourse?.length > 0) {
      // if current lesson equeal to recent learning lesson
      if (currentLearningLesson._id === recentLessonId) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const isLastQuiz = (currentPosition, lastPosition) => {
    if (currentPosition === lastPosition) {
      return true;
    } else {
      return false;
    }
  };

  const isLastLesson = (currentLessonId, lastLessonId) => {
    if (currentLessonId === lastLessonId) {
      return true;
    } else {
      return false;
    }
  };

  const isLastChapter = (currentChapterId, lastChapterId) => {
    if (currentChapterId === lastChapterId) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (_lesson.quizesByLessonId.length > 0) {
      setCurrentLessonQuizes(_lesson.quizesByLessonId);
      for (let i = 0; i < _lesson.quizesByLessonId.length; i++) {
        if (_lesson.quizesByLessonId[i]._id === recentQuizId) {
          setCurrentQuize(_lesson.quizesByLessonId[i]);
          setCurrentQuizeNo(i + 1);
          let last_position = _lesson.quizesByLessonId.length - 1;
          if (isLastQuiz(i, last_position)) {
            if (isLastLesson(currentLearningLesson?._id, lastLessonId)) {
              if (isLastChapter(currentLearningChapter._id, lastChapterId)) {
                setQuizAttemptType("last_chapter");
                // do something
              } else {
                setQuizAttemptType("last_lesson");
                setNextChapterId(getNextChapterId());
              }
              // do something
            } else {
              setQuizAttemptType("last_quiz");
              if (!showAnswers) {
                setNextLessonId(getNextLessonId());
              }
            }
            setNextQuizId("");
          } else {
            setQuizAttemptType("not_last_quiz");
            setNextQuizId(_lesson.quizesByLessonId[i + 1]?._id);
          }
        }
      }
      setTimeout(function () {
        setLoading(false);
      }, 2000); //wait 2 seconds
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson.quizesByLessonId, recentQuizId]);

  const showContentTexts = () => {
    let contentState1, contentState2, contentState3, contentState4;
    let editorState1, editorState2, editorState3, editorState4;
    let output = [];
    if (currentLearningLesson) {
      if (currentLearningLesson?.lessonContent1?.text) {
        if (currentLearningLesson.lessonContent1?.richText !== "") {
          contentState1 = convertFromRaw(
            JSON.parse(currentLearningLesson.lessonContent1?.richText)
          );
          editorState1 = EditorState.createWithContent(contentState1);
          output.push(<Editor editorState={editorState1} readOnly={true} />);
        }
      } else if (currentLearningLesson?.lessonContent1?.videoUrl !== "") {
        output.push(
          <VideoPlayer
            url={`${baseUrl}/public/videos/${currentLearningLesson.lessonContent1?.videoUrl}`}
          />
        );
      }
      if (currentLearningLesson?.lessonContent2?.text) {
        if (currentLearningLesson.lessonContent2?.richText !== "") {
          contentState2 = convertFromRaw(
            JSON.parse(currentLearningLesson.lessonContent2?.richText)
          );
          editorState2 = EditorState.createWithContent(contentState2);
          output.push(<Editor editorState={editorState2} readOnly={true} />);
        }
      } else if (currentLearningLesson?.lessonContent2?.videoUrl !== "") {
        output.push(
          <VideoPlayer
            url={`${baseUrl}/public/videos/${currentLearningLesson?.lessonContent2?.videoUrl}`}
          />
        );
      }
      if (currentLearningLesson?.lessonContent3?.text) {
        if (currentLearningLesson.lessonContent3?.richText !== "") {
          contentState3 = convertFromRaw(
            JSON.parse(currentLearningLesson.lessonContent3?.richText)
          );
          editorState3 = EditorState.createWithContent(contentState3);
          output.push(<Editor editorState={editorState3} readOnly={true} />);
        }
      } else if (currentLearningLesson?.lessonContent3?.videoUrl !== "") {
        output.push(
          <VideoPlayer
            url={`${baseUrl}/public/videos/${currentLearningLesson?.lessonContent3?.videoUrl}`}
          />
        );
      }
      if (currentLearningLesson?.lessonContent4?.text) {
        if (currentLearningLesson.lessonContent2?.richText !== "") {
          contentState4 = convertFromRaw(
            JSON.parse(currentLearningLesson?.lessonContent4?.richText)
          );
          editorState4 = EditorState.createWithContent(contentState4);
          output.push(<Editor editorState={editorState4} readOnly={true} />);
        }
      } else if (currentLearningLesson?.lessonContent4?.videoUrl !== "") {
        output.push(
          <VideoPlayer
            url={`${baseUrl}/public/videos/${currentLearningLesson?.lessonContent4?.videoUrl}`}
          />
        );
      }
    }
    return output;
  };

  const handleShowAnswers = () => {
    setCourseCompletedLessons([
      ...courseCompletedLessons,
      { lesson: currentLearningLesson._id },
    ]);
    if (!differenceBwCurrentLessonVRecentLesson()) {
      for (let i = 0; i < _User.profile.coursesEnrolled.length; i++) {
        // recent course position
        if (
          _User.profile?.recentCourse ===
          _User.profile.coursesEnrolled[i].course.course
        ) {
          setRecentChapterId(
            _User.profile.coursesEnrolled[i].course.recentChapter
          );
          // if course completed
          if (_User.profile.coursesEnrolled[i].course.courseCompleted) {
            setChangeLesson(false);
          } else {
            setChangeLesson(true);
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (_lesson.lastQuizAnswer) {
      handleShowAnswers();
      dispatch({ type: LASTQUIZ_ANSWER, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson.lastQuizAnswer]);

  const showPreviousLesson = () => {
    setLoading(true);
    for (let i = 0; i < currentChapterLessons.length; i++) {
      if (currentLearningLesson._id === currentChapterLessons[i]?._id) {
        // if first lesson
        if (currentLearningLesson._id === currentChapterLessons[0]?._id) {
          // change current chapter with adjusent previous chapter
          for (let i = 0; i < currentCourseChapters.length; i++) {
            // current chapter position
            if (currentLearningChapter._id === currentCourseChapters[i]?._id) {
              // if current chapter is not equal to first chapter
              if (
                currentLearningChapter._id !== currentCourseChapters[0]?._id
              ) {
                setChapterChanged(true);
                setCurrentLearningChapter(currentCourseChapters[i - 1]);
                dispatch(
                  getLessonsByChapterId(currentCourseChapters[i - 1]._id)
                );
                dispatch(
                  getLessonById(
                    currentCourseChapters[i - 1].lessons[
                      currentCourseChapters[i - 1].lessons.length - 1
                    ].lesson
                  )
                );
                dispatch(
                  getQuizzesByLessonId(
                    currentCourseChapters[i - 1].lessons[
                      currentCourseChapters[i - 1].lessons.length - 1
                    ].lesson
                  )
                );
              }
            }
          }
        } else {
          setCurrentLearningLesson(currentChapterLessons[i - 1]);
          dispatch(getQuizzesByLessonId(currentChapterLessons[i - 1]._id));
          history.push(
            `/courses/${courseTitle}/chapters/${chapterTitle}/lessons/${
              currentChapterLessons[i - 1].lessonTitle
            }`
          );
        }

        break;
      }
    }
    setShowAnswers(true);
  };
  const showNextLessonAnswers = () => {
    setLoading(true);
    for (let i = 0; i < currentChapterLessons.length; i++) {
      // if recent lesson
      if (currentChapterLessons[i]?._id === adjuscentLastRecentLessonId) {
        setShowAnswers(false);
        setCurrentLearningLesson(currentChapterLessons[i + 1]);
        dispatch(getQuizzesByLessonId(currentChapterLessons[i + 1]._id));
        break;
      } else {
        // current lesson position
        if (currentLearningLesson._id === currentChapterLessons[i]?._id) {
          // if last lesson
          if (
            currentLearningLesson._id ===
            currentChapterLessons[currentChapterLessons.length - 1]?._id
          ) {
            for (let i = 0; i < currentCourseChapters.length; i++) {
              // current chapter position
              if (
                currentLearningChapter._id === currentCourseChapters[i]?._id
              ) {
                // if current chapter is not equal to last chapter
                if (
                  currentLearningChapter._id !==
                  currentChapterLessons[currentChapterLessons.length - 1]?._id
                ) {
                  setChapterChanged(true);
                  setCurrentLearningChapter(currentCourseChapters[i + 1]);
                  dispatch(
                    getLessonsByChapterId(currentCourseChapters[i + 1]._id)
                  );
                  dispatch(
                    getLessonById(
                      currentCourseChapters[i + 1].lessons[0].lesson
                    )
                  );
                  dispatch(
                    getQuizzesByLessonId(
                      currentCourseChapters[i + 1].lessons[0].lesson
                    )
                  );
                }
              }
            }
          } else {
            setCurrentLearningLesson(currentChapterLessons[i + 1]);
            dispatch(getQuizzesByLessonId(currentChapterLessons[i + 1]._id));
            history.push(
              `/courses/${courseTitle}/chapters/${chapterTitle}/lessons/${
                currentChapterLessons[i + 1].lessonTitle
              }`
            );
          }

          setShowAnswers(true);
          break;
        }
      }
    }
  };

  const differenceBwCurrentLessonVRecentLesson = () => {
    let currentLessonPosition = -1;
    let recentLessonPosition = -1;
    for (let i = 0; i < currentChapterLessons.length; i++) {
      if (currentLearningLesson._id === currentChapterLessons[i]._id) {
        currentLessonPosition = i;
        break;
      }
    }
    for (let i = 0; i < currentChapterLessons.length; i++) {
      if (recentLessonId === currentChapterLessons[i]._id) {
        recentLessonPosition = i;
        break;
      }
    }
    if (currentLessonPosition === recentLessonPosition) {
      return false;
    } else if (currentLessonPosition < recentLessonPosition) {
      return true;
    }
  };

  return (
    <>
      {_User.profile.coursesEnrolled.length > 0 ? (
        <div>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>
                <CircularProgress />
              </span>
            </div>
          ) : (
            <>
              <h2 className="lesson_detail_title">
                Lesson {currentLearningLesson?.order}:{" "}
                {currentLearningLesson?.lessonTitle}
              </h2>
              <h3 className="chapter_detail_title">
                Chapter {currentLearningChapter?.order}:{" "}
                {currentLearningChapter?.title}
              </h3>
              <h4 className="course_detail_title">
                Course : {currentLearningCourse?.title}{" "}
                <span>
                  by{" "}
                  {currentLearningCourse?.teachers?.map(
                    (teacher) => teacher.name + ", "
                  )}
                </span>
              </h4>
              <br />
              {showContentTexts()}
              <br />
              {isLessonCompleted(currentLearningLesson._id) ? (
                <>
                  <LessonDetailAnswers quizQuestions={currentLessonQuizes} />
                </>
              ) : (
                <>
                  <LessonDetailQuestions
                    currentQuizeNo={currentQuizeNo}
                    currentQuize={currentQuize}
                    nextQuizId={nextQuizId}
                    nextLessonId={nextLessonId}
                    nextChapterId={nextChapterId}
                    quizAttemptType={quizAttemptType}
                    courseId={currentLearningCourse?._id}
                    lessonId={currentLearningLesson?._id}
                    chapterId={currentLearningChapter?._id}
                    handleShowAnswers={handleShowAnswers}
                    lastQuestionNo={currentLessonQuizes.length}
                  />
                </>
              )}
              <Grid container xs={12} sm={12}>
                <Grid item xs={6} sm={6}>
                  {showPreviousButton() && (
                    <Button
                      variant="outlined"
                      style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
                      onClick={() => showPreviousLesson()}
                    >
                      Previous Lesson
                    </Button>
                  )}
                </Grid>
                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                  {changeLesson &&
                  !courseCompleted &&
                  !differenceBwCurrentLessonVRecentLesson() ? (
                    <Button
                      variant="outlined"
                      style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
                      onClick={() => refreshCurrentUserProfile()}
                      // onClick={() => alert("No bro")}
                    >
                      Next Lesson
                    </Button>
                  ) : null}
                  {showNextButton() && (
                    <Button
                      variant="outlined"
                      style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
                      onClick={() => showNextLessonAnswers()}
                    >
                      Next Lesson
                    </Button>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </div>
      ) : (
        <p>
          To learn lesson, first you should enroll atleast one course{" "}
          <Link
            style={{ color: "#2476D2", textDecoration: "none" }}
            to="/courses"
          >
            Click here
          </Link>{" "}
          to view all courses.
        </p>
      )}
    </>
  );
};

export default DetailArea;
