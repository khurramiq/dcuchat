import React from "react";
import ImageComponent from "../components/image_component";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";

import "./style.css";

const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#1976D2 !important",
  },
  lableColor: {
    color: "#1976D2 !important",
  },
}));

const AdForm = ({
  adForm,
  setAdForm,
  editing,
  handleSave,
  deleteItem,
  resetForm,
  setImage,
}) => {
  const classes = useStyles();
  const handleField = ({ target }) => {
    setAdForm({ ...adForm, [target.name]: target.value });
  };
  return (
    <div style={{ marginTop: "30px" }}>
      <Grid className="item" container xs={12}>
        <Grid className="ad-form-image-wrapper" item xs={12} sm={4}>
          <ImageComponent
            setImage={setImage}
            url={adForm.url}
            adPosition={adForm.adPosition}
          />
        </Grid>
        <Grid className="ad-form-form-wrapper" item xs={12} sm={8}>
          <TextField
            label="Title"
            name="title"
            placeholder="Enter Title"
            fullWidth
            value={adForm.title}
            onChange={handleField}
            style={{ marginBottom: "20px" }}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              className: classes.lableColor,
              shrink: true,
            }}
          />
          <TextField
            label="Advertisement Link"
            name="adPageURL"
            placeholder="Enter URL"
            fullWidth
            value={adForm.adPageURL}
            onChange={handleField}
            style={{ marginBottom: "20px" }}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              className: classes.lableColor,
              shrink: true,
            }}
          />
          <TextField
            label="Order"
            name="order"
            value={adForm.adOrder}
            style={{ marginBottom: "20px" }}
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
                readOnly: true,
              },
            }}
            InputLabelProps={{
              className: classes.lableColor,
              shrink: true,
            }}
          />
          <br />
          <Button
            variant="outlined"
            type="submit"
            className="button"
            style={{
              color: "#ff8c00",
              borderColor: "#ff8c00",
              width:'100px'
            }}
            onClick={editing ? null : () => handleSave()}
          >
            {editing ? "Update" : "Save"}
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="outlined"
            type="submit"
            className="button"
            style={{
              color: "#ff8c00",
              borderColor: "#ff8c00",
              width:'100px'
            }}
            onClick={() => resetForm()}
          >
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;
          {editing ? (
            <Button
              variant="outlined"
              type="submit"
              className="button"
              style={{
                color: "#fff",
                borderColor: "red",
                backgroundColor:'red',
                width:'100px'
              }}
              onClick={() => deleteItem(adForm._id)}
            >
              Delete
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdForm;
