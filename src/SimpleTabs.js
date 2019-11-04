import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import TakePicture from "./TakePicture";
import DisplayGraph from "./DisplayGraph";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [emotionData, setEmotionData] = useState([
    // const emotionData = [
    {
      emotion: {
        sadness: 0.045,
        neutral: 40.298,
        disgust: 0.018,
        anger: 0.031,
        surprise: 0.781,
        fear: 0.018,
        happiness: 58.809
      },
      date: 1572867352415
    },
    {
      emotion: {
        sadness: 4.045,
        neutral: 36.298,
        disgust: 4.018,
        anger: 2.031,
        surprise: 5.781,
        fear: 3.018,
        happiness: 44.809
      },
      date: 1572867451853
    },
    {
      emotion: {
        sadness: 9.045,
        neutral: 31.298,
        disgust: 7.018,
        anger: 5.031,
        surprise: 8.781,
        fear: 6.018,
        happiness: 32.809
      },
      date: 1572867571785
    }
  ]);
  function saveEmotionData(eData) {
    setEmotionData(prevState => [...prevState, eData]);
  }

  console.log("emotionData:", emotionData);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
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
      </AppBar>
      <TabPanel value={value} index={0}>
        <TakePicture saveEmotionData={saveEmotionData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DisplayGraph emotionData={emotionData} />
      </TabPanel>
    </div>
  );
}
