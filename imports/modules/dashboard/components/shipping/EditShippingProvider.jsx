import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import Subheader from "material-ui/Subheader";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import ProviderForm from "./ProviderForm.jsx";

const EditShippingProvider = ({ provider, shippingActions }) => (
  <div>
    <Subheader>{provider.name}</Subheader>
    <ProviderForm
      initialValues={{
        name: provider.provider.name,
        label: provider.provider.label,
        enabled: provider.provider.enabled
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
  title: "shipping.editShippingProvider"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(EditShippingProvider, options));
