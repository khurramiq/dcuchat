import React from "react";
import GeneralTabItem from "./components/general_tab_item";
import { updateCourseAccess } from '../../../../../redux/actions/courseActions';
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

const General = ({ course, setCourse }) => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const update_CourseAccess = (accessOption) => {
    setCourse({ ...course, courseAccess: accessOption });
    // updte course access in db
    dispatch(updateCourseAccess({_id:course._id, courseAccess: accessOption, modifiedByName: _User.profile.name}));
  }



  var courseAccess = {
    title: "Course Access",
    radioOptions: [
      {
        value: "Automatic",
        label: " - All newly created users will be given access this course.",
        checked: course.courseAccess==='Automatic'? true : false,
      },
      {
        value: "Manual",
        label: " - Users can only access course if you grant them access.",
        checked: course.courseAccess==='Manual'? true : false,
      },
      {
        value: "Closed",
        label:
          " - Users that are currently enrolled can still access, but further enrollment or purchase is disabled.",
        checked: course.courseAccess==='Closed'? true : false,
      },
    ],
    hint:
      "This setting allows you to set how users can access this course. Users can either be given access automatically as soon as the use is created, or you can manually give them access. You can always manually remove access if you wish.",
  };
  // var unitVisibility = {
  //   title: "Unit Visibility",
  //   radioOptions: [
  //     {
  //       value: "Only Completed/Next Units Visible",
  //       label:
  //         " - Only show units that have been completed, plus the next unit that the user can start.",
  //       checked: true,
  //     },
  //     {
  //       value: "All Units Visible",
  //       label: " - All units are visible regardless of completion progress.",
  //       checked: false,
  //     },
  //   ],
  //   hint:
  //     "Can a user see all possible course units? Or must they complete previous units before seeing the next unit?",
  // };
  // var unitAdvancement = {
  //   title: "Unit Advancement",
  //   radioOptions: [
  //     {
  //       value: "Manual",
  //       label: ' - Advance manually to next unit by clicking "Next unit" link.',
  //       checked: true,
  //     },
  //     {
  //       value: "Automatic",
  //       label: " - Advance automatically when Unit is marked as complete.",
  //       checked: false,
  //     },
  //   ],
  //   hint:
  //     'This setting allows you to set how users advance to the next unit. Users can either advance to the next unit manually by clicking the "Next unit" link or automatically when a Unit is marked as complete.',
  // };
  return (
    <div>
      <GeneralTabItem item={courseAccess} makeChange={update_CourseAccess} />
      {/* <GeneralTabItem item={unitVisibility} makeChange={update_CourseAccess}/>
      <GeneralTabItem item={unitAdvancement} makeChange={update_CourseAccess}/> */}
    </div>
  );
};

export default General;
