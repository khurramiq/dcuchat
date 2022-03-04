/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Modal from "../../components/alerts/modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  getContactUsPageText,
  updateContactUsPageText,
} from "../../redux/actions/contactUsPageTextActions";

import { useDispatch, useSelector } from "react-redux";
import "./contact_us.css";
import EditContactUsForm from "./components/edit_contact_us_form";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { snackBarConstants } from "../../redux/constants";
import { convertFromRaw, Editor, EditorState } from "draft-js";
const { ShowSnack } = snackBarConstants;

const ContactUs = ({ socket }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const _contactUsPageText = useSelector((state) => state.contactUsPageText);
  const _User = useSelector((state) => state.User);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [adsLeft, setAdsLeft] = useState([]);

  useEffect(() => {
    dispatch(getContactUsPageText());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_contactUsPageText?.contactUsPageText) {
      setText(_contactUsPageText?.contactUsPageText?.text);
      setEditing(false);
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_contactUsPageText?.contactUsPageText]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditCancle = () => {
    setEditing(false);
    setText(_contactUsPageText?.contactUsPageText?.text);
  };

  const handleEdit = () => {
    let objectForBeingUpdate = {
      ..._contactUsPageText?.contactUsPageText,
      text: text,
    };
    dispatch(updateContactUsPageText(objectForBeingUpdate));
  };

  const handleDelete = () => {
    let objectForBeingUpdate = {
      ..._contactUsPageText?.contactUsPageText,
      text: "",
    };
    dispatch(updateContactUsPageText(objectForBeingUpdate));
  };

  const cancelItem = () => {
    setOpen(false);
  };

  const submitContactUsForm = async (e) => {
    e.preventDefault();
    let newContactMessage = {
      _id: _User?.profile?._id,
      name: _User?.profile?.name,
      email: _User?.profile?.email,
      message,
    };
    const res1 = await axios.get(`${baseUrl}/api/account/adminId/`);
    const adminId = res1?.data?.adminId;
    socket.current.emit("sendMessage", {
      senderId: _User.profile._id,
      receiverId: adminId,
      text: message,
    });
    const res = await axios.post(
      `${baseUrl}/api/messages/contact_us_message/`,
      newContactMessage
    );
    if (res.data.done) {
      dispatch({
        type: ShowSnack,
        payload: "Message Send successfully",
      });
      setMessage("");
    }
  };

  const showContactUsPageText = () => {
    let contentState;
    let editorState;
    if (_contactUsPageText?.contactUsPageText?.text) {
      if (_contactUsPageText?.contactUsPageText?.text !== "") {
        contentState = convertFromRaw(
          JSON.parse(_contactUsPageText?.contactUsPageText?.text)
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
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6} className="static-page-middle">
          <h1 className="contact-us-heading">Contact Us</h1>
          {!editing
            ? // <p className="contact-us-uper-text">
              //     {_contactUsPageText?.contactUsPageText?.text}
              //   </p>
              showContactUsPageText()
            : null}
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
          {_User?.profile?.role !== "admin" ? (
            <form
              onSubmit={(e) => submitContactUsForm(e)}
              className="contact-us-form"
            >
              <TextField
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={
                  _User?.profile?.firstName ? _User?.profile?.firstName : ""
                }
                variant="outlined"
                fullWidth
                style={{ marginBottom: "20px" }}
                required
                readOnly={true}
              />
              <TextField
                label="Email"
                name="email"
                placeholder="Enter your Email"
                value={_User?.profile?.email ? _User?.profile?.email : ""}
                variant="outlined"
                fullWidth
                style={{ marginBottom: "20px" }}
                required
                readOnly={true}
              />
              <TextareaAutosize
                aria-label="minimum height"
                className="contact-us-from-textarea"
                rowsMin={10}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                required
              />
              <div className="contact-us-from-send-btn-wrapper">
                <Button
                  variant="outlined"
                  type="submit"
                  style={{
                    color: "#ff8c00",
                    borderColor: "#ff8c00",
                    padding: "8px 20px",
                  }}
                  // onClick={() => setTab(0)}
                  // onClick={() => saveCourse()}
                >
                  Send
                </Button>
              </div>
            </form>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
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

export default ContactUs;
