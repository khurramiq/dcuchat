import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import ProgressBar from "../progress_bar";

const ProgressCard = ({ course, update_Recent_Course }) => {
  return (
    <Paper variant="outlined" square className="mylearning-page-paper">
      <h2>{course.title}</h2>
      <span className="createdby">
        By: [{course.teachers.map((teacher, i) => teacher.name + ",")}]
      </span>{" "}
      <span className="lastviewed">Last Viewed: Jan. 13,2020</span>
      <hr />
      <Grid
        container
        xs={12}
        sm={12}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={4} sm={2}>
          <span>Your progress: </span>
        </Grid>
        <Grid item xs={8} sm={10}>
          <ProgressBar progress={course.courseProgress} />
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12}>
        <Grid item xs={6} sm={6}>
          <Button
            variant="outlined"            
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
            onClick={() => update_Recent_Course(course._id)}
          >
            {/* <Link
              to={`/courses/${course.title}/chapters/${course.chapters[0].chapterTitle}/lessons/${course.chapters[0].lessons[0].lessonTitle}`}
              style={{ textDecoration: "none", color: "#1976D2" }}
            > */}
            Learn Now
            {/* </Link> */}
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            style={{ color: "#ff8c00", borderColor: "#ff8c00" }}
          >
            <Link
              to={`/courses/${course.title}`}
              style={{ textDecoration: "none", color: "#ff8c00" }}
              onClick={() => scroll.scrollToTop()}
            >
              View More
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProgressCard;
