/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Modal from "../../components/alerts/modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from "react-redux";
import "../contact_us/contact_us.css";
import EditContactUsForm from "./components/edit_contact_us_form";
import { baseUrl } from "../../utils/api";
import { convertFromRaw, Editor, EditorState } from "draft-js";

const StaticPageType1 = ({ getRecord, updateRecord, globalRecord, pageTitle }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);  
  const _User = useSelector((state) => state.User);
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
    dispatch(getRecord());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTitle]);

  useEffect(() => {
    if (pageTitle === 'Privacy Policy') {
      if (globalRecord?.privacyPlicy) {        
        setText(globalRecord?.privacyPlicy?.text);
        setEditing(false);
        setOpen(false);
      }
    }
    else if (pageTitle === 'Terms And Conditions') {
      if (globalRecord?.termsNCondition) {        
        setText(globalRecord?.termsNCondition?.text);
        setEditing(false);
        setOpen(false);
      }
    }
    else if (pageTitle === 'Course Agreement') {
      if (globalRecord?.courseAgreement) {        
        setText(globalRecord?.courseAgreement?.text);
        setEditing(false);
        setOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalRecord?.privacyPlicy, globalRecord?.termsNCondition, globalRecord?.courseAgreement]);  

  const handleEditClick = () => {    
    setEditing(true);
  };

  const handleEditCancle = () => {
    setEditing(false);
    if (pageTitle === 'Privacy Policy') {
      setText(globalRecord?.privacyPlicy?.text);
    }
    else if (pageTitle === 'Terms And Conditions') {
      setText(globalRecord?.privacyPlicy?.text);
    }
  };

  const handleEdit = () => {
    let objectForBeingUpdate = null;
    if (pageTitle === 'Privacy Policy') {
       objectForBeingUpdate = {
        ...globalRecord?.privacyPlicy,
        text: text,
      };
     }
    else if (pageTitle === 'Terms And Conditions') {
       objectForBeingUpdate = {
        ...globalRecord?.termsNCondition,
        text: text,
      };
     }
    else if (pageTitle === 'Course Agreement') {
       objectForBeingUpdate = {
        ...globalRecord?.courseAgreement,
        text: text,
      };
     }
    dispatch(updateRecord(objectForBeingUpdate));
  };

  const handleDelete = () => {
    let objectForBeingUpdate = {
      ...globalRecord?.privacyPlicy,
      text: "",
    };
    dispatch(updateRecord(objectForBeingUpdate));
  };

  const cancelItem = () => {
    setOpen(false);
  };  

  const showContactUsPageText = () => {
    let contentState;
    let editorState;
    if (pageTitle === 'Privacy Policy') {      
      if (globalRecord?.privacyPlicy?.text) {
        if (globalRecord?.privacyPlicy?.text !== "") {
          contentState = convertFromRaw(
            JSON.parse(globalRecord?.privacyPlicy?.text)
          );
          editorState = EditorState.createWithContent(contentState);
          return <Editor editorState={editorState} readOnly={true} />;
        } else {
          return null;
        }
      }
    }
    else if (pageTitle === 'Terms And Conditions') {      
      if (globalRecord?.termsNCondition?.text) {
        if (globalRecord?.termsNCondition?.text !== "") {
          contentState = convertFromRaw(
            JSON.parse(globalRecord?.termsNCondition?.text)
          );
          editorState = EditorState.createWithContent(contentState);
          return <Editor editorState={editorState} readOnly={true} />;
        } else {
          return null;
        }
      }
    }
    else if (pageTitle === 'Course Agreement') {      
      if (globalRecord?.courseAgreement?.text) {
        if (globalRecord?.courseAgreement?.text !== "") {
          contentState = convertFromRaw(
            JSON.parse(globalRecord?.courseAgreement?.text)
          );
          editorState = EditorState.createWithContent(contentState);
          return <Editor editorState={editorState} readOnly={true} />;
        } else {
          return null;
        }
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
        <Grid item xs={12} sm={6}>
                  <h1 className="contact-us-heading">{ pageTitle }</h1>
          {!editing ? showContactUsPageText() : null}
          {/* <p>{globalRecord?.privacyPlicy?.text}</p> */}
          {_User?.profile?.role === "admin" ? (
            <EditContactUsForm
              editing={editing}
              text={text}
              setText={setText}
              handleEditClick={handleEditClick}
              handleEditCancle={handleEditCancle}
              handleEdit={handleEdit}
              setOpen={setOpen}
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
      <Modal
        setOpen={cancelItem}
        text={"Confirmation"}
        open={open}
        performAction={handleDelete}
        description={"Are you sure you want to delete this item?"}
      />
    </div>
  );
};

export default StaticPageType1;
