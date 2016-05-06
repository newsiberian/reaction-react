import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import MethodForm from "./MethodForm.jsx";

const AddShippingMethod = ({ payload, shippingActions }) => (
  <div>
    <MethodForm
      onSubmit={values => shippingActions.addShippingMethod(payload.providerId, values)}
    />
  </div>
);

AddShippingMethod.propTypes = {
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

const options = {
  title: "shipping.addShippingMethod"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(AddShippingMethod, options));
