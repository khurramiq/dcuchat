import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./home.css";
import { fetchAllUsers } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/userCard";

const Home = () => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  useEffect(() => {
    dispatch(fetchAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("_User.profile", _User.profile);

  return (
    <div className="home-page-wrapper">
      <Grid container xs={12} style={{ minHeight: "50vh" }}>
        {_User.allUsers.map((user, i) => (
          <Grid item xs={12} sm={3} key={i} style={{ marginBottom: "10px" }}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      {/* <Grid container xs={12}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid> */}
    </div>
  );
};

export default Home;
