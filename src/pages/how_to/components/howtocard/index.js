import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import { Delete, Edit } from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "20px",
    backgroundColor: "#e9e9e9",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const HowToCard = ({ item, handleEditClick, deleteItem }) => {
  const classes = useStyles();
  const _User = useSelector((state) => state.User);

  const showDescription = () => {
    let contentState;
    let editorState;
    if (item?.sectionDescription !== "") {
      contentState = convertFromRaw(JSON.parse(item?.sectionDescription));
      editorState = EditorState.createWithContent(contentState);
      return <Editor editorState={editorState} readOnly={true} />;
    }
  };
  return (
    <Card className={classes.root}>
      <CardHeader title={item?.sectionTitle} />
      <Divider />
      <ReactPlayer width="100%" url={item?.videoUrl} />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {showDescription()}
        </Typography>
      </CardContent>
      {_User?.profile?.role === "admin" ? (
        <>
          <Divider />
          <div className="edit-delete-actions-wrapper">
            <IconButton>
              <Edit
                style={{ color: "#328cc1", cursor: "pointer" }}
                onClick={() => handleEditClick(item)}
              />
            </IconButton>
            &nbsp;
            <IconButton>
              <Delete
                style={{ color: "#d72924", cursor: "pointer" }}
                onClick={() => deleteItem(item._id)}
              />
            </IconButton>
          </div>
        </>
      ) : null}
    </Card>
  );
};

export default HowToCard;
