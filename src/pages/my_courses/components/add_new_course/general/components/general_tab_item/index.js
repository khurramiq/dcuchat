import React from "react";
import {
  FormControl,  
  Grid,
  RadioGroup,
} from "@material-ui/core";
import StyledRadio from "../../../../../../../components/styledRadio";

const GeneralTabItem = ({ item, makeChange }) => {
  return (
    <>
      <Grid container xs={12} className="general-tab-item-wrapper">
        <Grid item xs={12} sm={1} style={{paddingTop: '5px'}}>
          {item.title}
        </Grid>
        <Grid item xs={12} sm={11}>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="customized-radios">
              {item.radioOptions.map((option, i) => (
                <div style={{ display: "flex" }}>
                  <StyledRadio checked={option.checked} onChange={()=>makeChange(option.value)} />{" "}
                  <span style={{ marginTop: "7px", fontSize: "12px" }}>
                    <b>{option.value}</b>{" "}
                    {option.label}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <p className="general-tab-item-guideline">{item.hint}</p>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralTabItem;
