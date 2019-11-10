import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import TakePicture from "./TakePicture";
import DisplayGraph from "./DisplayGraph";
import { StyledMenu, StyledSimpleTabs } from "./styled";
import { getUserData, saveUserData } from "./models";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));
library.add(fab, faSignOutAlt, faBars);

export default function SimpleTabs(props) {
  const { signOut, user } = props;
  const { uid } = user;
  const classes = useStyles();
  // const [tabValue, setTabValue] = useState(0);
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
    <StyledSimpleTabs>
      {/* // <div className={classes.root}> */}

      <StyledMenu>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {/* Open Menu */}
          <FontAwesomeIcon icon="bars" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={e => {
              changePage(e, true);
            }}
          >
            Take Your Picture
          </MenuItem>
          <MenuItem
            onClick={e => {
              changePage(e, false);
            }}
          >
            Show Graph
          </MenuItem>
          <MenuItem onClick={signOut}>
            Sign Out <FontAwesomeIcon icon="sign-out-alt" />
          </MenuItem>
        </Menu>
      </StyledMenu>
      {takePicture ? (
        <TakePicture
          saveEmotionData={saveEmotionData}
          changePage={changePage}
        />
      ) : (
        <DisplayGraph emotionData={emotionData} />
      )}
    </StyledSimpleTabs>
  );
}

SimpleTabs.propTypes = {
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
