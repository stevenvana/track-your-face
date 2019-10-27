import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";

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
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          // value={value}
          // onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Take your picture" />
          <Tab label="Track your face's history" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        (temp) Picture is shown here
      </TabPanel>
      <TabPanel value={value} index={1}>
        (temp) graph with face history is shown here
      </TabPanel>
    </div>
  );
}
