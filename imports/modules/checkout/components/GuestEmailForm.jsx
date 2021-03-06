import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import i18next from "i18next";
export const fields = [
  "email"
];

const validate = values => {
  const errors = {};

  if (!values.email || !values.email.trim()) {
    errors.email = i18next.t("accountsUI.error.emailRequired");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18next.t("accountsUI.error.emailDoesntMatchTheCriteria");
  }

  return errors;
};

const styles = {
  submit: {
    marginTop: "2rem",
    width: "100%"
  }
};

class GuestEmailForm extends Component {
  render() {
    const {
      fields: { email }, handleSubmit, pristine,
      submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs">
            <TextField
              {...email}
              floatingLabelText={t("accountsUI.email")}
              errorText={email.touched && email.error}
              type="email"
            />
          </div>
          <div className="col-xs">
            <FlatButton
              label={t("accountsUI.signUpButton")}
              primary={true}
              type="submit"
              disabled={pristine || submitting}
              style={styles.submit}
            />
          </div>
        </div>
      </form>
    );
  }
}

GuestEmailForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "checkoutGuestEmailForm",
  fields,
  validate
})(GuestEmailForm));
