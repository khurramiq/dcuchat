/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  FacebookMessengerShareButton,
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";

const CourseSharing = ({ shareUrl }) => {
  const appId = "476563620264007";
  return (
    <div className="course-sharing-wrapper">
      <h1 className="course-sharing-title">
        Support the family by sharing this course
      </h1>
      <div className="social-buttons-wrapper">
        <ul class="icons">
          <FacebookShareButton
            style={{ border: "none", outline: "none" }}
            url={shareUrl}
          >
            <li className="li1" style={{ textAlign: "center" }}>
              <span class="fab fa-facebook-f"></span>
            </li>
          </FacebookShareButton>
          <WhatsappShareButton
            style={{ border: "none", outline: "none" }}
            url={shareUrl}
          >
            <li className="li2" style={{ textAlign: "center" }}>
              <span class="fab fa-whatsapp"></span>
            </li>
          </WhatsappShareButton>
          <FacebookMessengerShareButton
            style={{ border: "none", outline: "none" }}
            url={shareUrl}
            appId={appId}
          >
            <li className="li3" style={{ textAlign: "center" }}>
              <a href="#">
                <span class="fab fa-facebook-messenger"></span>
              </a>
            </li>
          </FacebookMessengerShareButton>
          <TwitterShareButton
            style={{ border: "none", outline: "none" }}
            url={shareUrl}
          >
            <li className="li4" style={{ textAlign: "center" }}>
              <a href="#">
                <span class="fab fa-twitter"></span>
              </a>
            </li>
          </TwitterShareButton>
          <EmailShareButton
            style={{ border: "none", outline: "none" }}
            url={shareUrl}
          >
            <li className="li5" style={{ textAlign: "center" }}>
              <span class="far fa-envelope"></span>
            </li>
          </EmailShareButton>
          <LinkedinShareButton
            style={{ border: "none", outline: "none" }}
            url={shareUrl}
          >
            <li className="li6" style={{ textAlign: "center" }}>
              <span class="fab fa-linkedin-in"></span>
            </li>
          </LinkedinShareButton>
        </ul>
      </div>
    </div>
  );
};

export default CourseSharing;
