import React, { useState, useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { calculateEmotionData } from "./helperFunctions";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

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
      {!webcamHidden ? (
        <div>
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
              color="primary"
            >
              Take picture
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <div>
              <img alt="provisionalPicture" src={provisionalPicture} />
            </div>
            <div>
              <Button
                onClick={e => saveEmotionData(provisionalEmotionData)}
                variant="contained"
                className={classes.button}
                color="primary"
                style={{ margin: "5px" }}
              >
                Add Picture To Graph
              </Button>
              <Button
                onClick={e => setWebcamHidden(false)}
                variant="contained"
                className={classes.button}
                style={{ margin: "5px" }}
                color="secondary"
              >
                Discard Picture
              </Button>
            </div>
          </div>
          <div style={{ marginLeft: "20px", textAlign: "left" }}>
            <p>
              anger: {`${Math.round(provisionalEmotionData.emotion.anger)}%`}
            </p>
            <p>
              disgust:{" "}
              {`${Math.round(provisionalEmotionData.emotion.disgust)}%`}
            </p>
            <p>fear: {`${Math.round(provisionalEmotionData.emotion.fear)}%`}</p>
            <p>
              happiness:{" "}
              {`${Math.round(provisionalEmotionData.emotion.happiness)}%`}
            </p>
            <p>
              neutral:{" "}
              {`${Math.round(provisionalEmotionData.emotion.neutral)}%`}
            </p>
            <p>
              sadness:{" "}
              {`${Math.round(provisionalEmotionData.emotion.sadness)}%`}
            </p>
            <p>
              surprise:{" "}
              {`${Math.round(provisionalEmotionData.emotion.surprise)}%`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

TakePicture.propTypes = {
  saveEmotionData: PropTypes.func.isRequired
};
