import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Webcam from "react-webcam";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Menu from "@material-ui/core/Menu";

const StyledMenu = styled(Menu)`
  // background: transparent;
  // background-color: #3f51b5;
`;
const StyledMenuDiv = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 100;
`;
const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 3vh;
`;
const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const StyledSimpleTabs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
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
  // background: #3f50b5;
  background: transparent;
  border: 0px;
  box-shadow: none;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  @media (max-width: 400px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledErrorMessage = styled.div`
  color: #ffffff;
  background: transparent;
  border: 0px;
  box-shadow: none;
`;

const StyledTakePicture = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
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

const StyledImg = styled.img`
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export {
  StyledFab,
  StyledSimpleTabs,
  StyledAppBar,
  StyledBox,
  StyledProvisionalPicture,
  StyledEmotionPercentages,
  StyledTakePicture,
  StyledWebcam,
  StyledTypography,
  StyledLoginPage,
  StyledMenuDiv,
  StyledMenu,
  StyledImg,
  StyledErrorMessage
};
