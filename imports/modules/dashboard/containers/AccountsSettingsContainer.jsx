import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as oauthServicesActions from "../actions/oauthServices";
import * as layoutSettingsActions from "../../layout/actions/settings";
import Settings from "../components/accounts/Settings.jsx";
import { ReactionServiceHelper } from "../../../client/helpers/utilities";

const AccountsSettingsContainer = props => <Settings {...props} />;

AccountsSettingsContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  oauthServicesActions: PropTypes.shape({
    toggleOauthService: PropTypes.func,
    submitForm: PropTypes.func
  }).isRequired,
  services: PropTypes.array.isRequired
};

function composer(props, onData) {
  const handle = Meteor.subscribe("ServiceConfiguration", Meteor.userId());
  if (handle.ready()) {
    const serviceHelper = new ReactionServiceHelper();
    const services = serviceHelper.services();

    onData(null, { services });
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    oauthServicesActions: bindActionCreators(oauthServicesActions, dispatch)
  };
}

const AccountsSettingsContainerWithData = composeWithTracker(
  composer
)(AccountsSettingsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsSettingsContainerWithData);
