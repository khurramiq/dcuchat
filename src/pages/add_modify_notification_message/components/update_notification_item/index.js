import React from "react";
import { Button, Grid } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const UpdateNotificationItem = ({
  title,
  description,
  placeholder,
  notification,
  handleTextChange,
  handleStateChange,
  updateText,
}) => {
  return (
    <>
      <h1 className="addModifyNotificationMessage-heading">{title}:</h1>
      <p className="addModifyNotificationMessage-text">{description}</p>
      <Grid container xs={12}>
        <Grid item xs={12} sm={10}>
          <TextareaAutosize
            rowsMin={5}
            placeholder={placeholder}
            value={notification?.text}
            onChange={(e) => handleTextChange(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </Grid>
        <Grid item xs={12} sm={2} style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            className="addModifyNotificationMessage-button"
            id="uper_btn"
            onClick={() => updateText()}
            style={{
              borderColor: "#ff8c00",
              color: "#ff8c00",
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            className="addModifyNotificationMessage-button"
            onClick={() => handleStateChange()}
            style={
              notification?.state
                ? { borderColor: "#ff8c00", color: "#ff8c00" }
                : null
            }
          >
            {notification?.state ? "Disable" : "Enable"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateNotificationItem;
