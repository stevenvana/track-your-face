import React, { useState, useCallback, useRef } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { StyledTakePicture } from "./styled";
import { calculateEmotionData } from "./helperFunctions";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProvisionalPicture = ({ data }) => (
  <img alt="provisionalPicture" src={data} />
);

ProvisionalPicture.propTypes = {
  data: PropTypes.string.isRequired
};

export default function TakePicture() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const [provisionalPicture, setProvisionalPicture] = useState("");
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setProvisionalPicture(imageSrc);
  }, [webcamRef]);
  return (
    <StyledTakePicture>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // videoConstraints={videoConstraints}
      />
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        className={classes.margin}
      >
        <AddIcon onClick={capture} />
      </Fab>
      <Button
        onClick={e => calculateEmotionData(provisionalPicture)}
        variant="contained"
        className={classes.button}
      >
        Add Picture to graph
      </Button>
      <ProvisionalPicture data={provisionalPicture} />
    </StyledTakePicture>
  );
}
