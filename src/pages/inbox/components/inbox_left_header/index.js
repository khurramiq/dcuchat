import React from "react";
import { Search } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import Controls from "../../../my_students/components/controls/Controls";
import "./style.css";

const InboxLeftHeader = ({ searchText, setSearchText }) => {
  return (
    <div className="inbox-left-header-wrapper">
      <Controls.Input
        style={{ width: "90%" }}
        label="Search"
        value={searchText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default InboxLeftHeader;
