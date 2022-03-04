import React from "react";
import { Button } from "@material-ui/core";

const UploadVideo = ({ name, handleUploadClick, videoInputRef }) => {
  return (
    <div>
      <Button
        variant="contained"
        component="label"
        style={{ backgroundColor: "#1976D2", color: "#fff" }}
      >
        Upload Video
        <input
          accept=".mp4 , .m4a, .ogg, .mpeg"
          type="file"
          name={name}
          onChange={handleUploadClick}
          ref={videoInputRef}
          hidden
        />
      </Button>
    </div>
  );
};

export default UploadVideo;
