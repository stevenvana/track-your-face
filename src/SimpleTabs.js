import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import TabPanel from "./TabPanel";
import TakePicture from "./TakePicture";
import DisplayGraph from "./DisplayGraph";
import { StyledAppBar } from "./styled";
import { getUserData, saveUserData } from "./models";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs(props) {
  const { signOut, user } = props;
  const { uid } = user;
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const changeTabs = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  const [emotionData, setEmotionData] = useState([]);
  function saveEmotionData(eData) {
    setEmotionData(prevState => [...prevState, eData]);
    saveUserData(uid, eData);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserData(uid);
      setEmotionData(result);
    };
    fetchData();
  }, [uid]);

  return (
    <div className={classes.root}>
      <StyledAppBar position="static">
        <Tabs
          value={tabValue}
          onChange={changeTabs}
          aria-label="simple tabs example"
        >
          <Tab
            label="Take your picture"
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
          />
          <Tab
            label="Show graph"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
        </Tabs>
        <Button onClick={signOut}>Sign out</Button>
      </StyledAppBar>
      <TabPanel value={tabValue} index={0}>
        <TakePicture
          saveEmotionData={saveEmotionData}
          changeTabs={changeTabs}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <DisplayGraph emotionData={emotionData} />
      </TabPanel>
    </div>
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
