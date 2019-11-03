import React, { useState, useCallback, useRef } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { StyledTakePicture } from "./styled";

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

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const slicedB64Data = b64Data.split(",")[1];
  const byteCharacters = atob(slicedB64Data);

  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const newFile = new File(byteArrays, "newFile.jpg", { type: contentType });
  return newFile;
};

async function calculateEmotionData(provisionalPicture) {
  try {
    const contentType = "image/jpeg";
    const blob = await b64toBlob(provisionalPicture, contentType);
    const fData = new FormData();
    fData.append("image_file", blob);
    const result = await axios.post(
      "https://api-us.faceplusplus.com/facepp/v3/detect",
      fData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          api_key: "8lb1wAluXKIn5fy87EZRk3poxNNMq1zw",
          api_secret: "sYdXH5dYYpPWSknrzy3Kb6LUy-_lxATO",
          return_attributes: "emotion"
        }
      }
    );
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

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
      {/* <Fab> */}
      <Button
        onClick={e => calculateEmotionData(provisionalPicture)}
        variant="contained"
        className={classes.button}
      >
        Add Picture to graph
      </Button>
      {/* </Fab> */}
      <ProvisionalPicture data={provisionalPicture} />
    </StyledTakePicture>
  );
}
