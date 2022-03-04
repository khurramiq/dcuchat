import React from "react";
import { Button } from "@material-ui/core";
import { baseUrl } from "../../../../../../../utils/api";

const FeaturedImage = ({
  img,
  handleUploadClick,
  imageInputRef,
  featuredImage,
  isEditing,
}) => {
  return (
    <div>
      {isEditing || img ? (
        <img
          style={img || isEditing ? { width: "400px", height: "400px", marginBottom: "20px" } : null}
          src={isEditing && !img ? `${baseUrl}/public/${featuredImage}` : img}
          alt="featured"
        />
      ) : null}
      <br/>
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

export default FeaturedImage;
