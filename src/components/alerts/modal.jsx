import React from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Modale = ({ text, description, open, setOpen, performAction }) => {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <h2 id="title">{text}</h2>
      <p id="description">{description}</p>
      <Grid container direction="row" justify="flex-end" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="danger"
            onClick={setOpen}
          >
            No
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            type="button"
            color="secondary"
            onClick={performAction}
          >
            Yes
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={setOpen}
      aria-labelledby="title"
      aria-describedby="description"
    >
      {body}
    </Modal>
  );
};

export default Modale;
