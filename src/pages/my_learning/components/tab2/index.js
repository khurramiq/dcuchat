import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../../redux/actions/courseActions";
import { updateRecentCourse } from "../../../../redux/actions/userActions";
import ProgressCard from "../progress_card";

const Tab2 = ({ setTab }) => {
  const dispatch = useDispatch();
  const _course = useSelector((state) => state.course);
  const _User = useSelector((state) => state.User);
  const [myCourses, setMyCourses] = useState([]);
  useEffect(() => {
    dispatch(getAllCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_course.data.length > 0) {
      let temp = [];
      for (let i = 0; i < _User.profile.coursesEnrolled.length; i++) {
        for (let j = 0; j < _course.data.length; j++) {
          if (
            _User.profile.coursesEnrolled[i].course.course ===
            _course.data[j]._id
          ) {
            temp.push({
              _id: _course.data[j]._id,
              title: _course.data[j].title,
              teachers: _course.data[j].teachers,
              courseProgress:
                _User.profile.coursesEnrolled[i].course.courseProgress,
            });
          }
        }
      }
      setMyCourses(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_course.data]);
    
    const update_Recent_Course = (course) => {
        dispatch(updateRecentCourse({ course }));
      setTab(0);
      scroll.scrollToTop();
    }
  return (
    <div>
      {myCourses.map((course, i) => (
        <ProgressCard course={course} update_Recent_Course={update_Recent_Course}  />
      ))}
    </div>
  );
};

export default Tab2; 
