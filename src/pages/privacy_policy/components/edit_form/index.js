import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Edit } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import RichTextEditor from "../../../../components/richTextEditor";
import { convertToRaw } from "draft-js";

const EditForm = ({
  editing,
  text,
  setText,
  handleEditClick,
  handleEditCancle,
  handleEdit,  
}) => {
  const handleTextChange = (editorState) => {
    const data = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(data));
    setText(content);
  };
  return (
    <>
      <form className="text-edit-contact-us-form">
        {editing ? (
          // <TextareaAutosize
          //   aria-label="minimum height"
          //   className="contact-us-from-textarea"
          //   rowsMin={10}
          //   value={text}
          //   onChange={(e) => setText(e.target.value)}
          //   fullWidth
          //   placeholder="Message"
          //   required
          // />
          <RichTextEditor
            handleChange={handleTextChange}
            isEditing={editing}
            editorState={text}
          />
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

export default EditForm;
