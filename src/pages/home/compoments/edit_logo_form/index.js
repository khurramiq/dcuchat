import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Edit } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import UploadLogo from "../uploadLogo";

const EditLogoForm = ({
  editing,
  logo,
  setLogo,
  handleEditClick,
  handleEditCancle,
  handleEdit,
  handleUploadClick,
  imageInputRef,
}) => {
  return (
    <>
      <form className="edit-logo-form">
        {editing ? (
          <>
            <h3>Edit Logo:</h3>
            <UploadLogo
              img={logo.logoUrl}
              handleUploadClick={handleUploadClick}
              imageInputRef={imageInputRef}
            />
            <TextField
              className="inputfields"
              name="logoTitle"
              label="Logo Title"
              type="text"
              value={logo.logoTitle}
              onChange={setLogo}
              fullWidth
              variant="outlined"
              style={{ marginBottom: "10px" }}
            />
            <TextField
              className="inputfields"
              name="linkUrl"
              label="Link URL"
              type="text"
              value={logo.linkUrl}
              onChange={setLogo}
              fullWidth
              variant="outlined"
              style={{ marginBottom: "10px" }}
            />
            <TextField
              className="inputfields"
              name="linkText"
              label="Link Text"
              type="text"
              value={logo.linkText}
              onChange={setLogo}
              fullWidth
              variant="outlined"
            />
          </>
        ) : null}
        <div className="edit-delete-actions-wrapper">
          <span>
            {!editing ? (
              <>
                <IconButton>
                  <Edit
                    style={{ color: "#328cc1", cursor: "pointer" }}
                    onClick={() => handleEditClick()}
                  />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton>
                  <DoneIcon
                    style={{ color: "#328cc1", cursor: "pointer" }}
                    onClick={() => handleEdit()}
                  />
                </IconButton>
                &nbsp;
                <IconButton>
                  <CloseIcon
                    style={{ color: "#328cc1", cursor: "pointer" }}
                    onClick={() => handleEditCancle()}
                  />
                </IconButton>
              </>
            )}
            {/* &nbsp;&nbsp;&nbsp;  */}
            {/* <VisibilityOffIcon style={{ color: "white" }} /> */}
          </span>
        </div>
      </form>
    </>
  );
};

export default EditLogoForm;
