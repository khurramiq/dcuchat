import React, { useState, useEffect } from "react";
import Modal from "../../components/alerts/modal";
import ActionButtons from "./components/action_buttons";
import AdsTable from "./ads_table";
import AdForm from "./ad_form";
import { createAd, getAllAds, delete_Ad } from "../../redux/actions/adActions";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

const Ads = () => {
  const dispatch = useDispatch();
  const _ad = useSelector((state) => state.ad);
  const [open, setOpen] = useState(false);
  const [adDeleteId, setAdDeleteId] = useState(-1);
  const [alignLeft, setAlignLeft] = useState(true);
  const [alignRight, setAlignRight] = useState(false);
  const [adFormOpen, setAdFormOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [editingId, setEditingId] = useState(-1);
  const [editing, setEditing] = useState(false);
  const [adsLeft, setAdsLeft] = useState([]);
  const [adsRight, setAdsRight] = useState([]);
  const [adForm, setAdForm] = useState({
    adPosition: "primary",
    adOrder: adsLeft.length + 1,
    url: "",
    adPageURL: "",
    title: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getAllAds());
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

  useEffect(() => {
    if (alignLeft) {      
      setAdForm({
        ...adForm,
        adOrder: adsLeft.length + 1,
      });
    } else {
      setAdForm({
        ...adForm,
        adOrder: adsRight.length + 10001,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adsLeft, adsRight]);  

  const resetForm = () => {
    setAdForm({
      ...adForm,
      adOrder: alignLeft ? adsLeft.length + 2 : adsRight.length + 10002,
      url: "",
      adPageURL: "",
      title: "",
    });
    setAdFormOpen(false);
    setEditing(false);
  };

  const handleAlignLeft = () => {
    setAdForm({
      ...adForm,
      adPosition: "primary",
      adOrder: adsLeft.length + 1,
    });
    setAlignLeft(true);
    setAlignRight(false);
  };

  const handleAlignRight = () => {
    setAdForm({
      ...adForm,
      adPosition: "secondary",
      adOrder: adsRight.length + 10001,
    });
    setAlignLeft(false);
    setAlignRight(true);
  };

  const handleEditing = (item, i) => {
    setEditingId(i);
    setAdForm(item);
    setEditing(true);
    setAdFormOpen(true);
  };

  const handleSave = () => {    
    resetForm();
    let myform = new FormData();
    myform.append("adPosition", adForm.adPosition);
    myform.append("adOrder", adForm.adOrder);
    myform.append("adPageURL", adForm.adPageURL);
    myform.append("title", adForm.title);
    myform.append("image", image);
    dispatch(createAd(myform));    
  };

  const cancelItem = () => {
    setOpen(false);
  };

  const deleteItem = (index) => {
    setAdDeleteId(index);
    setOpen(true);
  };

  const handleDelete = () => {
    // if (alignLeft) {
    //   const newArray = [...adsLeft];
    //   setAdsLeft(newArray.filter((item, i) => i !== index));
    // } else {
    //   const newArray = [...adsRight];
    //   setAdsRight(newArray.filter((item, i) => i !== index));
    // }

    resetForm();
    setAdFormOpen(false);
    dispatch(delete_Ad({ _id: adDeleteId }));
    setOpen(false);
  };

  return (
    <div className="create-ad-wrapper">
      <ActionButtons
        alignLeft={alignLeft}
        handleAlignLeft={handleAlignLeft}
        alignRight={alignRight}
        handleAlignRight={handleAlignRight}
        adFormOpen={adFormOpen}
        setAdFormOpen={setAdFormOpen}
      />
      <br/>
      {adFormOpen ? (
        <AdForm
          adForm={adForm}
          setAdForm={setAdForm}
          editing={editing}
          handleSave={handleSave}
          deleteItem={deleteItem}
          resetForm={resetForm}
          setImage={setImage}
        />
      ) : (
        <AdsTable
          ads={alignLeft ? adsLeft : adsRight}
          handleEditing={handleEditing}
          handleDelete={handleDelete}
          deleteItem={deleteItem}
        />
      )}
      <Modal
        setOpen={cancelItem}
        text={"Confirmation"}
        open={open}
        performAction={handleDelete}
        description={"Are you sure you want to delete this item?"}
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Ads;
