import React from "react";
import { Grid } from "@material-ui/core";

import "../contact_us/contact_us.css";

const AboutUs = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden", paddingBottom: "50px" }}>
      <Grid container xs={12}>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6} className="static-page-middle">
          <h1 className="contact-us-heading">About Us</h1>
          <p>
            DCU Chat is a website exclusive to all you dcu students to create
            new friends or possible relationships. We hope you enjoy our chat
            app, go and get matching!
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
