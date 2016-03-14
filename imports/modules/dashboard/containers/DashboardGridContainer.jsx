import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as formsActions from "../actions/forms";
import * as packagesActions from "../actions/packages";
import * as settingsActions from "../actions/settings";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as i18nActions from "../actions/i18n";
import { routerActions } from "react-router-redux";
import DashboardGrid from "../components/grid/DashboardGrid.jsx";
import getReactionApps from "../../../client/helpers/apps";

const DashboardGridContainer = props => <DashboardGrid {...props} />;

DashboardGridContainer.propTypes = {
  packagesActions: PropTypes.shape({
    getPackages: PropTypes.func,
    togglePackage: PropTypes.func
  }).isRequired,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  routerActions: PropTypes.object.isRequired,
  apps: PropTypes.array
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    formsActions: bindActionCreators(formsActions, dispatch),
    i18nActions: bindActionCreators(i18nActions, dispatch),
    packagesActions: bindActionCreators(packagesActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  };
}

function composer(props, onData) {
  const { Shops, Packages } = ReactionCore.Subscriptions;
  if (Shops.ready() && Packages.ready()) {
    const apps = getReactionApps({ provides: "dashboard" });

    onData(null, { apps });
  }
}

const DashboardGridContainerWithData = composeWithTracker(
  composer
)(DashboardGridContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGridContainerWithData);
