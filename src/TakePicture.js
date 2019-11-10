import React, { useState, useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { calculateEmotionData } from "./models";
import {
  StyledProvisionalPicture,
  StyledEmotionPercentages,
  StyledTakePicture,
  StyledWebcam,
  StyledFab,
  StyledImg
} from "./styled";

library.add(fab, faCamera);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TakePicture(props) {
  const { saveEmotionData, changePage } = props;
  const classes = useStyles();
  const webcamRef = useRef(null);
  const [provisionalPicture, setProvisionalPicture] = useState("");
  const [provisionalEmotionData, setProvisionalEmotionData] = useState({
    emotion: {}
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [webcamHidden, setWebcamHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const capture = useCallback(async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      setProvisionalPicture(imageSrc);
      const emotionData = await calculateEmotionData(imageSrc);
      if (emotionData.success) {
        setWebcamHidden(true);
        setProvisionalEmotionData(emotionData);
      } else {
        setErrorMessage(emotionData.errorMessage);
        setErrorModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [webcamRef]);
  return (
    <>
      {!webcamHidden ? (
        <StyledTakePicture>
          <StyledWebcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height="20px"
            width="20px"
            videoConstraints={{
              facingMode: "user"
            }}
          />
          <StyledFab onClick={capture} color="primary" aria-label="add">
            <FontAwesomeIcon icon="camera" />
          </StyledFab>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={errorModalOpen}
            onClose={e => {
              setErrorModalOpen(false);
            }}
          >
            <StyledEmotionPercentages
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(-50%, -50%)`
              }}
              className={classes.paper}
            >
              <p>{errorMessage}</p>
            </StyledEmotionPercentages>
          </Modal>
        </StyledTakePicture>
      ) : (
        <StyledProvisionalPicture>
          <StyledImg alt="provisionalPicture" src={provisionalPicture} />
          <div>
            <Button
              onClick={e => {
                saveEmotionData(provisionalEmotionData);
                setWebcamHidden(false);
                changePage(e, false);
              }}
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Add Picture To Graph
            </Button>
            <Button
              onClick={e => setWebcamHidden(false)}
              variant="contained"
              className={classes.button}
              color="secondary"
            >
              Discard Picture
            </Button>
            <Button
              onClick={e => setModalOpen(true)}
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Show Facial Emotion Data
            </Button>
          </div>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={modalOpen}
            onClose={e => {
              setModalOpen(false);
            }}
          >
            <StyledEmotionPercentages
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(-50%, -50%)`
              }}
              className={classes.paper}
            >
              <p>
                anger: {`${Math.round(provisionalEmotionData.emotion.anger)}%`}
              </p>
              <p>
                disgust:{" "}
                {`${Math.round(provisionalEmotionData.emotion.disgust)}%`}
              </p>
              <p>
                fear: {`${Math.round(provisionalEmotionData.emotion.fear)}%`}
              </p>
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
            </StyledEmotionPercentages>
          </Modal>
        </StyledProvisionalPicture>
      )}
    </>
  );
}

TakePicture.propTypes = {
  saveEmotionData: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired
};
