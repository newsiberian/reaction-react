import React, { PropTypes } from "react";

const Dashboard = (props) => (<div>{props.children}</div>);

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
};

export default Dashboard;
