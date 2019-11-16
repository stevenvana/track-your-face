import React, { useState, useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import NavigationIcon from "@material-ui/icons/Navigation";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { calculateEmotionData } from "./models";
import {
  StyledProvisionalPicture,
  StyledEmotionPercentages,
  StyledTakePicture,
  StyledWebcam,
  StyledFab,
  StyledImg,
  StyledErrorMessage
} from "./styled";

library.add(fab, faCamera);

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
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
        setModalOpen(true);
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <StyledErrorMessage>
              <p>{errorMessage}</p>
            </StyledErrorMessage>
          </Modal>
        </StyledTakePicture>
      ) : (
        <StyledProvisionalPicture>
          <StyledImg alt="provisionalPicture" src={provisionalPicture} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "fixed", bottom: "3vh" }}>
              <Tooltip title="Discard Picture" aria-label="delete">
                <Fab onClick={e => setWebcamHidden(false)} color="secondary">
                  <DeleteIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Save Picture" aria-label="add">
                <Fab
                  onClick={e => {
                    saveEmotionData(provisionalEmotionData);
                    setWebcamHidden(false);
                    changePage(e, false);
                  }}
                  color="primary"
                  className={classes.fab}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Show Facial Emotion Data">
                <Fab aria-label="add" onClick={e => setModalOpen(true)}>
                  <NavigationIcon />
                </Fab>
              </Tooltip>
            </div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={modalOpen}
              onClose={e => {
                setModalOpen(false);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <StyledEmotionPercentages>
                <p>
                  anger:{" "}
                  {`${Math.round(provisionalEmotionData.emotion.anger)}%`}
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
          </div>
        </StyledProvisionalPicture>
      )}
    </>
  );
}

TakePicture.propTypes = {
  saveEmotionData: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired
};
