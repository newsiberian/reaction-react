import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Toggle from "material-ui/Toggle";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
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
    const { formsActions, i18nActions, shopData, t } = this.props;
    return (
      <div>
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
        <Divider style={{ marginTop: "1rem" }} />
        <List style={styles.cardText}>
          <Subheader>{t("i18nSettings.enabledLanguages")}</Subheader>
          {shopData.languages.map(language => (
            <ListItem
              key={language.i18n}
              primaryText={language.label}
              rightToggle={
                <Toggle
                  onToggle={(e, toggled) =>
                   i18nActions.toggleLanguage(toggled, language.i18n)}
                  toggled={language.enabled}
                />
              }
            />
          ))}
        </List>
      </div>
    );
  }
}

Settings.propTypes = {
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  i18nActions: PropTypes.shape({
    toggleLanguage: PropTypes.func
  }).isRequired,
  shopData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.localizationAndI18NLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(Settings, options));
