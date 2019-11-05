import React, { useState, useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { StyledTakePicture, StyledWebcam } from "./styled";
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
  const [webcamHidden, setWebcamHidden] = useState(false);
  const capture = useCallback(async () => {
    setWebcamHidden(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setProvisionalPicture(imageSrc);
    const emotionData = await calculateEmotionData(imageSrc);
    setProvisionalEmotionData(emotionData);
  }, [webcamRef]);
  return (
    <>
      <StyledTakePicture hidden={webcamHidden}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          // videoConstraints={videoConstraints}
        />
        <div>
          <Button
            onClick={capture}
            variant="contained"
            className={classes.button}
          >
            Take picture
          </Button>
        </div>
      </StyledTakePicture>

      <StyledTakePicture hidden={!webcamHidden}>
        <ProvisionalPicture data={provisionalPicture} />
        <div>
          <Button
            onClick={e => saveEmotionData(provisionalEmotionData)}
            variant="contained"
            className={classes.button}
          >
            Add Picture to graph
          </Button>
          <Button
            onClick={e => saveEmotionData(provisionalEmotionData)}
            variant="contained"
            className={classes.button}
          >
            Take another picture
          </Button>
        </div>
      </StyledTakePicture>
    </>
  );
}
// {
/* <h1>anger: {`${provisionalEmotionData.emotion.anger}`}</h1>
<h1>disgust: {`${provisionalEmotionData.emotion.disgust}`}</h1>
<h1>fear: {`${provisionalEmotionData.emotion.fear}`}</h1>
<h1>happiness: {`${provisionalEmotionData.emotion.happiness}`}</h1>
<h1>neutral: {`${provisionalEmotionData.emotion.neutral}`}</h1>
<h1>sadness: {`${provisionalEmotionData.emotion.sadness}`}</h1>
<h1>surprise: {`${provisionalEmotionData.emotion.surprise}`}</h1> */
// }

TakePicture.propTypes = {
  saveEmotionData: PropTypes.func.isRequired
};
