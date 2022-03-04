import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
import { Delete, Edit } from "@material-ui/icons";
// import { CircularProgress, TextField } from "@material-ui/core";
// import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AdsTable = ({ ads, handleEditing, deleteItem }) => {
  const classes = useStyles();
  //   const _course = useSelector((state) => state.course);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Link URL</TableCell>
              <TableCell>Order</TableCell>
            </TableRow>
          </TableHead>
          {!false && (
            <TableBody>
              {ads.map((row, i) => (
                <>
                  <TableRow key={i}>
                    <TableCell                      
                      component="th"
                      scope="row"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell>
                      <Edit
                        style={{ color: "#328cc1", cursor: "pointer" }}
                        onClick={() => handleEditing(row, i)}
                      />
                      &nbsp;
                      <Delete
                        style={{ color: "#d72924", cursor: "pointer" }}
                        onClick={() => deleteItem(row._id)}
                      />
                    </TableCell>
                    <TableCell>{row.adPageURL}</TableCell>
                    <TableCell>{row.adOrder}</TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {/* {_course.loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span>
            <CircularProgress />
          </span>
        </div>
      ) : null} */}
    </div>
  );
};

export default AdsTable;
