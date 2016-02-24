import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
import i18next from "i18next";
export const fields = [
  "OXRAppId",
  "OXRRefreshPeriod",
  "googleClientId",
  "googleApiKey"
];

const validate = values => {
  const errors = {};

  if (!values.OXRAppId) {
    errors.OXRAppId = i18next.t("error.isRequired", {
      field: i18next.t(
        "corePackageConfig.settings.openexchangerates.appId"
      )
    });
  }
  if (!values.OXRRefreshPeriod) {
    errors.OXRRefreshPeriod = i18next.t("error.isRequired", {
      field: i18next.t(
        "corePackageConfig.settings.openexchangerates.refreshPeriod"
      )
    });
  }
  if (!values.googleClientId) {
    errors.googleClientId = i18next.t("error.isRequired", {
      field: i18next.t(
        "corePackageConfig.settings.google.clientId"
      )
    });
  }
  if (!values.googleApiKey) {
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
      <form onSubmit={handleSubmit}>
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
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "shopExternalServicesForm",
  fields,
  validate
})(ExternalServicesForm));
