import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLessonsByChapterId } from "../../../../../redux/actions/lessonActions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";

const ChapterAccordion = ({ courseTitle, no, chapter, courseId }) => {
  const dispatch = useDispatch();
  const [courseCompletedLessons, setCourseCompletedLessons] = useState([]);
  const [recentLesson, setRecentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const _lesson = useSelector((state) => state.lesson);
  const _User = useSelector((state) => state.User);
  useEffect(() => {
    for (let i = 0; i < _User.profile.coursesEnrolled?.length; i++) {
      if (courseId === _User.profile?.coursesEnrolled[i]?.course?.course) {
        setCourseCompletedLessons(
          _User.profile?.coursesEnrolled[i]?.course.lessonsCompleted
        );
        setRecentLesson(_User.profile?.coursesEnrolled[i]?.course.recentLesson);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User]);

  useEffect(() => {
    dispatch(getLessonsByChapterId(chapter._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLessonCompleted = (lessonId) => {
    for (let i = 0; i < courseCompletedLessons.length; i++) {
      // check is lesson completed
      if (lessonId === courseCompletedLessons[i].lesson) {
        return true;
      }
    }
    return false;
  };

  const isLessonRecent = (lessonId) => {
    if (lessonId === recentLesson) {
      return true;
    } else {
      return false;
    }
  };

  const lessonsByChapter = (allLessons, lessonsArray) => {
    let temp = [];
    for (let i = 0; i < allLessons.length; i++) {
      for (let j = 0; j < lessonsArray.length; j++) {
        if (allLessons[i]._id === lessonsArray[j].lesson) {
          temp.push(allLessons[i]);
        }
      }
    }
    return temp;
  };

  useEffect(() => {
    setLessons(lessonsByChapter(_lesson.data, chapter.lessons));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_lesson.data, chapter.lessons]);

  return (
    <>
      <Accordion className="course_outline_accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="course_outline_accordion_sumary"
        >
          <span style={{ width: "60px", fontSize: "12px" }}>
            Chapter {no + 1}
          </span>
          &nbsp;&nbsp;&nbsp;
          <span>{chapter.title}</span>
        </AccordionSummary>
        <AccordionDetails className="course_outline_accordion_detail_o">
          {lessons.map((l, index) => (
            <div className="course_outline_accordion_detail">
              <span style={{ fontSize: "12px" }}>Lesson {index + 1}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {isLessonRecent(l._id) || isLessonCompleted(l._id) ? (
                <Link
                  to={`/courses/${courseTitle}/chapters/${chapter.title}/lessons/${l.lessonTitle}`}
                  style={{ textDecoration: "none" }}
                >
                  <span style={{ color: "#6D93A5" }}>{l.lessonTitle}</span>
                </Link>
              ) : (
                <span style={{ color: "#6D93A5" }}>{l.lessonTitle}</span>
              )}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ChapterAccordion;
