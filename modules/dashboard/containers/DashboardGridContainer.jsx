import { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as alertActions from "../../layout/actions/alert";
import * as packagesActions from "../actions/packages";
import * as settingsActions from "../actions/settings";
import DashboardGrid from "../components/grid/DashboardGrid.jsx";

/**
 * @class DashboardGridContainer
 * @classdesc
 */
const DashboardGridContainer = props => {
//class DashboardGridContainer extends Component {
//  render() {
  console.log("DashboardGridContainer rendering...");
  const { alertActions, settingsActions } = props;
  return (
    <DashboardGrid
      alertActions={alertActions}
      settingsActions={settingsActions}
    />
  );
//  }
};

DashboardGridContainer.propTypes = {
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
  packagesActions: PropTypes.shape({
    getPackages: PropTypes.func,
    togglePackage: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    //packages: state.dashboard.packages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    packagesActions: bindActionCreators(packagesActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGridContainer);
