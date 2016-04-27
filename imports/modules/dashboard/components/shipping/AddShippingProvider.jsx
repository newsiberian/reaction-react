import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import ProviderForm from "./ProviderForm.jsx";

const AddShippingProvider = ({ shippingActions }) => (
  <div>
    <h3>{provider.name}</h3>
    <ProviderForm
      // initialValues={{
      //   name: provider.name,
      //   label: provider.label,
      //   enabled: provider.enabled
      // }}
      onSubmit={shippingActions.addShippingProvider}
    />
  </div>
);

AddShippingProvider.propTypes = {
  shippingActions: PropTypes.shape({
    updateShippingProvider: PropTypes.func
  }).isRequired
};

const options = {
  title: "admin.settings.addShippingProviderLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(AddShippingProvider, options));
