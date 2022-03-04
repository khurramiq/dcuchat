import { Button } from "@material-ui/core";
import React from "react";

const ActionButtons = ({
  alignLeft,
  handleAlignLeft,
  alignRight,
  handleAlignRight,
  adFormOpen,
  setAdFormOpen,
}) => {
  return (
    <div className="button-actions-wrapper">
      <Button
        variant="outlined"
        type="submit"
        className="button"
        style={
          alignLeft
            ? {
                color: "#fff",
                borderColor: "#ff8c00",
                backgroundColor: "#ff8c00",
              }
            : {
                color: "#ff8c00",
                borderColor: "#ff8c00",
                backgroundColor: "#fff",
              }
        }
        onClick={() => handleAlignLeft()}
      >
        Primary Ads
      </Button>
      {!adFormOpen ? (
        <Button
          variant="outlined"
          type="submit"
          className="button"
          style={{
            color: "#ff8c00",
            borderColor: "#ff8c00",
            backgroundColor: "#fff",
            marginLeft: "34%",
          }}
          onClick={() => setAdFormOpen(true)}
        >
          Add New
        </Button>
      ) : null}
      <Button
        variant="outlined"
        type="submit"
        className="right-button"
        style={
          alignRight
            ? {
                color: "#fff",
                borderColor: "#ff8c00",
                backgroundColor: "#ff8c00",
              }
            : {
                color: "#ff8c00",
                borderColor: "#ff8c00",
                backgroundColor: "#fff",
              }
        }
        onClick={() => handleAlignRight()}
      >
        Secondary Ads
      </Button>
    </div>
  );
};

export default ActionButtons;
