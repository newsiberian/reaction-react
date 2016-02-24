import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import TextField from "material-ui/lib/text-field";
import FlatButton from "material-ui/lib/flat-button";
import i18next from "i18next";

/**
 * @class ServiceForm
 * @classdesc
 */
class ServiceForm extends Component {
  render() {
    const {
      fields, handleSubmit, pristine, service, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {service.fields.map((field, index) => {
          const fieldName = fields[field.property];
          return (
            <TextField
              key={index}
              {...fieldName}
              floatingLabelText={field.label}
              // errorText={fieldName.touched && fieldName.error}
            />
          );
        })}
        <FlatButton
          label={t("app.updateSettings")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
        />
      </form>
    );
  }
}

ServiceForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  service: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: `accountsOathServicesForm`
})(ServiceForm));
