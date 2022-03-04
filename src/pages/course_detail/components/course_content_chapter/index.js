import React, { useEffect, useState } from "react";
import ChapterHeading from "../chapter_heading";
import ChapterLesson from "../chapter_lesson";
import { getLessonsByChapterId } from "../../../../redux/actions/lessonActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.css";

const CourseContentChapter = ({
  chapter,
  chapterIndex,
  isCourseEnrolled,
  courseCompletedLessons,
  updateAccess,
  courseAccessType,
  startedLearning,
  recentLesson,
}) => {
  let { courseTitle } = useParams();
  const dispatch = useDispatch();
  const _lesson = useSelector((state) => state.lesson);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    dispatch(getLessonsByChapterId(chapter._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const isLessonCompleted = (lessonId) => {
    for (let i = 0; i < courseCompletedLessons.length; i++) {
      // check is lesson completed
      if (lessonId === courseCompletedLessons[i].lesson) {
        return true;
      }
    }
    return false;
  };
  const shouldLessonsLearn = (lessonId) => {
    if (isCourseEnrolled) {
      if (courseAccessType === "Automatic") {
        if (recentLesson === lessonId || isLessonCompleted(lessonId)) {
          return true;
        }
      } else if (courseAccessType === "Manual") {
        if (updateAccess) {
          if (recentLesson === lessonId || isLessonCompleted(lessonId)) {
            return true;
          }
        } else {
          return false;
        }
      } else if (courseAccessType === "Closed") {
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <div className="course_content_chapter_wrapper">
      <>
        <ChapterHeading
          chapterNo={`Chapter ${chapterIndex + 1}`}
          chapterTitle={chapter.title}
        />
        {lessons.map((l, index) => (
          <ChapterLesson
            lessonNo={`Lesson ${index + 1}`}
            chapterTitle={chapter.title}
            courseTitle={courseTitle}
            lessonTitle={l.lessonTitle}
            lesson={l}
            completed={!isCourseEnrolled ? false : isLessonCompleted(l._id)}
            shouldLessonsLearn={shouldLessonsLearn}
            startedLearning={startedLearning}
          />
        ))}
      </>
    </div>
  );
};

export default CourseContentChapter;
