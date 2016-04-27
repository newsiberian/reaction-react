import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import i18next from "i18next";
import { styles } from "../../styles/settings";
export const fields = [
  "OXRAppId",
  "OXRRefreshPeriod",
  "googleClientId",
  "googleApiKey"
];

const validate = values => {
  const errors = {};

  if (!values.OXRAppId || !values.OXRAppId.trim()) {
    errors.OXRAppId = i18next.t("error.isRequired", {
      field: i18next.t(
        "corePackageConfig.settings.openexchangerates.appId"
      )
    });
  }
  if (!values.OXRRefreshPeriod || !values.OXRRefreshPeriod.trim()) {
    errors.OXRRefreshPeriod = i18next.t("error.isRequired", {
      field: i18next.t(
        "corePackageConfig.settings.openexchangerates.refreshPeriod"
      )
    });
  }
  if (!values.googleClientId || !values.googleClientId.trim()) {
    errors.googleClientId = i18next.t("error.isRequired", {
      field: i18next.t(
        "corePackageConfig.settings.google.clientId"
      )
    });
  }
  if (!values.googleApiKey || !values.googleApiKey.trim()) {
    errors.googleApiKey = i18next.t("error.isRequired", {
      field: i18next.t("corePackageConfig.settings.google.apiKey")
    });
  }

  return errors;
};

/**
 * @class ExternalServicesForm
 * @classdesc
 */
class ExternalServicesForm extends Component {
  render() {
    const {
      fields: { OXRAppId, OXRRefreshPeriod, googleClientId, googleApiKey },
      handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...OXRAppId}
          floatingLabelText={t(
            "corePackageConfig.settings.openexchangerates.appId"
          )}
          errorText={OXRAppId.touched && OXRAppId.error}
        />
        <TextField
          {...OXRRefreshPeriod}
          floatingLabelText={t(
            "corePackageConfig.settings.openexchangerates.refreshPeriod"
          )}
          hintText={t(
            "corePackageConfig.settings.openexchangerates.refreshPeriodPlaceholder"
          )}
          errorText={OXRRefreshPeriod.touched && OXRRefreshPeriod.error}
        />
        <TextField
          {...googleClientId}
          floatingLabelText={t(
            "corePackageConfig.settings.google.clientId"
          )}
          errorText={googleClientId.touched && googleClientId.error}
        />
        <TextField
          {...googleApiKey}
          floatingLabelText={t(
            "corePackageConfig.settings.google.apiKey"
          )}
          errorText={googleApiKey.touched && googleApiKey.error}
        />
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

ExternalServicesForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "shopExternalServicesForm",
  fields,
  validate
})(ExternalServicesForm));
