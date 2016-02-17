import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
import i18next from "i18next";
export const fields = [
  "user",
  "password",
  "host",
  "port"
];

const validate = values => {
  const errors = {};

  if (!values.user) {
    errors.user = i18next.t("error.isRequired", {
      field: i18next.t("shopEditMailForm.user")
    });
  }
  if (!values.password) {
    errors.password = i18next.t("error.isRequired", {
      field: i18next.t("shopEditMailForm.password")
    });
  }
  if (!values.host) {
    errors.host = i18next.t("error.isRequired", {
      field: i18next.t("shopEditMailForm.host")
    });
  }
  if (!values.port) {
    errors.port = i18next.t("error.isRequired", {
      field: i18next.t("shopEditMailForm.port")
    });
  } else if (!Number.isInteger(+values.port)) {
    errors.port = i18next.t("error.mustBeNumber", {
      field: i18next.t("shopEditMailForm.port")
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
      fields: { user, password, host, port }, handleSubmit, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...user}
          floatingLabelText={t("shopEditMailForm.user")}
          errorText={user.error}
        />
        <TextField
          {...password}
          floatingLabelText={t("shopEditMailForm.password")}
          errorText={password.error}
          type="password"
        />
        <TextField
          {...host}
          hintText="https://"
          floatingLabelText={t("shopEditMailForm.host")}
          errorText={host.error}
        />
        <TextField
          {...port}
          floatingLabelText={t("shopEditMailForm.port")}
          errorText={port.error}
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

EmailForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "shopMailForm",
  fields,
  validate
})(EmailForm));
