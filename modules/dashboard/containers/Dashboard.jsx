import { Component, PropTypes } from "react";
import DashboardHeader from "../components/DashboardHeader.jsx";

/**
 * @class DashboardContainer
 * @classdesc
 */
export default class Dashboard extends Component {
  render() {
    const { children, location } = this.props;

    return (
      <div>
        <DashboardHeader title={"Settings"} />
        <section>
          {children}
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node
};
