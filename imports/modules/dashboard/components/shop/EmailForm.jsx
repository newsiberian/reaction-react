import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
import i18next from "i18next";
import { styles } from "../../styles/settings";
export const fields = [
  "user",
  "password",
  "host",
  "port"
];

const validate = values => {
  const errors = {};

  if (!values.user || !values.user.trim()) {
    errors.user = i18next.t("error.isRequired", {
      field: i18next.t("corePackageConfig.settings.mail.user")
    });
  }
  if (!values.password || !values.password.trim()) {
    errors.password = i18next.t("error.isRequired", {
      field: i18next.t("corePackageConfig.settings.mail.password")
    });
  }
  if (!values.host || !values.host.trim()) {
    errors.host = i18next.t("error.isRequired", {
      field: i18next.t("corePackageConfig.settings.mail.host")
    });
  }
  if (!values.port || !values.port.trim()) {
    errors.port = i18next.t("error.isRequired", {
      field: i18next.t("corePackageConfig.settings.mail.port")
    });
  } else if (!Number.isInteger(+values.port)) {
    errors.port = i18next.t("error.mustBeNumber", {
      field: i18next.t("corePackageConfig.settings.mail.port")
    });
  }

  return errors;
};

/**
 * @class EmailForm
 * @classdesc
 */
class EmailForm extends Component {
  render() {
    const {
      fields: { user, password, host, port }, handleSubmit, pristine,
      submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...user}
          floatingLabelText={t("corePackageConfig.settings.mail.user")}
          errorText={user.touched && user.error}
        />
        <TextField
          {...password}
          floatingLabelText={t("corePackageConfig.settings.mail.password")}
          errorText={password.touched && password.error}
          type="password"
        />
        <TextField
          {...host}
          floatingLabelText={t("corePackageConfig.settings.mail.host")}
          hintText="https://"
          errorText={host.touched && host.error}
        />
        <TextField
          {...port}
          floatingLabelText={t("corePackageConfig.settings.mail.port")}
          errorText={port.touched && port.error}
          maxLength={6}
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

EmailForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "shopMailForm",
  fields,
  validate
})(EmailForm));
