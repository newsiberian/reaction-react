import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
//import { bindActionCreators } from "redux";
//import { connect } from "react-redux";
//import { routerActions } from "react-router-redux";
import getReactionApps from "../../../client/helpers/apps";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import AdminControlsBar from "../components/AdminControlsBar.jsx";

const AdminControlsBarContainer = props => {
  const { apps/*, routerActions*/ } = props;
  return (
    <AdminControlsBar
      apps={apps}
      //routerActions={routerActions}
    />
  );
};

AdminControlsBarContainer.propTypes = {
  apps: PropTypes.array.isRequired,
  //routerActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    //routerActions: bindActionCreators(routerActions, dispatch)
  };
}

function composer(props, onData) {
  // admin nav shortcuts
  const apps = getReactionApps({ provides: "shortcut", enabled: true });
  onData(null, { apps });
}

//const AdminControlsBarContainerWithData = composeWithTracker(
//  composer
//)(AdminControlsBarContainer);
//
//export default connect(
//  mapStateToProps,
//  mapDispatchToProps
//)(AdminControlsBarContainerWithData);

export default composeWithTracker(
  composer
)(AdminControlsBarContainer);
