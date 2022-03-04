import React from "react";

const Header = ({ totalComments, title }) => {
  return (
    <div className="comment-header-wrapper">
      <h1 className="comment-header-text">
        {totalComments} Comments about {title}
      </h1>
    </div>
  );
};

export default Header;
