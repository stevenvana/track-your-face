import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { StyledTakePicture } from "./styled";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));
export default function TakePicture() {
  const classes = useStyles();
  return (
    <StyledTakePicture>
      <div>resr</div>{" "}
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        className={classes.margin}
      >
        <AddIcon />
      </Fab>
    </StyledTakePicture>
  );
}
