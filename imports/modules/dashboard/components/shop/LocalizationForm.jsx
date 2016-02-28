import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import SelectFieldWrapper from
  "../../../layout/components/SelectFieldWrapper.jsx";
import MenuItem from "material-ui/lib/menus/menu-item";
import { styles } from "../../styles/settings";
export const fields = [
  "timezone",
  "currency",
  "baseUOM"
];

/**
 * @class LocalizationForm
 * @classdesc
 */
class LocalizationForm extends Component {
  getCurrencies() {
    const currencies = ReactionCore.Collections.Shops.findOne().currencies;
    const currencyOptions = [];
    for (let currency in currencies) {
      if ({}.hasOwnProperty.call(currencies, currency)) {
        let structure = currencies[currency];
        currencyOptions.push({
          label: currency + "  |  " + structure.symbol + "  |  " +
          structure.format,
          value: currency
        });
      }
    }
    return currencyOptions;
  }

  getUOM() {
    const unitsOfMeasure = ReactionCore.Collections.Shops.findOne().
      unitsOfMeasure;
    return unitsOfMeasure.map(measure => {
      return {
        label: measure.label,
        value: measure.uom
      };
    });
  }

  render() {
    const {
      fields: { baseUOM, currency, timezone }, handleSubmit, pristine,
      submitting, t
      } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <SelectFieldWrapper
          {...timezone}
          floatingLabelText={t("shop.timezone")}
          hintText={t("shop.timezoneOptions")}
        >
          { /* TODO for now we are using meteor:momentjs, maybe it's better to
           use version from NPM after 1.3 */ }
          {moment.tz.names()
            .map((tz, i) => <MenuItem key={i} value={tz} primaryText={tz} />)}
        </SelectFieldWrapper>
        <SelectFieldWrapper
          {...currency}
          floatingLabelText={t("shop.currency")}
          title={t("shop.currencyTooltip")}
        >
          {this.getCurrencies().map((cur, i) => {
            return (
              <MenuItem key={i} value={cur.value} primaryText={cur.label} />
            );
          })}
        </SelectFieldWrapper>
        <SelectFieldWrapper
          {...baseUOM}
          floatingLabelText={t("shop.baseUOM")}
        >
          {this.getUOM().map((uom, i) => {
            return (
              <MenuItem
                key={i}
                value={uom.value}
                primaryText={t(`uom.${uom.value}`)}
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

LocalizationForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "shopLocalizationForm",
  fields
})(LocalizationForm));
