import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { routeActions } from "react-router-redux";
import getReactionApps from "../../../client/helpers/apps";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import AdminControlsBar from "../components/AdminControlsBar.jsx";

const AdminControlsBarContainer = props => {
  const { apps, routeActions } = props;
  return (
    <AdminControlsBar
      apps={apps}
      routeActions={routeActions}
    />
  );
};

AdminControlsBarContainer.propTypes = {
  apps: PropTypes.array.isRequired,
  routeActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    routeActions: bindActionCreators(routeActions, dispatch)
  };
}

function composer(props, onData) {
  // admin nav shortcuts
  const apps = getReactionApps({ provides: "shortcut", enabled: true });

  onData(null, { apps: apps });
}

const AdminControlsBarContainerWithData = composeWithTracker(
  composer
)(AdminControlsBarContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminControlsBarContainerWithData);
