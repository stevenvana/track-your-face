import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import Menu from "@material-ui/core/Menu";
import TakePicture from "./TakePicture";
import DisplayGraph from "./DisplayGraph/DisplayGraph";
import { StyledTrackYourFace, StyledMenuDiv } from "./styled";
import { getUserData, saveUserData } from "./models";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));
library.add(fab, faSignOutAlt, faBars);

export default function TrackYourFace(props) {
  const { signOut, user } = props;
  const { uid } = user;
  const classes = useStyles();
  const [takePicture, setTakePicture] = useState(true);
  const changePage = (event, bool) => {
    setTakePicture(bool);
  };
  const [emotionData, setEmotionData] = useState([]);
  function saveEmotionData(eData) {
    setEmotionData(prevState => [...prevState, eData]);
    saveUserData(uid, eData);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserData(uid);
      setEmotionData(result);
    };
    fetchData();
  }, [uid]);

  return (
    <StyledTrackYourFace>
      <StyledMenuDiv>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="primary"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {!takePicture ? (
            <MenuItem
              style={{ color: "#3f51b5" }}
              onClick={e => {
                changePage(e, true);
              }}
            >
              Take Your Picture
            </MenuItem>
          ) : (
            <MenuItem
              style={{ color: "#3f51b5" }}
              onClick={e => {
                changePage(e, false);
              }}
            >
              Show Graph
            </MenuItem>
          )}
          <MenuItem style={{ color: "#3f51b5" }} onClick={signOut}>
            Sign Out{" "}
            <FontAwesomeIcon
              style={{ marginLeft: "10px" }}
              icon="sign-out-alt"
            />
          </MenuItem>
        </Menu>
      </StyledMenuDiv>
      {takePicture ? (
        <TakePicture
          saveEmotionData={saveEmotionData}
          changePage={changePage}
        />
      ) : (
        <DisplayGraph emotionData={emotionData} changePage={changePage} />
      )}
    </StyledTrackYourFace>
  );
}

TrackYourFace.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    emailVerified: PropTypes.bool,
    metadata: PropTypes.shape({
      A: PropTypes.func,
      a: PropTypes.string,
      b: PropTypes.string,
      creationTime: PropTypes.string,
      lastSignInTime: PropTypes.string
    }),
    uid: PropTypes.string.isRequired
  }).isRequired,
  signOut: PropTypes.func.isRequired
};
