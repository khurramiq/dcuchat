import React from "react";
import CustomizedCheckBox from "../customized_checkbox";

const Teachers = ({ item, i, course, setCourse }) => {
  const isExistInTeachersArray = (teacherId) => {
    let flag = false;
    for (let i = 0; i < course.teachers.length; i++) {
      if (course.teachers[i].teacher === teacherId) {
        flag = true;
        return flag;
      }
    }
    return flag;
  };
  const addTeacherToTeachersArray = (teacherId) => {
    if (isExistInTeachersArray(teacherId)) {
      let newArray = course.teachers.filter(
        (item) => item.teacher !== teacherId
      );
      setCourse({ ...course, teachers: newArray });
      return false;
    } else {
      setCourse({
        ...course,
        teachers: [...course.teachers, {
          teacher: teacherId, name: item.name
        }],
      });
    }
  };
  return (
    <p key={i}>
      <CustomizedCheckBox
        checked={isExistInTeachersArray(item._id)}
        onChange={() => addTeacherToTeachersArray(item._id)}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>{item.name}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span style={{ color: "#1976D2" }}>{item.email}</span>
    </p>
  );
};

export default Teachers;
