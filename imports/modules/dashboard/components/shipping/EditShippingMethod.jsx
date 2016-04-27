import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import MethodForm from "./MethodForm.jsx";

const EditShippingProvider = ({ provider, shippingActions }) => (
  <div>
    <h3>{provider.name}</h3>
    <MethodForm
      initialValues={{
        name: provider.name,
        label: provider.label,
        group: provider.group,
        enabled: provider.enabled
      }}
      onSubmit={values => shippingActions.updateShippingProvider(provider._id, values)}
    />
    {/* TODO: add least part of the logic here */}
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
