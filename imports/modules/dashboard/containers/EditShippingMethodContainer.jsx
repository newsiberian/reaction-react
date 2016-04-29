import React, { PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EditShippingMethod from "../components/shipping/EditShippingMethod.jsx";
import Loading from "../../layout/components/Loading.jsx";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as shippingActions from "../../shipping/actions/shipping";


const EditShippingMethodContainer = props => <EditShippingMethod {...props} />;

EditShippingMethodContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    closeSettings: PropTypes.func
  }).isRequired,
  provider: PropTypes.object.isRequired,
  providerId: PropTypes.string.isRequired, // this is came from `payload`
  shippingActions: PropTypes.shape({
    updateShippingProvider: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    providerId: state.layout.settings.payload.providerId,
    methodId: state.layout.settings.payload.methodId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    shippingActions: bindActionCreators(shippingActions, dispatch)
  };
}

function composer(props, onData) {
  const shippingProvider = ReactionCore.Collections.Shipping({ _id: props.providerId }).fetch();

  onData(null, { shippingProvider });
}

const EditShippingMethodContainerWithData = composeWithTracker(
  composer,
  Loading
)(EditShippingMethodContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditShippingMethodContainerWithData);
