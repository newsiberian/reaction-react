import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import SelectField from "material-ui/lib/select-field";
import MenuItem from "material-ui/lib/menus/menu-item";
import getReactionApps from "../../../../client/helpers/apps";
import i18next from "i18next";
export const fields = [
  "defaultPaymentMethod"
];

const paymentProviders = () => {
  const providers = getReactionApps({ provides: "paymentMethod" });
  const options = providers.map(provider => {
    return {
      label: i18next.t(provider.i18nKeyLabel),
      value: provider.packageName
    };
  });
  options.unshift({
    label: i18next.t("app.auto"),
    value: "none"
  });

  return options;
};

/**
 * @class PaymentMethodsForm
 * @classdesc
 */
class PaymentProvidersForm extends Component {
  render() {
    const {
      fields: { defaultPaymentMethod }, handleSubmit, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <SelectField
          {...defaultPaymentMethod}
          hintText={t("app.selectOne")}
        >
          {paymentProviders().map((provider, index) => {
              return (
                <MenuItem
                  key={index}
                  value={provider.value}
                  primaryText={provider.label}
                />
              );
            })
          }
        </SelectField>
        <FlatButton
          label={t("app.saveChanges")}
          primary={true}
          type="submit"
          disabled={submitting}
        />
      </form>
    );
  }
}

PaymentProvidersForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "paymentProvidersForm",
  fields
})(PaymentProvidersForm));
