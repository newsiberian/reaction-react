import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import MethodForm from "./MethodForm.jsx";

const EditShippingMethod = ({ method, providerId, shippingActions, t }) => (
  <div>
    <Subheader>{method.name}</Subheader>
    <MethodForm
      initialValues={{
        name: method.name,
        label: method.label,
        group: method.group,
        enabled: method.enabled,
        cost: method.cost || 0,
        handling: method.handling,
        rate: method.rate
      }}
      onSubmit={values => shippingActions.updateShippingMethod(providerId, method._id, values)}
    />
    <Subheader>{t("shippingMethod.matchingCartRanges")}</Subheader>
    <Subheader>{t("shippingMethod.matchingLocales")}</Subheader>
    {/* TODO: add least part of the logic here */}
  </div>
);

EditShippingMethod.propTypes = {
  method: PropTypes.object.isRequired,
  providerId: PropTypes.string.isRequired,
  shippingActions: PropTypes.shape({
    updateShippingMethod: PropTypes.func
  }).isRequired
};

const options = {
  title: "shipping.editShippingMethod"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(EditShippingMethod, options));
