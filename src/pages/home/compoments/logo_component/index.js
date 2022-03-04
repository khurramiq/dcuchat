/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { baseUrl } from "../../../../utils/api";
// import logoImage from "../../../../assets/facebook.png";
import "./logo_component.css";

const LogoComponent = ({ logo }) => {
  return (
    <div className="logo-component-wrapper">
      <h1 className="logo-title">{logo?.logoTitle}</h1>
      <img
        className="logo-img"
        src={`${baseUrl}/public/${logo?.logoUrl}`}
        alt=""
      />      
      <a className="link-text" href={logo?.linkUrl} target="_blank">
        {logo?.linkText}
      </a>
    </div>
  );
};

export default LogoComponent;
