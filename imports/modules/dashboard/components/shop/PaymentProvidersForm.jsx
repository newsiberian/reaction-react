import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/FlatButton";
import MenuItem from "material-ui/MenuItem";
import SelectFieldWrapper from
  "../../../layout/components/SelectFieldWrapper.jsx";
import getReactionApps from "../../../../client/helpers/apps";
import i18next from "i18next";
import { styles } from "../../styles/settings";
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
      fields: { defaultPaymentMethod }, handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <SelectFieldWrapper
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
          })}
        </SelectFieldWrapper>
        <FlatButton
          label={t("app.saveChanges")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
        />
      </form>
    );
  }
}

PaymentProvidersForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "shopPaymentProvidersForm",
  fields
})(PaymentProvidersForm));
