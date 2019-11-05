import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";

const StyledTakePicture = styled.div`
  // display: flex;
  // flex-direction: column;
  // display: grid;
  // grid-template-columns: 1fr;
  // grid-template-rows: 40% 40% 20%;
  // grid-template-rows: 400px 400px 100px;
  // grid-template-columns: 20px auto 20px;
`;

const StyledAppBar = styled(AppBar)`
  align-items: center;
`;

const StyledBox = styled(Box)`
  text-align: center;
`;
export { StyledTakePicture, StyledAppBar, StyledBox };
