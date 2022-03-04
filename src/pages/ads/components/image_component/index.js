import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { baseUrl } from "../../../../utils/api";

const ImageComponent = ({ setImage, url, adPosition }) => {
  const imageInputRef = React.useRef();

  const [img, setImg] = useState(null);

  const handleUploadClick = (e) => {
    var file = e.target.files[0];
    setImg(URL.createObjectURL(file));
    setImage(file);
  };
  return (
    <div>
      {img || url !== "" ? (
        <img
          style={img || url !== "" ? { width: "100%", height: "298px" } : null}
          src={
            url !== ""
              ? `${baseUrl}/public/advertisements/${adPosition}/${url}`
              : img
          }
          alt="featured"
        />
      ) : null}
      <Button
        variant="contained"
        component="label"
        style={{
          color: "#ff8c00",
          borderColor: "#ff8c00",
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

export default ImageComponent;
