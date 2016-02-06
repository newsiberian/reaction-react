import { Component, PropTypes } from "react";
import DashboardGrid from "../components/grid/DashboardGrid.jsx";

/**
 * @class DashboardGridContainer
 * @classdesc
 */
export default class DashboardGridContainer extends Component {
  render() {
    console.log("DashboardGridContainer rendering...");
    return (
      <DashboardGrid />
    );
  }
}

DashboardGridContainer.propTypes = {};
