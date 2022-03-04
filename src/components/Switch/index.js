import React from "react";
import Switch from "@material-ui/core/Switch";

const MySwitch = (props) => {
    const { check, name, handleInput, label} = props;
  return (
    <>
      <Switch checked={check} name={name} onChange={handleInput} color="primary" />
      {label}
    </>
  );
};

export default MySwitch;
