import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import ProviderForm from "./ProviderForm.jsx";

const EditShippingProvider = ({ provider, shippingActions }) => (
  <div>
    <h3>{provider.name}</h3>
    <ProviderForm
      initialValues={{
        name: provider.name,
        label: provider.label,
        enabled: provider.enabled
      }}
      onSubmit={values => shippingActions.updateShippingProvider(provider._id, values)}
    />
  </div>
);

EditShippingProvider.propTypes = {
  provider: PropTypes.object.isRequired,
  shippingActions: PropTypes.shape({
    updateShippingProvider: PropTypes.func
  }).isRequired
};

const options = {
  title: "admin.settings.editShippingProviderLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(EditShippingProvider, options));
