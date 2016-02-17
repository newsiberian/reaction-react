import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Formsy from "formsy-react";
import { FormsySelect, FormsyText } from "formsy-material-ui/lib";
import MenuItem from "material-ui/lib/menus/menu-item";
import FlatButton from "material-ui/lib/flat-button";

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
    const { baseUOM, currency, timezone, t } = this.props;
    return (
      <Formsy.Form
        //onValid={this.enableButton}
        //onInvalid={this.disableButton}
        //onValidSubmit={this.submitForm}
      >
        <FormsySelect
          name="timezone"
          required
          value={timezone}
          hintText={t("shopEditLocalizationForm.timezoneOptions")}
          floatingLabelText={t("shopEditLocalizationForm.timezone")}
        >
          { /* TODO for now we are using meteor:momentjs, maybe it's better to
           use version from NPM after 1.3 */ }
          {moment.tz.names()
            .map((tz, i) => <MenuItem key={i} value={tz} primaryText={tz} />)}
        </FormsySelect>
        <FormsySelect
          name="currency"
          required
          value={currency}
          floatingLabelText={t("shopEditLocalizationForm.baseCurrency")}
        >
          {this.getCurrencies().map((cur, i) => {
            return (
              <MenuItem key={i} value={cur.value} primaryText={cur.label} />
            );
          })}
        </FormsySelect>
        <FormsySelect
          name="baseUOM"
          required
          value={baseUOM}
          floatingLabelText={t("shopEditLocalizationForm.baseUOM")}
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
        </FormsySelect>
      </Formsy.Form>
    );
  }
}

LocalizationForm.propTypes = {
  baseUOM: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
  t: PropTypes.func
};

export default translate("core")(LocalizationForm);
