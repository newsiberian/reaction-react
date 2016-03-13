import React, { PropTypes } from "react";

const styles = {
  //display: "flex",
  flex: "1 1 auto",
  minHeight: "80vh"
};

const Dashboard = props => (
  <div style={styles}>
    {props.children}
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
};

export default Dashboard;
