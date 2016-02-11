import { PropTypes } from "react";

const Dashboard = (props) => (<div>{props.children}</div>);

Dashboard.propTypes = {
  children: PropTypes.node
};

export default Dashboard;
