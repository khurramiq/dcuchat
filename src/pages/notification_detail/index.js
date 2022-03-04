/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import "./notification_details.css";
import { baseUrl } from "../../utils/api";

const NotificationDetail = () => {
  const _User = useSelector((state) => state.User);
  const _ad = useSelector((state) => state.ad);
  // eslint-disable-next-line no-unused-vars
  const [adsLeft, setAdsLeft] = useState([]);
  const [adsRight, setAdsRight] = useState([]);
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
  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  return (
    <>
      <Grid container xs={12} style={{ width: "100%", overflowX: "hidden" }}>
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
          <div className="notification-detail-wrapper">
            {!isObjectEmpty(_User.selectedNotification) ? (
              <>
                <h1 className="notification-title-heading">
                  {_User.selectedNotification.title} (
                  {moment(_User.selectedNotification.date).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                  )
                </h1>
                <p className="notification-disc">
                  {_User.selectedNotification.text}
                </p>
              </>
            ) : (
              <h3 className="notification-not-selected">
                Notification will be displayed here.
              </h3>
            )}
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
      <br/>
      <br/>
      <br/>
    </>
  );
};

export default NotificationDetail;
