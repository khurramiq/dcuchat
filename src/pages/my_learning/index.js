/* eslint-disable react/jsx-no-target-blank */
import React, { lazy, useEffect, useState } from "react";
import { Grid, makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../utils/api";
import ProfileCard from "./components/profile_card";
import { getCurrentUser } from "../../redux/actions/userActions";
const Tab2 = lazy(() => import("./components/tab2"));
const Tab1 = lazy(() => import("./components/tab1"));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    color: "#1976D2",
  },
  indicator: {
    backgroundColor: "#1976D2",
  },
});

const MyLearning = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _ad = useSelector((state) => state.ad);
  const [adsLeft, setAdsLeft] = useState([]);
  const [adsRight, setAdsRight] = useState([]);
  const [lastQuiz, setLastQuiz] = useState(false);
  var settings = {
    // dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (lastQuiz) {      
      dispatch(getCurrentUser());
      setLastQuiz(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

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

  const handleChange = (event, newValue) => {
    setTab(newValue);
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
            <div>
              <Paper className={classes.root}>
                <Tabs
                  value={tab}
                  onChange={handleChange}
                  classes={{
                    indicator: classes.indicator,
                  }}
                  textColor="#1976D2"
                  left
                  fullWidth
                >
                  <Tab label="Learn Now" />
                  <Tab label="My Profile" />
                </Tabs>
              </Paper>
              {tab === 0 ? <Tab1 setLastQuiz={setLastQuiz}/> : null}
              {tab === 1 ? (
                <>
                  <ProfileCard/>
                  <h1>COURSES ENROLLED IN:</h1>
                  <Tab2 setTab={setTab} />
                </>
              ) : null}
            </div>
          </div>
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

export default MyLearning;
