import React, { useEffect } from "react";

import { getAllChaptersByCourseTitle } from "../../../../redux/actions/chapterActions";
import { useDispatch, useSelector } from "react-redux";
import ChapterAccordion from "./components/chapter_accordion";

const LessonDetailRightSideAccordion = ({ courseTitle, courseId }) => {
  const dispatch = useDispatch();
  const _chapter = useSelector((state) => state.chapter);
  // const _lesson = useSelector((state) => state.lesson);

  useEffect(() => {
    dispatch(getAllChaptersByCourseTitle(courseTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="lesson_detail_rightside_accordion_wrapper"
      style={{ backgroundColor: "#fff" }}
    >
      <h2 className="course_outline_heading">Course outline</h2>
      {_chapter.chByTitle.map((chap, i) => (
        <ChapterAccordion
          courseTitle={courseTitle}
          chapter={chap}
          no={i}
          courseId={courseId}
        />
      ))}
    </div>
  );
};

export default LessonDetailRightSideAccordion;
