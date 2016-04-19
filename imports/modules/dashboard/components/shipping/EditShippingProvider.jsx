import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import EditShippingProviderForm from "./EditShippingProviderForm.jsx";

const EditShippingProvider = props => (
  <div>
    <h3>{"provider.name"}</h3>
    <EditShippingProviderForm
      onSubmit={values => props.submitAddMemberForm(values)}
    />
  </div>
);

EditShippingProvider.propTypes = {
  submitAddMemberForm: PropTypes.func.isRequired // actionCreator
};

const options = {
  title: "admin.settings.editShippingProviderLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(EditShippingProvider, options));
