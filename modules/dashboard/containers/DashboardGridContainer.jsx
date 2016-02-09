import { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as packagesActions from "../actions/packages";
import * as alertActions from "../../layout/actions/alert";
import DashboardGrid from "../components/grid/DashboardGrid.jsx";

/**
 * @class DashboardGridContainer
 * @classdesc
 */
const DashboardGridContainer = props => {
//class DashboardGridContainer extends Component {
//  render() {
  console.log("DashboardGridContainer rendering...");
  const { alertActions } = props;
  return (
    <DashboardGrid
      alertActions={alertActions}
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
    packagesActions: bindActionCreators(packagesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGridContainer);
