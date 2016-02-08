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

DashboardGridContainer.propTypes = {
  actions: PropTypes.shape({
    getPackages: PropTypes.func,
    togglePackage: PropTypes.func
  }).isRequired,
  packages: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    packages: state.dashboard.packages
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
