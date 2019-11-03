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
  console.log("b64Data:", b64Data);
  const slicedB64Data = b64Data.split(",")[1];
  console.log(" ran form b64toBlob function");
  // const byteCharacters = atob(b64Data);
  const byteCharacters = atob(slicedB64Data);

  console.log("byteCharacters:", byteCharacters);
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
  console.log("byteArrays:", byteArrays);

  // const blob = new Blob(byteArrays, { type: contentType });
  // return blob;
  const newFile = new File(byteArrays, "newFile.jpg", { type: contentType });
  console.log("newFile:", newFile);
  return newFile;
};
// function b64toBlob(dataURI) {
//   const byteString = atob(dataURI.split(",")[1]);
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);

//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   // return new Blob([ab], { type: "image/jpeg" });
//   // const blob = new Blob([ab], { type: "image/jpeg" });
// return

// }

// fileUpload(file){
// const url = "http://example.com/file-upload";
// const config = {
//   headers: {
//     "content-type": "multipart/form-data"
//   }
// };
// return post(url, formData, config);
// }

async function calculateEmotionData(provisionalPicture) {
  try {
    console.log(" ran0000");
    const contentType = "image/jpeg";
    const blob = await b64toBlob(provisionalPicture, contentType);
    // const blob = b64toBlob(provisionalPicture);
    console.log("blob:", blob);
    console.log(" ran1111");
    const fData = new FormData();
    // console.log("data:", data);
    for (var key of fData.entries()) {
      console.log(`${key[0]}, ${key[1]}`);
    }
    fData.append("image_file", blob);
    for (var key of fData.entries()) {
      console.log(`${key[0]}, ${key[1]}`);
    }
    // formData.append("file", blob);
    // console.log("data2:", data);
    console.log("ran");
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
          // image_base64: provisionalPicture,
          // image_url:
          //   "https://upload.wikimedia.org/wikipedia/commons/9/9b/Taleb_mug.JPG",
          // image_file: "newFile.jpg",
          // image_file: "file",
          return_attributes: "emotion"
        }
      }
    );
    // const result = await axios({
    //   method: "post",
    //   url: "https://api-us.faceplusplus.com/facepp/v3/detect",
    //   data: fData,
    //   config: {
    //     headers: { "Content-Type": "multipart/form-data" },
    //     params: {
    //       api_key: "8lb1wAluXKIn5fy87EZRk3poxNNMq1zw",
    //       api_secret: "sYdXH5dYYpPWSknrzy3Kb6LUy-_lxATO",
    //       // image_base64: provisionalPicture,
    //       // image_url:
    //       //   "https://upload.wikimedia.org/wikipedia/commons/9/9b/Taleb_mug.JPG",
    //       // image_file: "newFile.jpg",
    //       // image_file: "file",
    //       return_attributes: "emotion"
    //     }
    //   }
    // });
    console.log("result:", result);
    return result;
  } catch (error) {
    console.error(error);
    console.log(error);
    return error;
  }
}
// const b64Data =
//   "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

export default function TakePicture() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const [provisionalPicture, setProvisionalPicture] = useState("");
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log("imageSrc:", imageSrc);
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
