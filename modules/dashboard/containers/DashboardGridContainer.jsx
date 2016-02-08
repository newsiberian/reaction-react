import { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as packagesActions from "../actions/packages";
import DashboardGrid from "../components/grid/DashboardGrid.jsx";

/**
 * @class DashboardGridContainer
 * @classdesc
 */

//const DashboardGridContainer = props => {
class DashboardGridContainer extends Component {
  render() {
    console.log("DashboardGridContainer rendering...");
    const { packages, actions } = this.props;
    return (
      <DashboardGrid actions={actions} packages={packages} />
    );
  }
}

DashboardGridContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    packages: state.packages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(packagesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGridContainer);
