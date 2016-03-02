import React, { PropTypes } from "react";

const Dashboard = (props) => (
  <div style={{ display: "flex" }}>
    {props.children}
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
};

export default Dashboard;
