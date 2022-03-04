/* eslint-disable react/jsx-no-target-blank */
import React, { lazy, useEffect, useState } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import "./style.css";
import CourseCard from "./components/course_card";
import { getAllCourses } from "../../redux/actions/courseActions";
import {
  createComment,
  getAllComments,
  createLevel2Comment,
  getLevel2Comments,
  createLevel3Comment,
  getLevel3Comments,
} from "../../redux/actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseUrl } from "../../utils/api";
// import CommentComponent from "../../components/commentComponent";
const CommentComponent = lazy(() =>
  import("../../components/commentComponent")
);

const Courses = () => {
  const dispatch = useDispatch();
  const _ad = useSelector((state) => state.ad);
  const _course = useSelector((state) => state.course);
  const _comment = useSelector((state) => state.comment);
  const _User = useSelector((state) => state.User);
  const [adsLeft, setAdsLeft] = useState([]);
  const [adsRight, setAdsRight] = useState([]);
  const [comment, setComment] = useState({
    comment: "",
    parentCommentId: null,
    likes: 0,
    disLikes: 0,
    status: "underReview",
  });

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const [replyComment, setReplyComment] = useState({
    comment: "",
    parentCommentId: comment._id,
    likes: 0,
    disLikes: 0,
    status: "underReview",
  });

  useEffect(() => {
    dispatch(getAllCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let primaryAdsArray = [];
    let secondryAdsArray = [];
    for (let i = 0; i < _ad.data.length; i++) {
      if (_ad.data[i].adPosition === "primary") {
        primaryAdsArray.push(_ad.data[i]);
      } else {
        secondryAdsArray.push(_ad.data[i]);
      }
    }
    setAdsLeft(primaryAdsArray);
    setAdsRight(secondryAdsArray);
  }, [_ad.data]);

  const resetLevelOneComent = () => {
    setComment({
      comment: "",
      parentCommentId: null,
      likes: 0,
      disLikes: 0,
      status: "underReview",
    });
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <Grid container xs={12}>
        <Grid item xs={12} sm={3}>
          <Slider {...settings}>
            {adsLeft.map((item, i) => (
              <div className="courses_page_side_image_wrapper" key={i}>
                <a href={item.adPageURL} target="_blank">
                  <img
                    src={
                      item.url !== ""
                        ? `${baseUrl}/public/advertisements/${item.adPosition}/${item.url}`
                        : null
                    }
                    className="course_card_img"
                    alt={item.title}
                  />
                </a>
                <h1 className="ad_title">{item.title}</h1>
              </div>
            ))}
          </Slider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="courses_page_middlearea_wrapper">
            <h1 className="courses_page_heading">Courses</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              inventore, minus deserunt quisquam nam officiis a, voluptatibus
              tenetur vel nihil voluptate nobis. Aut nesciunt eius tempora
              suscipit recusandae nam eveniet dolore ex, voluptatibus earum
              eaque amet animi, illo harum deserunt, alias deleniti eligendi
              similique nulla officia neque? Ab, accusantium dicta aliquam
              laboriosam consequatur aliquid illo cupiditate quas nostrum illum
              ducimus suscipit sequi quaerat, architecto repellendus quidem
              inventore adipisci aperiam magni? Quam minus expedita tenetur
              corrupti a consectetur, cum omnis quidem delectus, sapiente at, et
              qui earum modi. Totam id maiores accusamus necessitatibus iste cum
              libero numquam vitae veritatis obcaecati aliquid voluptatem, et
              illo, placeat ratione nobis hic! Molestias culpa quibusdam
              repellat, sapiente nostrum nemo ad vel, deserunt sit magni
              pariatur.
            </p>
            {!_course.loading ? (
              <Grid container xs={12}>
                {_course.data.length > 0
                  ? _course.data.map(
                      (course, i) =>
                        course.status !== "Draft" && (
                          <Grid item xs={12} sm={6}>
                            <CourseCard course={course} />
                          </Grid>
                        )
                    )
                  : null}
              </Grid>
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>
                  <CircularProgress />
                </span>
              </div>
            )}
          </div>
          {_User.isProfile ? (
            <div>
              <CommentComponent
                websiteRCourseRLessonTitle="xxx website"
                createComment={createComment}
                getAllComments={getAllComments}
                comment={comment}
                setComment={setComment}
                resetLevelOneComent={resetLevelOneComent}
                totalComments={_comment.totalComentCount}
                _comment={_comment}
                createLevel2Comment={createLevel2Comment}
                replyComment={replyComment}
                setReplyComment={setReplyComment}
                getLevel2Comments={getLevel2Comments}
                createLevel3Comment={createLevel3Comment}
                getLevel3Comments={getLevel3Comments}
                commentLevel="app"
                course={null}
              />
            </div>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={3}>
          <Slider {...settings}>
            {adsRight.map((item, i) => (
              <div className="courses_page_side_image_wrapper" key={i}>
                <a href={item.adPageURL} target="_blank">
                  <img
                    src={
                      item.url !== ""
                        ? `${baseUrl}/public/advertisements/${item.adPosition}/${item.url}`
                        : null
                    }
                    className="course_card_img"
                    alt={item.title}
                  />
                </a>
                <h1 className="ad_title">{item.title}</h1>
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </div>
  );
};

export default Courses;
