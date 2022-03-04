import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "../home/home.css";
import { useSelector } from "react-redux";
import UserCard from "../../components/userCard";

const LikeList = () => {
  //   const dispatch = useDispatch();
  const [likeList, setLikeList] = useState([]);
  const _User = useSelector((state) => state.User);

  console.log("_User.profile", _User.profile);
  useEffect(() => {
    let newArr = [];
    for (let i = 0; i < _User.allUsers.length; i++) {
      for (let j = 0; j < _User.profile.likeList.length; j++) {
        if (_User.profile.likeList[j].likePersonId === _User.allUsers[i]._id) {
          newArr.push(_User.allUsers[i]);
        }
      }
    }
    setLikeList(newArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.allUsers]);

  return (
    <div className="home-page-wrapper">
      <Grid container xs={12} style={{ minHeight: "50vh" }}>
        {likeList.map((user, i) => (
          <Grid item xs={12} sm={3} key={i} style={{ marginBottom: "10px" }}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LikeList;
