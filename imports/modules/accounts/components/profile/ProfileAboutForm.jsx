import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export const fields = [
  "name"
];

const validate = values => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = i18next.t("error.isRequired", {
      field: i18next.t("accountsUI.name")
    });
  }

  return errors;
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  submit: {
    marginTop: "2rem"
  }
};

class ProfileAboutForm extends Component {
  render() {
    const { fields: { name }, handleSubmit, pristine, submitting, t } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...name}
          floatingLabelText={t("accountsUI.name")}
          hintText={t("profile.namePlaceholder")}
          errorText={name.touched && name.error}
        />
        <FlatButton
          label={t("app.saveChanges")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={styles.submit}
        />
      </form>
    );
  }
}

ProfileAboutForm.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.object
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "accountsProfileAboutForm",
  fields,
  validate
})(ProfileAboutForm));
