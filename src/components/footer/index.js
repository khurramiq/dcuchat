import React from "react";
import "./style.css";
import bottom1 from "../../assets/bottom1.jpeg";
import bottom2 from "../../assets/bottom2.jpeg";
import { Grid } from "@material-ui/core";

const Footer = () => {
  return (
    <div className="footer-main-wrapper">
      <div className="main-footer">
        <Grid container xs={12}>
          <Grid item xs={12} sm={6}>
            <h3 className="main-footer-heading">legal</h3>
            <hr className="main-footer-heading-underline" />
            <br />
            <p>
              DCU Chat is a website exclusive to all you dcu students to create
              new friends or possible relationships. We hope you enjoy our chat
              app, go and get matching!
            </p>
            {/* <ul className="main-footer-list">
              <li>
                <Link to="/privacy-policy" onClick={() => linkClick()}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-condition" onClick={() => linkClick()}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/course-agreement" onClick={() => linkClick()}>
                  Course Agreement
                </Link>
              </li>
            </ul> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container xs={12}>
              <Grid item xs={12} sm={5} className="footer-left-img">
                <img src={bottom1} alt="cyril" />
              </Grid>
              <Grid item xs={12} sm={7} className="footer-right-img">
                <img src={bottom2} alt="cyril" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="copyright-footer">
        <span>Copyright &copy; 2021 Geez Family</span>
      </div>
    </div>
  );
};

export default Footer;
