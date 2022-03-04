/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { Grid } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from "react-redux";
import "../contact_us/contact_us.css";
import EditForm from "./components/edit_form";
import { baseUrl } from "../../utils/api";
import { convertFromRaw, Editor, EditorState } from "draft-js";

import {
  getTermsAndCondition,
  updateTermsNCondition,
} from "../../redux/actions/termsNConditionActions";

const TermsAndCondition = () => {
  const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
  const _User = useSelector((state) => state.User);
  const _termsNCondition = useSelector((state) => state.termsNCondition);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const _ad = useSelector((state) => state.ad);
  // eslint-disable-next-line no-unused-vars
  const [adsLeft, setAdsLeft] = useState([]);
  const [adsRight, setAdsRight] = useState([]);
  var settings = {
    // dots: true,
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

  useEffect(() => {
    dispatch(getTermsAndCondition());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_termsNCondition?.termsNCondition) {
      setText(_termsNCondition?.termsNCondition?.text);
      setEditing(false);
    //   setOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_termsNCondition?.termsNCondition]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditCancle = () => {
    setEditing(false);
    setText(_termsNCondition?.termsNCondition?.text);
    scroll.scrollToTop();
  };

  const handleEdit = () => {
    const objectForBeingUpdate = {
      ..._termsNCondition?.termsNCondition,
      text: text,
    };
    dispatch(updateTermsNCondition(objectForBeingUpdate));
  };  

  const showText = () => {
    let contentState;
    let editorState;
    if (_termsNCondition?.termsNCondition?.text) {
      if (_termsNCondition?.termsNCondition?.text !== "") {
        contentState = convertFromRaw(
          JSON.parse(_termsNCondition?.termsNCondition?.text)
        );
        editorState = EditorState.createWithContent(contentState);
        return <Editor editorState={editorState} readOnly={true} />;
      } else {
        return null;
      }
    }
  };  

  return (
    <div style={{ width: "100%", overflowX: "hidden", paddingBottom: "50px" }}>
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
        <Grid item xs={12} sm={6} className="static-page-middle">
          <h1 className="contact-us-heading">Terms And Conditions</h1>
          {!editing ? showText() : null}
          {/* <p>{globalRecord?.termsNCondition?.text}</p> */}
          {_User?.profile?.role === "admin" ? (
            <EditForm
              editing={editing}
              text={text}
              setText={setText}
              handleEditClick={handleEditClick}
              handleEditCancle={handleEditCancle}
              handleEdit={handleEdit}              
            />
          ) : null}
          <br />
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

export default TermsAndCondition;
