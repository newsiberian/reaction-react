import React, { PropTypes } from "react";

const styles = {
  display: "flex",
  alignItems: "center",
  minHeight: 80,
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e6e6e6",
  paddingLeft: "1rem"
};

const DashboardHeader = props => {
  return (
    <header style={styles}>
      <h3>{props.label}</h3>
    </header>
  );
};

DashboardHeader.propTypes = {
  label: PropTypes.string
};

export default DashboardHeader;
