import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import AddShippingMethodForm from "./AddShippingMethodForm.jsx";

const AddShippingMethod = ({ shippingActions }) => (
  <div>
    <h3>{provider.name}</h3>
    <AddShippingMethodForm
      onSubmit={shippingActions.addShippingMethod}
    />
  </div>
);

AddShippingMethod.propTypes = {
  shippingActions: PropTypes.shape({
    addShippingMethod: PropTypes.func
  }).isRequired
};

const options = {
  title: "admin.settings.editShippingProviderLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(EditShippingProvider, options));
