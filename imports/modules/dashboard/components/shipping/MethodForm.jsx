import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
export const fields = [
  "name",
  "label",
  "group",
  "enabled",
  "cost",
  "handling",
  "rate"
];

const validate = values => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = i18next.t("error.isRequired", {
      field: i18next.t("shipping.name")
    });
  }

  if (!values.label || !values.label.trim()) {
    errors.label = i18next.t("error.isRequired", {
      field: i18next.t("shipping.label")
    });
  }

  if (!values.group || !values.group.trim()) {
    errors.group = i18next.t("error.isRequired", {
      field: i18next.t("shipping.group")
    });
  }

  if (!values.cost || !values.cost.trim()) {
    errors.cost = i18next.t("error.isRequired", {
      field: i18next.t("shipping.cost")
    });
  } else if (!Number.isInteger(+values.cost)) {
    errors.cost = i18next.t("error.mustBeNumber", {
      field: i18next.t("shipping.cost")
    });
  } else if (Number.isInteger(+values.cost) < 0) {
    errors.cost = i18next.t("error.theValueMustNotBeNegative");
  }

  if (!values.handling || !values.handling.trim()) {
    errors.handling = i18next.t("error.isRequired", {
      field: i18next.t("shipping.handling")
    });
  } else if (!Number.isInteger(+values.handling)) {
    errors.handling = i18next.t("error.mustBeNumber", {
      field: i18next.t("shipping.handling")
    });
  } else if (Number.isInteger(+values.handling) < 0) {
    errors.handling = i18next.t("error.theValueMustNotBeNegative");
  }

  if (!values.rate || !values.rate.trim()) {
    errors.rate = i18next.t("error.isRequired", {
      field: i18next.t("shipping.rate")
    });
  } else if (!Number.isInteger(+values.rate)) {
    errors.rate = i18next.t("error.mustBeNumber", {
      field: i18next.t("shipping.rate")
    });
  } else if (Number.isInteger(+values.rate) < 0) {
    errors.rate = i18next.t("error.theValueMustNotBeNegative");
  }

  return errors;
};

class MethodForm extends Component {
  render() {
    const {
      fields: { name, label, group, enabled, cost, handling, rate }, handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={{ marginLeft: 20 }}>
        <TextField
          {...name}
          floatingLabelText={t("shipping.name")}
          errorText={name.touched && name.error}
        />
        <TextField
          {...label}
          floatingLabelText={t("shipping.label")}
          errorText={label.touched && label.error}
        />
        <TextField
          {...group}
          floatingLabelText={t("shipping.group")}
          errorText={group.touched && group.error}
        />
        <TextField
          {...cost}
          floatingLabelText={t("shipping.cost")}
          errorText={cost.touched && cost.error}
          type="number"
        />
        <TextField
          {...handling}
          floatingLabelText={t("shipping.handling")}
          errorText={handling.touched && handling.error}
          type="number"
        />
        <TextField
          {...rate}
          floatingLabelText={t("shipping.rate")}
          errorText={rate.touched && rate.error}
          type="number"
        />
        <Toggle
          {...enabled}
          label={t("shipping.enabled")}
        />
        <FlatButton
          label={t("app.add")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
        />
      </form>
    );
  }
}

MethodForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "shippingMethodForm",
  fields,
  validate
})(MethodForm));
