import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const Settings = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontWeight: "300",
            marginTop: "80px",
          }}
        >
          Settings Page
        </h1>
      </div>
      <h1 className="setting-item">Messages:</h1>
      <h1 className="setting-item">Role Manage:</h1>
      <h1 className="setting-item">Teachers And Admin Manager:</h1>      
      <Link to="/settings/security-questions">
        <h1 className="setting-item">Add More Security Questions:</h1>
      </Link>
      <Link to="/settings/ads">
        <h1 className="setting-item">Ad Settings:</h1>
      </Link>
      <Link to="/settings/add-modify-notification-message">
        <h1 className="setting-item">Add/modify notification messages to be sent:</h1>
      </Link>
    </div>
  );
};

export default Settings;
