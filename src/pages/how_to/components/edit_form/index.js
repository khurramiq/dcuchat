import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import RichTextEditor from "../../../../components/richTextEditor";
import { convertToRaw } from "draft-js";
import { TextField } from "@material-ui/core";

const EditForm = ({
  editing,
  addSection,
  howTo,
  sectionTitleErr,
  sectionTitleErrText,
  handleCreateHowTo,
  setHowTo,
  handleEditCancle,
  handleEdit,
}) => {
  const handleSectionDescChange = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setHowTo({ ...howTo, sectionDescription: content });
  };
  const handleField = ({ target }) => {
    setHowTo({ ...howTo, [target.name]: target.value });
  };
  return (
    <>
      <form className="text-edit-contact-us-form">
        {editing || addSection ? (
          <>
            <h3>
              Section Title: <span style={{ color: "red" }}>*</span>
            </h3>
            <TextField
              className="inputfields"
              name="sectionTitle"
              type="text"
              value={howTo?.sectionTitle}
              onChange={handleField}
              fullWidth
              variant="outlined"
              required
              error={sectionTitleErr}
              helperText={sectionTitleErr ? sectionTitleErrText : ""}
            />
            <h3>Section Description:</h3>
            <RichTextEditor
              handleChange={handleSectionDescChange}
              isEditing={editing}
              editorState={howTo.sectionDescription}
            />
            <h3>Youttube/Vimeo video Url:</h3>
            <TextField
              className="inputfields"
              name="videoUrl"
              type="text"
              value={howTo?.videoUrl}
              onChange={handleField}
              fullWidth
              variant="outlined"
              required
            />
          </>
        ) : null}
        <div className="edit-delete-actions-wrapper">
          <span>
            {editing || addSection ? (
              <>
                <IconButton>
                  <DoneIcon
                    style={{ color: "#328cc1", cursor: "pointer" }}
                    onClick={() =>
                      addSection ? handleCreateHowTo() : handleEdit()
                    }
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
            ) : null}
            {/* &nbsp;&nbsp;&nbsp;  */}
            {/* <VisibilityOffIcon style={{ color: "white" }} /> */}
          </span>
        </div>
      </form>
    </>
  );
};

export default EditForm;
