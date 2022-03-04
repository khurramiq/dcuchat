import React, { useEffect, useRef } from "react";
// import { InputAdornment } from "@material-ui/core";
// import { Search } from "@material-ui/icons";
// import Controls from "../../../../pages/my_students/components/controls/Controls";
import NotificationList from "../notification_list";

import "../style.css";

// click outside start
function useOuterClick(callback) {
  const innerRef = useRef();
  const callbackRef = useRef();

  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    // read most recent callback and innerRef dom node from refs
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []); // no need for callback + innerRef dep

  return innerRef; // return ref; client can omit `useRef`
}
// click outside end

const Notifications = ({ open, setOpen }) => {
  // click outside start
  const innerRef = useOuterClick((e) => {
    if (open) {
      setOpen(false);
    }
  });
  // click outside end
  return (
    <div
      ref={innerRef}
      className="notification-main-wrapper"
      style={!open ? { display: "none" } : { display: "block", zIndex: -1 }}
    >
      <div className="notification-dropdown-wrapper">
        <h1 className="notification-box-title">Notifications</h1>
        {/* <Controls.Input
          style={{ width: "80%", marginBottom: "5px" }}
          label="Search for Notification"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          //   onChange={handleSearch}
        /> */}
        <NotificationList setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Notifications;
