/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Modal from "../../components/alerts/modal";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import "../contact_us/contact_us.css";
import EditForm from "./components/edit_form";
import { baseUrl } from "../../utils/api";
import {
  createHowTo,
  getHowTo,
  updateHowTo,
  delete_Howto,
} from "../../redux/actions/howToActions";
import HowToCard from "./components/howtocard";

const HowTo = () => {
  const dispatch = useDispatch();
  //   const [open, setOpen] = useState(false);
  const _User = useSelector((state) => state.User);
  const _howTo = useSelector((state) => state.howTo);
  const [editing, setEditing] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [sectionTitleErr, setSectionTitleErr] = useState(false);
  const [sectionTitleErrText, setSectionTitleErrText] = useState("");
  const [howToDeleteId, setHowToDeleteId] = useState(-1);
  const [howTo, setHowTo] = useState({
    sectionTitle: "",
    sectionDescription: "",
    videoUrl: "",
  });
  const [howTos, setHowTos] = useState([]);
  const [open, setOpen] = useState(false);

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
    arrows: false,
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
    dispatch(getHowTo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_howTo?.howTo) {
      setHowTos(_howTo?.howTo);
      setEditing(false);
      handleReset();
      setAddSection(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_howTo?.howTo]);

  const handleReset = () => {
    setHowTo({
      sectionTitle: "",
      sectionDescription: "",
      videoUrl: "",
    });
  };

  const handleEditClick = (editItem) => {
    setHowTo(editItem);
    setEditing(true);
    scroll.scrollToTop();
  };

  const handleAddSectionClick = () => {
    handleReset();
    setAddSection(true);
  };

  const handleEditCancle = () => {
    setEditing(false);
    handleReset();
    setAddSection(false);
    scroll.scrollToTop();
  };

  const handleEdit = () => {
    if (howTo.sectionTitle.length === 0) {
      setSectionTitleErr(true);
      setSectionTitleErrText("Section Title is required");
    } else {
      dispatch(updateHowTo(howTo));
    }
  };

  const handleCreateHowTo = () => {
    if (howTo.sectionTitle.length === 0) {
      setSectionTitleErr(true);
      setSectionTitleErrText("Section Title is required");
    } else {
      dispatch(createHowTo(howTo));
    }
  };

  const cancelItem = () => {
    setOpen(false);
  };

  const deleteItem = (id) => {
    setHowToDeleteId(id);
    setOpen(true);
  };

  const deleteHowTo = () => {
    dispatch(delete_Howto({ _id: howToDeleteId }));
    setOpen(false);
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", paddingBottom: "50px" }}>
      <Grid container xs={12}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
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
        <Grid item xs={12} sm={6} md={6} lg={6} className="static-page-middle">
          <h1 className="contact-us-heading">How to use www.xyz.com</h1>
          {!_howTo?.howToLoading ? (
            <>
              {_User?.profile?.role === "admin" && !addSection && !editing ? (
                <Button
                  variant="outlined"
                  className="my_btn"
                  style={{ borderColor: "#ff8c00", color: "#ff8c00" }}
                  onClick={() => handleAddSectionClick()}
                >
                  Add Section
                </Button>
              ) : null}
              {!editing && !addSection
                ? howTos?.map((item) => (
                    <>
                      <HowToCard
                        item={item}
                        handleEditClick={handleEditClick}
                        deleteItem={deleteItem}
                      />
                    </>
                  ))
                : null}
              {_User?.profile?.role === "admin" ? (
                <EditForm
                  editing={editing}
                  addSection={addSection}
                  sectionTitleErr={sectionTitleErr}
                  sectionTitleErrText={sectionTitleErrText}
                  handleCreateHowTo={handleCreateHowTo}
                  howTo={howTo}
                  setHowTo={setHowTo}
                  handleEditCancle={handleEditCancle}
                  handleEdit={handleEdit}
                />
              ) : null}
            </>
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>
                <CircularProgress />
              </span>
            </div>
          )}
          <br />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
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
        performAction={deleteHowTo}
        description={"Are you sure you want to delete this item?"}
      />
    </div>
  );
};

export default HowTo;
