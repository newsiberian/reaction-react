import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
// import { Card, CardTitle, CardText } from "material-ui/lib/card";
//import FontIcon from "material-ui/lib/font-icon";
//import Toggle from "material-ui/lib/toggle";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import LocalizationForm from "./LocalizationForm.jsx";
import { styles } from "../../styles/settings";

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  render() {
    const { formsActions, shopData } = this.props;
    return (
      <div style={styles.cardText}>
        <LocalizationForm
          initialValues={{
            timezone: shopData.timezone,
            currency: shopData.currency,
            baseUOM: shopData.baseUOM,
            language: shopData.language
          }}
          onSubmit={values => formsActions.submitForm(
            "Localization", values
          )}
        />
      </div>
    );
  }
}

Settings.propTypes = {
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  shopData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.localizationAndI18NLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(Settings, options));
