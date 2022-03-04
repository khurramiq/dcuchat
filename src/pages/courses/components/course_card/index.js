import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { baseUrl } from "../../../../utils/api";
import {
  enrollToCourse,
  updateRecentCourse,
} from "../../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "10px",
  },
  media: {
    height: 140,
  },
});

const CourseCard = ({ course }) => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const [updateAccess, setUpdateAccess] = useState(false);

  useEffect(() => {
    for (let i = 0; i < _User?.profile?.coursesEnrolled?.length; i++) {
      if (course._id === _User?.profile?.coursesEnrolled[i]?.course?.course) {
        setUpdateAccess(_User.profile?.coursesEnrolled[i]?.course.updateAccess);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User?.profile?.coursesEnrolled]);

  const isCourseEnrolled = (courseId) => {
    for (let i = 0; i < _User?.profile?.coursesEnrolled?.length; i++) {
      if (courseId === _User?.profile?.coursesEnrolled[i]?.course?.course) {
        return true;
      }
    }
    return false;
  };

  const enrollToTheCourse = (courseId) => {
    dispatch(enrollToCourse({ course: courseId }));
  };

  const learn_Now = (courseId) => {
    dispatch(updateRecentCourse({ course: courseId }));
    history.push("/my-learning");
  };

  const changeRecentCourse = (courseId) => {
    dispatch(updateRecentCourse({ course: courseId }));
    scroll.scrollToTop();
  };

  const shouldStudentsEnroll = () => {
    if (course.courseAccess === "Closed") {
      return false;
    } else {
      return true;
    }
  };

  const shouldStudentLearn = () => {
    if (course.courseAccess === "Manual") {
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
    <Card className={classes.root}>
      <CardActionArea style={{ cursor: "default" }}>
        <Link
          to={`/courses/${course.title}`}
          onClick={() => changeRecentCourse(course._id)}
        >
          <CardMedia
            className={classes.media}
            image={`${baseUrl}/public/${course.featuredImage}`}
            title="Contemplative Reptile"
          />
        </Link>
        <CardContent>
          <Typography
            gutterBottom
            variant="p"
            component="p"
            className="course-card-teacher-name"
          >
            By: [ {course.teachers.map((teacher) => teacher.name + ", ")}]
          </Typography>
          <Link
            to={`/courses/${course.title}`}
            onClick={() => changeRecentCourse(course._id)}
            className="link-anchor"
          >
            <Typography gutterBottom variant="h5" component="h2">
              {course.title}
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary" component="p">            
            To get more details about this course, click on read more button...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={`/courses/${course.title}`}
          className="link-anchor"
          onClick={() => scroll.scrollToTop()}
        >
          <Button
            variant="outlined"
            size="small"
            className="my_btn"
            style={{ borderColor: "#ff8c00", color: "#ff8c00" }}
          >
            Read More
          </Button>
        </Link>
        {isCourseEnrolled(course._id) ? (
          <Button
            variant="outlined"
            size="small"
            style={
              shouldStudentLearn()
                ? { color: "#ff8c00", borderColor: "#ff8c00" }
                : null
            }
            onClick={() => learn_Now(course._id)}
            disabled={shouldStudentLearn() ? false : true}
          >
            Learn Now
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            style={
              shouldStudentsEnroll()
                ? {
                    color: "#fff",
                    borderColor: "#ff8c00",
                    backgroundColor: "#ff8c00",
                  }
                : null
            }
            onClick={() => enrollToTheCourse(course._id)}
            disabled={shouldStudentsEnroll() ? false : true}
          >
            Enroll
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
