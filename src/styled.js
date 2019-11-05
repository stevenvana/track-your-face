import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Webcam from "react-webcam";
import Typography from "@material-ui/core/Typography";

const StyledTypography = styled(Typography)`
  background: #3f50b5;
`;

const StyledAppBar = styled(AppBar)`
  align-items: center;
`;

const StyledBox = styled(Box)`
  text-align: center;
  padding: 0px;
`;

const StyledProvisionalPicture = styled.div`
  position: absolute;
  // top: 0;
  // bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledEmotionPercentages = styled.div`
  color: #ffffff;
  background: #3f50b5;
  border: 0px;
  box-shadow: none;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
`;

const StyledTakePicture = styled.div`
  position: absolute;
  // top: 0;
  // bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledWebcam = styled(Webcam)`
  /* Make video to at least 100% wide and tall */
  min-width: 100%;
  min-height: 100%;

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: auto;
  height: auto;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledDisplayedProvisionalPicture = styled.div`
  position: absolute;
  // top: 0;
  // bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export {
  StyledAppBar,
  StyledBox,
  StyledProvisionalPicture,
  StyledEmotionPercentages,
  StyledTakePicture,
  StyledWebcam,
  StyledTypography,
  StyledDisplayedProvisionalPicture
};
