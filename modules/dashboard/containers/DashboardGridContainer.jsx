import { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as alertActions from "../../layout/actions/alert";
import * as packagesActions from "../actions/packages";
import * as settingsActions from "../actions/settings";
import { routeActions } from "react-router-redux";
import DashboardGrid from "../components/grid/DashboardGrid.jsx";

/**
 * @class DashboardGridContainer
 * @todo control which props we really need to push down to children
 * @classdesc
 */
const DashboardGridContainer = props => {
//class DashboardGridContainer extends Component {
//  render() {
  console.log("DashboardGridContainer rendering...");
  const { alertActions, settingsActions, children } = props;
  return (
    <DashboardGrid
      {...props}
      //alertActions={alertActions}
      //settingsActions={settingsActions}
      //children={children}
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
  //pathname: PropTypes.string
};

function mapStateToProps(state) {
  return {
    //packages: state.dashboard.packages
    //pathname: state.routing.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    packagesActions: bindActionCreators(packagesActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
    routeActions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGridContainer);
