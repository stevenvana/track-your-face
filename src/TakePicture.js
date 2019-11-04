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

export default function TakePicture(props) {
  const { saveEmotionData } = props;
  const classes = useStyles();
  const webcamRef = useRef(null);
  const [provisionalPicture, setProvisionalPicture] = useState("");
  const [provisionalEmotionData, setProvisionalEmotionData] = useState({
    emotion: {}
  });
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setProvisionalPicture(imageSrc);
    const emotionData = await calculateEmotionData(imageSrc);
    setProvisionalEmotionData(emotionData);
    console.log("emotionData:", emotionData);
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
      <h1>anger: {`${provisionalEmotionData.emotion.anger}`}</h1>
      <h1>disgust: {`${provisionalEmotionData.emotion.disgust}`}</h1>
      <h1>fear: {`${provisionalEmotionData.emotion.fear}`}</h1>
      <h1>happiness: {`${provisionalEmotionData.emotion.happiness}`}</h1>
      <h1>neutral: {`${provisionalEmotionData.emotion.neutral}`}</h1>
      <h1>sadness: {`${provisionalEmotionData.emotion.sadness}`}</h1>
      <h1>surprise: {`${provisionalEmotionData.emotion.surprise}`}</h1>
      <Button
        // onClick={e => calculateEmotionData(provisionalPicture)}
        onClick={e => saveEmotionData(provisionalEmotionData)}
        variant="contained"
        className={classes.button}
      >
        Add Picture to graph
      </Button>
      <ProvisionalPicture data={provisionalPicture} />
    </StyledTakePicture>
  );
}
