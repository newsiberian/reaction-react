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
      field: i18next.t("shopEditExternalServicesForm.openexchangeratesAppId")
    });
  }
  if (!values.OXRRefreshPeriod) {
    errors.OXRRefreshPeriod = i18next.t("error.isRequired", {
      field: i18next.t("shopEditExternalServicesForm.openexchangeratesRefresh")
    });
  }
  if (!values.googleClientId) {
    errors.googleClientId = i18next.t("error.isRequired", {
      field: i18next.t("shopEditExternalServicesForm.googleClientId")
    });
  }
  if (!values.googleApiKey) {
    errors.googleApiKey = i18next.t("error.isRequired", {
      field: i18next.t("shopEditExternalServicesForm.googleApiKey")
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
      handleSubmit, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...OXRAppId}
          floatingLabelText={t(
            "shopEditExternalServicesForm.openexchangeratesAppId"
          )}
          errorText={OXRAppId.touched && OXRAppId.error}
        />
        <TextField
          {...OXRRefreshPeriod}
          floatingLabelText={t(
            "shopEditExternalServicesForm.openexchangeratesRefresh"
          )}
          hintText={t(
            "shopEditExternalServicesForm.openexchangeratesRefreshPlaceholder"
          )}
          errorText={OXRRefreshPeriod.touched && OXRRefreshPeriod.error}
        />
        <TextField
          {...googleClientId}
          floatingLabelText={t(
            "shopEditExternalServicesForm.googleClientId"
          )}
          errorText={googleClientId.touched && googleClientId.error}
        />
        <TextField
          {...googleApiKey}
          floatingLabelText={t(
            "shopEditExternalServicesForm.googleApiKey"
          )}
          errorText={googleApiKey.touched && googleApiKey.error}
        />
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

ExternalServicesForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "shopExternalServicesForm",
  fields,
  validate
})(ExternalServicesForm));
