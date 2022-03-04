import React from "react";
import { Button } from "@material-ui/core";

const UploadLogo = ({ img, handleUploadClick, imageInputRef }) => {
  return (
    <div className="upload-logo-wrapper">
      {img ? (
        <>
          <img className="logo-img1" src={img} alt="" />
        </>
      ) : null}
      <Button
        variant="contained"
        component="label"
        style={{
          borderColor: "#ff8c00",
          color: "#ff8c00",
          backgroundColor: "#fff",
        }}
      >
        Browse for file ...
        <input
          accept="image/*"
          name="img"
          type="file"
          onChange={handleUploadClick}
          ref={imageInputRef}
          hidden
        />
      </Button>
    </div>
  );
};

export default UploadLogo;
