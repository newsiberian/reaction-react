import React, { PropTypes } from "react";

const styles = {
  display: "flex",
  flex: "1 1 auto"
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
