import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

import "./style.css";

const NavList = ({ query, isOpen, profileItems, setOpen, setOpenMessages }) => {
  // const _User = useSelector((state) => state.User);
  let location = useLocation();
  let list = [];
  const handleLinkClick = () => {
    setOpenMessages(false);
    setOpen(!isOpen);
  };
  list.push(
    <Link
      to="/"
      onClick={() => handleLinkClick()}
      className={location.pathname === "/" ? "link-item-active" : "link-item"}
      render="true"
    >
      HOME
    </Link>
  );
  list.push(
    <Link
      to="/contact_us"
      onClick={() => handleLinkClick()}
      className={
        location.pathname === "/contact_us" ? "link-item-active" : "link-item"
      }
      render="true"
    >
      CONTACT US
    </Link>
  );
  list.push(
    <Link
      to="/about_us"
      onClick={() => handleLinkClick()}
      className={
        location.pathname === "/about_us" ? "link-item-active" : "link-item"
      }
      render="true"
    >
      ABOUT US
    </Link>
  );

  const renderList = () =>
    list.map(
      (i, k) =>
        i.props.render === "true" && (
          <Grid item key={k}>
            {i}
          </Grid>
        )
    );

  return (
    <Grid
      container
      direction={query ? "column" : "row"}
      alignItems="center"
      style={{ backgroundColor: "#d72924" }}
      spacing={3}
    >
      {((query && isOpen) || !query) && (
        <>
          {profileItems ? profileItems : ""}
          {renderList()}
        </>
      )}
    </Grid>
  );
};

export default NavList;
