import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import profileImg from "../../../../assets/profileimg.png";
import "./profile_card.css";

const ProfileCard = () => {
  const _User = useSelector((state) => state.User);
  return (
    <div className="profile-card-wrapper">
      <div className="profile-img-wrapper">
        <img src={profileImg} alt="profileimg" />
      </div>
      <div className="profile-detail-wrapper">
        <div className="name-wrapper">
          <h3>
            {_User.profile.name}{" "}
            <span className="capitalize">({_User.profile.role})</span>
          </h3>
        </div>
        <div className="other-detail">
          <div className="left">
            <h3>Joind:</h3>
            <h3>Email:</h3>
            <h3>Last Learned:</h3>
            <h3>Login Method:</h3>
          </div>
          <div className="right">
            <p>
              {moment(_User.profile.created).format("MMMM")}.{" "}
              {moment(_User.profile.created).format("DD")},{" "}
              {moment(_User.profile.created).format("YYYY")}
            </p>
            <p>{_User.profile.email}</p>
            <p>
              {_User.profile.role === "admin"
                ? "Not Learned"
                : _User.profile.lastLearned
                ? moment(_User.profile.lastLearned).format("MMMM") +
                  " " +
                  moment(_User.profile.lastLearned).format("DD") +
                  ", " +
                  moment(_User.profile.lastLearned).format("YYYY")
                : "Not Learned"}
            </p>
            <p className="capitalize">{_User.profile.loginMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
