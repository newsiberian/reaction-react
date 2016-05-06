import React, { PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as shippingActions from "../../shipping/actions/shipping";
import AddShippingMethod from "../components/shipping/AddShippingMethod.jsx";

const AddShippingMethodContainer = props => <AddShippingMethod {...props} />;


AddShippingMethodContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  payload: PropTypes.shape({
    providerId: PropTypes.string
  }).isRequired,
  shippingActions: PropTypes.shape({
    addShippingMethod: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    shippingActions: bindActionCreators(shippingActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShippingMethodContainer);
