import React, { PropTypes } from "react";

const Dashboard = props => (
  <div style={{ height: "100%" }}>{props.children}</div>
);

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
};

export default Dashboard;
