import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { baseUrl } from "../../utils/api";
import { add_ToLikeList } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginLeft: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const UserCard = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAdd_ToLikeList = () => {
    if (_User.profile) {
      dispatch(
        add_ToLikeList({ userId: _User.profile._id, likePersonId: user._id })
      );
    }
  };

  const isLiked = (userId) => {
    for (let i = 0; i < _User.profile?.likeList?.length; i++) {
      if (_User.profile.likeList[i].likePersonId === userId) {
        return true;
      }
    }
    return false;
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user.firstName.charAt(0)}
          </Avatar>
        }
        title={user.firstName + " " + user.lastName}
        subheader={`Age: ${user.age}`}
      />
      <CardMedia
        className={classes.media}
        image={`${baseUrl}/public/${user.profilePic}`}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <span style={{ color: "#111" }}>Interested In:</span>{" "}
          {user.interestedInGender}&nbsp;{" "}
          <span style={{ color: "#111" }}>Age:</span> {user.interestedInAge}
          <div>
            {user.desc.length > 35
              ? user.desc.substring(0, 35) + "..."
              : user.desc}
          </div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleAdd_ToLikeList()}
        >
          <FavoriteIcon style={isLiked(user._id) ? { color: "red" } : null} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Name: {user.firstName + " " + user.lastName}
            <br />
            Email: {user.email}
            <br />
            Age: {user.age}
            <br />
            Gender: {user.gender}
            <br />
            Interested In: {user.interestedInGender}
            <br />
            Interested In Age: {user.interestedInAge}
          </Typography>
          <Typography paragraph>
            Bio:
            <br />
            {user.desc}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default UserCard;
