import React from "react";
import PropTypes from "prop-types";
import { StyledBox, StyledTypography } from "./styled";

export default function TabPanel(props) {
  const { value, index, children } = props;

  return (
    <StyledTypography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <StyledBox p={3}>{children}</StyledBox>
    </StyledTypography>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired
};
